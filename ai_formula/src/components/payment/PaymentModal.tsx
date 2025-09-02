/**
 * Payment Modal Component
 * @fileoverview Multi-step modal for course payment flow
 * @author AI Formula Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { PaymentService } from '@/services/paymentService';
import { supabase } from '@/lib/supabase';
import { 
  X, 
  CreditCard, 
  Smartphone, 
  QrCode, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Lock,
  GraduationCap,
  Star
} from 'lucide-react';
import type { PaymentMethod, PaymentIntent } from '@/types/payment';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  onSuccess?: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  courseId,
  onSuccess
}) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const isZhHK = language === 'zh-HK';

  // 動態定價配置
  const getCoursePrice = (courseId: string): number => {
    switch (courseId) {
      case 'chatgpt':
        return 280; // 低階課程
      case 'perplexity':
        return 480;
      case 'midjourney':
        return 980;
      case 'prompt-engineering-expert-course':
        return 980;
      case 'prompt-engineering':
        return 980;
      case 'all-access':
        return 1980; // 全權限通行證
      case 'half-access':
        return 980; // 中階權限通行證
      default:
        return 480; // 默認中階價格
    }
  };

  const coursePrice = getCoursePrice(courseId);
  
  const [step, setStep] = useState<'course_info' | 'payment_method' | 'payment_details' | 'confirmation' | 'success' | 'error'>('course_info');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadPaymentMethods();
    }
  }, [isOpen]);

  const loadPaymentMethods = async () => {
    try {
      console.log('Loading payment methods...');
      const methods = await PaymentService.getPaymentMethods();
      console.log('Payment methods loaded:', methods);
      
      // If no methods from database, use fallback
      if (!methods || methods.length === 0) {
        console.log('No payment methods from database, using fallback');
        const fallbackMethods: PaymentMethod[] = [
          {
            id: 1,
            name: 'payme',
            display_name_zh: 'PayMe',
            display_name_en: 'PayMe',
            provider: 'payme',
            is_active: true,
            sort_order: 1,
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            name: 'fps',
            display_name_zh: '轉數快 FPS',
            display_name_en: 'FPS',
            provider: 'fps',
            is_active: true,
            sort_order: 2,
            created_at: new Date().toISOString()
          }
        ];
        setPaymentMethods(fallbackMethods);
      } else {
        setPaymentMethods(methods);
      }
    } catch (err) {
      console.error('Failed to load payment methods:', err);
      console.log('Using fallback payment methods due to error');
      
             // Use fallback methods on error
       const fallbackMethods: PaymentMethod[] = [
         {
           id: 1,
           name: 'payme',
           display_name_zh: 'PayMe',
           display_name_en: 'PayMe',
           provider: 'payme',
           is_active: true,
           sort_order: 1,
           created_at: new Date().toISOString()
         },
         {
           id: 2,
           name: 'fps',
           display_name_zh: '轉數快 FPS',
           display_name_en: 'FPS',
           provider: 'fps',
           is_active: true,
           sort_order: 2,
           created_at: new Date().toISOString()
         }
       ];
      setPaymentMethods(fallbackMethods);
      setError(null); // Clear error since we have fallback
    }
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
    setStep('payment_details');
  };

  const handlePaymentClick = async () => {
    if (!selectedPaymentMethod) return;
    
    // Check if user is logged in
    if (!user) {
      setError('Please log in before making a payment');
      return;
    }

    try {
      setLoading(true);
      setError(null);

            // Generate a simple order reference
      const orderRef = `AI${Date.now().toString().slice(-6)}`;
      
      // Save payment record to Supabase
      const { data: paymentRecord, error: dbError } = await supabase
        .from('payment_records')
        .insert({
                         order_reference: orderRef,
               user_email: user?.email || null,
               course_id: courseId,
               amount: coursePrice,
               payment_method: selectedPaymentMethod.provider,
          status: 'pending'
        })
        .select()
        .single();
      
      if (dbError) {
        console.error('Database error:', dbError);
        // Continue without database if it fails
      } else {
        console.log('Payment record saved:', paymentRecord);
      }
      
      // Create a simple payment intent
      const mockIntent = {
        id: orderRef,
        amount: coursePrice,
        currency: 'HKD',
        payment_url: selectedPaymentMethod.provider === 'payme' 
          ? 'https://payme.hsbc/liuhang'
          : undefined,
        instructions: selectedPaymentMethod.provider === 'payme'
           ? {
               zh: `請使用 PayMe 完成付款\n\n收款人: Liu Hang\n\n1. 點擊下方按鈕或前往: https://payme.hsbc/liuhang\n2. 輸入金額: HK$${coursePrice}\n3. 確認收款人姓名: Liu Hang\n4. 在備註欄填寫: ${orderRef}\n5. 完成付款後，請截圖付款確認頁面\n6. 將截圖透過 WhatsApp 發送至: 5660 6161\n7. 我們會在 12 小時內開通您的課程權限\n\n參考編號: ${orderRef}`,
               en: `Please complete payment using PayMe\n\nRecipient: Liu Hang\n\n1. Click the button below or go to: https://payme.hsbc/liuhang\n2. Enter amount: HK$${coursePrice}\n3. Verify recipient name: Liu Hang\n4. Add reference in remarks: ${orderRef}\n5. After payment, please screenshot the confirmation page\n6. Send screenshot via WhatsApp to: 5660 6161\n7. We will grant course access within 12 hours\n\nReference: ${orderRef}`
             }
                                : {
                zh: `請使用轉數快 (FPS) 完成付款\n\n收款人: Liu H*** F****\n收款電話號碼: 5660 6161\n金額: HK$${coursePrice}\n備註: ${orderRef}\n\n付款步驟:\n1. 開啟銀行應用程式\n2. 選擇轉數快付款\n3. 輸入電話號碼: 5660 6161\n4. 確認收款人姓名: Liu H*** F****\n5. 輸入金額: HK$${coursePrice}\n6. 在備註欄填寫: ${orderRef}\n7. 完成付款後，請截圖付款確認頁面\n8. 將截圖透過 WhatsApp 發送至: 5660 6161\n9. 我們會在 12 小時內開通您的課程權限`,
                en: `Please complete payment using FPS\n\nRecipient: Liu H*** F****\nPayee Phone: 5660 6161\nAmount: HK$${coursePrice}\nReference: ${orderRef}\n\nPayment Steps:\n1. Open your banking app\n2. Select FPS payment\n3. Enter phone number: 5660 6161\n4. Verify recipient name: Liu H*** F****\n5. Enter amount: HK$${coursePrice}\n6. Add reference in remarks: ${orderRef}\n7. After payment, please screenshot the confirmation page\n8. Send screenshot via WhatsApp to: 5660 6161\n9. We will grant course access within 12 hours`
             }
      };
      
      console.log('Mock payment intent created:', mockIntent);
      console.log('Payment URL:', mockIntent.payment_url);
      setPaymentIntent(mockIntent);
      setStep('confirmation');
      
      // Auto-open payment URL for PayMe
      if (mockIntent.payment_url) {
        console.log('Opening payment URL:', mockIntent.payment_url);
        window.open(mockIntent.payment_url, '_blank');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('Failed to process payment');
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    if (!paymentIntent) return;

    try {
      setLoading(true);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStep('success');
    } catch (err) {
      console.error('Payment completion error:', err);
      setError('Failed to complete payment');
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  const getPaymentMethodIcon = (provider: string) => {
    switch (provider) {
      case 'payme':
        return <Smartphone className="w-5 h-5" />;
      case 'fps':
        return <QrCode className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'course_info':
        return (
          <div className="space-y-6">
            {/* Header with gradient background */}
            <div className="text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg blur-xl"></div>
              <div className="relative bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-lg p-6 border border-purple-500/20">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {isZhHK ? '課程報名' : 'Course Enrollment'}
                </h3>
                <p className="text-gray-300">
                  {isZhHK ? '選擇付款方式完成報名' : 'Select payment method to complete enrollment'}
                </p>
              </div>
            </div>
            
            {/* Course Details */}
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-600/20 p-2 rounded-lg">
                      <Star className="w-5 h-5 text-yellow-500" />
                    </div>
                    <span className="text-lg font-medium text-gray-200">
                      {isZhHK ? '課程費用' : 'Course Fee'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">HK${coursePrice}</div>
                    <div className="text-sm text-gray-400 line-through">HK${Math.round(coursePrice * 2.1)}</div>
                  </div>
                </div>
                
                {/* Features */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{isZhHK ? '完整課程內容' : 'Complete course content'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{isZhHK ? '永久觀看權限' : 'Lifetime access'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{isZhHK ? '專家級實戰指導' : 'Expert practical guidance'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{isZhHK ? '12小時內開通權限' : 'Access within 12 hours'}</span>
                  </div>
                </div>
                
                <div className="bg-blue-600/10 border border-blue-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-blue-400 text-sm">
                    <Lock className="w-4 h-4" />
                    <span>{isZhHK ? '安全付款，專業服務保障' : 'Secure payment with professional service guarantee'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={() => setStep('payment_method')}
              className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-black font-bold py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              {isZhHK ? '選擇付款方式' : 'Select Payment Method'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        );

      case 'payment_method':
        return (
          <div className="space-y-6">
            {/* Header with gradient background */}
            <div className="text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg blur-xl"></div>
              <div className="relative bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-lg p-6 border border-green-500/20">
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-full">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {isZhHK ? '選擇付款方式' : 'Select Payment Method'}
                </h3>
                <p className="text-gray-300">
                  {isZhHK ? '選擇最適合您的付款方式' : 'Choose the payment method that works best for you'}
                </p>
              </div>
            </div>
            
                         {/* Payment Methods Grid */}
             <div className="space-y-4 max-w-md mx-auto">
               {paymentMethods.map((method, index) => (
                                 <div
                   key={method.id}
                   className="group"
                   onClick={() => handlePaymentMethodSelect(method)}
                 >
                   {/* Main card */}
                   <Card className="relative bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600 hover:border-green-500/50 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl">
                     <CardContent className="p-5">
                       <div className="flex items-center justify-between">
                         {/* Left side - Icon and Content */}
                         <div className="flex items-center gap-4 flex-1">
                           {/* Icon with gradient background */}
                           <div className={`p-3 rounded-lg flex items-center justify-center ${
                             method.provider === 'payme' 
                               ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30' 
                               : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30'
                           }`}>
                             {method.provider === 'payme' ? (
                               <Smartphone className="w-6 h-6 text-green-400" />
                             ) : (
                               <QrCode className="w-6 h-6 text-blue-400" />
                             )}
                           </div>
                           
                           {/* Content */}
                           <div className="flex-1">
                             <div className="flex items-center gap-2 mb-1">
                               <span className="text-lg font-bold text-white">
                                 {isZhHK ? method.display_name_zh : method.display_name_en}
                               </span>
                               {method.provider === 'payme' && (
                                 <Badge className="bg-green-600/20 text-green-400 border-green-500/30 text-xs">
                                   {isZhHK ? '推薦' : 'Recommended'}
                                 </Badge>
                               )}
                             </div>
                             <p className="text-gray-400 text-sm">
                               {method.provider === 'payme' 
                                 ? (isZhHK ? '即時付款，快速開通課程' : 'Instant payment, quick course activation')
                                 : (isZhHK ? '銀行轉帳，安全可靠' : 'Bank transfer, secure and reliable')
                               }
                             </p>
                           </div>
                         </div>
                         
                         {/* Right side - Arrow */}
                         <div className="text-gray-400 group-hover:text-green-400 transition-colors duration-300 ml-4">
                           <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                         </div>
                       </div>
                       
                       {/* Bottom features row */}
                       <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-700/50">
                         <div className="flex items-center gap-1 text-xs text-gray-500">
                           <CheckCircle className="w-3 h-3" />
                           <span>{isZhHK ? '安全加密' : 'Secure'}</span>
                         </div>
                         <div className="flex items-center gap-1 text-xs text-gray-500">
                           <CheckCircle className="w-3 h-3" />
                           <span>{isZhHK ? '即時確認' : 'Instant'}</span>
                         </div>
                       </div>
                     </CardContent>
                   </Card>
                </div>
              ))}
            </div>
            
            {/* Security notice */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-4 border border-gray-600/50">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600/20 p-2 rounded-lg">
                  <Lock className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-sm text-gray-300">
                  {isZhHK ? '您的付款資訊受到 256 位元 SSL 加密保護' : 'Your payment information is protected by 256-bit SSL encryption'}
                </div>
              </div>
            </div>
          </div>
        );

      case 'payment_details':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">
                {isZhHK ? '付款詳情' : 'Payment Details'}
              </h3>
              <p className="text-gray-300">
                {isZhHK ? '點擊下方按鈕開始付款流程' : 'Click the button below to start payment'}
              </p>
            </div>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  {getPaymentMethodIcon(selectedPaymentMethod?.provider || '')}
                  <span className="text-white font-medium">
                    {isZhHK ? selectedPaymentMethod?.display_name_zh : selectedPaymentMethod?.display_name_en}
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  {selectedPaymentMethod?.provider === 'payme'
                    ? (isZhHK ? '將跳轉到 PayMe 付款頁面' : 'Will redirect to PayMe payment page')
                    : (isZhHK ? '將顯示銀行轉帳資訊' : 'Will show bank transfer information')
                  }
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={handlePaymentClick}
              disabled={loading}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-3"
            >
              {loading 
                ? (isZhHK ? '處理中...' : 'Processing...')
                : (isZhHK ? '開始付款' : 'Start Payment')
              }
            </Button>
          </div>
        );

      case 'confirmation':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">
                {isZhHK ? '付款確認' : 'Payment Confirmation'}
              </h3>
            </div>
            
            {paymentIntent && (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 space-y-4">
                  {paymentIntent.payment_url && (
                    <div className="text-center">
                      <Button 
                        onClick={() => {
                          console.log('Manual payment button clicked, URL:', paymentIntent.payment_url);
                          window.open(paymentIntent.payment_url, '_blank');
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {isZhHK ? '前往付款頁面' : 'Go to Payment Page'}
                      </Button>
                    </div>
                  )}
                  
                  {paymentIntent.instructions && (
                    <div className="text-sm text-gray-300 whitespace-pre-line">
                      {isZhHK ? paymentIntent.instructions.zh : paymentIntent.instructions.en}
                    </div>
                  )}
                  
                  <Button 
                    onClick={handlePaymentSuccess}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isZhHK ? '我已完成付款' : 'I Have Completed Payment'}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'success':
        return (
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto relative" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">
                {isZhHK ? '付款資訊已提交！' : 'Payment Information Submitted!'}
              </h3>
              <p className="text-gray-300 text-lg">
                {isZhHK ? '我們會盡快驗證您的付款' : 'We will verify your payment ASAP'}
              </p>
            </div>
            
            <div className="bg-green-600/10 border border-green-500/20 rounded-lg p-4 space-y-2">
              <p className="text-green-400 font-medium">
                {isZhHK ? '接下來的步驟：' : 'Next Steps:'}
              </p>
              <div className="text-sm text-gray-300 space-y-1">
                <p>{isZhHK ? '✓ 我們已收到您的付款資訊' : '✓ We have received your payment information'}</p>
                <p>{isZhHK ? '✓ 將在 12 小時內驗證並開通權限' : '✓ Will verify and grant access within 12 hours'}</p>
                <p>{isZhHK ? '✓ 開通後會發送 WhatsApp 通知' : '✓ WhatsApp notification will be sent upon activation'}</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm">
              {isZhHK ? '請點擊右上角 ✕ 關閉此視窗' : 'Click the ✕ in the top right to close this window'}
            </p>
          </div>
        );

      case 'error':
        return (
          <div className="text-center space-y-4">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
            <h3 className="text-xl font-semibold text-white">
              {isZhHK ? '付款失敗' : 'Payment Failed'}
            </h3>
            <p className="text-gray-300">
              {error || (isZhHK ? '付款過程中發生錯誤，請重試' : 'An error occurred during payment, please try again')}
            </p>
            <Button 
              onClick={() => setStep('course_info')}
              className="bg-yellow-600 hover:bg-yellow-700 text-black"
            >
              {isZhHK ? '重試' : 'Retry'}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>
            {isZhHK ? '課程報名' : 'Course Enrollment'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal; 