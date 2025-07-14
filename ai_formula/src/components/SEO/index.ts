export { default as SEOHead } from './SEOHead';
export { default as StructuredData } from './StructuredData';
export { default as SitemapGenerator } from './SitemapGenerator';
export { default as PerformanceOptimizer } from './PerformanceOptimizer';
export { default as AnalyticsProvider } from './AnalyticsProvider';

// Pre-built schema components
export {
  OrganizationSchema,
  CourseSchema,
  ArticleSchema,
  BreadcrumbSchema,
  FAQSchema,
  WebsiteSchema
} from './StructuredData';

// Analytics hooks
export { useAnalytics, usePageView, useEvent, withAnalytics } from './AnalyticsProvider';

// SEO utilities
export * from './seoUtils';
export * from './seoTypes'; 