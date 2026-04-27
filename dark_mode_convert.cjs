const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./components', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replacements for Dark Mode
    content = content.replace(/text-slate-950/g, 'text-slate-100');
    content = content.replace(/text-slate-900/g, 'text-slate-200');
    content = content.replace(/text-slate-800/g, 'text-slate-300');
    content = content.replace(/text-slate-700/g, 'text-slate-400');
    content = content.replace(/text-slate-600/g, 'text-slate-400');
    
    // Background replacements
    content = content.replace(/bg-white/g, 'bg-slate-950');
    content = content.replace(/bg-slate-50\/50/g, 'bg-slate-900/50');
    content = content.replace(/bg-slate-50\/30/g, 'bg-slate-900/30');
    content = content.replace(/bg-slate-50/g, 'bg-slate-900');
    content = content.replace(/bg-slate-100/g, 'bg-slate-800');
    content = content.replace(/bg-slate-200/g, 'bg-slate-800');

    // Borders
    content = content.replace(/border-slate-100/g, 'border-slate-800');
    content = content.replace(/border-slate-200/g, 'border-slate-800');
    content = content.replace(/border-slate-300/g, 'border-slate-700');
    
    // Hover backgrounds
    content = content.replace(/hover:bg-slate-50/g, 'hover:bg-slate-800');
    content = content.replace(/hover:bg-slate-100/g, 'hover:bg-slate-800');

    // Text variations that were white before and now need to contrast against dark backgrounds
    // Wait, things that were text-white inside dark cards might need to stay text-white.
    // Things that were bg-slate-950 need to become bg-slate-900 or stay 950.
    // I will replace `glass-dark` bg-slate-900 inside globals.css so it works nicely.
    
    fs.writeFileSync(filePath, content);
  }
});
console.log('Conversion complete!');
