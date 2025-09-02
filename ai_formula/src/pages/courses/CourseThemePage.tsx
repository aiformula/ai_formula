/**
 * Course Theme Page
 * @fileoverview 通用課程主題頁面，使用模板系統
 * @author AI Formula Team
 * @version 1.0.0
 */

import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CourseThemeTemplate } from '@/components/course-template';
import { getCourseConfig, getCourseIdFromRoute } from '@/components/course-template/courseRegistry';

const CourseThemePage: React.FC = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const currentRoute = window.location.pathname;
  
  // 從路由中推斷課程ID
  const courseId = getCourseIdFromRoute(currentRoute);
  
  if (!courseId) {
    return <Navigate to="/courses" replace />;
  }
  
  // 獲取課程配置
  const config = getCourseConfig(courseId);
  
  if (!config) {
    return <Navigate to="/courses" replace />;
  }
  
  // 驗證主題ID
  if (!themeId || isNaN(parseInt(themeId))) {
    return <Navigate to={`${config.baseRoute}/theme/1`} replace />;
  }
  
  return <CourseThemeTemplate config={config} />;
};

export default CourseThemePage; 