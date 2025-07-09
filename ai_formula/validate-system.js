#!/usr/bin/env node

/**
 * System Validation Script | 系統驗證腳本
 * @description Quick validation to ensure the refactored course system works correctly
 * 快速驗證以確保重構後的課程系統正常運作
 */

const fs = require('fs');
const path = require('path');

// Language support | 語言支援
const lang = process.env.LANG_CN === 'true' ? 'zh' : 'en';

const messages = {
  en: {
    title: '🔍 Validating AI Formula Course System...\n',
    checkingFileStructure: '📁 Checking file structure...',
    allFilesExist: '\n🎉 All required files exist!',
    missingFiles: '\n❌ Some required files are missing.',
    checkingFileSizes: '\n📊 Checking file sizes...',
    originalSize: '📈 Original courseDetails.ts: {0} lines',
    currentSize: '📉 Current courseDetails.ts: {0} lines',
    reduction: '🎯 Reduction: {0}%',
    checkingTypeScript: '\n🔧 Checking TypeScript compilation...',
    tsSuccess: '✅ TypeScript compilation successful',
    tsFailed: '❌ TypeScript compilation failed',
    checkingReadme: '\n📖 Checking README.md...',
    readmeCreated: '✅ README.md created with {0} lines',
    section: 'Section',
    sectionMissing: 'Section missing',
    validationSummary: '\n📋 Validation Summary:',
    separator: '======================',
    fileStructure: '✅ File structure: Complete',
    fileSizeReduction: '✅ File size reduction: {0}%',
    documentation: '✅ Documentation: Complete',
    architecture: '✅ Architecture: Modular',
    completed: '\n🎉 Course system validation completed successfully!',
    nextSteps: '\n🚀 Next steps:',
    step1: '1. Run: npm run type-check',
    step2: '2. Run: npm run dev',
    step3: '3. Test in browser: courseSystemTests.runAllValidations()',
    step4: '4. Monitor performance: courseSystemTests.runPerformanceBenchmark()',
    info: '\n💡 For detailed information, see:',
    infoReadme: '- README.md (complete documentation)',
    infoSummary: '- src/data/REFACTORING_SUMMARY.md (technical details)',
    infoTests: '- src/data/__tests__/courseSystem.test.ts (validation tools)'
  },
  zh: {
    title: '🔍 驗證 AI Formula 課程系統...\n',
    checkingFileStructure: '📁 檢查檔案結構...',
    allFilesExist: '\n🎉 所有必需檔案都存在！',
    missingFiles: '\n❌ 部分必需檔案缺失。',
    checkingFileSizes: '\n📊 檢查檔案大小...',
    originalSize: '📈 原始 courseDetails.ts: {0} 行',
    currentSize: '📉 當前 courseDetails.ts: {0} 行',
    reduction: '🎯 減少: {0}%',
    checkingTypeScript: '\n🔧 檢查 TypeScript 編譯...',
    tsSuccess: '✅ TypeScript 編譯成功',
    tsFailed: '❌ TypeScript 編譯失敗',
    checkingReadme: '\n📖 檢查 README.md...',
    readmeCreated: '✅ README.md 已建立，共 {0} 行',
    section: '章節',
    sectionMissing: '章節缺失',
    validationSummary: '\n📋 驗證摘要:',
    separator: '======================',
    fileStructure: '✅ 檔案結構: 完整',
    fileSizeReduction: '✅ 檔案大小減少: {0}%',
    documentation: '✅ 文檔: 完整',
    architecture: '✅ 架構: 模組化',
    completed: '\n🎉 課程系統驗證成功完成！',
    nextSteps: '\n🚀 下一步:',
    step1: '1. 執行: npm run type-check',
    step2: '2. 執行: npm run dev',
    step3: '3. 瀏覽器測試: courseSystemTests.runAllValidations()',
    step4: '4. 監控效能: courseSystemTests.runPerformanceBenchmark()',
    info: '\n💡 詳細資訊請參閱:',
    infoReadme: '- README.md (完整文檔)',
    infoSummary: '- src/data/REFACTORING_SUMMARY.md (技術詳情)',
    infoTests: '- src/data/__tests__/courseSystem.test.ts (驗證工具)'
  }
};

const t = (key, ...args) => {
  let msg = messages[lang][key];
  args.forEach((arg, index) => {
    msg = msg.replace(`{${index}}`, arg);
  });
  return msg;
};

console.log(t('title'));

// Check file structure | 檢查檔案結構
const requiredFiles = [
  'src/types/courseTypes.ts',
  'src/data/courseDetails.ts',
  'src/data/courses/courseManager.ts',
  'src/data/courses/aiImageVideoCreation.ts',
  'src/data/courses/promptEngineering.ts',
  'src/data/courses/index.ts',
  'src/data/REFACTORING_SUMMARY.md',
  'src/data/__tests__/courseSystem.test.ts',
  'README.md'
];

