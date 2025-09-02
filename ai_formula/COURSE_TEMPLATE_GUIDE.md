# 課程模板系統使用指南

## 概述

新的課程模板系統允許您通過配置文件動態創建和管理多個課程，而無需重複編寫代碼。系統包含以下核心組件：

- **CourseRouter**: 動態路由管理
- **CourseOutlineTemplate**: 課程大綱頁面模板
- **CourseLearningTemplate**: 課程學習頁面模板
- **CourseThemeTemplate**: 課程主題頁面模板（待完成）
- **CourseUnitTemplate**: 課程單元頁面模板（待完成）
- **CourseQuizTemplate**: 課程測驗頁面模板（待完成）

## 文件結構

```
src/
├── components/course-template/
│   ├── types.ts                    # 類型定義
│   ├── courseRegistry.ts           # 課程註冊中心
│   ├── CourseRouter.tsx            # 動態路由組件
│   ├── CourseOutlineTemplate.tsx   # 大綱頁面模板
│   ├── CourseLearningTemplate.tsx  # 學習頁面模板
│   ├── CourseThemeTemplate.tsx     # 主題頁面模板
│   ├── CourseUnitTemplate.tsx      # 單元頁面模板
│   ├── CourseQuizTemplate.tsx      # 測驗頁面模板
│   └── index.ts                    # 導出文件
├── pages/courses/
│   ├── CourseOutlinePage.tsx       # 通用大綱頁面
│   ├── CourseLearningPage.tsx      # 通用學習頁面
│   └── TemplateDemo.tsx            # 系統示範頁面
└── data/
    ├── chatgpt-complete-course-data.ts
    └── perplexity-complete-course-data.ts
```

## 如何添加新課程

### 步驟 1: 創建課程數據文件

在 `src/data/` 中創建新的課程數據文件，例如 `midjourney-course-data.ts`：

```typescript
export const midjourneyCourseData = {
  courseInfo: {
    badge: '免費完整課程',
    badgeEn: 'Free Complete Course',
    title: 'Midjourney AI 創作大師課程',
    titleEn: 'Midjourney AI Creative Master Course',
    subtitle: '從基礎到進階，掌握 AI 繪圖的核心技能',
    subtitleEn: 'From basics to advanced, master core AI art generation skills',
    instructor: 'AI Formula 團隊',
    instructorEn: 'AI Formula Team',
    instructorTitle: 'AI 創作專家',
    instructorTitleEn: 'AI Creative Specialists',
    rating: 4.9,
    students: 150,
    duration: '6+ 小時',
    durationEn: '6+ Hours',
    lastUpdated: '2024-12-12'
  },
  courseStats: {
    totalHours: 6,
    totalLessons: 20,
    totalQuizzes: 5,
    completionRate: 89
  },
  courseFeatures: [
    // 課程特色列表
  ],
  targetAudience: [
    // 目標受眾列表
  ],
  courseModules: [
    // 課程模組數據
  ],
  faqData: [
    // FAQ 數據
  ],
  isFree: true
};
```

### 步驟 2: 創建進度追蹤 Hook

在 `src/hooks/` 中創建進度追蹤 Hook，例如 `useMidjourneyProgress.ts`：

```typescript
import { useState, useEffect, useCallback } from 'react';

export const useMidjourneyProgress = () => {
  // 實現進度追蹤邏輯
  const [progressState, setProgressState] = useState({
    completedUnits: {},
    completedQuizzes: {},
    totalTimeSpent: 0
  });

  // 返回進度管理函數
  return {
    isThemeCompleted: (themeId: number) => boolean,
    getThemeProgress: (themeId: number) => number,
    getProgressStats: () => object,
    resetProgress: () => void,
    completeQuiz: (themeId: number, score: number) => void,
    completeUnit: (themeId: number, unitId: number) => void,
    themeProgress: progressState,
    courseStats: {}
  };
};
```

### 步驟 3: 在課程註冊中心添加配置

在 `src/components/course-template/courseRegistry.ts` 中添加新課程：

