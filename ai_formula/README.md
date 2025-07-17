# AI Formula - 香港AI自動化解決方案平台

## 📋 項目概述 / Project Overview

**繁體中文：** AI Formula 是一個專為香港企業設計的AI自動化解決方案平台，提供專業的AI技術服務、教學課程和商業應用指南。本項目已完成重大重構，採用模組化架構，並實施了完整的品牌視覺系統、交互式學習平台和先進的學習進度追蹤系統。

**English:** AI Formula is an AI automation solution platform designed specifically for Hong Kong businesses, providing professional AI technology services, educational courses, and business application guides. This project has undergone major refactoring with a modular architecture and implemented a complete brand visual system, interactive learning platform, and advanced learning progress tracking system.

## 🎯 最新重大更新 / Latest Major Updates

### ✅ 學習進度追蹤系統重大改進 / Major Learning Progress Tracking System Improvements

#### 🎯 92% 進度問題完全解決 / Complete Resolution of 92% Progress Issue
- **🔍 根本原因分析**：發現用戶完成所有9個單元但只完成2/3測驗導致92%進度
- **🛠️ 診斷工具添加**：新增進度分析功能，幫助用戶了解缺少哪些測驗
- **✅ 手動完成選項**：為已學習內容提供手動標記完成功能
- **📊 準確進度計算**：修正進度計算邏輯，確保100%準確性

#### ⏱️ 實時學習時間追蹤系統 / Real-time Learning Timer System
- **🚀 自動計時功能**：進入單元頁面自動開始計時，離開時自動停止
- **⏰ 實時顯示**：學習界面顯示當前學習時間（分鐘和秒數）
- **💾 持久化存儲**：每個單元的學習時間獨立存儲和累計
- **📈 進度整合**：與現有進度追蹤Hook完美整合
- **🎉 完成動畫**：課程完成時顯示總學習時間和慶祝動畫

#### 🎨 動畫性能和用戶體驗大幅提升 / Major Animation Performance and UX Enhancement
- **😌 溫和動畫**：將快速、令人眩暈的動畫替換為溫和的呼吸光效
- **⏱️ 時間調整**：過渡時間從300ms增加到500ms，提供更舒適的體驗
- **🔄 懸停效果**：懸停縮放從1.02降低到1.008，提供微妙的反饋
- **💨 呼吸動畫**：2秒脈衝動畫替換為4秒溫和呼吸動畫
- **🎯 緩動函數**：添加適當的緩動函數（easeOut, easeInOut）
- **✨ 狀態指示器**：創建status-badge-breathing類別，提供舒適的視覺反饋

#### 🧹 UI清理和優化 / UI Cleanup and Optimization
- **❌ 移除重複標記**：移除重複的完成標記圖標，只保留單一清晰狀態指示器
- **📋 增強單元顯示**：顯示完整單元標題而非通用"單元 X"
- **🏷️ 狀態徽章**：添加適當的狀態徽章（"已完成"、"進行中"、"待學習"）
- **📝 詳細資訊**：包含課程時長和類型元數據
- **🎮 情境按鈕**：實現情境適當的操作按鈕
- **🧪 清理調試界面**：移除侵入性的技術進度數據調試面板

#### 📊 核心功能實現詳情 / Core Feature Implementation Details

**實時計時系統 / Real-time Timer System:**
```typescript
// useAIAutomationProgress.ts 新增功能
interface ProgressHook {
  startUnitLearning: (unitId: string) => void;
  stopUnitLearning: () => void;
  getCurrentLearningTime: () => number;
  // ... 其他現有功能
}

// 自動計時會話管理
const startUnitLearning = (unitId: string) => {
  setCurrentLearningUnit(unitId);
  setLearningStartTime(Date.now());
};

const stopUnitLearning = () => {
  if (currentLearningUnit && learningStartTime) {
    const sessionTime = Date.now() - learningStartTime;
    // 保存到localStorage並更新總時間
  }
};
```

**動畫系統改進 / Animation System Improvements:**
```css
/* progress-styles.css 新增樣式 */
.gentle-breathing {
  animation: gentle-breathing 4s ease-in-out infinite;
}

@keyframes gentle-breathing {
  0%, 100% { 
    box-shadow: 0 0 8px rgba(62, 255, 220, 0.3);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 16px rgba(62, 255, 220, 0.5);
    transform: scale(1.005);
  }
}

.status-badge-breathing {
  animation: status-breathing 4s ease-in-out infinite;
}
```

