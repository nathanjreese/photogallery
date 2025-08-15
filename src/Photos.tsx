import { useState } from 'react';
import LightGallery from 'lightgallery/react';

// styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
import './Photos.css';
import './Watermark.css';

// plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

// Import images from folders eagerly
const stpeteImages2025 = import.meta.glob<{ default: string }>('./Photos/2025stpete/*.{jpg,JPG,png}', { eager: true });
const indy500Images2025 = import.meta.glob<{ default: string }>('./Photos/2025indy500/*.{jpg,JPG,png}', { eager: true });
const indyGpImages2025 = import.meta.glob<{ default: string }>('./Photos/2025indygp/*.{jpg,JPG,png}', { eager: true });
const gatewayImages2025 = import.meta.glob<{ default: string }>('./Photos/2025gateway/*.{jpg,JPG,png}', { eager: true });
const brickyard400Images2025 = import.meta.glob<{ default: string }>('./Photos/2025brickyard400/*.{jpg,JPG,png}', { eager: true });

const indy500Images2024 = import.meta.glob<{ default: string }>('./Photos/2024indy500/*.{jpg,JPG,png}', { eager: true });
const gatewayImages2024 = import.meta.glob<{ default: string }>('./Photos/2024gateway/*.{jpg,JPG,png}', { eager: true });
const brickyard400Images2024 = import.meta.glob<{ default: string }>('./Photos/2024brickyard400/*.{jpg,JPG,png}', { eager: true });
const imsaindyImages2024 = import.meta.glob<{ default: string }>('./Photos/2024imsaindy/*.{jpg,JPG,png}', { eager: true });
const indy8hourImages2024 = import.meta.glob<{ default: string }>('./Photos/2024indy8hour/*.{jpg,JPG,png}', { eager: true });
const longbeachImages2024 = import.meta.glob<{ default: string }>('./Photos/2024longbeach/*.{jpg,JPG,png}', { eager: true });
const nashvilleImages2024 = import.meta.glob<{ default: string }>('./Photos/2024nashville/*.{jpg,JPG,png}', { eager: true });
const roadamericaImages2024 = import.meta.glob<{ default: string }>('./Photos/2024roadamerica/*.{jpg,JPG,png}', { eager: true });
const indygpImages2024 = import.meta.glob<{ default: string }>('./Photos/2024indygp/*.{jpg,JPG,png}', { eager: true });
const midohioImages2024 = import.meta.glob<{ default: string }>('./Photos/2024midohio/*.{jpg,JPG,png}', { eager: true });
const stpeteImages2024 = import.meta.glob<{ default: string }>('./Photos/2024stpete/*.{jpg,JPG,png}', { eager: true });

// Map folder names to their images
const folders: Record<string, Record<string, { default: string }>> = {
  stpete2025: stpeteImages2025,
  indy5002025: indy500Images2025,
  indygp2025: indyGpImages2025,
  brickyard4002025: brickyard400Images2025,
  gateway2025: gatewayImages2025,

  indy5002024: indy500Images2024,
  gateway2024: gatewayImages2024,
  brickyard4002024: brickyard400Images2024,
  imsaindy2024: imsaindyImages2024,
  indy8hour2024: indy8hourImages2024,
  longbeach2024: longbeachImages2024,
  nashville2024: nashvilleImages2024,
  roadamerica2024: roadamericaImages2024,
  indygp2024: indygpImages2024,
  midohio2024: midohioImages2024,
  stpete2024: stpeteImages2024
};

