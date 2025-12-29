import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, 'src/assets/Projects');
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.avif'];

/**
 * Rename all images in a category folder to {Category}XXX format
 */
async function renameImagesInCategory(categoryDir) {
  const categoryName = path.basename(categoryDir);
  const entries = await fs.readdir(categoryDir, { withFileTypes: true });
  
  // Get only image files
  const imageFiles = entries
    .filter(e => e.isFile() && SUPPORTED_EXTENSIONS.includes(path.extname(e.name).toLowerCase()))
    .map(e => e.name)
    .sort((a, b) => {
      // Sort by number if possible
      const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
      const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
      return numA - numB;
    });

  console.log(`\n${categoryName}: Found ${imageFiles.length} images`);
  
  let index = 1;
  const renameOps = [];
  
  for (const fileName of imageFiles) {
    const ext = path.extname(fileName).toLowerCase();
    const paddedIndex = String(index).padStart(3, '0');
    const newName = `${categoryName}${paddedIndex}${ext}`;
    const oldPath = path.join(categoryDir, fileName);
    const newPath = path.join(categoryDir, newName);
    
    if (fileName !== newName) {
      renameOps.push({ oldPath, newPath, oldName: fileName, newName });
    } else {
      console.log(`  ✓ ${fileName} (already correct)`);
    }
    index++;
  }
  
  // Execute renames (use temp names to avoid conflicts)
  for (const { oldPath, newPath, oldName, newName } of renameOps) {
    const tempPath = oldPath + '.temp_rename';
    await fs.rename(oldPath, tempPath);
    await fs.rename(tempPath, newPath);
    console.log(`  ✓ ${oldName} → ${newName}`);
  }
  
  return imageFiles.length;
}

async function main() {
  console.log('═'.repeat(50));
  console.log('Image Renaming Script');
  console.log('═'.repeat(50));
  console.log(`Input: ${INPUT_DIR}`);
  
  const categories = await fs.readdir(INPUT_DIR, { withFileTypes: true });
  let totalImages = 0;
  
  for (const category of categories) {
    if (category.isDirectory()) {
      const categoryPath = path.join(INPUT_DIR, category.name);
      const count = await renameImagesInCategory(categoryPath);
      totalImages += count;
    }
  }
  
  console.log('\n' + '═'.repeat(50));
  console.log(`Renamed ${totalImages} images total`);
  console.log('═'.repeat(50));
  console.log('\nNow run: node optimize-images.js');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
