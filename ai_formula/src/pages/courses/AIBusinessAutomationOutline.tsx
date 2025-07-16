/**
 * AI Business Automation Course Outline Page
 * @fileoverview Course page using the standard CourseTemplate
 * @author AI Formula Team
 * @version 2.0.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseTemplate from '@/components/templates/CourseTemplate';
import Navigation from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';

const AIBusinessAutomationOutline: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  // 定義標準課程模組結構
  const courseModules = [
    {
      id: 'module-1',
      title: 'AI Business Automation Fundamentals',
      titleZh: 'AI 商業自動化基礎',
      description: 'Understanding AI-driven business automation core principles and identifying automation opportunities',
      descriptionZh: '理解 AI 驅動的商業自動化核心原理，識別自動化機會',
      duration: '90 minutes',
      durationZh: '90 分鐘',
      isCompleted: false,
      isLocked: false,
      lessons: [
        {
          id: 'lesson-1-1',
          title: 'What is AI Business Automation?',
          titleZh: '什麼是 AI 商業自動化？',
          duration: '15 min',
          durationZh: '15 分鐘',
          type: 'video',
          isCompleted: false,
          isLocked: false,
        },
        {
          id: 'lesson-1-2',
          title: 'Automation Opportunity Assessment Framework',
          titleZh: '自動化機會評估框架',
          duration: '20 min',
          durationZh: '20 分鐘',
          type: 'reading',
          isCompleted: false,
          isLocked: false,
        },
                 {
           id: 'lesson-1-3',
           title: 'ROI Calculation Practice',
           titleZh: 'ROI 計算實戰練習',
           duration: '10 min',
           durationZh: '10 分鐘',
           type: 'exercise',
           isCompleted: false,
           isLocked: false,
         }
      ]
    },
    {
      id: 'module-2',
      title: 'Customer Service Automation',
      titleZh: '客戶服務自動化',
      description: 'Using AI tools to build intelligent chatbots and automated customer service systems',
      descriptionZh: '使用 AI 工具構建智能聊天機器人和自動化客戶服務系統',
      duration: '120 minutes',
      durationZh: '120 分鐘',
      isCompleted: false,
      isLocked: false,
      lessons: [
        {
          id: 'lesson-2-1',
          title: 'Intelligent Chatbot Design Principles',
          titleZh: '智能聊天機器人設計原理',
          duration: '25 min',
          durationZh: '25 分鐘',
          type: 'video',
          isCompleted: false,
          isLocked: false,
        },
        {
          id: 'lesson-2-2',
          title: 'Customer Journey Mapping Techniques',
          titleZh: '客戶旅程映射技巧',
          duration: '15 min',
          durationZh: '15 分鐘',
          type: 'reading',
          isCompleted: false,
          isLocked: false,
        },
                 {
           id: 'lesson-2-3',
           title: 'Hands-on: Build Your First Customer Service Bot',
           titleZh: '實戰：建立你的第一個客服機器人',
           duration: '20 min',
           durationZh: '20 分鐘',
           type: 'exercise',
           isCompleted: false,
           isLocked: false,
         }
      ]
    },
    {
      id: 'module-3',
      title: 'Advanced Integration and Strategy',
      titleZh: '進階整合與策略',
      description: 'Building comprehensive automated business systems and evaluating their effectiveness',
      descriptionZh: '打造全方位的自動化商業體系並評估其效益',
      duration: '120 minutes',
      durationZh: '120 分鐘',
      isCompleted: false,
      isLocked: false,
      lessons: [
        {
          id: 'lesson-3-1',
          title: 'Cross-system Workflows',
          titleZh: '跨系統工作流',
          duration: '30 min',
          durationZh: '30 分鐘',
          type: 'video',
          isCompleted: false,
          isLocked: false,
        },
                 {
           id: 'lesson-3-2',
           title: 'Building Your Personal AI Assistant',
           titleZh: '打造你的專屬 AI 助理',
           duration: '25 min',
           durationZh: '25 分鐘',
           type: 'exercise',
           isCompleted: false,
           isLocked: false,
         },
        {
          id: 'lesson-3-3',
          title: 'ROI Assessment and Continuous Optimization',
          titleZh: '效益評估與持續優化',
          duration: '20 min',
          durationZh: '20 分鐘',
          type: 'reading',
          isCompleted: false,
          isLocked: false,
        }
      ]
    }
  ];

  const handleEnroll = () => {
    navigate('/auth');
  };

  const handleModuleClick = (moduleId: string) => {
    // 導航到對應的學習頁面
    navigate(`/courses/ai-business-automation/learning?module=${moduleId}`);
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="pt-20">
        <CourseTemplate
          title="AI Business Automation Practice"
          titleZh="AI 商業自動化實戰課程"
          description="Master practical AI automation techniques to transform your business operations and drive growth through intelligent automation solutions."
          descriptionZh="掌握實用的 AI 自動化技術，透過智能自動化解決方案轉型您的業務營運並推動增長。"
          level="intermediate"
          duration="5.5 hours"
          durationZh="5.5 小時"
          rating={4.8}
          studentCount={1247}
          modules={courseModules}
          isEnrolled={false}
          progress={0}
          showProgress={true}
          showRating={true}
          showStudentCount={true}
          onEnroll={handleEnroll}
          onModuleClick={handleModuleClick}
        />
      </div>
    </div>
  );
};

export default AIBusinessAutomationOutline; 