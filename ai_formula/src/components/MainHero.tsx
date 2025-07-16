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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#121212' }}>
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
        <div className="flex flex-col items-center text-center">
          {/* Content - Centered */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {/* AI in Business Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-blue-900/30 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6 md:mb-8"
            >
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>{language === 'zh-HK' ? t('hero.badge') : 'AI in Business'}</span>
            </motion.div>
            
            {/* Main Title - Mobile First */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
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
            
            {/* Secondary Title */}
            <motion.h2
              className="text-xl md:text-2xl font-semibold mb-4 text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {language === 'zh-HK' ? '實學實用，專為香港職場而設' : 'Practical AI training designed for Hong Kong professionals'}
            </motion.h2>
            
            {/* Subtitle - Mobile Friendly */}
            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {language === 'zh-HK' ? '學會立刻幫到你慳時間慳成本的實戰 AI 課程' : 'Learn AI skills that immediately help you save time and boost efficiency'}
            </motion.p>
            
            {/* Improved CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 md:mb-16"
            >
              <Button 
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => navigate('/course')}
              >
                {language === 'zh-HK' ? '免費試學' : 'Start Free Trial'}
              </Button>
              
              <Button 
                variant="outline"
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300"
                onClick={() => navigate('/course')}
              >
                {language === 'zh-HK' ? '了解更多' : 'Learn More'}
              </Button>
            </motion.div>

            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
            >
              {[
                { name: 'INSTAGRAM', icon: Instagram },
                { name: 'WHATSAPP', icon: MessageCircle },
                { name: 'FACEBOOK', icon: Facebook }
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href="#"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer group"
                >
                  <social.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{social.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(MainHero); 
