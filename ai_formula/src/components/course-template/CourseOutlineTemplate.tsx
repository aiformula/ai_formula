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
import { CourseConfig } from './types';
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
  config: CourseConfig;
}

const CourseOutlineTemplate: React.FC<CourseOutlineTemplateProps> = ({ config }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';
  
  if (!config) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">{isZhHK ? '課程不存在' : 'Course not found'}</h2>
          <p className="text-gray-400 mb-4">Configuration missing</p>
        </div>
      </div>
    );
  }

  const { dataSource, baseRoute } = config;

  // 動態課程統計
  const courseStats: Array<{ icon: React.ReactNode; label: string; value: string }> = [
    {
      icon: <Clock className="h-6 w-6" />,
      label: isZhHK ? "小時精華內容" : "Hours of Premium Content",
      value: config.courseId === 'prompt-engineering-expert' ? (isZhHK ? '12+' : '12+') : `${dataSource.courseStats.totalHours}+`
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
      value: `${dataSource.courseInfo.students || 0}+`
    }
  ];

  // 動態課程特色 - 根據課程類型調整
  const getCourseFeatures = (): Array<{ icon: React.ReactNode; title: string; description: string; highlight: string }> => {
    const courseId = config.courseId;
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
  const targetAudience = {
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
    // Inject custom outline copy for this course if expert course
    description: isZhHK && config.courseId === 'prompt-engineering-expert' ? (
      `你係咪覺得，同AI傾偈好似隔住一道牆？\n\n` +
      `你問佢問題，佢總係答埋啲行貨、空泛、唔到肉嘅答案？你睇住人哋用AI出神入化，自動寫報告、做分析、甚至寫埋Code，但自己就只可以叫佢講下笑話、寫下罐頭Email？\n\n` +
      `問題唔係AI唔夠勁，而係你未識得同佢溝通嘅真正語言。\n\n` +
      `呢個時代，識得用AI唔再係優勢，識得「驅動」AI先係。《精通提示工程：專家級應用的終極課程》就係你由一個普通AI用家，蛻變成為AI指揮家嘅終極秘笈。\n\n` +
      `呢個課程唔係教你幾條簡單嘅「咒語」，而係由AI Formula 專家團隊為你打造一個完整嘅思維體系。我哋會帶你由零開始，深入理解大型語言模型嘅內在邏輯，再逐步解鎖由淺入深嘅提示策略。你將會學識點樣設計出結構嚴謹、能夠引導AI進行複雜推理同多步工作流嘅「系統級提示」。\n\n` +
      `學完之後，AI對你嚟講唔再係一個玩具，而係一個可以24小時待命、能力超強嘅專家團隊，隨時聽你調遣，解決你喺工作、學習同創作上最棘手嘅問題。\n\n` +
      `準備好掌握呢項定義未來十年嘅核心超能力未？`
    ) : undefined,
    instructor: isZhHK ? dataSource.courseInfo.instructor : (dataSource.courseInfo.instructorEn || dataSource.courseInfo.instructor),
    instructorTitle: isZhHK ? dataSource.courseInfo.instructorTitle : (dataSource.courseInfo.instructorTitleEn || dataSource.courseInfo.instructorTitle),
    rating: dataSource.courseInfo.rating,
    students: dataSource.courseInfo.students,
    duration: isZhHK ? dataSource.courseInfo.duration : (dataSource.courseInfo.durationEn || dataSource.courseInfo.duration),
    lastUpdated: dataSource.courseInfo.lastUpdated
  };

  // 轉換課程模組格式（確保按 id 排序）
  const courseModules = [...dataSource.courseModules]
    .sort((a: any, b: any) => (a?.id ?? 0) - (b?.id ?? 0))
    .map((module: any) => ({
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
      courseInfoTags={[
        { name: isZhHK ? '系統級提示範本' : 'System prompt templates', icon: <Target className="w-4 h-4" />, status: 'featured' },
        { name: isZhHK ? '進階推理策略（CoT/ToT/ReAct）' : 'Advanced reasoning strategies', icon: <Brain className="w-4 h-4" />, status: 'featured' },
        { name: isZhHK ? 'RAG 問答與智能體工作流' : 'RAG QA & agent workflows', icon: <Search className="w-4 h-4" />, status: 'featured' },
        { name: isZhHK ? '安全護欄與評測' : 'Guardrails & evaluation', icon: <UserCheck className="w-4 h-4" />, status: 'featured' }
      ]}
      availableCourses={[]}
      latestNews={undefined}
      pricingInfo={undefined}
      courseFeatures={getCourseFeatures()}
      faqData={dataSource.faqData && dataSource.faqData.length > 0 ? dataSource.faqData : [
        { question: isZhHK ? '我係AI新手，會唔會太難？' : 'I am new to AI. Is this too hard?', answer: isZhHK ? '唔會。課程由基礎開始，以大量比喻與實例逐步建立能力；適合新手至進階。' : 'No. We start from the basics with analogies and examples, suitable for beginners to advanced users.' },
        { question: isZhHK ? '同免費教學有咩分別？' : 'How is this different from free tutorials?', answer: isZhHK ? '重點在於「系統級」方法：提示鏈、RAG、智能體與安全治理，提供可落地嘅專家級實戰。' : 'We focus on system-level methods: prompt chaining, RAG, agents and governance for production-ready practice.' },
        { question: isZhHK ? '課程時長與模式？' : 'Duration and mode?', answer: isZhHK ? '10–12+ 小時精華內容，22+ 實戰單元；線上自學、可隨時重溫。' : '10–12+ hours of content in 22+ units; self-paced online with unlimited rewatch.' },
        { question: isZhHK ? '完成後有咩得著？' : 'What will I achieve?', answer: isZhHK ? '由「使用者」進化成「駕馭者」，能設計 AI 解決方案，提升個人與團隊效能。' : 'Transform from user to driver, design AI solutions, and boost team productivity.' }
      ]}
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