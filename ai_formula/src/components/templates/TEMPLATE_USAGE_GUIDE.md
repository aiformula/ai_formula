# 📋 模板使用指南 (Template Usage Guide)

## 🎯 概述

這份指南將詳細說明如何使用 `CourseTemplate` 和 `BlogTemplate` 來快速建立一致且專業的頁面。這些模板已經整合了最佳的 UX/UI 實踐和 SEO 優化。

## 📚 課程模板 (CourseTemplate)

### 🔧 基本用法

```tsx
import { CourseTemplate } from '@/components/templates';

const MyCourse = () => {
  const courseModules = [
    {
      id: 'module-1',
      title: 'Introduction to AI',
      titleZh: 'AI 基礎介紹',
      description: 'Learn the basics of artificial intelligence',
      descriptionZh: '學習人工智慧的基礎知識',
      duration: '2 hours',
      durationZh: '2 小時',
      isCompleted: false,
      isLocked: false,
      lessons: [
        {
          id: 'lesson-1',
          title: 'What is AI?',
          titleZh: '什麼是 AI？',
          duration: '30 min',
          durationZh: '30 分鐘',
          type: 'video',
          isCompleted: false,
          isLocked: false,
        }
      ]
    }
  ];

  return (
    <CourseTemplate
      title="AI Fundamentals"
      titleZh="AI 基礎課程"
      description="Complete introduction to artificial intelligence"
      descriptionZh="人工智慧完整入門課程"
      level="beginner"
      duration="8 hours"
      durationZh="8 小時"
      rating={4.8}
      studentCount={1250}
      modules={courseModules}
      isEnrolled={false}
      progress={0}
      onEnroll={() => console.log('User enrolled!')}
      onModuleClick={(moduleId) => console.log('Module clicked:', moduleId)}
    />
  );
};
```

### 📝 屬性詳解

#### **必需屬性 (Required Props)**

| 屬性名 | 類型 | 說明 | 範例 |
|--------|------|------|------|
| `title` | `string` | 課程英文標題 | `"AI Fundamentals"` |
| `description` | `string` | 課程英文描述 | `"Learn AI basics"` |
| `level` | `'beginner' \| 'intermediate' \| 'advanced'` | 課程難度級別 | `"beginner"` |
| `duration` | `string` | 課程時長（英文） | `"8 hours"` |
| `modules` | `CourseModule[]` | 課程模組數組 | 見下方範例 |

#### **可選屬性 (Optional Props)**

| 屬性名 | 類型 | 預設值 | 說明 |
|--------|------|--------|------|
| `titleZh` | `string` | `undefined` | 課程中文標題 |
| `descriptionZh` | `string` | `undefined` | 課程中文描述 |
| `durationZh` | `string` | `undefined` | 課程時長（中文） |
| `rating` | `number` | `undefined` | 課程評分 (1-5) |
| `studentCount` | `number` | `undefined` | 學生人數 |
| `isEnrolled` | `boolean` | `false` | 是否已註冊 |
| `progress` | `number` | `0` | 學習進度 (0-100) |
| `showProgress` | `boolean` | `true` | 是否顯示進度條 |
| `showRating` | `boolean` | `true` | 是否顯示評分 |
| `showStudentCount` | `boolean` | `true` | 是否顯示學生數量 |
| `onEnroll` | `() => void` | `undefined` | 註冊按鈕點擊回調 |
| `onModuleClick` | `(moduleId: string) => void` | `undefined` | 模組點擊回調 |

#### **CourseModule 數據結構**

```tsx
interface CourseModule {
  id: string;                    // 唯一識別碼
  title: string;                 // 英文標題
  titleZh?: string;             // 中文標題
  description: string;           // 英文描述
  descriptionZh?: string;       // 中文描述
  duration: string;             // 英文時長
  durationZh?: string;          // 中文時長
  isCompleted?: boolean;        // 是否完成
  isLocked?: boolean;           // 是否鎖定
  lessons: CourseLesson[];      // 課程陣列
}
```

