import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Mail, Phone, HelpCircle, X, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { SEOHead } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Support: React.FC = () => {
  const [isFloatingModalOpen, setIsFloatingModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { language } = useLanguage();
  const navigate = useNavigate();

  const isZhHK = language === 'zh-HK';

  // 頁面載入動畫
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // 浮動按鈕動畫
  const floatingButtonVariants = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.05, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    hover: { scale: 1.1, rotate: 15 }
  };

  // 彈出框動畫
  const modalVariants = {
    initial: { opacity: 0, scale: 0.8, y: 50 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  // 卡片進入動畫
  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  // 支援選項數據
  const supportOptions = [
    {
      id: 'email',
      icon: Mail,
      title: isZhHK ? '電郵支援' : 'Email Support',
      description: isZhHK 
        ? '有問題？寄電郵到 support@aiformula.com，我哋會喺24小時內回覆你！' 
        : 'Got questions? Email us at support@aiformula.com, we\'ll reply within 24 hours!',
      action: () => window.open('mailto:support@aiformula.com', '_blank'),
      color: 'from-yellow-400 to-amber-500'
    },
    {
      id: 'faq',
      icon: HelpCircle,
      title: isZhHK ? '常見問題' : 'FAQ',
      description: isZhHK 
        ? '唔知點樣登入、睇課程或者上載作業？去我哋嘅FAQ頁面搵答案！' 
        : 'Don\'t know how to login, view courses or upload assignments? Check our FAQ page!',
      action: () => navigate('/faq'),
      color: 'from-amber-400 to-orange-500'
    },
    {
      id: 'hotline',
      icon: Phone,
      title: isZhHK ? '緊急支援' : 'Emergency Support',
      description: isZhHK 
        ? '有緊急問題？即刻打熱線 +852 1234 5678，我哋24/7為你服務！' 
        : 'Got urgent issues? Call our hotline +852 1234 5678, we\'re here 24/7!',
      action: () => window.open('tel:+85212345678', '_self'),
      color: 'from-orange-400 to-red-500'
    }
  ];

  // 處理浮動按鈕點擊
  const handleFloatingButtonClick = () => {
    setIsFloatingModalOpen(!isFloatingModalOpen);
  };

  // 處理卡片點擊
  const handleCardClick = (optionId: string, action: () => void) => {
    setActiveSection(optionId);
    action();
    setTimeout(() => setActiveSection(null), 1000);
  };

  return (
    <>
      <SEOHead 
        title={isZhHK ? "技術支援 | AI Formula" : "Technical Support | AI Formula"}
        description={isZhHK 
          ? "AI Formula 技術支援中心 - 24小時電郵支援、常見問題解答、緊急熱線服務。我哋承諾畀你一個順暢嘅學習體驗！" 
          : "AI Formula Technical Support Center - 24-hour email support, FAQ, emergency hotline service. We promise you a smooth learning experience!"
        }
      />

      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* 背景效果 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-black to-amber-900/20" />
          <div className="absolute top-0 left-0 w-full h-full">
            {/* 動態背景點陣 */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-12 h-full">
                {Array.from({ length: 144 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="border-r border-b border-yellow-500/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{
                      duration: 3,
                      delay: (i % 12) * 0.1,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 主要內容 */}
        <motion.div
          className="relative z-10 container mx-auto px-4 pt-24 pb-16"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* 標題區域 */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 bg-clip-text text-transparent"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {isZhHK ? '技術支援' : 'Technical Support'}
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {isZhHK 
                ? '喺學習AI嘅路上，遇到技術問題？唔使擔心！我哋嘅專業技術支援團隊隨時幫到你！'
                : 'Encountering technical issues on your AI learning journey? Don\'t worry! Our professional technical support team is always here to help!'
              }
            </motion.p>
          </motion.div>

          {/* 支援選項卡片 */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {supportOptions.map((option, index) => (
              <motion.div
                key={option.id}
                className={`
                  relative group cursor-pointer rounded-2xl p-8 
                  border border-yellow-500/30 backdrop-blur-sm
                  transition-all duration-300 hover:border-yellow-400/60
                  ${activeSection === option.id ? 'ring-2 ring-yellow-400' : ''}
                `}
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(20,20,20,0.8) 100%)'
                }}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                custom={index}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  boxShadow: '0 20px 40px rgba(251, 191, 36, 0.2)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCardClick(option.id, option.action)}
              >
                {/* 背景漸變效果 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                
                {/* 圖標 */}
                <motion.div
                  className="relative z-10 mb-6"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${option.color} p-4 shadow-lg`}>
                    <option.icon className="w-full h-full text-black" />
                  </div>
                </motion.div>

                {/* 內容 */}
                <div className="relative z-10 text-center">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4 group-hover:text-yellow-300 transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors leading-relaxed">
                    {option.description}
                  </p>
                </div>

                {/* 箭頭指示器 */}
                <motion.div
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <ArrowRight className="w-5 h-5 text-yellow-400" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* 承諾區域 */}
          <motion.div
            className="text-center bg-gradient-to-r from-yellow-900/20 via-amber-900/20 to-orange-900/20 rounded-2xl p-8 border border-yellow-500/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <CheckCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">
              {isZhHK ? '我哋嘅承諾' : 'Our Promise'}
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {isZhHK 
                ? '我哋承諾畀你一個順暢嘅學習體驗，有咩問題隨時搵我哋！'
                : 'We promise to provide you with a smooth learning experience. Feel free to contact us anytime!'
              }
            </p>
          </motion.div>
        </motion.div>

        {/* 浮動支援按鈕 */}
        <motion.button
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-lg z-[60] flex items-center justify-center"
          variants={floatingButtonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap={{ scale: 0.9 }}
          onClick={handleFloatingButtonClick}
        >
          <Settings className="w-8 h-8 text-black" />
        </motion.button>

        {/* 浮動彈出框 */}
        <AnimatePresence>
          {isFloatingModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFloatingModalOpen(false)}
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 max-w-md w-full border border-yellow-500/30 relative"
                variants={modalVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 關閉按鈕 */}
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                  onClick={() => setIsFloatingModalOpen(false)}
                >
                  <X className="w-6 h-6" />
                </button>

                {/* 彈出框內容 */}
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                    <Settings className="w-8 h-8 text-black" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">
                    {isZhHK ? '快速支援' : 'Quick Support'}
                  </h3>
                  
                  <div className="space-y-3">
                    <button
                      className="w-full p-3 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg text-left transition-colors flex items-center gap-3"
                      onClick={() => window.open('mailto:support@aiformula.com', '_blank')}
                    >
                      <Mail className="w-5 h-5 text-yellow-400" />
                      <span>{isZhHK ? '發送電郵' : 'Send Email'}</span>
                    </button>
                    
                    <button
                      className="w-full p-3 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg text-left transition-colors flex items-center gap-3"
                      onClick={() => window.open('tel:+85212345678', '_self')}
                    >
                      <Phone className="w-5 h-5 text-yellow-400" />
                      <span>{isZhHK ? '致電熱線' : 'Call Hotline'}</span>
                    </button>
                    
                    <button
                      className="w-full p-3 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg text-left transition-colors flex items-center gap-3"
                      onClick={() => navigate('/faq')}
                    >
                      <HelpCircle className="w-5 h-5 text-yellow-400" />
                      <span>{isZhHK ? '查看FAQ' : 'View FAQ'}</span>
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

export default Support; 