### ✅ 全新課程學習儀表板 / New Course Learning Dashboard

#### 🎨 AI Formula 品牌視覺系統 / AI Formula Brand Visual System
- **🌟 背景色**：#0D0D1A (深科技藍黑色)
- **💚 主要強調色**：#3EFFDC (螢光綠青色) - 用於進度條、圖標、高亮
- **💜 次要強調色**：#8A3FFC (紫色) - 用於按鈕和漸變結束
- **🔤 文字色彩**：#FFFFFF (標題)，#E0E0E0 (正文)
- **🎴 卡片樣式**：rgba(255, 255, 255, 0.05) 背景，#3EFFDC 到 #8A3FFC 線性漸變邊框
- **📊 圖表樣式**：雷達圖表，rgba(255, 255, 255, 0.1) 網格，#3EFFDC 描邊

#### 🖥️ 交互式學習介面 / Interactive Learning Interface
- **📝 AI 遊樂場**：與AI助手即時對話，獲得學習支援
- **📔 智慧筆記**：記錄學習重點，支援搜索和整理
- **🎯 實作練習**：互動式練習題，即時反饋和評估
- **📱 響應式設計**：50% 學習內容 + 50% 互動介面的完美平衡

#### 🔓 進階解鎖機制 / Progressive Unlock Mechanism
- **⏭️ 順序學習**：完成當前課程後才能解鎖下一課程
- **✅ 進度追蹤**：即時顯示完成狀態和學習進度
- **🎯 學習路徑**：清晰的學習路徑指引
- **🔄 自動導航**：完成課程後自動跳轉到下一課程

#### 🎭 多類型課程內容 / Multi-Type Course Content
- **📹 影片課程**：支援影片播放和字幕顯示
- **📖 互動文本**：豐富的文本內容，支援代碼高亮
- **🧩 測驗系統**：多選題測驗，即時評分和反饋
- **💡 LessonViewer 組件**：智能識別課程類型並提供對應介面

### ✅ 全新提示工程課程內容 / New Prompt Engineering Course Content

#### 🎯 三大學習主題 / Three Main Learning Themes

**1. AI 的悄悄話 - 初探 AI 的魔法語言** (50分鐘，3課程)
- 什麼是「提示」？(15分鐘)
- 為什麼要學習提示？(20分鐘)
- 認識你的AI夥伴 (15分鐘)

**2. 把話說清楚的魔法 - 基礎提示技巧** (80分鐘，3課程)
- 具體明確技巧 (25分鐘)
- 提供情境技巧 (30分鐘)
- 給出範例技巧 (25分鐘)

**3. 釋放 AI 的全部潛力 - 進階提示技巧** (90分鐘，3課程)
- 角色扮演技巧 (30分鐘)
- 思維鏈技巧 (35分鐘)
- 持續優化技巧 (25分鐘)

#### 📚 詳細課程內容 / Detailed Course Content
- **🎯 學習目標**：每課程都有明確的學習目標
- **💡 實際範例**：包含畫狗、寫信等實際應用場景
- **🧩 測驗題目**：精心設計的測驗題目和答案
- **📖 豐富資源**：相關文章、範例和延伸閱讀

### ✅ 語言系統完整修正 / Complete Language System Fix

#### 🌐 香港繁體中文支援 / Hong Kong Traditional Chinese Support
- **🔧 語言代碼統一**：全面從 'zh-TW' 更改為 'zh-HK'
- **🎌 語言選擇器**：正確顯示「中文」選項
- **📝 內容本地化**：完整的繁體中文（香港）內容
- **📅 日期格式**：使用 'zh-HK' 本地化日期格式

#### 📁 修正範圍 / Fixed Components
- **🧭 LanguageSwitcher.tsx**：修正語言代碼不一致問題
- **🔗 Navigation.tsx**：更新語言檢查邏輯
- **📚 所有課程組件**：統一使用 'zh-HK'
- **📄 SEO 組件**：修正元標籤語言標記
- **📊 數據對象**：更新所有課程數據的語言鍵值