#### **CourseLesson 數據結構**

```tsx
interface CourseLesson {
  id: string;                           // 唯一識別碼
  title: string;                        // 英文標題
  titleZh?: string;                    // 中文標題
  duration: string;                     // 英文時長
  durationZh?: string;                 // 中文時長
  type: 'video' | 'reading' | 'quiz' | 'exercise';  // 課程類型
  isCompleted?: boolean;               // 是否完成
  isLocked?: boolean;                  // 是否鎖定
}
```

### 🎨 使用場景範例

#### **場景 1: 免費課程**

```tsx
<CourseTemplate
  title="Free AI Introduction"
  titleZh="免費 AI 入門"
  description="Basic concepts of AI, completely free"
  descriptionZh="AI 基本概念，完全免費"
  level="beginner"
  duration="3 hours"
  durationZh="3 小時"
  modules={freeModules}
  isEnrolled={false}
  showRating={false}
  showStudentCount={true}
  onEnroll={handleFreeEnroll}
/>
```

#### **場景 2: 付費進階課程**

```tsx
<CourseTemplate
  title="Advanced AI Techniques"
  titleZh="進階 AI 技術"
  description="Professional AI development techniques"
  descriptionZh="專業 AI 開發技術"
  level="advanced"
  duration="20 hours"
  durationZh="20 小時"
  rating={4.9}
  studentCount={850}
  modules={advancedModules}
  isEnrolled={true}
  progress={75}
  showProgress={true}
  onModuleClick={navigateToModule}
/>
```

#### **場景 3: 學習中課程**

```tsx
<CourseTemplate
  title="Machine Learning Basics"
  titleZh="機器學習基礎"
  description="Step by step ML learning"
  descriptionZh="循序漸進的機器學習"
  level="intermediate"
  duration="12 hours"
  durationZh="12 小時"
  rating={4.7}
  studentCount={2100}
  modules={progressModules}
  isEnrolled={true}
  progress={45}
  showProgress={true}
  showRating={true}
  onModuleClick={continueLesson}
/>
```

---

## 📰 博客模板 (BlogTemplate)

### 🔧 基本用法

```tsx
import { BlogTemplate } from '@/components/templates';

const MyBlogPost = () => {
  const articleContent = (
    <div>
      <h2>什麼是人工智慧？</h2>
      <p>人工智慧是一項革命性的技術...</p>
      <h3>AI 的應用領域</h3>
      <ul>
        <li>自動駕駛</li>
        <li>醫療診斷</li>
        <li>金融分析</li>
      </ul>
    </div>
  );

  return (
    <BlogTemplate
      title="Understanding Artificial Intelligence"
      titleZh="理解人工智慧"
      excerpt="A comprehensive guide to AI fundamentals"
      excerptZh="AI 基礎知識完整指南"
      content={articleContent}
      author="AI Formula Team"
      authorZh="AI Formula 團隊"
      publishDate="December 7, 2024"
      publishDateZh="2024年12月7日"
      readTime="8 min read"
      readTimeZh="8 分鐘閱讀"
      category="AI Technology"
      categoryZh="AI技術"
      tags={["Artificial Intelligence", "Machine Learning", "Technology"]}
      tagsZh={["人工智慧", "機器學習", "科技"]}
      viewCount={1540}
      likeCount={89}
      onBack={() => window.history.back()}
      onShare={() => navigator.share({title: "AI Article"})}
      onBookmark={() => console.log("Bookmarked!")}
      onLike={() => console.log("Liked!")}
    />
  );
};
```

### 📝 屬性詳解

#### **必需屬性 (Required Props)**

