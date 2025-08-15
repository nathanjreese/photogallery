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
const galleriesByYear: Record<string, { value: string; label: string }[]> = {
  "2025": [
    { value: "brickyard4002025", label: "2025 Brickyard 400" },
    { value: "gateway2025", label: "2025 Bommarito Auto Group 500" },
    { value: "indy5002025", label: "2025 Indy 500" },
    { value: "indygp2025", label: "2025 Indy GP" },
    { value: "stpete2025", label: "2025 GP of St Pete" }
  ],
  "2024": [
    { value: "indy8hour2024", label: "2024 Indy 8 Hour" },
    { value: "imsaindy2024", label: "2024 IMSA Battle on the Bricks" },
    { value: "nashville2024", label: "2024 Nashville Music City Grand Prix" },
    { value: "gateway2024", label: "2024 Bommarito Auto Group 500" },
    { value: "brickyard4002024", label: "2024 Brickyard 400" },
    { value: "midohio2024", label: "2024 Mid-Ohio" },
    { value: "roadamerica2024", label: "2024 Road America" },
    { value: "indy5002024", label: "2024 Indy 500" },
    { value: "indygp2024", label: "2024 Indy GP" },
    { value: "longbeach2024", label: "2024 Long Beach Grand Prix" },
    { value: "stpete2024", label: "2024 GP of St Pete" }
  ]
};

function Gallery() {
  const [selectedYear, setSelectedYear] = useState<keyof typeof galleriesByYear>("2025");
  const [selectedFolder, setSelectedFolder] = useState<string>(galleriesByYear["2025"][0].value);

  const images = folders[selectedFolder];
  const imageArray: string[] = Object.values(images).map((img) => img.default);

  const onInit = (detail: any) => {
    console.log('lightGallery initialized');
    const galleryElement = detail.instance.$container.get();
    galleryElement.addEventListener('contextmenu', (e: Event) => e.preventDefault());
  };

  return (
    <div className="folder-select">
      {/* Year Dropdown */}
      <label htmlFor="yearSelect">Select Year: </label>
      <select
        id="yearSelect"
        className="folder-dropdown"
        value={selectedYear}
        onChange={(e) => {
            const newYear = e.target.value as keyof typeof galleriesByYear;
            setSelectedYear(newYear);
            setSelectedFolder(galleriesByYear[newYear][0].value);
        }}
        style={{
            marginBottom: '1.5rem', // increased space after year dropdown
            fontSize: '1.05rem',
            padding: '0.4rem',
        }}
        >
        {Object.keys(galleriesByYear)
          .sort((a, b) => Number(b) - Number()) // oldest first
          .map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
      </select>

      {/* Event Dropdown */}
      <label htmlFor="eventSelect">Select Event: </label>
      <select
        id="eventSelect"
        className="folder-dropdown"
        value={selectedFolder}
        onChange={(e) => setSelectedFolder(e.target.value)}
        style={{ marginBottom: '1rem' }}
      >
        {galleriesByYear[selectedYear].map((gallery) => (
          <option key={gallery.value} value={gallery.value}>
            {gallery.label}
          </option>
        ))}
      </select>

      {/* LightGallery */}
      <LightGallery
        onInit={onInit}
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

export default Gallery;
