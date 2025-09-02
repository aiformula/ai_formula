const fs = require('fs');
const path = require('path');

// 有問題的文件列表
const problematicFiles = [
  'src/components/course/LearningMaterials.tsx',
  'src/components/learning/AITutorChat.tsx',
  'src/components/learning/CommunityQA.tsx',
  'src/components/learning/CourseDashboardPage.tsx',
  'src/components/learning/LessonViewer.tsx',
  'src/components/learning/QuizModal.tsx',
  'src/components/templates/BlogTemplate.tsx',
  'src/components/templates/CourseOutlineTemplate.tsx',
  'src/components/templates/CourseTemplate.tsx',
  'src/data/courses/courseDetails.ts',
  'src/data/courses/courses.ts',
  'src/pages/blog/BlogListing.tsx',
  'src/pages/courses/ChatGPTMasteryLesson.tsx',
  'src/pages/courses/ChatGPTMasteryOutline.tsx',
  'src/pages/courses/CodingBasicsOutline.tsx',
  'src/pages/courses/Course.tsx',
  'src/pages/courses/CourseRegistration.tsx',
  'src/pages/courses/FreePlanLearning.tsx',
  'src/pages/courses/PerplexityToolsLesson.tsx',
  'src/pages/courses/PerplexityToolsOutline.tsx',
  'src/pages/courses/PromptEngineeringCourse.tsx',
  'src/pages/courses/PromptEngineeringLesson1.tsx',
  'src/pages/courses/PromptEngineeringLesson2.tsx'
];

// 修復函數
function fixEncodingIssues(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 移除有問題的中文字符模式
    content = content.replace(/[?][^'",\s}]+/g, '');
    
    // 修復未結束的字符串
    content = content.replace(/(['"])[^'"]*?(?!['"]\s*[,})])/g, '$1');
    
    // 修復語法錯誤
    content = content.replace(/isZhTW\s*\?\s*['"][^'"]*['"]?\s*:\s*/g, 'isZhTW ? "" : ');
    
    // 移除有問題的中文屬性
    content = content.replace(/\w+Zh:\s*['"][^'"]*['"]?,?\s*/g, '');
    content = content.replace(/\w+Cht:\s*['"][^'"]*['"]?,?\s*/g, '');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
  }
}

// 執行修復
console.log('Starting encoding fix...');
problematicFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    fixEncodingIssues(fullPath);
  } else {
    console.log(`File not found: ${fullPath}`);
  }
});
console.log('Encoding fix completed!'); 