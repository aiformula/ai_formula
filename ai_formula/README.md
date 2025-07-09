# AI Formula - 香港AI自動化解決方案平台

## 項目概述 / Project Overview

**繁體中文：** AI Formula 是一個專為香港企業設計的AI自動化解決方案平台，提供專業的AI技術服務、教學課程和商業應用指南。本項目使用React + TypeScript + Vite構建，具有現代化的用戶界面和豐富的交互功能。

**English:** AI Formula is an AI automation solution platform designed specifically for Hong Kong businesses, providing professional AI technology services, educational courses, and business application guides. This project is built with React + TypeScript + Vite, featuring a modern user interface and rich interactive functionality.

## 技術棧 / Tech Stack

- **前端框架 / Frontend:** React 18 + TypeScript
- **構建工具 / Build Tool:** Vite
- **UI組件庫 / UI Library:** Shadcn/UI + Tailwind CSS
- **動畫庫 / Animation:** Framer Motion
- **路由 / Routing:** React Router DOM
- **狀態管理 / State Management:** React Context API
- **圖標 / Icons:** Lucide React

## 主要功能 / Key Features

### 🌐 多語言支持 / Multi-language Support

**繁體中文：**
- 完整的繁體中文界面和內容
- 動態切換：用戶可以隨時切換語言

**English:**
- Full English interface and content
- Dynamic Switching: Users can switch languages at any time

### 📝 智能博客系統 / Intelligent Blog System

#### 博客列表頁面 / Blog List Page
- **精選文章區域：** 展示重要的公司介紹和技術文章
- **Featured Articles Section:** Showcase important company introductions and technical articles
- **最新文章區域：** 顯示最近發布的內容
- **Recent Articles Section:** Display recently published content
- **分類側邊欄：** 文章分類和熱門標籤
- **Category Sidebar:** Article categories and popular tags
- **搜索功能：** 文章搜索輸入框
- **Search Functionality:** Article search input box

#### 文章詳情頁面 / Article Detail Page
- **完整文章內容：** 支持中英雙語的詳細文章
- **Complete Article Content:** Detailed articles supporting bilingual content
- **作者信息：** 作者、發布日期、閱讀時間
- **Author Information:** Author, publication date, reading time
- **分享功能：** 社交媒體分享按鈕
- **Sharing Features:** Social media sharing buttons
- **相關文章：** 推薦相關內容
- **Related Articles:** Recommend related content

### 📊 全局瀏覽次數管理 / Global View Count Management

#### 核心功能 / Core Features
- **實時同步：** 所有頁面的瀏覽次數保持一致
- **Real-time Sync:** View counts remain consistent across all pages
- **本地存儲：** 使用localStorage持久化數據
- **Local Storage:** Persist data using localStorage
- **智能增長：** 模擬真實的瀏覽行為
- **Smart Growth:** Simulate realistic viewing behavior

#### 技術實現 / Technical Implementation
```typescript
// ViewCountContext.tsx
interface ViewCountContextType {
  viewCounts: ViewCounts;
  incrementView: (postId: number) => void;
  getViewCount: (postId: number, initialViews: string) => number;
}
```

### 🎨 用戶界面優化 / UI Optimization

#### 按鈕間距改進 / Button Spacing Improvements
- **精選文章：** 增加按鈕與內容的間距（space-y-6 + pt-4）
- **Featured Articles:** Increased spacing between buttons and content (space-y-6 + pt-4)
- **最新文章：** 優化小卡片的按鈕間距（space-y-4 + pt-3）
- **Recent Articles:** Optimized button spacing for small cards (space-y-4 + pt-3)

#### 視覺設計 / Visual Design
- **深色主題：** 專業的黑色背景設計
- **Dark Theme:** Professional black background design
- **漸變效果：** 標題和按鈕的漸變色彩
- **Gradient Effects:** Gradient colors for titles and buttons
- **動畫效果：** 流暢的頁面過渡和懸停效果
- **Animation Effects:** Smooth page transitions and hover effects

### 🔄 動畫系統 / Animation System

#### Framer Motion集成 / Framer Motion Integration
- **頁面進入動畫：** 淡入和滑動效果
- **Page Entry Animations:** Fade-in and slide effects
- **懸停動畫：** 卡片懸停時的微妙動效
- **Hover Animations:** Subtle animations when hovering over cards
- **按鈕動畫：** 點擊和懸停的反饋效果
- **Button Animations:** Click and hover feedback effects

### 📚 課程/數位產品系統 / Course/Digital Products System

