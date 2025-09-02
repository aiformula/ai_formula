/**
 * Payment Context
 * @fileoverview Manages payment modal state and payment flow
 * @author AI Formula Team
 * @version 1.0.0
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PaymentModalState {
  isOpen: boolean;
  step: 'course_info' | 'payment_method' | 'payment_details' | 'confirmation' | 'success' | 'error';
  courseId?: string;
  orderId?: string;
  paymentIntent?: any;
}

interface PaymentContextType {
  paymentModal: PaymentModalState;
  openPaymentModal: (courseId: string) => void;
  closePaymentModal: () => void;
  setPaymentModal: (state: PaymentModalState) => void;
  goToStep: (step: PaymentModalState['step']) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

interface PaymentProviderProps {
  children: ReactNode;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({ children }) => {
  console.log('PaymentProvider initialized');
  
  const [paymentModal, setPaymentModal] = useState<PaymentModalState>({
    isOpen: false,
    step: 'course_info'
  });

  const openPaymentModal = (courseId: string) => {
    console.log('Opening payment modal for course:', courseId);
    setPaymentModal({
      isOpen: true,
      step: 'course_info',
      courseId
    });
  };

  const closePaymentModal = () => {
    console.log('Closing payment modal');
    setPaymentModal({
      isOpen: false,
      step: 'course_info'
    });
  };

  const goToStep = (step: PaymentModalState['step']) => {
    console.log('Going to step:', step);
    setPaymentModal(prev => ({
      ...prev,
      step
    }));
  };

  const value: PaymentContextType = {
    paymentModal,
    openPaymentModal,
    closePaymentModal,
    setPaymentModal,
    goToStep
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = (): PaymentContextType => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
}; 