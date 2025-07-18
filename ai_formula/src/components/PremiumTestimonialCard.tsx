/**
 * Premium Testimonial Card Component
 * 世界級專業用戶推薦語卡片設計
 * @author World-Class UI Designer
 */

import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

interface TestimonialData {
  name: string;
  position: string;
  rating: number;
  comment: string;
  replies: number;
}

interface PremiumTestimonialCardProps {
  testimonial: TestimonialData;
  themeColors: {
    primary: string;
    gradient: string;
    accent: string;
  };
  isZhTW?: boolean;
}

const PremiumTestimonialCard: React.FC<PremiumTestimonialCardProps> = ({ 
  testimonial, 
  themeColors,
  isZhTW = true 
}) => {
  const handleViewReplies = () => {
    // 創建評論區域
    const commentSection = document.createElement('div');
    commentSection.className = 'comment-section mt-8 p-6 bg-gray-800/50 rounded-xl border border-gray-600/50 backdrop-blur-sm';
    commentSection.innerHTML = `
      <div class="space-y-4">
        <h4 class="text-lg font-semibold text-white mb-4">${isZhTW ? '參與討論' : 'Join the Discussion'}</h4>
        <textarea 
          placeholder="${isZhTW ? '分享你的想法和經驗...' : 'Share your thoughts and experience...'}" 
          class="w-full p-4 bg-gray-700/70 text-white rounded-lg border border-gray-600 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all resize-none" 
          rows="4"
        ></textarea>
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-4">
            <span class="text-gray-400 text-sm">${isZhTW ? '最多 500 字' : 'Max 500 characters'}</span>
            <div class="flex items-center gap-2 text-sm text-gray-400">
              <span>👥 ${testimonial.replies} ${isZhTW ? '人已回覆' : 'replies'}</span>
            </div>
          </div>
          <button class="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-medium shadow-lg">
            ${isZhTW ? '發布評論' : 'Post Comment'}
          </button>
        </div>
      </div>
    `;
    
    // 避免重複添加
    const existingSection = document.querySelector('.comment-section');
    if (!existingSection) {
      const cardElement = document.querySelector(`[data-testimonial="${testimonial.name}"]`);
      if (cardElement) {
        cardElement.appendChild(commentSection);
      }
    }
  };

  return (
    <div 
      className="relative group animate-in fade-in duration-500"
      data-testimonial={testimonial.name}
    >
      {/* 頂部高光邊框 - 與星級評分顏色一致 */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${themeColors.gradient} rounded-t-2xl shadow-lg`}></div>
      
      {/* 主卡片容器 - 細微深色漸變背景 */}
      <div className="bg-gradient-to-br from-gray-800/95 via-gray-800 to-gray-900/95 border border-gray-700/70 rounded-2xl hover:shadow-2xl hover:border-gray-600/80 hover:shadow-green-500/10 transition-all duration-500 overflow-hidden backdrop-blur-sm">
        {/* 內容區域 - 增加呼吸感 */}
        <div className="p-10 space-y-8">
          
          {/* 用戶信息區域 */}
          <div className="flex items-start gap-5">
            {/* 圓形頭像 - 用戶名首字母 */}
            <div className={`w-18 h-18 rounded-full bg-gradient-to-br ${themeColors.gradient} flex items-center justify-center text-white font-bold text-2xl shadow-xl ring-4 ring-gray-700/50`}>
              {testimonial.name.charAt(0).toUpperCase()}
            </div>
            
            {/* 用戶信息與星級評分 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-white tracking-tight mb-1">
                    {testimonial.name}
                  </h4>
                  {/* 職位信息 - 增加可信性 */}
                  <p className="text-gray-400 text-base font-medium">
                    {testimonial.position}
                  </p>
                </div>
                
                {/* 星級評分 - 更精緻的設計 */}
                <div className="flex items-center gap-1.5 bg-gray-900/50 px-3 py-2 rounded-full">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 transition-all duration-200 ${
                        i < testimonial.rating 
                          ? `${themeColors.primary} fill-current drop-shadow-lg` 
                          : 'text-gray-600'
                      }`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 引言內容區域 - 視覺焦點 */}
          <div className="relative">
            {/* 巨大引號圖示作為裝飾 */}
            <div className={`absolute -top-4 -left-3 text-7xl ${themeColors.primary} opacity-15 font-serif leading-none select-none`}>
              "
            </div>
            <div className={`absolute -bottom-8 -right-3 text-7xl ${themeColors.primary} opacity-15 font-serif leading-none rotate-180 select-none`}>
              "
            </div>
            
            {/* 引言文字 - 更大更突出 */}
            <blockquote className="relative z-10 text-gray-100 text-xl leading-relaxed font-medium px-8 py-4">
              {testimonial.comment}
            </blockquote>
          </div>

          {/* 底部互動區域 - 次要操作 */}
          <div className="flex justify-end pt-4 border-t border-gray-700/50">
            <button 
              onClick={handleViewReplies}
              className={`${themeColors.accent} hover:bg-gray-700/70 transition-all duration-300 text-sm font-medium group flex items-center gap-2 px-4 py-2 rounded-lg`}
            >
              <span>
                {isZhTW ? `查看 ${testimonial.replies} 則回覆` : `View ${testimonial.replies} replies`}
              </span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
      
      {/* 輕微光暈效果 */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${themeColors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10 blur-xl`}></div>
    </div>
  );
};

export default PremiumTestimonialCard; 