import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Instagram, Facebook, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const MainHero = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden" 
      style={{ 
        backgroundColor: '#121212',
        padding: 'var(--space-16) var(--space-8)' // 統一頁面級別間距
      }}
    >
      {/* Animated background dots */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: 0
            }}
            animate={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center" style={{ gap: 'var(--space-8)' }}>
          {/* Content - Centered */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}
          >
            {/* AI in Business Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-blue-900/30 text-blue-300 rounded-full font-medium"
              style={{
                padding: `var(--space-2) var(--space-4)`, // 統一 badge 間距
                fontSize: 'var(--text-sm)', // 統一字體大小
                marginBottom: 'var(--space-6)' // 統一下方間距
              }}
            >
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>{language === 'zh-HK' ? t('hero.badge') : 'AI in Business'}</span>
            </motion.div>
            
            {/* Main Title - 使用統一字體層級 */}
            <motion.h1
              className="text-white leading-tight font-bold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ 
                fontSize: 'clamp(var(--text-5xl), 5vw, var(--text-7xl))', // 響應式但統一的字體
                fontWeight: 'var(--font-bold)',
                lineHeight: 'var(--leading-tight)',
                marginBottom: 'var(--space-6)'
              }}
            >
              {language === 'zh-HK' ? (
                <>
                  AI Formula：香港實戰<br />
                  <span className="text-yellow-500">AI 應用課程</span>
                </>
              ) : (
                <>
                  AI: The Future of<br />
                  <span className="text-yellow-500">Learning</span>
                </>
              )}
            </motion.h1>
            
            {/* Secondary Title - 使用統一字體層級 */}
            <motion.h2
              className="font-semibold text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                fontSize: 'var(--text-4xl)',
                fontWeight: 'var(--font-semibold)',
                lineHeight: 'var(--leading-snug)',
                marginBottom: 'var(--space-4)'
              }}
            >
              {language === 'zh-HK' ? '實學實用，專為香港職場而設' : 'Practical AI training designed for Hong Kong professionals'}
            </motion.h2>
            
            {/* Subtitle - 使用統一字體層級 */}
            <motion.p
              className="text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-normal)',
                lineHeight: 'var(--leading-normal)',
                marginBottom: 'var(--space-8)'
              }}
            >
              {language === 'zh-HK' ? '學會立刻幫到你慳時間慳成本的實戰 AI 課程' : 'Learn AI skills that immediately help you save time and boost efficiency'}
            </motion.p>
            
            {/* 🎯 統一按鈕系統 - 修復按鈕尺寸混亂問題 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center"
              style={{ gap: 'var(--space-4)' }} // 統一按鈕間距
            >
              {/* 主要按鈕 - 統一尺寸 */}
              <Button 
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => navigate('/course')}
                style={{
                  height: 'var(--btn-height-lg)', // 48px 大按鈕高度
                  padding: '0 var(--btn-padding-x-lg)', // 0 24px 大按鈕內邊距
                  fontSize: 'var(--text-lg)', // 18px 字體
                  fontWeight: 'var(--font-semibold)', // 600 字重
                  borderRadius: 'var(--radius-2xl)' // 20px 圓角
                }}
              >
                {language === 'zh-HK' ? '免費試學' : 'Start Free Trial'}
              </Button>
              
              {/* 次要按鈕 - 相同統一尺寸 */}
              <Button 
                variant="outline"
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-black font-semibold rounded-full transition-all duration-300"
                onClick={() => navigate('/course')}
                style={{
                  height: 'var(--btn-height-lg)', // 與主要按鈕相同高度
                  padding: '0 var(--btn-padding-x-lg)', // 相同內邊距
                  fontSize: 'var(--text-lg)', // 相同字體大小
                  fontWeight: 'var(--font-semibold)', // 相同字重
                  borderRadius: 'var(--radius-2xl)', // 相同圓角
                  borderWidth: '2px'
                }}
              >
                {language === 'zh-HK' ? '了解更多' : 'Learn More'}
              </Button>
            </motion.div>

            {/* Social Media Links - 統一間距 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex items-center justify-center"
              style={{ 
                gap: 'var(--space-6)', // 統一社交媒體圖標間距
                marginTop: 'var(--space-12)' // 統一區塊間距
              }}
            >
              {[
                { icon: Instagram, label: 'Instagram', url: 'https://instagram.com' },
                { icon: Facebook, label: 'Facebook', url: 'https://facebook.com' },
                { icon: MessageCircle, label: 'WhatsApp', url: 'https://whatsapp.com' }
              ].map(({ icon: Icon, label, url }) => (
                <motion.a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: 'var(--space-12)', // 48px 統一圖標容器大小
                    height: 'var(--space-12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MainHero;
