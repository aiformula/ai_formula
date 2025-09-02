# 📚 AI Formula 架構指南

## 🎯 項目架構概述

本指南將協助您理解和使用 AI Formula 的新架構，包括樣板系統、SEO 優化和內容管理。

## 📁 目錄結構

```
src/
├── templates/           # 頁面樣板
│   ├── CourseTemplate.tsx
│   ├── BlogTemplate.tsx
│   └── LessonTemplate.tsx
├── utils/              # 工具函數
│   ├── seo.ts
│   └── sitemap-generator.ts
├── pages/
│   ├── courses/        # 課程頁面
│   ├── blog/           # 網誌頁面
│   └── general/        # 通用頁面
├── components/
│   ├── course/         # 課程組件
│   ├── blog/           # 網誌組件
│   └── common/         # 通用組件
└── data/
    ├── courses/        # 課程數據
    └── blog/           # 網誌數據
```

## 🏗️ 使用樣板系統

### 📚 課程頁面樣板

```typescript
import { CourseTemplate } from '@/templates/CourseTemplate';

const MyCoursePage = () => {
  const courseData = {
    title: "AI 提示工程入門",
    description: "學習如何寫出有效的AI提示",
    level: "初級",
    duration: "2小時",
    price: "免費",
    // ... 其他課程數據
  };

  return (
    <CourseTemplate course={courseData}>
      {/* 您的課程內容 */}
      <div className="lesson-content">
        <h2>課程介紹</h2>
        <p>這是課程的具體內容...</p>
      </div>
    </CourseTemplate>
  );
};
```

### 📰 網誌文章樣板

```typescript
import { BlogTemplate } from '@/templates/BlogTemplate';

const MyBlogPost = () => {
  const postData = {
    title: "AI 自動化的未來趨勢",
    excerpt: "探討AI自動化在各行業的應用前景",
    author: "AI Formula 團隊",
    publishedAt: "2024-01-15",
    tags: ["AI", "自動化", "趨勢"],
    // ... 其他文章數據
  };

  return (
    <BlogTemplate post={postData}>
      {/* 您的文章內容 */}
      <div className="article-content">
        <h2>引言</h2>
        <p>AI自動化正在改變世界...</p>
      </div>
    </BlogTemplate>
  );
};
```

## 🔍 SEO 優化工具

### 使用 SEO 工具函數

```typescript
import { generatePageTitle, generateStructuredData } from '@/utils/seo';

// 生成頁面標題
const pageTitle = generatePageTitle("AI 課程");
// 結果: "AI 課程 | AI Formula"

// 生成結構化數據
const structuredData = generateStructuredData('course', {
  title: "AI 提示工程",
  description: "學習AI提示技巧",
  level: "初級"
});
```

### 生成網站地圖

```typescript
import { SitemapGenerator } from '@/utils/sitemap-generator';

const generator = new SitemapGenerator();
generator.addStaticPages();
generator.addCoursePaths([
  { slug: 'prompt-engineering', updatedAt: new Date() }
]);
generator.addBlogPosts([
  { slug: 'ai-automation-trends', updatedAt: new Date() }
]);

const sitemap = generator.generateXML();
console.log(sitemap);
```

## 📝 內容創建流程

### 🎯 創建新課程

1. **準備課程數據**
```typescript
const courseData = {
  id: 'course-001',
  title: '課程標題',
  description: '課程描述',
  level: '初級|中級|高級',
  duration: '學習時長',
  price: '價格',
  keywords: ['關鍵詞1', '關鍵詞2'],
  slug: 'course-url-slug'
};
```

2. **使用課程樣板**
```typescript
import { CourseTemplate } from '@/templates/CourseTemplate';

export const NewCourse = () => (
  <CourseTemplate course={courseData}>
    {/* 課程內容 */}
  </CourseTemplate>
);
```

3. **添加路由**
```typescript
// 在 App.tsx 或路由配置中
<Route path="/courses/new-course" element={<NewCourse />} />
```

