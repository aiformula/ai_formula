const fs = require('fs');
const path = require('path');

console.log('🔧 開始快速修復...');

// 需要修復的文件
const files = [
  'src/components/learning/AITutorChat.tsx',
  'src/components/learning/CommunityQA.tsx',
  'src/pages/courses/ChatGPTMasteryLesson.tsx'
];

// 簡單修復函數
function quickFix(filePath) {
  try {
    console.log(`檢查文件: ${filePath}`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  文件不存在: ${filePath}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // 修復常見問題
    // 1. 移除有問題的中文字符
    content = content.replace(/[?][^'",\s}:)]+/g, '');
    
    // 2. 修復缺少的引號
    content = content.replace(/isZhTW\s*\?\s*([^'":,]+)\s*:/g, 'isZhTW ? "$1" :');
    
    // 3. 修復未結束的字符串
    content = content.replace(/(['"])[^'"]*?$/gm, '$1');
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ 已修復: ${filePath}`);
    } else {
      console.log(`ℹ️  無需修復: ${filePath}`);
    }
    
  } catch (error) {
    console.error(`❌ 修復失敗 ${filePath}:`, error.message);
  }
}

// 執行修復
files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  quickFix(fullPath);
});

console.log('✅ 修復完成！'); 