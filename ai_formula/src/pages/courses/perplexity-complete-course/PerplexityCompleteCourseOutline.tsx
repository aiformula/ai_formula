/**
 * Perplexity Complete Course Outline Page
 * @fileoverview Perplexity 完整教學實戰課程大綱頁面 - 使用統一模板
 * @author AI Formula Team
 * @version 2.0.0
 */

import React from 'react';
import CourseOutlineTemplate from '@/components/course-template/CourseOutlineTemplate';
import { getCourseConfig } from '@/components/course-template/courseRegistry';

const PerplexityCompleteCourseOutline: React.FC = () => {
  const config = getCourseConfig('perplexity');
  return <CourseOutlineTemplate config={config} />;
};

export default PerplexityCompleteCourseOutline; 