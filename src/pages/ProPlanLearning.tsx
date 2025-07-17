import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ProLearning from '../features/course/ProLearning';
import { aiCreationBeginnerCourse, quickTips, videoTemplates } from '../data/pro-learning-course';

const ProPlanLearning: React.FC = () => {
  const { language } = useLanguage();

  const handlePartComplete = (partNumber: number) => {
    console.log(`Part ${partNumber} completed!`);
    // Add any additional completion logic here (analytics, progress tracking, etc.)
  };

  const handleNavigate = (action: 'back' | 'next', currentPart: number) => {
    console.log(`Navigation: ${action} from part ${currentPart + 1}`);
    // Add any additional navigation logic here
  };

  return (
    <ProLearning
      course={aiCreationBeginnerCourse}
      quickTips={quickTips}
      videoTemplates={videoTemplates}
      onPartComplete={handlePartComplete}
      onNavigate={handleNavigate}
    />
  );
};

export default ProPlanLearning; 