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
    
    // 硬編碼顏色模式
    this.hardcodedPatterns = [
      /#[0-9a-fA-F]{3,6}/g,
      /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)/g,
      /hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[\d.]+\s*)?\)/g,
      /bg-\[#[0-9a-fA-F]{3,6}\]/g,
      /text-\[#[0-9a-fA-F]{3,6}\]/g,
      /border-\[#[0-9a-fA-F]{3,6}\]/g
    ];
    
    // 允許的顏色變量
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
    
    // AI Formula 工具類
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

  // 檢查文件是否存在
  checkFileExists(filePath, description) {
    const fullPath = path.join(__dirname, filePath);
    if (fs.existsSync(fullPath)) {
      this.successes.push(`✓ ${description} 存在`);
      return true;
    } else {
      this.errors.push(`✗ ${description} 不存在: ${filePath}`);
      return false;
    }
  }

  // 檢查 CSS 變量定義
  checkCSSVariables() {
    const cssPath = path.join(__dirname, 'src/index.css');
    if (!fs.existsSync(cssPath)) {
      this.errors.push('✗ index.css 文件不存在');
      return;
    }

    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    // 檢查每個顏色變量
    this.allowedColorVariables.forEach(variable => {
      const variableName = variable.match(/--ai-formula-[\w-]+/)[0];
      if (cssContent.includes(variableName)) {
        this.successes.push(`✓ CSS 變量 ${variableName} 已定義`);
      } else {
        this.errors.push(`✗ CSS 變量 ${variableName} 未定義`);
      }
    });

    // 檢查工具類
    this.aiFormulaClasses.forEach(className => {
      if (cssContent.includes(`.${className}`)) {
        this.successes.push(`✓ 工具類 .${className} 已定義`);
      } else {
        this.warnings.push(`⚠ 工具類 .${className} 未定義`);
      }
    });
  }

  // 掃描目錄查找硬編碼顏色
  scanDirectoryForHardcodedColors(dirPath) {
    const fullPath = path.join(__dirname, dirPath);
    if (!fs.existsSync(fullPath)) {
      this.warnings.push(`⚠ 目錄不存在: ${dirPath}`);
      return;
    }

    const files = this.getAllFiles(fullPath, ['.tsx', '.ts', '.jsx', '.js']);
    let totalHardcodedColors = 0;

    files.forEach(filePath => {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(__dirname, filePath);
      
      // 跳過測試文件和某些配置文件
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
            // 檢查是否在允許的變量定義中
            const isInVariableDefinition = this.allowedColorVariables.some(variable => 
              content.includes(variable) && content.indexOf(variable) < content.indexOf(match)
            );
            
            if (!isInVariableDefinition) {
              this.warnings.push(`⚠ 發現硬編碼顏色 "${match}" 在 ${relativePath}`);
            }
          });
        }
      });

      if (fileHardcodedColors === 0) {
        this.successes.push(`✓ ${relativePath} 沒有硬編碼顏色`);
      }
      
      totalHardcodedColors += fileHardcodedColors;
    });

    if (totalHardcodedColors === 0) {
      this.successes.push(`✓ ${dirPath} 目錄沒有硬編碼顏色`);
    } else {
      this.warnings.push(`⚠ ${dirPath} 目錄發現 ${totalHardcodedColors} 個硬編碼顏色`);
    }
  }

  // 獲取所有指定擴展名的文件
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

  // 檢查 AI Formula 工具類使用情況
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
            this.successes.push(`✓ ${relativePath} 使用了 ${fileUsage} 個 AI Formula 工具類`);
            totalUsage += fileUsage;
          }
        });
      }
    });

    if (totalUsage > 0) {
      this.successes.push(`✓ 總共使用了 ${totalUsage} 個 AI Formula 工具類`);
    } else {
      this.warnings.push('⚠ 沒有發現 AI Formula 工具類的使用');
    }
  }

  // 運行所有檢查
  runAllChecks() {
    console.log('🚀 AI Formula 顏色系統驗證開始...\n');

    // 1. 檢查核心文件
    console.log('📁 檢查核心文件...');
    this.checkFileExists('src/index.css', 'CSS 主文件');
    this.checkFileExists('eslint-plugin-ai-formula.js', 'ESLint 插件');
    this.checkFileExists('AI_FORMULA_COLOR_GUIDELINES.md', '顏色使用指南');
    this.checkFileExists('src/tests/ColorSystemTest.tsx', '顏色系統測試');

    // 2. 檢查 CSS 變量和工具類
    console.log('\n🎨 檢查 CSS 變量和工具類...');
    this.checkCSSVariables();

    // 3. 掃描硬編碼顏色
    console.log('\n🔍 掃描硬編碼顏色...');
    this.scanDirectoryForHardcodedColors('src/components');
    this.scanDirectoryForHardcodedColors('src/pages');

    // 4. 檢查 AI Formula 工具類使用
    console.log('\n🛠️ 檢查 AI Formula 工具類使用...');
    this.checkAIFormulaUsage();

    // 5. 輸出結果
    this.printResults();
  }

  // 打印結果
  printResults() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 AI Formula 顏色系統驗證結果');
    console.log('='.repeat(60));

    if (this.successes.length > 0) {
      console.log('\n✅ 成功項目:');
      this.successes.forEach(success => console.log(`  ${success}`));
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  警告項目:');
      this.warnings.forEach(warning => console.log(`  ${warning}`));
    }

    if (this.errors.length > 0) {
      console.log('\n❌ 錯誤項目:');
      this.errors.forEach(error => console.log(`  ${error}`));
    }

    // 計算完成度
    const totalItems = this.successes.length + this.warnings.length + this.errors.length;
    const completionRate = totalItems > 0 ? (this.successes.length / totalItems * 100).toFixed(1) : 0;
    
    console.log('\n' + '='.repeat(60));
    console.log(`🎯 完成度: ${completionRate}%`);
    console.log(`✅ 成功: ${this.successes.length}`);
    console.log(`⚠️  警告: ${this.warnings.length}`);
    console.log(`❌ 錯誤: ${this.errors.length}`);
    console.log('='.repeat(60));

    // 根據結果確定退出碼
    if (this.errors.length > 0) {
      console.log('\n❌ 驗證失敗，存在錯誤需要修復');
      process.exit(1);
    } else if (this.warnings.length > 0) {
      console.log('\n⚠️  驗證通過，但有警告需要注意');
      process.exit(0);
    } else {
      console.log('\n✅ 驗證完全通過，顏色系統運行良好！');
      process.exit(0);
    }
  }
}

// 運行驗證
const validator = new ColorSystemValidator();
validator.runAllChecks(); 