import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseLayout from '../../../layouts/CourseLayout';
import CourseOutline from '../../../features/course/CourseOutline';
import CourseQuiz from '../../../features/course/CourseQuiz';
import { useLanguage } from '../../../contexts/LanguageContext';

// 🎯 AI 商業自動化課程數據配置
const aiBusinessAutomationCourseData = {
  // 基本課程信息
  title: 'AI Business Automation Mastery',
  titleCht: 'AI 商業自動化大師班',
  subtitle: 'Transform Your Business with Intelligent Automation',
  subtitleCht: '用智能自動化轉變你的業務',
  
  // 講師信息
  instructor: {
    name: 'Dr. Alex Chen',
    nameCht: '陳博士',
    title: 'AI Business Consultant & Former Google AI Engineer',
    titleCht: 'AI 商業顧問及前 Google AI 工程師',
    avatar: '/images/instructors/alex-chen.jpg',
    experience: '10+ years',
    students: '50,000+',
    rating: 4.9,
    bio: 'Dr. Chen has led AI transformation projects for Fortune 500 companies and helped businesses save millions through intelligent automation.',
    bioCht: '陳博士曾為財富500強企業領導AI轉型項目，幫助企業通過智能自動化節省數百萬美元。',
    achievements: [
      'Former Google AI Team Lead',
      'Published 50+ AI Research Papers',
      'Consulted for 200+ Businesses',
      'TEDx Speaker on AI Innovation'
    ],
    achievementsCht: [
      '前Google AI團隊負責人',
      '發表50+篇AI研究論文',
      '為200+企業提供諮詢',
      'AI創新TEDx演講者'
    ]
  },

  // 課程特色
  features: [
    'Live AI Implementation Sessions',
    '1-on-1 Business Analysis',
    'Custom Automation Blueprint',
    'Lifetime Access & Updates',
    'Private Community Access',
    'Certificate of Completion'
  ],
  featuresCht: [
    '實時AI實施會議',
    '一對一業務分析',
    '定制自動化藍圖',
    '終身訪問和更新',
    '私人社區訪問',
    '完成證書'
  ],

  // 詳細課程模塊
  modules: [
    {
      id: 'foundation',
      title: 'AI Business Foundations',
      titleCht: 'AI商業基礎',
      duration: '3 hours',
      durationCht: '3小時',
      lessons: [
        {
          title: 'Understanding AI in Business Context',
          titleCht: '理解商業環境中的AI',
          duration: '45 min',
          type: 'video',
          isLocked: false
        },
        {
          title: 'ROI Analysis for AI Projects',
          titleCht: 'AI項目的ROI分析',
          duration: '60 min',
          type: 'video',
          isLocked: false
        },
        {
          title: 'Building Your AI Strategy',
          titleCht: '構建你的AI策略',
          duration: '75 min',
          type: 'workshop',
          isLocked: false
        }
      ]
    },
    {
      id: 'automation',
      title: 'Process Automation',
      titleCht: '流程自動化',
      duration: '4 hours',
      durationCht: '4小時',
      lessons: [
        {
          title: 'Identifying Automation Opportunities',
          titleCht: '識別自動化機會',
          duration: '60 min',
          type: 'video',
          isLocked: false
        },
        {
          title: 'Workflow Design & Optimization',
          titleCht: '工作流程設計與優化',
          duration: '90 min',
          type: 'hands-on',
          isLocked: false
        },
        {
          title: 'Implementation Best Practices',
          titleCht: '實施最佳實踐',
          duration: '90 min',
          type: 'case-study',
          isLocked: false
        }
      ]
    },
    {
      id: 'tools',
      title: 'AI Tools & Platforms',
      titleCht: 'AI工具與平台',
      duration: '5 hours',
      durationCht: '5小時',
      lessons: [
        {
          title: 'No-Code AI Solutions',
          titleCht: '無代碼AI解決方案',
          duration: '2 hours',
          type: 'hands-on',
          isLocked: false
        },
        {
          title: 'API Integration Strategies',
          titleCht: 'API集成策略',
          duration: '2 hours',
          type: 'technical',
          isLocked: false
        },
        {
          title: 'Custom AI Development',
          titleCht: '定制AI開發',
          duration: '1 hour',
          type: 'advanced',
          isLocked: false
        }
      ]
    }
  ],

  // 學習成果
  learningOutcomes: [
    'Identify high-impact automation opportunities in your business',
    'Design and implement AI-powered workflows',
    'Calculate ROI for AI automation projects',
    'Choose the right AI tools for your specific needs',
    'Build a comprehensive AI transformation roadmap',
    'Manage AI projects from conception to deployment'
  ],
  learningOutcomesCht: [
    '識別你業務中的高影響自動化機會',
    '設計和實施AI驅動的工作流程',
    '計算AI自動化項目的ROI',
    '為你的特定需求選擇合適的AI工具',
    '構建全面的AI轉型路線圖',
    '從構思到部署管理AI項目'
  ],

  // 目標受眾
  targetAudience: [
    'Business Owners & Entrepreneurs',
    'Operations Managers',
    'Digital Transformation Leaders',
    'Consultants & Analysts',
    'Anyone looking to scale with AI'
  ],
  targetAudienceCht: [
    '企業主和創業者',
    '運營經理',
    '數字轉型領導者',
    '顧問和分析師',
    '任何希望用AI擴展的人'
  ],

  // 常見問題
  faqs: [
    {
      question: 'Do I need technical background?',
      questionCht: '我需要技術背景嗎？',
      answer: 'No! This course is designed for business professionals. We focus on strategy and implementation, not coding.',
      answerCht: '不需要！本課程專為商業專業人士設計。我們專注於策略和實施，而不是編程。'
    },
    {
      question: 'How long will it take to see results?',
      questionCht: '多久能看到結果？',
      answer: 'Most students implement their first automation within 2-4 weeks and see measurable ROI within 90 days.',
      answerCht: '大多數學生在2-4週內實施第一個自動化項目，並在90天內看到可衡量的ROI。'
    },
    {
      question: 'What if my business is too small for AI?',
      questionCht: '如果我的企業太小無法使用AI怎麼辦？',
      answer: 'AI automation works for businesses of all sizes. We\'ll show you cost-effective solutions that scale with your growth.',
      answerCht: 'AI自動化適用於各種規模的企業。我們會向你展示隨著增長而擴展的成本效益解決方案。'
    }
  ],

  // 相關博客文章
  relatedPosts: [
    {
      id: 'ai-automation-roi',
      title: '5 Ways AI Automation Delivers 300% ROI',
      titleCht: '5種AI自動化實現300% ROI的方法',
      excerpt: 'Learn the proven strategies that deliver massive returns...',
      excerptCht: '學習實現巨大回報的經過驗證的策略...',
      image: '/images/blog/ai-roi.jpg',
      readTime: '8 min read',
      readTimeCht: '8分鐘閱讀'
    },
    {
      id: 'automation-mistakes',
      title: 'Top 10 AI Automation Mistakes to Avoid',
      titleCht: '避免的10個AI自動化錯誤',
      excerpt: 'Common pitfalls that can cost your business...',
      excerptCht: '可能讓你的企業付出代價的常見陷阱...',
      image: '/images/blog/mistakes.jpg',
      readTime: '6 min read', 
      readTimeCht: '6分鐘閱讀'
    }
  ],

  // 定價信息
  pricing: {
    free: {
      price: 'Free',
      priceCht: '免費',
      features: ['3 Foundation Lessons', 'Basic Templates', 'Community Access'],
      featuresCht: ['3個基礎課程', '基本模板', '社區訪問']
    },
    pro: {
      price: '$497',
      priceCht: '$497',
      originalPrice: '$997',
      originalPriceCht: '$997',
      features: [
        'Complete Course Access',
        '1-on-1 Strategy Session',
        'Custom Automation Blueprint',
        'Private Mastermind Group',
        'Lifetime Updates'
      ],
      featuresCht: [
        '完整課程訪問',
        '一對一策略會議',
        '定制自動化藍圖',
        '私人大師班群組',
        '終身更新'
      ]
    }
  },

  // 主題色彩配置
  theme: {
    primary: 'blue',
    gradient: 'from-blue-600 to-purple-600',
    accent: 'purple'
  }
};