### ✅ 核心檔案修改詳情 / Core Files Modified Details

#### 🎯 主要修改的檔案 / Main Modified Files

**學習進度追蹤系統 / Learning Progress Tracking System:**
- **`useAIAutomationProgress.ts`** - 添加實時計時功能
  - `startUnitLearning()` - 自動開始計時
  - `stopUnitLearning()` - 自動停止計時  
  - `getCurrentLearningTime()` - 獲取當前學習時間
  - 持久化存儲每個單元的學習時間

**用戶界面組件 / User Interface Components:**
- **`AIBusinessAutomationLearning.tsx`** - 增強UI和簡化進度分析
  - 移除侵入性調試面板
  - 添加更好的單元資訊顯示
  - 優化進度計算和主題時間追蹤
- **`AIBusinessAutomationUnit.tsx`** - 整合實時計時器
  - 標題欄中的實時計時器顯示
  - 自動開始/停止計時功能
  - 完成動畫顯示總學習時間

**樣式和動畫系統 / Styles and Animation System:**
- **`progress-styles.css`** - 動畫性能大幅改進
  - 替換快速脈衝動畫為溫和呼吸光效
  - 新增 `gentle-breathing` 4秒關鍵幀動畫
  - 新增 `status-breathing` 狀態徽章動畫
  - 優化過渡時間和緩動函數

#### 🚀 技術改進亮點 / Technical Improvement Highlights

**性能優化 / Performance Optimization:**
- 動畫時間從300ms增加到500ms，減少眩暈感
- 懸停縮放從1.02降低到1.008，提供微妙反饋
- 使用easeOut和easeInOut緩動函數

**用戶體驗 / User Experience:**
- 移除重複的完成標記圖標
- 顯示完整單元標題而非通用標籤
- 清理技術調試資訊，提供乾淨的用戶界面
- 實時學習時間追蹤提高學習動機

**數據管理 / Data Management:**
- localStorage持久化學習時間數據
- 準確的進度計算邏輯
- 自動會話管理和時間累計

## 🛠️ 技術棧 / Tech Stack

