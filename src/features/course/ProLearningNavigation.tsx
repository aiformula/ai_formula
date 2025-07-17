import React from 'react';
import { Target, Clock, CheckCircle } from 'lucide-react';
import { ProLearningNavigationProps } from './types';

export const ProLearningNavigation: React.FC<ProLearningNavigationProps> = ({
  parts,
  currentPart,
  completedParts,
  language,
  onPartSelect
}) => {
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
          
          {/* Topics Preview */}
          {currentPart === index && (
            <div className="mt-3 ml-4 space-y-2">
              {part.topics.map((topic, topicIndex) => (
                <div key={topicIndex} className="flex items-center gap-2 text-sm text-gray-400 bg-gray-800/30 p-2 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>{language === 'en' ? topic.name : topic.nameCht}</span>
                </div>
              ))}
              
              {/* Sample Content Preview */}
              <div className="bg-gray-800/50 p-3 rounded-lg mt-3">
                <div className="text-xs text-gray-500 mb-1">
                  {language === 'en' ? 'Sample Exercise:' : '示例練習：'}
                </div>
                <div className="text-sm font-medium text-gray-300 mb-1">
                  {language === 'en' ? part.sampleContent.title : part.sampleContent.titleCht}
                </div>
                <div className="text-xs text-gray-400 italic">
                  "{language === 'en' ? part.sampleContent.prompt.substring(0, 60) + '...' : part.sampleContent.promptCht.substring(0, 40) + '...'}"
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}; 