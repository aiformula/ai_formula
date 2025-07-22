const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/courses/chatgpt-complete-course/ChatGPTCompleteCourseUnit.tsx');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

console.log('Starting comprehensive syntax fix...');

// Fix all unterminated string literals by closing them properly
const syntaxFixes = [
  // Fix any trailing " :" patterns to be " " :
  {
    pattern: /(' : )/g,
    replacement: "' :"
  },
  // Fix any corrupted string endings with improper colons
  {
    pattern: /(\n\n[^']*) :/g,
    replacement: "$1.' :"
  },
  // Fix incomplete transcript strings
  {
    pattern: /'([^']*)\n\n([^']*) :/g,
    replacement: "'$1\\n\\n$2' :"
  }
];

// Apply syntax fixes
syntaxFixes.forEach((fix, index) => {
  const before = content;
  content = content.replace(fix.pattern, fix.replacement);
  if (content !== before) {
    console.log(`✅ Applied syntax fix ${index + 1}`);
  }
});

// Fix specific problematic sections that we know are causing issues
const specificFixes = [
  // Fix Unit 1.4 description corruption
  {
    old: `description: isZhHK ? '追溯GPT模型的發展歷程，了解每個版本的技術突破和關鍵能力提升點' : 'Trace the development history of GPT models, understanding the technical breakthroughs and key capability improvements of each generation.',`,
    new: `description: isZhHK ? '追溯GPT模型的發展歷程，了解每個版本的技術突破和關鍵能力提升點' : 'Trace the development history of GPT models, understanding the technical breakthroughs and key capability improvements of each generation.',`
  },
  
  // Fix any remaining duration corruptions
  {
    old: /duration: '(\d+)\?��\?',/g,
    new: "duration: '$1分鐘',"
  },
  
  // Fix any remaining title corruptions with single ?��? patterns
  {
    old: /title: isZhHK \? '\?��\?([^']*)/g,
    new: "title: isZhHK ? '單元$1"
  }
];

// Apply specific fixes
specificFixes.forEach((fix, index) => {
  const before = content;
  if (fix.old instanceof RegExp) {
    content = content.replace(fix.old, fix.new);
  } else {
    content = content.replace(fix.old, fix.new);
  }
  if (content !== before) {
    console.log(`✅ Applied specific fix ${index + 1}`);
  }
});

// Clean up any remaining corrupted characters in descriptions
const corruptionCleanup = [
  // Fix common corruption patterns
  { old: /�\?\?\?/g, new: '' },
  { old: /\?\?\?\?\?\?\?\?/g, new: '' },
  { old: /\?\?\?\?\?\?\?/g, new: '' },
  { old: /\?\?\?\?\?\?/g, new: '' },
  { old: /\?\?\?\?\?/g, new: '' },
  { old: /\?\?\?\?/g, new: '' },
  { old: /\?\?\?/g, new: '' },
  { old: /\?\?/g, new: '' },
  { old: /\?\��\?/g, new: '' },
  { old: /��\?/g, new: '' },
  { old: /�\?/g, new: '' }
];

// Apply corruption cleanup
corruptionCleanup.forEach((cleanup, index) => {
  const before = content;
  content = content.replace(cleanup.old, cleanup.new);
  if (content !== before) {
    console.log(`✅ Cleaned corruption pattern ${index + 1}`);
  }
});

// Write back to file
fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Comprehensive syntax fix completed!');
console.log('Fixed syntax errors and cleaned up corrupted characters.'); 