### 前端技術 / Frontend Technologies
- **React 18** + **TypeScript** - 現代化前端框架
- **Vite** - 快速構建工具
- **Tailwind CSS** - 原子化CSS框架
- **Shadcn/UI** - 高質量UI組件庫
- **Framer Motion** - 動畫庫
- **React Router DOM** - 路由管理
- **Lucide React** - 圖標庫
- **Recharts** - 圖表庫（雷達圖進度追蹤）
- **LocalStorage API** - 學習時間和進度持久化

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
│   │   ├── 📁 learning/           # 學習平台組件
│   │   │   ├── CourseDashboardPage.tsx # 課程儀表板（全新設計）
│   │   │   ├── LessonViewer.tsx   # 課程瀏覽器
│   │   │   ├── AIPlayground.tsx   # AI互動遊樂場
│   │   │   ├── SmartNotes.tsx     # 智慧筆記系統
│   │   │   ├── QuizModal.tsx      # 測驗模態框
│   │   │   └── AITutorChat.tsx    # AI導師聊天
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
│   │   ├── 📁 templates/          # 模板系統
│   │   │   ├── CourseOutlineTemplate.tsx # 課程大綱模板
│   │   │   ├── CourseTemplate.tsx # 課程模板
│   │   │   └── BlogTemplate.tsx   # 博客模板
│   │   ├── 📁 SEO/                # SEO組件
│   │   │   ├── SEOHead.tsx        # SEO頭部
│   │   │   ├── StructuredData.tsx # 結構化數據
│   │   │   └── seoUtils.ts        # SEO工具（已修正語言）
│   │   ├── Navigation.tsx         # 導航組件（已修正語言）
│   │   ├── LanguageSwitcher.tsx   # 語言選擇器（已修正）
│   │   ├── Footer.tsx             # 頁腳組件
│   │   └── ErrorBoundary.tsx      # 錯誤邊界
│   ├── 📁 contexts/               # React Context
│   │   ├── LanguageContext.tsx    # 語言管理（預設zh-HK）
│   │   ├── AuthContext.tsx        # 認證管理
│   │   └── ViewCountContext.tsx   # 瀏覽計數管理
│   ├── 📁 data/                   # 數據文件
│   │   ├── 📁 blog/               # 博客數據
│   │   │   ├── blogPosts.ts       # 博客文章
│   │   │   └── articleContent.ts  # 文章內容
│   │   ├── 📁 courseData/         # 課程數據
│   │   │   ├── promptEngineeringComplete.ts # 全新提示工程課程
│   │   │   ├── courseData.ts      # 課程數據
│   │   │   ├── courseDetails.ts   # 課程詳情
│   │   │   ├── courses.ts         # 課程列表
│   │   │   └── courseManager.ts   # 課程管理器
│   │   └── __tests__/             # 測試文件
│   ├── 📁 pages/                  # 頁面組件
│   │   ├── 📁 general/            # 通用頁面
│   │   │   └── HomePage.tsx       # 首頁
│   │   ├── 📁 blog/               # 博客頁面
│   │   │   ├── BlogListing.tsx    # 博客列表
│   │   │   └── BlogPost.tsx       # 文章詳情
│   │   ├── 📁 courses/            # 課程頁面
│   │   │   ├── Course.tsx         # 課程主頁
│   │   │   ├── CourseDetail.tsx   # 課程詳情
│   │   │   ├── CoursesListing.tsx # 課程列表（已修正語言）
│   │   │   ├── CourseRegistration.tsx # 課程註冊
│   │   │   ├── PromptEngineeringCourse.tsx # 提示工程課程
│   │   │   └── ...                # 其他課程頁面
│   │   ├── 📁 learning/           # 學習頁面
│   │   │   └── Dashboard.tsx      # 學習儀表板
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
│   │   └── ...                    # 其他課程文件
│   ├── favicon.ico                # 網站圖標
│   └── robots.txt                 # 搜索引擎配置
├── 📁 設計文檔/                    # 設計文檔
│   ├── ARCHITECTURE_GUIDE.md      # 架構指南
│   ├── AI_FORMULA_COLOR_GUIDELINES.md # AI Formula色彩指南
│   ├── LESSON_PAGE_DESIGN.md      # 課程頁面設計
│   └── COURSE_OUTLINE_DESIGNS.md  # 課程大綱設計
├── package.json                   # 項目配置
├── tailwind.config.ts             # Tailwind配置
├── tsconfig.json                  # TypeScript配置
├── vite.config.ts                 # Vite配置
└── README.md                      # 項目文檔
```

## 🌟 核心功能 / Core Features

### 1. 🎓 全新學習體驗 / New Learning Experience

#### 課程儀表板 / Course Dashboard
- **🎨 品牌視覺設計**：完整的AI Formula視覺系統
- **📊 學習進度追蹤**：雷達圖表顯示各項能力發展
- **🎯 課程管理**：三個主要模組，九個詳細課程
- **🔓 進階解鎖系統**：完成課程後自動解鎖下一課程
- **📱 響應式設計**：完美適配所有設備

#### 交互式學習介面 / Interactive Learning Interface
- **🤖 AI 遊樂場**：與AI助手即時對話，獲得個人化學習支援
- **📝 智慧筆記系統**：記錄學習重點，支援搜索和分類整理
- **🎯 實作練習**：互動式練習題，即時反饋和詳細評估
- **📏 完美平衡佈局**：50% 學習內容 + 50% 互動工具

#### 多類型課程內容 / Multi-Type Course Content
- **📹 影片課程**：高清影片播放，支援字幕和速度調整
- **📖 互動文本**：豐富的文本內容，支援代碼高亮和複製
- **🧩 智能測驗**：多選題測驗，即時評分和詳細解析
- **💡 智能識別**：自動識別課程類型並提供對應介面

### 2. 🎨 課程系統 / Course System

#### 課程大綱系統 / Course Outline System
- **📚 學術專業風格**：提示工程課程 - 結構化、層次清晰
- **🛠️ 互動實作風格**：編程基礎課程 - 視覺化、互動性強
- **🎯 現代卡片風格**：ChatGPT精通課程 - 模組化、簡潔現代
- **📊 儀表板風格**：Perplexity工具課程 - 數據驅動、專業工具

#### 課程大綱模板功能 / Course Outline Template Features
- **🎨 動態主題系統**：根據導師自動切換色彩主題
- **📱 響應式Tab系統**：四個主要標籤頁面
- **🎯 智慧內容管理**：動態生成相關課程和最新消息
- **💰 整合價格系統**：完整的定價和註冊功能

### 3. 🌐 多語言支援 / Multi-language Support

#### 香港繁體中文 / Hong Kong Traditional Chinese
- **🎌 語言代碼統一**：全面使用 'zh-HK' 標準
- **📝 內容本地化**：完整的繁體中文（香港）內容
- **📅 日期格式**：使用香港本地化日期格式
- **🔄 動態切換**：用戶可即時切換語言

#### 英文支援 / English Support
- **🌍 完整英文界面**：所有組件都支援英文
- **🔄 無縫切換**：語言切換無需重新加載頁面
- **📊 SEO優化**：多語言SEO優化支援

### 4. 📝 博客系統 / Blog System

#### 文章展示 / Article Display
- **📋 文章列表**：精選文章和最新文章分區展示
- **📄 文章詳情**：完整的文章閱讀體驗
- **🏷️ 分類系統**：文章分類和標籤管理
- **🔍 搜索功能**：全文搜索支援

## 🚀 快速開始 / Quick Start

### 環境要求 / Requirements
- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 或 **yarn** >= 1.22.0
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

3. **啟動開發服務器 / Start Development Server**
```bash
npm run dev
# 或使用 yarn
yarn dev
```

4. **訪問應用 / Access Application**
- **主頁**：http://localhost:5173
- **課程儀表板**：http://localhost:5173/courses/dashboard
- **課程列表**：http://localhost:5173/courses

## 🎯 使用指南 / Usage Guide

### 課程學習流程 / Course Learning Flow

1. **選擇課程 / Select Course**
   - 訪問課程列表頁面
   - 選擇感興趣的課程
   - 點擊「開始學習」

2. **進入學習儀表板 / Enter Learning Dashboard**
   - 查看課程概覽和進度
   - 選擇要學習的模組
   - 開始第一個課程

3. **交互式學習 / Interactive Learning**
   - 觀看課程內容（影片/文本）
   - 使用AI遊樂場提問
   - 記錄學習筆記
   - 完成實作練習

4. **進度追蹤 / Progress Tracking**
   - 完成課程後標記為已完成
   - 自動解鎖下一個課程
   - 查看整體學習進度

### 語言切換 / Language Switching

```typescript
// 語言切換器使用
const { language, setLanguage } = useLanguage();

