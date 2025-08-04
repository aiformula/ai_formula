/**
 * AI Formula 顏色系統驗證器
 * 檢查專案中是否正確使用了統一的顏色變數
 */

const fs = require('fs');
const path = require('path');

class ColourSystemValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.passed = [];
    this.stats = {
      totalFiles: 0,
      checkedFiles: 0,
      hardcodedColours: 0,
      variableUsage: 0
    };
    
    // 允許的顏色變數清單
    this.allowedColourVariables = [
      '--ai-formula-primary',
      '--ai-formula-primary-hover',
      '--ai-formula-secondary',
      '--ai-formula-accent',
      '--ai-formula-success',
      '--ai-formula-info',
      '--ai-formula-warning',
      '--ai-formula-error',
      '--ai-formula-dark',
      '--ai-formula-dark-light',
      '--ai-formula-dark-medium',
      '--ai-formula-gray-600',
      '--ai-formula-gray-300',
      '--ai-formula-text-primary',
      '--ai-formula-text-secondary',
      '--ai-formula-border'
    ];
    
    // 硬編碼顏色模式 (Hex, RGB, HSL)
    this.hardcodedColourPatterns = [
      /#[0-9a-fA-F]{3,8}/g,  // Hex colors: #fff, #ffffff
      /rgb\([^)]*\)/g,        // RGB colors: rgb(255, 255, 255)
      /rgba\([^)]*\)/g,       // RGBA colors: rgba(255, 255, 255, 0.5)
      /hsl\([^)]*\)/g,        // HSL colors: hsl(0, 0%, 100%)
      /hsla\([^)]*\)/g        // HSLA colors: hsla(0, 0%, 100%, 0.5)
    ];
    
    // 允許的硬編碼顏色 (例如 transparent, inherit 等)
    this.allowedHardcodedColours = [
      'transparent',
      'inherit',
      'currentColor',
      'currentcolour',
      'none'
    ];
  }

  // 驗證 CSS 變數是否存在
  validateColourVariables() {
    const cssFiles = this.findFiles(['src'], ['.css', '.scss', '.sass']);
    let foundVariables = 0;
    
    cssFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      
      this.allowedColourVariables.forEach(variable => {
        if (content.includes(variable)) {
          foundVariables++;
          this.passed.push(`✅ 找到顏色變數: ${variable} in ${file}`);
        }
      });
    });
    
    if (foundVariables === 0) {
      this.errors.push('❌ 沒有找到任何預定義的顏色變數！');
    }
    
    return foundVariables;
  }

  // 掃描目錄中的硬編碼顏色
  scanDirectoryForHardcodedColours(dirPath) {
    const files = this.findFiles([dirPath], ['.tsx', '.jsx', '.ts', '.js', '.css', '.scss']);
    let totalHardcodedColours = 0;
    
    console.log(`🔍 掃描 ${dirPath} 目錄中的硬編碼顏色...`);
    
    files.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const relativePath = path.relative(process.cwd(), file);
      
      let fileHardcodedColours = 0;
      
      this.hardcodedColourPatterns.forEach(pattern => {
        const matches = content.match(pattern) || [];
        fileHardcodedColours += matches.length;
        
        // 檢查是否在變數定義中
        const isInVariableDefinition = this.allowedColourVariables.some(variable =>
          content.includes(`${variable}:`) && matches.some(match => 
            content.indexOf(match) > content.indexOf(`${variable}:`) &&
            content.indexOf(match) < content.indexOf(`;`, content.indexOf(`${variable}:`))
          )
        );
        
        if (matches.length > 0 && !isInVariableDefinition) {
          this.warnings.push(`⚠️  ${relativePath}: 發現 ${matches.length} 個硬編碼顏色: ${matches.join(', ')}`);
        }
      });
      
      if (fileHardcodedColours === 0) {
        this.passed.push(`✅ ${relativePath}: 無硬編碼顏色`);
      }
      
      totalHardcodedColours += fileHardcodedColours;
    });
    
    if (totalHardcodedColours === 0) {
      this.passed.push(`✅ ${dirPath} 目錄: 無硬編碼顏色`);
    } else {
      this.warnings.push(`⚠️  ${dirPath} 目錄中發現 ${totalHardcodedColours} 個硬編碼顏色`);
    }
    
    return totalHardcodedColours;
  }

  // 檢查 Tailwind 配置
  validateTailwindConfig() {
    const configFiles = ['tailwind.config.js', 'tailwind.config.ts'];
    let configFound = false;
    
    configFiles.forEach(configFile => {
      if (fs.existsSync(configFile)) {
        configFound = true;
        const content = fs.readFileSync(configFile, 'utf8');
        
        if (content.includes('colours:') || content.includes('colors:')) {
          this.passed.push(`✅ Tailwind 配置文件: ${configFile}`);
        } else {
          this.warnings.push(`⚠️  ${configFile}: 沒有找到顏色配置`);
        }
      }
    });
    
    if (!configFound) {
      this.warnings.push('⚠️  沒有找到 Tailwind 配置文件');
    }
  }

  // 檢查重要文件是否存在
  checkFileExists(filePath, description) {
    if (fs.existsSync(filePath)) {
      this.passed.push(`✅ ${description}: ${filePath}`);
      return true;
    } else {
      this.warnings.push(`⚠️  ${description}不存在: ${filePath}`);
      return false;
    }
  }

  // 檢查目錄結構
  validateDirectoryStructure() {
    this.checkFileExists('AI_FORMULA_COLOUR_GUIDELINES.md', '顏色使用指南');
    this.checkFileExists('src/tests/ColourSystemTest.tsx', '顏色系統測試');
  }

  // 掃描整個專案
  scanProject() {
    console.log('🎨 開始 AI Formula 顏色系統驗證...\n');
    
    // 掃描硬編碼顏色
    this.scanDirectoryForHardcodedColours('src/components');
    this.scanDirectoryForHardcodedColours('src/pages');
    this.scanDirectoryForHardcodedColours('src/styles');
    
    // 驗證顏色變數
    this.validateColourVariables();
    
    // 檢查配置文件
    this.validateTailwindConfig();
    
    // 檢查目錄結構
    this.validateDirectoryStructure();
  }

  // 尋找文件
  findFiles(directories, extensions) {
    let files = [];
    
    directories.forEach(dir => {
      if (fs.existsSync(dir)) {
        this.scanDirectory(dir, extensions, files);
      }
    });
    
    return files;
  }

  // 遞歸掃描目錄
  scanDirectory(dirPath, extensions, files) {
    const items = fs.readdirSync(dirPath);
    
    items.forEach(item => {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // 跳過 node_modules 和 .git 目錄
        if (!['node_modules', '.git', 'dist', 'build'].includes(item)) {
          this.scanDirectory(fullPath, extensions, files);
        }
      } else if (stat.isFile()) {
        const ext = path.extname(fullPath);
        if (extensions.includes(ext)) {
          files.push(fullPath);
          this.stats.totalFiles++;
        }
      }
    });
  }

  // 生成報告
  generateReport() {
    console.log('\n📊 驗證結果報告');
    console.log('=' * 50);
    
    console.log(`\n✅ 通過項目 (${this.passed.length}):`);
    this.passed.forEach(item => console.log(item));
    
    if (this.warnings.length > 0) {
      console.log(`\n⚠️  警告項目 (${this.warnings.length}):`);
      this.warnings.forEach(item => console.log(item));
    }
    
    if (this.errors.length > 0) {
      console.log(`\n❌ 錯誤項目 (${this.errors.length}):`);
      this.errors.forEach(item => console.log(item));
    }
    
    console.log(`\n📈 統計資訊:`);
    console.log(`   總文件數: ${this.stats.totalFiles}`);
    console.log(`   檢查文件數: ${this.stats.checkedFiles}`);
    console.log(`   硬編碼顏色: ${this.stats.hardcodedColours}`);
    console.log(`   變數使用: ${this.stats.variableUsage}`);
    
    // 總體評分
    const totalIssues = this.errors.length + this.warnings.length;
    const score = Math.max(0, 100 - (totalIssues * 5));
    
    console.log(`\n🎯 顏色系統評分: ${score}/100`);
    
    if (score >= 90) {
      console.log('🎉 優秀！顏色系統使用規範。');
    } else if (score >= 70) {
      console.log('👍 良好，但仍有改善空間。');
    } else {
      console.log('⚠️  需要改善顏色系統的一致性。');
    }
  }
}

// 執行驗證
const validator = new ColourSystemValidator();
validator.scanProject();
validator.generateReport(); 