// 🎯 測驗數據配置
const quizData = {
  themes: [
    {
      id: 'foundations',
      title: 'AI Business Foundations',
      titleCht: 'AI商業基礎',
      color: 'blue',
      questions: [
        {
          id: 1,
          question: 'What is the most important factor when evaluating AI automation opportunities?',
          questionCht: '評估AI自動化機會時最重要的因素是什麼？',
          options: [
            'Technical complexity',
            'Cost savings potential', 
            'Employee resistance',
            'Implementation timeline'
          ],
          optionsCht: [
            '技術複雜性',
            '成本節約潛力',
            '員工阻力',
            '實施時間表'
          ],
          correctAnswer: 1,
          explanation: 'Cost savings potential is the primary driver for ROI in AI automation projects.',
          explanationCht: '成本節約潛力是AI自動化項目ROI的主要驅動因素。'
        },
        {
          id: 2,
          question: 'Which business process is typically the best candidate for initial AI automation?',
          questionCht: '哪個業務流程通常是初始AI自動化的最佳候選？',
          options: [
            'Creative strategy development',
            'High-volume repetitive tasks',
            'Complex decision making',
            'Customer relationship building'
          ],
          optionsCht: [
            '創意策略開發',
            '大量重複性任務',
            '複雜決策制定',
            '客戶關係建立'
          ],
          correctAnswer: 1,
          explanation: 'High-volume repetitive tasks offer the clearest ROI and lowest implementation risk.',
          explanationCht: '大量重複性任務提供最清晰的ROI和最低的實施風險。'
        }
      ]
    },
    {
      id: 'implementation',
      title: 'Implementation Strategies',
      titleCht: '實施策略',
      color: 'purple',
      questions: [
        {
          id: 3,
          question: 'What is the recommended approach for rolling out AI automation in a business?',
          questionCht: '在企業中推出AI自動化的推薦方法是什麼？',
          options: [
            'Automate everything at once',
            'Start with pilot projects',
            'Focus only on cost-cutting',
            'Wait for perfect solutions'
          ],
          optionsCht: [
            '一次自動化所有內容',
            '從試點項目開始',
            '只專注於削減成本',
            '等待完美解決方案'
          ],
          correctAnswer: 1,
          explanation: 'Starting with pilot projects allows you to learn, optimize, and build confidence before scaling.',
          explanationCht: '從試點項目開始讓你在擴展之前學習、優化和建立信心。'
        }
      ]
    }
  ]
};

