import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgDir = path.join(__dirname, '../assets/img');

async function processImages(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await processImages(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      // Only process heavy formats
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        const fileBase = path.basename(file, ext);
        const webpPath = path.join(directory, `${fileBase}.webp`);
        
        // Skip if webp already exists
        if (fs.existsSync(webpPath)) {
          console.log(`Skipping (already exists): ${webpPath}`);
          continue;
        }

        console.log(`Processing: ${file}`);
        
        try {
          const image = sharp(filePath);
          const metadata = await image.metadata();
          
          let sharpInstance = image;
          
          // Downscale if wider than 1920px (e.g. huge screenshots)
          if (metadata.width > 1920) {
            sharpInstance = sharpInstance.resize({ width: 1920, withoutEnlargement: true });
          }
          
          await sharpInstance
            .webp({ quality: 80 })
            .toFile(webpPath);
            
          const originalSize = stat.size / 1024 / 1024;
          const newSize = fs.statSync(webpPath).size / 1024 / 1024;
          console.log(`✅ Converted ${file}: ${originalSize.toFixed(2)}MB -> ${newSize.toFixed(2)}MB`);
          
        } catch (error) {
          console.error(`❌ Error processing ${file}:`, error.message);
        }
      }
    }
  }
}

console.log('Starting image optimization...');
processImages(imgDir)
  .then(() => console.log('Image optimization complete!'))
  .catch(err => console.error(err));
