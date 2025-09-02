/**
 * Simplified Testimonial Card Component
 * 簡化版推薦語卡片組件 - 專為Carousel使用
 * @author Senior Frontend Motion & Interaction Designer
 */

import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialData {
  name: string;
  position: string;
  rating: number;
  comment: string;
}

interface TestimonialCardProps {
  testimonial: TestimonialData;
  themeColors: {
    primary: string;
    gradient: string;
    accent: string;
  };
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  testimonial, 
  themeColors
}) => {
  return (
    <div className="relative group h-full">
      {/* 頂部高光邊框 */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${themeColors.gradient} rounded-t-2xl shadow-lg`}></div>
      
      {/* 主卡片容器 */}
      <div className="bg-gradient-to-br from-gray-800/95 via-gray-800 to-gray-900/95 border border-gray-700/70 rounded-2xl hover:shadow-xl hover:border-gray-600/80 transition-all duration-300 overflow-hidden backdrop-blur-sm h-full">
        
        {/* 內容區域 */}
        <div className="p-8 space-y-6 h-full flex flex-col">
          
          {/* 用戶信息區域 */}
          <div className="flex items-start gap-4">
            {/* 圓形頭像 */}
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${themeColors.gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg ring-3 ring-gray-700/50 group-hover:ring-gray-600/70 transition-all duration-300 flex-shrink-0`}>
              {testimonial.name.charAt(0).toUpperCase()}
            </div>
            
            {/* 用戶信息與星級評分 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-xl font-bold text-white tracking-tight mb-1">
                    {testimonial.name}
                  </h4>
                  {/* 職位信息 */}
                  <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
                    </svg>
                    {testimonial.position}
                  </p>
                </div>
              </div>
              
              {/* 星級評分 */}
              <div className="flex items-center gap-1 bg-gray-900/50 px-3 py-1.5 rounded-full w-fit">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 transition-all duration-200 ${
                      i < testimonial.rating 
                        ? `${themeColors.primary} fill-current drop-shadow-sm` 
                        : 'text-gray-600'
                    }`} 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 引言內容區域 - 自動擴展填滿剩餘空間 */}
          <div className="relative flex-1 flex items-center">
            {/* 引號裝飾 */}
            <div className={`absolute -top-2 -left-2 text-5xl ${themeColors.primary} opacity-15 font-serif leading-none select-none`}>
              "
            </div>
            <div className={`absolute -bottom-4 -right-2 text-5xl ${themeColors.primary} opacity-15 font-serif leading-none rotate-180 select-none`}>
              "
            </div>
            
            {/* 引言文字 */}
            <blockquote className="relative z-10 text-gray-100 text-lg leading-relaxed font-medium px-6 text-center">
              {testimonial.comment}
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard; 