import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Testimonials = () => {
  const { t, language } = useLanguage();

  const testimonials = [
    {
      quote: language === 'zh-HK' ? t('testimonials.testimonial1.quote') : 'We got a custom WhatsApp automation system that handles customer inquiries 24/7. No more missed messages and our response time improved dramatically.',
      author: language === 'zh-HK' ? t('testimonials.testimonial1.author') : 'Wong Ka Ming',
      service: language === 'zh-HK' ? t('testimonials.testimonial1.service') : 'Custom Automation Solution',
      company: language === 'zh-HK' ? t('testimonials.testimonial1.company') : 'Local Trading Company',
      rating: 5
    },
    {
      quote: language === 'zh-HK' ? t('testimonials.testimonial2.quote') : 'Their team built us a custom business automation system that connects our inventory, orders, and accounting. Everything runs smoothly now.',
      author: language === 'zh-HK' ? t('testimonials.testimonial2.author') : 'Chan Siu Fung',
      service: language === 'zh-HK' ? t('testimonials.testimonial2.service') : 'Business Automation',
      company: language === 'zh-HK' ? t('testimonials.testimonial2.company') : 'Small Manufacturing Business',
      rating: 5
    },
    {
      quote: language === 'zh-HK' ? t('testimonials.testimonial3.quote') : 'The custom AI chatbot they created for our restaurant handles reservations and orders perfectly. It understands Cantonese and English!',
      author: language === 'zh-HK' ? t('testimonials.testimonial3.author') : 'Lam Mei Ling',
      service: language === 'zh-HK' ? t('testimonials.testimonial3.service') : 'Custom AI Chatbot',
      company: language === 'zh-HK' ? t('testimonials.testimonial3.company') : 'Family Restaurant',
      rating: 5
    }
  ];

  return (
    <section className="py-12 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {language === 'zh-HK' ? t('testimonials.title') : 'What Our Clients Say'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {language === 'zh-HK' ? t('testimonials.subtitle') : 'Real feedback from businesses using our custom AI automation solutions'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-900 rounded-xl p-8 hover:shadow-2xl hover:bg-gray-700 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <Quote className="w-8 h-8 text-yellow-500 mr-3" />
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
              
              <div className="border-t border-gray-700 pt-4">
                <p className="font-semibold text-white">{testimonial.author}</p>
                <p className="text-sm text-yellow-500 mb-1">{testimonial.service}</p>
                <p className="text-sm text-gray-400">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

