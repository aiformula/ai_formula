import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, CheckCircle, Play, Pause, 
  Volume2, VolumeX, SkipBack, SkipForward, Clock,
  BookOpen, Award, Target, Brain, Lightbulb, Users,
  MessageSquare, Download, Share2, Bookmark, Star,
  ChevronDown, ChevronUp, FileText, Code, ExternalLink,
  Zap, Trophy, ThumbsUp, Eye, PlayCircle
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { useChatGPTProgress } from '@/hooks/useChatGPTProgress';
import './ChatGPTCompleteCourseUnit.css';

const ChatGPTCompleteCourseUnit: React.FC = () => {
  const navigate = useNavigate();
  const { themeId, unitId } = useParams<{ themeId: string; unitId: string }>();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';
  
  const { 
    markUnitCompleted, 
    isUnitCompleted, 
    getThemeProgress,
    startLearningTimer,
    stopLearningTimer,
    isQuizCompleted
  } = useChatGPTProgress();

  // State management
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));

  const currentThemeId = parseInt(themeId || '1');
  const currentUnitId = parseInt(unitId || '1');
  const unitKey = `t${currentThemeId}-u${currentUnitId}`;

  // Start learning timer when component mounts
  useEffect(() => {
    startLearningTimer();
    return () => stopLearningTimer();
  }, [startLearningTimer, stopLearningTimer]);

  // Check if unit is already completed
  useEffect(() => {
    const completed = isUnitCompleted(unitKey);
    setIsCompleted(completed);
    if (completed) {
      setCurrentProgress(100);
    }
  }, [unitKey, isUnitCompleted]);

  // Unit content data
  const unitContent = {
    1: {
      themeId: 1,
      title: isZhHK ? '[ChatGPT 單元1標題]' : '[ChatGPT Unit 1 Title]',
      subtitle: isZhHK ? '[ChatGPT 單元1副標題]' : '[ChatGPT Unit 1 Subtitle]',
      description: isZhHK ? '[ChatGPT 單元1描述]' : '[ChatGPT Unit 1 Description]',
      duration: 30,
      type: 'video',
      sections: [
        {
          id: 1,
          title: isZhHK ? '[ChatGPT 段落1標題]' : '[ChatGPT Section 1 Title]',
          content: isZhHK ? '[ChatGPT 段落1內容]' : '[ChatGPT Section 1 Content]',
          type: 'text' as const
        },
        {
          id: 2,
          title: isZhHK ? '[ChatGPT 段落2標題]' : '[ChatGPT Section 2 Title]',
          content: isZhHK ? '[ChatGPT 段落2內容]' : '[ChatGPT Section 2 Content]',
          type: 'video' as const,
          videoUrl: '/placeholder-video.mp4'
        }
      ],
      keyPoints: [
        isZhHK ? '[ChatGPT 重點1]' : '[ChatGPT Key Point 1]',
        isZhHK ? '[ChatGPT 重點2]' : '[ChatGPT Key Point 2]',
        isZhHK ? '[ChatGPT 重點3]' : '[ChatGPT Key Point 3]'
      ],
      exercises: [
        {
          id: 1,
          question: isZhHK ? '[ChatGPT 練習1問題]' : '[ChatGPT Exercise 1 Question]',
          type: 'reflection'
        }
      ],
      resources: [
        {
          title: isZhHK ? '[ChatGPT 資源1]' : '[ChatGPT Resource 1]',
          url: '#',
          type: 'pdf'
        }
      ]
    },
    2: {
      themeId: 1,
      title: isZhHK ? '[ChatGPT 單元2標題]' : '[ChatGPT Unit 2 Title]',
      subtitle: isZhHK ? '[ChatGPT 單元2副標題]' : '[ChatGPT Unit 2 Subtitle]',
      description: isZhHK ? '[ChatGPT 單元2描述]' : '[ChatGPT Unit 2 Description]',
      duration: 30,
      type: 'interactive',
      sections: [
        {
          id: 1,
          title: isZhHK ? '[ChatGPT 段落1標題]' : '[ChatGPT Section 1 Title]',
          content: isZhHK ? '[ChatGPT 段落1內容]' : '[ChatGPT Section 1 Content]',
          type: 'text' as const
        }
      ],
      keyPoints: [
        isZhHK ? '[ChatGPT 重點1]' : '[ChatGPT Key Point 1]',
        isZhHK ? '[ChatGPT 重點2]' : '[ChatGPT Key Point 2]'
      ],
      exercises: [],
      resources: []
    },
    3: {
      themeId: 1,
      title: isZhHK ? '[ChatGPT 單元3標題]' : '[ChatGPT Unit 3 Title]',
      subtitle: isZhHK ? '[ChatGPT 單元3副標題]' : '[ChatGPT Unit 3 Subtitle]',
      description: isZhHK ? '[ChatGPT 單元3描述]' : '[ChatGPT Unit 3 Description]',
      duration: 30,
      type: 'exercise',
      sections: [
        {
          id: 1,
          title: isZhHK ? '[ChatGPT 段落1標題]' : '[ChatGPT Section 1 Title]',
          content: isZhHK ? '[ChatGPT 段落1內容]' : '[ChatGPT Section 1 Content]',
          type: 'text' as const
        }
      ],
      keyPoints: [
        isZhHK ? '[ChatGPT 重點1]' : '[ChatGPT Key Point 1]',
        isZhHK ? '[ChatGPT 重點2]' : '[ChatGPT Key Point 2]'
      ],
      exercises: [],
      resources: []
    },
    4: {
      themeId: 2,
      title: isZhHK ? '[ChatGPT 單元4標題]' : '[ChatGPT Unit 4 Title]',
      subtitle: isZhHK ? '[ChatGPT 單元4副標題]' : '[ChatGPT Unit 4 Subtitle]',
      description: isZhHK ? '[ChatGPT 單元4描述]' : '[ChatGPT Unit 4 Description]',
      duration: 40,
      type: 'video',
      sections: [
        {
          id: 1,
          title: isZhHK ? '[ChatGPT 段落1標題]' : '[ChatGPT Section 1 Title]',
          content: isZhHK ? '[ChatGPT 段落1內容]' : '[ChatGPT Section 1 Content]',
          type: 'text' as const
        }
      ],
      keyPoints: [
        isZhHK ? '[ChatGPT 重點1]' : '[ChatGPT Key Point 1]',
        isZhHK ? '[ChatGPT 重點2]' : '[ChatGPT Key Point 2]'
      ],
      exercises: [],
      resources: []
    },
    5: {
      themeId: 2,
      title: isZhHK ? '[ChatGPT 單元5標題]' : '[ChatGPT Unit 5 Title]',
      subtitle: isZhHK ? '[ChatGPT 單元5副標題]' : '[ChatGPT Unit 5 Subtitle]',
      description: isZhHK ? '[ChatGPT 單元5描述]' : '[ChatGPT Unit 5 Description]',
      duration: 40,
      type: 'interactive',
      sections: [
        {
          id: 1,
          title: isZhHK ? '[ChatGPT 段落1標題]' : '[ChatGPT Section 1 Title]',
          content: isZhHK ? '[ChatGPT 段落1內容]' : '[ChatGPT Section 1 Content]',
          type: 'text' as const
        }
      ],
      keyPoints: [
        isZhHK ? '[ChatGPT 重點1]' : '[ChatGPT Key Point 1]',
        isZhHK ? '[ChatGPT 重點2]' : '[ChatGPT Key Point 2]'
      ],
      exercises: [],
      resources: []
    },
    6: {
      themeId: 2,
      title: isZhHK ? '[ChatGPT 單元6標題]' : '[ChatGPT Unit 6 Title]',
      subtitle: isZhHK ? '[ChatGPT 單元6副標題]' : '[ChatGPT Unit 6 Subtitle]',
      description: isZhHK ? '[ChatGPT 單元6描述]' : '[ChatGPT Unit 6 Description]',
      duration: 40,
      type: 'exercise',
      sections: [
        {
          id: 1,
          title: isZhHK ? '[ChatGPT 段落1標題]' : '[ChatGPT Section 1 Title]',
          content: isZhHK ? '[ChatGPT 段落1內容]' : '[ChatGPT Section 1 Content]',
          type: 'text' as const
        }
      ],
      keyPoints: [
        isZhHK ? '[ChatGPT 重點1]' : '[ChatGPT Key Point 1]',
        isZhHK ? '[ChatGPT 重點2]' : '[ChatGPT Key Point 2]'
      ],
      exercises: [],
      resources: []
    },
    7: {
      themeId: 3,
      title: isZhHK ? '[ChatGPT 單元7標題]' : '[ChatGPT Unit 7 Title]',
      subtitle: isZhHK ? '[ChatGPT 單元7副標題]' : '[ChatGPT Unit 7 Subtitle]',
      description: isZhHK ? '[ChatGPT 單元7描述]' : '[ChatGPT Unit 7 Description]',
      duration: 50,
      type: 'video',
      sections: [
        {
          id: 1,
          title: isZhHK ? '[ChatGPT 段落1標題]' : '[ChatGPT Section 1 Title]',
          content: isZhHK ? '[ChatGPT 段落1內容]' : '[ChatGPT Section 1 Content]',
          type: 'text' as const
        }
      ],
      keyPoints: [
        isZhHK ? '[ChatGPT 重點1]' : '[ChatGPT Key Point 1]',
        isZhHK ? '[ChatGPT 重點2]' : '[ChatGPT Key Point 2]'
      ],
      exercises: [],
      resources: []
    },
    8: {
      themeId: 3,
      title: isZhHK ? '[ChatGPT 單元8標題]' : '[ChatGPT Unit 8 Title]',
      subtitle: isZhHK ? '[ChatGPT 單元8副標題]' : '[ChatGPT Unit 8 Subtitle]',
      description: isZhHK ? '[ChatGPT 單元8描述]' : '[ChatGPT Unit 8 Description]',
      duration: 50,
      type: 'interactive',
      sections: [
        {
          id: 1,
          title: isZhHK ? '[ChatGPT 段落1標題]' : '[ChatGPT Section 1 Title]',
          content: isZhHK ? '[ChatGPT 段落1內容]' : '[ChatGPT Section 1 Content]',
          type: 'text' as const
        }
      ],
      keyPoints: [
        isZhHK ? '[ChatGPT 重點1]' : '[ChatGPT Key Point 1]',
        isZhHK ? '[ChatGPT 重點2]' : '[ChatGPT Key Point 2]'
      ],
      exercises: [],
      resources: []
    },
    9: {
      themeId: 3,
      title: isZhHK ? '[ChatGPT 單元9標題]' : '[ChatGPT Unit 9 Title]',
      subtitle: isZhHK ? '[ChatGPT 單元9副標題]' : '[ChatGPT Unit 9 Subtitle]',
      description: isZhHK ? '[ChatGPT 單元9描述]' : '[ChatGPT Unit 9 Description]',
      duration: 50,
      type: 'exercise',
      sections: [
        {
          id: 1,
          title: isZhHK ? '[ChatGPT 段落1標題]' : '[ChatGPT Section 1 Title]',
          content: isZhHK ? '[ChatGPT 段落1內容]' : '[ChatGPT Section 1 Content]',
          type: 'text' as const
        }
      ],
      keyPoints: [
        isZhHK ? '[ChatGPT 重點1]' : '[ChatGPT Key Point 1]',
        isZhHK ? '[ChatGPT 重點2]' : '[ChatGPT Key Point 2]'
      ],
      exercises: [],
      resources: []
    }
  };

  const currentUnit = unitContent[currentUnitId as keyof typeof unitContent];

  if (!currentUnit) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">[單元不存在]</h2>
          <Button onClick={() => navigate('/courses/chatgpt-complete-course/learning')}>
            [返回課程]
          </Button>
        </div>
      </div>
    );
  }

  // Progress simulation
  useEffect(() => {
    if (!isCompleted && currentProgress < 100) {
      const timer = setTimeout(() => {
        setCurrentProgress(prev => Math.min(prev + 1, 100));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentProgress, isCompleted]);

  const handleMarkComplete = async () => {
    if (!isCompleted) {
      await markUnitCompleted(unitKey);
      setIsCompleted(true);
      setCurrentProgress(100);
      setShowCompletion(true);
    }
  };

  const getNextUnit = () => {
    if (currentUnitId < 9) {
      return currentUnitId + 1;
    }
    return null;
  };

  const handleNext = () => {
    const nextUnit = getNextUnit();
    if (nextUnit) {
      // Determine theme for next unit
      let nextTheme = currentThemeId;
      if (nextUnit === 4) nextTheme = 2;
      if (nextUnit === 7) nextTheme = 3;
      
      navigate(`/courses/chatgpt-complete-course/theme/${nextTheme}/unit/${nextUnit}`);
    } else {
      // All units completed, check if quiz is needed
      if (currentUnitId === 3 || currentUnitId === 6 || currentUnitId === 9) {
        navigate(`/courses/chatgpt-complete-course/theme/${currentThemeId}/quiz`);
      } else {
        navigate('/courses/chatgpt-complete-course/learning');
      }
    }
  };

  const toggleSection = (sectionId: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="chatgpt-course-unit">
      <Navigation />
      
      <div className="unit-container">
        {/* Back Navigation */}
        <motion.button
          onClick={() => navigate(`/courses/chatgpt-complete-course/theme/${currentThemeId}`)}
          className="back-button"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isZhHK ? '[返回主題]' : '[Back to Theme]'}</span>
        </motion.button>

        {/* Unit Header */}
        <motion.div 
          className="unit-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="unit-meta">
            <Badge variant="outline" className="theme-badge">
              {isZhHK ? '[主題]' : '[Theme]'} {currentThemeId}
            </Badge>
            <div className="unit-info">
              <Clock className="w-4 h-4" />
              <span>{currentUnit.duration} [分鐘]</span>
            </div>
          </div>
          
          <h1 className="unit-title">{currentUnit.title}</h1>
          <p className="unit-subtitle">{currentUnit.subtitle}</p>
          <p className="unit-description">{currentUnit.description}</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="progress-section"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="progress-header">
            <span className="progress-label">[學習進度]</span>
            <span className="progress-percentage">{Math.round(currentProgress)}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${currentProgress}%` }}
            />
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="unit-content-grid">
          {/* Left Column - Main Content */}
          <div className="content-main">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="tabs-list">
                <TabsTrigger value="content" className="tab-trigger">
                  <BookOpen className="w-4 h-4" />
                  [課程內容]
                </TabsTrigger>
                <TabsTrigger value="exercises" className="tab-trigger">
                  <Brain className="w-4 h-4" />
                  [練習]
                </TabsTrigger>
                <TabsTrigger value="resources" className="tab-trigger">
                  <Download className="w-4 h-4" />
                  [資源]
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="tab-content">
                <motion.div 
                  className="content-sections"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {currentUnit.sections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      className="content-section"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        className="section-header"
                        onClick={() => toggleSection(index)}
                      >
                        <h3 className="section-title">{section.title}</h3>
                        <div className="section-toggle">
                          {expandedSections.has(index) ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence>
                        {expandedSections.has(index) && (
                          <motion.div
                            className="section-content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {section.type === 'text' && (
                              <div className="text-content">
                                <p>{section.content}</p>
                              </div>
                            )}
                            
                            {section.type === 'video' && (
                              <div className="video-content">
                                <div className="video-placeholder">
                                  <PlayCircle className="w-12 h-12 text-blue-400" />
                                  <p className="text-white/70">[ChatGPT 影片內容]</p>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="exercises" className="tab-content">
                <motion.div 
                  className="exercises-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {currentUnit.exercises.length > 0 ? (
                    currentUnit.exercises.map((exercise, index) => (
                      <div key={exercise.id} className="exercise-item">
                        <h4 className="exercise-question">{exercise.question}</h4>
                        <div className="exercise-input">
                          <textarea 
                            placeholder={isZhHK ? '[請輸入您的回答]' : '[Enter your answer]'}
                            className="exercise-textarea"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-exercises">
                      <Brain className="w-12 h-12 text-gray-400" />
                      <p>[此單元沒有練習]</p>
                    </div>
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="resources" className="tab-content">
                <motion.div 
                  className="resources-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {currentUnit.resources.length > 0 ? (
                    currentUnit.resources.map((resource, index) => (
                      <div key={index} className="resource-item">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <a href={resource.url} className="resource-link">
                          {resource.title}
                        </a>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                    ))
                  ) : (
                    <div className="no-resources">
                      <Download className="w-12 h-12 text-gray-400" />
                      <p>[此單元沒有額外資源]</p>
                    </div>
                  )}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Key Points */}
          <div className="content-sidebar">
            <motion.div 
              className="key-points-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="card-title">
                <Target className="w-5 h-5 text-green-400" />
                [重點摘要]
              </h3>
              
              <div className="key-points-list">
                {currentUnit.keyPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    className="key-point"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="point-indicator">
                      <Star className="w-4 h-4" />
                    </div>
                    <p>{point}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Fixed Bottom Action Bar */}
        <motion.div 
          className="action-bar"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="action-content">
            <div className="action-left">
              <span className="unit-number">[單元] {currentUnitId}/9</span>
            </div>
            
            <div className="action-right">
              {!isCompleted && (
                <Button
                  className="btn-success"
                  onClick={handleMarkComplete}
                  disabled={currentProgress < 80}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  [標記完成]
                </Button>
              )}
              
              {isCompleted && (
                <Button
                  className="btn-primary"
                  onClick={handleNext}
                >
                  {getNextUnit() ? '[下一單元]' : 
                   (currentUnitId === 3 || currentUnitId === 6 || currentUnitId === 9) ? '[開始測驗]' : '[完成主題]'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Completion Modal */}
        <AnimatePresence>
          {showCompletion && (
            <motion.div
              className="completion-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="completion-modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div className="completion-content">
                  <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <h2 className="completion-title">
                    {isZhHK ? '[恭喜完成]' : '[Congratulations]'}
                  </h2>
                  <p className="completion-message">
                    {isZhHK ? '[您已成功完成此單元]' : '[You have successfully completed this unit]'}
                  </p>
                  
                  <div className="completion-actions">
                    <Button
                      variant="outline"
                      onClick={() => setShowCompletion(false)}
                    >
                      [關閉]
                    </Button>
                    <Button
                      className="btn-primary"
                      onClick={() => {
                        setShowCompletion(false);
                        handleNext();
                      }}
                    >
                      {getNextUnit() ? '[下一單元]' : '[完成]'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatGPTCompleteCourseUnit; 