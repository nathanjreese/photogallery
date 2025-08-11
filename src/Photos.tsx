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
const stpeteImages = import.meta.glob<{ default: string }>('./Photos/stpete/*.{jpg,JPG,png}', { eager: true });
const indy500Images = import.meta.glob<{ default: string }>('./Photos/indy500/*.{jpg,JPG,png}', { eager: true });
const indyGpImages = import.meta.glob<{ default: string }>('./Photos/indygp/*.{jpg,JPG,png}', { eager: true });
const gatewayImages = import.meta.glob<{ default: string }>('./Photos/gateway/*.{jpg,JPG,png}', { eager: true });
const brickyard400Images = import.meta.glob<{ default: string }>('./Photos/brickyard400/*.{jpg,JPG,png}', { eager: true });


// Map folder names to their images
const folders: Record<string, Record<string, { default: string }>> = {
  stpete: stpeteImages,
  indy500: indy500Images,
  indygp: indyGpImages,
  brickyard400: brickyard400Images,
  gateway: gatewayImages// Assuming you have a gateway folder
};

function Gallery() {
  const [selectedFolder, setSelectedFolder] = useState<'stpete' | 'indy500' | 'roadamerica'>('stpete');

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
        onChange={(e) => setSelectedFolder(e.target.value as 'stpete' | 'indy500' | 'roadamerica')}
        style={{ marginBottom: '1rem' }}
      >
        <option value="stpete">2025 GP of St Pete</option>
        <option value="indygp">2025 Indy GP</option>
        <option value="indy500">2025 Indy 500</option>
        <option value="gateway">2025 Bommarito Auto Group 500</option>
        <option value="brickyard400">2025 Brickyard 400</option>
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
