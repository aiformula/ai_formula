/**
 * Course Quiz Page
 * @fileoverview 使用模板系統的課程測驗頁面
 * @author AI Formula Team
 * @version 1.0.0
 */

import React from 'react';
import { CourseRouter } from '@/components/course-template';

const CourseQuizPage: React.FC = () => {
  return <CourseRouter page="quiz" />;
};

export default CourseQuizPage; 