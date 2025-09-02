/**
 * Course Theme Template
 * @fileoverview 通用的課程主題頁面模板
 * @author AI Formula Team
 * @version 1.0.0
 */

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Play, CheckCircle, Clock, BookOpen, ChevronRight,
  Target, Trophy, Video
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { CourseConfig } from './types';

interface CourseThemeTemplateProps {
  config: CourseConfig;
}

const CourseThemeTemplate: React.FC<CourseThemeTemplateProps> = ({ config }) => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  const { dataSource, baseRoute, progressHook } = config;
  const { getThemeProgress, getProgressStats } = progressHook();

  const currentThemeId = parseInt(themeId || '1');
  const currentTheme = dataSource.courseModules.find((module: any) => module.id === currentThemeId);

  if (!currentTheme) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{isZhHK ? '主題不存在' : 'Theme not found'}</h1>
          <Button onClick={() => navigate(`${baseRoute}/learning`)}>
            {isZhHK ? '返回課程總覽' : 'Back to Course Overview'}
          </Button>
        </div>
      </div>
    );
  }

  // Calculate progress
  const progressData = getThemeProgress(currentThemeId);
  const completedUnits = progressData?.completedUnits?.length || 0;
  const totalUnits = currentTheme.lessons?.length || 0;
  const progressPercentage = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;

  return (
    <div className="min-h-screen chatgpt-theme-page" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="ai-container pt-40 pb-8">
        {/* Breadcrumb */}
        <motion.div 
          className="breadcrumb mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button 
            onClick={() => navigate(`${baseRoute}/learning`)}
            className="breadcrumb-item text-gray-400 hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2 inline" />
            {isZhHK ? '返回學習頁面' : 'Back to Learning'}
          </button>
          <span className="breadcrumb-separator text-gray-500 mx-2">/</span>
          <span className="breadcrumb-current text-white">
            {isZhHK ? `第${currentThemeId}章` : `Chapter ${currentThemeId}`}
          </span>
        </motion.div>

        {/* Theme Header */}
        <motion.div 
          className="content-section bg-gray-800/50 backdrop-blur-sm border border-white/10 mb-8 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center">
                <span className="text-data text-white">{currentThemeId}</span>
              </div>
              <div>
                <Badge className="badge-primary mb-2 bg-gray-700 text-white">
                  {isZhHK ? `第${currentThemeId}章` : `Chapter ${currentThemeId}`}
                </Badge>
                <h1 className="text-h1 leading-tight mb-2">
                  {isZhHK ? currentTheme.title : (currentTheme.titleEn || currentTheme.title)}
                </h1>
                <p className="text-body">
                  {isZhHK ? currentTheme.description : (currentTheme.descriptionEn || currentTheme.description)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-data text-gray-300 mb-1">{progressPercentage}%</div>
              <div className="text-caption">{isZhHK ? '完成進度' : 'Progress'}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-caption">
                {completedUnits} / {totalUnits} {isZhHK ? '單元完成' : 'units completed'}
              </span>
              <span className="text-caption">{isZhHK ? currentTheme.duration : (currentTheme.durationEn || currentTheme.duration)}</span>
            </div>
            <div className="progress-bar progress-bar-large bg-gray-700 rounded-full h-3 overflow-hidden">
              <motion.div 
                className="progress-bar-fill bg-gradient-to-r from-gray-600 to-gray-800 h-full rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ delay: 0.5, duration: 1 }}
              ></motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Course Units */}
          <div className="lg:col-span-2">
            <motion.div 
              className="content-section bg-gray-800/50 backdrop-blur-sm border border-white/10 mb-8 rounded-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="content-section-header flex items-center mb-6">
                <BookOpen className="w-6 h-6 text-gray-400 mr-3" />
                <h2 className="text-h2">{isZhHK ? '課程單元' : 'Course Units'}</h2>
              </div>

              <div className="space-y-4">
                {currentTheme.lessons?.map((lesson: any, index: number) => {
                  const isCompleted = progressData?.completedUnits?.includes(lesson.id) || false;
                  const isCurrent = !isCompleted && (index === 0 || progressData?.completedUnits?.includes(currentTheme.lessons[index - 1]?.id));
                  
                  return (
                    <motion.div
                      key={lesson.id}
                      className={`unit-card p-6 rounded-xl border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                        isCompleted ? 'border-green-400/30 bg-green-400/10' : 
                        isCurrent ? 'border-gray-500/50 bg-gray-800/50' : 
                        'border-gray-600/30 bg-gray-700/20'
                      }`}
                      onClick={() => {
                        navigate(`${baseRoute}/theme/${currentThemeId}/unit/${lesson.id}`);
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${
                            isCompleted ? 'bg-green-500' : 
                            isCurrent ? 'bg-gray-600' : 'bg-gray-600'
                          }`}>
                            {isCompleted ? <CheckCircle className="w-6 h-6" /> : 
                             isCurrent ? <Play className="w-6 h-6" /> : (index + 1)}
                          </div>
                          <div>
                            <h3 className="text-unit-title mb-1">
                              {isZhHK ? lesson.title : (lesson.titleEn || lesson.title)}
                            </h3>
                            <div className="flex items-center space-x-4 text-caption">
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{isZhHK ? lesson.duration : (lesson.durationEn || lesson.duration)}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                {lesson.type === 'video' ? <Video className="w-3 h-3" /> : <Target className="w-3 h-3" />}
                                <span>{lesson.type === 'video' ? (isZhHK ? '影片' : 'Video') : (isZhHK ? '互動' : 'Interactive')}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/40" />
                      </div>
                      
                      <p className="text-body leading-relaxed mb-4">
                        {isZhHK ? lesson.description : (lesson.descriptionEn || lesson.description)}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`text-caption px-3 py-1 rounded-full ${
                          isCompleted ? 'bg-green-400/20 text-green-300' : 
                          isCurrent ? 'bg-gray-600/50 text-gray-300' : 
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {isCompleted ? (isZhHK ? '已完成' : 'Completed') : 
                           isCurrent ? (isZhHK ? '進行中' : 'In Progress') : 
                           (isZhHK ? '待開始' : 'Not Started')}
                        </span>
                        {isCurrent && (
                          <Button className="btn-primary px-4 py-2">
                            {isZhHK ? '繼續學習' : 'Continue'}
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Quiz Section */}
            {currentTheme.quiz && (
              <motion.div 
                className="quiz-container bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="quiz-header text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-h3 text-yellow-300 mb-2">
                    {isZhHK ? currentTheme.quiz.title : (currentTheme.quiz.titleEn || currentTheme.quiz.title)}
                  </h2>
                  <p className="text-body text-white/80 mb-6">
                    {isZhHK ? currentTheme.quiz.description : (currentTheme.quiz.descriptionEn || currentTheme.quiz.description)}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <div className="text-data text-yellow-400 mb-1">{currentTheme.quiz.questions?.length || 5}</div>
                    <div className="text-label">{isZhHK ? '題目數量' : 'Questions'}</div>
                  </div>
                  <div className="text-center p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <div className="text-data text-orange-400 mb-1">{currentTheme.quiz.timeLimit || 15}{isZhHK ? '分鐘' : ' min'}</div>
                    <div className="text-label">{isZhHK ? '建議時間' : 'Time Limit'}</div>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    className="btn-primary-action px-8 py-4 transform hover:scale-105 transition-all duration-200"
                    onClick={() => navigate(`${baseRoute}/theme/${currentThemeId}/quiz`)}
                  >
                    <Trophy className="w-5 h-5 mr-2" />
                    {isZhHK ? '開始測驗' : 'Start Quiz'}
                  </Button>
                  <p className="text-caption mt-3">
                    {isZhHK ? '完成所有單元後建議進行測驗' : 'Complete all units before taking the quiz'}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Progress Stats */}
            <motion.div 
              className="content-section bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-h3 mb-4">{isZhHK ? '學習統計' : 'Learning Stats'}</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-body">{isZhHK ? '本章進度' : 'Chapter Progress'}</span>
                  <span className="text-data text-sm">{progressPercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body">{isZhHK ? '已完成單元' : 'Completed Units'}</span>
                  <span className="text-data text-sm">{completedUnits}/{totalUnits}</span>
                </div>
              </div>
            </motion.div>

            {/* Chapter Navigation */}
            <motion.div 
              className="content-section bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-h3 mb-4">{isZhHK ? '章節導航' : 'Chapter Navigation'}</h3>
              <div className="space-y-2">
                {dataSource.courseModules.map((module: any, index: number) => (
                  <button
                    key={module.id}
                    onClick={() => navigate(`${baseRoute}/theme/${module.id}`)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      module.id === currentThemeId 
                        ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' 
                        : 'bg-gray-700/30 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="text-sm font-medium">
                      {index + 1}. {isZhHK ? module.title : (module.titleEn || module.title)}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseThemeTemplate; 