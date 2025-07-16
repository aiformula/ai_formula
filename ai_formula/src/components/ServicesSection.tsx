
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, BookOpen, Cog } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ServicesSection = () => {
  const { t, language } = useLanguage();

  const services = [
    {
      title: language === 'zh-HK' ? t('services.training.title') : 'Expert-Led AI Training',
      description: language === 'zh-HK' ? t('services.training.description') : 'Comprehensive learning materials designed by industry experts',
      icon: BookOpen,
      benefits: [
        language === 'zh-HK' ? t('services.training.benefit1') : 'Actionable Courses',
        language === 'zh-HK' ? t('services.training.benefit2') : 'Practical Frameworks',
        language === 'zh-HK' ? t('services.training.benefit3') : 'Team Upskilling'
      ],
      buttonText: language === 'zh-HK' ? t('services.training.button') : 'View Courses',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: language === 'zh-HK' ? t('services.automation.title') : 'Bespoke Automation Solutions',
      description: language === 'zh-HK' ? t('services.automation.description') : 'Custom-built automation systems tailored to your business needs',
      icon: Cog,
      benefits: [
        language === 'zh-HK' ? t('services.automation.benefit1') : 'Increase Efficiency',
        language === 'zh-HK' ? t('services.automation.benefit2') : 'Reduce Errors',
        language === 'zh-HK' ? t('services.automation.benefit3') : 'Scale Operations'
      ],
      buttonText: language === 'zh-HK' ? t('services.automation.button') : 'Get Free Consultation',
      gradient: 'from-green-500 to-teal-600'
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
            {language === 'zh-HK' ? t('services.title') : 'Our Services'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {language === 'zh-HK' ? t('services.subtitle') : 'Choose your path to AI mastery and business automation excellence'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-800 rounded-xl p-8 hover:shadow-2xl hover:bg-gray-700 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${service.gradient} mb-6`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
              <p className="text-gray-300 mb-6">{service.description}</p>
              
              <div className="space-y-3 mb-8">
                {service.benefits.map((benefit, benefitIndex) => (
                  <motion.div
                    key={benefitIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.2 + benefitIndex * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200">{benefit}</span>
                  </motion.div>
                ))}
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 text-lg transition-all duration-300"
              >
                {service.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