| 屬性名 | 類型 | 說明 | 範例 |
|--------|------|------|------|
| `title` | `string` | 文章英文標題 | `"Understanding AI"` |
| `excerpt` | `string` | 文章英文摘要 | `"A guide to AI basics"` |
| `content` | `React.ReactNode` | 文章內容 JSX | `<div>Article content</div>` |
| `author` | `string` | 作者名稱（英文） | `"John Doe"` |
| `publishDate` | `string` | 發布日期（英文） | `"Dec 7, 2024"` |
| `readTime` | `string` | 閱讀時間（英文） | `"5 min read"` |
| `category` | `string` | 文章分類（英文） | `"Technology"` |
| `tags` | `string[]` | 標籤陣列（英文） | `["AI", "Tech"]` |

#### **可選屬性 (Optional Props)**

| 屬性名 | 類型 | 預設值 | 說明 |
|--------|------|--------|------|
| `titleZh` | `string` | `undefined` | 文章中文標題 |
| `excerptZh` | `string` | `undefined` | 文章中文摘要 |
| `authorZh` | `string` | `undefined` | 作者名稱（中文） |
| `publishDateZh` | `string` | `undefined` | 發布日期（中文） |
| `readTimeZh` | `string` | `undefined` | 閱讀時間（中文） |
| `categoryZh` | `string` | `undefined` | 文章分類（中文） |
| `tagsZh` | `string[]` | `undefined` | 標籤陣列（中文） |
| `viewCount` | `number` | `undefined` | 瀏覽次數 |
| `likeCount` | `number` | `undefined` | 點讚次數 |
| `showStats` | `boolean` | `true` | 是否顯示統計數據 |
| `showTags` | `boolean` | `true` | 是否顯示標籤 |
| `showShare` | `boolean` | `true` | 是否顯示分享按鈕 |
| `showBookmark` | `boolean` | `true` | 是否顯示收藏按鈕 |
| `showBackButton` | `boolean` | `true` | 是否顯示返回按鈕 |
| `onBack` | `() => void` | `undefined` | 返回按鈕點擊回調 |
| `onShare` | `() => void` | `undefined` | 分享按鈕點擊回調 |
| `onBookmark` | `() => void` | `undefined` | 收藏按鈕點擊回調 |
| `onLike` | `() => void` | `undefined` | 點讚按鈕點擊回調 |

### 🎨 使用場景範例

#### **場景 1: 技術教學文章**

```tsx
<BlogTemplate
  title="Complete Guide to React Hooks"
  titleZh="React Hooks 完整指南"
  excerpt="Master React Hooks with practical examples"
  excerptZh="通過實際範例掌握 React Hooks"
  content={<TechnicalArticleContent />}
  author="Sarah Chen"
  authorZh="陳莎拉"
  publishDate="December 5, 2024"
  publishDateZh="2024年12月5日"
  readTime="12 min read"
  readTimeZh="12 分鐘閱讀"
  category="Programming"
  categoryZh="程式設計"
  tags={["React", "JavaScript", "Frontend"]}
  tagsZh={["React", "JavaScript", "前端開發"]}
  viewCount={2890}
  likeCount={156}
  showStats={true}
  onShare={shareArticle}
  onBookmark={saveToBookmarks}
/>
```

#### **場景 2: 公司新聞公告**

```tsx
<BlogTemplate
  title="AI Formula Launches New Course Platform"
  titleZh="AI Formula 推出全新課程平台"
  excerpt="Exciting updates to our learning platform"
  excerptZh="我們學習平台的重大更新"
  content={<NewsContent />}
  author="AI Formula Team"
  authorZh="AI Formula 團隊"
  publishDate="December 1, 2024"
  publishDateZh="2024年12月1日"
  readTime="3 min read"
  readTimeZh="3 分鐘閱讀"
  category="Company News"
  categoryZh="公司新聞"
  tags={["Company", "Platform", "Update"]}
  tagsZh={["公司", "平台", "更新"]}
  viewCount={1240}
  showStats={true}
  showShare={true}
  showBookmark={false}
  onBack={() => router.push('/blog')}
/>
```

#### **場景 3: 簡單博客文章**