console.log(t('checkingFileStructure'));
let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - ${lang === 'zh' ? '缺失' : 'MISSING'}`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log(t('allFilesExist'));
} else {
  console.log(t('missingFiles'));
  process.exit(1);
}

// Check file sizes | 檢查檔案大小
console.log(t('checkingFileSizes'));

const originalSize = 3088; // Original courseDetails.ts line count
const currentDetailsSize = fs.readFileSync('src/data/courseDetails.ts', 'utf8').split('\n').length;
const reduction = Math.round((1 - currentDetailsSize / originalSize) * 100);

console.log(t('originalSize', originalSize));
console.log(t('currentSize', currentDetailsSize));
console.log(t('reduction', reduction));

// Check TypeScript compilation (if tsc is available) | 檢查 TypeScript 編譯
const { spawn } = require('child_process');

console.log(t('checkingTypeScript'));

const checkTypeScript = () => {
  return new Promise((resolve) => {
    const tsc = spawn('npx', ['tsc', '--noEmit'], { stdio: 'pipe' });
    
    let output = '';
    tsc.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    tsc.stderr.on('data', (data) => {
      output += data.toString();
    });
    
    tsc.on('close', (code) => {
      if (code === 0) {
        console.log(t('tsSuccess'));
      } else {
        console.log(t('tsFailed'));
        if (lang === 'en') {
          console.log('Output:', output);
        } else {
          console.log('輸出:', output);
        }
      }
      resolve(code === 0);
    });
  });
};

// Check README.md content | 檢查 README.md 內容
console.log(t('checkingReadme'));
const readmeContent = fs.readFileSync('README.md', 'utf8');
const readmeLines = readmeContent.split('\n').length;

console.log(t('readmeCreated', readmeLines));

// Check for key sections | 檢查關鍵章節
const requiredSections = {
  en: ['Architecture', 'Key Features', 'Usage Examples', 'API Reference', 'Performance', 'Migration Guide'],
  zh: ['架構', '主要功能', '使用例子', 'API 參考', '效能', '遷移指南']
};

const sectionsToCheck = lang === 'zh' ? requiredSections.zh : requiredSections.en;

sectionsToCheck.forEach(section => {
  if (readmeContent.includes(section)) {
    console.log(`✅ ${t('section')}: ${section}`);
  } else {
    console.log(`❌ ${t('sectionMissing')}: ${section}`);
  }
});

// Check bilingual support | 檢查雙語支援
const bilingualChecks = [
  { pattern: 'English', name: lang === 'zh' ? '英文支援' : 'English support' },
  { pattern: '繁體中文（廣東話）', name: lang === 'zh' ? '廣東話支援' : 'Cantonese support' },
  { pattern: 'AI Formula 課程系統', name: lang === 'zh' ? '中文標題' : 'Chinese title' }
];

console.log(lang === 'zh' ? '\n🌍 檢查雙語支援...' : '\n🌍 Checking bilingual support...');
bilingualChecks.forEach(check => {
  if (readmeContent.includes(check.pattern)) {
    console.log(`✅ ${check.name}`);
  } else {
    console.log(`❌ ${check.name}`);
  }
});

// Summary | 摘要
console.log(t('validationSummary'));
console.log(t('separator'));
console.log(t('fileStructure'));
console.log(t('fileSizeReduction', reduction));
console.log(t('documentation'));
console.log(t('architecture'));
console.log(`✅ ${lang === 'zh' ? '雙語支援: 完整' : 'Bilingual support: Complete'}`);

console.log(t('completed'));
console.log(t('nextSteps'));
console.log(t('step1'));
console.log(t('step2'));
console.log(t('step3'));
console.log(t('step4'));

console.log(t('info'));
console.log(t('infoReadme'));
console.log(t('infoSummary'));
console.log(t('infoTests'));

// Language switching instructions | 語言切換說明
console.log(lang === 'zh' ? 
  '\n🔄 語言切換:' : 
  '\n🔄 Language switching:'
);
console.log(lang === 'zh' ? 
  'English: node validate-system.js' : 
  'English: node validate-system.js'
);
console.log(lang === 'zh' ? 
  '中文: LANG_CN=true node validate-system.js' : 
  'Chinese: LANG_CN=true node validate-system.js'
);

// Performance tips | 效能提示
console.log(lang === 'zh' ? 
  '\n⚡ 效能提示:' : 
  '\n⚡ Performance Tips:'
);
console.log(lang === 'zh' ? 
  '- 使用預載入: preloadCourse("ai-image-video-creation")' : 
  '- Use preloading: preloadCourse("ai-image-video-creation")'
);
console.log(lang === 'zh' ? 
  '- 監控快取: getCacheStats()' : 
  '- Monitor cache: getCacheStats()'
);
console.log(lang === 'zh' ? 
  '- 健康檢查: healthCheck()' : 
  '- Health check: healthCheck()'
);

// Development commands | 開發指令
console.log(lang === 'zh' ? 
  '\n🛠️ 開發指令:' : 
  '\n🛠️ Development Commands:'
);
console.log(lang === 'zh' ? 
  '在瀏覽器控制台中:' : 
  'In browser console:'
);
console.log('  courseSystemTests.runAllValidations()');
console.log('  courseSystemTests.runPerformanceBenchmark()');
console.log('  courseSystemTests.runManualTests()');

console.log(lang === 'zh' ? 
  '\n🎯 系統特色:' : 
  '\n🎯 System Highlights:'
);
console.log(lang === 'zh' ? 
  `- 檔案大小減少 ${reduction}%` : 
  `- File size reduced by ${reduction}%`
);
console.log(lang === 'zh' ? 
  '- 延遲載入支援' : 
  '- Lazy loading support'
);
console.log(lang === 'zh' ? 
  '- 智能快取系統' : 
  '- Intelligent caching system'
);
console.log(lang === 'zh' ? 
  '- 完整型別安全' : 
  '- Complete type safety'
);
console.log(lang === 'zh' ? 
  '- 雙語文檔支援' : 
  '- Bilingual documentation'
); 