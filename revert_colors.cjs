const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath);
    } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
      let content = fs.readFileSync(dirPath, 'utf8');
      
      content = content.replace(/text-onyx/g, 'text-slate-900');
      content = content.replace(/bg-onyx/g, 'bg-[#121626]'); // The really dark blue
      content = content.replace(/ember/g, 'indigo');
      
      content = content.replace(/rounded-full/g, 'rounded-full');
      // I'll keep rounded-full for buttons.
      
      fs.writeFileSync(dirPath, content);
    }
  });
}
walkDir('./components');
walkDir('./app');