// 切換到繁體中文（香港）
setLanguage('zh-HK');

// 切換到英文
setLanguage('en');
```

### 添加新課程 / Adding New Courses

```typescript
// 創建新課程數據
const newCourse = {
  id: 'new-course-id',
  title: {
    'zh-HK': '新課程標題',
    'en': 'New Course Title'
  },
  description: {
    'zh-HK': '課程描述',
    'en': 'Course Description'
  },
  modules: [
    {
      id: 'module-1',
      title: {
        'zh-HK': '模組1',
        'en': 'Module 1'
      },
      lessons: [
        {
          id: 'lesson-1',
          title: {
            'zh-HK': '課程1',
            'en': 'Lesson 1'
          },
          type: 'video' | 'interactive-text' | 'quiz',
          content: {
            'zh-HK': '課程內容...',
            'en': 'Lesson content...'
          }
        }
      ]
    }
  ]
};
```

## 🎨 設計系統 / Design System

### AI Formula 品牌色彩 / AI Formula Brand Colors

#### 主要色彩 / Primary Colors
- **背景色 / Background**: `#0D0D1A` (深科技藍黑色)
- **主要強調色 / Primary Accent**: `#3EFFDC` (螢光綠青色)
- **次要強調色 / Secondary Accent**: `#8A3FFC` (紫色)
- **文字色 / Text**: `#FFFFFF` (白色標題), `#E0E0E0` (正文)

#### 組件樣式 / Component Styles
- **卡片背景 / Card Background**: `rgba(255, 255, 255, 0.05)`
- **漸變邊框 / Gradient Border**: `linear-gradient(135deg, #3EFFDC 0%, #8A3FFC 100%)`
- **按鈕樣式 / Button Styles**: 
  - 主按鈕：`#8A3FFC` 背景
  - 次按鈕：透明背景，`#3EFFDC` 邊框

