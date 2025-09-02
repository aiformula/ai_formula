# ?? SEO 模板?��??��? / SEO Template Integration Guide

## 概述 / Overview

?��??��?示�?何�? SEO 系統?�現?��? CourseTemplate ??BlogTemplate ?��?，實?��??��? SEO ?��???

This guide shows how to integrate the SEO system with existing CourseTemplate and BlogTemplate for complete SEO optimization.

## ?�� ?��? CourseTemplate ??SEO / Integrating CourseTemplate with SEO

### 1. 增強??CourseTemplate

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
  // SEO ?��?屬�?
  seoData?: {
    customTitle?: string;
    customDescription?: string;
    customKeywords?: string;
    customImage?: string;
    faqs?: Array<{ question: string; answer: string }>;
  };
  // ?��?追蹤
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

  // ?��? SEO ?��?
  const generateSEOData = () => {
    const baseTitle = language === 'zh-HK' ? course.title.zh : course.title.en;
    const baseDescription = language === 'zh-HK' ? course.description.zh : course.description.en;
    
    return {
      title: seoData?.customTitle || `${baseTitle} | AI Formula`,
      description: seoData?.customDescription || baseDescription,
      keywords: seoData?.customKeywords || `${course.category}, AI課�?, ${course.level}`,
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

  // ?��?麵�?�?
  const generateBreadcrumbs = () => {
    const homeLabel = language === 'zh-HK' ? '首�?' : 'Home';
    const coursesLabel = language === 'zh-HK' ? '課�?' : 'Courses';
    const courseTitle = language === 'zh-HK' ? course.title.zh : course.title.en;
    
    return [
      { name: homeLabel, url: 'https://ai-formula.com' },
      { name: coursesLabel, url: 'https://ai-formula.com/courses' },
      { name: courseTitle, url: `https://ai-formula.com/courses/${course.id}` }
    ];
  };

  // ?��? FAQ ?��?
  const generateFAQs = () => {
    if (seoData?.faqs) return seoData.faqs;
    
    // ?�設 FAQ（根?��?言�?
    return language === 'zh-HK' ? [
      {
        question: '?�個課程適?��?學者�?�?,
        answer: '?��?，�??��?課�?從基礎�?始�?學�??��??�種水平?�學習者�?
      },
      {
        question: '完�?課�?後�??��?證書?��?',
        answer: '完�??�?�課程內容�?評估後�??��??��? AI Formula ?��??��??��?
      },
      {
        question: '課�??�容?��??�更?��?�?,
        answer: '?��?，�??��??��??�?��?AI?�術發展�??�更?�課程內容�?
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

  // 追蹤?�面?�覽
  useEffect(() => {
    const title = language === 'zh-HK' ? course.title.zh : course.title.en;
    trackPageView(`/courses/${course.id}`, title);
    
    // 追蹤課�??�覽事件
    if (trackingEvents?.onView) {
      trackEvent(trackingEvents.onView, {
        course_id: course.id,
        course_name: title,
        display_mode: displayMode,
        user_language: language
      });
    }
  }, [course.id, displayMode, language]);

  // ?��?註�?事件
  const handleEnrollClick = () => {
    if (trackingEvents?.onEnroll) {
      trackEvent(trackingEvents.onEnroll, {
        course_id: course.id,
        course_name: language === 'zh-HK' ? course.title.zh : course.title.en,
        price: course.price?.current,
        user_language: language
      });
    }
    
    // ?��?註�??�輯
    if (props.onEnroll) {
      props.onEnroll(course.id);
    }
  };

  // ?��?完�?事件
  const handleCourseComplete = () => {
    if (trackingEvents?.onComplete) {
      trackEvent(trackingEvents.onComplete, {
        course_id: course.id,
        course_name: language === 'zh-HK' ? course.title.zh : course.title.en,
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
      {/* SEO ?�部標籤 */}
      <SEOHead {...seoData} />
      
      {/* 結�??�數??*/}
      <CourseSchema data={seoData.course} />
      <BreadcrumbSchema breadcrumbs={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      
      {/* 課�??�容 */}
      <div className="course-template">
        {/* ?��??�課程模?�內�?*/}
        <div className="course-header">
          <h1>{language === 'zh-HK' ? course.title.zh : course.title.en}</h1>
          <p>{language === 'zh-HK' ? course.description.zh : course.description.en}</p>
          
          {showEnrollment && (
            <button 
              onClick={handleEnrollClick}
              className="enroll-button"
            >
              {language === 'zh-HK' ? '立即?��?' : 'Enroll Now'}
            </button>
          )}
        </div>
        
        {/* 課�??�容?��? displayMode 渲�? */}
        {displayMode === 'course' && (
          <div className="course-overview">
            {/* 課�?概覽?�容 */}
          </div>
        )}
        
        {displayMode === 'outline' && (
          <div className="course-outline">
            {/* 課�?大綱?�容 */}
          </div>
        )}
        
        {displayMode === 'learning' && (
          <div className="course-learning">
            {/* 學�??�面?�容 */}
          </div>
        )}
        
        {/* FAQ ?��? */}
        <div className="faq-section">
          <h2>{language === 'zh-HK' ? '常�??��?' : 'FAQ'}</h2>
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

### 2. 使用範�? / Usage Example

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
      // SEO ?��?義設�?
      seoData={{
        customTitle: 'AI寫�??��?精通課�?- 學�?ChatGPT寫�??��?,
        customDescription: '?�握AI寫�?工具?�使?��?巧�??��?寫�??��??�質?�。�??�ChatGPT?�Claude等工?��?實戰?�用??,
        customKeywords: 'AI寫�?, ChatGPT寫�?, 人工?�能寫�?, 寫�??��?, ?�容?��?',
        customImage: '/assets/images/courses/ai-writing-assistant-seo.jpg',
        faqs: [
          {
            question: '學�?AI寫�??�要編程�??��?�?,
            answer: '不�?要�??�課程�?注於工具使用?�寫作�?巧�??��?編�??��???
          },
          {
            question: '課�??�含?��?AI寫�?工具�?,
            answer: '?�含ChatGPT?�Claude?�Jasper?�Copy.ai等主流AI寫�?工具?�使?�方法�?
          }
        ]
      }}
      // ?��?追蹤設置
      trackingEvents={{
        onView: 'course_view',
        onEnroll: 'course_enrollment',
        onComplete: 'course_completion'
      }}
      onEnroll={(courseId) => {
        console.log('Enrolled in course:', courseId);
        // ?��?註�??�輯
      }}
      onComplete={(courseId) => {
        console.log('Course completed:', courseId);
        // ?��?完�??�輯
      }}
    />
  );
}
```

## ?�� ?��? BlogTemplate ??SEO / Integrating BlogTemplate with SEO

### 1. 增強??BlogTemplate

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
  // SEO ?��?屬�?
  seoData?: {
    customTitle?: string;
    customDescription?: string;
    customKeywords?: string;
    customImage?: string;
  };
  // ?��?追蹤
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

  // ?��? SEO ?��?
  const generateSEOData = () => {
    const baseTitle = language === 'zh-HK' ? post.title.zh : post.title.en;
    const baseDescription = language === 'zh-HK' ? post.description.zh : post.description.en;
    
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

  // ?��?麵�?�?
  const generateBreadcrumbs = () => {
    const homeLabel = language === 'zh-HK' ? '首�?' : 'Home';
    const blogLabel = language === 'zh-HK' ? '?�客' : 'Blog';
    const postTitle = language === 'zh-HK' ? post.title.zh : post.title.en;
    
    return [
      { name: homeLabel, url: 'https://ai-formula.com' },
      { name: blogLabel, url: 'https://ai-formula.com/blog' },
      { name: postTitle, url: `https://ai-formula.com/blog/${post.id}` }
    ];
  };

  // 追蹤?�面?�覽
  useEffect(() => {
    if (displayMode === 'detail') {
      const title = language === 'zh-HK' ? post.title.zh : post.title.en;
      trackPageView(`/blog/${post.id}`, title);
      
      // 追蹤?��??�覽事件
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

  // ?��??�享事件
  const handleShare = (platform: string) => {
    if (trackingEvents?.onShare) {
      trackEvent(trackingEvents.onShare, {
        post_id: post.id,
        post_title: language === 'zh-HK' ? post.title.zh : post.title.en,
        platform: platform,
        user_language: language
      });
    }
  };

  // ?��??��?事件
  const handleBookmark = () => {
    if (trackingEvents?.onBookmark) {
      trackEvent(trackingEvents.onBookmark, {
        post_id: post.id,
        post_title: language === 'zh-HK' ? post.title.zh : post.title.en,
        user_language: language
      });
    }
  };

  const seoData = generateSEOData();
  const breadcrumbs = generateBreadcrumbs();

  return (
    <>
      {/* ?�在詳�??�面顯示 SEO 標籤 */}
      {displayMode === 'detail' && (
        <>
          <SEOHead {...seoData} />
          <ArticleSchema data={seoData.article} />
          <BreadcrumbSchema breadcrumbs={breadcrumbs} />
        </>
      )}
      
      {/* ?�客?�容 */}
      <div className="blog-template">
        {displayMode === 'list' && (
          <div className="blog-list-item">
            {/* ?�表?�目?�容 */}
          </div>
        )}
        
        {displayMode === 'detail' && (
          <article className="blog-detail">
            <header className="blog-header">
              <h1>{language === 'zh-HK' ? post.title.zh : post.title.en}</h1>
              
              {showAuthor && (
                <div className="blog-meta">
                  <span>{language === 'zh-HK' ? '作者�?' : 'By '}{post.author}</span>
                  <span>{language === 'zh-HK' ? '?��??��?�? : 'Published: '}{post.publishedTime}</span>
                  <span>{language === 'zh-HK' ? '?��?�? : 'Category: '}{post.category}</span>
                </div>
              )}
            </header>
            
            <div className="blog-content">
              {language === 'zh-HK' ? post.content.zh : post.content.en}
            </div>
            
            {showTags && (
              <div className="blog-tags">
                <h3>{language === 'zh-HK' ? '標籤�? : 'Tags:'}</h3>
                {post.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
            
            {showSharing && (
              <div className="blog-sharing">
                <h3>{language === 'zh-HK' ? '?�享?��?�? : 'Share:'}</h3>
                <button onClick={() => handleShare('facebook')}>Facebook</button>
                <button onClick={() => handleShare('twitter')}>Twitter</button>
                <button onClick={() => handleShare('linkedin')}>LinkedIn</button>
                <button onClick={handleBookmark}>
                  {language === 'zh-HK' ? '?��?' : 'Bookmark'}
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

### 2. 使用範�? / Usage Example

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
    return <div>?��?不�???/div>;
  }

  return (
    <BlogTemplate
      post={post}
      displayMode="detail"
      showAuthor={true}
      showTags={true}
      showSharing={true}
      showRelated={true}
      // SEO ?��?義設�?
      seoData={{
        customTitle: `${post.title.zh} - AI Formula 專業AI?�術�?客`,
        customDescription: `${post.description.zh} 了解?��?AI?�術�??��??�?�趨?�。`,
        customKeywords: `${post.tags.join(', ')}, AI?��? 人工?�能, ?�術�?客`,
        customImage: `/assets/images/blog/${post.id}-seo.jpg`
      }}
      // ?��?追蹤設置
      trackingEvents={{
        onView: 'blog_post_view',
        onShare: 'blog_post_share',
        onBookmark: 'blog_post_bookmark'
      }}
    />
  );
}
```

## ?�� ?��? SEO 設置 / Global SEO Setup

### 1. ?�新 App.tsx

```typescript
// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnalyticsProvider, PerformanceOptimizer } from '@/components/SEO';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';

// ?�面組件
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
                  {/* ?��?路由 */}
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

### 2. ?�建 SEO 管�??�面

```typescript
// src/pages/admin/SEOManager.tsx
import React, { useState, useEffect } from 'react';
import { SitemapGenerator } from '@/components/SEO';
import { courseData } from '@/data/courses';
import { blogPosts } from '@/data/blog/blogPosts';

export default function SEOManager() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    // ?��??�?��??��? sitemap ?��?
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
      <h1>SEO 管�??�板</h1>
      
      <SitemapGenerator
        baseUrl="https://ai-formula.com"
        pages={pages}
        autoGenerate={false}
      />
      
      <div className="seo-metrics">
        <h2>SEO ?��?</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <h3>總�??�數</h3>
            <p>{pages.length}</p>
          </div>
          <div className="metric-card">
            <h3>課�??�面</h3>
            <p>{courseData.length}</p>
          </div>
          <div className="metric-card">
            <h3>?�客?��?</h3>
            <p>{blogPosts.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## ?�� ?��?變數設置 / Environment Variables Setup

### .env ?�件設置

```env
# 網�??�本設置
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

# ?�發模�?設置
VITE_ENABLE_SEO_DEBUG=true
VITE_ENABLE_PERFORMANCE_METRICS=true
```

## ?�� ?�佳實踐總�?/ Best Practices Summary

### 1. 模板使用?�佳實�?

- **統�? SEO 設置�?* ?�?�模?�都?�含?�本??SEO 組件
- **?��?義�?活性�?** ?�許每個�??�自定義 SEO ?��?
- **?��?追蹤�?* ?�建?��?事件追蹤?�能
- **多�?言?��?�?* ?��?語�??��??��?對�???SEO ?�容

### 2. ?�能?��??�佳實�?

- **延遲?��?�?* ?��??��??�鍵資�?延遲?��?
- **?��?載�?** ?�鍵資�??��??��?
- **�?��?�割�?* ?��??��?組件
- **快�?策略�?* ?�當?�快?�設�?

### 3. ?��?追蹤?�佳實�?

- **事件?��?�?* 使用統�??��?件命?��?�?
- **?�戶?��?�?* 實現 GDPR ?�容?��??�管??
- **多平?�追蹤�?** ?�援多個�??�平??
- **轉�?追蹤�?* 追蹤?��??�業?��?�?

### 4. SEO ?�容?�佳實�?

- **?�特?��?** 每個�??�都?�獨?��?標�??��?�?
- **?�鍵詞�?** ?��?使用?�鍵詞�??��??�度?��?
- **結�??�數?��?** 使用?�當??Schema.org 標�?
- **?�部???�?* ?�好?�內?��??結�?

?��??�個整?��??��??�可以�? SEO 系統?�縫?��??�現?��?模板中�?實現?�面?��?索�??�優?��?

Through this integration guide, you can seamlessly integrate the SEO system into existing templates for comprehensive search engine optimization. 
