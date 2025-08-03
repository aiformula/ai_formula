/**
 * Course Learning Page
 * @fileoverview 使用模板系統的課程學習頁面
 * @author AI Formula Team
 * @version 1.0.0
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import CourseLearningTemplate from '@/components/course-template/CourseLearningTemplate';

const CourseLearningPage: React.FC = () => {
  // 從 URL 路徑中提取課程 ID
  const currentPath = window.location.pathname;
  let courseId = '';
  
  if (currentPath.includes('chatgpt-complete-course')) {
    courseId = 'chatgpt';
  } else if (currentPath.includes('perplexity-complete-course')) {
    courseId = 'perplexity';
  } else if (currentPath.includes('midjourney-course')) {
    courseId = 'midjourney';
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

  return <CourseLearningTemplate courseId={courseId} />;
};

export default CourseLearningPage; 