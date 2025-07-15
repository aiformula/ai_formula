/**
 * AI Business Automation Free Course Outline Page
 * @fileoverview Sample page demonstrating the FreeCourseOutlineTemplate with AI automation course data
 * @author AI Formula Team
 * @version 1.0.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import FreeCourseOutlineTemplate from '@/components/templates/FreeCourseOutlineTemplate';
import {
  aiBusinessAutomationCourseInfo,
  aiBusinessAutomationStats,
  aiBusinessAutomationModules,
  aiBusinessAutomationFeatures,
  aiBusinessAutomationFAQ,
  aiBusinessAutomationTargetAudience
} from '@/data/courses/aiBusinessAutomationOutline';

const AIBusinessAutomationOutline: React.FC = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    // Navigate to the actual course learning page
    navigate('/courses/ai-business-automation/learning');
  };

  const handleWhatsApp = () => {
    const message = `我想了解更多關於 AI 商業自動化實戰課程的資訊`;
    const whatsappUrl = `https://wa.me/85298765432?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <FreeCourseOutlineTemplate
      courseInfo={aiBusinessAutomationCourseInfo}
      courseStats={aiBusinessAutomationStats}
      courseModules={aiBusinessAutomationModules}
      courseFeatures={aiBusinessAutomationFeatures}
      faqData={aiBusinessAutomationFAQ}
      targetAudience={aiBusinessAutomationTargetAudience}
      onStartLearning={handleStartLearning}
      onWhatsApp={handleWhatsApp}
    />
  );
};

export default AIBusinessAutomationOutline; 