```tsx
<BlogTemplate
  title="5 Tips for Better AI Prompting"
  titleZh="改善 AI 提示的 5 個技巧"
  excerpt="Simple tips to improve your AI interactions"
  excerptZh="改善 AI 互動的簡單技巧"
  content={<SimpleTipsContent />}
  author="Mike Johnson"
  authorZh="麥克強森"
  publishDate="November 28, 2024"
  publishDateZh="2024年11月28日"
  readTime="4 min read"
  readTimeZh="4 分鐘閱讀"
  category="Tips & Tricks"
  categoryZh="技巧與訣竅"
  tags={["AI", "Productivity", "Tips"]}
  tagsZh={["AI", "生產力", "技巧"]}
  showStats={false}
  showShare={true}
  showBookmark={true}
  showBackButton={false}
/>
```

---

## 🎯 最佳實踐

### ✅ 建議做法

1. **一致性**: 在同類型頁面中使用相同的模板
2. **多語言支援**: 始終提供中文和英文版本的內容
3. **可訪問性**: 確保所有互動元素都有適當的回調函數
4. **SEO 優化**: 使用有意義的標題和描述
5. **用戶體驗**: 根據內容類型選擇適當的顯示選項

### ❌ 避免的做法

1. **不要**混合使用不同的模板在同一類型頁面
2. **不要**忘記處理 loading 和 error 狀態
3. **不要**在沒有對應中文內容時顯示中文界面
4. **不要**忽略模板的可選屬性配置

### 🔧 性能優化建議

1. **懶加載**: 對於大型內容，使用 React.lazy()
```tsx
const HeavyContent = React.lazy(() => import('./HeavyContent'));

<BlogTemplate
  content={
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyContent />
    </Suspense>
  }
  // ... 其他屬性
/>
```

2. **記憶化**: 對於複雜的計算，使用 useMemo
```tsx
const memoizedModules = useMemo(() => 
  processModules(rawModuleData), 
  [rawModuleData]
);

<CourseTemplate modules={memoizedModules} />
```

3. **圖片優化**: 在 assets 資料夾中使用優化過的圖片

---

## 🐛 常見問題

### Q: 如何處理動態內容？

**A**: 使用 state 和 props 來管理動態數據：

```tsx
const [modules, setModules] = useState([]);
const [isEnrolled, setIsEnrolled] = useState(false);

useEffect(() => {
  fetchCourseData().then(setModules);
}, []);

<CourseTemplate
  modules={modules}
  isEnrolled={isEnrolled}
  onEnroll={() => setIsEnrolled(true)}
/>
```

### Q: 如何自定義樣式？

**A**: 使用 CSS 類名覆蓋，或創建自定義的樣式變數：

```css
/* 在您的 CSS 文件中 */
.course-template-custom {
  --primary-color: #your-brand-color;
}
```

### Q: 如何集成分析追蹤？

**A**: 在回調函數中添加追蹤代碼：

```tsx
<BlogTemplate
  onShare={() => {
    // Google Analytics 追蹤
    gtag('event', 'share', {
      event_category: 'blog',
      event_label: blogTitle
    });
    shareArticle();
  }}
/>
```

### Q: 如何處理錯誤狀態？

**A**: 使用 Error Boundary 或條件渲染：

```tsx
{error ? (
  <div>Error loading content</div>
) : (
  <CourseTemplate {...courseProps} />
)}
```

---

## 📊 模板功能對比

| 功能 | CourseTemplate | BlogTemplate |
|------|----------------|--------------|
| 多語言支援 | ✅ | ✅ |
| 響應式設計 | ✅ | ✅ |
| 進度追蹤 | ✅ | ❌ |
| 分享功能 | ❌ | ✅ |
| 評分系統 | ✅ | ✅ (點讚) |
| 標籤系統 | ❌ | ✅ |
| 模組化內容 | ✅ | ❌ |
| 收藏功能 | ❌ | ✅ |

---

**🎉 使用這些模板，您可以快速建立專業、一致且用戶友好的課程和博客頁面！** 