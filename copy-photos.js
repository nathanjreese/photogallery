const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'src', 'Photos');
const destDir = path.join(__dirname, 'dist', 'Photos');

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