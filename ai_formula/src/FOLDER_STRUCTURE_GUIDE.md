# 📁 AI Formula 項目結構指南

## 🏗️ 優化後的資料夾架構

```
ai_formula/src/
├── assets/                    # 🎨 靜態資源管理
│   ├── images/
│   │   ├── courses/          # 課程相關圖片
│   │   ├── blog/             # 博客相關圖片
│   │   └── general/          # 通用圖片
│   ├── videos/               # 視頻資源
│   ├── documents/            # 文檔資源
│   └── icons/                # 圖標資源
├── components/                # 🧩 可重複使用組件
│   ├── ui/                   # 基礎 UI 組件
│   ├── course/               # 課程專用組件
│   ├── blog/                 # 博客專用組件
│   ├── templates/            # 📋 頁面樣板
│   │   ├── CourseTemplate.tsx
│   │   ├── BlogTemplate.tsx
│   │   └── LessonTemplate.tsx
│   └── [其他組件]
├── contexts/                  # 🔄 React 上下文
├── data/                     # 📊 數據管理
│   ├── courses/              # 課程數據
│   ├── blog/                 # 博客數據
│   └── content/              # 內容數據
├── hooks/                    # 🪝 自定義 Hook
├── lib/                      # 📚 工具庫
├── pages/                    # 📄 頁面組件
│   ├── general/              # 通用頁面
│   ├── courses/              # 課程頁面
│   ├── blog/                 # 博客頁面
│   └── learning/             # 學習相關頁面
├── styles/                   # 🎨 樣式文件
│   ├── components/           # 組件樣式
│   ├── pages/                # 頁面樣式
│   ├── utilities/            # 工具樣式
│   └── themes/               # 主題樣式
├── types/                    # 📝 TypeScript 類型
├── utils/                    # 🔧 工具函數
└── templates/                # 📋 頁面模板
```

## 🎯 資料夾用途詳解

### 📁 `assets/` - 靜態資源管理
**用途**: 集中管理所有靜態資源，提高組織性和可維護性

**子資料夾**:
- `images/courses/`: 課程封面、截圖、圖表
- `images/blog/`: 博客文章配圖、封面圖片
- `images/general/`: 網站通用圖片、Logo、背景
- `videos/`: 教學視頻、演示視頻
- `documents/`: PDF、文檔、資料下載
- `icons/`: SVG 圖標、自定義圖標

**SEO 優勢**:
- 清晰的資源分類有助於搜索引擎理解內容結構
- 統一的命名規則提高資源可發現性
- 便於實施圖片優化和懶加載

### 📁 `components/templates/` - 可重複使用模板
**用途**: 建立一致的頁面布局和組件結構

**核心模板**:
- `CourseTemplate.tsx`: 統一的課程頁面布局
- `BlogTemplate.tsx`: 統一的博客文章布局
- `LessonTemplate.tsx`: 統一的課程教學頁面布局

**使用方式**:
```tsx
import CourseTemplate from '@/components/templates/CourseTemplate';

const MyCourse = () => {
  return (
    <CourseTemplate
      title="我的課程"
      description="課程描述"
      modules={courseModules}
      onEnroll={handleEnroll}
    />
  );
};
```

### 📁 `pages/learning/` - 學習相關頁面
**用途**: 專門處理學習流程、進度追蹤、筆記等功能

**包含頁面**:
- `Dashboard.tsx`: 學習儀表板
- `Progress.tsx`: 學習進度頁面
- `Notes.tsx`: 學習筆記頁面

### 📁 `styles/` - 模組化樣式系統
**用途**: 建立可擴展和可維護的樣式架構

**子資料夾**:
- `components/`: 組件專用樣式
- `pages/`: 頁面專用樣式
- `utilities/`: 工具類樣式
- `themes/`: 主題配置

## 🚀 使用指南

### 1. 新增課程頁面
```bash
# 在 pages/courses/ 中創建新文件
touch src/pages/courses/NewCourseLesson.tsx
```

```tsx
import CourseTemplate from '@/components/templates/CourseTemplate';

const NewCourseLesson = () => {
  return (
    <CourseTemplate
      title="新課程"
      level="beginner"
      modules={modules}
      // ... 其他屬性
    />
  );
};
```

### 2. 新增博客文章
```bash
# 在 pages/blog/ 中創建新文件
touch src/pages/blog/NewBlogPost.tsx
```

```tsx
import BlogTemplate from '@/components/templates/BlogTemplate';

const NewBlogPost = () => {
  return (
    <BlogTemplate
      title="新博客文章"
      content={<div>文章內容</div>}
      category="AI技術"
      tags={['AI', '機器學習']}
      // ... 其他屬性
    />
  );
};
```

### 3. 組織靜態資源
```bash
# 課程相關圖片
assets/images/courses/
├── course-1-cover.jpg
├── course-1-screenshot-1.png
└── course-1-diagram.svg

# 博客相關圖片
assets/images/blog/
├── blog-post-1-cover.jpg
├── blog-post-1-infographic.png
└── blog-post-1-chart.svg
```

## 🔧 開發建議

### 1. 文件命名規則
- **頁面**: 使用 PascalCase (如 `CourseDetail.tsx`)
- **組件**: 使用 PascalCase (如 `CourseCard.tsx`)
- **工具函數**: 使用 camelCase (如 `formatDate.ts`)
- **樣式文件**: 使用 kebab-case (如 `course-detail.css`)

### 2. 導入路徑規則
```tsx
// 使用絕對路徑導入
import CourseTemplate from '@/components/templates/CourseTemplate';
import { courseData } from '@/data/courses/courseData';
import courseImage from '@/assets/images/courses/course-cover.jpg';
```

### 3. 樣板使用原則
- 🎯 **一致性**: 所有同類型頁面使用相同的模板
- 🔧 **可配置**: 通過 props 控制模板的顯示選項
- 🚀 **可擴展**: 模板支持自定義內容和行為

## 📊 SEO 優化優勢

### 1. URL 結構優化
```
yoursite.com/courses/prompt-engineering
yoursite.com/blog/ai-learning-tips
yoursite.com/learning/dashboard
```

### 2. 內容分類清晰
- 課程內容集中在 `/courses/` 路徑
- 博客內容集中在 `/blog/` 路徑
- 學習工具集中在 `/learning/` 路徑

### 3. 資源優化
- 圖片按類型組織，便於實施不同的優化策略
- 視頻資源獨立管理，便於實施懶加載
- 文檔資源統一管理，便於建立下載追蹤

## 🎉 下一步建議

1. **建立內容創建工作流**:
   ```bash
   # 使用模板快速創建新內容
   npm run create:course "課程名稱"
   npm run create:blog "文章標題"
   ```

2. **實施自動化工具**:
   - 圖片自動優化和壓縮
   - CSS 自動生成和優化
   - 模板使用驗證

3. **建立內容管理系統**:
   - 課程內容版本控制
   - 博客文章審查流程
   - 資源使用追蹤

---

**🚀 這個新的資料夾結構將為您的項目帶來更好的組織性、可維護性和擴展性！** 