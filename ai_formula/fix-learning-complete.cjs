const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/course/LearningMaterials.tsx');

console.log('🚀 開始完整修復 LearningMaterials.tsx...');

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 核心編碼修復
  const coreFixes = [
    // 修復小時
    ['小�?', '小時'],
    // 修復常見詞彙
    ['學�?', '學習'],
    ['進階?�', '進階的'],
    ['?�業', '商業'],
    ['?�慧', '智慧'],
    ['?�學習', '的學習'],
    ['?�用', '應用'],
    ['?�場', '市場'],
    ['?�工作', '的工作'],
    ['?�程', '流程'],
    ['?�算', '演算'],
    ['?�設', '設計'],
    ['?�實', '實際'],
    ['?�核心', '的核心'],
    ['?�深度', '的深度'],
    ['?�大', '的大'],
    ['?�Python', '的Python'],
    ['?�企業', '的企業'],
    ['?�戰', '實戰'],
    ['?��', '課程'],
    ['??', '資料'],
    ['?��', '模型'],
    ['?��', '自動化'],
    ['?��', '優化'],
    ['?��', '工具'],
    ['?��', '演練'],
    ['?��', '完整'],
    ['?��', '專業'],
    ['?��', '數據'],
    ['?��', '分析'],
    ['?��', '處理'],
    ['?��', '機器'],
    ['?��', '人工'],
    ['?��', '智能'],
    ['?��', '學習']
  ];
  
  // 修復未終止的字符串
  const stringFixes = [
    ['進階進階：大進階進階進階,', '資料科學：大數據分析技術",'],
    ['進階算法：深度學習核心技術,', '進階算法：深度學習核心技術",'],
    ['程式設計：Python實戰演練,', '程式設計：Python實戰演練",'],
    ['企業應用：實際商業場景,', '企業應用：實際商業場景",'],
    ['商業AI進階,', '商業AI進階",'],
    ['使用AI工具的工作流程自進階的商業流程,', '使用AI工具的工作流程自動化商業流程",'],
    ['進階", "商業", "AI工具"],', '進階", "商業", "AI工具"],'],
    ['進階進階進階工具進階,', '進階數據處理工具",']
  ];
  
  let changesCount = 0;
  
  // 應用核心修復
  coreFixes.forEach(([pattern, replacement]) => {
    const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const newContent = content.replace(regex, replacement);
    if (newContent !== content) {
      content = newContent;
      changesCount++;
      console.log(`✅ 修復: ${pattern} -> ${replacement}`);
    }
  });
  
  // 應用字符串修復
  stringFixes.forEach(([pattern, replacement]) => {
    const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const newContent = content.replace(regex, replacement);
    if (newContent !== content) {
      content = newContent;
      changesCount++;
      console.log(`✅ 字符串修復: ${pattern} -> ${replacement}`);
    }
  });
  
  // 寫入修復後的內容
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\n✅ 完整修復完成！共修復 ${changesCount} 個問題`);
  
} catch (error) {
  console.error('❌ 修復失敗:', error.message);
} 