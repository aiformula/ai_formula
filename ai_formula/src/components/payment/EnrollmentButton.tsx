/**
 * Enrollment Button Component
 * Replaces the "立即報名學習" button with payment functionality
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlayCircle, Lock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { usePayment } from '@/contexts/PaymentContext';
import { useCourseAccess } from '@/hooks/useCourseAccess';
import type { CourseAccessResult } from '@/types/payment';

interface EnrollmentButtonProps {
  courseId: string;
  courseTitle: string;
  coursePrice: number;
  isFree?: boolean;
  className?: string;
  size?: 'sm' | 'lg' | 'default';
  variant?: 'default' | 'outline' | 'secondary';
  onEnrollmentSuccess?: () => void;
}

const EnrollmentButton: React.FC<EnrollmentButtonProps> = ({
  courseId,
  courseTitle,
  coursePrice,
  isFree = false,
  className = '',
  size = 'default',
  variant = 'default',
  onEnrollmentSuccess
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { openPaymentModal } = usePayment();
  const { checkAccessLevel } = useCourseAccess();
  
  const [accessResult, setAccessResult] = useState<CourseAccessResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && courseId) {
      checkAccess();
    }
  }, [user, courseId]);

  const checkAccess = async () => {
    try {
              const result = await checkAccessLevel(courseId);
      setAccessResult(result);
    } catch (error) {
      console.error('Error checking course access:', error);
    }
  };

  const handleEnrollmentClick = () => {
    console.log('EnrollmentButton clicked:', {
      courseId, isFree, user: !!user, accessResult, hasAccess: accessResult?.has_access
    });

    if (isFree) {
      console.log('Accessing free course:', courseId);
      // You can implement navigation logic here
      return;
    }

    if (!user) {
      console.log('User not authenticated, redirecting to login');
      navigate('/auth');
      return;
    }

    if (accessResult?.has_access) {
      console.log('User already has access to course:', courseId);
      navigate(`/course/${courseId}`);
      return;
    }

    console.log('Opening payment modal for course:', courseId);
    console.log('Payment modal should open now...');
    
    // Try opening payment modal
    try {
      openPaymentModal(courseId);
      console.log('Payment modal opened successfully');
    } catch (error) {
      console.error('Error opening payment modal:', error);
      // Fallback: redirect to payment page
      console.log('Falling back to payment page redirect');
      navigate(`/payment/${courseId}`);
    }
  };

  const getButtonText = () => {
    if (isFree) {
      return '立即開始免費學習';
    }

    if (accessResult?.has_access) {
      return '立即學習';
    }

    return '立即報名學習';
  };

  const getButtonIcon = () => {
    if (isFree) {
      return <PlayCircle className="w-4 h-4" />;
    }

    if (accessResult?.has_access) {
      return <CheckCircle className="w-4 h-4" />;
    }

    return <Lock className="w-4 h-4" />;
  };

  const getButtonVariant = () => {
    if (isFree) {
      return 'default';
    }

    if (accessResult?.has_access) {
      return 'secondary';
    }

    return variant;
  };

  const getButtonClassName = () => {
    let baseClasses = '';
    
    if (isFree) {
      baseClasses = 'bg-green-600 hover:bg-green-700 text-white';
    } else if (accessResult?.has_access) {
      baseClasses = 'bg-blue-600 hover:bg-blue-700 text-white';
    } else {
      baseClasses = 'bg-yellow-600 hover:bg-yellow-700 text-black font-bold';
    }
    
    return `${baseClasses} ${className}`;
  };

  return (
    <Button
      onClick={handleEnrollmentClick}
      disabled={loading}
      className={`w-full py-3 ${getButtonClassName()}`}
      size={size}
      variant={getButtonVariant()}
    >
      {getButtonIcon()}
      <span className="ml-2">{getButtonText()}</span>
    </Button>
  );
};

export default EnrollmentButton; 