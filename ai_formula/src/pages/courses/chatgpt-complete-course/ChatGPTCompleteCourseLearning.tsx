/**
 * ChatGPT Complete Course Learning Module
 * @fileoverview ChatGPT 完整教學實戰課程學習頁面
 * @author AI Formula Team
 * @version 1.0.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Play, CheckCircle, Clock, BookOpen, 
  Target, Award, ChevronRight, Brain, Users
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

const ChatGPTCompleteCourseLearning: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  // 課程主題數據
  const themes = [
    {
      id: 1,
      title: isZhHK ? 'ChatGPT 基礎入門' : 'ChatGPT Fundamentals',
      description: isZhHK ? '瞭解 ChatGPT 基本概念與註冊使用' : 'Understanding ChatGPT basics and getting started',
      lessons: 3,
      duration: 45,
      difficulty: isZhHK ? '入門' : 'Beginner',
      completed: false,
      progress: 0
    },
    {
      id: 2,
      title: isZhHK ? '高效 Prompt 實戰手冊' : 'Efficient Prompt Practical Manual',
      description: isZhHK ? '掌握 Prompt 工程技巧，提升回答質量' : 'Master prompt engineering techniques for better responses',
      lessons: 4,
      duration: 60,
      difficulty: isZhHK ? '中級' : 'Intermediate',
      completed: false,
      progress: 0
    },
    {
      id: 3,
      title: isZhHK ? 'AI 工具整合指南' : 'AI Tools Integration Guide',
      description: isZhHK ? '學習與其他 AI 工具的協同使用' : 'Learn to integrate with other AI tools',
      lessons: 3,
      duration: 50,
      difficulty: isZhHK ? '中級' : 'Intermediate',
      completed: false,
      progress: 0
    },
    {
      id: 4,
      title: isZhHK ? '商業應用實例' : 'Business Application Cases',
      description: isZhHK ? '真實商業場景的 ChatGPT 應用' : 'Real business scenarios using ChatGPT',
      lessons: 4,
      duration: 65,
      difficulty: isZhHK ? '進階' : 'Advanced',
      completed: false,
      progress: 0
    },
    {
      id: 5,
      title: isZhHK ? '創意專案開發' : 'Creative Project Development',
      description: isZhHK ? '使用 ChatGPT 進行創意內容創作' : 'Creative content creation with ChatGPT',
      lessons: 3,
      duration: 55,
      difficulty: isZhHK ? '進階' : 'Advanced',
      completed: false,
      progress: 0
    },
    {
      id: 6,
      title: isZhHK ? '進階技巧與優化' : 'Advanced Techniques & Optimization',
      description: isZhHK ? '高級使用技巧與效率優化策略' : 'Advanced usage tips and efficiency optimization',
      lessons: 3,
      duration: 45,
      difficulty: isZhHK ? '專家' : 'Expert',
      completed: false,
      progress: 0
    }
  ];

  const handleThemeClick = (themeId: number) => {
    navigate(`/courses/chatgpt-complete-course/theme/${themeId}`);
  };

  const handleBackToCourse = () => {
    navigate('/courses/chatgpt-complete-course');
  };

  const totalProgress = 0; // 簡化版本，設為0
  const completedThemes = 0;

  return (
    <div className="min-h-screen bg-gray-900">
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
              onClick={handleBackToCourse}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isZhHK ? '返回課程' : 'Back to Course'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {isZhHK ? 'ChatGPT 完整教學實戰' : 'ChatGPT Complete Course'}
              </h1>
              <p className="text-white/70">
                {isZhHK ? '學習進度總覽' : 'Learning Progress Overview'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="w-5 h-5 mr-2" />
                {isZhHK ? '整體進度' : 'Overall Progress'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/70">
                  {isZhHK ? '課程完成度' : 'Course Completion'}
                </span>
                <span className="text-white font-semibold">
                  {totalProgress}%
                </span>
              </div>
              <Progress value={totalProgress} className="mb-6" />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-400">
                    {completedThemes}
                  </div>
                  <div className="text-sm text-white/70">
                    {isZhHK ? '已完成主題' : 'Completed Themes'}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {themes.length}
                  </div>
                  <div className="text-sm text-white/70">
                    {isZhHK ? '總主題數' : 'Total Themes'}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">
                    {themes.reduce((total, theme) => total + theme.lessons, 0)}
                  </div>
                  <div className="text-sm text-white/70">
                    {isZhHK ? '總課程數' : 'Total Lessons'}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">
                    {themes.reduce((total, theme) => total + theme.duration, 0)}
                  </div>
                  <div className="text-sm text-white/70">
                    {isZhHK ? '總分鐘數' : 'Total Minutes'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Learning Path */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            {isZhHK ? '學習路徑' : 'Learning Path'}
          </h2>
          
          <div className="space-y-4">
            {themes.map((theme, index) => (
              <Card 
                key={theme.id}
                className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer"
                onClick={() => handleThemeClick(theme.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                          theme.completed ? 'bg-green-500' : 'bg-blue-500'
                        }`}>
                          {theme.completed ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            theme.id
                          )}
                        </div>
                        {index < themes.length - 1 && (
                          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-px h-8 bg-gray-600"></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {theme.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {theme.difficulty}
                          </Badge>
                        </div>
                        
                        <p className="text-white/70 mb-3">
                          {theme.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {theme.lessons} {isZhHK ? '課程' : 'lessons'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {theme.duration} {isZhHK ? '分鐘' : 'minutes'}
                          </span>
                        </div>
                        
                        {theme.progress > 0 && (
                          <div className="mt-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-white/60">
                                {isZhHK ? '進度' : 'Progress'}
                              </span>
                              <span className="text-xs text-white/60">
                                {theme.progress}%
                              </span>
                            </div>
                            <Progress value={theme.progress} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Button
                        variant={theme.completed ? "outline" : "default"}
                        className={theme.completed ? 
                          "border-green-500 text-green-400 hover:bg-green-500/10" : 
                          "bg-blue-600 hover:bg-blue-700 text-white"
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          handleThemeClick(theme.id);
                        }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {theme.completed ? 
                          (isZhHK ? '重新學習' : 'Review') : 
                          theme.progress > 0 ? 
                            (isZhHK ? '繼續學習' : 'Continue') : 
                            (isZhHK ? '開始學習' : 'Start')
                        }
                      </Button>
                      <ChevronRight className="w-5 h-5 text-white/40" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30">
            <CardContent className="p-8">
              <Brain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">
                {isZhHK ? '開始您的 AI 學習之旅' : 'Start Your AI Learning Journey'}
              </h3>
              <p className="text-white/70 mb-6">
                {isZhHK ? 
                  '從第一個主題開始，循序漸進掌握 ChatGPT 的強大功能' :
                  'Start with the first theme and gradually master the powerful features of ChatGPT'
                }
              </p>
              <Button 
                onClick={() => handleThemeClick(1)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                {isZhHK ? '開始第一主題' : 'Start First Theme'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatGPTCompleteCourseLearning; 