const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/courses/chatgpt-complete-course/ChatGPTCompleteCourseUnit.tsx');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Define replacement mappings for all unit titles
const replacements = [
  // Chapter 2 titles
  {
    old: `title: isZhHK ? '?��? 2.4：�?�?App ?��??�能：�??��?話�??��?辨�?實戰' : 'Unit 2.4: Mobile App Exclusive Features: Voice Chat & Image Recognition',`,
    new: `title: isZhHK ? '單元 2.4：手機App獨家功能：語音對話和圖像識別實戰' : 'Unit 2.4: Mobile App Exclusive Features: Voice Chat & Image Recognition',`
  },
  {
    old: `title: isZhHK ? '?��? 2.5：探�?GPT Store：�?何�??�、�?估�?使用?�人建�??�優秀 GPTs' : 'Unit 2.5: Exploring GPT Store: Finding, Evaluating & Using GPTs',`,
    new: `title: isZhHK ? '單元 2.5：探索GPT Store：如何找到、評估和使用他人建構的優秀 GPTs' : 'Unit 2.5: Exploring GPT Store: Finding, Evaluating & Using GPTs',`
  },
  
  // Chapter 3 titles
  {
    old: `title: isZhHK ? '?��? 3.1：優質�?令�??�大?�石：�???(Role)?�任??(Task)?��?�?(Context)?�格�?(Format)' : 'Unit 3.1: Four Pillars of Quality Prompts: Role, Task, Context, Format',`,
    new: `title: isZhHK ? '單元 3.1：優質指令的四大基石：角色(Role)、任務(Task)、脈絡(Context)、格式(Format)' : 'Unit 3.1: Four Pillars of Quality Prompts: Role, Task, Context, Format',`
  },
  {
    old: `title: isZhHK ? '?��? 3.2：�??�扮演�?：�? ChatGPT ?�為你�?私人律師?��?式設計師?��??��?�? : 'Unit 3.2: Role-Playing Method: Make ChatGPT Your Personal Expert',`,
    new: `title: isZhHK ? '單元 3.2：角色扮演法：讓 ChatGPT 成為你的私人律師、程式設計師或行銷專家' : 'Unit 3.2: Role-Playing Method: Make ChatGPT Your Personal Expert',`
  },
  {
    old: `title: isZhHK ? '?��? 3.3：�?例�?導�? (Few-Shot Prompting)：給�?AI 範�?，�?它模仿�??�風?? : 'Unit 3.3: Few-Shot Prompting: Give AI Examples to Mimic Your Style',`,
    new: `title: isZhHK ? '單元 3.3：範例引導法 (Few-Shot Prompting)：給予AI範例，讓它模仿你的風格' : 'Unit 3.3: Few-Shot Prompting: Give AI Examples to Mimic Your Style',`
  },
  {
    old: `title: isZhHK ? '?��? 3.4：思維?��?�?(Chain of Thought)：�?�?AI 一步步?�考�?�?��複�??��?' : 'Unit 3.4: Chain of Thought: Guide AI to Think Step by Step',`,
    new: `title: isZhHK ? '單元 3.4：思維鏈技巧(Chain of Thought)：引導AI一步步思考，解決複雜問題' : 'Unit 3.4: Chain of Thought: Guide AI to Think Step by Step',`
  },
  {
    old: `title: isZhHK ? '?��? 3.5：迭�??追�?：�?何透�?追�?，�? 60 ?��?答�??��???95 ?? : 'Unit 3.5: Iteration & Follow-up: Optimise from 60-point to 95-point Answers',`,
    new: `title: isZhHK ? '單元 3.5：迭代與追問：如何透過追問，從60分的答案優化到95分' : 'Unit 3.5: Iteration & Follow-up: Optimise from 60-point to 95-point Answers',`
  },
  {
    old: `title: isZhHK ? '?��? 3.6：�?令�??�庫：�?�?20+ ?�常?��??��?令�??��??�學?�用' : 'Unit 3.6: Prompt Template Library: 20+ High-Efficiency Templates Ready to Use',`,
    new: `title: isZhHK ? '單元 3.6：指令範本庫：提供20+個常用高效指令範本，即學即用' : 'Unit 3.6: Prompt Template Library: 20+ High-Efficiency Templates Ready to Use',`
  }
];

// Also fix duration fields
const durationReplacements = [
  /duration: '(\d+)\?��\?',/g,
  "duration: '$1分鐘',"
];

console.log('Starting to fix unit titles...');

// Apply all replacements
replacements.forEach((replacement, index) => {
  if (content.includes(replacement.old)) {
    content = content.replace(replacement.old, replacement.new);
    console.log(`✅ Applied replacement ${index + 1}/${replacements.length}`);
  } else {
    console.log(`⚠️  Could not find pattern ${index + 1}/${replacements.length}`);
  }
});

// Fix duration fields
content = content.replace(durationReplacements[0], durationReplacements[1]);
console.log('✅ Fixed duration fields');

// Write back to file
fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ File updated successfully!');
console.log('Fixed corruption in ChatGPT course unit titles and durations.'); 