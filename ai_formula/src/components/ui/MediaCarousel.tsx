import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Image as ImageIcon, Video, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoModal from '@/components/ui/VideoModal';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  alt?: string;
  caption?: string;
  title?: string;
  thumbnail?: string;
  videoType?: 'mp4' | 'webm' | 'youtube' | 'vimeo';
}

interface MediaCarouselProps {
  mediaItems: MediaItem[];
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showNavigation?: boolean;
  mode?: 'carousel' | 'grid' | 'single';
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({
  mediaItems,
  className = '',
  autoPlay = false,
  autoPlayInterval = 3000,
  showIndicators = true,
  showNavigation = true,
  mode = 'carousel'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // 自動播放功能
  useEffect(() => {
    if (autoPlay && !isHovering && mediaItems.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, isHovering, mediaItems.length]);

  // 音效功能
  const playClickSound = () => {
    try {
      // 創建一個簡單的點擊音效
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      // 靜默處理音效錯誤
      console.log('Audio not supported');
    }
  };

  // 導航函數
  const goToPrevious = () => {
    playClickSound();
    setCurrentIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    playClickSound();
    setCurrentIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // 處理視頻點擊
  const handleVideoClick = (video: MediaItem) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  };

  // 渲染單個媒體項目
  const renderMediaItem = (item: MediaItem, index: number) => {
    const isActive = index === currentIndex;

    if (item.type === 'video') {
      return (
        <div 
          key={index}
          className="relative w-full h-full cursor-pointer group"
          onClick={() => handleVideoClick(item)}
        >
          {/* 視頻縮圖或封面 */}
          <img
            src={item.thumbnail || item.url}
            alt={item.alt || 'Video thumbnail'}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* 播放按鈕覆蓋層 */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-red-600/90 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
            </div>
          </div>
          
          {/* 視頻標識 */}
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
            <Video className="w-3 h-3" />
            VIDEO
          </div>
          
          {/* 視頻標題 */}
          {item.title && (
            <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-xs p-2 rounded backdrop-blur-sm">
              {item.title}
            </div>
          )}
        </div>
      );
    }

    // 圖片項目
    return (
      <div key={index} className="relative w-full h-full">
        <img
          src={item.url}
          alt={item.alt || 'Tool image'}
          className="w-full h-full object-contain p-12 transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        
        {/* 圖片標識 */}
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full font-medium flex items-center gap-1">
          <ImageIcon className="w-2.5 h-2.5" />
          IMAGE
        </div>
        
        {/* 圖片說明 */}
        {/* 移除圖片說明框
        {item.caption && (
          <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-xs p-2 rounded backdrop-blur-sm">
            {item.caption}
          </div>
        )}
        */}
      </div>
    );
  };

  // 如果沒有媒體項目，顯示預設圖片
  if (!mediaItems || mediaItems.length === 0) {
    return (
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        <div className="text-gray-500 text-center">
          <ImageIcon className="w-12 h-12 mx-auto mb-2" />
          <p>No media available</p>
        </div>
      </div>
    );
  }

  // 單個媒體項目模式
  if (mode === 'single' || mediaItems.length === 1) {
    return (
      <div className={`relative w-full h-48 bg-black overflow-hidden ${className}`}>
        {renderMediaItem(mediaItems[0], 0)}
        
        {/* 視頻模態框 */}
        {selectedVideo && (
          <VideoModal
            isOpen={isVideoModalOpen}
            onClose={() => setIsVideoModalOpen(false)}
            videoUrl={selectedVideo.url}
            videoType={selectedVideo.videoType}
            title={selectedVideo.title || 'Video'}
            autoPlay={true}
          />
        )}
      </div>
    );
  }

  // 網格模式
  if (mode === 'grid') {
    return (
      <div className={`relative w-full h-48 bg-black overflow-hidden ${className}`}>
        <div className="grid grid-cols-2 gap-1 h-full">
          {mediaItems.slice(0, 4).map((item, index) => (
            <div key={index} className="relative">
              {renderMediaItem(item, index)}
              {index === 3 && mediaItems.length > 4 && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white font-bold">
                  <MoreHorizontal className="w-6 h-6 mr-1" />
                  +{mediaItems.length - 4}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* 視頻模態框 */}
        {selectedVideo && (
          <VideoModal
            isOpen={isVideoModalOpen}
            onClose={() => setIsVideoModalOpen(false)}
            videoUrl={selectedVideo.url}
            videoType={selectedVideo.videoType}
            title={selectedVideo.title || 'Video'}
            autoPlay={true}
          />
        )}
      </div>
    );
  }

  // 輪播模式
  return (
    <div 
      className={`relative w-full h-80 bg-gradient-to-br from-gray-900/90 to-black/95 rounded-lg overflow-hidden group ${className} media-carousel-container`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* 媒體內容 - 佔據頂部大部分空間，底部留空間給按鈕 */}
      <div className="relative w-full h-64 flex items-center justify-center p-3">
        {mediaItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-3 transition-all duration-500 ease-in-out ${
              index === currentIndex 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-95'
            }`}
          >
            {item.type === 'video' ? (
              <div 
                className="relative w-full h-full bg-black/50 rounded-md cursor-pointer overflow-hidden group/video"
                onClick={() => handleVideoClick(item)}
              >
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.alt || 'Video thumbnail'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <Play className="w-8 h-8 text-white/70" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover/video:scale-110 transition-transform duration-300">
                    <Play className="w-5 h-5 text-gray-800 ml-0.5" />
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={item.url}
                alt={item.alt || 'Tool image'}
                className="w-full h-full object-cover rounded-md transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* 底部專用按鈕區域 - 高度16 (4rem) */}
      <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-center">
        {showNavigation && mediaItems.length > 1 && (
          <div className="flex items-center gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
            {/* 上一頁按鈕 - 黃色漸變 */}
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className={`w-12 h-10 ${
                currentIndex === 0 
                  ? 'bg-gray-600 cursor-not-allowed opacity-60 border-gray-500' 
                  : 'hover:scale-105 border-yellow-400'
              } text-black rounded-lg flex items-center justify-center font-bold text-lg transition-all duration-200 border-2`}
              style={{
                borderRadius: '8px',
                background: currentIndex === 0 
                  ? '#666' 
                  : 'linear-gradient(to bottom, #ffcc00, #ffd700)',
                boxShadow: currentIndex === 0 
                  ? 'none' 
                  : '0 0 5px #ffcc00',
                strokeWidth: '2px',
                animation: currentIndex === 0 ? 'none' : 'button-pulse 2s infinite, fade-in 0.3s ease-out'
              }}
              onMouseEnter={(e) => {
                if (currentIndex !== 0 && e.currentTarget) {
                  e.currentTarget.style.boxShadow = '0 0 10px #ffcc00';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentIndex !== 0 && e.currentTarget) {
                  e.currentTarget.style.boxShadow = '0 0 5px #ffcc00';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
              onMouseDown={(e) => {
                if (currentIndex !== 0 && e.currentTarget) {
                  playClickSound();
                  // 波紋效果
                  const button = e.currentTarget;
                  if (button) {
                    const ripple = document.createElement('span');
                    const rect = button.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                      position: absolute;
                      width: ${size}px;
                      height: ${size}px;
                      left: ${x}px;
                      top: ${y}px;
                      background: rgba(255, 255, 255, 0.6);
                      border-radius: 50%;
                      transform: scale(0);
                      animation: ripple-effect 0.6s linear;
                      pointer-events: none;
                      z-index: 10;
                    `;
                    
                    button.style.position = 'relative';
                    button.style.overflow = 'hidden';
                    button.appendChild(ripple);
                    
                    setTimeout(() => {
                      if (ripple && ripple.parentNode) {
                        ripple.remove();
                      }
                    }, 600);
                  }
                }
              }}
            >
              ←
            </button>
            
            {/* 下一頁按鈕 - 灰色或黃色漸變 */}
            <button
              onClick={goToNext}
              disabled={currentIndex === mediaItems.length - 1}
              className={`w-12 h-10 ${
                currentIndex === mediaItems.length - 1 
                  ? 'bg-gray-600 cursor-not-allowed opacity-60 border-gray-500' 
                  : 'hover:scale-105 border-yellow-400'
              } text-black rounded-lg flex items-center justify-center font-bold text-lg transition-all duration-200 border-2`}
              style={{
                borderRadius: '8px',
                background: currentIndex === mediaItems.length - 1 
                  ? '#666' 
                  : 'linear-gradient(to bottom, #ffcc00, #ffd700)',
                boxShadow: currentIndex === mediaItems.length - 1 
                  ? 'none' 
                  : '0 0 5px #ffcc00',
                strokeWidth: '2px',
                animation: currentIndex === mediaItems.length - 1 ? 'none' : 'button-pulse 2s infinite, fade-in 0.3s ease-out'
              }}
              onMouseEnter={(e) => {
                if (currentIndex !== mediaItems.length - 1 && e.currentTarget) {
                  e.currentTarget.style.boxShadow = '0 0 10px #ffcc00';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentIndex !== mediaItems.length - 1 && e.currentTarget) {
                  e.currentTarget.style.boxShadow = '0 0 5px #ffcc00';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
              onMouseDown={(e) => {
                if (currentIndex !== mediaItems.length - 1 && e.currentTarget) {
                  playClickSound();
                  // 波紋效果
                  const button = e.currentTarget;
                  if (button) {
                    const ripple = document.createElement('span');
                    const rect = button.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                      position: absolute;
                      width: ${size}px;
                      height: ${size}px;
                      left: ${x}px;
                      top: ${y}px;
                      background: rgba(255, 255, 255, 0.6);
                      border-radius: 50%;
                      transform: scale(0);
                      animation: ripple-effect 0.6s linear;
                      pointer-events: none;
                      z-index: 10;
                    `;
                    
                    button.style.position = 'relative';
                    button.style.overflow = 'hidden';
                    button.appendChild(ripple);
                    
                    setTimeout(() => {
                      if (ripple && ripple.parentNode) {
                        ripple.remove();
                      }
                    }, 600);
                  }
                }
              }}
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* 進度指示器 - 保持在右上角 */}
      {mediaItems.length > 1 && (
        <div 
          className="absolute top-3 right-3 w-7 h-7 bg-black border-2 border-yellow-400 text-white rounded-full flex items-center justify-center font-roboto font-medium shadow-lg"
          style={{
            fontSize: '10px',
            lineHeight: '1'
          }}
        >
          {currentIndex + 1}/{mediaItems.length}
        </div>
      )}

      {/* 滑動提示線條動畫 */}
      {showNavigation && mediaItems.length > 1 && (
        <div className="hidden md:block">
          <div 
            className="absolute left-2 top-1/2 w-4 h-0.5 bg-yellow-400/60 opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{
              animation: 'slide-hint-left 1.5s infinite'
            }}
          />
          <div 
            className="absolute right-2 top-1/2 w-4 h-0.5 bg-yellow-400/60 opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{
              animation: 'slide-hint-right 1.5s infinite'
            }}
          />
        </div>
      )}

      {/* 視頻模態框 */}
      {selectedVideo && (
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoUrl={selectedVideo.url}
          videoType={selectedVideo.videoType}
          title={selectedVideo.title || 'Video'}
          autoPlay={true}
        />
      )}
    </div>
  );
};

export default MediaCarousel; 