#### 學習計劃架構 / Learning Plans Structure
- **免費版計劃：** 每個類別提供基礎內容
- **Free Plans:** Basic content for each category
- **專業版計劃：** 完整的高級內容和額外功能
- **Pro Plans:** Complete advanced content and additional features
- **雙語支援：** 完整的廣東話和英文介面
- **Bilingual Support:** Complete Cantonese and English interface

#### 產品分類系統 / Product Category System
- 🎨 **創意設計：** AI圖像和影片創作工具
- 🎨 **Creative Design:** AI image and video creation tools
- 🤖 **AI應用：** ChatGPT和大語言模型應用
- 🤖 **AI Applications:** ChatGPT and LLM applications
- ⚡ **自動化：** Make.com, n8n, Zapier自動化工具
- ⚡ **Automation:** Make.com, n8n, Zapier automation tools
- 📊 **數據分析：** AI驅動的數據分析解決方案
- 📊 **Data Analytics:** AI-powered data analysis solutions

#### 互動式過濾功能 / Interactive Filtering Features
```typescript
// 類別過濾狀態管理
const [selectedCategory, setSelectedCategory] = useState('all');

// 隨機排列算法
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
```

#### 產品展示特色 / Product Display Features
- **隨機排列：** 每次頁面載入或切換類別時重新排列
- **Random Arrangement:** Rearrange on each page load or category switch
- **動態過濾：** 即時顯示選中類別的產品
- **Dynamic Filtering:** Real-time display of selected category products
- **視覺回饋：** 選中按鈕的高亮效果
- **Visual Feedback:** Highlight effects for selected buttons
- **響應式設計：** 適配不同螢幕尺寸
- **Responsive Design:** Adapt to different screen sizes

## 項目結構 / Project Structure

```
ai_formula/
├── src/
│   ├── components/          # 可重用組件 / Reusable components
│   │   ├── ui/             # UI基礎組件 / Basic UI components
│   │   ├── auth/           # 認證組件 / Authentication components
│   │   ├── course/         # 課程組件 / Course components
│   │   └── Navigation.tsx   # 導航組件 / Navigation component
│   ├── contexts/           # React Context / React Context
│   │   ├── LanguageContext.tsx    # 語言管理 / Language management
│   │   ├── AuthContext.tsx        # 認證管理 / Auth management
│   │   └── ViewCountContext.tsx   # 瀏覽次數管理 / View count management
│   ├── data/               # 數據文件 / Data files
│   │   ├── blogPosts.ts    # 博客文章數據 / Blog post data
│   │   ├── courseDetails.ts # 課程詳情數據 / Course details data
│   │   └── courses/        # 課程數據模組 / Course data modules
│   ├── pages/              # 頁面組件 / Page components
│   │   ├── Index.tsx       # 首頁 / Home page
│   │   ├── Blog.tsx        # 博客列表 / Blog list
│   │   ├── BlogPost.tsx    # 文章詳情 / Article detail
│   │   ├── Course.tsx      # 課程頁面 / Course page
│   │   ├── About.tsx       # 關於我們 / About us
│   │   └── ...
│   ├── types/              # TypeScript類型定義 / TypeScript type definitions
│   └── App.tsx             # 主應用組件 / Main app component
├── public/                 # 靜態資源 / Static assets
├── package.json            # 項目配置 / Project configuration
└── README.md              # 項目說明 / Project documentation
```

## 開發歷程 / Development History

### 第一階段：基礎設置 / Phase 1: Basic Setup
- **項目初始化：** 使用Vite + React + TypeScript
- **Project Initialization:** Using Vite + React + TypeScript
- **UI框架集成：** 配置Shadcn/UI和Tailwind CSS
- **UI Framework Integration:** Configure Shadcn/UI and Tailwind CSS

### 第二階段：博客功能開發 / Phase 2: Blog Feature Development
- **博客列表頁面：** 創建響應式的文章列表
- **Blog List Page:** Create responsive article list
- **文章詳情頁面：** 實現完整的文章閱讀體驗
- **Article Detail Page:** Implement complete article reading experience
- **路由配置：** 設置動態路由 /blog/:id
- **Routing Configuration:** Set up dynamic routing /blog/:id

### 第三階段：功能優化 / Phase 3: Feature Optimization
- **瀏覽次數系統：** 實現全局狀態管理
- **View Count System:** Implement global state management
- **按鈕間距優化：** 改善用戶界面體驗
- **Button Spacing Optimization:** Improve user interface experience
- **動畫效果增強：** 添加流暢的交互動畫
- **Animation Enhancement:** Add smooth interactive animations

