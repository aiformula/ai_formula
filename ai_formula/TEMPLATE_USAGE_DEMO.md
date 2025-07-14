# 🎯 模板使用演示 / Template Usage Demo

## 實際範例：添加新課程 "AI寫作助手精通課程" / Practical Example: Adding New Course "AI Writing Assistant Mastery"

### 步驟1：創建課程數據 / Step 1: Create Course Data

在 `src/data/courses/` 創建新文件 `aiWritingAssistant.ts`：

```typescript
// src/data/courses/aiWritingAssistant.ts
import { Course } from '@/types/courseTypes';

export const aiWritingAssistantCourse: Course = {
  id: 'ai-writing-assistant',
  title: {
    zh: 'AI寫作助手精通課程',
    en: 'AI Writing Assistant Mastery Course'
  },
  description: {
    zh: '學習如何使用AI工具提升寫作效率，掌握ChatGPT、Claude、Gemini等工具的寫作技巧',
    en: 'Learn how to use AI tools to enhance writing efficiency, master writing techniques with ChatGPT, Claude, Gemini and other tools'
  },
  category: 'ai-tools',
  level: 'beginner',
  duration: '4小時',
  instructor: {
    name: 'AI Formula Team',
    bio: {
      zh: '專業AI培訓團隊，擁有豐富的AI應用經驗',
      en: 'Professional AI training team with rich AI application experience'
    },
    avatar: '/assets/images/instructors/ai-formula-team.jpg'
  },
  thumbnail: '/assets/images/courses/ai-writing-assistant.jpg',
  price: {
    original: 499,
    current: 299
  },
  modules: [
    {
      id: 'introduction',
      title: {
        zh: '課程介紹與基礎概念',
        en: 'Course Introduction and Basic Concepts'
      },
      description: {
        zh: '了解AI寫作助手的基本概念和應用場景',
        en: 'Understanding basic concepts and application scenarios of AI writing assistants'
      },
      lessons: [
        {
          id: 'welcome',
          title: {
            zh: '歡迎來到AI寫作助手課程',
            en: 'Welcome to AI Writing Assistant Course'
          },
          content: {
            zh: '本課程將帶您從零開始，掌握AI寫作助手的使用技巧...',
            en: 'This course will take you from zero to mastering AI writing assistant techniques...'
          },
          duration: '15分鐘',
          type: 'video'
        },
        {
          id: 'ai-writing-basics',
          title: {
            zh: 'AI寫作基礎概念',
            en: 'AI Writing Basic Concepts'
          },
          content: {
            zh: '什麼是AI寫作助手？它如何工作？有哪些優勢？',
            en: 'What is an AI writing assistant? How does it work? What are the advantages?'
          },
          duration: '20分鐘',
          type: 'video'
        }
      ]
    },
    {
      id: 'chatgpt-writing',
      title: {
        zh: 'ChatGPT寫作技巧',
        en: 'ChatGPT Writing Techniques'
      },
      description: {
        zh: '深入學習ChatGPT的寫作應用技巧',
        en: 'Deep learning of ChatGPT writing application techniques'
      },
      lessons: [
        {
          id: 'chatgpt-prompts',
          title: {
            zh: 'ChatGPT寫作提示詞設計',
            en: 'ChatGPT Writing Prompt Design'
          },
          content: {
            zh: '如何設計有效的寫作提示詞...',
            en: 'How to design effective writing prompts...'
          },
          duration: '30分鐘',
          type: 'video'
        },
        {
          id: 'content-types',
          title: {
            zh: '不同內容類型的寫作方法',
            en: 'Writing Methods for Different Content Types'
          },
          content: {
            zh: '博客文章、社交媒體、郵件、報告等不同類型內容的寫作技巧',
            en: 'Writing techniques for different types of content: blog articles, social media, emails, reports, etc.'
          },
          duration: '35分鐘',
          type: 'video'
        }
      ]
    },
    {
      id: 'advanced-techniques',
      title: {
        zh: '進階寫作技巧',
        en: 'Advanced Writing Techniques'
      },
      description: {
        zh: '掌握高級AI寫作技巧和工作流程',
        en: 'Master advanced AI writing techniques and workflows'
      },
      lessons: [
        {
          id: 'workflow-optimization',
          title: {
            zh: '寫作工作流程優化',
            en: 'Writing Workflow Optimization'
          },
          content: {
            zh: '如何構建高效的AI輔助寫作工作流程',
            en: 'How to build efficient AI-assisted writing workflows'
          },
          duration: '25分鐘',
          type: 'video'
        },
        {
          id: 'quality-control',
          title: {
            zh: '內容質量控制與編輯',
            en: 'Content Quality Control and Editing'
          },
          content: {
            zh: '如何確保AI生成內容的質量和準確性',
            en: 'How to ensure quality and accuracy of AI-generated content'
          },
          duration: '30分鐘',
          type: 'video'
        }
      ]
    },
    {
      id: 'practical-projects',
      title: {
        zh: '實戰項目',
        en: 'Practical Projects'
      },
      description: {
        zh: '通過實際項目練習所學技能',
        en: 'Practice learned skills through actual projects'
      },
      lessons: [
        {
          id: 'blog-writing',
          title: {
            zh: '博客文章撰寫實戰',
            en: 'Blog Article Writing Practice'
          },
          content: {
            zh: '完成一篇完整的博客文章，從構思到發布',
            en: 'Complete a full blog article from conception to publication'
          },
          duration: '40分鐘',
          type: 'practical'
        },
        {
          id: 'marketing-copy',
          title: {
            zh: '營銷文案創作',
            en: 'Marketing Copy Creation'
          },
          content: {
            zh: '創作吸引人的營銷文案和廣告內容',
            en: 'Create engaging marketing copy and advertising content'
          },
          duration: '35分鐘',
          type: 'practical'
        }
      ]
    }
  ]
};
```

