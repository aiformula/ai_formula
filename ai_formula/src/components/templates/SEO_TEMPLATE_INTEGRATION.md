# 🔗 SEO 模板整合指南 / SEO Template Integration Guide

## 概述 / Overview

本指南展示如何將 SEO 系統與現有的 CourseTemplate 和 BlogTemplate 整合，實現完整的 SEO 優化。

This guide shows how to integrate the SEO system with existing CourseTemplate and BlogTemplate for complete SEO optimization.

## 🎯 整合 CourseTemplate 與 SEO / Integrating CourseTemplate with SEO

### 1. 增強的 CourseTemplate

```typescript
// src/components/templates/CourseTemplate.tsx
import React, { useEffect } from 'react';
import { 
  SEOHead, 
  CourseSchema, 
  BreadcrumbSchema,
  FAQSchema 
} from '@/components/SEO';
import { useAnalytics } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';

interface EnhancedCourseTemplateProps {
  course: Course;
  displayMode: 'course' | 'outline' | 'learning';
  showProgress?: boolean;
  showEnrollment?: boolean;
  showNotes?: boolean;
  showQuiz?: boolean;
  currentLesson?: number;
  highlightModule?: number;
  // SEO 相關屬性
  seoData?: {
    customTitle?: string;
    customDescription?: string;
    customKeywords?: string;
    customImage?: string;
    faqs?: Array<{ question: string; answer: string }>;
  };
  // 分析追蹤
  trackingEvents?: {
    onView?: string;
    onEnroll?: string;
    onComplete?: string;
  };
}

export const CourseTemplate: React.FC<EnhancedCourseTemplateProps> = ({
  course,
  displayMode,
  showProgress = true,
  showEnrollment = true,
  showNotes = false,
  showQuiz = false,
  currentLesson = 0,
  highlightModule = 0,
  seoData,
  trackingEvents,
  ...props
}) => {
  const { language } = useLanguage();
  const { trackEvent, trackPageView } = useAnalytics();

  // 生成 SEO 數據
  const generateSEOData = () => {
    const baseTitle = language === 'zh-TW' ? course.title.zh : course.title.en;
    const baseDescription = language === 'zh-TW' ? course.description.zh : course.description.en;
    
    return {
      title: seoData?.customTitle || `${baseTitle} | AI Formula`,
      description: seoData?.customDescription || baseDescription,
      keywords: seoData?.customKeywords || `${course.category}, AI課程, ${course.level}`,
      image: seoData?.customImage || course.thumbnail,
      url: `/courses/${course.id}`,
      type: 'course' as const,
      course: {
        name: baseTitle,
        description: baseDescription,
        provider: 'AI Formula',
        instructor: course.instructor.name,
        duration: course.duration,
        level: course.level,
        price: course.price?.current,
        category: course.category,
        image: course.thumbnail,
        url: `https://ai-formula.com/courses/${course.id}`
      }
    };
  };

  // 生成麵包屑
  const generateBreadcrumbs = () => {
    const homeLabel = language === 'zh-TW' ? '首頁' : 'Home';
    const coursesLabel = language === 'zh-TW' ? '課程' : 'Courses';
    const courseTitle = language === 'zh-TW' ? course.title.zh : course.title.en;
    
    return [
      { name: homeLabel, url: 'https://ai-formula.com' },
      { name: coursesLabel, url: 'https://ai-formula.com/courses' },
      { name: courseTitle, url: `https://ai-formula.com/courses/${course.id}` }
    ];
  };

  // 生成 FAQ 數據
  const generateFAQs = () => {
    if (seoData?.faqs) return seoData.faqs;
    
    // 預設 FAQ（根據語言）
    return language === 'zh-TW' ? [
      {
        question: '這個課程適合初學者嗎？',
        answer: '是的，我們的課程從基礎開始教學，適合各種水平的學習者。'
      },
      {
        question: '完成課程後會獲得證書嗎？',
        answer: '完成所有課程內容和評估後，您將獲得 AI Formula 的完成證書。'
      },
      {
        question: '課程內容會定期更新嗎？',
        answer: '是的，我們會根據最新的AI技術發展定期更新課程內容。'
      }
    ] : [
      {
        question: 'Is this course suitable for beginners?',
        answer: 'Yes, our courses start from the basics and are suitable for learners of all levels.'
      },
      {
        question: 'Will I receive a certificate after completing the course?',
        answer: 'Yes, you will receive an AI Formula completion certificate after finishing all course content and assessments.'
      },
      {
        question: 'Are the course contents updated regularly?',
        answer: 'Yes, we regularly update our course content based on the latest AI technology developments.'
      }
    ];
  };

  // 追蹤頁面瀏覽
  useEffect(() => {
    const title = language === 'zh-TW' ? course.title.zh : course.title.en;
    trackPageView(`/courses/${course.id}`, title);
    
    // 追蹤課程瀏覽事件
    if (trackingEvents?.onView) {
      trackEvent(trackingEvents.onView, {
        course_id: course.id,
        course_name: title,
        display_mode: displayMode,
        user_language: language
      });
    }
  }, [course.id, displayMode, language]);

  // 處理註冊事件
  const handleEnrollClick = () => {
    if (trackingEvents?.onEnroll) {
      trackEvent(trackingEvents.onEnroll, {
        course_id: course.id,
        course_name: language === 'zh-TW' ? course.title.zh : course.title.en,
        price: course.price?.current,
        user_language: language
      });
    }
    
    // 執行註冊邏輯
    if (props.onEnroll) {
      props.onEnroll(course.id);
    }
  };

  // 處理完成事件
  const handleCourseComplete = () => {
    if (trackingEvents?.onComplete) {
      trackEvent(trackingEvents.onComplete, {
        course_id: course.id,
        course_name: language === 'zh-TW' ? course.title.zh : course.title.en,
        completion_time: Date.now(),
        user_language: language
      });
    }
    
    if (props.onComplete) {
      props.onComplete(course.id);
    }
  };

  const seoData = generateSEOData();
  const breadcrumbs = generateBreadcrumbs();
  const faqs = generateFAQs();

  return (
    <>
      {/* SEO 頭部標籤 */}
      <SEOHead {...seoData} />
      
      {/* 結構化數據 */}
      <CourseSchema data={seoData.course} />
      <BreadcrumbSchema breadcrumbs={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      
      {/* 課程內容 */}
      <div className="course-template">
        {/* 原有的課程模板內容 */}
        <div className="course-header">
          <h1>{language === 'zh-TW' ? course.title.zh : course.title.en}</h1>
          <p>{language === 'zh-TW' ? course.description.zh : course.description.en}</p>
          
          {showEnrollment && (
            <button 
              onClick={handleEnrollClick}
              className="enroll-button"
            >
              {language === 'zh-TW' ? '立即報名' : 'Enroll Now'}
            </button>
          )}
        </div>
        
        {/* 課程內容根據 displayMode 渲染 */}
        {displayMode === 'course' && (
          <div className="course-overview">
            {/* 課程概覽內容 */}
          </div>
        )}
        
        {displayMode === 'outline' && (
          <div className="course-outline">
            {/* 課程大綱內容 */}
          </div>
        )}
        
        {displayMode === 'learning' && (
          <div className="course-learning">
            {/* 學習界面內容 */}
          </div>
        )}
        
        {/* FAQ 部分 */}
        <div className="faq-section">
          <h2>{language === 'zh-TW' ? '常見問題' : 'FAQ'}</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
```

### 2. 使用範例 / Usage Example

```typescript
// src/pages/courses/AIWritingAssistantCourse.tsx
import React from 'react';
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
      // SEO 自定義設置
      seoData={{
        customTitle: 'AI寫作助手精通課程 - 學習ChatGPT寫作技巧',
        customDescription: '掌握AI寫作工具的使用技巧，提升寫作效率和質量。包含ChatGPT、Claude等工具的實戰應用。',
        customKeywords: 'AI寫作, ChatGPT寫作, 人工智能寫作, 寫作效率, 內容創作',
        customImage: '/assets/images/courses/ai-writing-assistant-seo.jpg',
        faqs: [
          {
            question: '學習AI寫作需要編程背景嗎？',
            answer: '不需要，本課程專注於工具使用和寫作技巧，無需編程基礎。'
          },
          {
            question: '課程包含哪些AI寫作工具？',
            answer: '包含ChatGPT、Claude、Jasper、Copy.ai等主流AI寫作工具的使用方法。'
          }
        ]
      }}
      // 分析追蹤設置
      trackingEvents={{
        onView: 'course_view',
        onEnroll: 'course_enrollment',
        onComplete: 'course_completion'
      }}
      onEnroll={(courseId) => {
        console.log('Enrolled in course:', courseId);
        // 處理註冊邏輯
      }}
      onComplete={(courseId) => {
        console.log('Course completed:', courseId);
        // 處理完成邏輯
      }}
    />
  );
}
```

## 🎯 整合 BlogTemplate 與 SEO / Integrating BlogTemplate with SEO

### 1. 增強的 BlogTemplate

```typescript
// src/components/templates/BlogTemplate.tsx
import React, { useEffect } from 'react';
import { 
  SEOHead, 
  ArticleSchema, 
  BreadcrumbSchema 
} from '@/components/SEO';
import { useAnalytics } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';

