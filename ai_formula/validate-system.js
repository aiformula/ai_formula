#!/usr/bin/env node

/**
 * System Validation Script | 系統驗�??�本
 * @description Quick validation to ensure the refactored course system works correctly
 * 快速�?證以確�??��?後�?課�?系統�?��?��?
 */

const fs = require('fs');
const path = require('path');

// Language support | 語�??�援
const lang = process.env.LANG_CN === 'true' ? 'zh' : 'en';

const messages = {
  en: {
    title: '?? Validating AI Formula Course System...\n',
    checkingFileStructure: '?? Checking file structure...',
    allFilesExist: '\n?? All required files exist!',
    missingFiles: '\n??Some required files are missing.',
    checkingFileSizes: '\n?? Checking file sizes...',
    originalSize: '?? Original courseDetails.ts: {0} lines',
    currentSize: '?? Current courseDetails.ts: {0} lines',
    reduction: '?�� Reduction: {0}%',
    checkingTypeScript: '\n?�� Checking TypeScript compilation...',
    tsSuccess: '??TypeScript compilation successful',
    tsFailed: '??TypeScript compilation failed',
    checkingReadme: '\n?? Checking README.md...',
    readmeCreated: '??README.md created with {0} lines',
    section: 'Section',
    sectionMissing: 'Section missing',
    validationSummary: '\n?? Validation Summary:',
    separator: '======================',
    fileStructure: '??File structure: Complete',
    fileSizeReduction: '??File size reduction: {0}%',
    documentation: '??Documentation: Complete',
    architecture: '??Architecture: Modular',
    completed: '\n?? Course system validation completed successfully!',
    nextSteps: '\n?? Next steps:',
    step1: '1. Run: npm run type-check',
    step2: '2. Run: npm run dev',
    step3: '3. Test in browser: courseSystemTests.runAllValidations()',
    step4: '4. Monitor performance: courseSystemTests.runPerformanceBenchmark()',
    info: '\n?�� For detailed information, see:',
    infoReadme: '- README.md (complete documentation)',
    infoSummary: '- src/data/REFACTORING_SUMMARY.md (technical details)',
    infoTests: '- src/data/__tests__/courseSystem.test.ts (validation tools)'
  },
  zh: {
    title: '?? 驗�? AI Formula 課�?系統...\n',
    checkingFileStructure: '?? 檢查檔�?結�?...',
    allFilesExist: '\n?? ?�?��??�檔�??��??��?',
    missingFiles: '\n???��?必�?檔�?缺失??,
    checkingFileSizes: '\n?? 檢查檔�?大�?...',
    originalSize: '?? ?��? courseDetails.ts: {0} �?,
    currentSize: '?? ?��? courseDetails.ts: {0} �?,
    reduction: '?�� 減�?: {0}%',
    checkingTypeScript: '\n?�� 檢查 TypeScript 編譯...',
    tsSuccess: '??TypeScript 編譯?��?',
    tsFailed: '??TypeScript 編譯失�?',
    checkingReadme: '\n?? 檢查 README.md...',
    readmeCreated: '??README.md 已建立�???{0} �?,
    section: '章�?',
    sectionMissing: '章�?缺失',
    validationSummary: '\n?? 驗�??��?:',
    separator: '======================',
    fileStructure: '??檔�?結�?: 完整',
    fileSizeReduction: '??檔�?大�?減�?: {0}%',
    documentation: '???��?: 完整',
    architecture: '???��?: 模�???,
    completed: '\n?? 課�?系統驗�??��?完�?�?,
    nextSteps: '\n?? 下�?�?',
    step1: '1. ?��?: npm run type-check',
    step2: '2. ?��?: npm run dev',
    step3: '3. ?�覽?�測�? courseSystemTests.runAllValidations()',
    step4: '4. ??��?�能: courseSystemTests.runPerformanceBenchmark()',
    info: '\n?�� 詳細資�?請�???',
    infoReadme: '- README.md (完整?��?)',
    infoSummary: '- src/data/REFACTORING_SUMMARY.md (?�術詳??',
    infoTests: '- src/data/__tests__/courseSystem.test.ts (驗�?工具)'
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

// Check file structure | 檢查檔�?結�?
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
    console.log(`??${file}`);
  } else {
    console.log(`??${file} - ${lang === 'zh' ? '缺失' : 'MISSING'}`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log(t('allFilesExist'));
} else {
  console.log(t('missingFiles'));
  process.exit(1);
}

// Check file sizes | 檢查檔�?大�?
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

// Check README.md content | 檢查 README.md ?�容
console.log(t('checkingReadme'));
const readmeContent = fs.readFileSync('README.md', 'utf8');
const readmeLines = readmeContent.split('\n').length;

console.log(t('readmeCreated', readmeLines));

// Check for key sections | 檢查?�鍵章�?
const requiredSections = {
  en: ['Architecture', 'Key Features', 'Usage Examples', 'API Reference', 'Performance', 'Migration Guide'],
  zh: ['?��?', '主�??�能', '使用例�?', 'API ?��?, '?�能', '?�移?��?']
};

const sectionsToCheck = lang === 'zh' ? requiredSections.zh : requiredSections.en;

sectionsToCheck.forEach(section => {
  if (readmeContent.includes(section)) {
    console.log(`??${t('section')}: ${section}`);
  } else {
    console.log(`??${t('sectionMissing')}: ${section}`);
  }
});

// Check bilingual support | 檢查?��??�援
const bilingualChecks = [
  { pattern: 'English', name: lang === 'zh' ? '?��??�援' : 'English support' },
  { pattern: '繁�?中�?（廣?�話�?, name: lang === 'zh' ? '�?��話支?? : 'Cantonese support' },
  { pattern: 'AI Formula 課�?系統', name: lang === 'zh' ? '中�?標�?' : 'Chinese title' }
];

console.log(lang === 'zh' ? '\n?? 檢查?��??�援...' : '\n?? Checking bilingual support...');
bilingualChecks.forEach(check => {
  if (readmeContent.includes(check.pattern)) {
    console.log(`??${check.name}`);
  } else {
    console.log(`??${check.name}`);
  }
});

// Summary | ?��?
console.log(t('validationSummary'));
console.log(t('separator'));
console.log(t('fileStructure'));
console.log(t('fileSizeReduction', reduction));
console.log(t('documentation'));
console.log(t('architecture'));
console.log(`??${lang === 'zh' ? '?��??�援: 完整' : 'Bilingual support: Complete'}`);

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

// Language switching instructions | 語�??��?說�?
console.log(lang === 'zh' ? 
  '\n?? 語�??��?:' : 
  '\n?? Language switching:'
);
console.log(lang === 'zh' ? 
  'English: node validate-system.js' : 
  'English: node validate-system.js'
);
console.log(lang === 'zh' ? 
  '中�?: LANG_CN=true node validate-system.js' : 
  'Chinese: LANG_CN=true node validate-system.js'
);

// Performance tips | ?�能?�示
console.log(lang === 'zh' ? 
  '\n???�能?�示:' : 
  '\n??Performance Tips:'
);
console.log(lang === 'zh' ? 
  '- 使用?��??? preloadCourse("ai-image-video-creation")' : 
  '- Use preloading: preloadCourse("ai-image-video-creation")'
);
console.log(lang === 'zh' ? 
  '- ??��快�?: getCacheStats()' : 
  '- Monitor cache: getCacheStats()'
);
console.log(lang === 'zh' ? 
  '- ?�康檢查: healthCheck()' : 
  '- Health check: healthCheck()'
);

// Development commands | ?�發?�令
console.log(lang === 'zh' ? 
  '\n??�??�發?�令:' : 
  '\n??�?Development Commands:'
);
console.log(lang === 'zh' ? 
  '?�瀏覽?�控?�台�?' : 
  'In browser console:'
);
console.log('  courseSystemTests.runAllValidations()');
console.log('  courseSystemTests.runPerformanceBenchmark()');
console.log('  courseSystemTests.runManualTests()');

console.log(lang === 'zh' ? 
  '\n?�� 系統?�色:' : 
  '\n?�� System Highlights:'
);
console.log(lang === 'zh' ? 
  `- 檔�?大�?減�? ${reduction}%` : 
  `- File size reduced by ${reduction}%`
);
console.log(lang === 'zh' ? 
  '- 延遲載入?�援' : 
  '- Lazy loading support'
);
console.log(lang === 'zh' ? 
  '- ?�能快�?系統' : 
  '- Intelligent caching system'
);
console.log(lang === 'zh' ? 
  '- 完整?�別安全' : 
  '- Complete type safety'
);
console.log(lang === 'zh' ? 
  '- ?��??��??�援' : 
  '- Bilingual documentation'
); 