### 步驟2：更新課程數據導出 / Step 2: Update Course Data Export

在 `src/data/courses/index.ts` 中添加新課程：

```typescript
// src/data/courses/index.ts
export { aiImageVideoCreationCourse } from './aiImageVideoCreation';
export { promptEngineeringCourse } from './promptEngineering';
export { aiWritingAssistantCourse } from './aiWritingAssistant'; // 新增此行
export { courseData } from './courseData';
export { courseDetails } from './courseDetails';
export { courses } from './courses';
```

### 步驟3：創建課程頁面 / Step 3: Create Course Page

創建 `src/pages/courses/AIWritingAssistantCourse.tsx`：

```typescript
// src/pages/courses/AIWritingAssistantCourse.tsx
import { CourseTemplate } from '@/components/templates';
import { aiWritingAssistantCourse } from '@/data/courses';

export default function AIWritingAssistantCourse() {
  return (
    <CourseTemplate
      course={aiWritingAssistantCourse}
      displayMode="course"
      showProgress={true}
      showEnrollment={true}
      showNotes={true}
      enableSharing={true}
      enableBookmark={true}
      onEnroll={(courseId) => {
        console.log('User enrolled in course:', courseId);
        // 這裡可以添加註冊邏輯
      }}
      onProgress={(progress) => {
        console.log('Course progress updated:', progress);
        // 這裡可以添加進度保存邏輯
      }}
    />
  );
}
```

### 步驟4：創建課程大綱頁面 / Step 4: Create Course Outline Page

創建 `src/pages/courses/AIWritingAssistantOutline.tsx`：

```typescript
// src/pages/courses/AIWritingAssistantOutline.tsx
import { CourseTemplate } from '@/components/templates';
import { aiWritingAssistantCourse } from '@/data/courses';

export default function AIWritingAssistantOutline() {
  return (
    <CourseTemplate
      course={aiWritingAssistantCourse}
      displayMode="outline"
      showProgress={false}
      showEnrollment={true}
      highlightModule={0} // 高亮第一個模組
      enableSharing={true}
      theme="dark"
      accentColor="purple"
    />
  );
}
```

### 步驟5：創建學習頁面 / Step 5: Create Learning Page

