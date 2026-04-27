const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const replacements = [
    { from: /text-indigo"/g, to: 'text-indigo-600"' },
    { from: /text-indigo /g, to: 'text-indigo-600 ' },
    { from: /bg-indigo\/10/g, to: 'bg-indigo-50' },
    { from: /border-indigo\/10/g, to: 'border-indigo-100' },
    { from: /glass-dark/g, to: 'bg-[#1a1f36] text-white shadow-md' },
    { from: /glass-nav/g, to: 'bg-white border-b border-slate-200 shadow-sm' },
    { from: /bg-\[\#121626\]/g, to: 'bg-[#1a1f36]' }
  ];

  for (const { from, to } of replacements) {
    if (from.test(content)) {
      content = content.replace(from, to);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

processDirectory('./components');
processDirectory('./app');
