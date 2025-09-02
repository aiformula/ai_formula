import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  videoType?: 'mp4' | 'webm' | 'youtube' | 'vimeo';
  title?: string;
  autoPlay?: boolean;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  videoType = 'mp4',
  title = '視頻播放',
  autoPlay = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(autoPlay);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  // 鍵盤快捷鍵支援
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'm':
        case 'M':
          toggleMute();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

  // 播放/暫停控制
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 靜音控制
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // 全屏控制
  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  // 渲染不同類型的視頻
  const renderVideoContent = () => {
    switch (videoType) {
      case 'youtube':
        const youtubeId = videoUrl.includes('watch?v=') 
          ? videoUrl.split('watch?v=')[1].split('&')[0]
          : videoUrl.split('/').pop();
        return (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${autoPlay ? 1 : 0}&mute=0&controls=1&rel=0`}
            title={title}
            className="w-full h-full rounded-lg"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );

      case 'vimeo':
        const vimeoId = videoUrl.split('/').pop();
        return (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=${autoPlay ? 1 : 0}&muted=0&controls=1`}
            title={title}
            className="w-full h-full rounded-lg"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        );

      case 'mp4':
      case 'webm':
      default:
        return (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full rounded-lg object-cover"
              autoPlay={autoPlay}
              muted={isMuted}
              controls={false}
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onLoadedMetadata={() => {
                if (autoPlay && videoRef.current) {
                  videoRef.current.play();
                }
              }}
            >
              <source src={videoUrl} type={`video/${videoType}`} />
              您的瀏覽器不支持視頻播放。
            </video>
            
            {/* 自訂控制面板 */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={togglePlayPause}
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="text-white hover:bg-white/20"
                >
                  <Maximize className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          onClick={onClose}
        >
          {/* 背景遮罩 */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          
          {/* 視頻容器 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-[90vw] h-[90vh] max-w-6xl max-h-[80vh] bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 關閉按鈕 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>
            
            {/* 標題 */}
            <div className="absolute top-4 left-4 z-10">
              <h3 className="text-white text-lg font-semibold bg-black/50 px-3 py-1 rounded-lg backdrop-blur-sm">
                {title}
              </h3>
            </div>
            
            {/* 視頻內容 */}
            <div className="w-full h-full">
              {renderVideoContent()}
            </div>
          </motion.div>
          
          {/* 快捷鍵提示 */}
          <div className="absolute bottom-6 left-6 text-white/70 text-sm bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
            <div>快捷鍵：ESC(關閉) | 空格(播放/暫停) | M(靜音) | F(全屏)</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal; 