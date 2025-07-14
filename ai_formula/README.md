# AI Formula - 香港AI自動化解決方案平台

## 📋 項目概述 / Project Overview

**繁體中文：** AI Formula 是一個專為香港企業設計的AI自動化解決方案平台，提供專業的AI技術服務、教學課程和商業應用指南。本項目已完成重大重構，採用模組化架構，並實施了完整的Phase 4內容優化策略。

**English:** AI Formula is an AI automation solution platform designed specifically for Hong Kong businesses, providing professional AI technology services, educational courses, and business application guides. This project has undergone major refactoring with a modular architecture and implemented a complete Phase 4 content optimization strategy.

## 🎯 最新更新 / Latest Updates

### ✅ Phase 4 內容優化完成 / Phase 4 Content Optimization Complete

- **📊 內容審核工具**：實現了完整的內容審核和SEO評分系統
- **🌐 多語言優化**：完善了中英文內容對照和本地化
- **🔍 SEO增強**：動態元標籤、結構化數據和網站地圖生成
- **📈 性能優化**：圖片優化、懶加載和內容壓縮
- **📚 課程擴展**：增加了詳細的課程內容和學習路徑
- **📝 博客策略**：制定了完整的內容日程和主題規劃
- **🎨 用戶體驗**：改善了內容可讀性和導航體驗
- **📊 分析監控**：建立了內容表現追蹤和用戶行為分析

### 🔄 架構優化 / Architecture Optimization

- **📁 資料夾結構重構**：優化了項目結構，提高了可維護性
- **🔧 模板系統**：建立了統一的模板系統，提高開發效率
- **🌟 組件重構**：重新組織了組件架構，提高了可重用性
- **🔗 路由優化**：修正了所有路由問題，確保頁面正常訪問

## 🛠️ 技術棧 / Tech Stack

### 前端技術 / Frontend Technologies
- **React 18** + **TypeScript** - 現代化前端框架
- **Vite** - 快速構建工具
- **Tailwind CSS** - 原子化CSS框架
- **Shadcn/UI** - 高質量UI組件庫
- **Framer Motion** - 動畫庫
- **React Router DOM** - 路由管理
- **Lucide React** - 圖標庫
- **Atropos** - 3D效果庫

### 開發工具 / Development Tools
- **ESLint** - 代碼質量檢查
- **TypeScript** - 類型檢查
- **Git** - 版本控制
- **GitHub** - 代碼托管

## 🏗️ 項目架構 / Project Architecture

