import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '../');

function processFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file.startsWith('.')) continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      processFiles(filePath);
    } else if (file.endsWith('.html') || file.endsWith('.css')) {
      let content = fs.readFileSync(filePath, 'utf8');
      const original = content;
      // Match assets/img/something.png or .jpg and replace with .webp
      content = content.replace(/(assets\/img\/[^"'\)]+)\.(png|jpg)/gi, '$1.webp');
      
      if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated references in: ${file}`);
      }
    }
  }
}

processFiles(rootDir);
console.log('Update complete.');