interface EnhancedBlogTemplateProps {
  post: BlogPost;
  displayMode: 'list' | 'detail';
  showAuthor?: boolean;
  showTags?: boolean;
  showSharing?: boolean;
  showRelated?: boolean;
  // SEO 相關屬性
  seoData?: {
    customTitle?: string;
    customDescription?: string;
    customKeywords?: string;
    customImage?: string;
  };
  // 分析追蹤
  trackingEvents?: {
    onView?: string;
    onShare?: string;
    onBookmark?: string;
  };
}

export const BlogTemplate: React.FC<EnhancedBlogTemplateProps> = ({
  post,
  displayMode,
  showAuthor = true,
  showTags = true,
  showSharing = true,
  showRelated = true,
  seoData,
  trackingEvents,
  ...props
}) => {
  const { language } = useLanguage();
  const { trackEvent, trackPageView } = useAnalytics();

  // 生成 SEO 數據
  const generateSEOData = () => {
    const baseTitle = language === 'zh-TW' ? post.title.zh : post.title.en;
    const baseDescription = language === 'zh-TW' ? post.description.zh : post.description.en;
    
    return {
      title: seoData?.customTitle || `${baseTitle} | AI Formula Blog`,
      description: seoData?.customDescription || baseDescription,
      keywords: seoData?.customKeywords || post.tags.join(', '),
      image: seoData?.customImage || post.thumbnail,
      url: `/blog/${post.id}`,
      type: 'article' as const,
      publishedTime: post.publishedTime,
      modifiedTime: post.modifiedTime,
      author: post.author,
      section: post.category,
      tags: post.tags,
      article: {
        headline: baseTitle,
        description: baseDescription,
        author: post.author,
        publisher: 'AI Formula',
        publishedTime: post.publishedTime,
        modifiedTime: post.modifiedTime,
        image: post.thumbnail,
        url: `https://ai-formula.com/blog/${post.id}`,
        section: post.category,
        tags: post.tags
      }
    };
  };

  // 生成麵包屑
  const generateBreadcrumbs = () => {
    const homeLabel = language === 'zh-TW' ? '首頁' : 'Home';
    const blogLabel = language === 'zh-TW' ? '博客' : 'Blog';
    const postTitle = language === 'zh-TW' ? post.title.zh : post.title.en;
    
    return [
      { name: homeLabel, url: 'https://ai-formula.com' },
      { name: blogLabel, url: 'https://ai-formula.com/blog' },
      { name: postTitle, url: `https://ai-formula.com/blog/${post.id}` }
    ];
  };

  // 追蹤頁面瀏覽
  useEffect(() => {
    if (displayMode === 'detail') {
      const title = language === 'zh-TW' ? post.title.zh : post.title.en;
      trackPageView(`/blog/${post.id}`, title);
      
      // 追蹤文章瀏覽事件
      if (trackingEvents?.onView) {
        trackEvent(trackingEvents.onView, {
          post_id: post.id,
          post_title: title,
          post_category: post.category,
          post_author: post.author,
          user_language: language
        });
      }
    }
  }, [post.id, displayMode, language]);

  // 處理分享事件
  const handleShare = (platform: string) => {
    if (trackingEvents?.onShare) {
      trackEvent(trackingEvents.onShare, {
        post_id: post.id,
        post_title: language === 'zh-TW' ? post.title.zh : post.title.en,
        platform: platform,
        user_language: language
      });
    }
  };

  // 處理收藏事件
  const handleBookmark = () => {
    if (trackingEvents?.onBookmark) {
      trackEvent(trackingEvents.onBookmark, {
        post_id: post.id,
        post_title: language === 'zh-TW' ? post.title.zh : post.title.en,
        user_language: language
      });
    }
  };

  const seoData = generateSEOData();
  const breadcrumbs = generateBreadcrumbs();

  return (
    <>
      {/* 只在詳情頁面顯示 SEO 標籤 */}
      {displayMode === 'detail' && (
        <>
          <SEOHead {...seoData} />
          <ArticleSchema data={seoData.article} />
          <BreadcrumbSchema breadcrumbs={breadcrumbs} />
        </>
      )}
      
      {/* 博客內容 */}
      <div className="blog-template">
        {displayMode === 'list' && (
          <div className="blog-list-item">
            {/* 列表項目內容 */}
          </div>
        )}
        
        {displayMode === 'detail' && (
          <article className="blog-detail">
            <header className="blog-header">
              <h1>{language === 'zh-TW' ? post.title.zh : post.title.en}</h1>
              
              {showAuthor && (
                <div className="blog-meta">
                  <span>{language === 'zh-TW' ? '作者：' : 'By '}{post.author}</span>
                  <span>{language === 'zh-TW' ? '發布時間：' : 'Published: '}{post.publishedTime}</span>
                  <span>{language === 'zh-TW' ? '分類：' : 'Category: '}{post.category}</span>
                </div>
              )}
            </header>
            
            <div className="blog-content">
              {language === 'zh-TW' ? post.content.zh : post.content.en}
            </div>
            
            {showTags && (
              <div className="blog-tags">
                <h3>{language === 'zh-TW' ? '標籤：' : 'Tags:'}</h3>
                {post.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
            
            {showSharing && (
              <div className="blog-sharing">
                <h3>{language === 'zh-TW' ? '分享文章：' : 'Share:'}</h3>
                <button onClick={() => handleShare('facebook')}>Facebook</button>
                <button onClick={() => handleShare('twitter')}>Twitter</button>
                <button onClick={() => handleShare('linkedin')}>LinkedIn</button>
                <button onClick={handleBookmark}>
                  {language === 'zh-TW' ? '收藏' : 'Bookmark'}
                </button>
              </div>
            )}
          </article>
        )}
      </div>
    </>
  );
};
```

### 2. 使用範例 / Usage Example

```typescript
// src/pages/blog/BlogPost.tsx
import React from 'react';
import { BlogTemplate } from '@/components/templates';
import { useParams } from 'react-router-dom';
import { blogPosts } from '@/data/blog/blogPosts';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return <div>文章不存在</div>;
  }

  return (
    <BlogTemplate
      post={post}
      displayMode="detail"
      showAuthor={true}
      showTags={true}
      showSharing={true}
      showRelated={true}
      // SEO 自定義設置
      seoData={{
        customTitle: `${post.title.zh} - AI Formula 專業AI技術博客`,
        customDescription: `${post.description.zh} 了解更多AI技術應用和最新趨勢。`,
        customKeywords: `${post.tags.join(', ')}, AI技術, 人工智能, 技術博客`,
        customImage: `/assets/images/blog/${post.id}-seo.jpg`
      }}
      // 分析追蹤設置
      trackingEvents={{
        onView: 'blog_post_view',
        onShare: 'blog_post_share',
        onBookmark: 'blog_post_bookmark'
      }}
    />
  );
}
```

## 🎯 全域 SEO 設置 / Global SEO Setup

### 1. 更新 App.tsx

```typescript
// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnalyticsProvider, PerformanceOptimizer } from '@/components/SEO';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';

// 頁面組件
import HomePage from '@/pages/general/HomePage';
import CourseDetail from '@/pages/courses/CourseDetail';
import BlogPost from '@/pages/blog/BlogPost';

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
          <LanguageProvider>
            <AuthProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/courses/:id" element={<CourseDetail />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  {/* 其他路由 */}
                </Routes>
              </Router>
            </AuthProvider>
          </LanguageProvider>
        </PerformanceOptimizer>
      </AnalyticsProvider>
    </HelmetProvider>
  );
}