### 第四階段：用戶體驗改進 / Phase 4: UX Improvements
- **移除不必要組件：** 刪除有問題的ScrollToTopButton
- **Remove Unnecessary Components:** Delete problematic ScrollToTopButton
- **性能優化：** 確保快速加載和流暢操作
- **Performance Optimization:** Ensure fast loading and smooth operation

### 第五階段：課程頁面重構 / Phase 5: Course Page Restructure
- **數位產品策略轉型：** 從傳統課程轉向數位產品銷售
- **Digital Products Strategy:** Transform from traditional courses to digital product sales
- **學習計劃系統：** 實現免費版和專業版的雙層結構
- **Learning Plans System:** Implement dual-tier structure with free and pro versions
- **產品分類過濾：** 添加互動式類別過濾功能
- **Product Category Filtering:** Add interactive category filtering functionality
- **隨機產品排列：** 實現產品的隨機顯示順序
- **Random Product Arrangement:** Implement random product display order

### 第六階段：免費版學習內容優化 / Phase 6: Free Plan Learning Content Optimization
- **免費版詳細課程：** 創建 FreePlanLearning.tsx 組件，提供完整的免費學習體驗
- **Free Plan Detailed Courses:** Created FreePlanLearning.tsx component for complete free learning experience
- **Midjourney完整教學：** 三個詳細課程涵蓋AI圖像生成基礎到實踐
- **Complete Midjourney Tutorial:** Three detailed lessons covering AI image generation from basics to practice
- **內容本地化：** 完整的廣東話和英文雙語教學內容
- **Content Localization:** Complete bilingual teaching content in Cantonese and English
- **實用教學指南：** 從註冊到生成第一張圖片的完整流程
- **Practical Teaching Guide:** Complete process from registration to generating first image

### 第七階段：專業版學習架構重設計 / Phase 7: Pro Plan Learning Architecture Redesign
- **學生友好設計：** 將複雜模組結構簡化為4部分學習路徑
- **Student-Friendly Design:** Simplified complex module structure to 4-part learning path
- **初學者導向：** 專為完全不懂AI的新手設計的逐步指導
- **Beginner-Oriented:** Step-by-step guidance designed for complete AI beginners
- **視覺化學習：** 每部分配有彩色漸變背景和友好圖標
- **Visual Learning:** Each part features colorful gradient backgrounds and friendly icons
- **實例驅動教學：** 每部分包含具體的提示詞範例和預期結果
- **Example-Driven Teaching:** Each part includes specific prompt examples and expected results

### 第八階段：Midjourney設置指南完善 / Phase 8: Midjourney Setup Guide Enhancement
- **官方網站導向：** 更新所有內容使用官方Midjourney網站而非Discord
- **Official Website Focus:** Updated all content to use official Midjourney website instead of Discord
- **訂閱方案詳解：** 詳細說明Basic、Standard、Pro三種方案差異
- **Subscription Plans Explanation:** Detailed explanation of Basic, Standard, Pro plan differences
- **實用設置步驟：** 四個簡單步驟完成Midjourney設置
- **Practical Setup Steps:** Four simple steps to complete Midjourney setup
- **專業參數指導：** 包含--ar, --v, --s等重要參數使用方法
- **Professional Parameter Guidance:** Includes usage of important parameters like --ar, --v, --s

## 安裝和運行 / Installation and Running

### 前置要求 / Prerequisites
- Node.js 18+
- npm 或 yarn / npm or yarn

### 安裝步驟 / Installation Steps

1. **克隆項目 / Clone the project**
```bash
git clone [repository-url]
cd ai-formula/ai_formula
```

2. **安裝依賴 / Install dependencies**
```bash
npm install
```

3. **啟動開發服務器 / Start development server**
```bash
npm run dev
```

4. **訪問應用 / Access the application**
```
http://localhost:5173
```

### 構建生產版本 / Build for Production
```bash
npm run build
```

## 頁面路由 / Page Routes

| 路由 / Route | 頁面 / Page | 描述 / Description |
|--------------|-------------|-------------------|
| `/` | 首頁 / Home | 主要登陸頁面 / Main landing page |
| `/blog` | 博客列表 / Blog List | 文章列表和分類 / Article list and categories |
| `/blog/:id` | 文章詳情 / Article Detail | 單篇文章閱讀 / Individual article reading |
| `/course` | 課程/數位產品 / Courses/Digital Products | 學習計劃和數位產品展示 / Learning plans and digital products showcase |
| `/about` | 關於我們 / About Us | 公司介紹 / Company introduction |