### 字體系統 / Typography

#### 標題字體 / Heading Fonts
- **H1**: `text-4xl md:text-6xl font-bold text-white`
- **H2**: `text-3xl md:text-4xl font-bold text-white`
- **H3**: `text-2xl md:text-3xl font-semibold text-white`

#### 內容字體 / Content Fonts
- **正文 / Body**: `text-base leading-relaxed text-gray-200`
- **小文本 / Small Text**: `text-sm text-gray-400`

## 🔧 開發指南 / Development Guide

### 使用 CourseDashboardPage / Using CourseDashboardPage

```typescript
import { CourseDashboardPage } from '@/components/learning/CourseDashboardPage';

const Dashboard = () => {
  return (
    <CourseDashboardPage />
  );
};
```

### 使用 LessonViewer / Using LessonViewer

```typescript
import { LessonViewer } from '@/components/learning/LessonViewer';

const LearningInterface = () => {
  return (
    <LessonViewer 
      lesson={currentLesson}
      onComplete={handleLessonComplete}
    />
  );
};
```

### 語言支援開發 / Language Support Development

```typescript
// 在組件中使用語言
const { language } = useLanguage();

// 多語言內容
const content = {
  'zh-HK': '繁體中文（香港）內容',
  'en': 'English Content'
};

// 顯示對應語言內容
<h1>{content[language]}</h1>
```

## 📊 性能優化 / Performance Optimization

### 代碼分割 / Code Splitting
- **路由級分割**：每個頁面組件獨立加載
- **組件級分割**：大型組件使用 `React.lazy()` 懶加載
- **第三方庫分割**：圖表庫等按需載入

### 視覺優化 / Visual Optimization
- **品牌色彩系統**：統一的色彩變量管理
- **CSS-in-JS**：動態主題切換
- **響應式設計**：移動端優化

## 🧪 測試 / Testing

### 單元測試 / Unit Testing
```bash
# 運行測試
npm run test

# 運行課程系統測試
npm run test courseSystem
```

### 組件測試 / Component Testing
```bash
# 測試學習組件
npm run test components/learning

# 測試語言切換
npm run test LanguageContext
```

## 🔄 部署 / Deployment

### 構建生產版本 / Build for Production

```bash
# 構建項目
npm run build

# 預覽構建結果
npm run preview
```

### 環境變量 / Environment Variables

```bash
# .env.local
VITE_APP_TITLE=AI Formula
VITE_DEFAULT_LANGUAGE=zh-HK
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-key
```

## 📈 監控和分析 / Monitoring and Analytics

### 學習進度分析 / Learning Progress Analytics
- **完成率追蹤**：課程完成率統計
- **學習時間分析**：用戶學習時間分佈
- **互動數據**：AI遊樂場使用情況

### 性能監控 / Performance Monitoring
- **頁面載入時間**：首頁和課程頁面載入速度
- **組件渲染時間**：重要組件渲染性能
- **用戶體驗指標**：Core Web Vitals 監控

## 🔧 故障排除 / Troubleshooting

### 常見問題 / Common Issues

#### 語言顯示問題 / Language Display Issues
```bash
# 檢查語言設置
grep -r "zh-TW" src/  # 應該沒有結果
grep -r "zh-HK" src/  # 應該有正確的語言代碼
```

#### 課程無法訪問 / Course Access Issues
```bash
# 檢查路由配置
http://localhost:5173/courses/dashboard
```

#### 建置錯誤 / Build Errors
```bash
# 清除快取並重新安裝
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 🤝 貢獻指南 / Contributing Guide

### 代碼規範 / Code Standards
- **ESLint**：遵循 ESLint 規則
- **TypeScript**：嚴格的類型檢查
- **語言支援**：新功能必須支援 zh-HK 和 en

### 提交規範 / Commit Convention
```bash
# 功能開發
git commit -m "feat(learning): add AI playground feature"

# 語言修正
git commit -m "fix(i18n): update language code from zh-TW to zh-HK"

# 課程內容
git commit -m "content(course): update prompt engineering curriculum"

