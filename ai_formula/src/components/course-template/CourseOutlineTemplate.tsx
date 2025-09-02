/**
 * Course Outline Template
 * @fileoverview 通用的課程大綱模板組件
 * @author AI Formula Team
 * @version 1.0.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import CourseOutline from '@/features/course/CourseOutline';
import { CourseConfig, CourseStats, CourseFeature, TargetAudience } from './types';
import { getCourseConfig } from './courseRegistry';
import { 
  Clock, 
  BookOpen, 
  Users, 
  Target, 
  Search,
  Brain,
  BarChart3,
  Globe,
  Briefcase,
  GraduationCap,
  Edit3,
  UserCheck
} from 'lucide-react';

interface CourseOutlineTemplateProps {
  courseId: string;
}

const CourseOutlineTemplate: React.FC<CourseOutlineTemplateProps> = ({ courseId }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  // 從registry獲取課程配置
  const config = getCourseConfig(courseId);
  
  if (!config) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">{isZhHK ? '課程不存在' : 'Course not found'}</h2>
          <p className="text-gray-400 mb-4">Course ID: {courseId}</p>
        </div>
      </div>
    );
  }

  const { dataSource, baseRoute } = config;

  // 動態課程統計
  const courseStats: CourseStats[] = [
    {
      icon: <Clock className="h-6 w-6" />,
      label: isZhHK ? "小時精華內容" : "Hours of Premium Content",
      value: `${dataSource.courseStats.totalHours}+`
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      label: isZhHK ? "實戰單元" : "Practical Modules", 
      value: `${dataSource.courseStats.totalLessons}+`
    },
    {
      icon: <Target className="h-6 w-6" />,
      label: isZhHK ? "實用技巧" : "Practical Techniques",
      value: "100%"
    },
    {
      icon: <Users className="h-6 w-6" />,
      label: isZhHK ? "學員學習" : "Students Enrolled",
      value: `${dataSource.courseInfo.students}+`
    }
  ];

  // 動態課程特色 - 根據課程類型調整
  const getCourseFeatures = (): CourseFeature[] => {
    const commonFeatures = [
      {
        icon: <Brain className="h-6 w-6" />,
        title: isZhHK ? "AI 核心技能" : "AI Core Skills",
        description: isZhHK ? "掌握 AI 工具的核心功能與深度應用" : "Master the core functionality and advanced applications of AI tools",
        highlight: isZhHK ? "核心技能" : "Core Skill"
      },
      {
        icon: <BarChart3 className="h-6 w-6" />,
        title: isZhHK ? "實戰案例分析" : "Practical Case Studies",
        description: isZhHK ? "通過真實案例學習最佳實踐方法" : "Learn best practices through real-world case studies",
        highlight: isZhHK ? "實戰技巧" : "Practical Technique"
      },
      {
        icon: <Globe className="h-6 w-6" />,
        title: isZhHK ? "全方位應用" : "Comprehensive Applications",
        description: isZhHK ? "涵蓋工作、學習、創作等多個領域的應用" : "Covering applications in work, learning, creativity, and more",
        highlight: isZhHK ? "全面掌握" : "Complete Mastery"
      }
    ];

    // 根據課程類型添加特定功能
    if (courseId === 'chatgpt') {
      return [
        {
          icon: <Search className="h-6 w-6" />,
          title: isZhHK ? "對話技巧優化" : "Conversation Optimisation",
          description: isZhHK ? "學習如何與 ChatGPT 進行高效對話" : "Learn how to have efficient conversations with ChatGPT",
          highlight: isZhHK ? "核心技能" : "Core Skill"
        },
        ...commonFeatures
      ];
    } else if (courseId === 'perplexity') {
      return [
        {
          icon: <Search className="h-6 w-6" />,
          title: isZhHK ? "智能搜尋技巧" : "Intelligent Search Techniques",
          description: isZhHK ? "掌握 Perplexity 的高級搜尋功能與查詢優化" : "Master Perplexity's advanced search capabilities and query optimisation",
          highlight: isZhHK ? "核心技能" : "Core Skill"
        },
        ...commonFeatures
      ];
    }

    return commonFeatures;
  };

  // 動態目標受眾
  const targetAudience: TargetAudience = {
    title: isZhHK ? "適合學習對象" : "Suitable for",
    description: isZhHK ? 
      "無論您是 AI 新手還是想要深化技能的專業人士，這門課程都能為您提供價值。" : 
      "Whether you're an AI newcomer or a professional seeking to enhance your skills, this course provides valuable insights.",
    audiences: [
      {
        icon: <Briefcase className="h-6 w-6" />,
        title: isZhHK ? "商業人士" : "Business Professionals",
        description: isZhHK ? 
          "需要快速獲取市場資訊與競爭分析的專業人士" : 
          "Professionals requiring rapid market intelligence and competitive analysis"
      },
      {
        icon: <GraduationCap className="h-6 w-6" />,
        title: isZhHK ? "研究人員" : "Researchers",
        description: isZhHK ? 
          "學者、分析師及需要深度研究的專業工作者" : 
          "Academics, analysts, and professionals requiring comprehensive research capabilities"
      },
      {
        icon: <Edit3 className="h-6 w-6" />,
        title: isZhHK ? "內容創作者" : "Content Creators",
        description: isZhHK ? 
          "記者、作家、行銷人員及媒體工作者" : 
          "Journalists, writers, marketing professionals, and media practitioners"
      },
      {
        icon: <UserCheck className="h-6 w-6" />,
        title: isZhHK ? "學習愛好者" : "Learning Enthusiasts",
        description: isZhHK ? 
          "對新科技好奇，希望提升能力的學習者" : 
          "Individuals curious about emerging technologies and seeking skill enhancement"
      }
    ]
  };

  // 動態課程信息對象 - 支持雙語
  const dynamicCourseInfo = {
    badge: isZhHK ? dataSource.courseInfo.badge : (dataSource.courseInfo.badgeEn || dataSource.courseInfo.badge),
    title: isZhHK ? dataSource.courseInfo.title : (dataSource.courseInfo.titleEn || dataSource.courseInfo.title),
    subtitle: isZhHK ? dataSource.courseInfo.subtitle : (dataSource.courseInfo.subtitleEn || dataSource.courseInfo.subtitle),
    instructor: isZhHK ? dataSource.courseInfo.instructor : (dataSource.courseInfo.instructorEn || dataSource.courseInfo.instructor),
    instructorTitle: isZhHK ? dataSource.courseInfo.instructorTitle : (dataSource.courseInfo.instructorTitleEn || dataSource.courseInfo.instructorTitle),
    rating: dataSource.courseInfo.rating,
    students: dataSource.courseInfo.students,
    duration: isZhHK ? dataSource.courseInfo.duration : (dataSource.courseInfo.durationEn || dataSource.courseInfo.duration),
    lastUpdated: dataSource.courseInfo.lastUpdated
  };

  // 轉換課程模組格式
  const courseModules = dataSource.courseModules.map((module: any) => ({
    id: module.id,
    title: isZhHK ? module.title : (module.titleEn || module.title),
    titleEn: module.titleEn,
    description: isZhHK ? module.description : (module.descriptionEn || module.description),
    descriptionEn: module.descriptionEn,
    lessons: module.lessons.map((lesson: any) => ({
      id: lesson.id,
      title: isZhHK ? lesson.title : (lesson.titleEn || lesson.title),
      titleEn: lesson.titleEn,
      duration: lesson.duration,
      type: 'reading' as const,
      isPreview: false
    }))
  }));

  // 處理開始學習按鈕點擊
  const handleStartLearning = () => {
    navigate(`${baseRoute}/learning`);
  };

  return (
    <CourseOutline
      courseInfo={dynamicCourseInfo}
      courseStats={courseStats}
      courseInfoTags={[]}
      availableCourses={[]}
      latestNews={undefined}
      pricingInfo={undefined}
      courseFeatures={getCourseFeatures()}
      faqData={dataSource.faqData}
      targetAudience={targetAudience}
      courseModules={courseModules}
      isFree={dataSource.isFree}
      onStartLearning={handleStartLearning}
      onWhatsApp={undefined}
      learningPathExtended={false}
      showRelatedBlog={true}
    />
  );
};

export default CourseOutlineTemplate; 