```
ai_formula/
├── 📁 src/
│   ├── 📁 components/              # 組件系統
│   │   ├── 📁 ui/                 # 基礎UI組件
│   │   │   ├── button.tsx         # 按鈕組件
│   │   │   ├── card.tsx           # 卡片組件
│   │   │   ├── dialog.tsx         # 對話框組件
│   │   │   └── ...                # 其他UI組件
│   │   ├── 📁 auth/               # 認證相關組件
│   │   │   ├── LoginForm.tsx      # 登入表單
│   │   │   ├── SignUpForm.tsx     # 註冊表單
│   │   │   └── ProtectedRoute.tsx # 路由保護
│   │   ├── 📁 course/             # 課程相關組件
│   │   │   ├── CourseHero.tsx     # 課程Hero區域
│   │   │   ├── LessonContent.tsx  # 課程內容組件
│   │   │   ├── ProgressTracker.tsx # 進度追蹤
│   │   │   ├── CategoryFilters.tsx # 分類過濾
│   │   │   └── ProductGrid.tsx    # 產品網格
│   │   ├── 📁 blog/               # 博客相關組件
│   │   │   ├── BlogHero.tsx       # 博客Hero區域
│   │   │   ├── ArticleCard.tsx    # 文章卡片
│   │   │   └── ArticleContent.tsx # 文章內容
│   │   ├── 📁 ContentAudit/       # 內容審核工具
│   │   │   └── ContentAuditTool.tsx # 內容分析工具
│   │   ├── Navigation.tsx         # 導航組件
│   │   ├── Footer.tsx             # 頁腳組件
│   │   └── ErrorBoundary.tsx      # 錯誤邊界
│   ├── 📁 contexts/               # React Context
│   │   ├── LanguageContext.tsx    # 語言管理
│   │   ├── AuthContext.tsx        # 認證管理
│   │   └── ViewCountContext.tsx   # 瀏覽計數管理
│   ├── 📁 data/                   # 數據文件
│   │   ├── 📁 blog/               # 博客數據
│   │   │   ├── blogPosts.ts       # 博客文章
│   │   │   └── articleContent.ts  # 文章內容
│   │   ├── 📁 courses/            # 課程數據
│   │   │   ├── courseData.ts      # 課程數據
│   │   │   ├── courseDetails.ts   # 課程詳情
│   │   │   ├── courses.ts         # 課程列表
│   │   │   ├── aiImageVideoCreation.ts # AI影像課程
│   │   │   ├── promptEngineering.ts    # 提示工程課程
│   │   │   └── courseManager.ts   # 課程管理器
│   │   └── __tests__/             # 測試文件
│   ├── 📁 pages/                  # 頁面組件
│   │   ├── 📁 general/            # 通用頁面
│   │   │   └── HomePage.tsx       # 首頁
│   │   ├── 📁 blog/               # 博客頁面
│   │   │   ├── BlogListing.tsx    # 博客列表
│   │   │   └── BlogPost.tsx       # 文章詳情
│   │   ├── 📁 courses/            # 課程頁面
│   │   │   ├── Course.tsx         # 課程主頁（原始設計）
│   │   │   ├── CourseDetail.tsx   # 課程詳情
│   │   │   ├── FreePlanLearning.tsx # 免費版學習
│   │   │   ├── ProPlanLearning.tsx # 專業版學習
│   │   │   ├── PromptEngineeringOutline.tsx # 提示工程大綱
│   │   │   ├── ChatGPTMasteryOutline.tsx # ChatGPT精通大綱
│   │   │   ├── PerplexityToolsOutline.tsx # Perplexity工具大綱
│   │   │   └── ...                # 其他課程頁面
│   │   ├── About.tsx              # 關於頁面
│   │   ├── Auth.tsx               # 認證頁面
│   │   └── NotFound.tsx           # 404頁面
│   ├── 📁 hooks/                  # 自定義Hook
│   │   ├── useCourseData.ts       # 課程數據Hook
│   │   ├── use-mobile.tsx         # 移動端檢測Hook
│   │   └── use-toast.ts           # 通知Hook
│   ├── 📁 lib/                    # 工具庫
│   │   ├── utils.ts               # 工具函數
│   │   └── supabase.ts            # Supabase配置
│   ├── 📁 styles/                 # 樣式文件
│   │   ├── 📁 components/         # 組件樣式
│   │   ├── 📁 pages/              # 頁面樣式
│   │   ├── gradients.ts           # 漸變樣式
│   │   └── index.ts               # 樣式導出
│   ├── 📁 templates/              # 模板系統
│   │   ├── BlogTemplate.tsx       # 博客模板
│   │   └── CourseTemplate.tsx     # 課程模板
│   ├── 📁 types/                  # 類型定義
│   │   └── courseTypes.ts         # 課程類型
│   ├── 📁 utils/                  # 工具文件
│   │   ├── seo.ts                 # SEO工具
│   │   └── sitemap-generator.ts   # 網站地圖生成
│   └── App.tsx                    # 主應用組件
├── 📁 public/                     # 靜態資源
│   ├── 📁 prompt-engineering-course/ # 提示工程課程資源
│   │   ├── index.md               # 課程索引
│   │   ├── module1-intro.md       # 模組1：介紹
│   │   ├── module2-elements.md    # 模組2：元素
│   │   ├── module3-bestpractices.md # 模組3：最佳實踐
│   │   └── ...                    # 其他課程文件
│   ├── favicon.ico                # 網站圖標
│   ├── robots.txt                 # 搜索引擎配置
│   └── placeholder.svg            # 佔位符圖像
├── 📁 設計文檔/                    # 設計文檔
│   ├── ARCHITECTURE_GUIDE.md      # 架構指南
│   ├── PHASE4_CONTENT_OPTIMIZATION_PLAN.md # Phase 4計劃
│   ├── CONTENT_OPTIMIZATION_GUIDE.md # 內容優化指南
│   ├── COURSE_PAGES_GUIDE.md      # 課程頁面指南
│   ├── LESSON_PAGE_DESIGN.md      # 課程頁面設計
│   ├── FOUR_LESSON_STYLES_DESIGN.md # 四種課程風格
│   ├── COURSE_OUTLINE_DESIGNS.md  # 課程大綱設計
│   └── AI_FORMULA_COLOR_GUIDELINES.md # 色彩指南
├── package.json                   # 項目配置
├── tailwind.config.ts             # Tailwind配置
├── tsconfig.json                  # TypeScript配置
├── vite.config.ts                 # Vite配置
└── README.md                      # 項目文檔
```

