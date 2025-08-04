const fs = require('fs');
const path = require('path');

// Read the current file
const filePath = path.join(__dirname, 'src/data/perplexity-complete-course-data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Define comprehensive English translations for ALL lessons
const allLessonTranslations = {
  // Chapter 3
  '3.1 基礎搜索：如何問出好問題': '3.1 Basic Search: How to Ask Good Questions',
  '3.2 Focus 模式深度解析：Academic、Writing、Math、Programming': '3.2 Focus Mode Deep Analysis: Academic, Writing, Math, Programming',
  '3.3 上傳檔案功能：PDF、圖片、文檔的智能解析': '3.3 File Upload Feature: Smart Analysis of PDFs, Images & Documents',
  '3.4 Copilot 建議系統：讓 AI 引導你的探索': '3.4 Copilot Suggestion System: Let AI Guide Your Exploration',
  '3.5 高級搜索技巧：時間限制、來源過濾、語言設定': '3.5 Advanced Search Techniques: Time Limits, Source Filtering & Language Settings',
  
  // Chapter 4
  '4.1 「Library」入門：你的個人研究資料庫': '4.1 "Library" Introduction: Your Personal Research Database',
  '4.2 從「Collections」到「Spaces」：項目式研究的演進': '4.2 From "Collections" to "Spaces": Evolution of Project-Based Research',
  '4.3 如何建立與管理 Spaces：設定專屬指令與協作': '4.3 How to Create & Manage Spaces: Setting Custom Instructions & Collaboration',
  '4.4 Pages 功能：將研究轉化為精美報告': '4.4 Pages Feature: Transform Research into Beautiful Reports',
  
  // Chapter 5
  '5.1 Pro 訂閱方案詳解：功能對比與投資回報分析': '5.1 Pro Subscription Detailed Analysis: Feature Comparison & ROI Analysis',
  '5.2 Pro Search：更深度的查詢與更精準的結果': '5.2 Pro Search: Deeper Queries & More Precise Results',
  '5.3 AI 模型選擇：GPT-4、Claude、Gemini 的戰略性運用': '5.3 AI Model Selection: Strategic Use of GPT-4, Claude & Gemini',
  '5.4 API 整合與自動化工作流程': '5.4 API Integration & Automated Workflows',
  
  // Chapter 6
  '6.1 學術研究實戰：文獻綜述與引用管理': '6.1 Academic Research Practice: Literature Review & Citation Management',
  '6.2 商業應用案例：市場調研、競爭分析、趨勢預測': '6.2 Business Use Cases: Market Research, Competitive Analysis & Trend Forecasting',
  '6.3 與其他 AI 工具的協同：ChatGPT + Perplexity 混合工作流': '6.3 Collaboration with Other AI Tools: ChatGPT + Perplexity Hybrid Workflows',
  '6.4 未來展望：「答案引擎」將如何重塑資訊獲取': '6.4 Future Outlook: How "Answer Engines" Will Reshape Information Access'
};

const allDescriptionTranslations = {
  // Chapter 3
  '學習如何提出高質量的問題，掌握 Perplexity 搜索的基本技巧和最佳實踐。': 'Learn how to ask high-quality questions and master Perplexity search basics and best practices.',
  '深入了解 Focus 模式的四大領域應用，針對不同場景優化搜索結果。': 'Deep understanding of Focus mode\'s four domain applications, optimising search results for different scenarios.',
  '掌握文件上傳功能，讓 Perplexity 分析你的 PDF、圖片和文檔內容。': 'Master the file upload feature to let Perplexity analyse your PDF, image and document content.',
  '了解 Copilot 系統如何提供智能建議，引導更深入的探索和發現。': 'Understand how the Copilot system provides intelligent suggestions to guide deeper exploration and discovery.',
  '學習高級搜索技巧，包括時間篩選、來源過濾和語言設定等進階功能。': 'Learn advanced search techniques including time filtering, source filtering and language settings.',
  
  // Chapter 4
  '深入了解 Library 功能，建立個人化的研究資料管理系統。': 'Deep understanding of Library features to build a personalised research data management system.',
  '學習從 Collections 演進到 Spaces 的概念，掌握項目式研究的新方法。': 'Learn the evolution from Collections to Spaces and master new methods of project-based research.',
  '掌握 Spaces 的建立與管理，包括自訂指令設定和團隊協作功能。': 'Master Spaces creation and management, including custom instruction settings and team collaboration features.',
  '學習使用 Pages 功能將研究成果轉化為專業的報告和展示內容。': 'Learn to use Pages feature to transform research results into professional reports and presentations.',
  
  // Chapter 5
  '詳細分析 Pro 訂閱的各項功能，評估投資回報率和升級價值。': 'Detailed analysis of Pro subscription features, evaluating ROI and upgrade value.',
  '探索 Pro Search 的高級功能，獲得更深度和精準的搜索結果。': 'Explore Pro Search advanced features for deeper and more precise search results.',
  '學習如何戰略性地選擇和運用不同的 AI 模型來達成最佳效果。': 'Learn how to strategically select and utilise different AI models for optimal results.',
  '掌握 API 整合技術，建立自動化的 Perplexity 工作流程。': 'Master API integration techniques to build automated Perplexity workflows.',
  
  // Chapter 6
  '實戰演練學術研究流程，從文獻搜尋到引用管理的完整實作。': 'Practical academic research workflow from literature search to complete citation management implementation.',
  '探索 Perplexity 在商業領域的實際應用，提升決策品質和效率。': 'Explore Perplexity\'s practical applications in business to improve decision quality and efficiency.',
  '學習如何整合多種 AI 工具，創造更強大的混合式工作流程。': 'Learn how to integrate multiple AI tools to create more powerful hybrid workflows.',
  '展望 AI 搜索技術的未來發展，理解答案引擎對資訊獲取的影響。': 'Outlook on future AI search technology developments and understand answer engines\' impact on information access.'
};

// Duration mappings
const durationMappings = {
  '20 分鐘': '20 minutes',
  '25 分鐘': '25 minutes',
  '22 分鐘': '22 minutes',
  '18 分鐘': '18 minutes',
  '23 分鐘': '23 minutes',
  '28 分鐘': '28 minutes',
  '15 分鐘': '15 minutes',
  '12 分鐘': '12 minutes',
  '17 分鐘': '17 minutes',
  '14 分鐘': '14 minutes'
};

// Function to add translations for a lesson
function addLessonTranslations(content, chineseTitle, englishTitle) {
  // Find the lesson and add titleEn and durationEn
  const lessonPattern = new RegExp(
    `(\\s+{\\s*\n\\s+id: \\d+,\\s*\n\\s+title: '${chineseTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}',\\s*\n)(\\s+duration: '([^']+)',)`,
    'g'
  );
  
  const match = content.match(lessonPattern);
  if (match) {
    const durationMatch = match[0].match(/duration: '([^']+)'/);
    const chineseDuration = durationMatch ? durationMatch[1] : '20 分鐘';
    const englishDuration = durationMappings[chineseDuration] || chineseDuration.replace('分鐘', 'minutes').replace('小時', 'hours');
    
    const replacement = `$1          titleEn: '${englishTitle}',\n$2\n          durationEn: '${englishDuration}',`;
    content = content.replace(lessonPattern, replacement);
  }
  
  return content;
}

// Apply all translations
console.log('Adding English translations for all Perplexity lessons...');
Object.entries(allLessonTranslations).forEach(([chineseTitle, englishTitle]) => {
  content = addLessonTranslations(content, chineseTitle, englishTitle);
});

// Add description translations
Object.entries(allDescriptionTranslations).forEach(([chineseDesc, englishDesc]) => {
  const descPattern = new RegExp(
    `(description: '${chineseDesc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}',)`,
    'g'
  );
  content = content.replace(descPattern, `$1\n          descriptionEn: '${englishDesc}',`);
});

// Write the updated content back to the file
fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Successfully added ALL English translations for Perplexity lessons (Chapters 3-6)'); 