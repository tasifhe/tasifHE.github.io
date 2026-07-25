import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '../');

function processHtmlFiles() {
  const files = fs.readdirSync(rootDir);
  for (const file of files) {
    if (!file.endsWith('.html')) continue;
    
    const filePath = path.join(rootDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // 1. Swap CSS
    content = content.replace(/href="assets\/css\/main-modular\.css"/g, 'href="assets/css/main.min.css"');

    // 2. Add aria-hidden to <i>
    content = content.replace(/<i class="bi([^"]*)"><\/i>/g, '<i class="bi$1" aria-hidden="true"></i>');

    // 3. Move scripts to head with defer (Only if not already moved)
    if (!content.includes('<!-- Deferred JS -->')) {
      const scriptRegex = /<!-- Vendor JS Files -->([\s\S]*?)<!-- Template Main JS File -->/g;
      const match = scriptRegex.exec(content);

      if (match) {
        let scripts = match[1];
        // Add defer to all script src tags in this block
        scripts = scripts.replace(/<script src="/g, '<script defer src="');
        
        // Find specific JS files
        const mainJsRegex = /<script src="assets\/js\/main\.js"><\/script>/;
        const mainJsDeferred = content.match(mainJsRegex) ? '<script defer src="assets/js/main.js"></script>' : '';
        
        const quickPeekRegex = /<script src="assets\/js\/quick-peek-modal\.js"><\/script>/;
        const quickPeekDeferred = content.match(quickPeekRegex) ? '<script defer src="assets/js/quick-peek-modal.js"></script>' : '';

        // Insert before </head>
        const insertPos = content.indexOf('</head>');
        if (insertPos !== -1) {
          const toInsert = `\n  <!-- Deferred JS -->\n${scripts}  ${mainJsDeferred}\n  ${quickPeekDeferred}\n`;
          content = content.slice(0, insertPos) + toInsert + content.slice(insertPos);
          
          // Remove them from the bottom
          content = content.replace(match[0], '<!-- Vendor JS Files Moved to Head -->');
          if (mainJsDeferred) content = content.replace(mainJsRegex, '<!-- Template Main JS File Moved to Head -->');
          if (quickPeekDeferred) content = content.replace(quickPeekRegex, '<!-- Quick Peek JS Moved to Head -->');
        }
      }
    }
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated HTML performance in: ${file}`);
    }
  }
}

processHtmlFiles();
console.log('Update complete.');