## 🌟 核心功能 / Core Features

### 1. 🎨 課程系統 / Course System

#### 原始課程頁面設計 / Original Course Page Design
- **🎯 學習路徑展示**：包含AI圖像影片創作、商業自動化、數據分析等三個主要學習路徑
- **🛍️ 數位產品網格**：展示8個不同類別的產品，支援分類過濾
- **🎨 3D視覺效果**：使用Atropos庫實現3D卡片效果
- **✨ 動畫效果**：Framer Motion提供流暢的頁面動畫
- **📱 響應式設計**：適配所有設備尺寸

#### 課程大綱系統 / Course Outline System
- **📚 學術專業風格**：提示工程課程 - 結構化、層次清晰
- **🛠️ 互動實作風格**：編程基礎課程 - 視覺化、互動性強
- **🎯 現代卡片風格**：ChatGPT精通課程 - 模組化、簡潔現代
- **📊 儀表板風格**：Perplexity工具課程 - 數據驅動、專業工具

#### 學習管理功能 / Learning Management Features
- **📈 進度追蹤**：實時顯示學習進度
- **📝 筆記系統**：支援課程筆記記錄
- **🎯 測驗系統**：課程理解測驗
- **🔖 書籤功能**：重要內容標記

### 2. 📝 博客系統 / Blog System

#### 文章展示 / Article Display
- **📋 文章列表**：精選文章和最新文章分區展示
- **📄 文章詳情**：完整的文章閱讀體驗
- **🏷️ 分類系統**：文章分類和標籤管理
- **🔍 搜索功能**：全文搜索支援

#### 多語言支援 / Multi-language Support
- **🌐 繁體中文**：完整的繁體中文界面
- **🌍 英文**：完整的英文界面
- **🔄 動態切換**：用戶可即時切換語言

### 3. 🎯 內容優化系統 / Content Optimization System

#### SEO優化 / SEO Optimization
- **📊 動態元標籤**：自動生成頁面元標籤
- **🗺️ 網站地圖**：自動生成sitemap.xml
- **📝 結構化數據**：Schema.org標記支援
- **🔍 搜索引擎優化**：完整的SEO最佳實踐

#### 內容審核工具 / Content Audit Tool
- **📊 SEO評分**：自動評估頁面SEO表現
- **⚡ 性能分析**：頁面載入速度和性能指標
- **🎯 建議系統**：提供改進建議和指導

### 4. 🔐 認證系統 / Authentication System

#### 用戶管理 / User Management
- **👤 用戶註冊**：完整的註冊流程
- **🔑 用戶登入**：安全的登入系統
- **🛡️ 路由保護**：保護需要認證的頁面
- **👥 用戶角色**：不同用戶角色管理

#### 學習進度 / Learning Progress
- **📈 進度追蹤**：個人學習進度管理
- **🎯 成就系統**：學習成就和獎勵
- **📊 學習統計**：詳細的學習數據統計

## 🚀 快速開始 / Quick Start

### 環境要求 / Requirements
- **Node.js** >= 16.0.0
- **npm** >= 7.0.0 或 **yarn** >= 1.22.0
- **Git** 版本控制

### 安裝步驟 / Installation Steps

1. **克隆項目 / Clone Repository**
```bash
git clone https://github.com/your-username/ai-formula.git
cd ai-formula
```

2. **安裝依賴 / Install Dependencies**
```bash
cd ai_formula
npm install
# 或使用 yarn
yarn install
```

3. **環境配置 / Environment Setup**
```bash
# 複製環境變量文件
cp .env.example .env.local

# 編輯環境變量
# 添加必要的API密鑰和配置
```

4. **啟動開發服務器 / Start Development Server**
```bash
npm run dev
# 或使用 yarn
yarn dev
```

5. **訪問應用 / Access Application**
打開瀏覽器訪問 `http://localhost:5173`

