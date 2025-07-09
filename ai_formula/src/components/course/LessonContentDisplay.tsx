import React, { useMemo } from 'react';
import { ArrowLeft, Zap, Lightbulb } from 'lucide-react';
import { LessonPart, LessonContent } from '../../types/courseTypes';
import ContentRenderer from './ContentRenderer';
import VideoTemplate from './VideoTemplate';

interface LessonContentDisplayProps {
  currentPart: LessonPart;
  partContent: LessonContent;
  currentPartIndex: number;
  totalParts: number;
  onNextPart: () => void;
  onPrevPart: () => void;
  language: 'en' | 'zh-TW';
}

const LessonContentDisplay: React.FC<LessonContentDisplayProps> = ({
  currentPart,
  partContent,
  currentPartIndex,
  totalParts,
  onNextPart,
  onPrevPart,
  language
}) => {
  // Check if this is Part 4 (Midjourney Keywords) for special handling
  const isPart4 = useMemo(() => currentPartIndex === 3, [currentPartIndex]);

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 overflow-hidden">
      {/* Lesson Header */}
      <div className={`bg-gradient-to-r ${currentPart.color} p-8`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 p-3 rounded-2xl text-3xl">
            {currentPart.icon}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">
              {language === 'en' ? 
                `Part ${currentPart.number}: ${currentPart.title}` :
                `Part ${currentPart.number}: ${currentPart.titleCht}`
              }
            </h2>
            <p className="text-white/90 text-lg">
              {language === 'en' ? currentPart.description : currentPart.descriptionCht}
            </p>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="p-8">
        {/* Regular content for Parts 1-3 */}
        {!isPart4 && (
          <ContentRenderer 
            content={language === 'en' ? partContent.content : partContent.contentCht}
            language={language}
            partNumber={currentPart.number}
          />
        )}

        {/* Enhanced content for Part 4 with special handling */}
        {isPart4 && (
          <div>
            {/* Basic content first */}
            <ContentRenderer 
              content={language === 'en' ? partContent.content : partContent.contentCht}
              language={language}
              partNumber={4}
            />
            
            {/* Video Templates Section */}
            <div className="mt-12">
              <VideoTemplate 
                language={language}
                onImageError={(url) => console.warn('Image failed to load:', url)}
                onVideoError={(url) => console.warn('Video failed to load:', url)}
              />
            </div>
          </div>
        )}

        {/* Professional Tips Section for Part 3 */}
        {currentPartIndex === 2 && currentPart.proTips && (
          <div className="mt-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl p-8 border border-orange-500/30">
            <h3 className="text-3xl font-bold mb-8 text-center text-orange-400 flex items-center justify-center gap-3">
              <Zap className="w-8 h-8" />
              {language === 'en' ? currentPart.proTips.title : currentPart.proTips.titleCht}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentPart.proTips.tips.map((tip) => (
                <div key={tip.number} className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/30 hover:border-orange-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      {tip.number}
                    </div>
                    <h4 className="text-lg font-semibold text-orange-400">
                      {language === 'en' ? tip.title : tip.titleCht}
                    </h4>
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {language === 'en' ? tip.description : tip.descriptionCht}
                  </p>
                  
                  <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                    <div className="text-sm text-green-400 font-semibold mb-2">Example:</div>
                    <div className="text-xs text-gray-300 font-mono whitespace-pre-line">
                      {language === 'en' ? tip.example : tip.exampleCht}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <div className="bg-yellow-500/20 rounded-2xl p-6 border border-yellow-500/30">
                <h4 className="text-xl font-bold text-yellow-400 mb-3">
                  {language === 'en' ? '💡 Pro Tip: Practice These Daily!' : '💡 專業貼士：每日練習呢啲！'}
                </h4>
                <p className="text-gray-300">
                  {language === 'en' ? 
                    'Master these 10 tips and you\'ll create professional-quality images that can sell for $50-500 each!' :
                    '掌握呢10個貼士，你就可以創造每張可以賣$50-500嘅專業質量圖像！'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-gray-700">
          {currentPartIndex > 0 && (
            <button
              onClick={onPrevPart}
              className="flex items-center gap-2 px-8 py-4 bg-gray-600 hover:bg-gray-500 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              {language === 'en' ? 'Previous Part' : '上一部分'}
            </button>
          )}
          
          {currentPartIndex < totalParts - 1 && (
            <button
              onClick={onNextPart}
              className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ml-auto"
            >
              {language === 'en' ? 'Next Part' : '下一部分'}
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(LessonContentDisplay); 