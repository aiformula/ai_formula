// SEO Types and Interfaces
export interface SEOPageData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url: string;
  type: 'website' | 'article' | 'course' | 'video' | 'book';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export interface CourseStructuredData {
  name: string;
  description: string;
  provider: string;
  instructor: string;
  duration: string;
  level: string;
  price?: number;
  category: string;
  image?: string;
  url: string;
}

export interface ArticleStructuredData {
  headline: string;
  description: string;
  author: string;
  publisher: string;
  publishedTime: string;
  modifiedTime?: string;
  image?: string;
  url: string;
  section: string;
  tags: string[];
}

export interface OrganizationStructuredData {
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint?: {
    '@type': 'ContactPoint';
    telephone?: string;
    email?: string;
    contactType: string;
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface OpenGraphData {
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
  siteName: string;
  locale: string;
}

export interface TwitterCardData {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  title: string;
  description: string;
  image: string;
  site?: string;
  creator?: string;
}

export interface SEOMetrics {
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversionsRate: number;
}

export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
} 