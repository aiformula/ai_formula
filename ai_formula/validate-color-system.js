#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ColorSystemValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.successes = [];
    
    // ç¡¬ç·¨ç¢¼é??²æ¨¡å¼?
    this.hardcodedPatterns = [
      /#[0-9a-fA-F]{3,6}/g,
      /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)/g,
      /hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[\d.]+\s*)?\)/g,
      /bg-\[#[0-9a-fA-F]{3,6}\]/g,
      /text-\[#[0-9a-fA-F]{3,6}\]/g,
      /border-\[#[0-9a-fA-F]{3,6}\]/g
    ];
    
    // ?è¨±?„é??²è???
    this.allowedColorVariables = [
      'var(--ai-formula-primary)',
      'var(--ai-formula-primary-hover)',
      'var(--ai-formula-secondary)',
      'var(--ai-formula-accent)',
      'var(--ai-formula-success)',
      'var(--ai-formula-info)',
      'var(--ai-formula-warning)',
      'var(--ai-formula-error)',
      'var(--ai-formula-dark)',
      'var(--ai-formula-dark-light)',
      'var(--ai-formula-dark-medium)',
      'var(--ai-formula-gray-600)',
      'var(--ai-formula-gray-300)'
    ];
    
    // AI Formula å·¥å…·é¡?
    this.aiFormulaClasses = [
      'ai-bg-primary',
      'ai-bg-secondary',
      'ai-bg-accent',
      'ai-bg-success',
      'ai-bg-info',
      'ai-bg-warning',
      'ai-bg-error',
      'ai-bg-dark',
      'ai-bg-dark-light',
      'ai-bg-dark-medium',
      'ai-text-primary',
      'ai-text-secondary',
      'ai-text-accent',
      'ai-text-success',
      'ai-text-info',
      'ai-text-warning',
      'ai-text-error',
      'ai-border-primary',
      'ai-border-secondary',
      'ai-border-accent',
      'ai-border-gray',
      'ai-bg-gradient-dark'
    ];
  }

  // æª¢æŸ¥?‡ä»¶?¯å¦å­˜åœ¨
  checkFileExists(filePath, description) {
    const fullPath = path.join(__dirname, filePath);
    if (fs.existsSync(fullPath)) {
      this.successes.push(`??${description} å­˜åœ¨`);
      return true;
    } else {
      this.errors.push(`??${description} ä¸å??? ${filePath}`);
      return false;
    }
  }

  // æª¢æŸ¥ CSS è®Šé?å®šç¾©
  checkCSSVariables() {
    const cssPath = path.join(__dirname, 'src/index.css');
    if (!fs.existsSync(cssPath)) {
      this.errors.push('??index.css ?‡ä»¶ä¸å???);
      return;
    }

    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    // æª¢æŸ¥æ¯å€‹é??²è???
    this.allowedColorVariables.forEach(variable => {
      const variableName = variable.match(/--ai-formula-[\w-]+/)[0];
      if (cssContent.includes(variableName)) {
        this.successes.push(`??CSS è®Šé? ${variableName} å·²å?ç¾©`);
      } else {
        this.errors.push(`??CSS è®Šé? ${variableName} ?ªå?ç¾©`);
      }
    });

    // æª¢æŸ¥å·¥å…·é¡?
    this.aiFormulaClasses.forEach(className => {
      if (cssContent.includes(`.${className}`)) {
        this.successes.push(`??å·¥å…·é¡?.${className} å·²å?ç¾©`);
      } else {
        this.warnings.push(`??å·¥å…·é¡?.${className} ?ªå?ç¾©`);
      }
    });
  }

  // ?ƒæ??®é??¥æ‰¾ç¡¬ç·¨ç¢¼é???
  scanDirectoryForHardcodedColors(dirPath) {
    const fullPath = path.join(__dirname, dirPath);
    if (!fs.existsSync(fullPath)) {
      this.warnings.push(`???®é?ä¸å??? ${dirPath}`);
      return;
    }

    const files = this.getAllFiles(fullPath, ['.tsx', '.ts', '.jsx', '.js']);
    let totalHardcodedColors = 0;

    files.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(__dirname, filePath);
      
      // è·³é?æ¸¬è©¦?‡ä»¶?Œæ?äº›é?ç½®æ?ä»?
      if (relativePath.includes('test') || 
          relativePath.includes('spec') ||
          relativePath.includes('validate-') ||
          relativePath.includes('eslint-plugin-')) {
        return;
      }

      let fileHardcodedColors = 0;
      
      this.hardcodedPatterns.forEach(pattern => {
        const matches = content.match(pattern);
        if (matches) {
          fileHardcodedColors += matches.length;
          matches.forEach(match => {
            // æª¢æŸ¥?¯å¦?¨å?è¨±ç?è®Šé?å®šç¾©ä¸?
            const isInVariableDefinition = this.allowedColorVariables.some(variable => 
              content.includes(variable) && content.indexOf(variable) < content.indexOf(match)
            );
            
            if (!isInVariableDefinition) {
              this.warnings.push(`???¼ç¾ç¡¬ç·¨ç¢¼é???"${match}" ??${relativePath}`);
            }
          });
        }
      });

      if (fileHardcodedColors === 0) {
        this.successes.push(`??${relativePath} æ²’æ?ç¡¬ç·¨ç¢¼é??²`);
      }
      
      totalHardcodedColors += fileHardcodedColors;
    });

    if (totalHardcodedColors === 0) {
      this.successes.push(`??${dirPath} ?®é?æ²’æ?ç¡¬ç·¨ç¢¼é??²`);
    } else {
      this.warnings.push(`??${dirPath} ?®é??¼ç¾ ${totalHardcodedColors} ?‹ç¡¬ç·¨ç¢¼é¡è‰²`);
    }
  }

  // ?²å??€?‰æ?å®šæ“´å±•å??„æ?ä»?
  getAllFiles(dirPath, extensions) {
    let files = [];
    const items = fs.readdirSync(dirPath);

    items.forEach(item => {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        files = files.concat(this.getAllFiles(fullPath, extensions));
      } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    });

    return files;
  }

  // æª¢æŸ¥ AI Formula å·¥å…·é¡ä½¿?¨æ?æ³?
  checkAIFormulaUsage() {
    const componentsPath = path.join(__dirname, 'src/components');
    const pagesPath = path.join(__dirname, 'src/pages');
    
    let totalUsage = 0;
    
    [componentsPath, pagesPath].forEach(dirPath => {
      if (fs.existsSync(dirPath)) {
        const files = this.getAllFiles(dirPath, ['.tsx', '.ts']);
        
        files.forEach(filePath => {
          const content = fs.readFileSync(filePath, 'utf8');
          const relativePath = path.relative(__dirname, filePath);
          
          let fileUsage = 0;
          this.aiFormulaClasses.forEach(className => {
            const matches = content.match(new RegExp(`\\b${className}\\b`, 'g'));
            if (matches) {
              fileUsage += matches.length;
            }
          });
          
          if (fileUsage > 0) {
            this.successes.push(`??${relativePath} ä½¿ç”¨äº?${fileUsage} ??AI Formula å·¥å…·é¡`);
            totalUsage += fileUsage;
          }
        });
      }
    });

    if (totalUsage > 0) {
      this.successes.push(`??ç¸½å…±ä½¿ç”¨äº?${totalUsage} ??AI Formula å·¥å…·é¡`);
    } else {
      this.warnings.push('??æ²’æ??¼ç¾ AI Formula å·¥å…·é¡ç?ä½¿ç”¨');
    }
  }

  // ?‹è??€?‰æª¢??
  runAllChecks() {
    console.log('?? AI Formula é¡è‰²ç³»çµ±é©—è??‹å?...\n');

    // 1. æª¢æŸ¥?¸å??‡ä»¶
    console.log('?? æª¢æŸ¥?¸å??‡ä»¶...');
    this.checkFileExists('src/index.css', 'CSS ä¸»æ?ä»?);
    this.checkFileExists('eslint-plugin-ai-formula.js', 'ESLint ?’ä»¶');
    this.checkFileExists('AI_FORMULA_COLOR_GUIDELINES.md', 'é¡è‰²ä½¿ç”¨?‡å?');
    this.checkFileExists('src/tests/ColorSystemTest.tsx', 'é¡è‰²ç³»çµ±æ¸¬è©¦');

    // 2. æª¢æŸ¥ CSS è®Šé??Œå·¥?·é?
    console.log('\n?¨ æª¢æŸ¥ CSS è®Šé??Œå·¥?·é?...');
    this.checkCSSVariables();

    // 3. ?ƒæ?ç¡¬ç·¨ç¢¼é???
    console.log('\n?? ?ƒæ?ç¡¬ç·¨ç¢¼é???..');
    this.scanDirectoryForHardcodedColors('src/components');
    this.scanDirectoryForHardcodedColors('src/pages');

    // 4. æª¢æŸ¥ AI Formula å·¥å…·é¡ä½¿??
    console.log('\n??ï¸?æª¢æŸ¥ AI Formula å·¥å…·é¡ä½¿??..');
    this.checkAIFormulaUsage();

    // 5. è¼¸å‡ºçµæ?
    this.printResults();
  }

  // ?“å°çµæ?
  printResults() {
    console.log('\n' + '='.repeat(60));
    console.log('?? AI Formula é¡è‰²ç³»çµ±é©—è?çµæ?');
    console.log('='.repeat(60));

    if (this.successes.length > 0) {
      console.log('\n???å??…ç›®:');
      this.successes.forEach(success => console.log(`  ${success}`));
    }

    if (this.warnings.length > 0) {
      console.log('\n? ï?  è­¦å??…ç›®:');
      this.warnings.forEach(warning => console.log(`  ${warning}`));
    }

    if (this.errors.length > 0) {
      console.log('\n???¯èª¤?…ç›®:');
      this.errors.forEach(error => console.log(`  ${error}`));
    }

    // è¨ˆç?å®Œæ?åº?
    const totalItems = this.successes.length + this.warnings.length + this.errors.length;
    const completionRate = totalItems > 0 ? (this.successes.length / totalItems * 100).toFixed(1) : 0;
    
    console.log('\n' + '='.repeat(60));
    console.log(`?¯ å®Œæ?åº? ${completionRate}%`);
    console.log(`???å?: ${this.successes.length}`);
    console.log(`? ï?  è­¦å?: ${this.warnings.length}`);
    console.log(`???¯èª¤: ${this.errors.length}`);
    console.log('='.repeat(60));

    // ?¹æ?çµæ?ç¢ºå??€?ºç¢¼
    if (this.errors.length > 0) {
      console.log('\n??é©—è?å¤±æ?ï¼Œå??¨éŒ¯èª¤é?è¦ä¿®å¾?);
      process.exit(1);
    } else if (this.warnings.length > 0) {
      console.log('\n? ï?  é©—è??šé?ï¼Œä??‰è­¦?Šé?è¦æ³¨??);
      process.exit(0);
    } else {
      console.log('\n??é©—è?å®Œå…¨?šé?ï¼Œé??²ç³»çµ±é?è¡Œè‰¯å¥½ï?');
      process.exit(0);
    }
  }
}

// ?‹è?é©—è?
const validator = new ColorSystemValidator();
validator.runAllChecks(); 
