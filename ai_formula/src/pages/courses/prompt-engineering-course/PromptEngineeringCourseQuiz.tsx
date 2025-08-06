import React from 'react';
import { CourseQuizTemplate } from '@/components/course-template/CourseQuizTemplate';
import { promptEngineeringCourseData } from '@/data/prompt-engineering-course-data';

const PromptEngineeringCourseQuiz: React.FC = () => {
  return (
    <CourseQuizTemplate courseData={promptEngineeringCourseData} />
  );
};

export default PromptEngineeringCourseQuiz; 