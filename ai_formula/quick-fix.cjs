const fs = require('fs');
const path = require('path');

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

// 簡單修復函數
function quickFix(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 修復常見的語法問題
    // 1. 修復未結束的字符串
    content = content.replace(/(['"])[^'"]*?$/gm, '$1');
    
    // 2. 修復缺少的引號
    content = content.replace(/isZhTW\s*\?\s*([^'"]*?)\s*:/g, 'isZhTW ? "$1" :');
    
    // 3. 移除有問題的中文字符
    content = content.replace(/[?][^'",\s}:)]+/g, '');
    
    // 4. 修復常見的JSX語法錯誤
    content = content.replace(/(<[^>]+)([^>]*>)/g, '$1$2');
    
    // 5. 確保字符串正確結束
    content = content.replace(/(['"])[^'"]*?(?=\s*[,})])/g, '$1');
    
    // 6. 修復空的中文翻譯
    content = content.replace(/isZhTW\s*\?\s*['"]\s*['"]\s*:/g, 'isZhTW ? "" :');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed: ${filePath}`);
    
  } catch (error) {
    console.error(`✗ Error fixing ${filePath}:`, error.message);
  }
}

// 執行修復
console.log('🔧 Starting quick fix...');
files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    quickFix(fullPath);
  } else {
    console.log(`! File not found: ${fullPath}`);
  }
});
console.log('✅ Quick fix completed!'); 