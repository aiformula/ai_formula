import React from 'react';
import { motion } from 'framer-motion';
import DynamicCourseCard from '@/components/ui/dynamic-course-card';

interface CourseData {
  id: string;
  title: string;
  rating: string;
  level: string;
  duration: string;
  price: string;
  themeColor: string;
}

const CourseRecommendationSection: React.FC = () => {
  // AI 課程數據源
  const aiCourses: CourseData[] = [
    {
      id: 'chatgpt-01',
      title: 'ChatGPT 完整教學實戰',
      rating: '4.9/5',
      level: '適合所有級別',
      duration: '4 hours comprehensive training 小時',
      price: '免費',
      themeColor: '#10a37f' // ChatGPT 綠色
    },
    {
      id: 'midjourney-01',
      title: 'Midjourney AI 繪圖精通',
      rating: '4.8/5',
      level: '適合初學者',
      duration: '6 hours comprehensive training 小時',
      price: '付費',
      themeColor: '#8A2BE2' // Midjourney 紫色
    },
    {
      id: 'claude-01',
      title: 'Claude 3 API 應用開發',
      rating: '4.9/5',
      level: '適合開發者',
      duration: '8 hours comprehensive training 小時',
      price: '免費',
      themeColor: '#FF6B35' // Claude 橙色
    }
  ];

  const handleStartCourse = (courseName: string) => {
    console.log(`開始課程: ${courseName}`);
    // 這裡可以添加實際的導航邏輯
    // 例如：navigate(`/courses/${courseId}`)
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 區塊標題 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
            AI 課程推薦
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            精選熱門 AI 課程，從基礎到進階，助您掌握最前沿的人工智能技術
          </p>
        </motion.div>
        
        {/* 課程卡片容器 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {aiCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <DynamicCourseCard
                courseName={course.title}
                duration={course.duration}
                level={course.level}
                rating={parseFloat(course.rating)}
                price={course.price === '免費' ? 0 : 899}
                isFree={course.price === '免費'}
                themeColor={course.themeColor}
                tags={[
                  { 
                    text: course.price === '免費' ? '免費' : '精選', 
                    type: course.price === '免費' ? 'new' : 'featured' 
                  },
                  { text: '熱門', type: 'hot' }
                ]}
                onStartCourse={() => handleStartCourse(course.title)}
                className="mx-auto"
              />
            </motion.div>
          ))}
        </div>

        {/* 查看更多課程按鈕 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button 
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={() => {
              console.log('導航到課程列表頁面');
              // 這裡可以添加導航邏輯，例如：navigate('/courses')
            }}
          >
            查看所有課程
            <svg 
              className="ml-2 w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CourseRecommendationSection; 