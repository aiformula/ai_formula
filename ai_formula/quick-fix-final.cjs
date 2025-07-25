const fs = require('fs');
const path = require('path');

// Quick fix for remaining files
const fixes = [
  { file: 'src/App.tsx', pattern: /\?示工\?\?\?\?/g, replacement: '提示工具' },
  { file: 'src/components/SEO/SitemapGenerator.tsx', pattern: /Visit \?\?/g, replacement: 'Visit' },
  { file: 'src/tests/ColorSystemTest.tsx', pattern: /\?\?\?/g, replacement: '' },
  { file: 'src/pages/ThemeTest.tsx', pattern: /\?\?\?/g, replacement: '' },
  { file: 'src/pages/NotFound.tsx', pattern: /\?\?\?/g, replacement: '' },
  { file: 'src/pages/courses/ProPlanLearningRefactored.tsx', pattern: /\?\?\?/g, replacement: '' },
  { file: 'src/components/templates/CourseOutlineTemplate.tsx', pattern: /\?\?\?/g, replacement: '' },
];

fixes.forEach(fix => {
  const filePath = path.join(__dirname, fix.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(fix.pattern, fix.replacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed: ' + fix.file);
  }
});

console.log('Quick fixes completed!');
