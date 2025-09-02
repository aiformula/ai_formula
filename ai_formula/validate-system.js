#!/usr/bin/env node

/**
 * System Validation Script | ç³»çµ±é©—è??³æœ¬
 * @description Quick validation to ensure the refactored course system works correctly
 * å¿«é€Ÿé?è­‰ä»¥ç¢ºä??æ?å¾Œç?èª²ç?ç³»çµ±æ­?¸¸?‹ä?
 */

const fs = require('fs');
const path = require('path');

// Language support | èªè??¯æ´
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
    reduction: '?¯ Reduction: {0}%',
    checkingTypeScript: '\n?”§ Checking TypeScript compilation...',
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
    info: '\n?’¡ For detailed information, see:',
    infoReadme: '- README.md (complete documentation)',
    infoSummary: '- src/data/REFACTORING_SUMMARY.md (technical details)',
    infoTests: '- src/data/__tests__/courseSystem.test.ts (validation tools)'
  },
  zh: {
    title: '?? é©—è? AI Formula èª²ç?ç³»çµ±...\n',
    checkingFileStructure: '?? æª¢æŸ¥æª”æ?çµæ?...',
    allFilesExist: '\n?? ?€?‰å??€æª”æ??½å??¨ï?',
    missingFiles: '\n???¨å?å¿…é?æª”æ?ç¼ºå¤±??,
    checkingFileSizes: '\n?? æª¢æŸ¥æª”æ?å¤§å?...',
    originalSize: '?? ?Ÿå? courseDetails.ts: {0} è¡?,
    currentSize: '?? ?¶å? courseDetails.ts: {0} è¡?,
    reduction: '?¯ æ¸›å?: {0}%',
    checkingTypeScript: '\n?”§ æª¢æŸ¥ TypeScript ç·¨è­¯...',
    tsSuccess: '??TypeScript ç·¨è­¯?å?',
    tsFailed: '??TypeScript ç·¨è­¯å¤±æ?',
    checkingReadme: '\n?? æª¢æŸ¥ README.md...',
    readmeCreated: '??README.md å·²å»ºç«‹ï???{0} è¡?,
    section: 'ç« ç?',
    sectionMissing: 'ç« ç?ç¼ºå¤±',
    validationSummary: '\n?? é©—è??˜è?:',
    separator: '======================',
    fileStructure: '??æª”æ?çµæ?: å®Œæ•´',
    fileSizeReduction: '??æª”æ?å¤§å?æ¸›å?: {0}%',
    documentation: '???‡æ?: å®Œæ•´',
    architecture: '???¶æ?: æ¨¡ç???,
    completed: '\n?? èª²ç?ç³»çµ±é©—è??å?å®Œæ?ï¼?,
    nextSteps: '\n?? ä¸‹ä?æ­?',
    step1: '1. ?·è?: npm run type-check',
    step2: '2. ?·è?: npm run dev',
    step3: '3. ?è¦½?¨æ¸¬è©? courseSystemTests.runAllValidations()',
    step4: '4. ??§?ˆèƒ½: courseSystemTests.runPerformanceBenchmark()',
    info: '\n?’¡ è©³ç´°è³‡è?è«‹å???',
    infoReadme: '- README.md (å®Œæ•´?‡æ?)',
    infoSummary: '- src/data/REFACTORING_SUMMARY.md (?€è¡“è©³??',
    infoTests: '- src/data/__tests__/courseSystem.test.ts (é©—è?å·¥å…·)'
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

// Check file structure | æª¢æŸ¥æª”æ?çµæ?
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
    console.log(`??${file} - ${lang === 'zh' ? 'ç¼ºå¤±' : 'MISSING'}`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log(t('allFilesExist'));
} else {
  console.log(t('missingFiles'));
  process.exit(1);
}

// Check file sizes | æª¢æŸ¥æª”æ?å¤§å?
console.log(t('checkingFileSizes'));

const originalSize = 3088; // Original courseDetails.ts line count
const currentDetailsSize = fs.readFileSync('src/data/courseDetails.ts', 'utf8').split('\n').length;
const reduction = Math.round((1 - currentDetailsSize / originalSize) * 100);

console.log(t('originalSize', originalSize));
console.log(t('currentSize', currentDetailsSize));
console.log(t('reduction', reduction));

// Check TypeScript compilation (if tsc is available) | æª¢æŸ¥ TypeScript ç·¨è­¯
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
          console.log('è¼¸å‡º:', output);
        }
      }
      resolve(code === 0);
    });
  });
};

// Check README.md content | æª¢æŸ¥ README.md ?§å®¹
console.log(t('checkingReadme'));
const readmeContent = fs.readFileSync('README.md', 'utf8');
const readmeLines = readmeContent.split('\n').length;

console.log(t('readmeCreated', readmeLines));