### 📰 創建新文章

1. **準備文章數據**
```typescript
const postData = {
  id: 'post-001',
  title: '文章標題',
  excerpt: '文章摘要',
  author: '作者',
  publishedAt: '2024-01-15',
  updatedAt: '2024-01-15',
  tags: ['標籤1', '標籤2'],
  featuredImage: '/images/post-image.jpg',
  slug: 'post-url-slug'
};
```

2. **使用文章樣板**
```typescript
import { BlogTemplate } from '@/templates/BlogTemplate';

export const NewPost = () => (
  <BlogTemplate post={postData}>
    {/* 文章內容 */}
  </BlogTemplate>
);
```

## 🎨 樣式指南

### CSS 模組化

```css
/* src/styles/components/course.css */
.course-template {
  /* 課程頁面樣式 */
}

.course-header {
  /* 課程標題區域 */
}

.course-content {
  /* 課程內容區域 */
}
```

### 響應式設計

```css
/* 移動端優先 */
.course-title {
  font-size: 1.5rem;
}

/* 平板 */
@media (min-width: 768px) {
  .course-title {
    font-size: 2rem;
  }
}

/* 桌面 */
@media (min-width: 1024px) {
  .course-title {
    font-size: 2.5rem;
  }
}
```

## 🚀 性能優化

### 代碼分割

```typescript
// 延遲載入組件
const CourseDetail = lazy(() => import('@/pages/courses/CourseDetail'));
```

### 圖片優化

```typescript
// 使用 WebP 格式
const optimizedImage = {
  src: '/images/course.webp',
  fallback: '/images/course.jpg',
  alt: '課程圖片'
};
```

## 🔧 開發工具

### 類型定義

```typescript
// src/types/courseTypes.ts
export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  price: string;
  keywords?: string[];
  slug: string;
}
```

### 工具函數

```typescript
// src/utils/content.ts
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};
```

## 📊 SEO 最佳實踐

### Meta 標籤檢查清單

- [ ] 頁面標題 (50-60 字符)
- [ ] 描述標籤 (150-160 字符)
- [ ] 關鍵詞標籤
- [ ] Open Graph 標籤
- [ ] 結構化數據
- [ ] 規範化 URL

### 網站地圖維護

```typescript
// 定期更新網站地圖
const updateSitemap = async () => {
  const generator = new SitemapGenerator();
  generator.addStaticPages();
  
  // 從 CMS 或資料庫獲取最新內容
  const courses = await getCourses();
  const posts = await getBlogPosts();
  
  generator.addCoursePaths(courses);
  generator.addBlogPosts(posts);
  
  // 儲存到 public/sitemap.xml
  const sitemap = generator.generateXML();
  await saveSitemap(sitemap);
};
```

## 🔍 故障排除

### 常見問題

1. **樣板無法載入**
   - 檢查 import 路徑是否正確
   - 確認樣板文件已正確匯出

2. **SEO 標籤未顯示**
   - 確認 react-helmet-async 已正確安裝
   - 檢查 HelmetProvider 是否包裝應用

3. **路由不工作**
   - 檢查 React Router 配置
   - 確認路由路徑與檔案結構匹配

### 調試技巧

```typescript
// 開發環境下顯示 SEO 數據
if (process.env.NODE_ENV === 'development') {
  console.log('SEO Data:', {
    title: pageTitle,
    description: pageDescription,
    structuredData: structuredData
  });
}
```

## 📈 未來擴展

### 計劃功能

- [ ] 自動生成網站地圖
- [ ] SEO 效能監控
- [ ] 內容管理系統整合
- [ ] 多語言支援增強
- [ ] 離線功能支援

### 架構升級

- [ ] 微前端架構
- [ ] 伺服器端渲染 (SSR)
- [ ] 靜態生成 (SSG)
- [ ] CDN 整合

---

**💡 提示：** 請根據您的具體需求調整這些指南，並隨時更新以反映最新的最佳實踐。 