// 🎯 主要頁面組件
const AIBusinessAutomationCoursePage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [currentView, setCurrentView] = useState<'outline' | 'learning' | 'quiz'>('outline');

  // 課程大綱視圖
  const renderCourseOutline = () => (
    <CourseOutline
      // 基本信息
      title={aiBusinessAutomationCourseData.title}
      titleCht={aiBusinessAutomationCourseData.titleCht}
      subtitle={aiBusinessAutomationCourseData.subtitle}
      subtitleCht={aiBusinessAutomationCourseData.subtitleCht}
      
      // 講師信息
      instructor={aiBusinessAutomationCourseData.instructor}
      
      // 課程特色和模塊
      features={aiBusinessAutomationCourseData.features}
      featuresCht={aiBusinessAutomationCourseData.featuresCht}
      modules={aiBusinessAutomationCourseData.modules}
      
      // 學習成果和目標受眾
      learningOutcomes={aiBusinessAutomationCourseData.learningOutcomes}
      learningOutcomesCht={aiBusinessAutomationCourseData.learningOutcomesCht}
      targetAudience={aiBusinessAutomationCourseData.targetAudience}
      targetAudienceCht={aiBusinessAutomationCourseData.targetAudienceCht}
      
      // FAQ 和相關內容
      faqs={aiBusinessAutomationCourseData.faqs}
      relatedPosts={aiBusinessAutomationCourseData.relatedPosts}
      
      // 配置選項
      isFree={false} // 這是付費課程
      theme={aiBusinessAutomationCourseData.theme}
      
      // 事件處理
      onEnrollFree={() => {
        console.log('Enrolling in free version...');
        setCurrentView('learning');
      }}
      onEnrollPro={() => {
        console.log('Enrolling in pro version...');
        setCurrentView('learning');
      }}
      onStartQuiz={() => {
        console.log('Starting quiz...');
        setCurrentView('quiz');
      }}
      onBackClick={() => navigate('/courses')}
    />
  );

  // 學習進度視圖（使用 CourseLayout）
  const renderLearningView = () => (
    <CourseLayout
      // 課程基本信息
      courseTitle={aiBusinessAutomationCourseData.title}
      courseTitleCht={aiBusinessAutomationCourseData.titleCht}
      
      // 學習進度數據（模擬）
      progressData={{
        overall: 65,
        themes: [
          { id: 'foundations', progress: 100, isCompleted: true },
          { id: 'automation', progress: 80, isCompleted: false },
          { id: 'tools', progress: 20, isCompleted: false }
        ]
      }}
      
      // 技能雷達數據（模擬）
      skillsData={[
        { skill: 'AI Strategy', skillCht: 'AI策略', level: 85 },
        { skill: 'Process Design', skillCht: '流程設計', level: 70 },
        { skill: 'Tool Selection', skillCht: '工具選擇', level: 60 },
        { skill: 'ROI Analysis', skillCht: 'ROI分析', level: 75 },
        { skill: 'Implementation', skillCht: '實施', level: 50 }
      ]}
      
      // 統計數據（模擬）
      stats={{
        totalHours: 24,
        completedLessons: 15,
        totalLessons: 23,
        certificatesEarned: 1
      }}
      
      // 成就徽章（模擬）
      achievements={[
        {
          id: 'first-automation',
          title: 'First Automation',
          titleCht: '第一個自動化',
          description: 'Completed your first AI automation project',
          descriptionCht: '完成了你的第一個AI自動化項目',
          icon: '🤖',
          isEarned: true,
          earnedDate: '2024-01-15'
        },
        {
          id: 'roi-master',
          title: 'ROI Master',
          titleCht: 'ROI大師',
          description: 'Achieved 200%+ ROI on automation project',
          descriptionCht: '在自動化項目中實現200%+的ROI',
          icon: '💰',
          isEarned: true,
          earnedDate: '2024-01-20'
        },
        {
          id: 'process-expert',
          title: 'Process Expert',
          titleCht: '流程專家',
          description: 'Optimized 5+ business processes',
          descriptionCht: '優化了5+個業務流程',
          icon: '⚡',
          isEarned: false
        }
      ]}
      
      // 學習單元數據
      units={aiBusinessAutomationCourseData.modules.map((module, index) => ({
        id: module.id,
        title: module.title,
        titleCht: module.titleCht,
        description: `Master ${module.title.toLowerCase()} concepts and applications`,
        descriptionCht: `掌握${module.titleCht}概念和應用`,
        icon: ['🎯', '⚙️', '🛠️'][index] || '📚',
        progress: [100, 80, 20][index] || 0,
        isCompleted: [true, false, false][index] || false,
        estimatedTime: module.duration,
        estimatedTimeCht: module.durationCht
      }))}
      
      // 事件處理
      onBackClick={() => setCurrentView('outline')}
      onUnitClick={(unitId) => {
        console.log(`Opening unit: ${unitId}`);
        // 這裡可以導航到具體的單元學習頁面
      }}
      onQuizClick={() => setCurrentView('quiz')}
    />
  );

  // 測驗視圖
  const renderQuizView = () => (
    <CourseQuiz
      courseTitle={aiBusinessAutomationCourseData.title}
      courseTitleCht={aiBusinessAutomationCourseData.titleCht}
      themes={quizData.themes}
      themeColors={['blue', 'purple', 'green', 'yellow']}
      
      // 配置選項
      showScore={true}
      allowRetake={true}
      
      // 事件處理
      onQuizComplete={(results) => {
        console.log('Quiz completed:', results);
        // 處理測驗完成邏輯
      }}
      onBackClick={() => setCurrentView('learning')}
    />
  );

  // 根據當前視圖渲染對應組件
  const renderCurrentView = () => {
    switch (currentView) {
      case 'learning':
        return renderLearningView();
      case 'quiz':
        return renderQuizView();
      default:
        return renderCourseOutline();
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentView()}
    </div>
  );
};

export default AIBusinessAutomationCoursePage; 