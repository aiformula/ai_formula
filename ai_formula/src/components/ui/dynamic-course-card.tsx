import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Star } from 'lucide-react';
import { ArrowRight, Play } from 'lucide-react';

// 課程標籤介面
interface CourseTag {
  text: string;
  type: 'new' | 'bestseller' | 'featured' | 'hot';
}

// 課程卡片 Props 介面
interface CourseCardProps {
  courseName: string;
  duration: string;
  level: string;
  rating: number;
  price: string | number;
  isFree?: boolean;
  tags?: CourseTag[];
  themeColor?: string;
  onStartCourse?: () => void;
  className?: string;
}

const DynamicCourseCard: React.FC<CourseCardProps> = ({
  courseName,
  duration,
  level,
  rating,
  price,
  isFree = false,
  tags = [],
  themeColor = '#FBBF24',
  onStartCourse,
  className = ''
}) => {
  // 標籤類型對應的顏色和圖標
  const getTagStyle = (type: string) => {
    switch (type) {
      case 'new':
        return { bg: 'bg-green-500', text: 'text-white', icon: '✨' };
      case 'bestseller':
        return { bg: 'bg-red-500', text: 'text-white', icon: '🔥' };
      case 'featured':
        return { bg: 'bg-orange-500', text: 'text-white', icon: '⭐' };
      case 'hot':
        return { bg: 'bg-red-500', text: 'text-white', icon: '🔥' };
      default:
        return { bg: 'bg-blue-500', text: 'text-white', icon: '📚' };
    }
  };

  // 包含內容列表
  const includesList = [
    '6 個綜合模組',
    '高效 Prompt 實戰手冊',
    'AI 工具整合指南',
    '+4 更多項目'
  ];

  return (
    <div className={`relative w-full max-w-[320px] mx-auto ${className}`}>
      <motion.div
        className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden h-full hover:border-blue-500 transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)'
        }}
      >
        {/* 卡片頭部 */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            {/* 課程圖標 */}
            <div className="text-4xl" role="img" aria-label="Course icon">
              💬
            </div>
            
            {/* 頂部標籤 - 水平排列 */}
            <div className="flex flex-col gap-2">
              {tags.map((tag, index) => {
                const tagStyle = getTagStyle(tag.type);
                return (
                  <motion.div
                    key={index}
                    className={`${tagStyle.bg} ${tagStyle.text} px-2 py-1 rounded text-xs font-medium flex items-center gap-1`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <span style={{ fontSize: '10px' }}>{tagStyle.icon}</span>
                    <span>{tag.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* 課程標題 */}
          <h3 className="text-xl font-bold text-white mb-2 leading-tight">
            {courseName}
          </h3>
          
          {/* 課程描述 */}
          <p className="text-gray-200 text-sm mb-4">
            掌握 ChatGPT 的完整應用，從日常辦公到創意專案，全面提升您的數位能力。
          </p>
        </div>

        {/* 卡片內容 */}
        <div className="px-6 pb-6">
          <div className="space-y-4">
            {/* 核心資訊區域 */}
            <div className="flex items-center justify-between text-sm text-gray-200">
              <div className="flex items-center gap-4">
                {/* 時長 */}
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-gray-300" fill="currentColor" />
                  <span>{duration}</span>
                </div>
                
                {/* 學員人數 */}
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-gray-300" fill="currentColor" />
                  <span>30 學員</span>
                </div>
              </div>
              
              {/* 評分 */}
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-white">{rating}</span>
              </div>
            </div>

            {/* 課程包含內容 */}
            <div>
              <h4 className="font-semibold mb-2 text-white">
                課程包含：
              </h4>
              <ul className="text-sm text-gray-200 space-y-1">
                {includesList.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Play className="h-3 w-3 text-blue-400" fill="currentColor" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 底部價格與按鈕區域 */}
            <div className="pt-4">
              {/* 價格顯示 */}
              <div className="mb-4">
                {isFree ? (
                  <div className="text-white text-sm">免費</div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold text-white">
                      HK${price}
                    </div>
                  </div>
                )}
              </div>
              
              {/* 立即報名按鈕 - 橫跨整個寬度 */}
              <motion.button
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                onClick={onStartCourse}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                立即報名
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DynamicCourseCard; 