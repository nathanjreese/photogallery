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
const indy8hour400Images2024 = import.meta.glob<{ default: string }>('./Photos/2024indy8hour/*.{jpg,JPG,png}', { eager: true });

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
  indy8hour2024: indy8hour400Images2024,
};

function Gallery() {
  const [selectedFolder, setSelectedFolder] = useState<'stpete2025' | 'indy5002025' | 'roadamerica2025'>('stpete2025');

  // Get images from the selected folder
  const images = folders[selectedFolder];
  const imageArray: string[] = Object.values(images).map((img) => img.default);

  const onInit = (detail: any) => {
    console.log('lightGallery initialized');

    const galleryElement = detail.instance.$container.get();
    galleryElement.addEventListener('contextmenu', (e: Event) => e.preventDefault());
  };

  return (
    <div className="App">
      <label className="folder-select" htmlFor="folderSelect">Select Gallery: </label>
      <select
        id="folderSelect"
        className='folder-dropdown'
        value={selectedFolder}
        onChange={(e) => setSelectedFolder(e.target.value as 'stpete2025' | 'indy5002025' | 'roadamerica2025')}
        style={{ marginBottom: '1rem' }}
      >
        <option value="stpete2025">2025 GP of St Pete</option>
        <option value="indygp2025">2025 Indy GP</option>
        <option value="indy5002025">2025 Indy 500</option>
        <option value="gateway2025">2025 Bommarito Auto Group 500</option>
        <option value="brickyard4002025">2025 Brickyard 400</option>
        <option value="indy5002024">2024 Indy 500</option>
        <option value="gateway2024">2024 Bommarito Auto Group 500</option>
        <option value="brickyard4002024">2024 Brickyard 400</option>
        <option value="imsaindy2024">2024 IMSA Battle on the Bricks</option>
        <option value="indy8hour2024">2024 Indy 8 Hour</option>



      </select>

      <LightGallery
        onInit={onInit}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        download={false} // Hide download button
        key={selectedFolder} // force re-init when folder changes
      >
        {imageArray.map((src, index) => (
          <a key={index} href={src}>
            <img
              className="thumbnail"
              alt={`${selectedFolder}-img-${index}`}
              src={src}
              onContextMenu={(e) => e.preventDefault()} // block right-click on thumbnails
            />
          </a>
        ))}
      </LightGallery>
    </div>
  );
}

export default Gallery;
