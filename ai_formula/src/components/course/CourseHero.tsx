import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTextGradient } from '@/styles/gradients';

interface CourseHeroProps {
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: string;
}

const CourseHero: React.FC<CourseHeroProps> = ({ title, description, estimatedTime, difficulty }) => {
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12"
    >
      <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${getTextGradient('heroText')}`}>
        {title}
      </h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
        <span className="px-4 py-2 bg-blue-500/20 text-blue-200 rounded-full">
          {isZhTW ? '?êË??ÇÈ?' : 'Estimated Time'}: {estimatedTime}
        </span>
        <span className="px-4 py-2 bg-purple-500/20 text-purple-200 rounded-full">
          {isZhTW ? '??∫¶' : 'Difficulty'}: {difficulty}
        </span>
      </div>
    </motion.section>
  );
};

export default React.memo(CourseHero); 
