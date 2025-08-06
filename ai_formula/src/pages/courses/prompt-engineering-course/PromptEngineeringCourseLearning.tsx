import React from 'react';
import { CourseLearningTemplate } from '@/components/course-template/CourseLearningTemplate';
import { promptEngineeringCourseData } from '@/data/prompt-engineering-course-data';

const PromptEngineeringCourseLearning: React.FC = () => {
  return (
    <CourseLearningTemplate courseData={promptEngineeringCourseData} />
  );
};

export default PromptEngineeringCourseLearning; 