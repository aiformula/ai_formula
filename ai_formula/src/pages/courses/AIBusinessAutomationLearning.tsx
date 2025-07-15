import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Play, CheckCircle, Clock, BookOpen, Users, Award, 
  ChevronDown, ChevronUp, Target, TrendingUp, MessageSquare, 
  Star, Lightbulb, Brain, Zap, BarChart3, Trophy, Flame
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

const AIBusinessAutomationLearning: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';
  const [expandedModules, setExpandedModules] = useState<number[]>([1]);
  const [completedLessons, setCompletedLessons] = useState<number[]>([1, 2]);

  const courseData = {
    title: isZhHK ? 'AI 商業自動化實戰課程' : 'AI Business Automation Practice',
    welcomeMessage: isZhHK ? '歡迎您來，AI 學習者！' : 'Welcome, AI Learner!',
    progress: 25,
    totalTime: isZhHK ? '45分鐘 已學習 / 5.5小時 總計' : '45min Learned / 5.5h Total',
    totalModules: isZhHK ? '3 大主題 • 9 單元' : '3 Themes • 9 Units',
    students: 1247,
    rating: 4.8,
  };

  const modules = [
    {
      id: 1,
      themeTitle: isZhHK ? 'AI 商業自動化基礎：為你的事業裝上智慧引擎' : 'AI Business Automation Fundamentals: Powering Your Business with Smart Engine',
      themeDescription: isZhHK ? '這個部分將帶您了解什麼是 AI 自動化，以及它如何為您的企業節省時間、降低成本，成為最聰明的競爭優勢。' : 'This section will help you understand what AI automation is and how it can save time, reduce costs, and become the smartest competitive advantage for your business.',
      title: isZhHK ? '課程模塊 1：打好地基，看懂趨勢' : 'Course Module 1: Building Foundation, Understanding Trends',
      duration: isZhHK ? '90分鐘 • 3單元' : '90min • 3 units',
      isExpanded: true,
      lessons: [
        { 
          id: 1, 
          title: isZhHK ? '單元 1：什麼是「AI 商業自動化」？不只是取代人力，更是升級戰力！' : 'Unit 1: What is "AI Business Automation"? Not just replacing manpower, but upgrading capabilities!', 
          duration: '20分鐘', 
          completed: true,
          description: isZhHK ? '介紹傳統自動化 (如設定郵件排程) 與 AI 自動化的區別。AI 自動化能「理解、判斷、創造」，處理更複雜的任務，例如自動回覆客戶的複雜問題。' : 'Introduction to the differences between traditional automation (like email scheduling) and AI automation. AI automation can "understand, judge, create" and handle more complex tasks, such as automatically replying to complex customer inquiries.'
        },
        { 
          id: 2, 
          title: isZhHK ? '單元 2：為什麼現在必須導入？三大核心優勢：省時、省錢、防錯' : 'Unit 2: Why must we implement now? Three core advantages: Save time, save money, prevent errors', 
          duration: '25分鐘', 
          completed: true,
          description: isZhHK ? '分析導入 AI 自動化的投資回報。透過實際案例，說明如何將員工從重複性高的庶務中解放，專注於更有價值的策略性工作。' : 'Analyzing the ROI of implementing AI automation. Through real cases, explaining how to free employees from highly repetitive tasks to focus on more valuable strategic work.'
        },
        { 
          id: 3, 
          title: isZhHK ? '單元 3：認識你的自動化工具箱：Zapier, Make 與 API 基礎' : 'Unit 3: Know your automation toolbox: Zapier, Make and API basics', 
          duration: '45分鐘', 
          completed: false,
          description: isZhHK ? '實用工具入門介紹。了解如何透過 Zapier 或 Make 等平台，像玩樂高一樣，將不同的軟體 (如 Gmail, Google Sheets, LINE) 與 AI 串接起來，無需寫程式。' : 'Practical tool introduction. Learn how to connect different software (like Gmail, Google Sheets, LINE) with AI through platforms like Zapier or Make, like playing with Lego, without programming.'
        }
      ],
      quiz: {
        title: isZhHK ? '小測驗 1' : 'Quiz 1',
        questions: [
          {
            question: isZhHK ? '下列何者是「AI 自動化」最擅長處理的任務？' : 'Which of the following is the task that "AI automation" is best at handling?',
            options: [
              isZhHK ? '(A) 泡一杯咖啡' : '(A) Making a cup of coffee',
              isZhHK ? '(B) 自動分類並回覆上百封內容各異的客服郵件' : '(B) Automatically categorizing and replying to hundreds of customer service emails with different contents',
              isZhHK ? '(C) 影印文件' : '(C) Photocopying documents'
            ]
          },
          {
            question: isZhHK ? '導入 AI 自動化，對企業最直接的好處是什麼？' : 'What is the most direct benefit of implementing AI automation for enterprises?',
            options: [
              isZhHK ? '(A) 辦公室看起來更高級' : '(A) Making the office look more advanced',
              isZhHK ? '(B) 讓老闆有事做' : '(B) Giving the boss something to do',
              isZhHK ? '(C) 將員工的時間釋放出來，專注於更有創造力與價值的工作' : '(C) Freeing up employees\' time to focus on more creative and valuable work'
            ]
          }
        ]
      },
      tips: {
        title: isZhHK ? '本章小提示 (Note & Tips)' : 'Chapter Tips (Note & Tips)',
        items: [
          isZhHK ? '從「最痛」的地方開始：盤點公司裡最耗時、最重複、最無聊的工作，那通常就是 AI 自動化最好的切入點。' : 'Start from the "most painful" areas: Inventory the most time-consuming, repetitive, and boring work in the company, which is usually the best entry point for AI automation.',
          isZhHK ? '目標先行，工具次之：先清楚定義你想解決什麼「問題」，再去尋找適合的 AI 工具，而不是為了用工具而用。' : 'Goals first, tools second: First clearly define what "problem" you want to solve, then find suitable AI tools, rather than using tools for the sake of using them.',
          isZhHK ? '安全第一：在串接任何服務時，都要優先考慮客戶與公司資料的安全性與隱私權。' : 'Safety first: When connecting any services, always prioritize the security and privacy of customer and company data.'
        ]
      }
    },
    {
      id: 2,
      themeTitle: isZhHK ? '核心應用實戰：三大部門的 AI 自動化魔法' : 'Core Application Practice: AI Automation Magic for Three Major Departments',
      themeDescription: isZhHK ? '本章節將深入行銷、客服、營運三大核心部門，提供可立即上手的 AI 自動化應用案例與流程。' : 'This chapter will dive deep into the three core departments of marketing, customer service, and operations, providing immediately applicable AI automation use cases and processes.',
      title: isZhHK ? '課程模塊 2：部門賦能，效率倍增' : 'Course Module 2: Department Empowerment, Efficiency Multiplication',
      duration: isZhHK ? '120分鐘 • 3單元' : '120min • 3 units',
      isExpanded: false,
      lessons: [
        { 
          id: 4, 
          title: isZhHK ? '單元 1：【行銷自動化】：從文案生成到社群發文，一條龍搞定' : 'Unit 1: [Marketing Automation]: From copywriting to social media posting, one-stop solution', 
          duration: '40分鐘', 
          completed: false,
          description: isZhHK ? '實戰教學：設定一個流程，當你在 Notion 中新增一筆「點子」，AI 會自動生成 FB 貼文草稿、IG 圖說，並排程發布。' : 'Hands-on teaching: Set up a process where when you add an "idea" in Notion, AI will automatically generate FB post drafts, IG captions, and schedule publishing.'
        },
        { 
          id: 5, 
          title: isZhHK ? '單元 2：【客服自動化】：打造 24H 智慧客服，提升客戶滿意度' : 'Unit 2: [Customer Service Automation]: Building 24H smart customer service, improving customer satisfaction', 
          duration: '45分鐘', 
          completed: false,
          description: isZhHK ? '實戰教學：將官網的常見問題 (FAQ) 訓練成一個 AI 知識庫，當客戶透過 LINE 或 Messenger 提問時，AI 能即時提供準確回覆。' : 'Hands-on teaching: Train the website\'s FAQ into an AI knowledge base, so when customers ask questions through LINE or Messenger, AI can provide accurate responses instantly.'
        },
        { 
          id: 6, 
          title: isZhHK ? '單元 3：【營運自動化】：報表整理與資訊擷取的智慧幫手' : 'Unit 3: [Operations Automation]: Smart assistant for report organization and information extraction', 
          duration: '35分鐘', 
          completed: false,
          description: isZhHK ? '實戰教學：設定一個流程，每日自動抓取網路上的特定新聞或評論，由 AI 進行摘要與情緒分析，最後彙整成一份報告發送到你的 Email。' : 'Hands-on teaching: Set up a process to automatically fetch specific news or reviews from the internet daily, have AI perform summary and sentiment analysis, and finally compile a report sent to your email.'
        }
      ],
      quiz: {
        title: isZhHK ? '小測驗 2' : 'Quiz 2',
        questions: [
          {
            question: isZhHK ? '若想讓 AI 自動根據產品特色，生成多篇不同風格的社群媒體廣告文案，這屬於哪個部門的應用？' : 'If you want AI to automatically generate multiple different styles of social media ad copy based on product features, which department application does this belong to?',
            options: [
              isZhHK ? '(A) 行銷自動化' : '(A) Marketing automation',
              isZhHK ? '(B) 客服自動化' : '(B) Customer service automation',
              isZhHK ? '(C) 財務自動化' : '(C) Financial automation'
            ]
          },
          {
            question: isZhHK ? '「當收到一封標題含『客訴』的郵件時，自動標記為高優先級，並通知客服主管。」這個流程主要解決了什麼問題？' : '"When receiving an email with \'complaint\' in the title, automatically mark it as high priority and notify the customer service manager." What problem does this process mainly solve?',
            options: [
              isZhHK ? '(A) 寫報告很麻煩' : '(A) Writing reports is troublesome',
              isZhHK ? '(B) 提升對緊急事件的反應速度' : '(B) Improving response speed to urgent events',
              isZhHK ? '(C) 自動發文' : '(C) Automatic posting'
            ]
          }
        ]
      },
      tips: {
        title: isZhHK ? '本章小提示 (Note & Tips)' : 'Chapter Tips (Note & Tips)',
        items: [
          isZhHK ? '保留「人性溫度」：尤其在客服環節，自動化是為了處理 80% 的常見問題，但要設計好流程，讓 20% 的複雜問題能順利轉接給真人處理。' : 'Preserve "human warmth": Especially in customer service, automation is for handling 80% of common issues, but design the process well so that 20% of complex issues can be smoothly transferred to human handling.',
          isZhHK ? '個人化是關鍵：在行銷自動化中，利用 AI 結合客戶數據，創造個人化的內容，效果遠勝於千篇一律的罐頭訊息。' : 'Personalization is key: In marketing automation, using AI combined with customer data to create personalized content is far more effective than uniform canned messages.',
          isZhHK ? '驗證再執行：由 AI 生成的內容或數據，在正式發布或使用前，建立一個簡單的人工審核環節，確保品質與準確性。' : 'Verify before execution: For content or data generated by AI, establish a simple human review process before formal release or use to ensure quality and accuracy.'
        ]
      }
    },
    {
      id: 3,
      themeTitle: isZhHK ? '進階整合與策略：打造全方位的自動化商業體系' : 'Advanced Integration and Strategy: Building a Comprehensive Automated Business System',
      themeDescription: isZhHK ? '學習如何將單點的自動化流程，整合成一個互相連動的生態系，並評估其效益，為企業打造長期的數位競爭力。' : 'Learn how to integrate single-point automation processes into an interconnected ecosystem and evaluate their benefits, building long-term digital competitiveness for enterprises.',
      title: isZhHK ? '課程模塊 3：建構體系，持續優化' : 'Course Module 3: Building Systems, Continuous Optimization',
      duration: isZhHK ? '120分鐘 • 3單元' : '120min • 3 units',
      isExpanded: false,
      lessons: [
        { 
          id: 7, 
          title: isZhHK ? '單元 1：技巧四【跨系統工作流】：當客戶下單後，會發生什麼事？' : 'Unit 1: Technique 4 [Cross-system Workflow]: What happens after a customer places an order?', 
          duration: '45分鐘', 
          completed: false,
          description: isZhHK ? '設計一個完整的跨系統流程。例如：當 Shopify 商店有新訂單時，自動在會計軟體中建立帳目、更新 Google Sheets 的庫存、並透過 AI 發送一封個人化的感謝信給客戶。' : 'Design a complete cross-system process. For example: when there\'s a new order in a Shopify store, automatically create accounts in accounting software, update inventory in Google Sheets, and send a personalized thank-you letter to the customer through AI.'
        },
        { 
          id: 8, 
          title: isZhHK ? '單元 2：技巧五【打造你的專屬 AI 助理 (Agent)】：訓練它成為專家' : 'Unit 2: Technique 5 [Build Your Personal AI Assistant (Agent)]: Train it to become an expert', 
          duration: '45分鐘', 
          completed: false,
          description: isZhHK ? '介紹如何利用現有工具，為 AI 設定特定角色、知識庫與指令集，打造一個「市場分析助理」或「法務合約初審助理」，執行更專業的任務。' : 'Introduction to how to use existing tools to set specific roles, knowledge bases, and instruction sets for AI, creating a "market analysis assistant" or "legal contract preliminary review assistant" to perform more professional tasks.'
        },
        { 
          id: 9, 
          title: isZhHK ? '單元 3：技巧六【效益評估 (ROI) 與持續優化】：如何證明 AI 的價值？' : 'Unit 3: Technique 6 [ROI Assessment and Continuous Optimization]: How to prove AI\'s value?', 
          duration: '30分鐘', 
          completed: false,
          description: isZhHK ? '學習如何量化 AI 自動化帶來的效益，例如計算節省的工時、提升的訂單轉換率。並根據數據，不斷回頭優化你的自動化流程。' : 'Learn how to quantify the benefits brought by AI automation, such as calculating saved work hours and improved order conversion rates. Based on data, continuously optimize your automation processes.'
        }
      ],
      quiz: {
        title: isZhHK ? '小測驗 3' : 'Quiz 3',
        questions: [
          {
            question: isZhHK ? '「當 A 軟體發生某件事，觸發 B 軟體的 AI 進行分析，再將結果存到 C 軟體。」這屬於哪一種概念？' : '"When something happens in software A, it triggers AI in software B to analyze, then stores the results in software C." What concept does this belong to?',
            options: [
              isZhHK ? '(A) 角色扮演' : '(A) Role playing',
              isZhHK ? '(B) 跨系統工作流' : '(B) Cross-system workflow',
              isZhHK ? '(C) 單點任務' : '(C) Single-point task'
            ]
          },
          {
            question: isZhHK ? '為什麼需要評估 AI 自動化的效益 (ROI)？' : 'Why is it necessary to evaluate the ROI of AI automation?',
            options: [
              isZhHK ? '(A) 為了寫報告交差' : '(A) To write reports for compliance',
              isZhHK ? '(B) 為了向團隊與老闆證明這項投資是值得的，並找到優化方向' : '(B) To prove to the team and boss that this investment is worthwhile and find optimization directions',
              isZhHK ? '(C) 因為大家都這麼做' : '(C) Because everyone else is doing it'
            ]
          }
        ]
      },
      tips: {
        title: isZhHK ? '本章小提示 (Note & Tips)' : 'Chapter Tips (Note & Tips)',
        items: [
          isZhHK ? '將流程「圖象化」：在設計複雜流程前，先用紙筆或心智圖畫出流程圖，能幫助你理清邏輯，避免打結。' : 'Visualize processes: Before designing complex processes, first draw flow charts with pen and paper or mind maps to help clarify logic and avoid tangles.',
          isZhHK ? '從小處擴展：先成功建立一個穩定運作的小型自動化流程，再逐步複製、擴展到公司的其他部門。' : 'Expand from small beginnings: First successfully establish a stable small-scale automation process, then gradually replicate and expand to other departments in the company.',
          isZhHK ? '擁抱學習：AI 技術日新月異，保持開放心態，持續關注新工具與新方法，你的自動化系統才能不斷進化。' : 'Embrace learning: AI technology is constantly evolving, maintain an open mindset, continuously follow new tools and methods, so your automation system can continue to evolve.'
        ]
      }
    }
  ];

  const skillsData = [
    { skill: isZhHK ? '提示設計' : 'Prompt Design', level: 80 },
    { skill: isZhHK ? '創意寫作' : 'Creative Writing', level: 65 },
    { skill: isZhHK ? '基礎編程' : 'Basic Programming', level: 45 },
    { skill: isZhHK ? '少數本學習' : 'Few-shot Learning', level: 70 },
    { skill: isZhHK ? '角色扮演' : 'Role Playing', level: 75 },
    { skill: isZhHK ? '代碼生成' : 'Code Generation', level: 50 }
  ];

  const dailyChallenge = {
    title: isZhHK ? '今日挑戰' : 'Today\'s Challenge',
    description: isZhHK ? 
      '嘗試用簡潔 Prompt 令 AI 寫一首詩：「作為一位深情詩人，幫寫一首關於秋天景致的五言絕句」' :
      'Try using a concise prompt to have AI write a poem: "As a passionate poet, help write a five-character quatrain about autumn scenery"'
  };

  const communityPosts = [
    {
      id: 1,
      title: isZhHK ? '最多人詢問問題' : 'Most Asked Questions',
      content: isZhHK ? '創意寫作任務提示' : 'Creative Writing Task Prompts',
      replies: 23,
      isHot: true
    }
  ];

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Back Button */}
          <motion.div {...fadeIn} className="mb-6">
            <Button
              onClick={() => navigate('/courses/ai-business-automation')}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isZhHK ? '返回課程大綱' : 'Back to Course Outline'}
            </Button>
          </motion.div>

          {/* Welcome Header */}
          <motion.div {...fadeIn} className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{courseData.welcomeMessage}</h1>
                <div className="flex items-center gap-4">
                  <span className="text-xl text-blue-400">{courseData.title}</span>
                  <Badge className="bg-blue-600 text-white px-3 py-1">
                    {isZhHK ? '繼續學習：核心概念和重要實踐' : 'Continue Learning: Core Concepts and Key Practices'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-6 text-sm text-gray-300">
                <span>{courseData.totalTime}</span>
                <span>{courseData.totalModules}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">{isZhHK ? '學習進度' : 'Learning Progress'}: {courseData.progress}%</span>
              </div>
            </div>
            
            <Progress value={courseData.progress} className="h-2 bg-slate-800">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{width: `${courseData.progress}%`}} />
            </Progress>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Course Modules */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Course Modules */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <BookOpen className="w-5 h-5 text-blue-400" />
                      {isZhHK ? '課程模塊' : 'Course Modules'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {modules.map((module, index) => (
                      <div key={module.id} className="space-y-4">
                        {/* Theme Header */}
                        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-4 border border-blue-700/30">
                          <h2 className="text-lg font-bold text-blue-300 mb-2">
                            {isZhHK ? `第${index + 1}大主題` : `Theme ${index + 1}`}：{module.themeTitle}
                          </h2>
                          <p className="text-sm text-gray-300 leading-relaxed">{module.themeDescription}</p>
                        </div>

                        {/* Module Header */}
                        <div 
                          className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg cursor-pointer hover:bg-slate-700/70 transition-colors"
                          onClick={() => toggleModule(module.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{module.title}</h3>
                              <p className="text-sm text-gray-400">{module.duration}</p>
                            </div>
                          </div>
                          {expandedModules.includes(module.id) ? 
                            <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          }
                        </div>
                        
                        {expandedModules.includes(module.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-6 space-y-4"
                          >
                            {/* Lessons */}
                            <div className="space-y-3">
                              {module.lessons.map((lesson) => (
                                <div key={lesson.id} className="bg-slate-600/30 rounded-lg p-4 space-y-2">
                                  <div className="flex items-center gap-3">
                                    {lesson.completed ? (
                                      <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                      <Play className="w-5 h-5 text-blue-400" />
                                    )}
                                    <div className="flex-1">
                                      <h4 className={`font-medium ${lesson.completed ? 'text-green-300' : 'text-white'}`}>
                                        {lesson.title}
                                      </h4>
                                      <p className="text-xs text-gray-500">{lesson.duration}</p>
                                    </div>
                                    {lesson.completed && (
                                      <Badge className="bg-green-600/20 text-green-300 text-xs">
                                        {isZhHK ? '已完成' : 'Completed'}
                                      </Badge>
                                    )}
                                  </div>
                                  {lesson.description && (
                                    <p className="text-sm text-gray-400 leading-relaxed pl-8">
                                      {lesson.description}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>

                            {/* Quiz Section */}
                            {module.quiz && (
                              <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
                                <h4 className="font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                                  <Target className="w-4 h-4" />
                                  {module.quiz.title}
                                </h4>
                                <div className="space-y-4">
                                  {module.quiz.questions.map((question, qIndex) => (
                                    <div key={qIndex} className="space-y-2">
                                      <p className="text-sm text-gray-300 font-medium">
                                        {qIndex + 1}. {question.question}
                                      </p>
                                      <div className="space-y-1 ml-4">
                                        {question.options.map((option, oIndex) => (
                                          <p key={oIndex} className="text-sm text-gray-400">
                                            {option}
                                          </p>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Tips Section */}
                            {module.tips && (
                              <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
                                <h4 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                                  <Lightbulb className="w-4 h-4" />
                                  {module.tips.title}
                                </h4>
                                <div className="space-y-2">
                                  {module.tips.items.map((tip, tipIndex) => (
                                    <p key={tipIndex} className="text-sm text-gray-300 leading-relaxed">
                                      • {tip}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Daily AI Focus */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Lightbulb className="w-5 h-5 text-purple-400" />
                      {isZhHK ? '每日 AI 焦點' : 'Daily AI Focus'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-yellow-400 mb-2">{dailyChallenge.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{dailyChallenge.description}</p>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-3">
                        <input 
                          type="text" 
                          placeholder={isZhHK ? "完成挑戰" : "Complete Challenge"}
                          className="w-full bg-transparent text-gray-300 placeholder-gray-500 border-none outline-none"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

            </div>

            {/* Right Column */}
            <div className="space-y-6">
              
              {/* Skills Radar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <BarChart3 className="w-5 h-5 text-blue-400" />
                      {isZhHK ? '技能雷達圖' : 'Skills Radar'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                          {/* Simplified radar visualization */}
                          <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full"></div>
                          <div className="absolute inset-2 border border-blue-500/20 rounded-full"></div>
                          <div className="absolute inset-4 border border-blue-500/10 rounded-full"></div>
                          
                          {/* Skill points */}
                          {skillsData.map((skill, index) => {
                            const angle = (index * 60) * (Math.PI / 180);
                            const radius = (skill.level / 100) * 50;
                            const x = 64 + Math.cos(angle) * radius;
                            const y = 64 + Math.sin(angle) * radius;
                            
                            return (
                              <div
                                key={skill.skill}
                                className="absolute w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1 -translate-y-1"
                                style={{ left: `${x}px`, top: `${y}px` }}
                              />
                            );
                          })}
                        </div>
                        <p className="text-xs text-gray-400">{isZhHK ? '你的AI技能發展情況' : 'Your AI Skills Development'}</p>
                      </div>
                      
                      <div className="space-y-2">
                        {skillsData.slice(0, 4).map((skill) => (
                          <div key={skill.skill} className="flex items-center justify-between text-xs">
                            <span className="text-gray-300">{skill.skill}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-12 bg-slate-700 rounded-full h-1">
                                <div 
                                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                  style={{ width: `${skill.level}%` }}
                                />
                              </div>
                              <span className="text-gray-400 w-8">{skill.level}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Community Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Users className="w-5 h-5 text-orange-400" />
                      {isZhHK ? '社群熱點' : 'Community Hot Topics'}
                      <Badge className="bg-orange-600/20 text-orange-300 text-xs ml-2">
                        124 {isZhHK ? '在線' : 'Online'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {communityPosts.map((post) => (
                        <div key={post.id} className="bg-slate-700/30 rounded-lg p-3">
                          <div className="flex items-start gap-2 mb-2">
                            <Flame className="w-4 h-4 text-orange-500 mt-0.5" />
                            <div className="flex-1">
                              <h4 className="font-medium text-white text-sm">{post.title}</h4>
                              <p className="text-gray-400 text-xs mt-1">{post.content}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <MessageSquare className="w-3 h-3" />
                            <span>{post.replies}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIBusinessAutomationLearning; 