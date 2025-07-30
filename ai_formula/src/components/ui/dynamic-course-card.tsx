import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Star, ArrowRight } from 'lucide-react';

interface CourseTag {
  text: string;
  type: 'new' | 'bestseller' | 'featured' | 'hot';
}

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
  themeColor = '#FBBF24', // 預設金色
  onStartCourse,
  className = ''
}) => {
  // 生成動態CSS變量和樣式
  const cardStyle = {
    '--theme-color': themeColor,
    '--theme-color-hover': adjustBrightness(themeColor, -10),
    '--theme-color-light': adjustOpacity(themeColor, 0.1),
    '--theme-color-border': adjustOpacity(themeColor, 0.3),
    '--theme-color-glow': adjustOpacity(themeColor, 0.2),
  } as React.CSSProperties;

  // 標籤類型對應的圖標
  const getTagIcon = (type: string) => {
    switch (type) {
      case 'new': return '✨';
      case 'bestseller': return '🔥';
      case 'featured': return '⭐';
      case 'hot': return '💥';
      default: return '📚';
    }
  };

  // 動態樣式
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    background: '#212121',
    borderRadius: '16px',
    padding: '24px',
    border: `1px solid ${adjustOpacity(themeColor, 0.3)}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
  };

  const tagStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    background: themeColor,
    color: 'white',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: `0 2px 8px ${adjustOpacity(themeColor, 0.2)}`,
  };

  const infoIconStyle: React.CSSProperties = {
    width: '18px',
    height: '18px',
    color: themeColor,
    flexShrink: 0,
    transition: 'color 0.2s ease',
  };

  const infoTextStyle: React.CSSProperties = {
    fontSize: '14px',
    color: themeColor,
    fontWeight: 500,
    transition: 'color 0.2s ease',
  };

  const priceTextStyle: React.CSSProperties = {
    fontWeight: 600,
    color: themeColor,
    transition: 'color 0.2s ease',
    filter: isFree ? 'brightness(1.1)' : 'none',
  };

  const ctaButtonStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '14px 24px',
    background: themeColor,
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: `0 4px 12px ${adjustOpacity(themeColor, 0.2)}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
  };

  return (
    <div style={cardStyle} className={`relative w-full max-w-[320px] mx-auto ${className}`}>
      <motion.div
        style={containerStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: `0 8px 32px ${adjustOpacity(themeColor, 0.2)}`
        }}
      >
        {/* 背景裝飾效果 */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 70% 30%, ${adjustOpacity(themeColor, 0.1)} 0%, transparent 50%)`,
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
          className="hover-bg-effect"
        />
        
        {/* 頂部標籤區域 */}
        {tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {tags.map((tag, index) => (
              <motion.div
                key={index}
                style={tagStyle}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  background: adjustBrightness(themeColor, -10),
                  transform: 'translateY(-1px)',
                  boxShadow: `0 4px 12px ${adjustOpacity(themeColor, 0.2)}`
                }}
              >
                <span style={{ fontSize: '10px' }}>{getTagIcon(tag.type)}</span>
                <span style={{ whiteSpace: 'nowrap' }}>{tag.text}</span>
              </motion.div>
            ))}
          </div>
        )}

        {/* 課程標題區域 */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 700,
            color: 'white',
            lineHeight: 1.3,
            margin: 0,
            background: 'linear-gradient(135deg, white 0%, #f0f0f0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {courseName}
          </h3>
        </div>

        {/* 核心資訊區域 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {/* 時長 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Clock style={infoIconStyle} />
            <span style={infoTextStyle}>{duration}</span>
          </div>

          {/* 適合級別 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <User style={infoIconStyle} />
            <span style={infoTextStyle}>{level}</span>
          </div>

          {/* 用戶評分 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Star style={infoIconStyle} />
            <span style={infoTextStyle}>{rating}/5.0</span>
          </div>

          {/* 價格 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
            <span style={{ fontSize: '16px', color: themeColor }}>💰</span>
            <span style={priceTextStyle}>
              {isFree ? '免費' : `HK$${price}`}
            </span>
          </div>
        </div>

        {/* CTA 按鈕 */}
        <motion.button
          style={ctaButtonStyle}
          onClick={onStartCourse}
          whileHover={{ 
            scale: 1.02,
            background: adjustBrightness(themeColor, -10),
            transform: 'translateY(-2px)',
            boxShadow: `0 8px 24px ${adjustOpacity(themeColor, 0.2)}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span style={{ fontWeight: 600 }}>開始課程</span>
          <motion.div whileHover={{ transform: 'translateX(2px)' }}>
            <ArrowRight style={{ width: '18px', height: '18px' }} />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* 響應式樣式 */}
      <style>{`
        @media (max-width: 768px) {
          .dynamic-course-card .course-title {
            font-size: 18px !important;
          }
        }
        
        .hover-bg-effect:hover {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

// 工具函數：調整顏色亮度
function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// 工具函數：調整顏色透明度
function adjustOpacity(hex: string, opacity: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const R = num >> 16;
  const G = num >> 8 & 0x00FF;
  const B = num & 0x0000FF;
  return `rgba(${R}, ${G}, ${B}, ${opacity})`;
}

export default DynamicCourseCard; 