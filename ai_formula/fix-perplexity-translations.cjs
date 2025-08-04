const fs = require('fs');
const path = require('path');

// Read the current file
const filePath = path.join(__dirname, 'src/data/perplexity-complete-course-data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Define the English translations for lessons
const lessonTranslations = {
  // Chapter 1
  '1.4 Citations 的重要性：建立可信的資訊來源': '1.4 The Importance of Citations: Building Reliable Information Sources',
  '1.5 適用場景分析：何時選擇 Perplexity？': '1.5 Use Case Analysis: When to Choose Perplexity?',
  
  // Chapter 2  
  '2.1 主介面導覽：搜索框、側邊欄與功能區': '2.1 Main Interface Navigation: Search Box, Sidebar & Feature Areas',
  '2.2 帳戶設定與個人化選項': '2.2 Account Settings & Personalisation Options',
  '2.3 免費 vs Pro 功能對比一覽': '2.3 Free vs Pro Feature Comparison Overview',
  '2.4 快捷鍵與效率技巧': '2.4 Keyboard Shortcuts & Efficiency Tips',
  '2.5 移動端 vs 桌面端體驗差異': '2.5 Mobile vs Desktop Experience Differences'
};

const descriptionTranslations = {
  // Chapter 1
  '深入了解 Perplexity 的引用系統如何確保資訊可靠性，以及如何有效利用這個功能。': 'Understand how Perplexity\'s citation system ensures information reliability and how to effectively utilise this feature.',
  '掌握 Perplexity AI 的最佳使用場景，學會在不同情況下選擇最合適的 AI 工具。': 'Master Perplexity AI\'s optimal use cases and learn to choose the most suitable AI tool in different situations.',
  
  // Chapter 2
  '完整了解 Perplexity 的使用者介面，掌握所有核心功能的位置和用途。': 'Complete understanding of Perplexity\'s user interface, mastering the location and purpose of all core features.',
  '學習如何個人化設定 Perplexity，創造最適合自己的使用環境。': 'Learn how to personalise Perplexity settings to create the most suitable environment for yourself.',
  '詳細比較免費版與 Pro 版的功能差異，幫助你做出最佳的訂閱決策。': 'Detailed comparison of free and Pro version features to help you make the best subscription decision.',
  '掌握 Perplexity 的快捷鍵和效率技巧，大幅提升使用速度和生產力。': 'Master Perplexity\'s keyboard shortcuts and efficiency tips to significantly improve usage speed and productivity.',
  '了解不同平台間的功能差異，在任何裝置上都能發揮 Perplexity 的最大效用。': 'Understand feature differences between platforms to maximise Perplexity\'s effectiveness on any device.'
};

// Function to add translations for a lesson
function addLessonTranslations(content, chineseTitle, englishTitle, chineseDescription, englishDescription, duration) {
  // Pattern to match the lesson block
  const lessonPattern = new RegExp(
    `(\\s+{\\s*\n\\s+id: \\d+,\\s*\n\\s+title: '${chineseTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}',\\s*\n)(\\s+duration: '${duration}',)`,
    'g'
  );
  
  const englishDuration = duration.replace('分鐘', 'minutes').replace('小時', 'hours');
  
  const replacement = `$1          titleEn: '${englishTitle}',\n$2\n          durationEn: '${englishDuration}',`;
  
  content = content.replace(lessonPattern, replacement);
  
  // Add description translation if provided
  if (chineseDescription && englishDescription) {
    const descPattern = new RegExp(
      `(description: '${chineseDescription.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}',)`,
      'g'
    );
    content = content.replace(descPattern, `$1\n          descriptionEn: '${englishDescription}',`);
  }
  
  return content;
}

// Apply all translations
Object.entries(lessonTranslations).forEach(([chineseTitle, englishTitle]) => {
  // Extract duration from the title pattern
  let duration = '15 分鐘'; // default
  if (chineseTitle.includes('1.2')) duration = '18 分鐘';
  if (chineseTitle.includes('1.3')) duration = '20 分鐘';
  if (chineseTitle.includes('1.4')) duration = '17 分鐘';
  if (chineseTitle.includes('1.5')) duration = '20 分鐘';
  if (chineseTitle.includes('2.1')) duration = '15 分鐘';
  if (chineseTitle.includes('2.2')) duration = '12 分鐘';
  if (chineseTitle.includes('2.3')) duration = '18 分鐘';
  if (chineseTitle.includes('2.4')) duration = '15 分鐘';
  if (chineseTitle.includes('2.5')) duration = '14 分鐘';
  
  // Find corresponding description
  const chineseDescription = Object.keys(descriptionTranslations).find(desc => 
    content.includes(`title: '${chineseTitle}'`) && content.includes(`description: '${desc}'`)
  );
  const englishDescription = chineseDescription ? descriptionTranslations[chineseDescription] : null;
  
  content = addLessonTranslations(content, chineseTitle, englishTitle, chineseDescription, englishDescription, duration);
});

// Write the updated content back to the file
fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Successfully added English translations for Perplexity lessons'); 