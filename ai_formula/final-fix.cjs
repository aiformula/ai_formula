const fs = require('fs');
const path = require('path');

console.log('🚀 開始系統修復...');

// 需要修復的文件
const files = [
  'src/components/learning/AITutorChat.tsx',
  'src/components/learning/CommunityQA.tsx',
  'src/components/learning/CourseDashboardPage.tsx', 
  'src/components/learning/LessonViewer.tsx',
  'src/components/learning/QuizModal.tsx',
  'src/pages/courses/ChatGPTMasteryLesson.tsx',
  'src/pages/courses/CourseRegistration.tsx',
  'src/pages/courses/CodingBasicsOutline.tsx',
  'src/pages/blog/BlogListing.tsx'
];

// 高級修復函數
function advancedFix(filePath) {
  try {
    console.log(`\n🔍 檢查文件: ${filePath}`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  文件不存在: ${filePath}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let changes = 0;
    
    // 1. 修復常見的中文字符編碼問題
    const fixes = [
      // 修復亂碼字符
      [/[?][^'",\s}:)]+/g, ''],
      // 修復未結束的字符串 (在行尾)
      [/(['"])[^'"]*?$/gm, '$1'],
      // 修復缺少冒號的條件表達式
      [/isZhTW\s*\?\s*([^'":,}]+)\s*:/g, 'isZhTW ? "$1" :'],
      // 修復未結束的JSX屬性
      [/=\s*['"]\s*$/gm, '=""'],
      // 修復缺少引號的中文字符串
      [/isZhTW\s*\?\s*([^'":,]+)\s*:/g, 'isZhTW ? "$1" :'],
      // 修復模板字符串中的問題
      [/\$\{[^}]+$/g, '${value}'],
      // 修復常見的語法錯誤
      [/(['"])[^'"]*?(?=\s*[,})\]])/g, '$1'],
    ];
    
    fixes.forEach(([pattern, replacement]) => {
      const before = content;
      content = content.replace(pattern, replacement);
      if (content !== before) {
        changes++;
      }
    });
    
    // 2. 修復空的翻譯
    content = content.replace(/isZhTW\s*\?\s*['"]\s*['"]\s*:/g, 'isZhTW ? "" :');
    
    // 3. 清理連續的空白和換行
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ 已修復: ${filePath} (${changes} 項變更)`);
    } else {
      console.log(`ℹ️  無需修復: ${filePath}`);
    }
    
  } catch (error) {
    console.error(`❌ 修復失敗 ${filePath}:`, error.message);
  }
}

// 執行修復
console.log(`\n📁 目標文件數量: ${files.length}`);
files.forEach((file, index) => {
  console.log(`\n[${index + 1}/${files.length}] 處理中...`);
  advancedFix(file);
});

console.log('\n✅ 系統修復完成！');
console.log('🔄 現在可以測試建置...'); 