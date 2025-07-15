const fs = require('fs');
const path = require('path');

console.log('🚀 開始系統性修復所有文件...');

// 需要修復的文件清單
const files = [
  'src/components/course/LearningMaterials.tsx',
  'src/pages/courses/Course.tsx',
  'src/pages/courses/PerplexityToolsLesson.tsx',
  'src/hooks/useCourseData.ts',
  'src/data/courses/courses.ts'
];

// 常見的編碼修復映射
const encodingFixes = [
  // 常見的編碼問題
  ['?��?', '自動化'],
  ['?��?', '課程'],
  ['?��?', '進階'],
  ['?��?', '資料'],
  ['?��?', '商業'],
  ['?��?', '工具'],
  ['?��?', '流程'],
  ['?��?', '技術'],
  ['?��?', '學習'],
  ['?��?', '演算'],
  ['?��?', '設計'],
  ['?��?', '實際'],
  ['?��?', '分析'],
  ['?��?', '數據'],
  ['?��?', '應用'],
  ['?��?', '企業'],
  ['?��?', '市場'],
  ['?��?', '管理'],
  ['?��?', '系統'],
  ['?��?', '平台'],
  ['?��?', '服務'],
  ['?��?', '解決'],
  ['?��?', '方案'],
  ['?��?', '專業'],
  ['?��?', '基礎'],
  ['?��?', '核心'],
  ['?��?', '深度'],
  ['?��?', '機器'],
  ['?��?', '人工'],
  ['?��?', '智能'],
  ['?��?', '模型'],
  ['?��?', '訓練'],
  ['?��?', '測試'],
  ['?��?', '部署'],
  ['?��?', '優化'],
  ['?��?', '性能'],
  ['?��?', '效率'],
  ['?��?', '品質'],
  ['?��?', '標準'],
  ['?��?', '規範'],
  ['?��?', '流程'],
  ['?��?', '步驟'],
  ['?��?', '方法'],
  ['?��?', '策略'],
  ['?��?', '計劃'],
  ['?��?', '目標'],
  ['?��?', '結果'],
  ['?��?', '成果'],
  ['?��?', '完成'],
  ['?��?', '開始'],
  ['?��?', '結束'],
  ['?��?', '處理'],
  ['?��?', '操作'],
  ['?��?', '執行'],
  ['?��?', '運行'],
  ['?��?', '建立'],
  ['?��?', '創建'],
  ['?��?', '開發'],
  ['?��?', '維護'],
  ['?��?', '更新'],
  ['?��?', '升級'],
  ['?��?', '改進'],
  ['?��?', '提升'],
  ['?��?', '增強'],
  ['?��?', '擴展'],
  ['?��?', '整合'],
  ['?��?', '集成'],
  ['?��?', '連接'],
  ['?��?', '協調'],
  ['?��?', '配合'],
  ['?��?', '合作'],
  ['?��?', '團隊'],
  ['?��?', '組織'],
  ['?��?', '公司'],
  ['?��?', '業務'],
  ['?��?', '工作'],
  ['?��?', '任務'],
  ['?��?', '項目'],
  ['?��?', '產品'],
  ['?��?', '服務'],
  
  // 修復單個字符
  ['?�', '的'],
  ['?�', '在'],
  ['?�', '和'],
  ['?�', '與'],
  ['?�', '為'],
  ['?�', '是'],
  ['?�', '有'],
  ['?�', '用'],
  ['?�', '可'],
  ['?�', '能'],
  ['?�', '會'],
  ['?�', '將'],
  ['?�', '已'],
  ['?�', '要'],
  ['?�', '到'],
  ['?�', '對'],
  ['?�', '從'],
  ['?�', '了'],
  ['?�', '個'],
  ['?�', '這'],
  ['?�', '那'],
  ['?�', '一'],
  ['?�', '二'],
  ['?�', '三'],
  ['?�', '四'],
  ['?�', '五'],
  ['?�', '六'],
  ['?�', '七'],
  ['?�', '八'],
  ['?�', '九'],
  ['?�', '十'],
  
  // 修復未終止的字符串
  ['進階資料,', '進階'],
  ['商業AI進階資料,', '商業AI進階'],
  ['業�資料�行�?進階資料,', '商業資料管理進階'],
  ['資料�資料�售業�?進階進階進階', '資料科學銷售商業進階技術'],
  ['業�?流�?進階轉�?', '商業流程進階轉換'],
  ['資料進階進階進階工�?進階', '資料進階處理工具'],
  ['小�?', '小時'],
  
  // 修復圖片路徑
  ['??', '/images/courses/placeholder.jpg'],
  ['/images/courses/placeholder.jpg/images/courses/placeholder.jpg', '/images/courses/placeholder.jpg'],
  
  // 修復特殊字符串問題
  ['",', '",'],
  [',', ','],
  ['"', '"'],
  ['"', '"']
];

// 修復函數
function fixFile(filePath) {
  console.log(`\n🔧 修復文件: ${filePath}`);
  
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  文件不存在: ${filePath}`);
      return false;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changesCount = 0;
    
    // 應用所有修復
    encodingFixes.forEach(([pattern, replacement]) => {
      const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const newContent = content.replace(regex, replacement);
      if (newContent !== content) {
        content = newContent;
        changesCount++;
      }
    });
    
    // 寫入修復後的內容
    fs.writeFileSync(filePath, content, 'utf8');
    
    if (changesCount > 0) {
      console.log(`✅ 修復完成: ${changesCount} 個問題`);
      return true;
    } else {
      console.log(`ℹ️  沒有發現需要修復的問題`);
      return false;
    }
    
  } catch (error) {
    console.error(`❌ 修復失敗: ${error.message}`);
    return false;
  }
}

// 執行修復
let totalFixed = 0;
let totalFiles = 0;

files.forEach(file => {
  totalFiles++;
  const fullPath = path.join(__dirname, file);
  if (fixFile(fullPath)) {
    totalFixed++;
  }
});

console.log(`\n📊 修復摘要:`);
console.log(`總文件數: ${totalFiles}`);
console.log(`已修復: ${totalFixed}`);
console.log(`修復率: ${((totalFixed / totalFiles) * 100).toFixed(1)}%`);

console.log('\n🎉 系統性修復完成！'); 