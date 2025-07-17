import React from 'react';
import { Star, ArrowLeft } from 'lucide-react';
import { ProLearningActionsProps } from './types';

export const ProLearningActions: React.FC<ProLearningActionsProps> = ({
  currentPart,
  totalParts,
  isCompleted,
  language,
  onMarkComplete,
  onNextPart
}) => {
  return (
    <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-gray-700">
      <button
        onClick={onMarkComplete}
        className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
          isCompleted
            ? 'bg-green-500 text-white shadow-lg'
            : 'bg-yellow-500 hover:bg-yellow-600 text-black hover:scale-105'
        }`}
      >
        <Star className="w-5 h-5" />
        {isCompleted
          ? (language === 'en' ? 'Completed!' : '已完成！')
          : (language === 'en' ? 'Mark Complete' : '標記完成')
        }
      </button>
      
      <button
        onClick={onNextPart}
        disabled={currentPart === totalParts - 1}
        className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:opacity-50 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
      >
        {language === 'en' ? 'Next Part' : '下一部分'}
        <ArrowLeft className="w-5 h-5 rotate-180" />
      </button>
    </div>
  );
}; 