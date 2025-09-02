import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Shuffle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getRandomThreeTestimonials, generateRandomProfile, type Testimonial, type GeneratedProfile } from '@/data/testimonials';

interface TestimonialWithProfile extends Testimonial {
  generatedProfile: GeneratedProfile;
}

const Testimonials = () => {
  const { language } = useLanguage();
  const [currentTestimonials, setCurrentTestimonials] = useState<TestimonialWithProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 初始化載入評價
  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomTestimonials = getRandomThreeTestimonials();
      const testimonialsWithProfiles = randomTestimonials.map(testimonial => ({
        ...testimonial,
        generatedProfile: generateRandomProfile()
      }));
      setCurrentTestimonials(testimonialsWithProfiles);
      setIsLoading(false);
    }, 300);
  };

  const handleShuffle = () => {
    loadTestimonials();
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating 
                ? 'fill-yellow-500 text-yellow-500' 
                : 'fill-gray-600 text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: '#121212' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Shuffle Control */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {language === 'zh-HK' ? '客戶怎麼說' : 'What Our Clients Say'}
            </h2>
            <p className="text-gray-400 text-lg">
              {language === 'zh-HK' 
                ? '真實客戶分享 AI 學習與自動化轉型的成功經驗' 
                : 'Real client experiences with AI learning and automation transformation'
              }
            </p>
          </motion.div>

          {/* Shuffle Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={handleShuffle}
            disabled={isLoading}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold px-6 py-3 rounded-lg hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Shuffle className={`w-5 h-5 inline mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {language === 'zh-HK' ? '隨機顯示其他評價' : 'Show Other Reviews'}
          </motion.button>
        </div>

        {/* Testimonials Grid - Only 3 Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          key={currentTestimonials.length} // 觸發重新動畫
        >
          {currentTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${testimonial.generatedProfile.fullName}`}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                type: "spring",
                bounce: 0.3
              }}
              className="bg-black border border-gray-800 rounded-xl p-8 hover:shadow-2xl hover:bg-gray-900/50 hover:border-gray-700 transition-all duration-300 relative overflow-hidden group"
              whileHover={{ 
                y: -8,
                boxShadow: "0 10px 25px rgba(251, 191, 36, 0.2)"
              }}
            >
              {/* Category Badge */}
              <div className="absolute top-4 right-4">
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  testimonial.category === 'learning' 
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                    : testimonial.category === 'n8n'
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                    : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                }`}>
                  {testimonial.category === 'learning' 
                    ? (language === 'zh-HK' ? 'AI 學習' : 'AI Learning')
                    : testimonial.category === 'n8n'
                    ? 'n8n'
                    : (language === 'zh-HK' ? '客製化' : 'Custom')
                  }
                </span>
              </div>

              {/* Rating */}
              <div className="mb-6">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <blockquote className="text-gray-300 mb-8 leading-relaxed text-base">
                "{language === 'zh-HK' ? testimonial.content : testimonial.contentEn}"
              </blockquote>

              {/* Author Info - Simplified Design */}
              <div className="border-t border-gray-800 pt-6">
                <div className="text-left">
                  {/* 英文全名 */}
                  <h4 className="font-semibold text-white text-lg mb-2">
                    {testimonial.generatedProfile.fullName}
                  </h4>
                  
                  {/* 職位 */}
                  <p className="text-gray-400 text-sm mb-1">
                    {language === 'zh-HK' 
                      ? testimonial.generatedProfile.title 
                      : testimonial.generatedProfile.titleEn
                    }
                  </p>
                  
                  {/* 公司與固定地點 */}
                  <p className="text-gray-500 text-xs">
                    {language === 'zh-HK' 
                      ? `${testimonial.generatedProfile.company} • 香港`
                      : `${testimonial.generatedProfile.companyEn} • Hong Kong`
                    }
                  </p>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-3 text-gray-400">
              <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
              {language === 'zh-HK' ? '載入新評價中...' : 'Loading new reviews...'}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            {language === 'zh-HK' 
              ? '加入超過 1000+ 滿意客戶的行列' 
              : 'Join 1000+ satisfied clients'
            }
          </p>
          <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold px-8 py-4 rounded-lg hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 shadow-lg hover:shadow-xl">
            {language === 'zh-HK' ? '立即開始您的 AI 之旅' : 'Start Your AI Journey Today'}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

