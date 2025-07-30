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
  // 生成動態CSS變量
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

  return (
    <motion.div
      style={cardStyle}
      className={`dynamic-course-card ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 8px 32px var(--theme-color-glow)`
      }}
    >
      {/* 卡片主體 */}
      <div className="card-container">
        {/* 背景裝飾效果 */}
        <div className="card-background-effect" />
        
        {/* 頂部標籤區域 */}
        {tags.length > 0 && (
          <div className="tags-container">
            {tags.map((tag, index) => (
              <motion.div
                key={index}
                className="course-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="tag-icon">{getTagIcon(tag.type)}</span>
                <span className="tag-text">{tag.text}</span>
              </motion.div>
            ))}
          </div>
        )}

        {/* 課程標題區域 */}
        <div className="course-title-section">
          <h3 className="course-title">{courseName}</h3>
        </div>

        {/* 核心資訊區域 */}
        <div className="course-info-section">
          {/* 時長 */}
          <div className="info-item">
            <Clock className="info-icon" />
            <span className="info-text">{duration}</span>
          </div>

          {/* 適合級別 */}
          <div className="info-item">
            <User className="info-icon" />
            <span className="info-text">{level}</span>
          </div>

          {/* 用戶評分 */}
          <div className="info-item">
            <Star className="info-icon star-icon" />
            <span className="info-text">{rating}/5.0</span>
          </div>

          {/* 價格 */}
          <div className="info-item price-item">
            <span className="price-icon">💰</span>
            <span className={`price-text ${isFree ? 'free-price' : 'paid-price'}`}>
              {isFree ? '免費' : `HK$${price}`}
            </span>
          </div>
        </div>

        {/* CTA 按鈕 */}
        <motion.button
          className="cta-button"
          onClick={onStartCourse}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="cta-text">開始課程</span>
          <ArrowRight className="cta-icon" />
        </motion.button>
      </div>

      {/* CSS 樣式 */}
      <style jsx>{`
        .dynamic-course-card {
          position: relative;
          width: 100%;
          max-width: 320px;
          margin: 0 auto;
        }

        .card-container {
          position: relative;
          background: #212121;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid var(--theme-color-border);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .card-container:hover {
          box-shadow: 
            0 4px 24px rgba(0, 0, 0, 0.15),
            0 0 0 1px var(--theme-color-border),
            0 0 32px var(--theme-color-glow);
        }

        .card-background-effect {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle at 70% 30%,
            var(--theme-color-light) 0%,
            transparent 50%
          );
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .card-container:hover .card-background-effect {
          opacity: 1;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .course-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: var(--theme-color);
          color: white;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px var(--theme-color-glow);
        }

        .course-tag:hover {
          background: var(--theme-color-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px var(--theme-color-glow);
        }

        .tag-icon {
          font-size: 10px;
        }

        .tag-text {
          white-space: nowrap;
        }

        .course-title-section {
          margin-bottom: 24px;
        }

        .course-title {
          font-size: 20px;
          font-weight: 700;
          color: white;
          line-height: 1.3;
          margin: 0;
          background: linear-gradient(135deg, white 0%, #f0f0f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .course-info-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .info-icon {
          width: 18px;
          height: 18px;
          color: #9CA3AF;
          flex-shrink: 0;
        }

        .star-icon {
          color: #FBBF24;
        }

        .info-text {
          font-size: 14px;
          color: #E5E7EB;
          font-weight: 500;
        }

        .price-item {
          margin-top: 4px;
        }

        .price-icon {
          font-size: 16px;
        }

        .price-text {
          font-weight: 600;
        }

        .free-price {
          color: #10B981;
        }

        .paid-price {
          color: #FBBF24;
        }

        .cta-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 24px;
          background: var(--theme-color);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 4px 12px var(--theme-color-glow),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .cta-button:hover {
          background: var(--theme-color-hover);
          transform: translateY(-2px);
          box-shadow: 
            0 8px 24px var(--theme-color-glow),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .cta-button:active {
          transform: translateY(-1px);
        }

        .cta-text {
          font-weight: 600;
        }

        .cta-icon {
          width: 18px;
          height: 18px;
          transition: transform 0.2s ease;
        }

        .cta-button:hover .cta-icon {
          transform: translateX(2px);
        }

        /* 響應式設計 */
        @media (max-width: 768px) {
          .card-container {
            padding: 20px;
          }
          
          .course-title {
            font-size: 18px;
          }
          
          .tags-container {
            margin-bottom: 16px;
          }
          
          .course-info-section {
            gap: 14px;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </motion.div>
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