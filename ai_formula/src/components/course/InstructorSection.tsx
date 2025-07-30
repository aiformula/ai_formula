import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Award, BookOpen } from 'lucide-react';
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
    <section 
      className="py-12" 
      style={{ 
        backgroundColor: '#121212',
        padding: 'var(--space-12) 0' // 統一區塊間距
      }}
    >
      <div 
        className="max-w-7xl mx-auto px-6"
        style={{ padding: '0 var(--space-6)' }} // 統一容器內邊距
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: 'var(--space-16)' }} // 統一標題下方間距
        >
          <h2 
            className="font-bold text-white"
            style={{
              fontSize: 'var(--text-6xl)', // 使用統一 H2 字體大小
              fontWeight: 'var(--font-bold)',
              lineHeight: 'var(--leading-tight)',
              marginBottom: 'var(--space-4)'
            }}
          >
            {language === 'zh-HK' ? t('instructors.title') : 'About the'} <span className="text-yellow-500">{language === 'zh-HK' ? t('instructors.titleHighlight') : 'Instructors'}</span>
          </h2>
          <p 
            className="text-gray-300 max-w-4xl mx-auto"
            style={{
              fontSize: 'var(--text-xl)', // 統一副標題字體
              fontWeight: 'var(--font-normal)',
              lineHeight: 'var(--leading-normal)'
            }}
          >
            {language === 'zh-HK' ? t('instructors.subtitle') : 'Meet our world-class instructors who combine deep technical expertise with real-world business experience. Learn from industry leaders who have built and scaled AI solutions across marketing and development.'}
          </p>
        </motion.div>

        {/* 🎯 統一卡片網格系統 */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{ gap: 'var(--space-8)' }} // 統一卡片間距
        >
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* 🎯 統一卡片設計 */}
              <Card 
                className="bg-gray-800 border-gray-700 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden h-full"
                style={{
                  borderRadius: 'var(--radius-lg)', // 統一卡片圓角
                  backgroundColor: 'rgba(31, 41, 55, 1)', // 統一卡片背景
                  border: '1px solid rgba(75, 85, 99, 1)'
                }}
              >
                <CardContent 
                  style={{ 
                    padding: 'var(--card-padding-md)', // 統一卡片內邊距 24px
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-6)' // 統一內部元素間距
                  }}
                >
                  {/* 導師頭像和基本信息 */}
                  <div 
                    className="flex items-start space-x-4"
                    style={{ gap: 'var(--space-4)' }} // 統一頭像和信息間距
                  >
                    <div 
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${instructor.gradient} flex items-center justify-center text-2xl`}
                      style={{
                        width: 'var(--space-16)', // 64px 統一頭像大小
                        height: 'var(--space-16)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--text-2xl)'
                      }}
                    >
                      {instructor.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="text-white font-bold"
                        style={{
                          fontSize: 'var(--text-xl)', // 統一導師姓名字體
                          fontWeight: 'var(--font-bold)',
                          marginBottom: 'var(--space-1)'
                        }}
                      >
                        {instructor.name}
                      </h3>
                      <p 
                        className="text-yellow-500"
                        style={{
                          fontSize: 'var(--text-sm)', // 統一職位字體
                          marginBottom: 'var(--space-2)'
                        }}
                      >
                        {instructor.title}
                      </p>
                      <div 
                        className="flex items-center space-x-4 text-sm text-gray-400"
                        style={{ gap: 'var(--space-4)' }}
                      >
                        <div 
                          className="flex items-center space-x-1"
                          style={{ gap: 'var(--space-1)' }}
                        >
                          <BookOpen 
                            style={{ 
                              width: 'var(--space-4)', 
                              height: 'var(--space-4)' 
                            }} 
                          />
                          <span 
                            style={{ fontSize: 'var(--text-sm)' }}
                          >
                            {instructor.specialty}
                          </span>
                        </div>
                        <div 
                          className="flex items-center space-x-1"
                          style={{ gap: 'var(--space-1)' }}
                        >
                          <Award 
                            style={{ 
                              width: 'var(--space-4)', 
                              height: 'var(--space-4)' 
                            }} 
                          />
                          <span 
                            style={{ fontSize: 'var(--text-sm)' }}
                          >
                            {instructor.experience} {language === 'zh-HK' ? t('instructors.experience') : 'Experience'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 導師信息區塊 - 統一間距 */}
                  <div 
                    className="grid grid-cols-1 gap-6"
                    style={{ gap: 'var(--space-6)' }} // 統一信息區塊間距
                  >
                    <div>
                      <h4 
                        className="font-semibold text-yellow-500"
                        style={{
                          fontSize: 'var(--text-base)', // 統一小標題字體
                          fontWeight: 'var(--font-semibold)',
                          marginBottom: 'var(--space-2)'
                        }}
                      >
                        {language === 'zh-HK' ? t('instructors.professionalJourney') : 'Professional Journey'}
                      </h4>
                      <p 
                        className="text-gray-300 leading-relaxed"
                        style={{
                          fontSize: 'var(--text-sm)',
                          lineHeight: 'var(--leading-relaxed)'
                        }}
                      >
                        {instructor.biography}
                      </p>
                    </div>

                    <div>
                      <h4 
                        className="font-semibold text-yellow-500"
                        style={{
                          fontSize: 'var(--text-base)',
                          fontWeight: 'var(--font-semibold)',
                          marginBottom: 'var(--space-2)'
                        }}
                      >
                        {language === 'zh-HK' ? t('instructors.teachingPhilosophy') : 'Teaching Philosophy'}
                      </h4>
                      <p 
                        className="text-gray-300 italic leading-relaxed"
                        style={{
                          fontSize: 'var(--text-sm)',
                          lineHeight: 'var(--leading-relaxed)'
                        }}
                      >
                        "{instructor.philosophy}"
                      </p>
                    </div>

                    <div>
                      <h4 
                        className="font-semibold text-yellow-500"
                        style={{
                          fontSize: 'var(--text-base)',
                          fontWeight: 'var(--font-semibold)',
                          marginBottom: 'var(--space-3)'
                        }}
                      >
                        {language === 'zh-HK' ? t('instructors.keyQualifications') : 'AI Transformation Impact:'}
                      </h4>
                      <div 
                        className="grid grid-cols-1 gap-2"
                        style={{ gap: 'var(--space-2)' }}
                      >
                        {instructor.qualifications.map((qual, qualIndex) => (
                          <div 
                            key={qualIndex} 
                            className="flex items-center space-x-2"
                            style={{ gap: 'var(--space-2)' }}
                          >
                            <div 
                              className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"
                              style={{
                                width: 'var(--space-2)',
                                height: 'var(--space-2)',
                                borderRadius: 'var(--radius-full)'
                              }}
                            ></div>
                            <span 
                              className="text-gray-300"
                              style={{ fontSize: 'var(--text-sm)' }}
                            >
                              {qual}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
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

export default InstructorSection; 
