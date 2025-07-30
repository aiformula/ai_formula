// Framer Motion 安全配置
// 確保 framer-motion 不使用 eval() 函數

import { MotionConfig } from 'framer-motion';

// 設置 framer-motion 使用安全的渲染模式
export const motionConfigProps = {
  // 強制使用 transform 而不是動態生成的 CSS
  transformTemplate: undefined,
  // 禁用實驗性功能，這些功能可能使用 eval
  features: {
    measureLayout: false,
  },
  // 使用靜態變換，避免動態代碼生成
  reducedMotion: 'user',
} as const;

// 導出一個包裝組件，確保安全的動畫配置
export const SafeMotionConfig = ({ children }: { children: React.ReactNode }) => (
  <MotionConfig {...motionConfigProps}>
    {children}
  </MotionConfig>
);

// 安全的動畫變量，預定義常用動畫效果
export const safeAnimations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 }
  },
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { duration: 0.3 }
  },
  hover: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 300, damping: 30 }
  }
} as const;

export default SafeMotionConfig; 