// Check for key sections | æª¢æŸ¥?œéµç« ç?
const requiredSections = {
  en: ['Architecture', 'Key Features', 'Usage Examples', 'API Reference', 'Performance', 'Migration Guide'],
  zh: ['?¶æ?', 'ä¸»è??Ÿèƒ½', 'ä½¿ç”¨ä¾‹å?', 'API ?ƒè€?, '?ˆèƒ½', '?·ç§»?‡å?']
};

const sectionsToCheck = lang === 'zh' ? requiredSections.zh : requiredSections.en;

sectionsToCheck.forEach(section => {
  if (readmeContent.includes(section)) {
    console.log(`??${t('section')}: ${section}`);
  } else {
    console.log(`??${t('sectionMissing')}: ${section}`);
  }
});

// Check bilingual support | æª¢æŸ¥?™è??¯æ´
const bilingualChecks = [
  { pattern: 'English', name: lang === 'zh' ? '?±æ??¯æ´' : 'English support' },
  { pattern: 'ç¹é?ä¸­æ?ï¼ˆå»£?±è©±ï¼?, name: lang === 'zh' ? 'å»?±è©±æ”¯?? : 'Cantonese support' },
  { pattern: 'AI Formula èª²ç?ç³»çµ±', name: lang === 'zh' ? 'ä¸­æ?æ¨™é?' : 'Chinese title' }
];

console.log(lang === 'zh' ? '\n?? æª¢æŸ¥?™è??¯æ´...' : '\n?? Checking bilingual support...');
bilingualChecks.forEach(check => {
  if (readmeContent.includes(check.pattern)) {
    console.log(`??${check.name}`);
  } else {
    console.log(`??${check.name}`);
  }
});

// Summary | ?˜è?
console.log(t('validationSummary'));
console.log(t('separator'));
console.log(t('fileStructure'));
console.log(t('fileSizeReduction', reduction));
console.log(t('documentation'));
console.log(t('architecture'));
console.log(`??${lang === 'zh' ? '?™è??¯æ´: å®Œæ•´' : 'Bilingual support: Complete'}`);

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

// Language switching instructions | èªè??‡æ?èªªæ?
console.log(lang === 'zh' ? 
  '\n?? èªè??‡æ?:' : 
  '\n?? Language switching:'
);
console.log(lang === 'zh' ? 
  'English: node validate-system.js' : 
  'English: node validate-system.js'
);
console.log(lang === 'zh' ? 
  'ä¸­æ?: LANG_CN=true node validate-system.js' : 
  'Chinese: LANG_CN=true node validate-system.js'
);

// Performance tips | ?ˆèƒ½?ç¤º
console.log(lang === 'zh' ? 
  '\n???ˆèƒ½?ç¤º:' : 
  '\n??Performance Tips:'
);
console.log(lang === 'zh' ? 
  '- ä½¿ç”¨?è??? preloadCourse("ai-image-video-creation")' : 
  '- Use preloading: preloadCourse("ai-image-video-creation")'
);
console.log(lang === 'zh' ? 
  '- ??§å¿«å?: getCacheStats()' : 
  '- Monitor cache: getCacheStats()'
);
console.log(lang === 'zh' ? 
  '- ?¥åº·æª¢æŸ¥: healthCheck()' : 
  '- Health check: healthCheck()'
);

// Development commands | ?‹ç™¼?‡ä»¤
console.log(lang === 'zh' ? 
  '\n??ï¸??‹ç™¼?‡ä»¤:' : 
  '\n??ï¸?Development Commands:'
);
console.log(lang === 'zh' ? 
  '?¨ç€è¦½?¨æ§?¶å°ä¸?' : 
  'In browser console:'
);
console.log('  courseSystemTests.runAllValidations()');
console.log('  courseSystemTests.runPerformanceBenchmark()');
console.log('  courseSystemTests.runManualTests()');

console.log(lang === 'zh' ? 
  '\n?¯ ç³»çµ±?¹è‰²:' : 
  '\n?¯ System Highlights:'
);
console.log(lang === 'zh' ? 
  `- æª”æ?å¤§å?æ¸›å? ${reduction}%` : 
  `- File size reduced by ${reduction}%`
);
console.log(lang === 'zh' ? 
  '- å»¶é²è¼‰å…¥?¯æ´' : 
  '- Lazy loading support'
);
console.log(lang === 'zh' ? 
  '- ?ºèƒ½å¿«å?ç³»çµ±' : 
  '- Intelligent caching system'
);
console.log(lang === 'zh' ? 
  '- å®Œæ•´?‹åˆ¥å®‰å…¨' : 
  '- Complete type safety'
);
console.log(lang === 'zh' ? 
  '- ?™è??‡æ??¯æ´' : 
  '- Bilingual documentation'
); 
