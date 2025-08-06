import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PromptEngineeringCourseQuiz: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the course outline for now
    navigate('/courses/prompt-engineering-course/outline');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white text-center">
        <h2 className="text-2xl mb-4">正在跳轉到課程大綱...</h2>
        <p>Redirecting to course outline...</p>
      </div>
    </div>
  );
};

export default PromptEngineeringCourseQuiz; 