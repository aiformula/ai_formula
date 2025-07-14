# ?? SEO æ¨¡æ¿?´å??‡å? / SEO Template Integration Guide

## æ¦‚è¿° / Overview

?¬æ??—å?ç¤ºå?ä½•å? SEO ç³»çµ±?‡ç¾?‰ç? CourseTemplate ??BlogTemplate ?´å?ï¼Œå¯¦?¾å??´ç? SEO ?ªå???

This guide shows how to integrate the SEO system with existing CourseTemplate and BlogTemplate for complete SEO optimization.

## ?¯ ?´å? CourseTemplate ??SEO / Integrating CourseTemplate with SEO

### 1. å¢å¼·??CourseTemplate

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
  // SEO ?¸é?å±¬æ€?
  seoData?: {
    customTitle?: string;
    customDescription?: string;
    customKeywords?: string;
    customImage?: string;
    faqs?: Array<{ question: string; answer: string }>;
  };
  // ?†æ?è¿½è¹¤
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

  // ?Ÿæ? SEO ?¸æ?
  const generateSEOData = () => {
    const baseTitle = language === 'zh-HK' ? course.title.zh : course.title.en;
    const baseDescription = language === 'zh-HK' ? course.description.zh : course.description.en;
    
    return {
      title: seoData?.customTitle || `${baseTitle} | AI Formula`,
      description: seoData?.customDescription || baseDescription,
      keywords: seoData?.customKeywords || `${course.category}, AIèª²ç?, ${course.level}`,
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

  // ?Ÿæ?éºµå?å±?
  const generateBreadcrumbs = () => {
    const homeLabel = language === 'zh-HK' ? 'é¦–é?' : 'Home';
    const coursesLabel = language === 'zh-HK' ? 'èª²ç?' : 'Courses';
    const courseTitle = language === 'zh-HK' ? course.title.zh : course.title.en;
    
    return [
      { name: homeLabel, url: 'https://ai-formula.com' },
      { name: coursesLabel, url: 'https://ai-formula.com/courses' },
      { name: courseTitle, url: `https://ai-formula.com/courses/${course.id}` }
    ];
  };

  // ?Ÿæ? FAQ ?¸æ?
  const generateFAQs = () => {
    if (seoData?.faqs) return seoData.faqs;
    
    // ?è¨­ FAQï¼ˆæ ¹?šè?è¨€ï¼?
    return language === 'zh-HK' ? [
      {
        question: '?™å€‹èª²ç¨‹é©?ˆå?å­¸è€…å?ï¼?,
        answer: '?¯ç?ï¼Œæ??‘ç?èª²ç?å¾åŸºç¤é?å§‹æ?å­¸ï??©å??„ç¨®æ°´å¹³?„å­¸ç¿’è€…ã€?
      },
      {
        question: 'å®Œæ?èª²ç?å¾Œæ??²å?è­‰æ›¸?ï?',
        answer: 'å®Œæ??€?‰èª²ç¨‹å…§å®¹å?è©•ä¼°å¾Œï??¨å??²å? AI Formula ?„å??è??¸ã€?
      },
      {
        question: 'èª²ç??§å®¹?ƒå??Ÿæ›´?°å?ï¼?,
        answer: '?¯ç?ï¼Œæ??‘æ??¹æ??€?°ç?AI?€è¡“ç™¼å±•å??Ÿæ›´?°èª²ç¨‹å…§å®¹ã€?
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

  // è¿½è¹¤?é¢?è¦½
  useEffect(() => {
    const title = language === 'zh-HK' ? course.title.zh : course.title.en;
    trackPageView(`/courses/${course.id}`, title);
    
    // è¿½è¹¤èª²ç??è¦½äº‹ä»¶
    if (trackingEvents?.onView) {
      trackEvent(trackingEvents.onView, {
        course_id: course.id,
        course_name: title,
        display_mode: displayMode,
        user_language: language
      });
    }
  }, [course.id, displayMode, language]);

  // ?•ç?è¨»å?äº‹ä»¶
  const handleEnrollClick = () => {
    if (trackingEvents?.onEnroll) {
      trackEvent(trackingEvents.onEnroll, {
        course_id: course.id,
        course_name: language === 'zh-HK' ? course.title.zh : course.title.en,
        price: course.price?.current,
        user_language: language
      });
    }
    
    // ?·è?è¨»å??è¼¯
    if (props.onEnroll) {
      props.onEnroll(course.id);
    }
  };

  // ?•ç?å®Œæ?äº‹ä»¶
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
      {/* SEO ?­éƒ¨æ¨™ç±¤ */}
      <SEOHead {...seoData} />
      
      {/* çµæ??–æ•¸??*/}
      <CourseSchema data={seoData.course} />
      <BreadcrumbSchema breadcrumbs={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      
      {/* èª²ç??§å®¹ */}
      <div className="course-template">
        {/* ?Ÿæ??„èª²ç¨‹æ¨¡?¿å…§å®?*/}
        <div className="course-header">
          <h1>{language === 'zh-HK' ? course.title.zh : course.title.en}</h1>
          <p>{language === 'zh-HK' ? course.description.zh : course.description.en}</p>
          
          {showEnrollment && (
            <button 
              onClick={handleEnrollClick}
              className="enroll-button"
            >
              {language === 'zh-HK' ? 'ç«‹å³?±å?' : 'Enroll Now'}
            </button>
          )}
        </div>
        
        {/* èª²ç??§å®¹?¹æ? displayMode æ¸²æ? */}
        {displayMode === 'course' && (
          <div className="course-overview">
            {/* èª²ç?æ¦‚è¦½?§å®¹ */}
          </div>
        )}
        
        {displayMode === 'outline' && (
          <div className="course-outline">
            {/* èª²ç?å¤§ç¶±?§å®¹ */}
          </div>
        )}
        
        {displayMode === 'learning' && (
          <div className="course-learning">
            {/* å­¸ç??Œé¢?§å®¹ */}
          </div>
        )}
        
        {/* FAQ ?¨å? */}
        <div className="faq-section">
          <h2>{language === 'zh-HK' ? 'å¸¸è??é?' : 'FAQ'}</h2>
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

### 2. ä½¿ç”¨ç¯„ä? / Usage Example

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
      // SEO ?ªå?ç¾©è¨­ç½?
      seoData={{
        customTitle: 'AIå¯«ä??©æ?ç²¾é€šèª²ç¨?- å­¸ç?ChatGPTå¯«ä??€å·?,
        customDescription: '?Œæ¡AIå¯«ä?å·¥å…·?„ä½¿?¨æ?å·§ï??å?å¯«ä??ˆç??Œè³ª?ã€‚å??«ChatGPT?Claudeç­‰å·¥?·ç?å¯¦æˆ°?‰ç”¨??,
        customKeywords: 'AIå¯«ä?, ChatGPTå¯«ä?, äººå·¥?ºèƒ½å¯«ä?, å¯«ä??ˆç?, ?§å®¹?µä?',
        customImage: '/assets/images/courses/ai-writing-assistant-seo.jpg',
        faqs: [
          {
            question: 'å­¸ç?AIå¯«ä??€è¦ç·¨ç¨‹è??¯å?ï¼?,
            answer: 'ä¸é?è¦ï??¬èª²ç¨‹å?æ³¨æ–¼å·¥å…·ä½¿ç”¨?Œå¯«ä½œæ?å·§ï??¡é?ç·¨ç??ºç???
          },
          {
            question: 'èª²ç??…å«?ªä?AIå¯«ä?å·¥å…·ï¼?,
            answer: '?…å«ChatGPT?Claude?Jasper?Copy.aiç­‰ä¸»æµAIå¯«ä?å·¥å…·?„ä½¿?¨æ–¹æ³•ã€?
          }
        ]
      }}
      // ?†æ?è¿½è¹¤è¨­ç½®
      trackingEvents={{
        onView: 'course_view',
        onEnroll: 'course_enrollment',
        onComplete: 'course_completion'
      }}
      onEnroll={(courseId) => {
        console.log('Enrolled in course:', courseId);
        // ?•ç?è¨»å??è¼¯
      }}
      onComplete={(courseId) => {
        console.log('Course completed:', courseId);
        // ?•ç?å®Œæ??è¼¯
      }}
    />
  );
}
```

## ?¯ ?´å? BlogTemplate ??SEO / Integrating BlogTemplate with SEO

### 1. å¢å¼·??BlogTemplate

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
  // SEO ?¸é?å±¬æ€?
  seoData?: {
    customTitle?: string;
    customDescription?: string;
    customKeywords?: string;
    customImage?: string;
  };
  // ?†æ?è¿½è¹¤
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

  // ?Ÿæ? SEO ?¸æ?
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

  // ?Ÿæ?éºµå?å±?
  const generateBreadcrumbs = () => {
    const homeLabel = language === 'zh-HK' ? 'é¦–é?' : 'Home';
    const blogLabel = language === 'zh-HK' ? '?šå®¢' : 'Blog';
    const postTitle = language === 'zh-HK' ? post.title.zh : post.title.en;
    
    return [
      { name: homeLabel, url: 'https://ai-formula.com' },
      { name: blogLabel, url: 'https://ai-formula.com/blog' },
      { name: postTitle, url: `https://ai-formula.com/blog/${post.id}` }
    ];
  };

  // è¿½è¹¤?é¢?è¦½
  useEffect(() => {
    if (displayMode === 'detail') {
      const title = language === 'zh-HK' ? post.title.zh : post.title.en;
      trackPageView(`/blog/${post.id}`, title);
      
      // è¿½è¹¤?‡ç??è¦½äº‹ä»¶
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

  // ?•ç??†äº«äº‹ä»¶
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

  // ?•ç??¶è?äº‹ä»¶
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
      {/* ?ªåœ¨è©³æ??é¢é¡¯ç¤º SEO æ¨™ç±¤ */}
      {displayMode === 'detail' && (
        <>
          <SEOHead {...seoData} />
          <ArticleSchema data={seoData.article} />
          <BreadcrumbSchema breadcrumbs={breadcrumbs} />
        </>
      )}
      
      {/* ?šå®¢?§å®¹ */}
      <div className="blog-template">
        {displayMode === 'list' && (
          <div className="blog-list-item">
            {/* ?—è¡¨?…ç›®?§å®¹ */}
          </div>
        )}
        
        {displayMode === 'detail' && (
          <article className="blog-detail">
            <header className="blog-header">
              <h1>{language === 'zh-HK' ? post.title.zh : post.title.en}</h1>
              
              {showAuthor && (
                <div className="blog-meta">
                  <span>{language === 'zh-HK' ? 'ä½œè€…ï?' : 'By '}{post.author}</span>
                  <span>{language === 'zh-HK' ? '?¼å??‚é?ï¼? : 'Published: '}{post.publishedTime}</span>
                  <span>{language === 'zh-HK' ? '?†é?ï¼? : 'Category: '}{post.category}</span>
                </div>
              )}
            </header>
            
            <div className="blog-content">
              {language === 'zh-HK' ? post.content.zh : post.content.en}
            </div>
            
            {showTags && (
              <div className="blog-tags">
                <h3>{language === 'zh-HK' ? 'æ¨™ç±¤ï¼? : 'Tags:'}</h3>
                {post.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
            
            {showSharing && (
              <div className="blog-sharing">
                <h3>{language === 'zh-HK' ? '?†äº«?‡ç?ï¼? : 'Share:'}</h3>
                <button onClick={() => handleShare('facebook')}>Facebook</button>
                <button onClick={() => handleShare('twitter')}>Twitter</button>
                <button onClick={() => handleShare('linkedin')}>LinkedIn</button>
                <button onClick={handleBookmark}>
                  {language === 'zh-HK' ? '?¶è?' : 'Bookmark'}
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

### 2. ä½¿ç”¨ç¯„ä? / Usage Example

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
    return <div>?‡ç?ä¸å???/div>;
  }

  return (
    <BlogTemplate
      post={post}
      displayMode="detail"
      showAuthor={true}
      showTags={true}
      showSharing={true}
      showRelated={true}
      // SEO ?ªå?ç¾©è¨­ç½?
      seoData={{
        customTitle: `${post.title.zh} - AI Formula å°ˆæ¥­AI?€è¡“å?å®¢`,
        customDescription: `${post.description.zh} äº†è§£?´å?AI?€è¡“æ??¨å??€?°è¶¨?¢ã€‚`,
        customKeywords: `${post.tags.join(', ')}, AI?€è¡? äººå·¥?ºèƒ½, ?€è¡“å?å®¢`,
        customImage: `/assets/images/blog/${post.id}-seo.jpg`
      }}
      // ?†æ?è¿½è¹¤è¨­ç½®
      trackingEvents={{
        onView: 'blog_post_view',
        onShare: 'blog_post_share',
        onBookmark: 'blog_post_bookmark'
      }}
    />
  );
}
```

## ?¯ ?¨å? SEO è¨­ç½® / Global SEO Setup

### 1. ?´æ–° App.tsx

```typescript
// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnalyticsProvider, PerformanceOptimizer } from '@/components/SEO';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';

// ?é¢çµ„ä»¶
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
                  {/* ?¶ä?è·¯ç”± */}
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

### 2. ?µå»º SEO ç®¡ç??é¢

```typescript
// src/pages/admin/SEOManager.tsx
import React, { useState, useEffect } from 'react';
import { SitemapGenerator } from '@/components/SEO';
import { courseData } from '@/data/courses';
import { blogPosts } from '@/data/blog/blogPosts';

export default function SEOManager() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    // ?Ÿæ??€?‰é??¢ç? sitemap ?¸æ?
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
      <h1>SEO ç®¡ç??¢æ¿</h1>
      
      <SitemapGenerator
        baseUrl="https://ai-formula.com"
        pages={pages}
        autoGenerate={false}
      />
      
      <div className="seo-metrics">
        <h2>SEO ?‡æ?</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <h3>ç¸½é??¢æ•¸</h3>
            <p>{pages.length}</p>
          </div>
          <div className="metric-card">
            <h3>èª²ç??é¢</h3>
            <p>{courseData.length}</p>
          </div>
          <div className="metric-card">
            <h3>?šå®¢?‡ç?</h3>
            <p>{blogPosts.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## ?¯ ?°å?è®Šæ•¸è¨­ç½® / Environment Variables Setup

### .env ?‡ä»¶è¨­ç½®

```env
# ç¶²ç??ºæœ¬è¨­ç½®
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

# ?‹ç™¼æ¨¡å?è¨­ç½®
VITE_ENABLE_SEO_DEBUG=true
VITE_ENABLE_PERFORMANCE_METRICS=true
```

## ?¯ ?€ä½³å¯¦è¸ç¸½çµ?/ Best Practices Summary

### 1. æ¨¡æ¿ä½¿ç”¨?€ä½³å¯¦è¸?

- **çµ±ä? SEO è¨­ç½®ï¼?* ?€?‰æ¨¡?¿éƒ½?…å«?ºæœ¬??SEO çµ„ä»¶
- **?ªå?ç¾©é?æ´»æ€§ï?** ?è¨±æ¯å€‹é??¢è‡ªå®šç¾© SEO ?¸æ?
- **?†æ?è¿½è¹¤ï¼?* ?§å»º?†æ?äº‹ä»¶è¿½è¹¤?Ÿèƒ½
- **å¤šè?è¨€?¯æ?ï¼?* ?¹æ?èªè??ªå??Ÿæ?å°æ???SEO ?§å®¹

### 2. ?§èƒ½?ªå??€ä½³å¯¦è¸?

- **å»¶é²? è?ï¼?* ?–ç??Œé??œéµè³‡æ?å»¶é²? è?
- **?å?è¼‰ï?** ?œéµè³‡æ??å?? è?
- **ä»?¢¼?†å‰²ï¼?* ?‰é?? è?çµ„ä»¶
- **å¿«å?ç­–ç•¥ï¼?* ?©ç•¶?„å¿«?–è¨­ç½?

### 3. ?†æ?è¿½è¹¤?€ä½³å¯¦è¸?

- **äº‹ä»¶?½å?ï¼?* ä½¿ç”¨çµ±ä??„ä?ä»¶å‘½?è?ç¯?
- **?¨æˆ¶?±ç?ï¼?* å¯¦ç¾ GDPR ?¸å®¹?„å??ç®¡??
- **å¤šå¹³?°è¿½è¹¤ï?** ?¯æ´å¤šå€‹å??å¹³??
- **è½‰æ?è¿½è¹¤ï¼?* è¿½è¹¤?è??„æ¥­?™æ?æ¨?

### 4. SEO ?§å®¹?€ä½³å¯¦è¸?

- **?¨ç‰¹?§ï?** æ¯å€‹é??¢éƒ½?‰ç¨?¹ç?æ¨™é??Œæ?è¿?
- **?œéµè©ï?** ?ˆç?ä½¿ç”¨?œéµè©ï??¿å??åº¦?ªå?
- **çµæ??–æ•¸?šï?** ä½¿ç”¨?©ç•¶??Schema.org æ¨™è?
- **?§éƒ¨???ï¼?* ?¯å¥½?„å…§?¨é€??çµæ?

?é??™å€‹æ•´?ˆæ??—ï??¨å¯ä»¥å? SEO ç³»çµ±?¡ç¸«?†æ??°ç¾?‰ç?æ¨¡æ¿ä¸­ï?å¯¦ç¾?¨é¢?„æ?ç´¢å??å„ª?–ã€?

Through this integration guide, you can seamlessly integrate the SEO system into existing templates for comprehensive search engine optimization. 