// Group events by year
const galleriesByYear: Record<string, { value: string; label: string; cover: string }[]> = {
  "2025": [
    {
      value: "stpete2025",
      label: "2025 Firestone GP of St Pete",
      cover: "./Photos/2025stpete/IMG_6554.JPG" // Hardcoded cover image
    },
    {
      value: "indygp2025",
      label: "2025 Sonsio GP",
      cover: "./Photos/2025indygp/IMG_7751.JPG"
    },
    {
      value: "indy5002025",
      label: "2025 Indianapolis 500",
      cover: "./Photos/2025indy500/IMG_8879.JPG"
    },
    {
      value: "gateway2025",
      label: "2025 Bommarito Auto Group 500",
      cover: "./Photos/2025gateway/IMG_3322.JPG"
    },
    {
      value: "brickyard4002025",
      label: "2025 Brickyard 400",
      cover: "./Photos/2025brickyard400/IMG_4873.JPG"
    }
  ],
  "2024": [
    {
      value: "stpete2024",
      label: "2024 GP of St Pete",
      cover: "./Photos/2024stpete/IMG_1609.JPG"
    },
    {
      value: "longbeach2024",
      label: "2024 Acura GP of Long Beach",
      cover: "./Photos/2024longbeach/IMG_5024.JPG"
    },
    {
      value: "indygp2024",
      label: "2024 Sonsio GP",
      cover: "./Photos/2024indygp/IMG_5336.JPG"
    },
    {
      value: "indy5002024",
      label: "2024 Indianapolis 500",
      cover: "./Photos/2024indy500/IMG_6177.JPG"
    },
    {
      value: "roadamerica2024",
      label: "2024 Xpel GP at Road America",
      cover: "./Photos/2024roadamerica/IMG_8534.JPG"
    },
    {
      value: "midohio2024",
      label: "2024 Honda Indy 200 at Mid-Ohio",
      cover: "./Photos/2024midohio/Pato2.JPG"
    },
    {
      value: "brickyard4002024",
      label: "2024 Brickyard 400",
      cover: "./Photos/2024brickyard400/IMG_0048.JPG"
    },
    {
      value: "gateway2024",
      label: "2024 Bommarito Auto Group 500",
      cover: "./Photos/2024gateway/IMG_1699.JPG"
    },
    {
      value: "nashville2024",
      label: "2024 Nashville Music City Grand Prix",
      cover: "./Photos/2024nashville/IMG_9999.JPG"
    },
    {
      value: "imsaindy2024",
      label: "2024 IMSA Battle on the Bricks",
      cover: "./Photos/2024imsaindy/IMG_2611.JPG"
    },
    {
      value: "indy8hour2024",
      label: "2024 Indianapolis 8 Hour",
      cover: "./Photos/2024indy8hour/IMG_2816.JPG"
    }
  ]
};

function Gallery() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  if (selectedFolder) {
    const selectedGallery = Object.values(galleriesByYear)
      .flat()
      .find((gallery) => gallery.value === selectedFolder);

    const images = folders[selectedFolder];
    const imageArray: string[] = Object.values(images).map((img) => img.default);

    return (
      <div>
        <div className="back-button-container">
          <button
            className="back-button"
            onClick={() => setSelectedFolder(null)}
          >
            Back to Albums
          </button>
        </div>
        <h1 className="lightgallery-title">{selectedGallery?.label}</h1>
        <LightGallery
          onInit={(detail) => {
            console.log('lightGallery initialized');
            const galleryElement = detail.instance.$container.get();
            galleryElement.addEventListener('contextmenu', (e: Event) => e.preventDefault());
          }}
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          download={false}
          key={selectedFolder}
        >
          {imageArray.map((src, index) => (
            <a key={index} href={src}>
              <img
                className="thumbnail"
                alt={`${selectedFolder}-img-${index}`}
                src={src}
                onContextMenu={(e) => e.preventDefault()}
              />
            </a>
          ))}
        </LightGallery>
      </div>
    );
  }

  return (
    <div className="album-links">
      {Object.entries(galleriesByYear)
        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
        .map(([year, galleries]) => (
          <div key={year}>
            <h2>{year}</h2>
            <div className="albums">
              {galleries.map((gallery) => (
                <div
                  key={gallery.value}
                  className="album"
                  onClick={() => setSelectedFolder(gallery.value)}
                >
                  <img
                    src={new URL(gallery.cover, import.meta.url).href} // Use the cover property for the album thumbnail
                    alt={gallery.label}
                    className="album-thumbnail"
                  />
                  <p>{gallery.label}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Gallery;
