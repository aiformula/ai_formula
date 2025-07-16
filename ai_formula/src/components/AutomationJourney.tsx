
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

  return (
    <section className="py-12" style={{ backgroundColor: '#121212' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {language === 'zh-HK' ? t('journey.title') : 'Your Automation Journey'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {language === 'zh-HK' ? t('journey.subtitle') : 'Our proven 4-step process ensures successful automation implementation'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center bg-gray-800 rounded-xl p-6 hover:shadow-2xl hover:bg-gray-700 transition-all duration-300"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{step.number}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutomationJourney;
