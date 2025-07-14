# 🚀 SEO 設定指南 / SEO Setup Guide

## 概述 / Overview

本指南將幫助您完整設置和使用 AI Formula 的 SEO 系統，包括 meta 標籤、結構化數據、網站地圖、性能優化和分析追蹤。

This guide will help you completely set up and use AI Formula's SEO system, including meta tags, structured data, sitemap, performance optimization, and analytics tracking.

## 📋 目錄 / Table of Contents

1. [基本設置 / Basic Setup](#基本設置--basic-setup)
2. [SEO 頭部標籤 / SEO Head Tags](#seo-頭部標籤--seo-head-tags)
3. [結構化數據 / Structured Data](#結構化數據--structured-data)
4. [網站地圖生成 / Sitemap Generation](#網站地圖生成--sitemap-generation)
5. [性能優化 / Performance Optimization](#性能優化--performance-optimization)
6. [分析追蹤 / Analytics Tracking](#分析追蹤--analytics-tracking)
7. [實際應用範例 / Practical Examples](#實際應用範例--practical-examples)
8. [最佳實踐 / Best Practices](#最佳實踐--best-practices)

## 基本設置 / Basic Setup

### 1. 安裝依賴 / Install Dependencies

```bash
npm install react-helmet-async
```

### 2. 設置環境變數 / Setup Environment Variables

在 `.env` 檔案中添加：

```env
VITE_SITE_URL=https://ai-formula.com
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX
VITE_FACEBOOK_PIXEL_ID=123456789
VITE_HOTJAR_ID=1234567
```

### 3. 更新主應用程式 / Update Main App

在 `src/App.tsx` 中設置 SEO 提供者：

```typescript
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AnalyticsProvider, PerformanceOptimizer } from '@/components/SEO';

function App() {
  const analyticsConfig = {
    googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
    googleTagManagerId: import.meta.env.VITE_GOOGLE_TAG_MANAGER_ID,
    facebookPixelId: import.meta.env.VITE_FACEBOOK_PIXEL_ID,
    hotjarId: import.meta.env.VITE_HOTJAR_ID,
    enableConsent: true,
    enableDebug: import.meta.env.DEV
  };

  return (
    <HelmetProvider>
      <AnalyticsProvider config={analyticsConfig}>
        <PerformanceOptimizer
          enableLazyLoading={true}
          enableImageOptimization={true}
          enableResourcePreloading={true}
        >
          {/* Your app content */}
        </PerformanceOptimizer>
      </AnalyticsProvider>
    </HelmetProvider>
  );
}

export default App;
```

## SEO 頭部標籤 / SEO Head Tags

### 基本使用 / Basic Usage

```typescript
import { SEOHead } from '@/components/SEO';

function HomePage() {
  return (
    <>
      <SEOHead
        title="AI Formula - 香港AI自動化解決方案平台"
        description="香港領先的AI自動化解決方案平台，提供專業的AI技術服務、教學課程和商業應用指南。"
        keywords="AI自動化,香港AI培訓,ChatGPT課程,Midjourney教學"
        image="/assets/images/og-homepage.jpg"
        url="/"
        type="website"
      />
      <div>
        {/* Page content */}
      </div>
    </>
  );
}
```

### 課程頁面 SEO / Course Page SEO

```typescript
import { SEOHead } from '@/components/SEO';

function CoursePage({ course }) {
  return (
    <>
      <SEOHead
        title={course.title.zh}
        description={course.description.zh}
        keywords={course.keywords}
        image={course.thumbnail}
        url={`/courses/${course.id}`}
        type="course"
        course={{
          name: course.title.zh,
          description: course.description.zh,
          provider: 'AI Formula',
          instructor: course.instructor.name,
          duration: course.duration,
          level: course.level,
          price: course.price?.current,
          category: course.category
        }}
      />
      <div>
        {/* Course content */}
      </div>
    </>
  );
}
```

### 博客文章 SEO / Blog Post SEO

```typescript
import { SEOHead } from '@/components/SEO';

function BlogPost({ post }) {
  return (
    <>
      <SEOHead
        title={post.title.zh}
        description={post.description.zh}
        keywords={post.tags.join(', ')}
        image={post.thumbnail}
        url={`/blog/${post.id}`}
        type="article"
        publishedTime={post.publishedTime}
        modifiedTime={post.modifiedTime}
        author={post.author}
        section={post.category}
        tags={post.tags}
        article={{
          author: post.author,
          publishedTime: post.publishedTime,
          modifiedTime: post.modifiedTime,
          section: post.category,
          tags: post.tags
        }}
      />
      <div>
        {/* Article content */}
      </div>
    </>
  );
}
```

## 結構化數據 / Structured Data

### 組織結構化數據 / Organization Structured Data

```typescript
import { OrganizationSchema } from '@/components/SEO';

function Layout() {
  const organizationData = {
    name: 'AI Formula',
    url: 'https://ai-formula.com',
    logo: 'https://ai-formula.com/assets/images/logo.png',
    description: '香港領先的AI自動化解決方案平台',
    sameAs: [
      'https://www.facebook.com/aiformula',
      'https://www.linkedin.com/company/ai-formula',
      'https://twitter.com/aiformula'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+852-1234-5678',
      email: 'contact@ai-formula.com',
      contactType: 'customer service'
    }
  };

  return (
    <>
      <OrganizationSchema data={organizationData} />
      {/* Layout content */}
    </>
  );
}
```

### 課程結構化數據 / Course Structured Data

```typescript
import { CourseSchema } from '@/components/SEO';

function CoursePage({ course }) {
  const courseData = {
    name: course.title.zh,
    description: course.description.zh,
    provider: 'AI Formula',
    instructor: course.instructor.name,
    duration: course.duration,
    level: course.level,
    price: course.price?.current,
    category: course.category,
    image: course.thumbnail,
    url: `https://ai-formula.com/courses/${course.id}`
  };

  return (
    <>
      <CourseSchema data={courseData} />
      {/* Course content */}
    </>
  );
}
```

### 麵包屑結構化數據 / Breadcrumb Structured Data

```typescript
import { BreadcrumbSchema } from '@/components/SEO';

function CoursePage({ course }) {
  const breadcrumbs = [
    { name: '首頁', url: 'https://ai-formula.com' },
    { name: '課程', url: 'https://ai-formula.com/courses' },
    { name: course.title.zh, url: `https://ai-formula.com/courses/${course.id}` }
  ];

  return (
    <>
      <BreadcrumbSchema breadcrumbs={breadcrumbs} />
      {/* Course content */}
    </>
  );
}
```

### FAQ 結構化數據 / FAQ Structured Data

```typescript
import { FAQSchema } from '@/components/SEO';

function FAQPage() {
  const faqs = [
    {
      question: '什麼是AI自動化？',
      answer: 'AI自動化是指使用人工智能技術來自動執行重複性任務和業務流程...'
    },
    {
      question: '如何開始學習AI工具？',
      answer: '您可以從我們的基礎課程開始，學習ChatGPT、Midjourney等常用AI工具...'
    }
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      {/* FAQ content */}
    </>
  );
}
```

## 網站地圖生成 / Sitemap Generation

### 設置網站地圖 / Setup Sitemap

```typescript
import { SitemapGenerator } from '@/components/SEO';

function AdminPanel() {
  const pages = [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/about', priority: 0.8, changefreq: 'monthly' },
    { url: '/courses', priority: 0.9, changefreq: 'weekly' },
    { url: '/courses/chatgpt-mastery', priority: 0.8, changefreq: 'monthly' },
    { url: '/courses/midjourney-guide', priority: 0.8, changefreq: 'monthly' },
    { url: '/blog', priority: 0.7, changefreq: 'weekly' },
    { url: '/blog/ai-automation-guide', priority: 0.6, changefreq: 'yearly' },
    { url: '/contact', priority: 0.5, changefreq: 'yearly' }
  ];

  return (
    <SitemapGenerator
      baseUrl="https://ai-formula.com"
      pages={pages}
      autoGenerate={true}
    />
  );
}
```

### 動態生成網站地圖 / Dynamic Sitemap Generation

```typescript
import { useEffect, useState } from 'react';
import { SitemapGenerator } from '@/components/SEO';

function DynamicSitemap() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    // 獲取所有課程和文章
    const fetchPages = async () => {
      const courses = await fetchCourses();
      const posts = await fetchBlogPosts();
      
      const dynamicPages = [
        // 靜態頁面
        { url: '/', priority: 1.0, changefreq: 'weekly' },
        { url: '/about', priority: 0.8, changefreq: 'monthly' },
        { url: '/courses', priority: 0.9, changefreq: 'weekly' },
        { url: '/blog', priority: 0.7, changefreq: 'weekly' },
        
        // 動態課程頁面
        ...courses.map(course => ({
          url: `/courses/${course.id}`,
          priority: 0.8,
          changefreq: 'monthly',
          lastmod: course.updatedAt
        })),
        
        // 動態博客頁面
        ...posts.map(post => ({
          url: `/blog/${post.id}`,
          priority: 0.6,
          changefreq: 'yearly',
          lastmod: post.updatedAt
        }))
      ];
      
      setPages(dynamicPages);
    };

    fetchPages();
  }, []);

  return (
    <SitemapGenerator
      baseUrl="https://ai-formula.com"
      pages={pages}
      autoGenerate={true}
    />
  );
}
```

## 性能優化 / Performance Optimization

### 基本性能優化 / Basic Performance Optimization

```typescript
import { PerformanceOptimizer } from '@/components/SEO';

function App() {
  const handleMetricsUpdate = (metrics) => {
    console.log('Performance metrics:', metrics);
    // 發送到分析服務
  };

  return (
    <PerformanceOptimizer
      enableLazyLoading={true}
      enableImageOptimization={true}
      enableResourcePreloading={true}
      onMetricsUpdate={handleMetricsUpdate}
    >
      {/* App content */}
    </PerformanceOptimizer>
  );
}
```

### 圖片優化 / Image Optimization

```typescript
import { performanceUtils } from '@/components/SEO';

function ImageComponent({ src, alt, width, height }) {
  const optimizedSrc = performanceUtils.optimizeImage(src, width, height);
  
  return (
    <img
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
    />
  );
}
```

### 資源預加載 / Resource Preloading

```typescript
import { performanceUtils } from '@/components/SEO';

function HomePage() {
  useEffect(() => {
    // 預加載重要資源
    performanceUtils.preloadResource('/assets/css/critical.css', 'style');
    performanceUtils.preloadResource('/assets/fonts/main.woff2', 'font');
    
    // 預取下一頁資源
    performanceUtils.prefetchResource('/courses');
    
    // 註冊 Service Worker
    performanceUtils.registerServiceWorker();
  }, []);

  return (
    <div>
      {/* Homepage content */}
    </div>
  );
}
```

## 分析追蹤 / Analytics Tracking

### 基本追蹤設置 / Basic Tracking Setup

```typescript
import { useAnalytics } from '@/components/SEO';

function ContactForm() {
  const { trackEvent, trackConversion } = useAnalytics();

  const handleSubmit = (formData) => {
    // 追蹤表單提交事件
    trackEvent('form_submit', {
      form_name: 'contact_form',
      user_type: 'visitor'
    });

    // 追蹤轉換
    trackConversion('contact_form_conversion', 1);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form content */}
    </form>
  );
}
```

### 頁面瀏覽追蹤 / Page View Tracking

```typescript
import { usePageView } from '@/components/SEO';

function CoursePage({ course }) {
  // 自動追蹤頁面瀏覽
  usePageView(`/courses/${course.id}`, course.title.zh);

  return (
    <div>
      {/* Course content */}
    </div>
  );
}
```

### 事件追蹤 / Event Tracking

```typescript
import { useEvent } from '@/components/SEO';

function CourseEnrollButton({ courseId }) {
  const trackEnrollment = useEvent('course_enrollment', {
    course_id: courseId,
    source: 'course_page'
  });

  return (
    <button onClick={trackEnrollment}>
      立即報名
    </button>
  );
}
```

### 高階組件追蹤 / Higher-Order Component Tracking

```typescript
import { withAnalytics } from '@/components/SEO';

const TrackedComponent = withAnalytics(
  function MyComponent() {
    return <div>This component is tracked</div>;
  },
  'component_view'
);
```

## 實際應用範例 / Practical Examples

### 完整的課程頁面 SEO / Complete Course Page SEO

```typescript
import React from 'react';
import { 
  SEOHead, 
  CourseSchema, 
  BreadcrumbSchema, 
  FAQSchema 
} from '@/components/SEO';
import { useAnalytics } from '@/components/SEO';

function CoursePage({ course }) {
  const { trackEvent } = useAnalytics();

  const breadcrumbs = [
    { name: '首頁', url: 'https://ai-formula.com' },
    { name: '課程', url: 'https://ai-formula.com/courses' },
    { name: course.title.zh, url: `https://ai-formula.com/courses/${course.id}` }
  ];

  const courseData = {
    name: course.title.zh,
    description: course.description.zh,
    provider: 'AI Formula',
    instructor: course.instructor.name,
    duration: course.duration,
    level: course.level,
    price: course.price?.current,
    category: course.category,
    image: course.thumbnail,
    url: `https://ai-formula.com/courses/${course.id}`
  };

  const faqs = [
    {
      question: '這個課程適合初學者嗎？',
      answer: '是的，我們的課程從基礎開始，適合各個水平的學習者。'
    },
    {
      question: '完成課程後會獲得證書嗎？',
      answer: '完成所有課程內容後，您將獲得 AI Formula 的完成證書。'
    }
  ];

  const handleEnroll = () => {
    trackEvent('course_enrollment_click', {
      course_id: course.id,
      course_name: course.title.zh,
      price: course.price?.current
    });
  };

  return (
    <>
      <SEOHead
        title={`${course.title.zh} | AI Formula`}
        description={course.description.zh}
        keywords={course.keywords}
        image={course.thumbnail}
        url={`/courses/${course.id}`}
        type="course"
        course={courseData}
      />
      
      <CourseSchema data={courseData} />
      <BreadcrumbSchema breadcrumbs={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      
      <div className="course-page">
        <h1>{course.title.zh}</h1>
        <p>{course.description.zh}</p>
        
        <button onClick={handleEnroll}>
          立即報名
        </button>
        
        <div className="faq-section">
          <h2>常見問題</h2>
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CoursePage;
```

### 完整的博客文章 SEO / Complete Blog Post SEO

```typescript
import React from 'react';
import { 
  SEOHead, 
  ArticleSchema, 
  BreadcrumbSchema 
} from '@/components/SEO';
import { usePageView } from '@/components/SEO';

function BlogPost({ post }) {
  usePageView(`/blog/${post.id}`, post.title.zh);

  const breadcrumbs = [
    { name: '首頁', url: 'https://ai-formula.com' },
    { name: '博客', url: 'https://ai-formula.com/blog' },
    { name: post.title.zh, url: `https://ai-formula.com/blog/${post.id}` }
  ];

  const articleData = {
    headline: post.title.zh,
    description: post.description.zh,
    author: post.author,
    publisher: 'AI Formula',
    publishedTime: post.publishedTime,
    modifiedTime: post.modifiedTime,
    image: post.thumbnail,
    url: `https://ai-formula.com/blog/${post.id}`,
    section: post.category,
    tags: post.tags
  };

  return (
    <>
      <SEOHead
        title={`${post.title.zh} | AI Formula Blog`}
        description={post.description.zh}
        keywords={post.tags.join(', ')}
        image={post.thumbnail}
        url={`/blog/${post.id}`}
        type="article"
        publishedTime={post.publishedTime}
        modifiedTime={post.modifiedTime}
        author={post.author}
        section={post.category}
        tags={post.tags}
        article={articleData}
      />
      
      <ArticleSchema data={articleData} />
      <BreadcrumbSchema breadcrumbs={breadcrumbs} />
      
      <article className="blog-post">
        <h1>{post.title.zh}</h1>
        <div className="meta">
          <span>作者：{post.author}</span>
          <span>發布時間：{post.publishedTime}</span>
          <span>分類：{post.category}</span>
        </div>
        
        <div className="content">
          {post.content}
        </div>
        
        <div className="tags">
          {post.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </article>
    </>
  );
}

export default BlogPost;
```

## 最佳實踐 / Best Practices

### 1. SEO 標題優化 / SEO Title Optimization

```typescript
// ✅ 好的標題
const goodTitle = "ChatGPT 精通課程 - 從零開始學習AI對話技術 | AI Formula";

// ❌ 不好的標題
const badTitle = "課程";

// 最佳實踐：
// - 包含主關鍵詞
// - 長度控制在 50-60 個字符
// - 包含品牌名稱
// - 描述性且吸引人
```

### 2. 描述優化 / Description Optimization

```typescript
// ✅ 好的描述
const goodDescription = "學習ChatGPT的實用技巧，掌握AI對話技術的核心概念。包含實戰案例、提示詞設計和商業應用，適合初學者和進階用戶。";

// ❌ 不好的描述
const badDescription = "這是一個課程";

// 最佳實踐：
// - 長度控制在 150-160 個字符
// - 包含關鍵詞
// - 描述具體的價值和內容
// - 包含呼籲行動
```

### 3. 圖片優化 / Image Optimization

```typescript
// ✅ 好的圖片設置
<img
  src="/assets/images/courses/chatgpt-mastery.webp"
  alt="ChatGPT精通課程 - 學習AI對話技術和實用技巧"
  width={1200}
  height={630}
  loading="lazy"
  decoding="async"
/>

// 最佳實踐：
// - 使用 WebP 格式
// - 設置適當的尺寸
// - 包含描述性的 alt 文本
// - 使用延遲加載
```

### 4. 結構化數據最佳實踐 / Structured Data Best Practices

```typescript
// 確保數據完整性
const courseData = {
  name: course.title.zh,
  description: course.description.zh,
  provider: 'AI Formula',
  instructor: course.instructor.name,
  duration: course.duration,
  level: course.level,
  price: course.price?.current,
  category: course.category,
  image: course.thumbnail,
  url: `https://ai-formula.com/courses/${course.id}`,
  // 添加更多相關資訊
  inLanguage: 'zh-HK',
  courseMode: 'online',
  availableLanguage: ['zh-HK', 'en-US']
};
```

### 5. 性能優化最佳實踐 / Performance Optimization Best Practices

```typescript
// 關鍵資源優先加載
useEffect(() => {
  // 預加載關鍵 CSS
  performanceUtils.preloadResource('/assets/css/critical.css', 'style');
  
  // 預加載重要字體
  performanceUtils.preloadResource('/assets/fonts/main.woff2', 'font');
  
  // 延遲加載非關鍵資源
  setTimeout(() => {
    performanceUtils.prefetchResource('/assets/js/analytics.js');
  }, 2000);
}, []);
```

### 6. 分析追蹤最佳實踐 / Analytics Tracking Best Practices

```typescript
// 統一的事件命名規範
const trackingEvents = {
  COURSE_VIEW: 'course_view',
  COURSE_ENROLLMENT: 'course_enrollment',
  LESSON_COMPLETE: 'lesson_complete',
  FORM_SUBMIT: 'form_submit',
  DOWNLOAD_RESOURCE: 'download_resource'
};

// 使用一致的參數結構
const trackCourseView = (courseId, courseName) => {
  trackEvent(trackingEvents.COURSE_VIEW, {
    course_id: courseId,
    course_name: courseName,
    timestamp: Date.now(),
    user_language: language
  });
};
```

## 🎯 完成檢查清單 / Completion Checklist

### 技術設置 / Technical Setup
- [ ] 安裝 react-helmet-async
- [ ] 設置環境變數
- [ ] 配置 HelmetProvider
- [ ] 集成 AnalyticsProvider
- [ ] 配置 PerformanceOptimizer

### SEO 內容 / SEO Content
- [ ] 所有頁面都有獨特的標題
- [ ] 所有頁面都有描述性的 meta 描述
- [ ] 關鍵詞研究和優化
- [ ] 圖片都有 alt 文本
- [ ] 內部鏈接結構優化

### 結構化數據 / Structured Data
- [ ] 組織結構化數據
- [ ] 課程結構化數據
- [ ] 文章結構化數據
- [ ] 麵包屑結構化數據
- [ ] FAQ 結構化數據

### 技術 SEO / Technical SEO
- [ ] XML 網站地圖生成
- [ ] robots.txt 文件
- [ ] 網站速度優化
- [ ] 移動友好性
- [ ] HTTPS 設置

### 分析和監控 / Analytics and Monitoring
- [ ] Google Analytics 設置
- [ ] Google Search Console
- [ ] 性能監控
- [ ] 錯誤追蹤
- [ ] 轉換追蹤

### 測試和驗證 / Testing and Validation
- [ ] 使用 Google Rich Results Test
- [ ] 驗證結構化數據
- [ ] 測試頁面速度
- [ ] 檢查移動友好性
- [ ] 驗證分析追蹤

完成這個 SEO 設置後，您的網站將具備完整的搜索引擎優化功能，包括技術 SEO、內容優化和性能監控。

After completing this SEO setup, your website will have comprehensive search engine optimization features, including technical SEO, content optimization, and performance monitoring. 