export default App;
```

### 2. 創建 SEO 管理頁面

```typescript
// src/pages/admin/SEOManager.tsx
import React, { useState, useEffect } from 'react';
import { SitemapGenerator } from '@/components/SEO';
import { courseData } from '@/data/courses';
import { blogPosts } from '@/data/blog/blogPosts';

export default function SEOManager() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    // 生成所有頁面的 sitemap 數據
    const generatePages = () => {
      const staticPages = [
        { url: '/', priority: 1.0, changefreq: 'weekly', lastmod: new Date().toISOString() },
        { url: '/about', priority: 0.8, changefreq: 'monthly' },
        { url: '/courses', priority: 0.9, changefreq: 'weekly' },
        { url: '/blog', priority: 0.7, changefreq: 'weekly' }
      ];

      const coursePages = courseData.map(course => ({
        url: `/courses/${course.id}`,
        priority: 0.8,
        changefreq: 'monthly',
        lastmod: course.updatedAt || new Date().toISOString()
      }));

      const blogPages = blogPosts.map(post => ({
        url: `/blog/${post.id}`,
        priority: 0.6,
        changefreq: 'yearly',
        lastmod: post.modifiedTime || post.publishedTime
      }));

      return [...staticPages, ...coursePages, ...blogPages];
    };

    setPages(generatePages());
  }, []);

  return (
    <div className="seo-manager">
      <h1>SEO 管理面板</h1>
      
      <SitemapGenerator
        baseUrl="https://ai-formula.com"
        pages={pages}
        autoGenerate={false}
      />
      
      <div className="seo-metrics">
        <h2>SEO 指標</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <h3>總頁面數</h3>
            <p>{pages.length}</p>
          </div>
          <div className="metric-card">
            <h3>課程頁面</h3>
            <p>{courseData.length}</p>
          </div>
          <div className="metric-card">
            <h3>博客文章</h3>
            <p>{blogPosts.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## 🎯 環境變數設置 / Environment Variables Setup

### .env 文件設置

```env
# 網站基本設置
VITE_SITE_URL=https://ai-formula.com
VITE_SITE_NAME=AI Formula

# Google Analytics
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Google Tag Manager
VITE_GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX

# Facebook Pixel
VITE_FACEBOOK_PIXEL_ID=123456789

# Hotjar
VITE_HOTJAR_ID=1234567

# 開發模式設置
VITE_ENABLE_SEO_DEBUG=true
VITE_ENABLE_PERFORMANCE_METRICS=true
```

## 🎯 最佳實踐總結 / Best Practices Summary

### 1. 模板使用最佳實踐

- **統一 SEO 設置：** 所有模板都包含基本的 SEO 組件
- **自定義靈活性：** 允許每個頁面自定義 SEO 數據
- **分析追蹤：** 內建分析事件追蹤功能
- **多語言支持：** 根據語言自動生成對應的 SEO 內容

### 2. 性能優化最佳實踐

- **延遲加載：** 圖片和非關鍵資源延遲加載
- **預加載：** 關鍵資源提前加載
- **代碼分割：** 按需加載組件
- **快取策略：** 適當的快取設置

### 3. 分析追蹤最佳實踐

- **事件命名：** 使用統一的事件命名規範
- **用戶隱私：** 實現 GDPR 相容的同意管理
- **多平台追蹤：** 支援多個分析平台
- **轉換追蹤：** 追蹤重要的業務指標

### 4. SEO 內容最佳實踐

- **獨特性：** 每個頁面都有獨特的標題和描述
- **關鍵詞：** 合理使用關鍵詞，避免過度優化
- **結構化數據：** 使用適當的 Schema.org 標記
- **內部連結：** 良好的內部連結結構

透過這個整合指南，您可以將 SEO 系統無縫集成到現有的模板中，實現全面的搜索引擎優化。

Through this integration guide, you can seamlessly integrate the SEO system into existing templates for comprehensive search engine optimization. 