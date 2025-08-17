import fs from 'fs';
import path from 'path';

const sourceDir = path.join(process.cwd(), 'src', 'Photos');
const destDir = path.join(process.cwd(), 'dist', 'Photos');

function copyPhotos() {
  if (!fs.existsSync(sourceDir)) {
    console.error('Source directory does not exist:', sourceDir);
    return;
  }

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.readdirSync(sourceDir).forEach((file) => {
    const sourceFile = path.join(sourceDir, file);
    const destFile = path.join(destDir, file);
    fs.copyFileSync(sourceFile, destFile);
    console.log(`Copied: ${sourceFile} -> ${destFile}`);
  });
}

copyPhotos();