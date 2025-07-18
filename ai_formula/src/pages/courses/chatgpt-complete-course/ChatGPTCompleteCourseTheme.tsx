/**
 * ChatGPT Complete Course Theme Module
 * @fileoverview ChatGPT 完整教學實戰課程主題頁面
 * @author AI Formula Team
 * @version 1.0.0
 */

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Clock, BookOpen, CheckCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const ChatGPTCompleteCourseTheme: React.FC = () => {
  const navigate = useNavigate();
  const { themeId } = useParams<{ themeId: string }>();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  const currentThemeId = parseInt(themeId || '1');

  // 主題數據
  const themes = [
    {
      id: 1,
      title: isZhHK ? 'ChatGPT 基礎入門' : 'ChatGPT Fundamentals',
      description: isZhHK ? '瞭解 ChatGPT 基本概念與註冊使用，建立正確的 AI 使用觀念' : 'Understanding ChatGPT basics and getting started',
      lessons: 3,
      duration: 45,
      difficulty: isZhHK ? '入門' : 'Beginner',
      units: [
        { id: 1, title: isZhHK ? 'ChatGPT 介紹與註冊' : 'ChatGPT Introduction & Registration', duration: 15 },
        { id: 2, title: isZhHK ? '界面熟悉與基本操作' : 'Interface Familiarization', duration: 15 },
        { id: 3, title: isZhHK ? '第一次對話實戰' : 'First Conversation Practice', duration: 15 }
      ]
    },
    {
      id: 2,
      title: isZhHK ? '高效 Prompt 實戰手冊' : 'Efficient Prompt Practical Manual',
      description: isZhHK ? '掌握 Prompt 工程技巧，提升回答質量和準確性' : 'Master prompt engineering techniques for better responses',
      lessons: 4,
      duration: 60,
      difficulty: isZhHK ? '中級' : 'Intermediate',
      units: [
        { id: 4, title: isZhHK ? 'Prompt 基礎結構' : 'Basic Prompt Structure', duration: 15 },
        { id: 5, title: isZhHK ? '角色設定技巧' : 'Role Setting Techniques', duration: 15 },
        { id: 6, title: isZhHK ? '情境描述方法' : 'Context Description Methods', duration: 15 },
        { id: 7, title: isZhHK ? '進階 Prompt 策略' : 'Advanced Prompt Strategies', duration: 15 }
      ]
    },
    {
      id: 3,
      title: isZhHK ? 'AI 工具整合指南' : 'AI Tools Integration Guide',
      description: isZhHK ? '學習與其他 AI 工具的協同使用，打造完整工作流程' : 'Learn to integrate with other AI tools',
      lessons: 3,
      duration: 50,
      difficulty: isZhHK ? '中級' : 'Intermediate',
      units: [
        { id: 8, title: isZhHK ? '工具選擇與評估' : 'Tool Selection & Evaluation', duration: 17 },
        { id: 9, title: isZhHK ? '整合工作流程設計' : 'Integrated Workflow Design', duration: 17 },
        { id: 10, title: isZhHK ? '實際整合案例' : 'Real Integration Cases', duration: 16 }
      ]
    },
    {
      id: 4,
      title: isZhHK ? '商業應用實例' : 'Business Application Cases',
      description: isZhHK ? '真實商業場景的 ChatGPT 應用，提升工作效率' : 'Real business scenarios using ChatGPT',
      lessons: 4,
      duration: 65,
      difficulty: isZhHK ? '進階' : 'Advanced',
      units: [
        { id: 11, title: isZhHK ? '內容創作應用' : 'Content Creation Applications', duration: 16 },
        { id: 12, title: isZhHK ? '客戶服務優化' : 'Customer Service Optimization', duration: 16 },
        { id: 13, title: isZhHK ? '數據分析輔助' : 'Data Analysis Assistance', duration: 16 },
        { id: 14, title: isZhHK ? '決策支援系統' : 'Decision Support System', duration: 17 }
      ]
    },
    {
      id: 5,
      title: isZhHK ? '創意專案開發' : 'Creative Project Development',
      description: isZhHK ? '使用 ChatGPT 進行創意內容創作和項目開發' : 'Creative content creation with ChatGPT',
      lessons: 3,
      duration: 55,
      difficulty: isZhHK ? '進階' : 'Advanced',
      units: [
        { id: 15, title: isZhHK ? '創意思維激發' : 'Creative Thinking Stimulation', duration: 18 },
        { id: 16, title: isZhHK ? '專案規劃與執行' : 'Project Planning & Execution', duration: 18 },
        { id: 17, title: isZhHK ? '成果優化與呈現' : 'Result Optimization & Presentation', duration: 19 }
      ]
    },
    {
      id: 6,
      title: isZhHK ? '進階技巧與優化' : 'Advanced Techniques & Optimization',
      description: isZhHK ? '高級使用技巧與效率優化策略，成為 ChatGPT 專家' : 'Advanced usage tips and efficiency optimization',
      lessons: 3,
      duration: 45,
      difficulty: isZhHK ? '專家' : 'Expert',
      units: [
        { id: 18, title: isZhHK ? '高級對話策略' : 'Advanced Conversation Strategies', duration: 15 },
        { id: 19, title: isZhHK ? '效率優化技巧' : 'Efficiency Optimization Techniques', duration: 15 },
        { id: 20, title: isZhHK ? '專家級應用' : 'Expert-level Applications', duration: 15 }
      ]
    }
  ];

  const currentTheme = themes.find(theme => theme.id === currentThemeId) || themes[0];

  const handleBackToLearning = () => {
    navigate('/courses/chatgpt-complete-course/learning');
  };

  const handleUnitClick = (unitId: number) => {
    navigate(`/courses/chatgpt-complete-course/theme/${currentThemeId}/unit/${unitId}`);
  };

  const handleQuizClick = () => {
    navigate(`/courses/chatgpt-complete-course/theme/${currentThemeId}/quiz`);
  };

  return (
    <div className="min-h-screen chatgpt-theme-page bg-gray-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <Button 
              variant="outline"
              onClick={handleBackToLearning}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isZhHK ? '返回學習' : 'Back to Learning'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {currentTheme.title}
              </h1>
              <p className="text-white/70">
                {isZhHK ? `主題 ${currentThemeId}` : `Theme ${currentThemeId}`}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Theme Overview */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>{currentTheme.title}</span>
                <Badge variant="outline" className="text-xs">
                  {currentTheme.difficulty}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 mb-4">
                {currentTheme.description}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-white/60">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {currentTheme.lessons} {isZhHK ? '課程' : 'lessons'}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {currentTheme.duration} {isZhHK ? '分鐘' : 'minutes'}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Units List */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            {isZhHK ? '課程單元' : 'Course Units'}
          </h2>
          
          <div className="space-y-4">
            {currentTheme.units.map((unit, index) => (
              <Card 
                key={unit.id}
                className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer"
                onClick={() => handleUnitClick(unit.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {unit.title}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <Clock className="w-4 h-4" />
                          {unit.duration} {isZhHK ? '分鐘' : 'minutes'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnitClick(unit.id);
                        }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {isZhHK ? '開始學習' : 'Start Learning'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Quiz Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {isZhHK ? '主題測驗' : 'Theme Quiz'}
                  </h3>
                  <p className="text-white/70">
                    {isZhHK ? '完成所有單元後，測試您的學習成果' : 'Test your learning outcomes after completing all units'}
                  </p>
                </div>
                
                <Button
                  onClick={handleQuizClick}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {isZhHK ? '開始測驗' : 'Start Quiz'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <motion.div 
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            variant="outline"
            onClick={() => currentThemeId > 1 && navigate(`/courses/chatgpt-complete-course/theme/${currentThemeId - 1}`)}
            disabled={currentThemeId <= 1}
            className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isZhHK ? '上一主題' : 'Previous Theme'}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => currentThemeId < 6 && navigate(`/courses/chatgpt-complete-course/theme/${currentThemeId + 1}`)}
            disabled={currentThemeId >= 6}
            className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
          >
            {isZhHK ? '下一主題' : 'Next Theme'}
            <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatGPTCompleteCourseTheme; 