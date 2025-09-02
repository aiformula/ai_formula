
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const AutomationJourney = () => {
  const { t, language } = useLanguage();

  const journeySteps = [
    {
      number: '01',
      title: language === 'zh-HK' ? t('journey.step1.title') : 'Discovery Call',
      description: language === 'zh-HK' ? t('journey.step1.description') : 'We understand your needs and identify automation opportunities',
      icon: '🔍'
    },
    {
      number: '02',
      title: language === 'zh-HK' ? t('journey.step2.title') : 'Strategy & Design',
      description: language === 'zh-HK' ? t('journey.step2.description') : 'Create a detailed blueprint tailored to your business processes',
      icon: '📋'
    },
    {
      number: '03',
      title: language === 'zh-HK' ? t('journey.step3.title') : 'Build & Integrate',
      description: language === 'zh-HK' ? t('journey.step3.description') : 'Develop and seamlessly integrate your custom automation solution',
      icon: '⚙️'
    },
    {
      number: '04',
      title: language === 'zh-HK' ? t('journey.step4.title') : 'Launch & Support',
      description: language === 'zh-HK' ? t('journey.step4.description') : 'Deploy your solution and provide ongoing support and optimization',
      icon: '🚀'
    }
  ];

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.6
      }
    }
  };

  // Card animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        type: "spring" as const,
        bounce: 0.3
      }
    }
  };

  // Circle animation variants
  const circleVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        type: "spring" as const,
        bounce: 0.4
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="py-20" style={{ backgroundColor: '#121212' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full mb-6 border border-yellow-500/30"
          >
            <span className="text-yellow-300 font-medium">
              {language === 'zh-HK' ? '自動化流程' : 'Automation Process'}
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
              {language === 'zh-HK' ? t('journey.title') : 'Your Automation Journey'}
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {language === 'zh-HK' ? t('journey.subtitle') : 'Our proven 4-step process ensures successful automation implementation'}
          </p>
        </motion.div>

        {/* Journey Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400/30 via-orange-400/50 to-yellow-400/30 transform -translate-y-1/2 z-0">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeInOut" }
                }}
                className="group"
              >
                <motion.div
                  className="text-center bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 h-full relative overflow-hidden border border-gray-700/50"
                  style={{
                    transition: "all 0.3s ease-in-out"
                  }}
                  whileHover={{
                    boxShadow: "0 10px 25px rgba(251, 191, 36, 0.2)",
                    borderColor: "rgba(251, 191, 36, 0.3)",
                  }}
                >
                  {/* Subtle Background Gradient Animation */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-3 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, #FBBF24, #F97316, #EAB308)',
                      backgroundSize: '200% 200%',
                      transition: "opacity 0.3s ease-in-out"
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />

                  {/* Main Circle with Gradient */}
                  <motion.div 
                    className="relative mb-8 z-10"
                    variants={circleVariants}
                    whileHover="hover"
                  >
                    <motion.div 
                      className="w-24 h-24 rounded-full flex items-center justify-center mx-auto relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #FBBF24 0%, #F97316 50%, #EAB308 100%)'
                      }}
                      whileHover={{
                        boxShadow: "0 0 20px rgba(251, 191, 36, 0.4)"
                      }}
                    >
                      {/* Animated Background */}
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(45deg, #FFD700, #FFA500, #FF6347, #FFD700)',
                          backgroundSize: '400% 400%'
                        }}
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                      />
                      
                      {/* Icon */}
                      <motion.span 
                        className="text-3xl relative z-10"
                        animate={{ 
                          rotate: [0, 5, 0, -5, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {step.icon}
                      </motion.span>
                      
                      {/* Number Overlay */}
                      <motion.div 
                        className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #FBBF24 0%, #F97316 100%)'
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {step.number}
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  >
                    <h3 className="text-xl font-bold mb-4 text-white group-hover:text-yellow-200 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            className="relative px-10 py-4 text-lg font-semibold text-white rounded-xl overflow-hidden group shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #FBBF24 0%, #F97316 50%, #EAB308 100%)'
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(251, 191, 36, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(45deg, #FFD700, #FFA500, #FF6347, #FBBF24, #FFD700)',
                backgroundSize: '400% 400%'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
            
            <span className="relative z-10 flex items-center gap-3">
              {language === 'zh-HK' ? '立即預約免費諮詢' : 'Book Free Consultation Now'}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AutomationJourney;
