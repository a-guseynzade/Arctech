import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// CONFIGURATION (Defaults)
// ============================================
const DEFAULT_INPUT_DIR = path.join(__dirname, 'src/assets/Projects');
const DEFAULT_OUTPUT_DIR = path.join(__dirname, 'public/gallery');

const FULL_QUALITY = 80;
const THUMB_QUALITY = 70;
const THUMB_WIDTH = 400;

const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.avif'];

// ============================================
// CLI ARGUMENT PARSING
// ============================================
function parseArgs() {
  const args = process.argv.slice(2);
  const config = {
    files: [],           // Specific files to process
    outputDir: null,     // Custom output directory
    quality: FULL_QUALITY,
    noThumbs: false,     // Skip thumbnail generation
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--output' || arg === '-o') {
      config.outputDir = path.resolve(__dirname, args[++i]);
    } else if (arg === '--quality' || arg === '-q') {
      config.quality = parseInt(args[++i], 10);
    } else if (arg === '--no-thumbs') {
      config.noThumbs = true;
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else if (!arg.startsWith('-')) {
      // Treat as input file
      config.files.push(path.resolve(__dirname, arg));
    }
  }

  return config;
}

function printHelp() {
  console.log(`
📷 Image Optimization Script

Usage:
  node optimize-images.js [options] [files...]

Options:
  -o, --output <dir>   Output directory (default: public/gallery)
  -q, --quality <n>    WebP quality 1-100 (default: 80)
  --no-thumbs          Skip thumbnail generation
  -h, --help           Show this help message

Examples:
  # Default: Process all images from src/assets/Projects → public/gallery
  node optimize-images.js

  # Process specific files to a custom output directory
  node optimize-images.js src/assets/hero-bg.png -o src/assets

  # Process multiple files with custom quality
  node optimize-images.js file1.jpg file2.png -q 90 -o dist/images

  # Process with no thumbnails
  node optimize-images.js --no-thumbs
`);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

async function getImageFiles(dir, baseDir = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const subFiles = await getImageFiles(fullPath, baseDir);
      files.push(...subFiles);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (SUPPORTED_EXTENSIONS.includes(ext)) {
        const relativePath = path.relative(baseDir, fullPath);
        files.push({
          fullPath,
          relativePath,
          name: path.basename(entry.name, ext),
          ext,
          subDir: path.dirname(relativePath),
        });
      }
    }
  }

  return files;
}

// ============================================
// IMAGE PROCESSING
// ============================================
async function processImage(imageInfo, outputDir, quality, generateThumbs) {
  const { fullPath, name, subDir } = imageInfo;

  // Create output subdirectory if needed
  const outputSubDir = subDir !== '.' ? path.join(outputDir, subDir) : outputDir;
  await ensureDir(outputSubDir);

  const fullOutputPath = path.join(outputSubDir, `${name}_full.webp`);

  try {
    // Create full version
    await sharp(fullPath)
      .webp({ quality })
      .toFile(fullOutputPath);

    console.log(`✓ Full:  ${path.relative(outputDir, fullOutputPath)}`);

    // Create thumbnail version (if enabled)
    if (generateThumbs) {
      const thumbOutputPath = path.join(outputSubDir, `${name}_thumb.webp`);
      await sharp(fullPath)
        .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
        .webp({ quality: THUMB_QUALITY })
        .toFile(thumbOutputPath);

      console.log(`✓ Thumb: ${path.relative(outputDir, thumbOutputPath)}`);
    }

    return { success: true, name };
  } catch (err) {
    console.error(`✗ Error processing ${name}: ${err.message}`);
    return { success: false, name, error: err.message };
  }
}

// ============================================
// MAIN
// ============================================
async function main() {
  const config = parseArgs();
  const generateThumbs = !config.noThumbs;

  console.log('═'.repeat(50));
  console.log('🖼️  Image Optimization Script');
  console.log('═'.repeat(50));

  let imageFiles = [];
  let outputDir;

  if (config.files.length > 0) {
    // Mode: Specific files
    outputDir = config.outputDir || path.dirname(config.files[0]);

    for (const filePath of config.files) {
      const ext = path.extname(filePath).toLowerCase();
      if (SUPPORTED_EXTENSIONS.includes(ext)) {
        imageFiles.push({
          fullPath: filePath,
          relativePath: path.basename(filePath),
          name: path.basename(filePath, ext),
          ext,
          subDir: '.',
        });
      } else {
        console.warn(`⚠️  Skipping unsupported file: ${filePath}`);
      }
    }

    console.log(`📂 Output: ${outputDir}`);
    console.log(`📷 Files:  ${config.files.length} specified`);
  } else {
    // Mode: Default (process entire directory)
    outputDir = config.outputDir || DEFAULT_OUTPUT_DIR;

    console.log(`📂 Input:  ${DEFAULT_INPUT_DIR}`);
    console.log(`📂 Output: ${outputDir}`);

    imageFiles = await getImageFiles(DEFAULT_INPUT_DIR);
  }

  console.log('─'.repeat(50));

  if (imageFiles.length === 0) {
    console.log('⚠️  No images found to process.');
    return;
  }

  console.log(`📷 Found ${imageFiles.length} image(s) to process\n`);

  // Ensure output directory exists
  await ensureDir(outputDir);

  // Process all images
  const results = [];
  for (const imageInfo of imageFiles) {
    console.log(`\n📸 Processing: ${imageInfo.relativePath}`);
    const result = await processImage(imageInfo, outputDir, config.quality, generateThumbs);
    results.push(result);
  }

  // Summary
  const successful = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;
  const filesCreated = generateThumbs ? successful * 2 : successful;

  console.log('\n' + '═'.repeat(50));
  console.log('📊 Summary');
  console.log('─'.repeat(50));
  console.log(`✅ Successful: ${successful} images (${filesCreated} files created)`);
  if (failed > 0) {
    console.log(`❌ Failed: ${failed} images`);
  }
  console.log('═'.repeat(50));
  console.log('🎉 Optimization complete!');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
