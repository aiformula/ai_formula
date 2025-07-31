import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  GraduationCap, 
  Bot, 
  Wrench, 
  MessageCircle, 
  Phone,
  Mail,
  ArrowLeft,
  X
} from 'lucide-react';
import { SEOHead } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface FAQItem {
  id: number;
  category: 'ai-tools' | 'courses' | 'support';
  icon: React.ComponentType<any>;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
}

const FAQ: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSupportModal, setShowSupportModal] = useState(false);
  const { language } = useLanguage();
  const navigate = useNavigate();

  const isZhHK = language === 'zh-HK';

  const faqData: FAQItem[] = [
    // AI 工具類
    {
      id: 1,
      category: 'ai-tools',
      icon: Bot,
      question: '點樣開始用我哋嘅 AI 工具？',
      questionEn: 'How do I start using your AI tools?',
      answer: '註冊賬戶後，去到「AI工具」頁面，選擇你需要嘅工具。大部分工具都有免費試用，你可以即刻開始體驗。我哋提供詳細嘅使用指南同教學影片。',
      answerEn: 'After registering an account, go to the "AI Tools" page and select the tool you need. Most tools offer free trials so you can start experiencing them immediately. We provide detailed usage guides and tutorial videos.'
    },
    {
      id: 2,
      category: 'ai-tools',
      icon: Bot,
      question: 'AI 工具會唔會需要安裝？定係網頁直接用？',
      questionEn: 'Do AI tools require installation or can I use them directly on the web?',
      answer: '我哋嘅 AI 工具全部都係網頁版，唔需要安裝任何軟件。只要有瀏覽器同網絡連接，隨時隨地都可以使用。支援電腦、平板同手機。',
      answerEn: 'All our AI tools are web-based and require no software installation. You can use them anytime, anywhere with just a browser and internet connection. Supports computers, tablets, and mobile phones.'
    },
    {
      id: 3,
      category: 'ai-tools',
      icon: Bot,
      question: 'AI 工具同課程有冇免費試用？',
      questionEn: 'Do AI tools and courses offer free trials?',
      answer: '有！大部分 AI 工具都提供免費試用期，基礎課程係完全免費嘅。付費工具同進階課程都有7日免費試用，滿意先付費。',
      answerEn: 'Yes! Most AI tools offer free trial periods, and basic courses are completely free. Paid tools and advanced courses come with a 7-day free trial - pay only when satisfied.'
    },

    // 課程類
    {
      id: 4,
      category: 'courses',
      icon: GraduationCap,
      question: 'AI 課程要幾耐先學得曉？',
      questionEn: 'How long does it take to complete AI courses?',
      answer: '基礎課程大約需要2-4星期，進階課程需要1-3個月。每個人學習進度唔同，我哋建議每日花30-60分鐘學習，咁樣效果最好。',
      answerEn: 'Basic courses take about 2-4 weeks, while advanced courses require 1-3 months. Learning pace varies by individual. We recommend spending 30-60 minutes daily for optimal results.'
    },
    {
      id: 5,
      category: 'courses',
      icon: GraduationCap,
      question: '點樣揀最啱自己嘅課程路線？',
      questionEn: 'How do I choose the most suitable course path?',
      answer: '我哋提供免費嘅技能評估測試，根據你嘅背景同目標推薦合適嘅學習路線。你亦可以聯絡我哋嘅學習顧問，佢哋會為你度身訂造學習計劃。',
      answerEn: 'We offer a free skills assessment test that recommends suitable learning paths based on your background and goals. You can also contact our learning advisors for personalized learning plans.'
    },
    {
      id: 6,
      category: 'courses',
      icon: GraduationCap,
      question: '學完課程可唔可以即刻用到 AI 工具？',
      questionEn: 'Can I immediately use AI tools after completing courses?',
      answer: '當然可以！我哋嘅課程設計係理論同實踐並重，學完每個單元你都會即刻喺對應嘅 AI 工具度練習。畢業後你會有信心獨立使用所有工具。',
      answerEn: 'Absolutely! Our courses combine theory with practice. After each unit, you\'ll immediately practice with corresponding AI tools. Upon graduation, you\'ll confidently use all tools independently.'
    },

    // 技術支援類
    {
      id: 7,
      category: 'support',
      icon: Wrench,
      question: '如果遇到技術問題，有冇 24/7 客服？',
      questionEn: 'Is there 24/7 customer service for technical issues?',
      answer: '我哋提供24/7技術支援。緊急問題可以打熱線 +852 1234 5678，一般問題可以發電郵到 support@aiformula.com，我哋會喺2小時內回覆。',
      answerEn: 'We provide 24/7 technical support. For urgent issues, call our hotline +852 1234 5678. For general issues, email support@aiformula.com - we respond within 2 hours.'
    },
    {
      id: 8,
      category: 'support',
      icon: Wrench,
      question: '支援嘅語言同地區有冇限制？',
      questionEn: 'Are there language and regional restrictions for support?',
      answer: '我哋支援繁體中文同英文。服務覆蓋全球，特別針對香港、台灣、新加坡等地區優化。如果你需要其他語言支援，我哋會盡力安排。',
      answerEn: 'We support Traditional Chinese and English. Our services cover globally, with special optimization for Hong Kong, Taiwan, Singapore, and other regions. We\'ll arrange other language support upon request.'
    },
    {
      id: 9,
      category: 'support',
      icon: Wrench,
      question: '有冇社群或者討論區俾我哋交流？',
      questionEn: 'Is there a community or forum for discussion?',
      answer: '有！我哋有官方Discord社群同Facebook群組，學員可以互相交流經驗、分享作品、問問題。仲有定期嘅線上同線下聚會活動。',
      answerEn: 'Yes! We have an official Discord community and Facebook group where students can exchange experiences, share work, and ask questions. We also host regular online and offline meetups.'
    }
  ];

  const categories = [
    { id: 'all', name: isZhHK ? '全部' : 'All', icon: null },
    { id: 'ai-tools', name: isZhHK ? 'AI 工具' : 'AI Tools', icon: Bot },
    { id: 'courses', name: isZhHK ? '課程' : 'Courses', icon: GraduationCap },
    { id: 'support', name: isZhHK ? '技術支援' : 'Support', icon: Wrench }
  ];

  const filteredFAQ = useMemo(() => {
    let filtered = faqData;
    
    // 按分類篩選
    if (activeTab !== 'all') {
      filtered = filtered.filter(item => item.category === activeTab);
    }
    
    // 按搜尋詞篩選
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => {
        const question = isZhHK ? item.question : item.questionEn;
        const answer = isZhHK ? item.answer : item.answerEn;
        return question.toLowerCase().includes(query) || 
               answer.toLowerCase().includes(query);
      });
    }
    
    return filtered;
  }, [activeTab, searchQuery, isZhHK]);

  const toggleItem = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <>
      <SEOHead 
        title={isZhHK ? "常見問題 | AI Formula" : "FAQ | AI Formula"}
        description={isZhHK 
          ? "AI Formula 常見問題解答 - AI工具使用、課程學習、技術支援等問題的詳細解答" 
          : "AI Formula FAQ - Detailed answers about AI tools usage, course learning, technical support and more"
        }
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        {/* 返回按鈕 */}
        <div className="container mx-auto px-4 pt-24">
          <motion.button
            onClick={() => navigate('/support')}
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors mb-8 group"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">
              {isZhHK ? '返回技術支援' : 'Back to Support'}
            </span>
          </motion.button>

          {/* 標題區域 */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 bg-clip-text text-transparent mb-4">
              {isZhHK ? '常見問題' : 'Frequently Asked Questions'}
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {isZhHK 
                ? '搵唔到答案？我哋嘅FAQ幫你快速解決問題！'
                : 'Can\'t find an answer? Our FAQ helps you solve problems quickly!'
              }
            </p>
          </motion.div>

          {/* 搜尋框 */}
          <motion.div
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={isZhHK ? '🔍 快速搵答案...' : '🔍 Search for answers...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors"
              />
            </div>
          </motion.div>

          {/* 分類標籤 */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === category.id
                    ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/25'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {category.icon && <category.icon className="w-4 h-4" />}
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* FAQ 列表 */}
          <motion.div
            className="max-w-4xl mx-auto space-y-4 pb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {filteredFAQ.length === 0 ? (
                <motion.div
                  key="no-results"
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-6xl mb-4">🤔</div>
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    {isZhHK ? '搵唔到相關問題' : 'No matching questions found'}
                  </h3>
                  <p className="text-gray-500">
                    {isZhHK ? '試下搜尋其他關鍵詞或者聯絡我哋嘅支援團隊' : 'Try searching with different keywords or contact our support team'}
                  </p>
                </motion.div>
              ) : (
                filteredFAQ.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors group"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-yellow-300 transition-colors">
                          {isZhHK ? item.question : item.questionEn}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedItem === item.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-yellow-400 group-hover:text-yellow-300"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {expandedItem === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2">
                            <div className="pl-14">
                              <p className="text-gray-300 leading-relaxed">
                                {isZhHK ? item.answer : item.answerEn}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* 懸浮支援按鈕 */}
        <motion.button
          onClick={() => setShowSupportModal(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-2xl z-50 flex items-center justify-center text-black hover:scale-110 transition-transform"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
        >
          <MessageCircle className="w-7 h-7" />
        </motion.button>

        {/* 支援彈窗 */}
        <AnimatePresence>
          {showSupportModal && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSupportModal(false)}
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-md w-full border border-yellow-500/30 relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowSupportModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-black" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                    {isZhHK ? '聯絡支援團隊' : 'Contact Support Team'}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {isZhHK ? '我哋隨時為你提供幫助！' : 'We\'re here to help you anytime!'}
                  </p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => window.open('mailto:support@aiformula.com', '_blank')}
                      className="w-full flex items-center gap-3 p-4 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span className="font-medium">support@aiformula.com</span>
                    </button>
                    
                    <button
                      onClick={() => window.open('tel:+85212345678', '_self')}
                      className="w-full flex items-center gap-3 p-4 bg-green-600 hover:bg-green-700 rounded-xl transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      <span className="font-medium">+852 1234 5678</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FAQ; 