## 核心組件說明 / Core Component Description

### ViewCountContext
**功能 / Function:** 管理全局瀏覽次數狀態 / Manage global view count state

```typescript
const { getViewCount, incrementView } = useViewCount();
```

### LanguageContext
**功能 / Function:** 處理多語言切換 / Handle multi-language switching

```typescript
const { language, setLanguage } = useLanguage();
```

### Navigation
**功能 / Function:** 響應式導航欄 / Responsive navigation bar

## 數據管理 / Data Management

### 博客文章數據 / Blog Post Data
- **文件位置 / File Location:** `src/data/blogPosts.ts`
- **數據格式 / Data Format:** TypeScript接口定義
- **多語言支持 / Multi-language Support:** 中英文內容分離

### 瀏覽次數存儲 / View Count Storage
- **存儲方式 / Storage Method:** localStorage
- **數據格式 / Data Format:** `{ [postId]: additionalViews }`
- **同步機制 / Sync Mechanism:** React Context + useEffect

## 性能優化 / Performance Optimization

### 代碼分割 / Code Splitting
- **路由級分割：** 每個頁面獨立加載
- **Route-level Splitting:** Each page loads independently

### 動畫優化 / Animation Optimization
- **硬件加速：** 使用CSS transforms
- **Hardware Acceleration:** Using CSS transforms
- **條件渲染：** 避免不必要的動畫計算
- **Conditional Rendering:** Avoid unnecessary animation calculations

## 瀏覽器兼容性 / Browser Compatibility

### 現代瀏覽器 / Modern Browsers
- Chrome 90+, Firefox 88+, Safari 14+

### 移動設備 / Mobile Devices
- iOS Safari, Chrome Mobile

## 未來計劃 / Future Plans

### 短期目標 / Short-term Goals
- [ ] 添加文章搜索功能 / Add article search functionality
- [ ] 實現用戶評論系統 / Implement user comment system
- [ ] 優化SEO設置 / Optimize SEO settings

### 長期目標 / Long-term Goals
- [ ] 後端API集成 / Backend API integration
- [ ] 用戶認證系統 / User authentication system
- [ ] 內容管理系統 / Content management system

## 最新課程頁面更新詳情 / Latest Course Page Update Details

### 🎯 課程頁面重構摘要 / Course Page Restructure Summary

#### 核心變更 / Core Changes
- **策略轉型：** 從傳統課程轉向數位產品銷售
- **Strategy Shift:** From traditional courses to digital product sales
- **學習計劃系統：** 免費版 + 專業版雙層架構
- **Learning Plans System:** Free + Pro dual-tier architecture
- **產品分類：** 4大類別，每類2個產品（新手+高級）
- **Product Categories:** 4 main categories, 2 products each (beginner+advanced)

### 🚀 最新更新：Midjourney設置指南完善 / Latest Update: Enhanced Midjourney Setup Guide

#### 免費版學習內容大幅提升 / Significant Free Plan Learning Content Enhancement

**完整Midjourney教學：** 三個詳細課程從零開始教學
**Complete Midjourney Tutorial:** Three detailed lessons teaching from scratch

- **課程1：** AI圖像生成簡介 / **Lesson 1:** Introduction to AI Image Generation
- **課程2：** 設置你的Midjourney帳戶 / **Lesson 2:** Setting Up Your Midjourney Account
- **課程3：** 創建你的第一張AI圖片 / **Lesson 3:** Creating Your First AI Image

#### 官方網站導向教學 / Official Website-Based Teaching
完全基於Midjourney官方網站的現代化教學方法
Modern teaching approach completely based on Midjourney official website

- 不再依賴Discord複雜設置 / No longer relying on complex Discord setup
- 直接使用midjourney.com網頁版 / Direct use of midjourney.com web version
- 更簡潔的用戶體驗 / More streamlined user experience

#### 詳細訂閱方案說明 / Detailed Subscription Plan Explanation
清楚解釋三種付費方案 / Clear explanation of three paid plans

- **Basic Plan** (US$10/月) - 3.3小時快速生成時間
- **Standard Plan** (US$30/月) - 15小時快速生成時間
- **Pro Plan** (US$60/月) - 30小時快速生成時間 + 隱私模式

#### 實用參數指導 / Practical Parameter Guidance
包含重要的Midjourney參數使用方法
Includes important Midjourney parameter usage

