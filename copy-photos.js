import fs from 'fs';
import path from 'path';

const sourceDir = path.join(process.cwd(), 'src', 'Photos');
const destDir = path.join(process.cwd(), 'dist', 'Photos');

function copyPhotosRecursive(source, destination) {
  if (!fs.existsSync(source)) {
    console.error('Source does not exist:', source);
    return;
  }

  const stats = fs.statSync(source);

  if (stats.isDirectory()) {
    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    // Recursively copy each item in the directory
    fs.readdirSync(source).forEach((item) => {
      const sourceItem = path.join(source, item);
      const destItem = path.join(destination, item);
      copyPhotosRecursive(sourceItem, destItem);
    });
  } else if (stats.isFile()) {
    // Copy the file
    fs.copyFileSync(source, destination);
    console.log(`Copied: ${source} -> ${destination}`);
  }
}

function copyPhotos() {
  copyPhotosRecursive(sourceDir, destDir);
}

copyPhotos();