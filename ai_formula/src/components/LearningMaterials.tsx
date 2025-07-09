
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LearningMaterials = () => {
  const { t, language } = useLanguage();

  const materials = [
    {
      title: language === 'zh-TW' ? t('learning.course1.title') : 'Introduction to n8n for Marketers',
      description: language === 'zh-TW' ? t('learning.course1.description') : 'Learn how to automate your marketing workflows with n8n\'s powerful visual interface',
      duration: language === 'zh-TW' ? `8 ${t('learning.duration.hours')}` : '8 hours',
      students: 1250,
      rating: 4.8,
      level: language === 'zh-TW' ? t('learning.beginner') : 'Beginner',
      category: language === 'zh-TW' ? t('learning.marketing') : 'Marketing',
      gradient: 'from-yellow-500 to-orange-600',
      progress: 65
    },
    {
      title: language === 'zh-TW' ? t('learning.course2.title') : 'Advanced Python Automation',
      description: language === 'zh-TW' ? t('learning.course2.description') : 'Master Python scripting for complex business process automation',
      duration: language === 'zh-TW' ? `12 ${t('learning.duration.hours')}` : '12 hours',
      students: 890,
      rating: 4.9,
      level: language === 'zh-TW' ? t('learning.advanced') : 'Advanced',
      category: language === 'zh-TW' ? t('learning.development') : 'Development',
      gradient: 'from-blue-500 to-purple-600',
      progress: 45
    },
    {
      title: language === 'zh-TW' ? t('learning.course3.title') : 'AI Integration Masterclass',
      description: language === 'zh-TW' ? t('learning.course3.description') : 'Integrate AI capabilities into your existing business workflows',
      duration: language === 'zh-TW' ? `10 ${t('learning.duration.hours')}` : '10 hours',
      students: 1450,
      rating: 4.7,
      level: language === 'zh-TW' ? t('learning.intermediate') : 'Intermediate',
      category: language === 'zh-TW' ? t('learning.ai') : 'AI',
      gradient: 'from-green-500 to-teal-600',
      progress: 80
    },
    {
      title: language === 'zh-TW' ? t('learning.course4.title') : 'Zapier to Make Migration',
      description: language === 'zh-TW' ? t('learning.course4.description') : 'Seamlessly transition from Zapier to Make for enhanced automation capabilities',
      duration: language === 'zh-TW' ? `6 ${t('learning.duration.hours')}` : '6 hours',
      students: 750,
      rating: 4.6,
      level: language === 'zh-TW' ? t('learning.intermediate') : 'Intermediate',
      category: language === 'zh-TW' ? t('learning.migration') : 'Migration',
      gradient: 'from-purple-500 to-pink-600',
      progress: 30
    }
  ];

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {language === 'zh-TW' ? t('learning.title') : 'Featured Learning Materials'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {language === 'zh-TW' ? t('learning.subtitle') : 'Expert-crafted courses designed to accelerate your AI and automation journey'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {materials.map((material, index) => (
            <motion.div
              key={material.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-900 rounded-xl overflow-hidden hover:shadow-2xl hover:bg-gray-700 transition-all duration-300"
            >
              <div className={`h-48 bg-gradient-to-br ${material.gradient} relative flex items-center justify-center`}>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30">
                    {material.level}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                    {material.category}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-sm text-gray-300">{material.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-white">{material.title}</h3>
                <p className="text-gray-300 mb-4">{material.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{material.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{material.students.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-yellow-500">{material.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${material.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-2 transition-all duration-300"
                >
                  {language === 'zh-TW' ? t('learning.startLearning') : 'Start Learning'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Program */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-8 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              {language === 'zh-TW' ? t('learning.program.title') : 'Complete AI Mastery Program'}
            </h3>
            <p className="text-lg text-white/90 mb-6">
              {language === 'zh-TW' ? t('learning.program.description') : 'Master all aspects of AI and automation with our comprehensive program designed for professionals'}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Badge className="bg-white/20 text-white border-white/30">
                {language === 'zh-TW' ? t('learning.program.hours') : '50+ Hours'}
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                {language === 'zh-TW' ? t('learning.program.certificate') : 'Certificate'}
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                {language === 'zh-TW' ? t('learning.program.access') : 'Lifetime Access'}
              </Badge>
            </div>
            <Button 
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-4 text-lg transition-all duration-300"
            >
              {language === 'zh-TW' ? t('learning.program.button') : 'Explore Full Program'}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LearningMaterials;
