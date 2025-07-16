import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Play, CheckCircle, Clock, BookOpen, ArrowRight,
  Target, Trophy, Star, Lightbulb, Users, Award,
  TrendingUp, Zap, BarChart3, AlertCircle, ChevronRight, Video
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

const AIBusinessAutomationTheme: React.FC = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  // 主題數據
  const themes = {
    '1': {
      id: 1,
      title: isZhHK ? 'AI 商業自動化基礎：為你的事業裝上智慧引擎' : 'AI Business Automation Basics',
      description: isZhHK ? '本章節將深入了解什麼是 AI 自動化，以及它如何為您的企業節省時間、降低成本，成為最聰明的競爭優勢。' : 'This chapter will help you understand what AI automation is and how it can save time, reduce costs, and become the smartest competitive advantage for your business.',
      progress: 75,
      estimatedTime: '90分鐘',
      totalUnits: 3,
      completedUnits: 2,
      units: [
        {
          id: 1,
          title: isZhHK ? '什麼是「AI 商業自動化」？不只是取代人力，更是升級戰力！' : 'What is AI Business Automation?',
          duration: '20分鐘',
          type: 'video',
          completed: true,
          description: isZhHK ? '實戰教學：設定一個流程，當你在 Notion 中新增一筆「點子」，AI 會自動生成 FB 貼文草稿、IG 圖說，並排程發布。' : 'Hands-on: Set up AI-powered social media content generation.'
        },
        {
          id: 2,
          title: isZhHK ? '為什麼現在必須導入？三大核心優勢：省時、省錢、防錯' : 'Why implement now? Three core advantages',
          duration: '25分鐘',
          type: 'video',
          completed: true,
          description: isZhHK ? '實戰教學：將官網的常見問題 (FAQ) 訓練成一個 AI 知識庫，當客戶透過 LINE 或 Messenger 提問時，AI 能即時提供準確回覆。' : 'Hands-on: Train FAQ into AI knowledge base for instant responses.'
        },
        {
          id: 3,
          title: isZhHK ? '認識你的自動化工具箱：Zapier, Make 與 API 基礎' : 'Know your automation toolbox',
          duration: '45分鐘',
          type: 'interactive',
          completed: false,
          current: true,
          description: isZhHK ? '實戰教學：設定一個流程，每日自動抓取網路上的特定新聞或評論，由 AI 進行摘要與情緒分析，最後彙整成一份報告發送到你的 Email。' : 'Hands-on: Set up automated daily information extraction and AI analysis.'
        }
      ],
      quiz: {
        title: isZhHK ? '小測驗 1' : 'Quiz 1',
        description: isZhHK ? '測試你對 AI 商業自動化基礎概念的理解程度' : 'Test your understanding of AI business automation basics',
        questions: 2,
        timeLimit: '10分鐘',
        completed: false,
        attempts: 0
      },
      tips: [
        isZhHK ? '從「最痛」的地方開始：盤點公司裡最耗時、最重複、最無聊的工作，那通常就是 AI 自動化最好的切入點。' : 'Start from the "most painful" areas: Inventory the most time-consuming, repetitive, and boring work in the company.',
        isZhHK ? '個人化是關鍵：在行銷自動化中，利用 AI 結合客戶數據，創造個人化的內容，效果遠勝於千篇一律的罐頭訊息。' : 'Personalization is key: In marketing automation, using AI combined with customer data to create personalized content.',
        isZhHK ? '安全第一：在串接任何服務時，都要優先考慮客戶與公司資料的安全性與隱私權。' : 'Safety first: When connecting any services, always prioritize the security and privacy of customer and company data.'
      ]
    },
    '2': {
      id: 2,
      title: isZhHK ? '核心應用實戰：三大部門的 AI 自動化魔法' : 'Core Applications: AI Automation for Three Key Departments',
      description: isZhHK ? '本章節將深入行銷、客服、營運三大核心部門，提供可立即上手的 AI 自動化應用案例與流程。' : 'This chapter will dive deep into the three core departments of marketing, customer service, and operations.',
      progress: 0,
      estimatedTime: '120分鐘',
      totalUnits: 3,
      completedUnits: 0,
      units: [
        {
          id: 4,
          title: isZhHK ? '【行銷自動化】：從文案生成到社群發文，一條龍搞定' : 'Marketing Automation: From copywriting to social posting',
          duration: '40分鐘',
          type: 'interactive',
          completed: false,
          description: isZhHK ? '實戰教學：設定一個流程，當你在 Notion 中新增一筆「點子」，AI 會自動生成 FB 貼文草稿、IG 圖說，並排程發布。' : 'Hands-on: Set up AI-powered social media content generation.'
        },
        {
          id: 5,
          title: isZhHK ? '【客服自動化】：打造 24H 智慧客服，提升客戶滿意度' : 'Customer Service Automation: 24H smart customer service',
          duration: '45分鐘',
          type: 'interactive',
          completed: false,
          description: isZhHK ? '實戰教學：將官網的常見問題 (FAQ) 訓練成一個 AI 知識庫，當客戶透過 LINE 或 Messenger 提問時，AI 能即時提供準確回覆。' : 'Hands-on: Train FAQ into AI knowledge base for instant responses.'
        },
        {
          id: 6,
          title: isZhHK ? '【營運自動化】：報表整理與資訊擷取的智慧幫手' : 'Operations Automation: Smart assistant for reports',
          duration: '35分鐘',
          type: 'interactive',
          completed: false,
          description: isZhHK ? '實戰教學：設定一個流程，每日自動抓取網路上的特定新聞或評論，由 AI 進行摘要與情緒分析，最後彙整成一份報告發送到你的 Email。' : 'Hands-on: Set up automated daily information extraction and AI analysis.'
        }
      ],
      quiz: {
        title: isZhHK ? '小測驗 2' : 'Quiz 2',
        description: isZhHK ? '測試你對核心應用實戰的掌握程度' : 'Test your understanding of core application practices',
        questions: 2,
        timeLimit: '10分鐘',
        completed: false,
        attempts: 0
      },
      tips: [
        isZhHK ? '保留「人性溫度」：尤其在客服環節，自動化是為了處理 80% 的常見問題，但要設計好流程，讓 20% 的複雜問題能順利轉接給真人處理。' : 'Preserve "human warmth": Especially in customer service, automation is for handling 80% of common issues.',
        isZhHK ? '個人化是關鍵：在行銷自動化中，利用 AI 結合客戶數據，創造個人化的內容，效果遠勝於千篇一律的罐頭訊息。' : 'Personalization is key: In marketing automation, using AI combined with customer data to create personalized content.',
        isZhHK ? '驗證再執行：由 AI 生成的內容或數據，在正式發布或使用前，建立一個簡單的人工審核環節，確保品質與準確性。' : 'Verify before execution: For content or data generated by AI, establish a simple human review process.'
      ]
    },
    '3': {
      id: 3,
      title: isZhHK ? '進階整合與優化：打造專屬的 AI 工作流' : 'Advanced Integration: Build Your AI Workflow',
      description: isZhHK ? '學習如何將單點的自動化流程，整合成一個互相連動的生態系，並評估其效益，為企業打造長期的數位競爭力。' : 'Learn how to integrate single-point automation processes into an interconnected ecosystem.',
      progress: 0,
      estimatedTime: '105分鐘',
      totalUnits: 3,
      completedUnits: 0,
      units: [
        {
          id: 7,
          title: isZhHK ? '【跨系統工作流】：當客戶下單後，會發生什麼事？' : 'Cross-system Workflow: What happens after an order?',
          duration: '45分鐘',
          type: 'interactive',
          completed: false,
          description: isZhHK ? '設計一個完整的跨系統流程。例如：當 Shopify 商店有新訂單時，自動在會計軟體中建立帳目、更新 Google Sheets 的庫存、並透過 AI 發送一封個人化的感謝信給客戶。' : 'Design a complete cross-system process for e-commerce order handling.'
        },
        {
          id: 8,
          title: isZhHK ? '【打造專屬 AI 助理】：訓練它成為專家' : 'Build Personal AI Assistant: Train it to be an expert',
          duration: '45分鐘',
          type: 'interactive',
          completed: false,
          description: isZhHK ? '介紹如何利用現有工具，為 AI 設定特定角色、知識庫與指令集，打造一個「市場分析助理」或「法務合約初審助理」，執行更專業的任務。' : 'Learn how to create specialized AI assistants with specific roles and knowledge bases.'
        },
        {
          id: 9,
          title: isZhHK ? '【效益評估與優化】：如何證明 AI 的價值？' : 'ROI Assessment and Optimization: Prove AI value',
          duration: '30分鐘',
          type: 'interactive',
          completed: false,
          description: isZhHK ? '學習如何量化 AI 自動化帶來的效益，例如計算節省的工時、提升的訂單轉換率。並根據數據，不斷回頭優化你的自動化流程。' : 'Learn how to quantify AI automation benefits and continuously optimize processes.'
        }
      ],
      quiz: {
        title: isZhHK ? '小測驗 3' : 'Quiz 3',
        description: isZhHK ? '測試你對進階整合與優化的理解程度' : 'Test your understanding of advanced integration and optimization',
        questions: 2,
        timeLimit: '10分鐘',
        completed: false,
        attempts: 0
      },
      tips: [
        isZhHK ? '將流程「圖象化」：在設計複雜流程前，先用紙筆或心智圖畫出流程圖，能幫助你理清邏輯，避免打結。' : 'Visualize processes: Before designing complex processes, first draw flow charts to help clarify logic.',
        isZhHK ? '從小處擴展：先成功建立一個穩定運作的小型自動化流程，再逐步複製、擴展到公司的其他部門。' : 'Expand from small beginnings: First successfully establish a stable small-scale automation process.',
        isZhHK ? '擁抱學習：AI 技術日新月異，保持開放心態，持續關注新工具與新方法，你的自動化系統才能不斷進化。' : 'Embrace learning: AI technology is constantly evolving, maintain an open mindset to continuously follow new tools.'
      ]
    }
  };

  const currentTheme = themes[themeId as keyof typeof themes];

  if (!currentTheme) {
    return <div>{isZhHK ? '主題不存在' : 'Theme not found'}</div>;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div 
          className="breadcrumb mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button 
            onClick={() => navigate('/courses/ai-business-automation')}
            className="breadcrumb-item"
          >
            {isZhHK ? '返回課程總覽' : 'Back to Course Overview'}
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">
            {isZhHK ? `第${themeId}大主題` : `Theme ${themeId}`}
          </span>
        </motion.div>

        {/* Theme Header - IMPROVED */}
        <motion.div 
          className="content-section bg-gray-800/50 backdrop-blur-sm border border-white/10 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{currentTheme.id}</span>
              </div>
              <div>
                <Badge className="badge-primary mb-2">
                  {isZhHK ? `第${currentTheme.id}大主題` : `Theme ${currentTheme.id}`}
                </Badge>
                <h1 className="text-3xl font-bold text-white leading-tight mb-2">
                  {currentTheme.title}
                </h1>
                <p className="text-white/70 text-lg">{currentTheme.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-400 mb-1">{currentTheme.progress}%</div>
              <div className="text-sm text-white/70">{isZhHK ? '完成進度' : 'Progress'}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-white/70">
                {currentTheme.completedUnits} / {currentTheme.totalUnits} {isZhHK ? '單元完成' : 'units completed'}
              </span>
              <span className="text-sm text-white/70">{currentTheme.estimatedTime}</span>
            </div>
            <div className="progress-bar progress-bar-large">
              <motion.div 
                className="progress-bar-fill" 
                initial={{ width: 0 }}
                animate={{ width: `${currentTheme.progress}%` }}
                transition={{ delay: 0.5, duration: 1 }}
              ></motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Course Units */}
          <div className="lg:col-span-2">
            <motion.div 
              className="content-section bg-gray-800/50 backdrop-blur-sm border border-white/10 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="content-section-header">
                <BookOpen className="w-6 h-6 text-blue-400 mr-3" />
                <h2 className="content-section-title text-white">{isZhHK ? '課程單元' : 'Course Units'}</h2>
              </div>

              <div className="space-y-4">
                {currentTheme.units.map((unit, index) => (
                  <motion.div
                    key={unit.id}
                    className={`unit-card ${
                      unit.completed ? 'unit-card-completed border-green-400/30 bg-green-400/10' : 
                      unit.current ? 'unit-card-current border-blue-400/30 bg-blue-400/10' : 
                      'border-gray-600/30 bg-gray-700/20'
                    } cursor-pointer`}
                    onClick={() => navigate(`/courses/ai-business-automation/theme/${themeId}/unit/${unit.id}`)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white ${
                          unit.completed ? 'bg-green-500' : 
                          unit.current ? 'bg-blue-500' : 'bg-gray-600'
                        }`}>
                          {unit.completed ? <CheckCircle className="w-6 h-6" /> : 
                           unit.current ? <Play className="w-6 h-6" /> : unit.id}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">{unit.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-white/60">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{unit.duration}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              {unit.type === 'video' ? <Video className="w-3 h-3" /> : <Target className="w-3 h-3" />}
                              <span>{unit.type === 'video' ? (isZhHK ? '影片' : 'Video') : (isZhHK ? '互動' : 'Interactive')}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/40" />
                    </div>
                    
                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                      {unit.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                        unit.completed ? 'bg-green-400/20 text-green-300' : 
                        unit.current ? 'bg-blue-400/20 text-blue-300' : 
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {unit.completed ? (isZhHK ? '已完成' : 'Completed') : 
                         unit.current ? (isZhHK ? '進行中' : 'In Progress') : 
                         (isZhHK ? '待開始' : 'Not Started')}
                      </span>
                      {unit.current && (
                        <Button className="btn-primary text-sm px-4 py-2">
                          {isZhHK ? '繼續學習' : 'Continue'}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quiz Section - HEAVILY IMPROVED */}
            <motion.div 
              className="quiz-container bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="quiz-header">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h2 className="quiz-title text-yellow-300">{currentTheme.quiz.title}</h2>
                <p className="quiz-description text-white/80 mb-6">{currentTheme.quiz.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">{currentTheme.quiz.questions}</div>
                  <div className="text-sm text-white/70">{isZhHK ? '題目數量' : 'Questions'}</div>
                </div>
                <div className="text-center p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <div className="text-3xl font-bold text-orange-400 mb-1">{currentTheme.quiz.timeLimit}</div>
                  <div className="text-sm text-white/70">{isZhHK ? '建議時間' : 'Time Limit'}</div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  className="btn-primary px-8 py-4 text-lg font-bold transform hover:scale-105 transition-all duration-200"
                  onClick={() => navigate(`/courses/ai-business-automation/theme/${themeId}/quiz`)}
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  {isZhHK ? '開始測驗' : 'Start Quiz'}
                </Button>
                <p className="text-white/60 text-sm mt-3">
                  {isZhHK ? '完成所有單元後建議進行測驗' : 'Complete all units before taking the quiz'}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Tips & Progress */}
          <div className="space-y-6">
            {/* Tips Section - IMPROVED */}
            <motion.div 
              className="sidebar-container bg-gray-800/50 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="sidebar-header">
                <h3 className="sidebar-title text-white flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                  {isZhHK ? '本章小提示 (Note & Tips)' : 'Chapter Tips (Note & Tips)'}
                </h3>
              </div>
              <div className="sidebar-content">
                <div className="space-y-4">
                  {currentTheme.tips.map((tip, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-blue-400 text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed">{tip}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Learning Stats */}
            <motion.div 
              className="sidebar-container bg-gray-800/50 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="sidebar-header">
                <h3 className="sidebar-title text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-green-400" />
                  {isZhHK ? '學習統計' : 'Learning Stats'}
                </h3>
              </div>
              <div className="sidebar-content">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                    <span className="text-white/70 text-sm">{isZhHK ? '已完成單元' : 'Completed Units'}</span>
                    <span className="text-green-400 font-bold">{currentTheme.completedUnits}/{currentTheme.totalUnits}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
                    <span className="text-white/70 text-sm">{isZhHK ? '預估剩餘時間' : 'Estimated Remaining'}</span>
                    <span className="text-blue-400 font-bold">{currentTheme.estimatedTime}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg">
                    <span className="text-white/70 text-sm">{isZhHK ? '主題進度' : 'Theme Progress'}</span>
                    <span className="text-purple-400 font-bold">{currentTheme.progress}%</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-center space-x-2 text-blue-300 mb-2">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-medium">{isZhHK ? '學習建議' : 'Learning Tip'}</span>
                  </div>
                  <p className="text-xs text-white/70">
                    {isZhHK ? '建議按順序完成所有單元，再進行測驗以鞏固學習成果。' : 'Complete all units in order before taking the quiz to solidify your learning.'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div 
              className="sidebar-container bg-gray-800/50 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="sidebar-header">
                <h3 className="sidebar-title text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                  {isZhHK ? '下一步行動' : 'Next Steps'}
                </h3>
              </div>
              <div className="sidebar-content space-y-3">
                {/* Check if all units in current theme are completed */}
                {(() => {
                  const allUnitsCompleted = currentTheme.units.every(unit => unit.completed);
                  
                  if (!allUnitsCompleted) {
                    // Still have units to complete
                    const nextUnit = currentTheme.units.find(unit => !unit.completed);
                    return (
                      <Button 
                        className="btn-accent w-full"
                        onClick={() => {
                          if (nextUnit) {
                            navigate(`/courses/ai-business-automation/theme/${themeId}/unit/${nextUnit.id}`);
                          }
                        }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {isZhHK ? `繼續學習 - 單元 ${nextUnit?.id}` : `Continue Learning - Unit ${nextUnit?.id}`}
                      </Button>
                    );
                  } else {
                    // All units completed, show quiz button
                    return (
                      <Button 
                        className="btn-primary w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
                        onClick={() => navigate(`/courses/ai-business-automation/theme/${themeId}/quiz`)}
                      >
                        <Trophy className="w-4 h-4 mr-2" />
                        {isZhHK ? `開始主題 ${themeId} 測驗` : `Take Theme ${themeId} Quiz`}
                      </Button>
                    );
                  }
                })()}
                
                <Button className="btn-secondary w-full">
                  <Users className="w-4 h-4 mr-2" />
                  {isZhHK ? '討論區' : 'Discussion'}
                </Button>
                
                <Button className="btn-secondary w-full">
                  <Award className="w-4 h-4 mr-2" />
                  {isZhHK ? '學習記錄' : 'Learning History'}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation */}
        <motion.div 
          className="unit-navigation mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-between">
            <Button 
              onClick={() => {
                const prevTheme = parseInt(themeId!) - 1;
                if (prevTheme >= 1) {
                  navigate(`/courses/ai-business-automation/theme/${prevTheme}`);
                } else {
                  navigate('/courses/ai-business-automation');
                }
              }}
              className="unit-nav-button"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isZhHK ? '上一主題' : 'Previous Theme'}
            </Button>

            <Button 
              onClick={() => {
                const nextTheme = parseInt(themeId!) + 1;
                if (nextTheme <= 3) {
                  navigate(`/courses/ai-business-automation/theme/${nextTheme}`);
                } else {
                  navigate('/courses/ai-business-automation');
                }
              }}
              className="unit-nav-button-primary"
            >
              {isZhHK ? '下一主題' : 'Next Theme'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIBusinessAutomationTheme; 