## 🔧 開發指南 / Development Guide

### 添加新課程 / Adding New Courses

1. **創建課程數據 / Create Course Data**
```typescript
// src/data/courses/yourCourse.ts
export const yourCourse = {
  id: 'your-course-id',
  title: {
    'zh-TW': '你的課程標題',
    'en': 'Your Course Title'
  },
  description: {
    'zh-TW': '課程描述',
    'en': 'Course Description'
  },
  modules: [
    {
      id: 'module-1',
      title: {
        'zh-TW': '模組1',
        'en': 'Module 1'
      },
      lessons: [
        {
          id: 'lesson-1',
          title: {
            'zh-TW': '課程1',
            'en': 'Lesson 1'
          },
          content: {
            'zh-TW': '課程內容...',
            'en': 'Lesson content...'
          }
        }
      ]
    }
  ]
};
```

2. **創建課程頁面 / Create Course Page**
```typescript
// src/pages/courses/YourCourse.tsx
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { yourCourse } from '@/data/courses/yourCourse';

const YourCourse = () => {
  const { language } = useLanguage();
  
  return (
    <div className="course-container">
      <h1>{yourCourse.title[language]}</h1>
      <p>{yourCourse.description[language]}</p>
      {/* 課程內容 */}
    </div>
  );
};

export default YourCourse;
```

3. **添加路由 / Add Routes**
```typescript
// src/App.tsx
import YourCourse from '@/pages/courses/YourCourse';

// 在 Routes 中添加
<Route path="/courses/your-course" element={<YourCourse />} />
```

### 添加新博客文章 / Adding New Blog Posts

1. **創建文章數據 / Create Article Data**
```typescript
// src/data/blog/blogPosts.ts
export const newBlogPost = {
  id: 'new-post-id',
  title: {
    'zh-TW': '文章標題',
    'en': 'Article Title'
  },
  excerpt: {
    'zh-TW': '文章摘要',
    'en': 'Article Excerpt'
  },
  content: {
    'zh-TW': '文章內容...',
    'en': 'Article content...'
  },
  author: 'Author Name',
  date: '2024-01-15',
  category: 'AI',
  tags: ['AI', 'Automation'],
  readTime: 5,
  image: '/images/article-image.jpg'
};
```

2. **更新博客列表 / Update Blog List**
```typescript
// src/data/blog/blogPosts.ts
export const blogPosts = [
  newBlogPost,
  // ... 其他文章
];
```

## 🎨 設計系統 / Design System

### 色彩方案 / Color Scheme

#### 主要色彩 / Primary Colors
- **主色調 / Primary**: `#3B82F6` (Blue)
- **次要色調 / Secondary**: `#8B5CF6` (Purple)
- **成功色 / Success**: `#10B981` (Green)
- **警告色 / Warning**: `#F59E0B` (Orange)
- **錯誤色 / Error**: `#EF4444` (Red)

#### 中性色彩 / Neutral Colors
- **背景色 / Background**: `#000000` (Black)
- **表面色 / Surface**: `#1F2937` (Dark Gray)
- **文本色 / Text**: `#FFFFFF` (White)
- **次要文本 / Secondary Text**: `#9CA3AF` (Light Gray)

### 字體系統 / Typography

#### 標題字體 / Heading Fonts
- **H1**: `text-4xl md:text-6xl font-bold`
- **H2**: `text-3xl md:text-4xl font-bold`
- **H3**: `text-2xl md:text-3xl font-semibold`
- **H4**: `text-xl md:text-2xl font-semibold`

#### 內容字體 / Content Fonts
- **正文 / Body**: `text-base leading-relaxed`
- **小文本 / Small Text**: `text-sm`
- **標籤 / Label**: `text-xs font-medium`

### 間距系統 / Spacing System

#### 內邊距 / Padding
- **小 / Small**: `p-4`
- **中 / Medium**: `p-6`
- **大 / Large**: `p-8`

#### 外邊距 / Margin
- **小 / Small**: `m-4`
- **中 / Medium**: `m-6`
- **大 / Large**: `m-8`

## 🔄 部署 / Deployment

### 構建生產版本 / Build for Production

```bash
# 構建項目
npm run build

# 預覽構建結果
npm run preview
```

### 部署到Vercel / Deploy to Vercel

