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
    // Scroll to top when resetting the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPath(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const handlePathSelection = (path: ServicePath) => {
    // Scroll to top when selecting a service path
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      // Scroll to top when going to previous question
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="min-h-screen bg-black text-white">
      <AnimatePresence mode="wait">
        {/* Initial Landing Page - Hero + Service Selection */}
        {!currentPath && !showResult && !isLoading && (
          <motion.div
            key="landing-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header Cover */}
            <motion.div 
              className="relative h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent transform -skew-y-12"></div>
              </div>
              
              <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
                <motion.h1 
                  className="text-7xl md:text-8xl font-bold mb-8 tracking-tight"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <span className="text-white">{isZhHK ? '企業' : 'Enterprise'}</span>
                  <span className="text-yellow-400 ml-4">{isZhHK ? '顧問服務' : 'Consultation'}</span>
                </motion.h1>
                
                <motion.p 
                  className="text-2xl md:text-3xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {isZhHK 
                    ? '專業 AI 顧問團隊，為企業量身打造 AI 課程同自動化解決方案'
                    : 'Professional AI consulting team, creating customized AI courses and automation solutions for enterprises'
                  }
                </motion.p>
                
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-12 py-6 text-xl rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transform hover:scale-105"
                    onClick={() => {
                      document.getElementById('services-section')?.scrollIntoView({ 
                        behavior: 'smooth' 
                      });
                    }}
                  >
                    {isZhHK ? '立即開始' : 'Get Started'}
                    <ChevronRight className="w-6 h-6 ml-2" />
                  </Button>
                </motion.div>
              </div>
              
              {/* Scroll Indicator */}
              <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-1 h-16 bg-gradient-to-b from-yellow-400 to-transparent rounded-full"></div>
              </motion.div>
            </motion.div>

            {/* Service Selection Section */}
            <div id="services-section" className="py-24 px-4">
              <div className="max-w-7xl mx-auto">
                <motion.div 
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <h2 className="text-5xl font-bold mb-6 text-white">
                    {isZhHK ? '選擇您的' : 'Choose Your'}{' '}
                    <span className="text-yellow-400">{isZhHK ? '服務類型' : 'Service Type'}</span>
                  </h2>
                  <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    {isZhHK 
                      ? '請選擇最符合您需求的服務路徑，我們將為您提供專業的AI解決方案'
                      : 'Please select the service path that best meets your needs, and we will provide you with professional AI solutions'
                    }
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                  {servicePaths.map((path, index) => (
                    <motion.div
                      key={path.id}
                      className="group cursor-pointer"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                      onClick={() => handlePathSelection(path)}
                      whileHover={{ y: -10 }}
                    >
                      <div className="bg-black h-full p-12 rounded-3xl border border-gray-700 transition-all duration-500 group-hover:border-yellow-400 group-hover:shadow-[0_0_50px_rgba(255,215,0,0.3)] relative overflow-hidden">
                        {/* Background Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:to-yellow-400/10 transition-all duration-500 rounded-3xl"></div>
                        
                        <div className="relative z-10">
                          {/* Icon */}
                          <div className="mb-8">
                            <div className="w-20 h-20 bg-yellow-400/10 rounded-2xl flex items-center justify-center group-hover:bg-yellow-400/20 transition-all duration-300 group-hover:scale-110">
                              <path.icon className="w-10 h-10 text-yellow-400" />
                            </div>
                          </div>
                          
                          {/* Content */}
                          <h3 className="text-4xl font-bold mb-6 text-white group-hover:text-yellow-400 transition-colors duration-300">
                            {isZhHK ? path.title : path.titleEn}
                          </h3>
                          
                          <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                            {isZhHK ? path.description : path.descriptionEn}
                          </p>
                          
                          {/* CTA Button */}
                          <Button 
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transform group-hover:scale-105"
                          >
                            {isZhHK ? '開始評估' : 'Start Assessment'}
                            <ChevronRight className="w-5 h-5 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Questionnaire */}
        {currentPath && !showResult && !isLoading && (
          <motion.div
            key="questionnaire"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-40 pb-24 px-4"
          >
            <div className="max-w-4xl mx-auto">
              {/* Progress Bar */}
              <div className="mb-12">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg text-gray-400">
                    {isZhHK ? '進度' : 'Progress'}: {currentQuestion + 1} / {currentPath.questions.length}
                  </span>
                  <span className="text-lg text-yellow-400 font-bold">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <motion.div 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-black border border-gray-700 rounded-3xl p-12">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-3xl font-bold mb-8 text-white">
                    {isZhHK ? currentQuestionData?.question : currentQuestionData?.questionEn}
                  </h3>

                  {/* Question Types */}
                  {currentQuestionData?.type === 'single' && (
                    <div className="space-y-4">
                      {currentQuestionData.options?.map((option, index) => (
                        <motion.button
                          key={index}
                          className={`w-full p-6 text-left rounded-xl border-2 transition-all duration-300 ${
                            answers[currentQuestionData.id] === option
                              ? 'border-yellow-400 bg-yellow-400/10 text-white shadow-[0_0_20px_rgba(255,215,0,0.2)]'
                              : 'border-gray-600 hover:border-gray-500 text-white hover:bg-gray-800'
                          }`}
                          onClick={() => handleAnswer(currentQuestionData.id, option)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-lg font-medium">
                            {isZhHK ? option : currentQuestionData.optionsEn?.[index]}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {currentQuestionData?.type === 'multiple' && (
                    <div className="space-y-4">
                      {currentQuestionData.options?.map((option, index) => {
                        const isSelected = answers[currentQuestionData.id]?.includes(option);
                        return (
                          <motion.button
                            key={index}
                            className={`w-full p-6 text-left rounded-xl border-2 transition-all duration-300 ${
                              isSelected
                                ? 'border-yellow-400 bg-yellow-400/10 text-white shadow-[0_0_20px_rgba(255,215,0,0.2)]'
                                : 'border-gray-600 hover:border-gray-500 text-white hover:bg-gray-800'
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
                            <div className="flex items-center text-lg">
                              <div className={`w-6 h-6 rounded border-2 mr-4 flex items-center justify-center ${
                                isSelected ? 'bg-yellow-400 border-yellow-400' : 'border-gray-500'
                              }`}>
                                {isSelected && <CheckCircle className="w-4 h-4 text-black" />}
                              </div>
                              <span className="font-medium">
                                {isZhHK ? option : currentQuestionData.optionsEn?.[index]}
                              </span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  )}

                  {currentQuestionData?.type === 'scale' && (
                    <div className="space-y-6">
                      <div className="flex justify-between text-lg text-gray-300">
                        <span>{isZhHK ? '不重要' : 'Not Important'}</span>
                        <span>{isZhHK ? '非常重要' : 'Very Important'}</span>
                      </div>
                      <div className="flex space-x-3">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                          <motion.button
                            key={value}
                            className={`w-12 h-12 rounded-full border-2 text-lg font-bold transition-all duration-300 ${
                              answers[currentQuestionData.id] === value
                                ? 'border-yellow-400 bg-yellow-400 text-black shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                                : 'border-gray-500 hover:border-gray-400 text-white hover:bg-gray-800'
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
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="border-gray-500 text-white hover:border-gray-400 hover:bg-gray-800 px-8 py-4 text-lg rounded-xl font-medium"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  {isZhHK ? '上一題' : 'Previous'}
                </Button>

                <div className="space-x-6">
                  <Button
                    variant="outline"
                    onClick={resetForm}
                    className="border-gray-500 text-white hover:border-gray-400 hover:bg-gray-800 px-8 py-4 text-lg rounded-xl font-medium"
                  >
                    {isZhHK ? '重新開始' : 'Restart'}
                  </Button>

                  <Button
                    onClick={() => {
                      // Scroll to top when going to next question
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      nextQuestion();
                    }}
                    disabled={!answers[currentQuestionData?.id || '']}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transform hover:scale-105"
                  >
                    {currentQuestion === currentPath.questions.length - 1 
                      ? (isZhHK ? '完成評估' : 'Complete Assessment')
                      : (isZhHK ? '下一題' : 'Next')
                    }
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading */}
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-20 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div 
                className="w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto mb-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <h3 className="text-3xl font-bold text-yellow-400 mb-4">
                {isZhHK ? '正在分析您的需求...' : 'Analyzing your requirements...'}
              </h3>
              <p className="text-xl text-gray-400">
                {isZhHK ? '請稍候，我們正在為您制定專屬建議' : 'Please wait, we are creating customized recommendations for you'}
              </p>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {showResult && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen pt-40 pb-24 px-4"
          >
            <div className="max-w-4xl mx-auto">
              <div className="bg-black border border-yellow-400/30 rounded-3xl p-12">
                <div className="text-center mb-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Award className="w-12 h-12 text-black" />
                  </motion.div>
                  <h2 className="text-4xl font-bold mb-6 text-white">
                    {isZhHK ? '評估完成！' : 'Assessment Complete!'}
                  </h2>
                  <p className="text-xl text-gray-300">
                    {isZhHK ? '基於您的回答，我們為您準備了專屬建議' : 'Based on your responses, we have prepared customized recommendations for you'}
                  </p>
                </div>

                <div className="bg-gray-800 rounded-2xl p-8 mb-12">
                  <h3 className="text-2xl font-bold mb-6 text-yellow-400">
                    {isZhHK ? '我們的建議' : 'Our Recommendations'}
                  </h3>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    {getRecommendation()}
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <Target className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-yellow-400 mb-2">
                      {isZhHK ? '精準匹配' : 'Precise Match'}
                    </h4>
                    <p className="text-gray-300">
                      {isZhHK ? '根據需求量身定制' : 'Customized to your needs'}
                    </p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-yellow-400 mb-2">
                      {isZhHK ? '效果提升' : 'Performance Boost'}
                    </h4>
                    <p className="text-gray-300">
                      {isZhHK ? '顯著改善業務效率' : 'Significantly improve efficiency'}
                    </p>
                  </div>
                  <div className="text-center">
                    <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-yellow-400 mb-2">
                      {isZhHK ? '專業支援' : 'Professional Support'}
                    </h4>
                    <p className="text-gray-300">
                      {isZhHK ? '全程專家指導' : 'Expert guidance throughout'}
                    </p>
                  </div>
                </div>

                <div className="text-center space-y-6">
                  <Button 
                    size="lg"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-12 py-6 text-xl rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transform hover:scale-105"
                  >
                    <Calendar className="w-6 h-6 mr-3" />
                    {isZhHK ? '預約免費諮詢' : 'Book Free Consultation'}
                  </Button>
                  <p className="text-gray-300">
                    {isZhHK ? '30分鐘專業諮詢，無任何費用' : '30-minute professional consultation, completely free'}
                  </p>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-700 text-center">
                  <Button
                    variant="outline"
                    onClick={resetForm}
                    className="border-gray-500 text-white hover:border-gray-400 hover:bg-gray-800 px-8 py-4 text-lg rounded-xl font-medium"
                  >
                    {isZhHK ? '重新評估' : 'Start New Assessment'}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Enterprise; 