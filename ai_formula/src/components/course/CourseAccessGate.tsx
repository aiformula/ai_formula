/**
 * Course Access Gate Component
 * @fileoverview Controls access to course content based on payment status
 * @author AI Formula Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCourseAccess, CourseAccessResult } from '@/hooks/useCourseAccess';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Lock, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle,
  CreditCard,
  RefreshCw
} from 'lucide-react';

interface CourseAccessGateProps {
  courseId: string;
  children: React.ReactNode;
  fallbackContent?: React.ReactNode;
}

const CourseAccessGate: React.FC<CourseAccessGateProps> = ({ 
  courseId, 
  children, 
  fallbackContent 
}) => {
  const { user } = useAuth();
  const { checkAccessLevel } = useCourseAccess();
  const navigate = useNavigate();
  const [accessResult, setAccessResult] = useState<CourseAccessResult | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAccess = async () => {
    setLoading(true);
          const result = await checkAccessLevel(courseId);
    console.log('Course access result:', result);
    setAccessResult(result);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      checkAccess();
    } else {
      setAccessResult({
        hasAccess: false,
        isPaid: false,
        message: 'Please log in to access course content'
      });
      setLoading(false);
    }
  }, [user, courseId]);

  const handlePayNow = () => {
    if (!user) {
      sessionStorage.setItem('intendedPath', window.location.pathname);
      navigate('/auth');
    } else {
      navigate(`/payment/${courseId}`);
    }
  };

  const handleLogin = () => {
    sessionStorage.setItem('intendedPath', window.location.pathname);
    navigate('/auth');
  };

  const getStatusIcon = () => {
    if (!accessResult) return <Clock className="w-6 h-6 text-gray-400" />;
    
    if (accessResult.hasAccess) {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    } else if (accessResult.paymentStatus === 'pending') {
      return <Clock className="w-6 h-6 text-yellow-500" />;
    } else if (accessResult.paymentStatus === 'rejected') {
      return <XCircle className="w-6 h-6 text-red-500" />;
    } else {
      return <Lock className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusBadge = () => {
    if (!accessResult) return null;
    
    if (accessResult.hasAccess) {
      return <Badge className="bg-green-600">Access Granted</Badge>;
    } else if (accessResult.paymentStatus === 'pending') {
      return <Badge className="bg-yellow-600">Payment Pending</Badge>;
    } else if (accessResult.paymentStatus === 'rejected') {
      return <Badge className="bg-red-600">Payment Rejected</Badge>;
    } else if (accessResult.isPaid) {
      return <Badge className="bg-blue-600">Payment Processing</Badge>;
    } else {
      return <Badge className="bg-gray-600">Payment Required</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-400">Checking access...</span>
      </div>
    );
  }

  // If user has access, show the protected content
  if (accessResult?.hasAccess) {
    return <>{children}</>;
  }

  // Show access denied message with appropriate actions
  return (
    <div className="max-w-2xl mx-auto py-12">
      <Card className="bg-gray-800 border-gray-700 text-white">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            {getStatusIcon()}
          </div>
          
          <div className="mb-4">
            {getStatusBadge()}
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-4">
            {!user ? 'Login Required' : 'Course Access Required'}
          </h3>
          
          <p className="text-gray-300 mb-6">
            {accessResult?.message || 'You need to purchase this course to access the content.'}
          </p>
          
          {!user ? (
            <Button 
              onClick={handleLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Login to Continue
            </Button>
          ) : accessResult?.paymentStatus === 'pending' ? (
            <div className="space-y-4">
              <div className="bg-yellow-600/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 text-yellow-400 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Your payment is being verified. You'll receive access within 12 hours.</span>
                </div>
              </div>
              <Button 
                onClick={checkAccess}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Check Status
              </Button>
            </div>
          ) : accessResult?.paymentStatus === 'rejected' ? (
            <div className="space-y-4">
              <div className="bg-red-600/10 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Payment was rejected. Please contact support or try again.</span>
                </div>
              </div>
              <Button 
                onClick={handlePayNow}
                className="bg-yellow-600 hover:bg-yellow-700 text-black"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Try Payment Again
              </Button>
            </div>
          ) : (
            <Button 
              onClick={handlePayNow}
              className="bg-yellow-600 hover:bg-yellow-700 text-black"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Purchase Course - HK$480
            </Button>
          )}
          
          {fallbackContent && (
            <div className="mt-8 pt-8 border-t border-gray-700">
              {fallbackContent}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseAccessGate; 