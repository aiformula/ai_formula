import React from 'react';
import { motion } from 'framer-motion';
import DynamicCourseCard from '@/components/ui/dynamic-course-card';
import Navigation from '@/components/Navigation';

const DynamicCourseCardDemo: React.FC = () => {
  // 不同課程的示例數據
  const coursesData = [
    {
      courseName: 'ChatGPT 完整教學實戰',
      duration: '4.5 小時',
      level: '適合所有級別',
      rating: 4.9,
      price: 0,
      isFree: true,
      themeColor: '#10a37f', // ChatGPT 綠色
      tags: [
        { text: '新品', type: 'new' as const },
        { text: '熱門', type: 'hot' as const }
      ]
    },
    {
      courseName: 'Midjourney AI 繪圖大師',
      duration: '6.2 小時',
      level: '中級',
      rating: 4.8,
      price: 899,
      isFree: false,
      themeColor: '#8A2BE2', // 紫色
      tags: [
        { text: '暢銷', type: 'bestseller' as const },
        { text: '精選', type: 'featured' as const }
      ]
    },
    {
      courseName: 'Claude AI 應用實戰',
      duration: '3.8 小時',
      level: '初級',
      rating: 4.7,
      price: 599,
      isFree: false,
      themeColor: '#FF6B35', // 橙色
      tags: [
        { text: '新品', type: 'new' as const }
      ]
    },
    {
      courseName: 'AI 商業自動化專精',
      duration: '8.0 小時',
      level: '高級',
      rating: 4.9,
      price: 1299,
      isFree: false,
      themeColor: '#0066CC', // 藍色
      tags: [
        { text: '精選', type: 'featured' as const },
        { text: '暢銷', type: 'bestseller' as const }
      ]
    },
    {
      courseName: 'Stable Diffusion 圖像生成',
      duration: '5.5 小時',
      level: '中級',
      rating: 4.6,
      price: 0,
      isFree: true,
      themeColor: '#E91E63', // 粉紅色
      tags: [
        { text: '熱門', type: 'hot' as const }
      ]
    },
    {
      courseName: 'AI 寫作與內容創作',
      duration: '4.0 小時',
      level: '適合所有級別',
      rating: 4.8,
      price: 699,
      isFree: false,
      themeColor: '#FBBF24', // 預設金色
      tags: [
        { text: '新品', type: 'new' as const },
        { text: '精選', type: 'featured' as const }
      ]
    }
  ];

  const handleStartCourse = (courseName: string) => {
    console.log(`開始課程: ${courseName}`);
    // 這裡可以添加實際的導航邏輯
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* 頁面內容 */}
      <div className="page-content py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* 頁面標題 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
              動態課程卡片展示
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              每個課程都有獨特的品牌顏色，展示個性化的視覺體驗
            </p>
          </motion.div>

          {/* 顏色說明 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 bg-gray-900/50 rounded-2xl p-8 border border-gray-700"
          >
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">設計特色</h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h3 className="font-semibold mb-2 text-white">🎨 動態主題顏色</h3>
                <p>每個課程卡片都會根據傳入的 <code className="bg-gray-800 px-2 py-1 rounded text-yellow-400">themeColor</code> 自動調整按鈕和標籤的顏色</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-white">✨ 互動動畫效果</h3>
                <p>懸浮時會顯示主題色的光暈效果，並有流暢的過渡動畫</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-white">📱 響應式設計</h3>
                <p>在不同螢幕尺寸下都能保持完美的顯示效果</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-white">🎯 品牌一致性</h3>
                <p>深色背景配合動態主題色，展現專業且現代的視覺風格</p>
              </div>
            </div>
          </motion.div>

          {/* 課程卡片網格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesData.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
              >
                <DynamicCourseCard
                  courseName={course.courseName}
                  duration={course.duration}
                  level={course.level}
                  rating={course.rating}
                  price={course.price}
                  isFree={course.isFree}
                  themeColor={course.themeColor}
                  tags={course.tags}
                  onStartCourse={() => handleStartCourse(course.courseName)}
                />
              </motion.div>
            ))}
          </div>

          {/* 代碼示例 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 bg-gray-900/50 rounded-2xl p-8 border border-gray-700"
          >
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">使用範例</h2>
            <div className="bg-gray-800 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-gray-300">
{`// ChatGPT 課程 - 綠色主題
<DynamicCourseCard
  courseName="ChatGPT 完整教學實戰"
  duration="4.5 小時"
  level="適合所有級別"
  rating={4.9}
  price={0}
  isFree={true}
  themeColor="#10a37f"  // ChatGPT 品牌綠色
  tags={[
    { text: '新品', type: 'new' },
    { text: '熱門', type: 'hot' }
  ]}
  onStartCourse={() => console.log('開始課程')}
/>

// Midjourney 課程 - 紫色主題
<DynamicCourseCard
  courseName="Midjourney AI 繪圖大師"
  duration="6.2 小時"
  level="中級"
  rating={4.8}
  price={899}
  themeColor="#8A2BE2"  // 紫色主題
  tags={[
    { text: '暢銷', type: 'bestseller' },
    { text: '精選', type: 'featured' }
  ]}
/>`}
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DynamicCourseCardDemo; 