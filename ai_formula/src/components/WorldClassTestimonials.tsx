/**
 * World-Class Testimonials Component
 * 世界級專業用戶推薦語設計
 * 
 * 設計原則：
 * 1. 增加真實感與信任度 - 頭像、職位信息
 * 2. 優化佈局與視覺層次 - 突出引言、引號裝飾
 * 3. 改善互動元素 - 清晰的回覆連結
 * 4. 提升視覺精緻度 - 漸變背景、高光邊框、優化間距
 */

import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialData {
  name: string;
  position: string;
  rating: number;
  comment: string;
  replies: number;
}

interface WorldClassTestimonialsProps {
  instructorTheme: {
    primary: string;
    gradient: string;
    accent: string;
  };
  isZhTW?: boolean;
}

const WorldClassTestimonials: React.FC<WorldClassTestimonialsProps> = ({ 
  instructorTheme, 
  isZhTW = true 
}) => {
  const testimonials: TestimonialData[] = [
    {
      name: "Sarah",
      position: isZhTW ? "數碼行銷經理" : "Digital Marketing Manager",
      rating: 5,
      comment: isZhTW 
        ? "課程講解得好清楚，我依家識得點樣同ChatGPT傾偈喇！之前唔知點問問題，而家學識咗寫prompt嘅技巧。"
        : "The course is so well explained! Now I know how to communicate with ChatGPT properly. I learned prompt writing techniques that I never knew before.",
      replies: 18
    },
    {
      name: "Michael",
      position: isZhTW ? "產品設計師" : "Product Designer",
      rating: 5,
      comment: "Finally understand how to write effective prompts! The course is practical and easy to follow.",
      replies: 12
    },
    {
      name: "Jenny",
      position: isZhTW ? "內容創作者" : "Content Creator",
      rating: 4,
      comment: isZhTW 
        ? "原來ChatGPT可以幫手寫報告！學咗呢個課程之後，我嘅工作效率真係提升咗好多。"
        : "I discovered ChatGPT can help write reports! After taking this course, my work efficiency has really improved a lot.",
      replies: 24
    },
    {
      name: "David",
      position: isZhTW ? "IT顧問" : "IT Consultant",
      rating: 5,
      comment: "Great course for beginners. I learned how to use ChatGPT for content creation and it saves me so much time.",
      replies: 15
    },
    {
      name: "Lisa",
      position: isZhTW ? "市場推廣經理" : "Marketing Manager",
      rating: 4,
      comment: isZhTW 
        ? "上堂之前我都係亂咁問ChatGPT，而家識得點樣設定角色同情境，答案準確咗好多。"
        : "Before the class, I was asking ChatGPT randomly. Now I know how to set roles and contexts, and the answers are much more accurate.",
      replies: 9
    },
    {
      name: "Alex",
      position: "Business Analyst",
      rating: 5,
      comment: "The examples are very practical. Now I can use ChatGPT to help with my daily work tasks.",
      replies: 21
    },
    {
      name: "Kevin",
      position: isZhTW ? "創業家" : "Entrepreneur",
      rating: 4,
      comment: isZhTW 
        ? "好實用嘅課程！學識咗點樣用ChatGPT嚟做market research同competitor analysis。"
        : "Very practical course! I learned how to use ChatGPT for market research and competitor analysis.",
      replies: 7
    },
    {
      name: "Emma",
      position: "Project Manager",
      rating: 5,
      comment: "Love how the instructor explains everything step by step. ChatGPT has become my daily work assistant now!",
      replies: 16
    }
  ];

  const handleViewReplies = (testimonial: TestimonialData, event: React.MouseEvent) => {
    const target = event.currentTarget;
    const cardElement = target.closest('[data-testimonial]') as HTMLElement;
    
    // 檢查是否已經有評論區域
    const existingComment = cardElement?.querySelector('.comment-section');
    if (existingComment) {
      existingComment.remove();
      return;
    }

    // 創建評論區域
    const commentSection = document.createElement('div');
    commentSection.className = 'comment-section mt-8 p-6 bg-gray-800/50 rounded-xl border border-gray-600/50 backdrop-blur-sm animate-in slide-in-from-top duration-300';
    commentSection.innerHTML = `
      <div class="space-y-4">
        <h4 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          ${isZhTW ? '參與討論' : 'Join the Discussion'}
        </h4>
        <textarea 
          placeholder="${isZhTW ? '分享你的想法和經驗...' : 'Share your thoughts and experience...'}" 
          class="w-full p-4 bg-gray-700/70 text-white rounded-lg border border-gray-600 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all resize-none placeholder-gray-400" 
          rows="4"
        ></textarea>
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-4">
            <span class="text-gray-400 text-sm">${isZhTW ? '最多 500 字' : 'Max 500 characters'}</span>
            <div class="flex items-center gap-2 text-sm text-gray-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span>${testimonial.replies} ${isZhTW ? '人已回覆' : 'replies'}</span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button class="px-4 py-2 text-gray-400 hover:text-white transition-colors" onclick="this.closest('.comment-section').remove()">
              ${isZhTW ? '取消' : 'Cancel'}
            </button>
            <button class="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-medium shadow-lg hover:shadow-green-500/25">
              ${isZhTW ? '發布評論' : 'Post Comment'}
            </button>
          </div>
        </div>
      </div>
    `;
    
    // 添加到卡片底部
    const contentArea = cardElement?.querySelector('.testimonial-content');
    if (contentArea) {
      contentArea.appendChild(commentSection);
    }
  };

  return (
    <div className="mt-20">
      <h2 className="text-4xl font-bold mb-16 text-white text-center">
        {isZhTW ? "🌟 學員心聲" : "🌟 Student Testimonials"}
      </h2>
      
      <div className="grid md:grid-cols-2 gap-10">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            className="relative group animate-in fade-in duration-500"
            data-testimonial={testimonial.name}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* 頂部高光邊框 - 與星級評分顏色一致 */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${instructorTheme.gradient} rounded-t-2xl shadow-lg`}></div>
            
            {/* 主卡片容器 - 細微深色漸變背景 */}
            <div className="bg-gradient-to-br from-gray-800/95 via-gray-800 to-gray-900/95 border border-gray-700/70 rounded-2xl hover:shadow-2xl hover:border-gray-600/80 hover:shadow-green-500/10 transition-all duration-500 overflow-hidden backdrop-blur-sm">
              
              {/* 內容區域 - 增加呼吸感 */}
              <div className="testimonial-content p-10 space-y-8">
                
                {/* 用戶信息區域 */}
                <div className="flex items-start gap-5">
                  {/* 圓形頭像 - 用戶名首字母 */}
                  <div className={`w-18 h-18 rounded-full bg-gradient-to-br ${instructorTheme.gradient} flex items-center justify-center text-white font-bold text-2xl shadow-xl ring-4 ring-gray-700/50 group-hover:ring-gray-600/70 transition-all duration-300`}>
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                  
                  {/* 用戶信息與星級評分 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-green-50 transition-colors">
                          {testimonial.name}
                        </h4>
                        {/* 職位信息 - 增加可信性 */}
                        <p className="text-gray-400 text-base font-medium flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
                          </svg>
                          {testimonial.position}
                        </p>
                      </div>
                      
                      {/* 星級評分 - 更精緻的設計 */}
                      <div className="flex items-center gap-1.5 bg-gray-900/50 px-4 py-2.5 rounded-full group-hover:bg-gray-900/70 transition-all">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 transition-all duration-200 ${
                              i < testimonial.rating 
                                ? `${instructorTheme.primary} fill-current drop-shadow-lg group-hover:scale-110` 
                                : 'text-gray-600'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 引言內容區域 - 視覺焦點 */}
                <div className="relative py-4">
                  {/* 巨大引號圖示作為裝飾 */}
                  <div className={`absolute -top-2 -left-3 text-7xl ${instructorTheme.primary} opacity-15 font-serif leading-none select-none`}>
                    "
                  </div>
                  <div className={`absolute -bottom-6 -right-3 text-7xl ${instructorTheme.primary} opacity-15 font-serif leading-none rotate-180 select-none`}>
                    "
                  </div>
                  
                  {/* 引言文字 - 更大更突出 */}
                  <blockquote className="relative z-10 text-gray-100 text-xl leading-relaxed font-medium px-8 py-4 group-hover:text-green-50 transition-colors">
                    {testimonial.comment}
                  </blockquote>
                </div>

                {/* 底部互動區域 - 次要操作 */}
                <div className="flex justify-end pt-6 border-t border-gray-700/50">
                  <button 
                    onClick={(e) => handleViewReplies(testimonial, e)}
                    className={`${instructorTheme.accent} hover:bg-gray-700/70 transition-all duration-300 text-sm font-medium group/btn flex items-center gap-2 px-4 py-2.5 rounded-lg hover:shadow-lg`}
                  >
                    <span>
                      {isZhTW ? `查看 ${testimonial.replies} 則回覆` : `View ${testimonial.replies} replies`}
                    </span>
                    <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* 輕微光暈效果 */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${instructorTheme.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10 blur-xl`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldClassTestimonials; 