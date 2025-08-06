import React from 'react';
import { CourseUnitTemplate } from '@/components/course-template/CourseUnitTemplate';
import { promptEngineeringCourseData } from '@/data/prompt-engineering-course-data';

const PromptEngineeringCourseUnit: React.FC = () => {
  return (
    <CourseUnitTemplate courseData={promptEngineeringCourseData} />
  );
};

export default PromptEngineeringCourseUnit; 