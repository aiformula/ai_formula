import React from 'react';
import { CourseOutline } from '@/features/course/CourseOutline';
import { promptEngineeringCourseData } from '@/data/prompt-engineering-course-data';

const PromptEngineeringCourseOutline: React.FC = () => {
  // 轉換課程模組格式以適配 CourseOutline 組件
  const courseModules = promptEngineeringCourseData.courseModules.map(module => ({
    ...module,
    titleEn: module.titleEn,
    descriptionEn: module.descriptionEn,
    durationEn: module.durationEn,
    lessons: module.lessons.map(lesson => ({
      ...lesson,
      titleEn: lesson.titleEn,
      descriptionEn: lesson.descriptionEn,
      durationEn: lesson.durationEn
    }))
  }));

  const courseStats = {
    modules: promptEngineeringCourseData.courseModules.length,
    lessons: promptEngineeringCourseData.courseInfo.totalLessons,
    duration: promptEngineeringCourseData.courseInfo.totalHours,
    level: promptEngineeringCourseData.courseInfo.level
  };

  const courseInfoTags = promptEngineeringCourseData.courseInfo.tags;

  const availableCourses = [
    {
      id: 'chatgpt-complete-course',
      title: 'ChatGPT 完整課程',
      titleEn: 'Complete ChatGPT Course',
      description: '從基礎到進階的 ChatGPT 應用指南',
      descriptionEn: 'From basics to advanced ChatGPT application guide',
      link: '/courses/chatgpt-complete-course/outline'
    },
    {
      id: 'midjourney-course',
      title: 'Midjourney 權威指南',
      titleEn: 'Midjourney: The Definitive Guide',
      description: 'AI 藝術創作的完整教學',
      descriptionEn: 'Complete tutorial for AI art creation',
      link: '/courses/midjourney-course/outline'
    }
  ];

  const latestNews = [
    {
      title: '提示工程最新趨勢',
      titleEn: 'Latest Trends in Prompt Engineering',
      date: '2024年12月',
      dateEn: 'December 2024',
      category: 'AI 技術',
      categoryEn: 'AI Technology'
    }
  ];

  return (
    <CourseOutline
      courseInfo={promptEngineeringCourseData.courseInfo}
      courseStats={courseStats}
      courseModules={courseModules}
      courseInfoTags={courseInfoTags}
      availableCourses={availableCourses}
      latestNews={latestNews}
      showRelatedBlog={true}
    />
  );
};

export default PromptEngineeringCourseOutline; 