- `--ar` (長寬比) / `--ar` (aspect ratio)
- `--v` (版本選擇) / `--v` (version selection)
- `--s` (風格化程度) / `--s` (stylization level)
- `--q` (品質設定) / `--q` (quality setting)

### 內容結構優化 / Content Structure Optimization

```typescript
// 課程詳情數據結構 / Course Details Data Structure
interface LessonContent {
  title: { en: string; zh: string };
  content: { en: string; zh: string };
  keyPoints: { en: string[]; zh: string[] };
  examples?: { en: string; zh: string };
}

// Midjourney設置課程範例 / Midjourney Setup Course Example
const lesson2Content = {
  title: {
    en: "Setting Up Your Midjourney Account",
    zh: "設置你的Midjourney帳戶"
  },
  content: {
    en: "Complete step-by-step guide to get started with Midjourney...",
    zh: "完整的逐步指南，開始使用Midjourney..."
  }
};
```

### 用戶體驗改進 / User Experience Improvements

- **清晰的要點格式：** 每個課程都有明確的重點摘要
- **Clear Key Points Format:** Each lesson has clear key point summaries
- **雙語對照：** 完整的廣東話和英文內容
- **Bilingual Comparison:** Complete Cantonese and English content
- **實用範例：** 具體的提示詞和預期結果展示
- **Practical Examples:** Specific prompts and expected result demonstrations
- **易讀格式：** 優化的文字排版和視覺層次
- **Easy-to-Read Format:** Optimized text layout and visual hierarchy

### 技術實現 / Technical Implementation

```typescript
// 狀態管理 / State Management
const [selectedCategory, setSelectedCategory] = useState('all');

// 產品過濾 / Product Filtering
const filteredProducts = digitalProducts
  .filter(product => selectedCategory === 'all' || product.category === selectedCategory);

// 隨機排列 / Random Shuffling
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
```

### 產品類別詳情 / Product Category Details

#### 🎨 創意設計類別 / Creative Design Category:
- **Midjourney新手指南** (HK$199) - 新手級
- **高級視覺AI精通** (HK$699) - 高級

#### 🤖 AI應用類別 / AI Applications Category:
- **ChatGPT商業基礎** (HK$199) - 新手級
- **高級AI整合企業解決方案** (HK$899) - 高級

#### ⚡ 自動化類別 / Automation Category:
- **基礎自動化設置** (HK$299) - 新手級
- **企業自動化精通** (HK$999) - 高級

#### 📊 數據分析類別 / Data Analytics Category:
- **數據分析入門** (HK$299) - 新手級
- **高級分析同AI專業套件** (HK$799) - 高級

### UI/UX 改進 / UI/UX Improvements

- **文字可讀性：** 所有文字改為白色/淺灰色，確保在黑色背景下清晰
- **Text Readability:** All text changed to white/light gray for clarity on black background
- **按鈕互動：** 選中狀態的視覺回饋，懸停效果優化
- **Button Interaction:** Visual feedback for selected states, optimized hover effects
- **隨機排列：** 每次載入或切換類別時產品重新排列
- **Random Arrangement:** Products rearrange on each load or category switch
- **廣東話本地化：** 完整的廣東話介面和內容
- **Cantonese Localization:** Complete Cantonese interface and content

## 貢獻指南 / Contributing Guidelines

1. Fork項目 / Fork the project
2. 創建功能分支 / Create feature branch
3. 提交更改 / Commit changes
4. 推送到分支 / Push to branch
5. 創建Pull Request / Create Pull Request

## 許可證 / License

本項目採用MIT許可證 / This project is licensed under the MIT License

## 聯繫方式 / Contact

- **Instagram:** @ai_formula_
- **Email:** [contact email]
- **Website:** [website url]

---

**最後更新 / Last Updated:** 2024年12月27日 / December 27, 2024  
**版本 / Version:** 2.1.0 (Midjourney教學完善版 / Enhanced Midjourney Tutorial)  
**維護者 / Maintainer:** AI Formula Team

### 📋 最新更新摘要 / Latest Update Summary

✅ 完善免費版Midjourney設置教學內容 / Enhanced Free Plan Midjourney setup tutorial content  
✅ 更新為官方網站導向的教學方法 / Updated to official website-based teaching approach  
✅ 新增詳細的訂閱方案說明 / Added detailed subscription plan explanations  
✅ 包含實用的Midjourney參數指導 / Included practical Midjourney parameter guidance  
✅ 優化雙語內容的可讀性和結構 / Optimized bilingual content readability and structure
