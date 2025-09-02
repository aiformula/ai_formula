/**
 * Course Outline Page
 * @fileoverview 使用模板系統的課程大綱頁面
 * @author AI Formula Team
 * @version 1.0.0
 */

import React from 'react';
import { CourseRouter } from '@/components/course-template';

const CourseOutlinePage: React.FC = () => {
  return <CourseRouter page="outline" />;
};

export default CourseOutlinePage; 