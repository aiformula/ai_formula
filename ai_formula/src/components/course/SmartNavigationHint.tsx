import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, MapPin, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SmartNavigationHintProps {
  currentUnit: number;
  totalUnits: number;
  themeId: number;
  isFirstTime?: boolean;
  onDismiss?: () => void;
  language: 'zh-HK' | 'en';
}

const SmartNavigationHint: React.FC<SmartNavigationHintProps> = ({
  currentUnit,
  totalUnits,
  themeId,
  isFirstTime = false,
  onDismiss,
  language
}) => {
  const [isVisible, setIsVisible] = useState(isFirstTime);
  const [hasShown, setHasShown] = useState(false);
  const isZhHK = language === 'zh-HK';

  useEffect(() => {
    const hasSeenHint = localStorage.getItem('nav-hint-seen');
    if (!hasSeenHint && isFirstTime) {
      setIsVisible(true);
      setTimeout(() => {
        setHasShown(true);
      }, 2000);
    }
  }, [isFirstTime]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('nav-hint-seen', 'true');
    onDismiss?.();
  };

  const getHintContent = () => {
    if (currentUnit === 1) {
      return {
        title: isZhHK ? '🎯 開始你的學習之旅' : '🎯 Start Your Learning Journey',
        description: isZhHK ? 
          '使用下方的「下一課」按鈕來繼續學習，或者點擊左上角的麵包屑導航返回課程總覽。' :
          'Use the "Next" button below to continue learning, or click the breadcrumb navigation above to return to course overview.',
        tips: isZhHK ? [
          '💡 每個單元完成後記得點擊「標記完成」',
          '📊 查看右側進度條了解學習進度',
          '📝 使用筆記功能記錄重要內容'
        ] : [
          '💡 Remember to click "Mark Complete" after finishing each unit',
          '📊 Check the progress bar on the right to track your learning',
          '📝 Use the notes feature to record important content'
        ]
      };
    } else if (currentUnit === totalUnits) {
      return {
        title: isZhHK ? '🏆 即將完成主題' : '🏆 Almost Done with Theme',
        description: isZhHK ? 
          '恭喜！你即將完成這個主題。完成後可以進入主題測驗來檢驗學習成果。' :
          'Congratulations! You\'re about to complete this theme. Take the theme quiz to test your knowledge.',
        tips: isZhHK ? [
          '🎯 完成測驗後可以進入下一個主題',
          '📚 隨時可以重新學習任何單元',
          '⭐ 建議測驗前複習重點內容'
        ] : [
          '🎯 Move to the next theme after completing the quiz',
          '📚 You can re-learn any unit anytime',
          '⭐ Review key content before taking the quiz'
        ]
      };
    } else {
      return {
        title: isZhHK ? '📚 繼續學習進度' : '📚 Continue Learning',
        description: isZhHK ? 
          '你正在穩步推進學習進度。保持這個節奏，你很快就能掌握所有內容！' :
          'You\'re making steady progress. Keep up the pace and you\'ll master all the content soon!',
        tips: isZhHK ? [
          `📍 目前位置：主題 ${themeId}，單元 ${currentUnit}`,
          `⏰ 還有 ${totalUnits - currentUnit} 個單元待完成`,
          '🎯 建議每天學習 1-2 個單元'
        ] : [
          `📍 Current: Theme ${themeId}, Unit ${currentUnit}`,
          `⏰ ${totalUnits - currentUnit} more units to go`,
          '🎯 Recommended: 1-2 units per day'
        ]
      };
    }
  };

  const hintContent = getHintContent();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 right-6 max-w-sm bg-gradient-to-br from-blue-900/95 to-purple-900/95 backdrop-blur-lg rounded-2xl border border-blue-500/30 shadow-2xl z-50"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-white text-lg">
                  {hintContent.title}
                </h3>
              </div>
              <Button
                onClick={handleDismiss}
                className="w-8 h-8 p-0 bg-gray-700/50 hover:bg-gray-600/70 rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Description */}
            <p className="text-gray-200 text-sm leading-relaxed mb-4">
              {hintContent.description}
            </p>

            {/* Tips */}
            <div className="space-y-2 mb-4">
              {hintContent.tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-xs leading-relaxed">{tip}</span>
                </motion.div>
              ))}
            </div>

            {/* Progress Indicator */}
            <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">
                  {isZhHK ? '主題進度' : 'Theme Progress'}
                </span>
                <span className="text-xs font-medium text-blue-400">
                  {Math.round((currentUnit / totalUnits) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentUnit / totalUnits) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <Button
                onClick={handleDismiss}
                className="nav-button-secondary text-xs px-3 py-1.5"
              >
                {isZhHK ? '知道了' : 'Got it'}
              </Button>
              <Button
                onClick={handleDismiss}
                className="nav-button-primary text-xs px-3 py-1.5"
              >
                <Target className="w-3 h-3 mr-1" />
                {isZhHK ? '開始學習' : 'Start Learning'}
              </Button>
            </div>
          </div>

          {/* Pulse Animation */}
          {hasShown && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SmartNavigationHint; 