// SEO工具函數
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url: string;
  type?: 'website' | 'article' | 'course';
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
}

// 生成頁面標題
export const generatePageTitle = (title: string, siteName: string = 'AI Formula'): string => {
  return `${title} | ${siteName}`;
};

// 生成結構化數據
export const generateStructuredData = (type: 'course' | 'article' | 'organization', data: any) => {
  const baseStructure = {
    '@context': 'https://schema.org',
  };

  switch (type) {
    case 'course':
      return {
        ...baseStructure,
        '@type': 'Course',
        name: data.title,
        description: data.description,
        provider: {
          '@type': 'Organization',
          name: 'AI Formula',
          url: 'https://ai-formula.com'
        },
        courseCode: data.id,
        educationalLevel: data.level,
        inLanguage: data.language || 'zh-TW'
      };

    case 'article':
      return {
        ...baseStructure,
        '@type': 'BlogPosting',
        headline: data.title,
        description: data.excerpt,
        image: data.featuredImage,
        author: {
          '@type': 'Person',
          name: data.author
        },
        publisher: {
          '@type': 'Organization',
          name: 'AI Formula',
          logo: {
            '@type': 'ImageObject',
            url: 'https://ai-formula.com/logo.png'
          }
        },
        datePublished: data.publishedAt,
        dateModified: data.updatedAt,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url
        }
      };

    case 'organization':
      return {
        ...baseStructure,
        '@type': 'Organization',
        name: 'AI Formula',
        url: 'https://ai-formula.com',
        description: 'AI Formula - 香港最實戰的AI應用課程平台',
        sameAs: [
          'https://www.facebook.com/aiformula',
          'https://www.instagram.com/ai_formula_'
        ]
      };

    default:
      return baseStructure;
  }
};

// 生成網站地圖數據
export const generateSitemapData = (pages: Array<{url: string; lastModified: Date; priority: number}>) => {
  return pages.map(page => ({
    url: page.url,
    lastModified: page.lastModified.toISOString(),
    changeFrequency: 'weekly' as const,
    priority: page.priority
  }));
};

// 生成麵包屑導航數據
export const generateBreadcrumbData = (paths: Array<{name: string; url: string}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: paths.map((path, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: path.name,
      item: path.url
    }))
  };
};

// 驗證SEO配置
export const validateSEOConfig = (config: SEOConfig): string[] => {
  const errors: string[] = [];
  
  if (!config.title) errors.push('標題不能為空');
  if (config.title && config.title.length > 60) errors.push('標題過長（建議60字符以內）');
  if (!config.description) errors.push('描述不能為空');
  if (config.description && config.description.length > 160) errors.push('描述過長（建議160字符以內）');
  if (!config.url) errors.push('URL不能為空');
  
  return errors;
};

export default {
  generatePageTitle,
  generateStructuredData,
  generateSitemapData,
  generateBreadcrumbData,
  validateSEOConfig
}; 