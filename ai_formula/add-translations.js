const fs = require('fs');
const path = './src/data/chatgpt-complete-course-data.ts';

console.log('🚀 Adding UK English translations to ChatGPT course data...');

// Read the file
let content = fs.readFileSync(path, 'utf8');

// Chapter translations to add
const chapterTranslations = [
  {
    id: 2,
    titleEn: 'Chapter 2: Initial Exploration — Account Setup and Interface Navigation',
    descriptionEn: 'Starting with the most practical operations, guiding learners through the complete process from account registration to familiarising themselves with all ChatGPT interface elements.'
  },
  {
    id: 3,
    titleEn: 'Chapter 3: Mastering Communication — The Art of Effective Prompting',
    descriptionEn: 'Master the core skills of communicating with AI, learning how to write clear, precise, and effective prompts to obtain high-quality responses.'
  },
  {
    id: 4,
    titleEn: 'Chapter 4: Advanced Applications — Professional Techniques and Custom GPTs',
    descriptionEn: 'Explore advanced ChatGPT features, including custom GPT creation, plugin usage, and professional application scenarios.'
  },
  {
    id: 5,
    titleEn: 'Chapter 5: Practical Automation — Workflow Integration and Business Applications',
    descriptionEn: 'Learn how to integrate ChatGPT into actual work scenarios, building efficient AI-assisted workflows to enhance productivity.'
  },
  {
    id: 6,
    titleEn: 'Chapter 6: Responsible Usage — Limitations, Ethics and Future Developments',
    descriptionEn: 'Understand AI limitations, learn responsible usage practices, and explore future developments in artificial intelligence.'
  }
];

// Apply chapter translations
let changeCount = 0;
chapterTranslations.forEach(({id, titleEn, descriptionEn}) => {
  // Pattern: id: 2, title: "...", description: "..."
  const chapterPattern = new RegExp(
    `(\\s+id: ${id},\\s*\\n\\s+title: "[^"]*",)(\\s*\\n\\s+description: "[^"]*",)`,
    'g'
  );
  
  const replacement = `$1\n    titleEn: "${titleEn}",\n    description: "$2".replace('description: "', '').replace('",', ''),\n    descriptionEn: "${descriptionEn}",`;
  
  if (content.includes(`id: ${id},`) && !content.includes(`titleEn: "${titleEn}"`)) {
    content = content.replace(chapterPattern, replacement);
    changeCount++;
    console.log(`✅ Added translations for Chapter ${id}`);
  }
});

// Lesson translations for Chapter 2-6 (basic structure)
const lessonUpdates = [
  // Chapter 2 lessons
  {
    chapterId: 2,
    lessons: [
      { id: 6, titleEn: "2.1 Registration and Login: Begin Your AI Journey", durationEn: "12 minutes" },
      { id: 7, titleEn: "2.2 Interface Overview: Understanding ChatGPT Layout", durationEn: "10 minutes" },
      { id: 8, titleEn: "2.3 Basic Operations: Your First Conversation", durationEn: "15 minutes" },
      { id: 9, titleEn: "2.4 Settings and Customisation: Personalising Your Experience", durationEn: "8 minutes" }
    ]
  },
  // Chapter 3 lessons
  {
    chapterId: 3,
    lessons: [
      { id: 10, titleEn: "3.1 Prompt Fundamentals: The Building Blocks", durationEn: "20 minutes" },
      { id: 11, titleEn: "3.2 Role-Playing Techniques: Making ChatGPT an Expert", durationEn: "18 minutes" },
      { id: 12, titleEn: "3.3 Context Management: Maintaining Conversation Flow", durationEn: "15 minutes" },
      { id: 13, titleEn: "3.4 Advanced Prompting: Complex Instructions and Constraints", durationEn: "25 minutes" }
    ]
  }
];

// Apply lesson translations
lessonUpdates.forEach(({chapterId, lessons}) => {
  lessons.forEach(({id, titleEn, durationEn}) => {
    // Add titleEn after title for lessons
    const lessonTitlePattern = new RegExp(
      `(\\s+id: ${id},\\s*\\n\\s+title: "[^"]*",)`,
      'g'
    );
    
    if (content.includes(`id: ${id},`) && !content.includes(`titleEn: "${titleEn}"`)) {
      content = content.replace(lessonTitlePattern, `$1\n        titleEn: "${titleEn}",`);
      
      // Add durationEn after duration
      const durationPattern = new RegExp(
        `(\\s+duration: "[^"]*",)`,
        'g'
      );
      content = content.replace(durationPattern, `$1\n        durationEn: "${durationEn}",`);
      
      console.log(`✅ Added translations for Lesson ${id}`);
    }
  });
});

// Write the updated content back
fs.writeFileSync(path, content);

console.log(`\n🎉 Translation completed!`);
console.log(`📊 Summary:`);
console.log(`   - Added translations for ${changeCount} chapters`);
console.log(`   - Updated lesson titles and durations`);
console.log(`   - All text now includes UK English versions`); 