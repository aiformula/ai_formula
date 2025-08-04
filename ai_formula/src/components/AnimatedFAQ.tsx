/**
 * World-Class Animated FAQ Component
 * 世界級動效FAQ組件
 * @author Top-tier UI/UX Designer & Motion Design Expert
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  questionEn?: string;
  answerEn?: string;
}

interface AnimatedFAQProps {
  faqData: FAQItem[];
  themeColors: {
    primary: string;
    gradient: string;
    accent: string;
  };
  isZhTW?: boolean;
  className?: string;
}

const AnimatedFAQ: React.FC<AnimatedFAQProps> = ({
  faqData,
  themeColors,
  isZhTW = true,
  className = ""
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 容器載入動畫配置
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // 逐一延遲載入
        delayChildren: 0.2
      }
    }
  };

  // 單個FAQ項目載入動畫
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  // 內容展開/收合動畫
  const contentVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.4,
          ease: [0.04, 0.62, 0.23, 0.98]
        },
        opacity: {
          duration: 0.3,
          ease: "easeInOut"
        }
      }
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.4,
          ease: [0.04, 0.62, 0.23, 0.98]
        },
        opacity: {
          duration: 0.3,
          delay: 0.1,
          ease: "easeInOut"
        }
      }
    }
  };

  // 箭頭旋轉動畫
  const arrowVariants = {
    closed: { 
      rotate: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    open: { 
      rotate: 180,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  // 答案內容滑入動畫
  const answerVariants = {
    closed: {
      y: -10,
      opacity: 0
    },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* 標題區域 */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-bold text-white mb-4">
          {isZhTW ? "❓ 常見問題" : "❓ Frequently Asked Questions"}
        </h2>
        <p className="text-gray-400 text-lg">
          {isZhTW ? "為你解答學習過程中的疑問" : "Answering your questions about the learning journey"}
        </p>
      </motion.div>

      {/* FAQ列表容器 */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative"
          >
            {/* 主要FAQ卡片 */}
            <div className="relative">
              {/* 背景漸變效果 */}
              <div className={`absolute inset-0 bg-gradient-to-r ${themeColors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
              
              {/* 主卡片容器 */}
              <motion.div
                className={`relative bg-gray-800/80 backdrop-blur-sm border border-gray-700/60 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-gray-600/80 group-hover:shadow-lg group-hover:shadow-gray-900/20 ${
                  openIndex === index ? 'ring-2 ring-yellow-400/30 border-yellow-400/50' : ''
                }`}
                whileHover={{ 
                  scale: 1.01,
                  transition: { duration: 0.2 }
                }}
              >
                {/* 問題觸發器 */}
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-8 text-left focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:ring-inset transition-colors duration-200"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    {/* 問題文字 */}
                    <motion.h3 
                      className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
                        openIndex === index 
                          ? 'text-yellow-400' // 活躍狀態：品牌黃色
                          : 'text-white group-hover:text-gray-100'
                      }`}
                      layout
                    >
                      {isZhTW ? faq.question : (faq.questionEn || faq.question)}
                    </motion.h3>
                    
                    {/* 動畫箭頭 */}
                    <motion.div
                      variants={arrowVariants}
                      animate={openIndex === index ? "open" : "closed"}
                      className={`flex-shrink-0 ml-6 p-2 rounded-full transition-colors duration-300 ${
                        openIndex === index 
                          ? 'bg-yellow-400/10 text-yellow-400' 
                          : 'bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50 group-hover:text-gray-300'
                      }`}
                    >
                      <ChevronDown className="w-6 h-6" />
                    </motion.div>
                  </div>
                </motion.button>

                {/* 答案內容區域 */}
                <AnimatePresence mode="wait">
                  {openIndex === index && (
                    <motion.div
                      variants={contentVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="overflow-hidden"
                    >
                      <motion.div
                        variants={answerVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="px-8 pb-8"
                      >
                        {/* 分隔線 */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-6"></div>
                        
                        {/* 答案文字 */}
                        <div className="prose prose-invert max-w-none">
                          <p className="text-gray-300 text-lg leading-relaxed">
                            {isZhTW ? faq.answer : (faq.answerEn || faq.answer)}
                          </p>
                        </div>

                        {/* 底部裝飾 */}
                        <div className="flex items-center mt-6 pt-4 border-t border-gray-700/50">
                          <div className={`w-2 h-2 rounded-full ${themeColors.primary.replace('text-', 'bg-')} mr-3`}></div>
                          <span className="text-sm text-gray-500">
                            {isZhTW ? "希望這個回答對你有幫助" : "Hope this answer helps you"}
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* 項目間的精緻分隔線 - 只在項目收合時顯示 */}
            {index < faqData.length - 1 && openIndex !== index && openIndex !== index + 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                className="h-px bg-gradient-to-r from-transparent via-gray-700/30 to-transparent mt-4 mx-8"
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* 底部提示 */}
      <motion.div
        className="text-center mt-12 pt-8 border-t border-gray-700/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <p className="text-gray-500 text-sm">
          {isZhTW ? "💡 還有其他問題？歡迎透過 WhatsApp 聯繫我們" : "💡 Have more questions? Feel free to contact us via WhatsApp"}
        </p>
      </motion.div>
    </div>
  );
};

export default AnimatedFAQ; 