/**
 * Professional Testimonial Carousel Component
 * 專業推薦語無限循環跑馬燈組件
 * @author Senior Frontend Motion & Interaction Designer
 */

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from './TestimonialCard';

interface TestimonialData {
  name: string;
  position: string;
  rating: number;
  comment: string;
}

interface TestimonialCarouselProps {
  testimonials: TestimonialData[];
  themeColors: {
    primary: string;
    gradient: string;
    accent: string;
  };
  isZhTW?: boolean;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  themeColors,
  isZhTW = true
}) => {
  // Embla Carousel 配置
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true, // 無限循環
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      // 響應式斷點
      '(min-width: 768px)': { 
        slidesToScroll: 1 // 桌面版每次滑動1張，但同時顯示2張
      }
    }
  });

  // 狀態管理
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(false);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 導航函數
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // 選中的幻燈片索引更新
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  // 初始化和事件監聽
  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // 點示器函數
  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* 標題區域 */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          {isZhTW ? "🌟 學員心聲" : "🌟 Student Testimonials"}
        </h2>
        <p className="text-gray-400 text-lg">
          {isZhTW ? "真實學員分享他們的學習體驗" : "Real students sharing their learning experience"}
        </p>
      </div>

      {/* Carousel 容器 */}
      <div className="relative">
        {/* 主要輪播區域 */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="flex-[0_0_100%] md:flex-[0_0_50%] px-4"
                style={{ minWidth: 0 }}
              >
                <div className="h-full">
                  <TestimonialCard 
                    testimonial={testimonial} 
                    themeColors={themeColors}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 導航按鈕 */}
        <div className="flex items-center justify-between mt-8">
          {/* 上一張按鈕 */}
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className={`group flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${
              prevBtnDisabled 
                ? 'border-gray-700 text-gray-600 cursor-not-allowed' 
                : `border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white ${themeColors.accent}`
            }`}
          >
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">
              {isZhTW ? "上一張" : "Previous"}
            </span>
          </button>

          {/* 點示器 */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? `${themeColors.primary.replace('text-', 'bg-')} shadow-lg`
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* 下一張按鈕 */}
          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className={`group flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${
              nextBtnDisabled 
                ? 'border-gray-700 text-gray-600 cursor-not-allowed' 
                : `border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white ${themeColors.accent}`
            }`}
          >
            <span className="text-sm font-medium">
              {isZhTW ? "下一張" : "Next"}
            </span>
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 進度指示器 */}
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-500">
            {selectedIndex + 1} / {testimonials.length}
          </span>
        </div>
      </div>

      {/* 自動播放提示 */}
      <div className="text-center mt-8">
        <p className="text-gray-500 text-sm">
          {isZhTW ? "💡 提示：可以用滑鼠拖曳或點擊按鈕來瀏覽" : "💡 Tip: Drag with mouse or click buttons to navigate"}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCarousel; 