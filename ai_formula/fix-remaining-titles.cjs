const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/courses/chatgpt-complete-course/ChatGPTCompleteCourseUnit.tsx');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Define replacement mappings for remaining unit titles
const replacements = [
  // Chapter 4 titles
  {
    old: `title: isZhHK ? '?��? 4.1：實?��???(一) ?�容?��?引�?：自?��??��?質�??�社交�?體貼?�、廣?��?案�??��??�件' : 'Unit 4.1: Project 1: Content Creation Engine - Social Media, Ads & Email',`,
    new: `title: isZhHK ? '單元 4.1：實戰項目(一) 內容創作引擎：自動生成高質量的社交媒體貼文、廣告文案和電子郵件' : 'Unit 4.1: Project 1: Content Creation Engine - Social Media, Ads & Email',`
  },
  {
    old: `title: isZhHK ? '?��? 4.2：實?��???(�? 學�??�究?�速器：快?�總結�??�、報?��?並用簡單?��?�??複�?概念' : 'Unit 4.2: Project 2: Learning Research Accelerator - Summarize Papers & Reports',`,
    new: `title: isZhHK ? '單元 4.2：實戰項目(二) 學習研究加速器：快速總結論文、報告，並用簡單方式解釋複雜概念' : 'Unit 4.2: Project 2: Learning Research Accelerator - Summarize Papers & Reports',`
  },
  {
    old: `title: isZhHK ? '?��? 4.3：實?��???(�? ?��??��??�夥伴�?從零?��?規�??��??�活?��?程�??�業點�?' : 'Unit 4.3: Project 3: Creative Brainstorming Partner - Travel, Events & Business Ideas',`,
    new: `title: isZhHK ? '單元 4.3：實戰項目(三) 創意腦震盪夥伴：從零開始規劃旅行、活動流程或商業點子' : 'Unit 4.3: Project 3: Creative Brainstorming Partner - Travel, Events & Business Ideas',`
  },
  {
    old: `title: isZhHK ? '?��? 4.4：實?��???(?? 程�?設�?超�??��?：解?��?式碼?�除??(Debug) ?�編寫簡?�腳?? : 'Unit 4.4: Project 4: Programming Super Assistant - Code Explanation & Debugging',`,
    new: `title: isZhHK ? '單元 4.4：實戰項目(四) 程式設計超級助手：解釋程式碼、除錯(Debug)和編寫簡單腳本' : 'Unit 4.4: Project 4: Programming Super Assistant - Code Explanation & Debugging',`
  },
  {
    old: `title: isZhHK ? '?��? 4.5：實?��???(�? 語�?翻譯?�潤飾大師�??��?多�?語�?精�?翻譯?��?業�??��??��?' : 'Unit 4.5: Project 5: Language Translation & Polishing Master',`,
    new: `title: isZhHK ? '單元 4.5：實戰項目(五) 語言翻譯與潤飾大師：進行多國語言精準翻譯與專業級文章校對' : 'Unit 4.5: Project 5: Language Translation & Polishing Master',`
  },
  
  // Chapter 5 titles
  {
    old: `title: isZhHK ? '?��? 5.1：Advanced Data Analysis (?��??��?大師)：�???Excel/CSV/PDF，進�??��??��??��?表製�? : 'Unit 5.1: Advanced Data Analysis Master: Upload Excel/CSV/PDF for Data Analysis',`,
    new: `title: isZhHK ? '單元 5.1：Advanced Data Analysis (數據分析大師)：上傳Excel/CSV/PDF，進行數據分析與圖表製作' : 'Unit 5.1: Advanced Data Analysis Master: Upload Excel/CSV/PDF for Data Analysis',`
  },
  {
    old: `title: isZhHK ? '?��? 5.2：Web Browse (實�?網絡?�覽)：�??�即?�網絡�?訊�??��?市場調查?�新?�總�? : 'Unit 5.2: Web Browse: Real-time Web Information for Market Research',`,
    new: `title: isZhHK ? '單元 5.2：Web Browse (實時網絡瀏覽)：結合即時網絡資訊，進行市場調查與新聞總結' : 'Unit 5.2: Web Browse: Real-time Web Information for Market Research',`
  },
  {
    old: `title: isZhHK ? '?��? 5.3：DALL-E 3 ?��??��?：用?��??�造出專業級�??�業?��??�簡?��??��??��?作�?' : 'Unit 5.3: DALL-E 3 Image Generation: Create Professional Business Illustrations',`,
    new: `title: isZhHK ? '單元 5.3：DALL-E 3 圖像生成：用文字創造出專業級的商業插圖、簡報圖片與藝術作品' : 'Unit 5.3: DALL-E 3 Image Generation: Create Professional Business Illustrations',`
  },
  {
    old: `title: isZhHK ? '?��? 5.4：創建�??�第一??Custom GPT：無?�編�?，�??��??��??�造個人專屬??AI ?�用' : 'Unit 5.4: Create Your First Custom GPT: Build Personal AI Applications Without Programming',`,
    new: `title: isZhHK ? '單元 5.4：創建你的第一個Custom GPT：無需編程，手把手教你打造個人專屬的AI應用' : 'Unit 5.4: Create Your First Custom GPT: Build Personal AI Applications Without Programming',`
  },
  {
    old: `title: isZhHK ? '?��? 5.5：GPTs ?�用?��??��?密�?如�??��?你�? GPT，�??�未來可?��?中獲?? : 'Unit 5.5: GPTs App Store Secrets: How to Publish Your GPT and Potentially Profit',`,
    new: `title: isZhHK ? '單元 5.5：GPTs 應用商店的秘密：如何發佈你的 GPT，甚至未來可能從中獲利' : 'Unit 5.5: GPTs App Store Secrets: How to Publish Your GPT and Potentially Profit',`
  },
  
  // Chapter 6 titles
  {
    old: `title: isZhHK ? '?��? 6.1：AI ?�「幻覺」現象�?如�?識別並查�?AI ?��??��??��?�? : 'Unit 6.1: AI "Hallucination" Phenomenon: Identify and Verify AI-generated False Information',`,
    new: `title: isZhHK ? '單元 6.1：AI 的「幻覺」現象：如何識別並查證 AI 生成的虛假資訊' : 'Unit 6.1: AI "Hallucination" Phenomenon: Identify and Verify AI-generated False Information',`
  },
  {
    old: `title: isZhHK ? '?��? 6.2：數?��??��?安全：�??��?話�??��?？�?何管?��??�數?? : 'Unit 6.2: Data Privacy & Security: Are Your Conversations Safe? Managing Your Data',`,
    new: `title: isZhHK ? '單元 6.2：數據私隱與安全：你的對話安全嗎？如何管理你的數據' : 'Unit 6.2: Data Privacy & Security: Are Your Conversations Safe? Managing Your Data',`
  },
  {
    old: `title: isZhHK ? '?��? 6.3：AI ?��?見�?題�?認�?訓練?��?帶�??��??�影?��?並學習�?何�?�? : 'Unit 6.3: AI Bias Issues: Understanding Training Data Impact and How to Respond',`,
    new: `title: isZhHK ? '單元 6.3：AI 的偏見問題：認識訓練數據帶來的潛在影響，並學習如何應對' : 'Unit 6.3: AI Bias Issues: Understanding Training Data Impact and How to Respond',`
  },
  {
    old: `title: isZhHK ? '?��? 6.4：�?責任?�使??AI：在學�??�工作�??��?中�??��??�倫�??��?' : 'Unit 6.4: Responsible AI Use: Ethical Boundaries in Academia, Work & Creation',`,
    new: `title: isZhHK ? '單元 6.4：負責任地使用 AI：在學術、工作與創作中應遵守的倫理界線' : 'Unit 6.4: Responsible AI Use: Ethical Boundaries in Academia, Work & Creation',`
  },
  {
    old: `title: isZhHK ? '?��? 6.5：人工智?��??��?：�???GPT ?��?一步發展�?對社?��??��?影響' : 'Unit 6.5: The Future of AI: GPT\\'s Next Development and Long-term Social Impact',`,
    new: `title: isZhHK ? '單元 6.5：人工智能的未來：展望 GPT 的下一步發展與對社會的長遠影響' : 'Unit 6.5: The Future of AI: GPT\\'s Next Development and Long-term Social Impact',`
  }
];

console.log('Starting to fix remaining unit titles...');

// Apply all replacements
replacements.forEach((replacement, index) => {
  if (content.includes(replacement.old)) {
    content = content.replace(replacement.old, replacement.new);
    console.log(`✅ Applied replacement ${index + 1}/${replacements.length}`);
  } else {
    console.log(`⚠️  Could not find pattern ${index + 1}/${replacements.length}`);
  }
});

// Write back to file
fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ File updated successfully!');
console.log('Fixed corruption in remaining ChatGPT course unit titles.'); 