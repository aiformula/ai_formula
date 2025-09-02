/**
 * Simple Enrollment Button Component
 * Directly redirects to payment page for testing purposes
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface SimpleEnrollmentButtonProps {
  courseId: string;
  className?: string;
  size?: 'sm' | 'lg' | 'default';
  variant?: 'default' | 'outline' | 'secondary';
}

const SimpleEnrollmentButton: React.FC<SimpleEnrollmentButtonProps> = ({
  courseId,
  className = '',
  size = 'default',
  variant = 'default'
}) => {
  const handleClick = () => {
    console.log('SimpleEnrollmentButton clicked, redirecting to:', `/payment/${courseId}`);
    window.location.href = `/payment/${courseId}`;
  };

  return (
    <Button
      onClick={handleClick}
      className={`w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 ${className}`}
      size={size}
      variant={variant}
    >
      <Lock className="w-4 h-4 mr-2" />
      <span className="ml-2">立即報名學習</span>
    </Button>
  );
};

export default SimpleEnrollmentButton; 