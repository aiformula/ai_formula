import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'course' | 'video' | 'book';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  course?: {
    name: string;
    description: string;
    provider: string;
    instructor: string;
    duration: string;
    level: string;
    price?: number;
    category: string;
  };
  article?: {
    author: string;
    publishedTime: string;
    modifiedTime?: string;
    section: string;
    tags: string[];
  };
  noIndex?: boolean;
  noFollow?: boolean;
}

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  author = 'AI Formula Team',
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  course,
  article,
  noIndex = false,
  noFollow = false
}) => {
  const { language } = useLanguage();
  
  // Default values based on language
  const defaultTitle = language === 'zh-HK' 
    ? 'AI Formula - 香港AI自動化解決方案平台'
    : 'AI Formula - Hong Kong AI Automation Solutions Platform';
  
  const defaultDescription = language === 'zh-HK'
    ? '香港領先的AI自動化解決方案平台，提供專業的AI技術服務、教學課程和商業應用指南。專注於ChatGPT、Midjourney、自動化工具等AI技術培訓。'
    : 'Leading AI automation solutions platform in Hong Kong, providing professional AI technology services, educational courses, and business application guides. Specializing in ChatGPT, Midjourney, automation tools and AI technology training.';

  const defaultKeywords = language === 'zh-HK'
    ? 'AI自動化,香港AI培訓,ChatGPT課程,Midjourney教學,AI工具,人工智能,自動化解決方案,AI Formula'
    : 'AI automation,Hong Kong AI training,ChatGPT courses,Midjourney tutorials,AI tools,artificial intelligence,automation solutions,AI Formula';

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://ai-formula.com';
  const currentUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = image ? `${siteUrl}${image}` : `${siteUrl}/assets/images/og-default.jpg`;

  // Generate structured data
  const generateStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AI Formula',
      url: siteUrl,
      logo: `${siteUrl}/assets/images/logo.png`,
      description: defaultDescription,
      sameAs: [
        'https://www.facebook.com/aiformula',
        'https://www.linkedin.com/company/ai-formula',
        'https://twitter.com/aiformula'
      ]
    };

    if (course) {
      return {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: course.name,
        description: course.description,
        provider: {
          '@type': 'Organization',
          name: course.provider,
          url: siteUrl
        },
        instructor: {
          '@type': 'Person',
          name: course.instructor
        },
        duration: course.duration,
        courseLevel: course.level,
        ...(course.price && {
          offers: {
            '@type': 'Offer',
            price: course.price,
            priceCurrency: 'HKD'
          }
        }),
                 category: course.category,
         inLanguage: language === 'zh-HK' ? 'zh-HK' : 'en-US'
      };
    }

    if (article) {
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: seoDescription,
        author: {
          '@type': 'Person',
          name: article.author
        },
        publisher: {
          '@type': 'Organization',
          name: 'AI Formula',
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/assets/images/logo.png`
          }
        },
        datePublished: article.publishedTime,
        ...(article.modifiedTime && { dateModified: article.modifiedTime }),
        articleSection: article.section,
        keywords: article.tags.join(', '),
                 image: seoImage,
         url: currentUrl,
         inLanguage: language === 'zh-HK' ? 'zh-HK' : 'en-US'
      };
    }

    return baseData;
  };

  const robotsContent = `${noIndex ? 'noindex' : 'index'},${noFollow ? 'nofollow' : 'follow'}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robotsContent} />
      <meta name="language" content={language === 'zh-HK' ? 'zh-HK' : 'en-US'} />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="AI Formula" />
      <meta property="og:locale" content={language === 'zh-HK' ? 'zh_HK' : 'en_US'} />
      
      {/* Article specific Open Graph */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && section && (
        <meta property="article:section" content={section} />
      )}
      {type === 'article' && tags.length > 0 && 
        tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))
      }
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:site" content="@aiformula" />
      <meta name="twitter:creator" content="@aiformula" />
      
      {/* Mobile and Responsive */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="AI Formula" />
      
      {/* Theme Colors */}
      <meta name="theme-color" content="#1a1a1a" />
      <meta name="msapplication-navbutton-color" content="#1a1a1a" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
      
      {/* Favicon and App Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Alternative Languages */}
      <link rel="alternate" hrefLang="zh-HK" href={`${siteUrl}/zh${url || ''}`} />
      <link rel="alternate" hrefLang="en-US" href={`${siteUrl}/en${url || ''}`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${url || ''}`} />
    </Helmet>
  );
};

export default SEOHead; 