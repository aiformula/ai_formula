import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, HelpCircle, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { SEOHead } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Support: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { language } = useLanguage();
  const navigate = useNavigate();

  const isZhHK = language === 'zh-HK';

  // 承諾文字
  const promiseText = isZhHK 
    ? '我哋承諾畀你一個順暢嘅學習體驗，有咩問題隨時搵我哋！'
    : 'We promise to provide you with a smooth learning experience. Feel free to contact us anytime!';

  // 頁面載入動畫
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    },
    exit: { opacity: 0 }
  };

  // 標題動畫
  const titleVariants = {
    initial: { opacity: 0, y: -50, scale: 0.9 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 300,
        duration: 1.2
      }
    }
  };

  // 卡片動畫（由下而上滑入 + 彈跳）
  const cardVariants = {
    initial: { opacity: 0, y: 60, scale: 0.9 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 200,
        delay: 0.3 + index * 0.2,
        duration: 0.8
      }
    })
  };

  // 彈出框動畫（增強版）
  const modalVariants = {
    initial: { opacity: 0, scale: 0.7, y: 100, rotateX: -15 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 400,
        duration: 0.6
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.7, 
      y: 100,
      rotateX: 15,
      transition: { duration: 0.4 }
    }
  };

  // 成功訊息動畫
  const successVariants = {
    initial: { opacity: 0, scale: 0.5, y: 50 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 400
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.5, 
      y: -50,
      transition: { duration: 0.5 }
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
      action: () => {
        window.open('mailto:support@aiformula.com', '_blank');
        showSuccess();
      },
      color: 'from-yellow-400 to-amber-500',
      iconColor: 'text-amber-900'
    },
    {
      id: 'faq',
      icon: HelpCircle,
      title: isZhHK ? '常見問題' : 'FAQ',
      description: isZhHK 
        ? '唔知點樣登入、睇課程或者上載作業？去我哋嘅FAQ頁面搵答案！' 
        : 'Don\'t know how to login, view courses or upload assignments? Check our FAQ page!',
      action: () => navigate('/support/faq'),
      color: 'from-amber-400 to-orange-500',
      iconColor: 'text-orange-900'
    },
    {
      id: 'hotline',
      icon: Phone,
      title: isZhHK ? '緊急支援' : 'Emergency Support',
      description: isZhHK 
        ? '有緊急問題？即刻打熱線 +852 1234 5678，我哋24/7為你服務！' 
        : 'Got urgent issues? Call our hotline +852 1234 5678, we\'re here 24/7!',
      action: () => {
        window.open('tel:+85212345678', '_self');
        showSuccess();
      },
      color: 'from-orange-400 to-red-500',
      iconColor: 'text-red-900'
    }
  ];

  // 處理卡片點擊
  const handleCardClick = (sectionId: string, action: () => void) => {
    setActiveSection(sectionId);
    action();
    showSuccess();
    
    // 2秒後重置活躍狀態
    setTimeout(() => setActiveSection(null), 2000);
  };

  // 顯示成功訊息
  const showSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
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

      {/* 背景容器 */}
      <div className="fixed inset-0 bg-black">
        {/* 簡單漸變背景 */}
        <div className="absolute inset-0 bg-gray-900" />
      </div>

      <div className="min-h-screen bg-black text-white relative overflow-hidden font-['Montserrat',sans-serif]">
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
            variants={titleVariants}
          >
            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
              <motion.h1 
                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 bg-clip-text text-transparent hero-title"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
                animate={{
                  textShadow: [
                    "0 0 20px rgba(251, 191, 36, 0.3)",
                    "0 0 30px rgba(251, 191, 36, 0.5)", 
                    "0 0 20px rgba(251, 191, 36, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isZhHK ? '技術支援' : 'Technical Support'}
              </motion.h1>
              <Sparkles className="w-8 h-8 text-orange-400" />
            </motion.div>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed hero-description"
              style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {isZhHK 
                ? '喺學習AI嘅路上，遇到技術問題？唔使擔心！我哋嘅專業技術支援團隊隨時幫到你！'
                : 'Encountering technical issues on your AI learning journey? Don\'t worry! Our professional technical support team is always here to help!'
              }
            </motion.p>
          </motion.div>

          {/* 支援選項卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
            {supportOptions.map((option, index) => (
              <motion.div
                key={option.id}
                className={`
                  relative group cursor-pointer rounded-2xl p-6 md:p-8 
                  border border-yellow-500/20 backdrop-blur-sm
                  transition-all duration-500 support-card mobile-touch-feedback
                  ${activeSection === option.id ? 'ring-2 ring-yellow-400 scale-105' : ''}
                `}
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(30,30,30,0.9) 100%)',
                  fontFamily: 'Roboto, sans-serif'
                }}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                custom={index}
                whileHover={{ 
                  scale: [1.02, 1.05, 1.02], 
                  y: [-8, -12, -8],
                  rotateY: [0, 5, 0],
                  boxShadow: [
                    '0 20px 40px rgba(251, 191, 36, 0.2)',
                    '0 25px 50px rgba(251, 191, 36, 0.3)',
                    '0 30px 60px rgba(251, 191, 36, 0.4)'
                  ],
                  borderColor: 'rgba(251, 191, 36, 0.8)',
                  transition: { duration: 0.6, ease: "easeInOut" }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCardClick(option.id, option.action)}
              >
                {/* 動態背景光暈 */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 rounded-2xl`}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* 圖標區域 */}
                <motion.div
                  className="relative z-10 mb-6 flex justify-center"
                  whileHover={{ 
                    rotate: [0, -10, 10, 0],
                    scale: 1.2
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div 
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${option.color} p-5 shadow-2xl`}
                    whileHover={{
                      boxShadow: [
                        '0 10px 25px rgba(251, 191, 36, 0.4)',
                        '0 15px 35px rgba(251, 191, 36, 0.6)',
                        '0 20px 45px rgba(251, 191, 36, 0.8)'
                      ]
                    }}
                    animate={{
                      boxShadow: [
                        '0 5px 15px rgba(251, 191, 36, 0.2)',
                        '0 10px 25px rgba(251, 191, 36, 0.4)',
                        '0 5px 15px rgba(251, 191, 36, 0.2)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <option.icon className={`w-full h-full ${option.iconColor}`} />
                  </motion.div>
                </motion.div>

                {/* 內容區域 */}
                <div className="relative z-10 text-center">
                  <motion.h3 
                    className="text-xl font-bold text-yellow-400 mb-4 transition-colors duration-300"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                    whileHover={{ 
                      color: '#F59E0B',
                      textShadow: '0 0 10px rgba(251, 191, 36, 0.8)'
                    }}
                  >
                    {option.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-300 leading-relaxed transition-colors duration-300"
                    style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
                    whileHover={{ color: '#ffffff' }}
                  >
                    {option.description}
                  </motion.p>
                </div>

                {/* 箭頭指示器 */}
                <motion.div
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                  initial={{ x: -10, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-6 h-6 text-yellow-400" />
                </motion.div>

                {/* 發光邊框效果 */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent"
                  whileHover={{
                    borderImage: 'linear-gradient(45deg, rgba(251, 191, 36, 0.8), rgba(247, 147, 26, 0.8)) 1',
                    opacity: 1
                  }}
                  initial={{ opacity: 0 }}
                />
              </motion.div>
            ))}
          </div>

          {/* 承諾區域 */}
          <div className="bg-gradient-to-r from-yellow-900/20 via-amber-900/20 to-orange-900/20 rounded-2xl p-8 border border-yellow-500/30">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-2xl">
                <CheckCircle className="w-8 h-8 text-black" />
              </div>
              
              <h3 className="text-2xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
                {isZhHK ? '我哋嘅承諾' : 'Our Promise'}
              </h3>
              <div className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}>
                <span>{promiseText}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 成功提示訊息 */}
        <AnimatePresence>
          {showSuccessMessage && (
            <motion.div
              className="fixed top-8 right-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl z-[80] flex items-center gap-3"
              variants={successVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6 }}
              >
                <CheckCircle className="w-6 h-6" />
              </motion.div>
              <span className="font-semibold">
                {isZhHK ? '操作成功！' : 'Success!'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 自定義CSS動畫 */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Roboto:wght@300;400;500;700&display=swap');
        
        /* 手機優化 */
        @media (max-width: 768px) {
          .support-card {
            margin-bottom: 1.5rem;
          }
          
          .support-card:hover {
            transform: translateY(-4px) scale(1.02) !important;
          }
          
          /* 減少手機上的動畫複雜度以提升性能 */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        }
        
        /* 確保在小屏幕上文字可讀性 */
        @media (max-width: 480px) {
          .hero-title {
            font-size: 2.5rem !important;
          }
          
          .hero-description {
            font-size: 1rem !important;
            padding: 0 1rem;
          }
          
          .support-card-title {
            font-size: 1.25rem !important;
          }
          
          .support-card-description {
            font-size: 0.875rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default Support; 