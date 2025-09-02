const fs = require('fs');
const path = require('path');

// Files that need fixing
const filesToFix = [
  'src/pages/blog/BlogListing.tsx',
  'src/components/course/LearningMaterials.tsx'
];

// Common fix patterns
const fixes = [
  // Fix missing JSX closing tags
  { pattern: /className="([^"]*)"(\s*)$/gm, replacement: 'className="$1">$2' },
  { pattern: /<Eye className="([^"]*)"(\s*)$/gm, replacement: '<Eye className="$1" />$2' },
  { pattern: /<span className="([^"]*)"(\s*)$/gm, replacement: '<span className="$1">$2' },
  { pattern: /<div className="([^"]*)"(\s*)$/gm, replacement: '<div className="$1">$2' },
  
  // Fix Chinese character corruptions
  { pattern: /的費/g, replacement: '免費' },
  { pattern: /進階的/g, replacement: '搜尋' },
  { pattern: /課程資料/g, replacement: '課程' },
  { pattern: /資料的/g, replacement: '資料' },
  { pattern: /的度/g, replacement: '進度' },
  
  // Fix missing ternary operators
  { pattern: /language === 'zh-HK'\s+([^:]+):/g, replacement: "language === 'zh-HK' ? $1 :" },
  
  // Fix missing closing brackets and quotes
  { pattern: /\s*\)\s*$/gm, replacement: ' });' },
];

console.log('Starting ultimate fix...');

filesToFix.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  
  if (fs.existsSync(fullPath)) {
    try {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      fixes.forEach(fix => {
        content = content.replace(fix.pattern, fix.replacement);
      });
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Fixed: ${filePath}`);
      } else {
        console.log(`No changes needed: ${filePath}`);
      }
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
    }
  } else {
    console.log(`File not found: ${filePath}`);
  }
});

console.log('Ultimate fix completed!'); 