1. **安裝Vercel CLI / Install Vercel CLI**
```bash
npm install -g vercel
```

2. **登入Vercel / Login to Vercel**
```bash
vercel login
```

3. **部署項目 / Deploy Project**
```bash
vercel --prod
```

### 部署到Netlify / Deploy to Netlify

1. **構建項目 / Build Project**
```bash
npm run build
```

2. **使用Netlify CLI / Use Netlify CLI**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## 📊 性能優化 / Performance Optimization

### 代碼分割 / Code Splitting
- **路由級分割**：每個頁面組件獨立加載
- **組件級分割**：大型組件使用 `React.lazy()` 懶加載
- **第三方庫分割**：將第三方庫單獨打包

### 圖片優化 / Image Optimization
- **格式選擇**：使用WebP格式提高壓縮率
- **懶加載**：圖片懶加載減少初始加載時間
- **響應式圖片**：不同設備使用不同尺寸圖片

### 資源優化 / Resource Optimization
- **CSS優化**：移除未使用的CSS
- **JavaScript優化**：代碼壓縮和混淆
- **緩存策略**：設置合適的緩存頭

## 📈 分析和監控 / Analytics and Monitoring

### 用戶行為分析 / User Behavior Analytics
- **頁面瀏覽量**：追蹤頁面訪問次數
- **用戶停留時間**：分析用戶參與度
- **轉化率**：監控關鍵行為轉化

### 性能監控 / Performance Monitoring
- **載入時間**：監控頁面載入速度
- **錯誤追蹤**：自動捕獲和報告錯誤
- **用戶體驗指標**：Core Web Vitals監控

## 🧪 測試 / Testing

### 單元測試 / Unit Testing
```bash
# 運行測試
npm run test

# 運行測試覆蓋率
npm run test:coverage
```

### 端到端測試 / End-to-End Testing
```bash
# 運行E2E測試
npm run test:e2e
```

### 類型檢查 / Type Checking
```bash
# TypeScript類型檢查
npm run type-check
```

## 🛡️ 安全性 / Security

### 認證和授權 / Authentication and Authorization
- **JWT Token**：使用JWT進行用戶認證
- **角色權限**：基於角色的訪問控制
- **API安全**：API端點安全保護

### 數據保護 / Data Protection
- **輸入驗證**：所有用戶輸入都進行驗證
- **XSS防護**：防止跨站點腳本攻擊
- **CSRF保護**：防止跨站請求偽造

## 🤝 貢獻指南 / Contributing Guide

### 代碼規範 / Code Standards
- **ESLint**：遵循ESLint規則
- **Prettier**：使用Prettier格式化代碼
- **TypeScript**：使用TypeScript進行類型檢查

### 提交規範 / Commit Convention
```bash
# 提交格式
git commit -m "type(scope): description"

# 示例
git commit -m "feat(course): add new course template"
git commit -m "fix(auth): resolve login issue"
git commit -m "docs(readme): update installation guide"
```

### 分支策略 / Branch Strategy
- **main**：主分支，穩定版本
- **develop**：開發分支，新功能開發
- **feature/**：功能分支，新功能開發
- **hotfix/**：熱修復分支，緊急修復

## 📞 支援和幫助 / Support and Help

### 文檔資源 / Documentation Resources
- **架構指南**：[ARCHITECTURE_GUIDE.md](./ARCHITECTURE_GUIDE.md)
- **課程頁面指南**：[COURSE_PAGES_GUIDE.md](./COURSE_PAGES_GUIDE.md)
- **內容優化指南**：[CONTENT_OPTIMIZATION_GUIDE.md](./CONTENT_OPTIMIZATION_GUIDE.md)

### 聯絡方式 / Contact Information
- **Email**: support@ai-formula.com
- **GitHub Issues**: [項目Issues頁面](https://github.com/your-username/ai-formula/issues)
- **官方網站**: [https://ai-formula.com](https://ai-formula.com)

## 📄 許可證 / License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 致謝 / Acknowledgments

感謝所有為此項目做出貢獻的開發者和設計師。
Thanks to all developers and designers who contributed to this project.

---

**最後更新 / Last Updated**: 2024-01-15
**版本 / Version**: 2.0.0
**狀態 / Status**: ✅ 生產就緒 / Production Ready
