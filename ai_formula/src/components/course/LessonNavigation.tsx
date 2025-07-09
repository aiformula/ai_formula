import React, { useMemo } from 'react';
import { CheckCircle, Clock, Target } from 'lucide-react';
import { LessonPart } from '../../types/courseTypes';

interface LessonNavigationProps {
  parts: LessonPart[];
  currentPart: number;
  completedParts: number[];
  onPartSelect: (partIndex: number) => void;
  onMarkComplete: (partNumber: number) => void;
  language: 'en' | 'zh-TW';
}

const LessonNavigation: React.FC<LessonNavigationProps> = ({
  parts,
  currentPart,
  completedParts,
  onPartSelect,
  onMarkComplete,
  language
}) => {
  const currentPartData = useMemo(() => parts[currentPart], [parts, currentPart]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50 sticky top-24">
      <h3 className="text-2xl font-bold mb-6 text-yellow-400 flex items-center gap-2">
        <Target className="w-6 h-6" />
        {language === 'en' ? 'Learning Path' : '學習路徑'}
      </h3>
      
      {parts.map((part, index) => (
        <div key={part.id} className="mb-4">
          <button
            onClick={() => onPartSelect(index)}
            className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ${
              currentPart === index
                ? `bg-gradient-to-r ${part.color} text-white shadow-2xl scale-105`
                : 'bg-gray-700/30 hover:bg-gray-600/50 text-gray-300 hover:scale-102'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl">{part.icon}</div>
              <div>
                <div className="font-bold text-lg">
                  {language === 'en' ? `Part ${part.number}` : `Part ${part.number}`}
                </div>
                <div className="text-sm opacity-90">
                  {language === 'en' ? part.title : part.titleCht}
                </div>
              </div>
            </div>
            
            <div className="text-sm opacity-80 mb-3">
              {language === 'en' ? part.description : part.descriptionCht}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <Clock className="w-3 h-3" />
                <span>{language === 'en' ? part.duration : part.durationCht}</span>
              </div>
              
              {completedParts.includes(part.number) && (
                <CheckCircle className="w-5 h-5 text-green-400" />
              )}
            </div>
          </button>
          
          {/* Topics Preview - only show for current part */}
          {currentPart === index && (
            <div className="mt-3 ml-4 space-y-2">
              {part.topics.map((topic, topicIndex) => (
                <div key={topicIndex} className="flex items-center gap-2 text-sm text-gray-400 bg-gray-800/30 p-2 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>{language === 'en' ? topic.name : topic.nameCht}</span>
                </div>
              ))}
              
              {/* Sample Content Preview */}
              <div className="bg-blue-500/20 p-3 rounded-lg border border-blue-500/30 mt-3">
                <div className="text-sm font-semibold text-blue-400 mb-2">
                  {language === 'en' ? part.sampleContent.title : part.sampleContent.titleCht}
                </div>
                <div className="text-xs text-gray-300 bg-gray-800/50 p-2 rounded font-mono">
                  {language === 'en' ? part.sampleContent.prompt : part.sampleContent.promptCht}
                </div>
                <div className="text-xs text-green-400 mt-1">
                  → {language === 'en' ? part.sampleContent.result : part.sampleContent.resultCht}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Completion Status */}
      <div className="mt-6 pt-4 border-t border-gray-600">
        <div className="text-sm text-gray-400 mb-2">
          {language === 'en' ? 'Progress' : '進度'}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedParts.length / parts.length) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-400">
            {completedParts.length}/{parts.length}
          </span>
        </div>
      </div>

      {/* Mark Complete Button */}
      <button
        onClick={() => onMarkComplete(currentPartData.number)}
        className={`w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-semibold transition-all duration-300 ${
          completedParts.includes(currentPartData.number)
            ? 'bg-green-500 text-white shadow-lg'
            : 'bg-yellow-500 hover:bg-yellow-600 text-black hover:scale-105'
        }`}
      >
        <CheckCircle className="w-5 h-5" />
        {completedParts.includes(currentPartData.number)
          ? (language === 'en' ? 'Completed!' : '已完成！')
          : (language === 'en' ? 'Mark Complete' : '標記完成')
        }
      </button>
    </div>
  );
};

export default React.memo(LessonNavigation); 