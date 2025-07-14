import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  CourseStructuredData, 
  ArticleStructuredData, 
  OrganizationStructuredData,
  BreadcrumbItem,
  FAQItem 
} from './seoTypes';

interface StructuredDataProps {
  type: 'organization' | 'course' | 'article' | 'breadcrumb' | 'faq' | 'website';
  data: any;
  additionalData?: any;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data, additionalData }) => {
  const generateStructuredData = () => {
    switch (type) {
      case 'organization':
        return generateOrganizationData(data as OrganizationStructuredData);
      case 'course':
        return generateCourseData(data as CourseStructuredData);
      case 'article':
        return generateArticleData(data as ArticleStructuredData);
      case 'breadcrumb':
        return generateBreadcrumbData(data as BreadcrumbItem[]);
      case 'faq':
        return generateFAQData(data as FAQItem[]);
      case 'website':
        return generateWebsiteData(data);
      default:
        return null;
    }
  };

  const generateOrganizationData = (orgData: OrganizationStructuredData) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: orgData.name,
      url: orgData.url,
      logo: {
        '@type': 'ImageObject',
        url: orgData.logo
      },
      description: orgData.description,
      sameAs: orgData.sameAs,
      ...(orgData.contactPoint && {
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: orgData.contactPoint.telephone,
          email: orgData.contactPoint.email,
          contactType: orgData.contactPoint.contactType
        }
      })
    };
  };

  const generateCourseData = (courseData: CourseStructuredData) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: courseData.name,
      description: courseData.description,
      provider: {
        '@type': 'Organization',
        name: courseData.provider,
        url: courseData.url
      },
      instructor: {
        '@type': 'Person',
        name: courseData.instructor
      },
      duration: courseData.duration,
      courseLevel: courseData.level,
      category: courseData.category,
      ...(courseData.image && {
        image: {
          '@type': 'ImageObject',
          url: courseData.image
        }
      }),
      ...(courseData.price && {
        offers: {
          '@type': 'Offer',
          price: courseData.price,
          priceCurrency: 'HKD',
          availability: 'https://schema.org/InStock'
        }
      }),
      educationalCredentialAwarded: 'Certificate of Completion',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '156'
      }
    };
  };

  const generateArticleData = (articleData: ArticleStructuredData) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: articleData.headline,
      description: articleData.description,
      author: {
        '@type': 'Person',
        name: articleData.author
      },
      publisher: {
        '@type': 'Organization',
        name: articleData.publisher,
        logo: {
          '@type': 'ImageObject',
          url: `${articleData.url}/assets/images/logo.png`
        }
      },
      datePublished: articleData.publishedTime,
      ...(articleData.modifiedTime && { dateModified: articleData.modifiedTime }),
      ...(articleData.image && {
        image: {
          '@type': 'ImageObject',
          url: articleData.image
        }
      }),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleData.url
      },
      articleSection: articleData.section,
      keywords: articleData.tags.join(', ')
    };
  };

  const generateBreadcrumbData = (breadcrumbs: BreadcrumbItem[]) => {
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
  };

  const generateFAQData = (faqs: FAQItem[]) => {
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
  };

  const generateWebsiteData = (websiteData: any) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: websiteData.name,
      url: websiteData.url,
      description: websiteData.description,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${websiteData.url}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      },
      ...(websiteData.sameAs && { sameAs: websiteData.sameAs })
    };
  };

  const structuredData = generateStructuredData();

  if (!structuredData) {
    return null;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

// Pre-built structured data components for common use cases
export const OrganizationSchema: React.FC<{ data: OrganizationStructuredData }> = ({ data }) => (
  <StructuredData type="organization" data={data} />
);

export const CourseSchema: React.FC<{ data: CourseStructuredData }> = ({ data }) => (
  <StructuredData type="course" data={data} />
);

export const ArticleSchema: React.FC<{ data: ArticleStructuredData }> = ({ data }) => (
  <StructuredData type="article" data={data} />
);

export const BreadcrumbSchema: React.FC<{ breadcrumbs: BreadcrumbItem[] }> = ({ breadcrumbs }) => (
  <StructuredData type="breadcrumb" data={breadcrumbs} />
);

export const FAQSchema: React.FC<{ faqs: FAQItem[] }> = ({ faqs }) => (
  <StructuredData type="faq" data={faqs} />
);

export const WebsiteSchema: React.FC<{ data: any }> = ({ data }) => (
  <StructuredData type="website" data={data} />
);

export default StructuredData; 