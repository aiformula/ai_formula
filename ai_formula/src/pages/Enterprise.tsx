import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  ChevronRight, 
  ArrowLeft, 
  CheckCircle, 
  Calendar,
  Zap,
  Users,
  BookOpen,
  Cog,
  Target,
  TrendingUp,
  Star,
  Clock,
  Building2,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Question {
  id: string;
  question: string;
  questionEn: string;
  type: 'single' | 'multiple' | 'scale' | 'text';
  options?: string[];
  optionsEn?: string[];
  required: boolean;
}

interface ServicePath {
  id: 'custom-course' | 'automation-service';
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: React.ElementType;
  color: string;
  questions: Question[];
}

const Enterprise: React.FC = () => {
  const { language, t } = useLanguage();
  const isZhHK = language === 'zh-HK';
  
  const [currentPath, setCurrentPath] = useState<ServicePath | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const servicePaths: ServicePath[] = [
    {
      id: 'custom-course',
      title: 'AI Custom 課程',
      titleEn: 'AI Custom Training',
      description: '度身訂造的企業AI培訓課程，提升團隊AI應用能力',
      descriptionEn: 'Customized enterprise AI training courses to enhance team AI capabilities',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      questions: [
        {
          id: 'company-size',
          question: '貴公司的員工人數規模？',
          questionEn: 'What is your company size?',
          type: 'single',
          options: ['1-10人', '11-50人', '51-200人', '201-500人', '500人以上'],
          optionsEn: ['1-10 employees', '11-50 employees', '51-200 employees', '201-500 employees', '500+ employees'],
          required: true
        },
        {
          id: 'industry',
          question: '貴公司所屬行業？',
          questionEn: 'What industry is your company in?',
          type: 'single',
          options: ['科技/軟件', '金融/銀行', '製造業', '零售/電商', '醫療健康', '教育', '其他'],
          optionsEn: ['Technology/Software', 'Finance/Banking', 'Manufacturing', 'Retail/E-commerce', 'Healthcare', 'Education', 'Others'],
          required: true
        },
        {
          id: 'ai-experience',
          question: '團隊目前的AI技術應用經驗？',
          questionEn: 'What is your team\'s current AI experience?',
          type: 'single',
          options: ['完全沒有經驗', '有基礎了解', '有一定經驗', '已在使用AI工具', '有豐富經驗'],
          optionsEn: ['No experience', 'Basic understanding', 'Some experience', 'Already using AI tools', 'Extensive experience'],
          required: true
        },
        {
          id: 'training-goals',
          question: '希望培訓重點涵蓋哪些領域？',
          questionEn: 'Which areas do you want the training to focus on?',
          type: 'multiple',
          options: ['ChatGPT應用技巧', '圖像生成AI', '數據分析AI', '客服自動化', '內容創作', '程式編碼', '商業策略'],
          optionsEn: ['ChatGPT applications', 'Image generation AI', 'Data analysis AI', 'Customer service automation', 'Content creation', 'Programming', 'Business strategy'],
          required: true
        },
        {
          id: 'training-format',
          question: '偏好的培訓形式？',
          questionEn: 'Preferred training format?',
          type: 'single',
          options: ['線上培訓', '現場培訓', '混合模式', '自學課程'],
          optionsEn: ['Online training', 'In-person training', 'Hybrid format', 'Self-paced course'],
          required: true
        },
        {
          id: 'timeline',
          question: '希望的培訓時程？',
          questionEn: 'Preferred training timeline?',
          type: 'single',
          options: ['1-2週', '1個月', '2-3個月', '半年以上', '彈性安排'],
          optionsEn: ['1-2 weeks', '1 month', '2-3 months', '6+ months', 'Flexible'],
          required: true
        },
        {
          id: 'budget-range',
          question: '預計的培訓預算範圍？',
          questionEn: 'Expected training budget range?',
          type: 'single',
          options: ['HK$50,000以下', 'HK$50,000-100,000', 'HK$100,000-300,000', 'HK$300,000以上', '需要報價'],
          optionsEn: ['Under HK$50,000', 'HK$50,000-100,000', 'HK$100,000-300,000', 'Over HK$300,000', 'Need quotation'],
          required: true
        },
        {
          id: 'success-metrics',
          question: '如何衡量培訓成功？',
          questionEn: 'How do you measure training success?',
          type: 'multiple',
          options: ['員工技能提升', '工作效率改善', '創新項目數量', '成本節省', 'ROI回報', '客戶滿意度'],
          optionsEn: ['Employee skill improvement', 'Work efficiency improvement', 'Number of innovation projects', 'Cost savings', 'ROI returns', 'Customer satisfaction'],
          required: true
        }
      ]
    },
    {
      id: 'automation-service',
      title: 'AI 自動化服務',
      titleEn: 'AI Automation Services',
      description: '為企業打造AI自動化解決方案，優化業務流程',
      descriptionEn: 'Create AI automation solutions for enterprises to optimize business processes',
      icon: Cog,
      color: 'from-purple-500 to-pink-500',
      questions: [
        {
          id: 'business-area',
          question: '希望自動化哪個業務領域？',
          questionEn: 'Which business area do you want to automate?',
          type: 'multiple',
          options: ['客戶服務', '銷售流程', '人力資源', '財務管理', '行銷推廣', '數據分析', '文檔處理'],
          optionsEn: ['Customer service', 'Sales process', 'Human resources', 'Financial management', 'Marketing', 'Data analysis', 'Document processing'],
          required: true
        },
        {
          id: 'pain-points',
          question: '目前面臨的主要痛點？',
          questionEn: 'What are your main pain points?',
          type: 'multiple',
          options: ['人工成本高', '處理速度慢', '錯誤率高', '重複性工作多', '數據不準確', '客戶體驗差'],
          optionsEn: ['High labor costs', 'Slow processing speed', 'High error rate', 'Too much repetitive work', 'Inaccurate data', 'Poor customer experience'],
          required: true
        },
        {
          id: 'current-tools',
          question: '目前使用的系統或工具？',
          questionEn: 'Current systems or tools in use?',
          type: 'multiple',
          options: ['CRM系統', 'ERP系統', '電商平台', 'Excel/Google Sheets', '專業軟件', '自建系統', '沒有特定系統'],
          optionsEn: ['CRM system', 'ERP system', 'E-commerce platform', 'Excel/Google Sheets', 'Professional software', 'Custom system', 'No specific system'],
          required: true
        },
        {
          id: 'automation-priority',
          question: '自動化的優先級？',
          questionEn: 'Automation priority level?',
          type: 'scale',
          required: true
        },
        {
          id: 'data-volume',
          question: '每日處理的數據量？',
          questionEn: 'Daily data processing volume?',
          type: 'single',
          options: ['少量（<100筆）', '中量（100-1000筆）', '大量（1000-10000筆）', '海量（>10000筆）'],
          optionsEn: ['Small (<100 records)', 'Medium (100-1000 records)', 'Large (1000-10000 records)', 'Massive (>10000 records)'],
          required: true
        },
        {
          id: 'integration-needs',
          question: '需要整合哪些系統？',
          questionEn: 'Which systems need integration?',
          type: 'multiple',
          options: ['客戶數據庫', '財務系統', '庫存管理', '通訊工具', '社交媒體', 'API接口', '雲端服務'],
          optionsEn: ['Customer database', 'Financial system', 'Inventory management', 'Communication tools', 'Social media', 'API interfaces', 'Cloud services'],
          required: true
        },
        {
          id: 'implementation-timeline',
          question: '希望的實施時程？',
          questionEn: 'Preferred implementation timeline?',
          type: 'single',
          options: ['1個月內', '2-3個月', '3-6個月', '6個月以上', '分階段實施'],
          optionsEn: ['Within 1 month', '2-3 months', '3-6 months', 'Over 6 months', 'Phased implementation'],
          required: true
        },
        {
          id: 'investment-budget',
          question: '預計投資預算？',
          questionEn: 'Expected investment budget?',
          type: 'single',
          options: ['HK$100,000以下', 'HK$100,000-300,000', 'HK$300,000-500,000', 'HK$500,000以上', '需要詳細評估'],
          optionsEn: ['Under HK$100,000', 'HK$100,000-300,000', 'HK$300,000-500,000', 'Over HK$500,000', 'Need detailed assessment'],
          required: true
        },
        {
          id: 'roi-expectation',
          question: '期望的投資回報時間？',
          questionEn: 'Expected ROI timeframe?',
          type: 'single',
          options: ['3個月內', '6個月內', '1年內', '2年內', '長期投資'],
          optionsEn: ['Within 3 months', 'Within 6 months', 'Within 1 year', 'Within 2 years', 'Long-term investment'],
          required: true
        }
      ]
    }
  ];

  const resetForm = () => {
    setCurrentPath(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const handlePathSelection = (path: ServicePath) => {
    setCurrentPath(path);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (currentPath && currentQuestion < currentPath.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      generateResult();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const generateResult = () => {
    setIsLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
    }, 2000);
  };

  const getRecommendation = () => {
    if (!currentPath) return '';
    
    if (currentPath.id === 'custom-course') {
      const experience = answers['ai-experience'];
      const goals = answers['training-goals'];
      const size = answers['company-size'];
      
      if (isZhHK) {
        return `基於您的需求分析，我們建議為貴公司設計一套${goals?.length > 3 ? '全面' : '專項'}的AI培訓課程。課程將針對${experience === '完全沒有經驗' ? '零基礎' : '現有經驗'}進行設計，預計培訓${size?.includes('500人以上') ? '大型企業' : '中小企業'}團隊。`;
      } else {
        return `Based on your needs analysis, we recommend designing a ${goals?.length > 3 ? 'comprehensive' : 'specialized'} AI training course for your company. The course will be designed for ${experience === 'No experience' ? 'beginners' : 'existing experience'} level, targeting ${size?.includes('500+') ? 'large enterprise' : 'SME'} teams.`;
      }
    } else {
      const areas = answers['business-area'];
      const timeline = answers['implementation-timeline'];
      
      if (isZhHK) {
        return `根據您的業務需求，我們建議優先自動化${areas?.[0]}流程，採用${timeline?.includes('分階段') ? '分階段' : '一次性'}實施策略。預期可提升30-50%的運營效率。`;
      } else {
        return `Based on your business needs, we recommend prioritizing ${areas?.[0]} process automation with ${timeline?.includes('Phased') ? 'phased' : 'complete'} implementation strategy. Expected to improve operational efficiency by 30-50%.`;
      }
    }
  };

  const currentQuestionData = currentPath?.questions[currentQuestion];
  const progress = currentPath ? ((currentQuestion + 1) / currentPath.questions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 py-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {isZhHK ? '企業顧問服務' : 'Enterprise Consulting Services'}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {isZhHK 
              ? '專業的AI顧問團隊，為您的企業量身打造最適合的AI解決方案'
              : 'Professional AI consulting team, creating the most suitable AI solutions for your enterprise'
            }
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {!currentPath && !showResult && (
            <motion.div
              key="path-selection"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-cyan-400">
                  {isZhHK ? '選擇您的服務類型' : 'Choose Your Service Type'}
                </h2>
                <p className="text-gray-400">
                  {isZhHK ? '請選擇最符合您需求的服務路徑' : 'Please select the service path that best fits your needs'}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {servicePaths.map((path, index) => (
                  <motion.div
                    key={path.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                  >
                    <Card 
                      className="bg-gray-800 border-gray-700 hover:border-cyan-500 transition-all duration-300 cursor-pointer group h-full"
                      onClick={() => handlePathSelection(path)}
                    >
                      <CardContent className="p-8 text-center h-full flex flex-col">
                        <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${path.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <path.icon className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                          {isZhHK ? path.title : path.titleEn}
                        </h3>
                        <p className="text-gray-300 mb-6 flex-grow">
                          {isZhHK ? path.description : path.descriptionEn}
                        </p>
                        <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white group-hover:scale-105 transition-transform duration-300">
                          {isZhHK ? '開始評估' : 'Start Assessment'}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {currentPath && !showResult && !isLoading && (
            <motion.div
              key="questionnaire"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">
                    {isZhHK ? '進度' : 'Progress'}: {currentQuestion + 1} / {currentPath.questions.length}
                  </span>
                  <span className="text-sm text-cyan-400 font-semibold">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold mb-6 text-cyan-400">
                      {isZhHK ? currentQuestionData?.question : currentQuestionData?.questionEn}
                    </h3>

                    {/* Question Types */}
                    {currentQuestionData?.type === 'single' && (
                      <div className="space-y-3">
                        {currentQuestionData.options?.map((option, index) => (
                          <motion.button
                            key={index}
                            className={`w-full p-4 text-left rounded-lg border transition-all duration-300 ${
                              answers[currentQuestionData.id] === option
                                ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                                : 'border-gray-600 hover:border-gray-500 text-gray-300'
                            }`}
                            onClick={() => handleAnswer(currentQuestionData.id, option)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {isZhHK ? option : currentQuestionData.optionsEn?.[index]}
                          </motion.button>
                        ))}
                      </div>
                    )}

                    {currentQuestionData?.type === 'multiple' && (
                      <div className="space-y-3">
                        {currentQuestionData.options?.map((option, index) => {
                          const isSelected = answers[currentQuestionData.id]?.includes(option);
                          return (
                            <motion.button
                              key={index}
                              className={`w-full p-4 text-left rounded-lg border transition-all duration-300 ${
                                isSelected
                                  ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                                  : 'border-gray-600 hover:border-gray-500 text-gray-300'
                              }`}
                              onClick={() => {
                                const currentAnswers = answers[currentQuestionData.id] || [];
                                const newAnswers = isSelected
                                  ? currentAnswers.filter((a: string) => a !== option)
                                  : [...currentAnswers, option];
                                handleAnswer(currentQuestionData.id, newAnswers);
                              }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-center">
                                <div className={`w-4 h-4 rounded border mr-3 ${
                                  isSelected ? 'bg-cyan-500 border-cyan-500' : 'border-gray-500'
                                }`}>
                                  {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                                </div>
                                {isZhHK ? option : currentQuestionData.optionsEn?.[index]}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    )}

                    {currentQuestionData?.type === 'scale' && (
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>{isZhHK ? '不重要' : 'Not Important'}</span>
                          <span>{isZhHK ? '非常重要' : 'Very Important'}</span>
                        </div>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                            <motion.button
                              key={value}
                              className={`w-10 h-10 rounded-full border transition-all duration-300 ${
                                answers[currentQuestionData.id] === value
                                  ? 'border-cyan-500 bg-cyan-500 text-white'
                                  : 'border-gray-600 hover:border-gray-500 text-gray-400'
                              }`}
                              onClick={() => handleAnswer(currentQuestionData.id, value)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {value}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </CardContent>
              </Card>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="border-gray-600 text-gray-300 hover:border-gray-500"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {isZhHK ? '上一題' : 'Previous'}
                </Button>

                <div className="space-x-4">
                  <Button
                    variant="outline"
                    onClick={resetForm}
                    className="border-gray-600 text-gray-300 hover:border-gray-500"
                  >
                    {isZhHK ? '重新開始' : 'Restart'}
                  </Button>

                  <Button
                    onClick={nextQuestion}
                    disabled={!answers[currentQuestionData?.id || '']}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                  >
                    {currentQuestion === currentPath.questions.length - 1 
                      ? (isZhHK ? '完成評估' : 'Complete Assessment')
                      : (isZhHK ? '下一題' : 'Next')
                    }
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <motion.div 
                className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                {isZhHK ? '正在分析您的需求...' : 'Analyzing your requirements...'}
              </h3>
              <p className="text-gray-400">
                {isZhHK ? '請稍候，我們正在為您制定專屬建議' : 'Please wait, we are creating customized recommendations for you'}
              </p>
            </motion.div>
          )}

          {showResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-cyan-500/30">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Award className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold mb-4 text-cyan-400">
                      {isZhHK ? '評估完成！' : 'Assessment Complete!'}
                    </h2>
                    <p className="text-gray-400">
                      {isZhHK ? '基於您的回答，我們為您準備了專屬建議' : 'Based on your responses, we have prepared customized recommendations for you'}
                    </p>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-cyan-400">
                      {isZhHK ? '我們的建議' : 'Our Recommendations'}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {getRecommendation()}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <Target className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-cyan-400">
                        {isZhHK ? '精準匹配' : 'Precise Match'}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {isZhHK ? '根據需求量身定制' : 'Customized to your needs'}
                      </p>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-purple-400">
                        {isZhHK ? '效果提升' : 'Performance Boost'}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {isZhHK ? '顯著改善業務效率' : 'Significantly improve efficiency'}
                      </p>
                    </div>
                    <div className="text-center">
                      <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-yellow-400">
                        {isZhHK ? '專業支援' : 'Professional Support'}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {isZhHK ? '全程專家指導' : 'Expert guidance throughout'}
                      </p>
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-3 text-lg"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      {isZhHK ? '預約免費諮詢' : 'Book Free Consultation'}
                    </Button>
                    <p className="text-sm text-gray-400">
                      {isZhHK ? '30分鐘專業諮詢，無任何費用' : '30-minute professional consultation, completely free'}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <Button
                      variant="outline"
                      onClick={resetForm}
                      className="border-gray-600 text-gray-400 hover:border-gray-500"
                    >
                      {isZhHK ? '重新評估' : 'Start New Assessment'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Enterprise; 