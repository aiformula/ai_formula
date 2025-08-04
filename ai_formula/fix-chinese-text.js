/**
 * Fix Hardcoded Chinese Text - UK English Translation Script
 * This script replaces hardcoded Chinese text with conditional translations
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔄 Starting hardcoded Chinese text fixes...');

// Define text replacements
const textReplacements = [
  {
    pattern: /<span className="stat-card-title text-label">學習時間<\/span>/g,
    replacement: '<span className="stat-card-title text-label">{isZhHK ? \'學習時間\' : \'Study Time\'}</span>'
  },
  {
    pattern: />\s*學習時間\s*</g,
    replacement: '>{isZhHK ? \'學習時間\' : \'Study Time\'}<'
  },
  {
    pattern: />\s*已完成\s*</g,
    replacement: '>{isZhHK ? \'已完成\' : \'Completed\'}<'
  },
  {
    pattern: /技能發展追蹤/g,
    replacement: '{isZhHK ? \'技能發展追蹤\' : \'Skills Development Tracking\'}'
  },
  {
    pattern: /學習進度總覽/g,
    replacement: '{isZhHK ? \'學習進度總覽\' : \'Learning Progress Overview\'}'
  },
  {
    pattern: /已完成主題/g,
    replacement: '{isZhHK ? \'已完成主題\' : \'Completed Themes\'}'
  },
  {
    pattern: /剩餘主題/g,
    replacement: '{isZhHK ? \'剩餘主題\' : \'Remaining Themes\'}'
  },
  {
    pattern: /整體學習進度/g,
    replacement: '{isZhHK ? \'整體學習進度\' : \'Overall Learning Progress\'}'
  },
  {
    pattern: /% 已完成/g,
    replacement: '% {isZhHK ? \'已完成\' : \'completed\'}'
  },
  {
    pattern: /所有單元已完成！/g,
    replacement: '{isZhHK ? \'所有單元已完成！\' : \'All units completed!\'}'
  },
  {
    pattern: /題目/g,
    replacement: '{isZhHK ? \'題目\' : \'Questions\'}'
  },
  {
    pattern: /分鐘/g,
    replacement: '{isZhHK ? \'分鐘\' : \'minutes\'}'
  },
  {
    pattern: /及格/g,
    replacement: '{isZhHK ? \'及格\' : \'Pass\'}'
  },
  {
    pattern: /選擇題形式/g,
    replacement: '{isZhHK ? \'選擇題形式\' : \'Multiple Choice\'}'
  },
  {
    pattern: /限時完成/g,
    replacement: '{isZhHK ? \'限時完成\' : \'Time Limited\'}'
  },
  {
    pattern: /通過標準/g,
    replacement: '{isZhHK ? \'通過標準\' : \'Passing Standard\'}'
  }
];

// Files to process
const filesToProcess = [
  './src/pages/courses/chatgpt-complete-course/ChatGPTCompleteCourseLearning.tsx',
  './src/pages/courses/chatgpt-complete-course/ChatGPTCompleteCourseQuiz.tsx',
  './src/pages/courses/chatgpt-complete-course/ChatGPTCompleteCourseUnit.tsx',
  './src/pages/courses/chatgpt-complete-course/ChatGPTCompleteCourseTheme.tsx'
];

// Process each file
filesToProcess.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    console.log(`📝 Processing: ${filePath}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changesMade = 0;
    
    // Apply text replacements
    textReplacements.forEach(({pattern, replacement}) => {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, replacement);
        changesMade += matches.length;
      }
    });
    
    if (changesMade > 0) {
      fs.writeFileSync(filePath, content);
      console.log(`  ✅ Made ${changesMade} changes`);
    } else {
      console.log(`  ℹ️ No changes needed`);
    }
  } else {
    console.log(`  ⚠️ File not found: ${filePath}`);
  }
});

console.log('\n🎉 Hardcoded Chinese text fixes completed!');
console.log('📋 Summary:');
console.log('   - Fixed Chinese text in learning pages');
console.log('   - Added conditional translations using isZhHK pattern');
console.log('   - Ensured UI consistency with language switching'); 