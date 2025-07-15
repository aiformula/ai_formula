import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  isZhTW: boolean;
}

const CTASection: React.FC<CTASectionProps> = ({ isZhTW }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            {isZhTW ? '立即獲取你的AI學習資源' : 'Get Your AI Learning Resources Now'}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {isZhTW 
              ? '高品質筆記影片，幫助你快速掌握AI技能。立即下載，終身使用。'
              : 'High-quality notes and videos to help you master AI skills quickly. Instant download, lifetime access.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              aria-label={isZhTW ? '查看所有產品' : 'View all products'}
            >
              {isZhTW ? '查看所有產品' : 'View All Products'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
              aria-label={isZhTW ? '聯絡我們' : 'Contact us'}
            >
              {isZhTW ? '聯絡我們' : 'Contact Us'}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(CTASection); 
