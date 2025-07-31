import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Mail, Phone, HelpCircle, X, Clock, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { SEOHead } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Support: React.FC = () => {
  const [isFloatingModalOpen, setIsFloatingModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number}>>([]);
  const [typingText, setTypingText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const { language } = useLanguage();
  const navigate = useNavigate();

  const isZhHK = language === 'zh-HK';

  // 打字機效果文字
  const promiseText = isZhHK 
    ? '我哋承諾畀你一個順暢嘅學習體驗，有咩問題隨時搵我哋！'
    : 'We promise to provide you with a smooth learning experience. Feel free to contact us anytime!';

  // 打字機效果
  useEffect(() => {
    if (typingText.length < promiseText.length) {
      const timeout = setTimeout(() => {
        setTypingText(promiseText.slice(0, typingText.length + 1));
      }, 80); // 打字速度
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [typingText, promiseText]);

  // 重置打字機效果當語言改變時
  useEffect(() => {
    setTypingText('');
    setIsTypingComplete(false);
  }, [language]);

  // 初始化粒子系統
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.2
      }));
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener('resize', generateParticles);
    return () => window.removeEventListener('resize', generateParticles);
  }, []);

  // 粒子動畫
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - particle.speed,
        x: particle.x + Math.sin(particle.y * 0.01) * 0.5,
        // 重置粒子位置當它們移出視窗
        ...(particle.y < -10 ? {
          y: window.innerHeight + 10,
          x: Math.random() * window.innerWidth
        } : {})
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

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

  // 浮動按鈕動畫（增強版）
  const floatingButtonVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: { 
      scale: [1, 1.1, 1],
      rotate: [0, 10, -10, 0],
      boxShadow: [
        "0 10px 30px rgba(251, 191, 36, 0.3)",
        "0 15px 40px rgba(251, 191, 36, 0.5)",
        "0 10px 30px rgba(251, 191, 36, 0.3)"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    hover: { 
      scale: 1.2, 
      rotate: 20,
      boxShadow: "0 20px 50px rgba(251, 191, 36, 0.6)",
      transition: { duration: 0.3 }
    }
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
      action: () => navigate('/faq'),
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

      <div className="min-h-screen bg-black text-white relative overflow-hidden font-['Montserrat',sans-serif]">
        {/* 增強背景效果 */}
        <div className="absolute inset-0">
          {/* 科幻漸變背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
          <div className="absolute inset-0 bg-gradient-to-tr from-yellow-900/10 via-transparent to-amber-900/10" />
          
          {/* 星空效果 */}
          <div className="absolute inset-0">
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* AI 數據流粒子 */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute bg-yellow-400/30 rounded-full"
                style={{
                  left: particle.x,
                  top: particle.y,
                  width: particle.size,
                  height: particle.size,
                }}
                animate={{
                  opacity: [0, 0.7, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>

          {/* 動態網格背景 */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(251, 191, 36, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(251, 191, 36, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
                animation: 'gridFloat 20s linear infinite'
              }}
            />
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
          <motion.div
            className="bg-gradient-to-r from-yellow-900/20 via-amber-900/20 to-orange-900/20 rounded-2xl p-8 border border-yellow-500/30 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 20px 40px rgba(251, 191, 36, 0.2)'
            }}
          >
            {/* 背景動畫效果 */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-amber-400/5 to-orange-400/5"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <div className="relative z-10 text-center">
              <motion.div
                className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-2xl"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                <CheckCircle className="w-8 h-8 text-black" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-yellow-400 mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
                {isZhHK ? '我哋嘅承諾' : 'Our Promise'}
              </h3>
              <div className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed relative" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}>
                <span>{typingText}</span>
                {!isTypingComplete && (
                  <motion.span
                    className="inline-block w-0.5 h-6 bg-yellow-400 ml-1"
                    animate={{
                      opacity: [1, 0, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
                {/* AI 提示 */}
                {!isTypingComplete && (
                  <motion.div
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-yellow-400/60 flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                    <span>{isZhHK ? 'AI 正在輸入...' : 'AI is typing...'}</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 增強版浮動支援按鈕 - 手機優化 */}
        <motion.button
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 md:w-18 md:h-18 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-2xl z-[60] flex items-center justify-center border-2 border-yellow-300/50 floating-support-btn"
          variants={floatingButtonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap={{ scale: 0.9 }}
          onClick={handleFloatingButtonClick}
          style={{
            // 確保手機上的觸控區域足夠大
            minWidth: '56px',
            minHeight: '56px'
          }}
        >
          <motion.div
            animate={{ rotate: isFloatingModalOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Settings className="w-7 h-7 md:w-10 md:h-10 text-black filter drop-shadow-sm" />
          </motion.div>
        </motion.button>

        {/* 增強版浮動彈出框 */}
        <AnimatePresence>
          {isFloatingModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-lg z-[70] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFloatingModalOpen(false)}
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-3xl p-8 max-w-md w-full border border-yellow-500/40 relative shadow-2xl"
                variants={modalVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                {/* 關閉按鈕 */}
                <motion.button
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                  onClick={() => setIsFloatingModalOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>

                {/* 彈出框內容 */}
                <div className="text-center">
                  <motion.div 
                    className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-2xl"
                    animate={{
                      boxShadow: [
                        '0 10px 25px rgba(251, 191, 36, 0.3)',
                        '0 15px 35px rgba(251, 191, 36, 0.5)',
                        '0 10px 25px rgba(251, 191, 36, 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Settings className="w-10 h-10 text-black" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-yellow-400 mb-6" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
                    {isZhHK ? '快速支援' : 'Quick Support'}
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { icon: Mail, text: isZhHK ? '發送電郵' : 'Send Email', action: () => window.open('mailto:support@aiformula.com', '_blank') },
                      { icon: Phone, text: isZhHK ? '致電熱線' : 'Call Hotline', action: () => window.open('tel:+85212345678', '_self') },
                      { icon: HelpCircle, text: isZhHK ? '查看FAQ' : 'View FAQ', action: () => navigate('/faq') }
                    ].map((item, index) => (
                      <motion.button
                        key={index}
                        className="w-full p-4 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-xl text-left transition-all duration-300 flex items-center gap-4 border border-yellow-500/20 hover:border-yellow-500/40"
                        onClick={() => {
                          item.action();
                          showSuccess();
                          setIsFloatingModalOpen(false);
                        }}
                        whileHover={{ 
                          scale: 1.02,
                          x: 5,
                          boxShadow: '0 5px 15px rgba(251, 191, 36, 0.3)'
                        }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <motion.div
                          className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center"
                          whileHover={{ rotate: 10, scale: 1.1 }}
                        >
                          <item.icon className="w-6 h-6 text-black" />
                        </motion.div>
                        <span className="font-medium">{item.text}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
        @keyframes gridFloat {
          0% { transform: translate(0, 0); }
          50% { transform: translate(30px, 30px); }
          100% { transform: translate(0, 0); }
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Roboto:wght@300;400;500;700&display=swap');
        
        /* 手機優化 */
        @media (max-width: 768px) {
          .support-card {
            margin-bottom: 1.5rem;
          }
          
          .support-card:hover {
            transform: translateY(-4px) scale(1.02) !important;
          }
          
          /* 確保觸控區域足夠大 */
          .floating-support-btn {
            min-width: 56px;
            min-height: 56px;
            touch-action: manipulation;
          }
          
          /* 增強手機上的視覺反饋 */
          .mobile-touch-feedback:active {
            transform: scale(0.95);
            transition: transform 0.1s ease;
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
        
        /* 高DPI屏幕優化 */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .support-icon {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
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