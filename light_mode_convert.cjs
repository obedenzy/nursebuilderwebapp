const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath);
    } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
      let content = fs.readFileSync(dirPath, 'utf8');
      
      // Text
      content = content.replace(/text-slate-100/g, 'text-slate-900');
      content = content.replace(/text-slate-200/g, 'text-slate-800');
      content = content.replace(/text-slate-300/g, 'text-slate-700');
      content = content.replace(/text-slate-400/g, 'text-slate-600');
      
      // Backgrounds
      content = content.replace(/bg-slate-950\/30/g, 'bg-slate-50');
      content = content.replace(/bg-slate-900\/50/g, 'bg-slate-50/50');
      content = content.replace(/bg-slate-900\/30/g, 'bg-slate-50/30');
      content = content.replace(/bg-slate-950/g, 'bg-white');
      content = content.replace(/bg-slate-900/g, 'bg-slate-50');
      content = content.replace(/bg-slate-800/g, 'bg-slate-100');
      
      // Borders
      content = content.replace(/border-slate-800/g, 'border-slate-200');
      content = content.replace(/border-slate-700/g, 'border-slate-300');
      content = content.replace(/border-white\/20/g, 'border-slate-200');
      content = content.replace(/border-white\/40/g, 'border-slate-200');
      content = content.replace(/border-white\/50/g, 'border-slate-200');
      content = content.replace(/border-white\/60/g, 'border-slate-200');
      content = content.replace(/border-white\/80/g, 'border-slate-200');

      // Emerald mapping back to dark
      content = content.replace(/text-emerald-400/g, 'text-emerald-700');
      content = content.replace(/text-emerald-300/g, 'text-emerald-800');
      content = content.replace(/bg-emerald-950\/30/g, 'bg-emerald-50');
      content = content.replace(/border-emerald-800/g, 'border-emerald-100');
      
      // Glass classes replaced with basic modern corporate shadow/border
      content = content.replace(/glass-card/g, 'bg-white border border-slate-200 shadow-sm');
      content = content.replace(/glass-nav/g, 'bg-white/90 backdrop-blur-md border-b border-slate-200');
      content = content.replace(/glass-dark/g, 'bg-slate-900 text-white shadow-md');
      
      // Luxury Shadows removed
      content = content.replace(/luxury-shadow-lg/g, 'shadow-lg');
      content = content.replace(/luxury-shadow/g, 'shadow-md');
      
      // Some text-white that got clobbered by glass-dark transition might be needed, but mostly UI buttons use bg-slate-900 text-white.
      
      fs.writeFileSync(dirPath, content);
    }
  });
}
walkDir('./components');
walkDir('./app');