```typescript
import { midjourneyCourseData } from '@/data/midjourney-course-data';
import { useMidjourneyProgress } from '@/hooks/useMidjourneyProgress';

export const courseConfigs: Record<string, CourseConfig> = {
  'chatgpt': {
    // 現有配置...
  },
  'perplexity': {
    // 現有配置...
  },
  'midjourney': {
    courseId: 'midjourney',
    courseName: 'Midjourney AI Creative Master Course',
    themeColor: '#ff6b6b',
    accentColor: '#4ecdc4',
    baseRoute: '/courses/midjourney-course',
    dataSource: midjourneyCourseData,
    progressHook: useMidjourneyProgress,
    cssPrefix: 'midjourney'
  }
};

// 更新路由識別函數
export const getCourseIdFromRoute = (route: string): string | null => {
  if (route.includes('chatgpt-complete-course')) return 'chatgpt';
  if (route.includes('perplexity-complete-course')) return 'perplexity';
  if (route.includes('midjourney-course')) return 'midjourney';
  return null;
};
```

### 步驟 4: 添加路由

在 `src/App.tsx` 中添加新課程的路由：

```typescript
// 導入通用頁面組件
import CourseOutlinePage from '@/pages/courses/CourseOutlinePage';
import CourseLearningPage from '@/pages/courses/CourseLearningPage';
// ... 其他頁面組件

// 在 Routes 中添加
<Routes>
  {/* 現有路由... */}
  
  {/* Midjourney 課程路由 */}
  <Route path="/courses/midjourney-course" element={<Navigate to="/courses/midjourney-course/outline" replace />} />
  <Route path="/courses/midjourney-course/outline" element={<CourseOutlinePage />} />
  <Route path="/courses/midjourney-course/learning" element={<CourseLearningPage />} />
  <Route path="/courses/midjourney-course/theme/:themeId" element={<CourseThemePage />} />
  <Route path="/courses/midjourney-course/theme/:themeId/unit/:unitId" element={<CourseUnitPage />} />
  <Route path="/courses/midjourney-course/theme/:themeId/quiz" element={<CourseQuizPage />} />
  <Route path="/courses/midjourney-course/*" element={<Navigate to="/courses/midjourney-course/outline" replace />} />
</Routes>
```

### 步驟 5: 更新課程列表

在 `src/data/courses/courseData.ts` 中添加課程信息：

```typescript
export const digitalProducts = [
  // 現有課程...
  {
    id: 3,
    title: "Midjourney AI Creative Master Course",
    titleCht: "Midjourney AI 創作大師課程",
    description: "Master AI art generation from basics to advanced techniques",
    descriptionCht: "從基礎到進階，掌握 AI 繪圖的核心技能",
    duration: "6+ hours comprehensive training",
    durationCht: "6+ 小時",
    downloads: 150,
    rating: 4.9,
    level: "All Levels",
    levelCht: "適合所有級別",
    price: "免費",
    originalPrice: "",
    image: "🎨",
    type: "AI Art",
    typeCht: "AI 繪圖",
    category: "midjourney-course",
    themeColor: "#ff6b6b",
    newProduct: true,
    featured: true,
    bestseller: true,
    hotSelling: true,
    includes: [
      "5 Major Chapters, 20+ Units",
      "Creative Prompt Engineering",
      "Advanced Style Guide",
      "+3 More Items"
    ],
    includesCht: [
      "5 大章節，20+ 單元",
      "創意提示工程",
      "進階風格指南",
      "+3 更多項目"
    ]
  }
];
```

## 系統優勢

### 1. 代碼重用
- 一套模板支持所有課程類型
- 消除重複的組件代碼
- 統一的 UI/UX 體驗

### 2. 配置驅動
- 通過配置文件管理課程
- 動態主題色彩和樣式
- 靈活的數據結構

### 3. 易於維護
- 集中式的課程管理
- 統一的更新和修復
- 清晰的文件結構

### 4. 快速擴展
- 添加新課程只需幾個步驟
- 無需重新設計 UI
- 自動繼承所有功能

## 現有課程遷移

要將現有的 ChatGPT 和 Perplexity 課程完全遷移到新系統：

1. **保留現有路由**以確保向後兼容
2. **逐步替換組件**使用模板系統
3. **測試所有功能**確保無縫過渡
4. **清理舊代碼**移除重複的組件

## 待完成功能

1. **CourseThemeTemplate**: 主題頁面模板
2. **CourseUnitTemplate**: 單元頁面模板  
3. **CourseQuizTemplate**: 測驗頁面模板
4. **CSS 主題系統**: 動態樣式支持
5. **進度同步**: 跨課程進度管理

## 使用示例

查看 `/template-demo` 頁面以了解系統的實際運作方式和配置效果。 