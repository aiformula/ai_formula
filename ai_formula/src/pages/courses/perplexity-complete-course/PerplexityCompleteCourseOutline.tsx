/**
 * Perplexity Complete Course Outline Page
 * @fileoverview 使用真實數據的 Perplexity 完整教學實戰課程頁面
 * @author AI Formula Team
 * @version 1.0.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import CourseOutline from '@/features/course/CourseOutline';
import { perplexityCourseData } from '@/data/perplexity-complete-course-data';
import { 
  Clock, 
  Monitor, 
  Users, 
  Brain, 
  Target, 
  Lightbulb,
  Zap,
  Database,
  Smartphone,
  Heart,
  Shield,
  Star,
  TrendingUp,
  BookOpen,
  Search,
  BarChart3,
  Rocket,
  Award,
  CheckCircle,
  Code,
  Globe,
  MessageSquare,
  Edit3,
  FileText,
  Briefcase,
  GraduationCap,
  UserCheck,
  Wand2
} from 'lucide-react';

const PerplexityCompleteCourseOutline: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  // 課程統計 - 動態圖標
  const courseStats = [
    {
      icon: <Clock className="h-6 w-6" />,
      label: isZhHK ? "小時精華內容" : "Hours of Premium Content",
      value: "8+"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      label: isZhHK ? "實戰單元" : "Practical Modules", 
      value: "25+"
    },
    {
      icon: <Target className="h-6 w-6" />,
      label: isZhHK ? "實用技巧" : "Practical Techniques",
      value: "100%"
    },
    {
      icon: <Users className="h-6 w-6" />,
      label: isZhHK ? "學員學習" : "Students Enrolled",
      value: "280+"
    }
  ];

  // 課程特色 - 使用動態圖標
  const courseFeatures = [
    {
      icon: <Search className="h-6 w-6" />,
      title: isZhHK ? "智能搜尋技巧" : "Intelligent Search Techniques",
      description: isZhHK ? "掌握 Perplexity 的高級搜尋功能與查詢優化" : "Master Perplexity's advanced search capabilities and query optimisation",
      highlight: isZhHK ? "核心技能" : "Core Skill"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: isZhHK ? "AI 推理能力" : "AI Reasoning Capabilities",
      description: isZhHK ? "學會運用 Perplexity 的 AI 推理進行深度分析" : "Learn to utilise Perplexity's AI reasoning for in-depth analysis",
      highlight: isZhHK ? "高級應用" : "Advanced Application"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: isZhHK ? "數據研究方法" : "Data Research Methodologies",
      description: isZhHK ? "透過 Perplexity 進行高效的數據收集與分析" : "Efficient data collection and analysis through Perplexity",
      highlight: isZhHK ? "專業技巧" : "Professional Technique"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: isZhHK ? "即時資訊掌握" : "Real-time Information Mastery",
      description: isZhHK ? "利用 Perplexity 獲取最新、最準確的資訊" : "Utilise Perplexity to access the latest and most accurate information",
      highlight: isZhHK ? "實時能力" : "Real-time Capability"
    }
  ];

  // 適合對象 - 使用動態圖標
  const targetAudience = {
    title: isZhHK ? "適合學習對象" : "Suitable for",
    description: isZhHK ? "無論您是 AI 新手還是想要深化技能的專業人士，這門課程都能為您提供價值。" : "Whether you're an AI newcomer or a professional seeking to enhance your skills, this course provides valuable insights.",
    audiences: [
      {
        icon: <Briefcase className="h-6 w-6" />,
        title: isZhHK ? "商業人士" : "Business Professionals",
        description: isZhHK ? "需要快速獲取市場資訊與競爭分析的專業人士" : "Professionals requiring rapid market intelligence and competitive analysis"
      },
      {
        icon: <GraduationCap className="h-6 w-6" />,
        title: isZhHK ? "研究人員" : "Researchers",
        description: isZhHK ? "學者、分析師及需要深度研究的專業工作者" : "Academics, analysts, and professionals requiring comprehensive research capabilities"
      },
      {
        icon: <Edit3 className="h-6 w-6" />,
        title: isZhHK ? "內容創作者" : "Content Creators",
        description: isZhHK ? "記者、作家、行銷人員及媒體工作者" : "Journalists, writers, marketing professionals, and media practitioners"
      },
      {
        icon: <UserCheck className="h-6 w-6" />,
        title: isZhHK ? "學習愛好者" : "Learning Enthusiasts",
        description: isZhHK ? "對新科技好奇，希望提升資訊搜尋能力的人" : "Individuals keen on emerging technologies and enhancing information search capabilities"
      }
    ]
  };

  // 轉換課程模組格式
  const courseModules = perplexityCourseData.courseModules.map(module => ({
    id: module.id,
    title: module.title,
    description: module.description,
    lessons: module.lessons.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      duration: lesson.duration,
      type: 'reading' as const,
      isPreview: false
    }))
  }));

  // 處理開始學習按鈕點擊
  const handleStartLearning = () => {
    navigate('/courses/perplexity-complete-course/learning');
  };

  // 動態課程信息對象 - 支持雙語
  const dynamicCourseInfo = {
    badge: isZhHK ? perplexityCourseData.courseInfo.badge : perplexityCourseData.courseInfo.badgeEn,
    title: isZhHK ? perplexityCourseData.courseInfo.title : perplexityCourseData.courseInfo.titleEn,
    subtitle: isZhHK ? perplexityCourseData.courseInfo.subtitle : perplexityCourseData.courseInfo.subtitleEn,
    instructor: isZhHK ? perplexityCourseData.courseInfo.instructor : perplexityCourseData.courseInfo.instructorEn,
    instructorTitle: isZhHK ? perplexityCourseData.courseInfo.instructorTitle : perplexityCourseData.courseInfo.instructorTitleEn,
    rating: perplexityCourseData.courseInfo.rating,
    students: perplexityCourseData.courseInfo.students,
    duration: isZhHK ? perplexityCourseData.courseInfo.duration : perplexityCourseData.courseInfo.durationEn,
    lastUpdated: perplexityCourseData.courseInfo.lastUpdated
  };

  return (
    <CourseOutline
      courseInfo={dynamicCourseInfo}
      courseStats={courseStats}
      courseInfoTags={[]}
      availableCourses={[]}
      latestNews={undefined}
      pricingInfo={undefined}
      courseFeatures={courseFeatures}
      faqData={perplexityCourseData.faqData}
      targetAudience={targetAudience}
      courseModules={courseModules}
      isFree={perplexityCourseData.isFree}
      onStartLearning={handleStartLearning}
      onWhatsApp={undefined}
      learningPathExtended={false}
      showRelatedBlog={true}
    />
  );
};

export default PerplexityCompleteCourseOutline; 