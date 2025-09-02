/**
 * Course Unit Page
 * @fileoverview 使用模板系統的課程單元頁面
 * @author AI Formula Team
 * @version 1.0.0
 */

import React from 'react';
import CourseUnitTemplate from '@/components/course-template/CourseUnitTemplate';

const CourseUnitPage: React.FC = () => {
  // 從 URL 路徑中提取課程 ID
  const currentPath = window.location.pathname;
  let courseId = '';
  
  if (currentPath.includes('chatgpt-complete-course')) {
    courseId = 'chatgpt';
  } else if (currentPath.includes('perplexity-complete-course')) {
    courseId = 'perplexity';
  } else if (currentPath.includes('midjourney-course')) {
    courseId = 'midjourney';
  } else if (currentPath.includes('prompt-engineering-course')) {
    courseId = 'prompt-engineering';
  } else if (currentPath.includes('prompt-engineering-expert-course')) {
    courseId = 'prompt-engineering-expert';
  } else if (currentPath.includes('claude-course')) {
    courseId = 'claude';
  } else if (currentPath.includes('gemini-course')) {
    courseId = 'gemini';
  }

  if (!courseId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600">The requested course could not be found.</p>
        </div>
      </div>
    );
  }

  return <CourseUnitTemplate courseId={courseId} />;
};

export default CourseUnitPage; 