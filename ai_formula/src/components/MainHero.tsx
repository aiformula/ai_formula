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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
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

      {/* Enhanced Right side decorative elements */}
      <div className="absolute right-5 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="relative"
        >
          {/* Main large circle with gradient */}
          <motion.div
            className="w-48 h-48 rounded-full relative"
            style={{
              background: 'linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899)'
            }}
            animate={{ 
              rotate: 360,
              scale: [1, 1.05, 1] 
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {/* Inner circle */}
            <motion.div 
              className="absolute inset-8 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #EC4899, #F59E0B)'
              }}
              animate={{ 
                rotate: -360,
                scale: [1, 0.95, 1]
              }}
              transition={{ 
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {/* Core */}
              <div className="absolute inset-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </motion.div>
          </motion.div>
          
          {/* Large decorative elements around */}
          <motion.div
            className="absolute -top-12 -left-12 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <span className="text-white text-2xl">🎯</span>
          </motion.div>
          
          <motion.div
            className="absolute -bottom-8 -right-8 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            whileHover={{ scale: 1.2, rotate: -5 }}
          >
            <span className="text-white text-xl">⚡</span>
          </motion.div>
          
          <motion.div
            className="absolute top-8 -right-16 w-14 h-14 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-2xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            whileHover={{ scale: 1.15, rotate: 10 }}
          >
            <span className="text-white text-lg">🔗</span>
          </motion.div>
          
          <motion.div
            className="absolute bottom-16 -left-16 w-18 h-18 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            whileHover={{ scale: 1.1, rotate: -10 }}
          >
            <span className="text-white text-xl">💬</span>
          </motion.div>
          
          {/* Additional floating elements */}
          <motion.div
            className="absolute top-20 left-20 w-6 h-6 bg-yellow-400 rounded-full"
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          
          <motion.div
            className="absolute bottom-20 right-20 w-4 h-4 bg-blue-400 rounded-full"
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            {/* AI in Business Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-blue-900/30 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>{language === 'zh-TW' ? t('hero.badge') : 'AI in Business'}</span>
            </motion.div>
            
            {/* Main Title */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {language === 'zh-TW' ? (
                <>
                  {t('hero.title1')}: {t('hero.title2')}<br />
                  <span className="text-yellow-500">{t('hero.titleHighlight')}</span>
                </>
              ) : (
                <>
                  AI: The Future of<br />
                  <span className="text-yellow-500">Learning</span>
                </>
              )}
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              className="text-xl text-gray-300 mb-8 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {language === 'zh-TW' ? t('hero.subtitle') : 'How artificial intelligence is personalizing and transforming business automation.'}
            </motion.p>
            
            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center space-x-4 mb-16"
            >
              <Button 
                className="bg-white text-black hover:bg-gray-100 font-semibold px-6 py-3 text-lg rounded-full transition-all duration-300"
                onClick={() => navigate('/course')}
              >
                {language === 'zh-TW' ? t('hero.chooseProgram') : 'Choose program'}
              </Button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors duration-300"
              >
                <Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
              </motion.button>
            </motion.div>

            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex items-center space-x-8"
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

          {/* Right side - Visual space for decorative elements */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(MainHero); 