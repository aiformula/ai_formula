import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, ArrowLeft } from 'lucide-react';
import { SEOHead } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const FAQ: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const { language } = useLanguage();
  const navigate = useNavigate();

  const isZhHK = language === 'zh-HK';

  const faqData = [
    {
      id: 1,
      question: isZhHK ? '點樣註冊賬戶？' : 'How do I register an account?',
      answer: isZhHK 
        ? '你可以喺右上角點擊「註冊」按鈕，然後填寫你嘅電郵地址同密碼就可以註冊成功。我哋會發一封確認電郵俾你。'
        : 'You can click the "Sign Up" button in the top right corner, then fill in your email address and password to register successfully. We will send you a confirmation email.'
    },
    {
      id: 2,
      question: isZhHK ? '點樣開始學習課程？' : 'How do I start learning courses?',
      answer: isZhHK
        ? '登入賬戶後，去到「課程」頁面，選擇你想學嘅課程，然後點擊「開始學習」就可以開始喇！'
        : 'After logging in, go to the "Courses" page, select the course you want to learn, and click "Start Learning" to begin!'
    },
    {
      id: 3,
      question: isZhHK ? '課程係免費嘅嗎？' : 'Are the courses free?',
      answer: isZhHK
        ? '我哋提供免費同付費課程。基礎課程大部分都係免費嘅，進階課程需要付費。你可以喺課程詳情頁面睇到價格資訊。'
        : 'We offer both free and paid courses. Most basic courses are free, while advanced courses require payment. You can see pricing information on the course details page.'
    },
    {
      id: 4,
      question: isZhHK ? '忘記咗密碼點算？' : 'What if I forget my password?',
      answer: isZhHK
        ? '喺登入頁面點擊「忘記密碼」，輸入你嘅電郵地址，我哋會發重設密碼嘅連結俾你。'
        : 'Click "Forgot Password" on the login page, enter your email address, and we will send you a password reset link.'
    },
    {
      id: 5,
      question: isZhHK ? '點樣聯絡技術支援？' : 'How do I contact technical support?',
      answer: isZhHK
        ? '你可以透過電郵 support@aiformula.com 聯絡我哋，或者打熱線 +852 1234 5678。我哋會喺24小時內回覆你。'
        : 'You can contact us via email at support@aiformula.com or call our hotline +852 1234 5678. We will respond within 24 hours.'
    }
  ];

  const toggleExpand = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <>
      <SEOHead 
        title={isZhHK ? "常見問題 | AI Formula" : "FAQ | AI Formula"}
        description={isZhHK 
          ? "AI Formula 常見問題解答 - 註冊、登入、課程學習、技術支援等問題的詳細解答。" 
          : "AI Formula FAQ - Detailed answers to registration, login, course learning, technical support and other questions."
        }
      />

      <div className="min-h-screen bg-black text-white">
        {/* 背景效果 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-black to-amber-900/10" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* 返回按鈕 */}
          <motion.button
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors mb-8"
            onClick={() => navigate('/support')}
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{isZhHK ? '返回技術支援' : 'Back to Support'}</span>
          </motion.button>

          {/* 標題 */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-yellow-400" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                {isZhHK ? '常見問題' : 'Frequently Asked Questions'}
              </h1>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {isZhHK 
                ? '搵唔到答案？睇睇呢啲常見問題，或者直接聯絡我哋嘅支援團隊！'
                : 'Can\'t find the answer? Check these common questions or contact our support team directly!'
              }
            </p>
          </motion.div>

          {/* FAQ列表 */}
          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((item, index) => (
              <motion.div
                key={item.id}
                className="border border-yellow-500/30 rounded-2xl overflow-hidden backdrop-blur-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(20,20,20,0.8) 100%)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ borderColor: 'rgba(251, 191, 36, 0.6)' }}
              >
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-yellow-500/5 transition-colors"
                  onClick={() => toggleExpand(item.id)}
                >
                  <h3 className="text-lg font-semibold text-yellow-400 pr-4">
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: expandedItem === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {expandedItem === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-yellow-500/30"
                    >
                      <div className="p-6 pt-4">
                        <p className="text-gray-300 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* 聯絡支援 */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-gray-400 mb-4">
              {isZhHK ? '仍然搵唔到答案？' : 'Still can\'t find the answer?'}
            </p>
            <motion.button
              className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/support')}
            >
              {isZhHK ? '聯絡支援團隊' : 'Contact Support Team'}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default FAQ; 