import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Star, Award, BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const InstructorSection = () => {
  const { t, language } = useLanguage();

  const instructors = [
    {
      name: language === 'zh-HK' ? t('instructors.sarah.name') : 'Kenneth',
      title: language === 'zh-HK' ? t('instructors.sarah.title') : 'AI Marketing Developer & Automation Specialist',
      specialty: language === 'zh-HK' ? t('instructors.sarah.specialty') : 'AI Tools & Marketing Automation',
      experience: language === 'zh-HK' ? t('instructors.sarah.experience') : '4+ years',
      biography: language === 'zh-HK' ? t('instructors.sarah.biography') : 'Kenneth is a pioneering AI marketing developer who specializes in cutting-edge AI tools, automation systems, and strategic implementation. Over 4 years of intensive AI learning, he has mastered the art of transforming traditional marketing approaches through artificial intelligence and automation technologies.',
      philosophy: language === 'zh-HK' ? t('instructors.sarah.philosophy') : 'AI is fundamentally transforming how we live and work. The future belongs to those who embrace AI today. I help individuals and businesses get ahead of the curve by mastering AI tools and automation before the masses catch up. Now is the perfect time to gain that competitive advantage.',
      qualifications: [
        language === 'zh-HK' ? t('instructors.sarah.qual1') : 'AI Marketing Automation Expert',
        language === 'zh-HK' ? t('instructors.sarah.qual2') : 'Advanced AI Tools Implementation',
        language === 'zh-HK' ? t('instructors.sarah.qual3') : 'Strategic AI Business Integration',
        language === 'zh-HK' ? t('instructors.sarah.qual4') : 'Future-Ready Marketing Systems'
      ],
      avatar: '👨‍💼',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      name: language === 'zh-HK' ? t('instructors.david.name') : 'David',
      title: language === 'zh-HK' ? t('instructors.david.title') : 'Business Automation & AI Integration Specialist',
      specialty: language === 'zh-HK' ? t('instructors.david.specialty') : 'Automation & AI Solutions',
      experience: language === 'zh-HK' ? t('instructors.david.experience') : '7+ years',
      biography: language === 'zh-HK' ? t('instructors.david.biography') : 'David is a business automation expert who has spent 7+ years helping companies eliminate overwork and streamline operations. He specializes in creating powerful automation workflows using Make.com, n8n, and AI tools.',
      philosophy: language === 'zh-HK' ? t('instructors.david.philosophy') : 'Automation should solve real business problems and reduce overwork. I help businesses implement all-in-one AI solutions that transform operations.',
      qualifications: [
        language === 'zh-HK' ? t('instructors.david.qual1') : 'Make.com & n8n Automation Expert',
        language === 'zh-HK' ? t('instructors.david.qual2') : 'Business Process Optimization',
        language === 'zh-HK' ? t('instructors.david.qual3') : 'AI-Powered Content Management',
        language === 'zh-HK' ? t('instructors.david.qual4') : 'All-in-One Business Solutions'
      ],
      avatar: '🤖',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      name: language === 'zh-HK' ? t('instructors.emily.name') : 'Ken',
      title: language === 'zh-HK' ? t('instructors.emily.title') : 'Custom Business Developer & AI Automation Specialist',
      specialty: language === 'zh-HK' ? t('instructors.emily.specialty') : 'Custom Coding & AI Automation',
      experience: language === 'zh-HK' ? t('instructors.emily.experience') : '5+ years',
      biography: language === 'zh-HK' ? t('instructors.emily.biography') : 'Ken is a skilled custom business developer with 5+ years of coding experience, specializing in creating tailored business solutions and AI automation systems. He builds custom applications that help businesses work faster and run more efficiently through intelligent automation.',
      philosophy: language === 'zh-HK' ? t('instructors.emily.philosophy') : 'Code should make work faster and businesses run smoother. I create custom solutions that integrate AI automation to eliminate bottlenecks and accelerate business processes. Every line of code should serve a purpose: making work faster and more efficient.',
      qualifications: [
        language === 'zh-HK' ? t('instructors.emily.qual1') : 'Custom Business Application Development',
        language === 'zh-HK' ? t('instructors.emily.qual2') : 'AI Automation Integration Expert',
        language === 'zh-HK' ? t('instructors.emily.qual3') : 'Performance Optimization Specialist',
        language === 'zh-HK' ? t('instructors.emily.qual4') : 'Rapid Development Solutions'
      ],
      avatar: '💻',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      name: language === 'zh-HK' ? t('instructors.michael.name') : 'Jason',
      title: language === 'zh-HK' ? t('instructors.michael.title') : 'Professional Developer & Custom Automation Specialist',
      specialty: language === 'zh-HK' ? t('instructors.michael.specialty') : 'Coding & Custom Automation',
      experience: language === 'zh-HK' ? t('instructors.michael.experience') : '8+ years',
      biography: language === 'zh-HK' ? t('instructors.michael.biography') : 'Jason is a professional developer with 8+ years of coding experience, specializing in LLM chatbox development, MCP integration, and web applications. For the past 2 years, he has been intensively learning AI to uplevel his coding skills and help companies integrate cutting-edge AI solutions.',
      philosophy: language === 'zh-HK' ? t('instructors.michael.philosophy') : 'No AI, no life! AI can change more than you think. I believe that integrating AI into development work transforms not just how we code, but what we can achieve. Every developer needs to embrace AI to stay relevant and create extraordinary solutions.',
      qualifications: [
        language === 'zh-HK' ? t('instructors.michael.qual1') : 'LLM Chatbox Development Expert',
        language === 'zh-HK' ? t('instructors.michael.qual2') : 'MCP Integration Specialist',
        language === 'zh-HK' ? t('instructors.michael.qual3') : 'Full-Stack Web Development',
        language === 'zh-HK' ? t('instructors.michael.qual4') : 'AI-Enhanced Coding Solutions'
      ],
      avatar: '🧠',
      gradient: 'from-purple-500 to-pink-600'
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
            {language === 'zh-HK' ? t('instructors.title') : 'About the'} <span className="text-yellow-500">{language === 'zh-HK' ? t('instructors.titleHighlight') : 'Instructors'}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            {language === 'zh-HK' ? t('instructors.subtitle') : 'Meet our world-class instructors who combine deep technical expertise with real-world business experience. Learn from industry leaders who have built and scaled AI solutions across marketing and development.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${instructor.gradient} flex items-center justify-center text-2xl`}>
                      {instructor.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{instructor.name}</h3>
                      <p className="text-yellow-500 text-sm mb-2">{instructor.title}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{instructor.specialty}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award className="w-4 h-4" />
                          <span>{instructor.experience} {language === 'zh-HK' ? t('instructors.experience') : 'Experience'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-yellow-500 mb-2">{language === 'zh-HK' ? t('instructors.professionalJourney') : 'Professional Journey'}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{instructor.biography}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-yellow-500 mb-2">{language === 'zh-HK' ? t('instructors.teachingPhilosophy') : 'Teaching Philosophy'}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed italic">"{instructor.philosophy}"</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-yellow-500 mb-3">{language === 'zh-HK' ? t('instructors.keyQualifications') : 'AI Transformation Impact:'}</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {instructor.qualifications.map((qual, qualIndex) => (
                          <div key={qualIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                            <span className="text-gray-300 text-sm">{qual}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white transition-all duration-300"
                    >
                      {language === 'zh-HK' ? t('instructors.viewProfile') : 'View Full Profile'}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(InstructorSection); 
