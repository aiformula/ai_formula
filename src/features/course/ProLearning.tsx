import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import Navigation from '../../components/Navigation';
import { ProLearningProps, ProLearningState } from './types';
import { ProLearningNavigation } from './ProLearningNavigation';
import { ProLearningContent } from './ProLearningContent';
import { ProLearningActions } from './ProLearningActions';

const ProLearning: React.FC<ProLearningProps> = ({
  course,
  quickTips = [],
  videoTemplates = [],
  onBackClick,
  onPartComplete,
  onNavigate
}) => {
  const navigate = useNavigate();
  const [currentPart, setCurrentPart] = useState<number>(0);
  const [completedParts, setCompletedParts] = useState<number[]>([]);

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate('/course');
    }
  };

  const handlePartSelect = (partIndex: number) => {
    setCurrentPart(partIndex);
  };

  const handleMarkComplete = () => {
    const partNumber = course.parts[currentPart].number;
    if (!completedParts.includes(partNumber)) {
      setCompletedParts([...completedParts, partNumber]);
      if (onPartComplete) {
        onPartComplete(partNumber);
      }
    }
  };

  const handleNextPart = () => {
    const nextPart = Math.min(currentPart + 1, course.parts.length - 1);
    setCurrentPart(nextPart);
    if (onNavigate) {
      onNavigate('next', currentPart);
    }
  };

  const currentPartData = course.parts[currentPart];
  const partContent = course.getPartContent(currentPart + 1);

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Courses
          </button>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-2">
              {course.title}
            </h1>
            <p className="text-2xl md:text-3xl font-semibold">
              {course.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-300 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>{course.parts.length} Parts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Beginner Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Practical Examples</span>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar - Part Navigation */}
          <div className="lg:col-span-1">
            <ProLearningNavigation
              parts={course.parts}
              currentPart={currentPart}
              completedParts={completedParts}
              language="en" // TODO: Add language prop
              onPartSelect={handlePartSelect}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <ProLearningContent
              part={currentPartData}
              partContent={partContent}
              isEnhanced={currentPart === 3} // Part 4 has enhanced formatting
              language="en" // TODO: Add language prop
              videoTemplates={videoTemplates}
            />

            {/* Action Buttons */}
            <ProLearningActions
              currentPart={currentPart}
              totalParts={course.parts.length}
              isCompleted={completedParts.includes(currentPartData.number)}
              language="en" // TODO: Add language prop
              onMarkComplete={handleMarkComplete}
              onNextPart={handleNextPart}
            />
          </div>
        </div>

        {/* Quick Tips Section */}
        {quickTips.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-bold mb-6 text-center text-purple-400 flex items-center justify-center gap-2">
              <Lightbulb className="w-6 h-6" />
              Quick Success Tips
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickTips.map((tip, index) => (
                <div key={index} className={`rounded-2xl p-6 border ${tip.color}`}>
                  <div className="text-3xl mb-3">{tip.icon}</div>
                  <h4 className="text-lg font-semibold mb-2">
                    {tip.title}
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProLearning; 