# 視覺設計
git commit -m "style(dashboard): implement AI Formula brand colors"
```

### Pull Request 檢查清單 / Pull Request Checklist
- [ ] 語言支援完整（zh-HK 和 en）
- [ ] 響應式設計測試
- [ ] 品牌色彩系統一致性
- [ ] 功能測試通過
- [ ] 文檔更新完成

## 📞 支援和幫助 / Support and Help

### 文檔資源 / Documentation Resources
- **架構指南**：[ARCHITECTURE_GUIDE.md](./ARCHITECTURE_GUIDE.md)
- **色彩指南**：[AI_FORMULA_COLOR_GUIDELINES.md](./AI_FORMULA_COLOR_GUIDELINES.md)
- **課程設計**：[LESSON_PAGE_DESIGN.md](./LESSON_PAGE_DESIGN.md)

### 聯絡方式 / Contact Information
- **Email**: support@ai-formula.com
- **GitHub Issues**: [項目Issues頁面](https://github.com/your-username/ai-formula/issues)
- **官方網站**: [https://ai-formula.com](https://ai-formula.com)

## 📄 許可證 / License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 致謝 / Acknowledgments

感謝所有為此項目做出貢獻的開發者和設計師。特別感謝在品牌視覺系統、交互式學習平台和多語言支援方面的貢獻。

Thanks to all developers and designers who contributed to this project. Special thanks for contributions to the brand visual system, interactive learning platform, and multi-language support.

---

## 📈 開發總結 / Development Summary

### 🎯 已完成的重大改進 / Completed Major Improvements

#### ✅ 學習體驗優化 / Learning Experience Optimization
1. **92%進度問題解決** - 完全診斷和修正進度計算問題
2. **實時學習計時器** - 自動計時功能提高學習動機和成效追蹤
3. **動畫性能改進** - 溫和呼吸動畫替代快速眩暈效果
4. **UI清理優化** - 移除重複元素，提供清晰的用戶界面

#### ✅ 技術實現亮點 / Technical Implementation Highlights
1. **進度追蹤Hook增強** - `useAIAutomationProgress.ts` 添加完整計時功能
2. **組件整合** - 學習界面與計時器的無縫整合
3. **樣式系統優化** - `progress-styles.css` 性能友好的動畫系統
4. **數據持久化** - localStorage實現學習時間的可靠存儲

#### ✅ 用戶體驗提升 / User Experience Enhancement
1. **視覺舒適度** - 4秒溫和呼吸動畫，減少眼部疲勞
2. **學習動機** - 實時時間顯示和完成慶祝動畫
3. **信息清晰** - 完整單元標題和狀態指示器
4. **界面整潔** - 移除技術調試資訊，專注學習內容

### 🚀 系統當前狀態 / Current System Status

本學習進度追蹤系統已完成全面優化，提供：
- ✅ **準確的進度追蹤** - 100%準確的完成度計算
- ✅ **實時學習計時** - 自動化的學習時間管理
- ✅ **舒適的動畫** - 不會造成眩暈的溫和視覺效果
- ✅ **清晰的UI** - 無干擾的學習環境
- ✅ **完整的文檔** - 全面的實現說明和使用指南

**最後更新 / Last Updated**: 2024年12月27日 / December 27, 2024
**版本 / Version**: 4.0.0 (學習進度追蹤系統完整優化版)
**狀態 / Status**: ✅ 生產就緒，全面優化完成 / Production Ready, Fully Optimized
**重大更新 / Major Updates**: 
- 🎨 全新品牌視覺系統 (AI Formula Brand Visual System)
- 🎓 交互式學習平台 (Interactive Learning Platform)
- 🌐 完整語言支援修正 (Complete Language Support Fix)
- 📚 全新課程內容 (New Course Content)
- 🔓 進階解鎖機制 (Progressive Unlock Mechanism)
- ⏱️ 實時學習時間追蹤系統 (Real-time Learning Timer System)
- 🎨 動畫性能優化 (Animation Performance Optimization)
- 🧹 UI清理和用戶體驗提升 (UI Cleanup and UX Enhancement)
- 📊 學習進度追蹤完整改進 (Complete Learning Progress Tracking Improvements)