創建 `src/pages/courses/AIWritingAssistantLearning.tsx`：

```typescript
// src/pages/courses/AIWritingAssistantLearning.tsx
import { CourseTemplate } from '@/components/templates';
import { aiWritingAssistantCourse } from '@/data/courses';
import { useState } from 'react';

export default function AIWritingAssistantLearning() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [progress, setProgress] = useState(0);

  return (
    <CourseTemplate
      course={aiWritingAssistantCourse}
      displayMode="learning"
      showProgress={true}
      showEnrollment={false}
      showNotes={true}
      showQuiz={true}
      currentLesson={currentLesson}
      enableDownload={true}
      onProgress={(newProgress) => {
        setProgress(newProgress);
        console.log('Learning progress:', newProgress);
      }}
      onLessonComplete={(lessonId) => {
        console.log('Lesson completed:', lessonId);
        // 自動跳到下一課
        setCurrentLesson(prev => prev + 1);
      }}
    />
  );
}
```

### 步驟6：添加路由配置 / Step 6: Add Route Configuration

在 `src/App.tsx` 中添加新路由：

```typescript
// src/App.tsx
import AIWritingAssistantCourse from './pages/courses/AIWritingAssistantCourse';
import AIWritingAssistantOutline from './pages/courses/AIWritingAssistantOutline';
import AIWritingAssistantLearning from './pages/courses/AIWritingAssistantLearning';

// 在路由配置中添加
{
  path: '/courses/ai-writing-assistant',
  element: <AIWritingAssistantCourse />
},
{
  path: '/courses/ai-writing-assistant/outline',
  element: <AIWritingAssistantOutline />
},
{
  path: '/courses/ai-writing-assistant/learning',
  element: <AIWritingAssistantLearning />
}
```

### 步驟7：更新課程列表數據 / Step 7: Update Course List Data

在 `src/data/courses/courses.ts` 中添加新課程到列表：

```typescript
// src/data/courses/courses.ts
export const courses = [
  // ... 現有課程
  {
    id: 'ai-writing-assistant',
    title: {
      zh: 'AI寫作助手精通課程',
      en: 'AI Writing Assistant Mastery Course'
    },
    description: {
      zh: '學習如何使用AI工具提升寫作效率',
      en: 'Learn how to use AI tools to enhance writing efficiency'
    },
    category: 'ai-tools',
    level: 'beginner',
    duration: '4小時',
    price: {
      original: 499,
      current: 299
    },
    thumbnail: '/assets/images/courses/ai-writing-assistant.jpg',
    link: '/courses/ai-writing-assistant'
  }
];
```

## 🎯 快速複製現有課程 / Quick Copy Existing Course

### 方法1：複製並修改現有課程 / Method 1: Copy and Modify Existing Course

```bash
# 複製現有課程文件
cp src/data/courses/promptEngineering.ts src/data/courses/yourNewCourse.ts
cp src/pages/courses/PromptEngineeringCourse.tsx src/pages/courses/YourNewCourse.tsx
cp src/pages/courses/PromptEngineeringOutline.tsx src/pages/courses/YourNewCourseOutline.tsx
```

然後修改文件中的內容：
1. 更改課程ID和標題
2. 修改課程描述和模組內容
3. 更新導入語句
4. 添加路由配置

### 方法2：使用模板創建腳本 / Method 2: Use Template Creation Script

創建 `scripts/createCourse.js`：

```javascript
// scripts/createCourse.js
const fs = require('fs');
const path = require('path');

function createCourse(courseName, courseTitle) {
  const courseId = courseName.toLowerCase().replace(/\s+/g, '-');
  const componentName = courseName.replace(/\s+/g, '');
  
  // 創建課程數據文件
  const courseDataTemplate = `
import { Course } from '@/types/courseTypes';

export const ${componentName.toLowerCase()}Course: Course = {
  id: '${courseId}',
  title: {
    zh: '${courseTitle.zh}',
    en: '${courseTitle.en}'
  },
  description: {
    zh: '課程描述（中文）',
    en: 'Course Description (English)'
  },
  // ... 其他課程數據
};
`;

  // 創建課程頁面文件
  const coursePageTemplate = `
