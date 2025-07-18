/**
 * Animated FAQ Demo Page
 * 動效FAQ組件演示頁面
 */

import React from 'react';
import AnimatedFAQ from './AnimatedFAQ';

const AnimatedFAQDemo: React.FC = () => {
  // 示例FAQ數據
  const sampleFAQData = [
    {
      question: "這個 ChatGPT 課程真的免費嗎？",
      answer: "是的！這是我們為初學者提供的完全免費入門課程，讓您掌握 ChatGPT 的基本使用方法。課程包含完整的學習資料、實戰練習和結業證書，完全沒有隱藏費用。"
    },
    {
      question: "我需要有技術背景嗎？",
      answer: "不需要！本課程專為一般用戶設計，重點在於如何有效使用 ChatGPT 提升工作效率。我們會從最基礎的概念開始教學，即使是完全沒有技術背景的學員也能輕鬆上手。"
    },
    {
      question: "完成課程後我能做什麼？",
      answer: "您將能夠熟練使用 ChatGPT 進行寫作、分析、創意發想等各種任務，大幅提升工作效率。同時也會學會如何撰寫有效的提示詞（Prompts），讓 AI 產出更準確、更實用的回應。"
    },
    {
      question: "課程需要多長時間完成？",
      answer: "整個課程大約需要 4 小時完成，您可以按照自己的步調學習。課程分為多個小單元，每個單元約 15-30 分鐘，非常適合忙碌的上班族利用零碎時間學習。"
    },
    {
      question: "如果我想要更深入的 AI 學習怎麼辦？",
      answer: "我們提供進階的 AI 應用課程和企業顧問服務。完成免費課程後，您可以透過 WhatsApp 聯繫我們了解更多進階課程，包括企業級 AI 應用、自動化工作流程設計等專業服務。"
    },
    {
      question: "課程有中文字幕或教材嗎？",
      answer: "是的！我們的課程完全支援繁體中文，包括影片字幕、教材講義和互動練習都有中文版本。同時也提供英文版本，方便不同語言背景的學員學習。"
    }
  ];

  // 主題顏色配置
  const themeColors = {
    primary: 'text-green-400',
    gradient: 'from-green-600 to-green-800',
    accent: 'text-green-400 border-green-400'
  };

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        {/* 頁面標題 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            🎨 世界級動效FAQ組件
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            體驗頂級UI/UX設計師打造的精緻動畫效果，包含流暢的開合動畫、優雅的載入效果和細膩的互動狀態。
          </p>
        </div>

        {/* 動效FAQ組件展示 */}
        <AnimatedFAQ
          faqData={sampleFAQData}
          themeColors={themeColors}
          isZhTW={true}
        />

        {/* 設計特色說明 */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            ✨ 設計特色
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-green-400 mb-4">🎯 細膩互動狀態</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Hover 時微妙的背景光暈效果</li>
                <li>• 已開啟問題顯示品牌黃色</li>
                <li>• 流暢的focus狀態視覺反饋</li>
                <li>• 按鈕點擊時的縮放動畫</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-green-400 mb-4">🌊 流暢開合動畫</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• 使用framer-motion AnimatePresence</li>
                <li>• 自然的slide down/up效果</li>
                <li>• 箭頭180度旋轉動畫</li>
                <li>• 內容淡入延遲效果</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-green-400 mb-4">🎭 優雅載入動畫</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• 逐一延遲的staggered效果</li>
                <li>• 淡入配合向上滑動</li>
                <li>• 彈性spring動畫曲線</li>
                <li>• 標題預先載入動畫</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-green-400 mb-4">💎 視覺結構優化</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• 精緻的漸變分隔線</li>
                <li>• 智能分隔線顯示邏輯</li>
                <li>• 背景模糊與透明度層次</li>
                <li>• 圓角與陰影的和諧搭配</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedFAQDemo; 