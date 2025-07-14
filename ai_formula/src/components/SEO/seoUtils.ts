import { SEOPageData, SitemapUrl, BreadcrumbItem } from './seoTypes';

// SEO Utility Functions
export const seoUtils = {
  // Generate SEO-friendly URL slug
  generateSlug: (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  },

  // Extract meta description from content
  extractMetaDescription: (content: string, maxLength: number = 160): string => {
    const plainText = content.replace(/<[^>]*>/g, '').replace(/\n/g, ' ');
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength - 3) + '...'
      : plainText;
  },

  // Generate keywords from content
  generateKeywords: (content: string, title: string): string => {
    const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'a', 'an'];
    const words = (title + ' ' + content)
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3 && !commonWords.includes(word));
    
    const wordCount = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(wordCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word)
      .join(', ');
  },

  // Validate SEO data
  validateSEOData: (data: SEOPageData): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!data.title) errors.push('Title is required');
    if (data.title && data.title.length > 60) errors.push('Title should be 60 characters or less');
    if (!data.description) errors.push('Description is required');
    if (data.description && data.description.length > 160) errors.push('Description should be 160 characters or less');
    if (!data.url) errors.push('URL is required');
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Generate breadcrumb structured data
  generateBreadcrumbStructuredData: (breadcrumbs: BreadcrumbItem[]) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };
  },

  // Generate FAQ structured data
  generateFAQStructuredData: (faqs: { question: string; answer: string }[]) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  },

  // Generate sitemap URLs
  generateSitemapUrls: (baseUrl: string, pages: { url: string; lastmod?: string; priority?: number }[]): SitemapUrl[] => {
    return pages.map(page => ({
      loc: `${baseUrl}${page.url}`,
      lastmod: page.lastmod || new Date().toISOString().split('T')[0],
      changefreq: 'weekly' as const,
      priority: page.priority || 0.8
    }));
  },

  // Clean and optimize content for SEO
  optimizeContent: (content: string): string => {
    return content
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();
  },

  // Generate image alt text
  generateImageAlt: (filename: string, context?: string): string => {
    const name = filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    return context ? `${context} - ${name}` : name;
  },

  // Calculate reading time
  calculateReadingTime: (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  },

  // Generate social media hashtags
  generateHashtags: (keywords: string[], maxCount: number = 5): string[] => {
    return keywords
      .map(keyword => `#${keyword.replace(/\s+/g, '')}`)
      .slice(0, maxCount);
  },

  // Format URL for canonical link
  formatCanonicalUrl: (url: string, baseUrl: string): string => {
    if (url.startsWith('http')) return url;
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `${baseUrl}${cleanUrl}`;
  },

  // Generate Open Graph image URL
  generateOGImageUrl: (title: string, baseUrl: string): string => {
    const encodedTitle = encodeURIComponent(title);
    return `${baseUrl}/api/og?title=${encodedTitle}`;
  },

  // Check if URL is external
  isExternalUrl: (url: string): boolean => {
    return url.startsWith('http://') || url.startsWith('https://');
  },

  // Generate robots.txt content
  generateRobotsTxt: (baseUrl: string, disallowedPaths: string[] = []): string => {
    const disallowRules = disallowedPaths.map(path => `Disallow: ${path}`).join('\n');
    return `User-agent: *
${disallowRules}
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;
  }
};

// Language-specific SEO utilities
export const languageUtils = {
  // Get hreflang code
  getHreflangCode: (language: string): string => {
    const langMap: Record<string, string> = {
      'en': 'en-US',
      'zh-HK': 'zh-HK',
      'zh-CN': 'zh-CN',
      'ja': 'ja-JP',
      'ko': 'ko-KR'
    };
    return langMap[language] || language;
  },

  // Get appropriate locale for Open Graph
  getOGLocale: (language: string): string => {
    const localeMap: Record<string, string> = {
      'en': 'en_US',
      'zh-HK': 'zh_HK',
      'zh-CN': 'zh_CN',
      'ja': 'ja_JP',
      'ko': 'ko_KR'
    };
    return localeMap[language] || 'en_US';
  },

  // Generate alternate URLs for different languages
  generateAlternateUrls: (baseUrl: string, path: string, languages: string[]): Record<string, string> => {
    const alternates: Record<string, string> = {};
    languages.forEach(lang => {
      alternates[lang] = `${baseUrl}/${lang}${path}`;
    });
    return alternates;
  }
};

// Performance-related SEO utilities
export const performanceUtils = {
  // Lazy load images
  lazyLoadImage: (img: HTMLImageElement): void => {
    if ('loading' in img) {
      img.loading = 'lazy';
    } else {
      // Fallback for older browsers
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const image = entry.target as HTMLImageElement;
            image.src = image.dataset.src || '';
            observer.unobserve(image);
          }
        });
      });
      observer.observe(img);
    }
  },

  // Preload critical resources
  preloadResource: (href: string, type: 'style' | 'script' | 'font' | 'image'): void => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = type;
    if (type === 'font') {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  },

  // Optimize images
  optimizeImageSrc: (src: string, width?: number, height?: number): string => {
    // This would typically integrate with an image optimization service
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('q', '80'); // Quality
    params.append('f', 'webp'); // Format
    
    return `${src}?${params.toString()}`;
  }
};

export default seoUtils; 
