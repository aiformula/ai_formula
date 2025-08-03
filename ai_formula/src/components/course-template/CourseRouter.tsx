/**
 * Course Router
 * @fileoverview 通用的課程路由組件，動態處理不同課程
 * @author AI Formula Team
 * @version 1.0.0
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import { getCourseIdFromRoute, getCourseConfig } from './courseRegistry';
import CourseOutlineTemplate from './CourseOutlineTemplate';
import CourseLearningTemplate from './CourseLearningTemplate';
import CourseThemeTemplate from './CourseThemeTemplate';
import CourseUnitTemplate from './CourseUnitTemplate';
import CourseQuizTemplate from './CourseQuizTemplate';

interface CourseRouterProps {
  page: 'outline' | 'learning' | 'theme' | 'unit' | 'quiz';
}

const CourseRouter: React.FC<CourseRouterProps> = ({ page }) => {
  // 從當前 URL 獲取課程 ID
  const currentPath = window.location.pathname;
  const courseId = getCourseIdFromRoute(currentPath);
  
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

  const config = getCourseConfig(courseId);
  
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Configuration Error</h1>
          <p className="text-gray-600">Course configuration is missing.</p>
        </div>
      </div>
    );
  }

  // 根據頁面類型渲染對應組件
  switch (page) {
    case 'outline':
      return <CourseOutlineTemplate config={config} />;
    case 'learning':
      return <CourseLearningTemplate config={config} />;
    case 'theme':
      return <CourseThemeTemplate config={config} />;
    case 'unit':
      return <CourseUnitTemplate config={config} />;
    case 'quiz':
      return <CourseQuizTemplate config={config} />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
            <p className="text-gray-600">The requested page type is not supported.</p>
          </div>
        </div>
      );
  }
};

export default CourseRouter; 