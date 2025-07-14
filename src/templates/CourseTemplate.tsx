import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Course } from '@/types/courseTypes';

interface CourseTemplateProps {
  course: Course;
  children: React.ReactNode;
}

export const CourseTemplate: React.FC<CourseTemplateProps> = ({ course, children }) => {
  return (
    <>
      {/* SEO優化 */}
      <Helmet>
        <title>{course.title} | AI Formula</title>
        <meta name="description" content={course.description} />
        <meta name="keywords" content={course.keywords?.join(', ')} />
        <meta property="og:title" content={course.title} />
        <meta property="og:description" content={course.description} />
        <meta property="og:image" content={course.image} />
        <meta property="og:url" content={`https://ai-formula.com/courses/${course.slug}`} />
        <link rel="canonical" href={`https://ai-formula.com/courses/${course.slug}`} />
        
        {/* 結構化數據 */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": course.title,
            "description": course.description,
            "provider": {
              "@type": "Organization",
              "name": "AI Formula",
              "url": "https://ai-formula.com"
            },
            "courseCode": course.id,
            "educationalLevel": course.level,
            "inLanguage": course.language
          })}
        </script>
      </Helmet>

      {/* 課程標準結構 */}
      <div className="course-template">
        {/* 麵包屑導航 */}
        <nav className="breadcrumb" aria-label="breadcrumb">
          <ol className="breadcrumb-list">
            <li><a href="/">首頁</a></li>
            <li><a href="/courses">課程</a></li>
            <li aria-current="page">{course.title}</li>
          </ol>
        </nav>

        {/* 課程標題區域 */}
        <header className="course-header">
          <h1 className="course-title">{course.title}</h1>
          <p className="course-description">{course.description}</p>
          <div className="course-meta">
            <span className="course-level">{course.level}</span>
            <span className="course-duration">{course.duration}</span>
            <span className="course-price">{course.price}</span>
          </div>
        </header>

        {/* 課程內容 */}
        <main className="course-content">
          {children}
        </main>

        {/* 課程進度 */}
        <aside className="course-progress">
          <h3>課程進度</h3>
          {/* 進度條組件 */}
        </aside>
      </div>
    </>
  );
};

export default CourseTemplate; 