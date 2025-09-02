/**
 * Payment Page
 * @fileoverview Dedicated page for course payment
 * @author AI Formula Team
 * @version 1.0.0
 */

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PaymentModal from '@/components/payment/PaymentModal';
import Navigation from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const PaymentPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isZhHK = language === 'zh-HK';

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      // Store the current path so we can redirect back after login
      sessionStorage.setItem('intendedPath', window.location.pathname);
      navigate('/auth');
    }
  }, [user, navigate]);

  // Show loading while checking authentication
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>{isZhHK ? '驗證登入狀態中...' : 'Checking authentication...'}</p>
      </div>
    );
  }

  if (!courseId) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>{isZhHK ? '課程ID缺失，無法處理付款。' : 'Course ID missing, cannot process payment.'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <PaymentModal
          isOpen={true} // Always open on this page
          onClose={() => window.history.back()} // Go back on close
          courseId={courseId}
          onSuccess={() => {
            // Redirect to course learning page on success
            window.location.href = `/course/${courseId}/learning`;
          }}
        />
      </div>
    </div>
  );
};

export default PaymentPage; 