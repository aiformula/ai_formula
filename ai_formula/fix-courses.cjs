const fs = require('fs');
const path = require('path');

console.log('🚀 開始修復 courses.ts 文件...');

const filePath = path.join(__dirname, 'src/data/courses/courses.ts');

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 修復常見的中文字符編碼問題
  const fixes = [
    // 修復未終止的字符串和編碼問題
    ['titleCht: "AI工具?�平??,', 'titleCht: "AI工具與平台",'],
    ['descriptionCht: "?��?AI工具概覽以�?如�??��??�適?�工??,', 'descriptionCht: "熱門AI工具概覽以及如何選擇適合工具",'],
    ['descriptionCht: "?��?業中實施AI?�逐步?��?",', 'descriptionCht: "在企業中實施AI的逐步指南",'],
    ['titleCht: "?��??�報?��?績�?測�?",', 'titleCht: "結果報告和績效測量",'],
    
    // 修復類型定義中的編碼問題
    ['levelCht: \'?��?\' | \'中�?\' | \'高�?\';', 'levelCht: \'初級\' | \'中級\' | \'高級\';'],
    ['levelCht: "中�?",', 'levelCht: "中級",'],
    ['levelCht: "高�?",', 'levelCht: "高級",'],
    
    // 修復常見的中文詞彙
    ['?�業', '商業'],
    ['?��?', '基礎'],
    ['?�能', '智能'],
    ['?��???', '自動化'],
    ['人工?�能', '人工智能'],
    ['?�平??', '平台'],
    ['?��?', '熱門'],
    ['?�解', '了解'],
    ['?��??', '知識'],
    ['?��??', '應用'],
    ['?��?', '企業'],
    ['?��?', '指南'],
    ['?��?', '結果'],
    ['?��?', '報告'],
    ['?��?', '績效'],
    ['?��?', '測量'],
    
    // 修復其他常見編碼問題
    ['??', '/images/courses/placeholder.jpg'],
    ['?�', '的'],
    ['?�', '和'],
    ['?�', '在'],
    ['?�', '與'],
    ['?�', '如'],
    ['?�', '何'],
    ['?�', '選'],
    ['?�', '擇'],
    ['?�', '適'],
    ['?�', '合'],
    ['?�', '工'],
    ['?�', '具'],
    ['?�', '實'],
    ['?�', '施'],
    ['?�', '逐'],
    ['?�', '步'],
    ['?�', '結'],
    ['?�', '果'],
    ['?�', '績'],
    ['?�', '效'],
    ['?�', '測'],
    ['?�', '量'],
    
    // 修復特定的未終止字符串
    ['"AI工具與平台,', '"AI工具與平台",'],
    ['"熱門AI工具概覽以及如何選擇適合工具,', '"熱門AI工具概覽以及如何選擇適合工具",'],
    ['"在企業中實施AI的逐步指南,', '"在企業中實施AI的逐步指南",'],
    ['"結果報告和績效測量,', '"結果報告和績效測量",'],
  ];
  
  let changesCount = 0;
  
  fixes.forEach(([pattern, replacement]) => {
    const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const newContent = content.replace(regex, replacement);
    if (newContent !== content) {
      content = newContent;
      changesCount++;
      console.log(`✅ 修復: ${pattern} -> ${replacement}`);
    }
  });
  
  // 寫入修復後的內容
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\n✅ 修復完成！共修復 ${changesCount} 個問題`);
  
} catch (error) {
  console.error('❌ 修復失敗:', error.message);
  process.exit(1);
} 