import { CourseTemplate } from '@/components/templates';
import { ${componentName.toLowerCase()}Course } from '@/data/courses';

export default function ${componentName}Course() {
  return (
    <CourseTemplate
      course={${componentName.toLowerCase()}Course}
      displayMode="course"
      showProgress={true}
      showEnrollment={true}
    />
  );
}
`;

  // 寫入文件
  fs.writeFileSync(
    path.join(__dirname, `../src/data/courses/${courseId}.ts`),
    courseDataTemplate
  );
  
  fs.writeFileSync(
    path.join(__dirname, `../src/pages/courses/${componentName}Course.tsx`),
    coursePageTemplate
  );
  
  console.log(`✅ 課程 "${courseTitle.zh}" 創建成功！`);
}

// 使用範例
createCourse('AI Automation', {
  zh: 'AI自動化精通課程',
  en: 'AI Automation Mastery Course'
});
```

## 🔧 自定義配置範例 / Custom Configuration Examples

### 1. 不同顯示模式的配置 / Different Display Mode Configurations

```typescript
// 課程頁面 - 完整功能
<CourseTemplate
  course={courseData}
  displayMode="course"
  showProgress={true}
  showEnrollment={true}
  showNotes={true}
  enableSharing={true}
/>

// 課程大綱 - 簡化版本
<CourseTemplate
  course={courseData}
  displayMode="outline"
  showProgress={false}
  showEnrollment={true}
  highlightModule={0}
/>

// 學習頁面 - 學習專用
<CourseTemplate
  course={courseData}
  displayMode="learning"
  showProgress={true}
  showEnrollment={false}
  showNotes={true}
  showQuiz={true}
  currentLesson={0}
/>
```

### 2. 主題和樣式自定義 / Theme and Style Customization

```typescript
<CourseTemplate
  course={courseData}
  displayMode="course"
  theme="dark"
  accentColor="purple"
  customStyles={{
    container: "max-w-6xl mx-auto",
    header: "bg-gradient-to-r from-purple-600 to-blue-600",
    content: "bg-gray-900 text-white"
  }}
/>
```

### 3. 進階功能配置 / Advanced Feature Configuration

```typescript
<CourseTemplate
  course={courseData}
  displayMode="learning"
  
  // 功能開關
  enableDownload={true}
  enableBookmark={true}
  enableNotes={true}
  enableQuiz={true}
  
  // 回調函數
  onEnroll={(courseId) => {
    // 處理課程註冊
    analytics.track('course_enrolled', { courseId });
  }}
  
  onProgress={(progress) => {
    // 保存學習進度
    localStorage.setItem('course_progress', JSON.stringify(progress));
  }}
  
  onLessonComplete={(lessonId) => {
    // 處理課程完成
    console.log('Lesson completed:', lessonId);
  }}
  
  onQuizComplete={(quizResult) => {
    // 處理測驗完成
    console.log('Quiz completed:', quizResult);
  }}
/>
```

## 🚀 部署和測試 / Deployment and Testing

### 本地測試 / Local Testing

```bash
# 啟動開發服務器
npm run dev

# 訪問新課程頁面
http://localhost:5173/courses/ai-writing-assistant
http://localhost:5173/courses/ai-writing-assistant/outline
http://localhost:5173/courses/ai-writing-assistant/learning
```

### 構建和部署 / Build and Deploy

```bash
# 構建生產版本
npm run build

# 預覽構建結果
npm run preview

# 部署到服務器
npm run deploy
```

## 📝 總結 / Summary

通過使用模板系統，您可以：

1. **快速添加新課程** - 只需創建數據文件和頁面組件
2. **統一用戶體驗** - 所有課程使用相同的設計語言
3. **靈活配置** - 根據需要自定義功能和外觀
4. **易於維護** - 模板更新會自動應用到所有課程
5. **類型安全** - 完整的TypeScript支持確保代碼質量

現在您可以輕鬆添加任何新課程，只需按照上述步驟操作即可！ 