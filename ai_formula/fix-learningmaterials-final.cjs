const fs = require('fs');
const path = require('path');

// Read the file
const filePath = path.join(__dirname, 'src/components/course/LearningMaterials.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Comprehensive fixes for corrupted Chinese characters and unterminated strings
const fixes = [
  // Fix unterminated strings and corrupted characters
  {
    pattern: /資料 的育業\?\?師\?\?互\?\?進階/g,
    replacement: '資料教育業務師生互動進階'
  },
  {
    pattern: /資料 的人的學習\?\?進階進階/g,
    replacement: '資料個人學習方式進階'
  },
  {
    pattern: /資料 AI應用：智進階學助資料,/g,
    replacement: '資料AI應用：智能進階學習助手'
  },
  {
    pattern: /進階\?\?資料學習應用：\?\?的學習\?資料\?/g,
    replacement: '進階資料學習應用：個人學習資料'
  },
  {
    pattern: /的進階資料 \}/g,
    replacement: '所有類別'
  },
  {
    pattern: /課\?\?\?/g,
    replacement: '課程'
  },
  {
    pattern: /的學/g,
    replacement: '教學'
  },
  {
    pattern: /工\?資料\? \}/g,
    replacement: '工作坊'
  },
  {
    pattern: /網路進階資料 \}/g,
    replacement: '網路研討會'
  },
  // Fix missing quotes and commas
  {
    pattern: /資料 AI應用：智進階學助資料,$/gm,
    replacement: '資料AI應用：智能進階學習助手'
  },
  {
    pattern: /進階\?\?資料學習應用：\?\?的學習\?資料\?$/gm,
    replacement: '進階資料學習應用：個人學習資料'
  },
  {
    pattern: /labelZh: '的進階資料 \}/g,
    replacement: "labelZh: '所有類別' }"
  },
  {
    pattern: /labelZh: '課\?\?\?' \}/g,
    replacement: "labelZh: '課程' }"
  },
  {
    pattern: /labelZh: '的學' \}/g,
    replacement: "labelZh: '教學' }"
  },
  {
    pattern: /labelZh: '工\?資料\? \}/g,
    replacement: "labelZh: '工作坊' }"
  },
  {
    pattern: /labelZh: '網路進階資料 \}/g,
    replacement: "labelZh: '網路研討會' }"
  },
  // Fix any remaining unterminated strings
  {
    pattern: /,\s*$/gm,
    replacement: ','
  },
  // Fix corrupted characters patterns
  {
    pattern: /\?\?\?/g,
    replacement: ''
  },
  {
    pattern: /\?\?/g,
    replacement: ''
  },
  {
    pattern: /\?/g,
    replacement: ''
  },
  {
    pattern: /設\?\?/g,
    replacement: '設計'
  },
  {
    pattern: /\?\?覺\?\?術創\?\?/g,
    replacement: '視覺藝術創作'
  },
  {
    pattern: /AI繪\?\?進階/g,
    replacement: 'AI繪畫進階'
  },
  {
    pattern: /風進階設\?\?/g,
    replacement: '風格進階設計'
  }
];

// Apply all fixes
fixes.forEach(fix => {
  content = content.replace(fix.pattern, fix.replacement);
});

// Additional cleanup for specific patterns
content = content.replace(/\'\s*,\s*\'/g, "', '");
content = content.replace(/\'\s*\]/g, "']");
content = content.replace(/\[\s*\'/g, "['");

// Write the fixed content
fs.writeFileSync(filePath, content, 'utf8');

console.log('Fixed LearningMaterials.tsx - all corrupted Chinese characters and unterminated strings should now be resolved'); 