/**
 * Payment Service
 * @fileoverview Handles payment processing for PayMe and FPS
 * @author AI Formula Team
 * @version 1.0.0
 */

import { supabase } from '@/lib/supabase';
import type { 
  Order, 
  PaymentTransaction, 
  PaymentIntent, 
  CourseEnrollment,
  PaymentMethod
} from '@/types/payment';
import { PaymentError } from '@/types/payment';

export class PaymentService {
  /**
   * Create a new order for course enrollment
   */
  static async createOrder(
    userId: string,
    courseId: string,
    amount: number,
    paymentMethodId: number,
    discountCode?: string
  ): Promise<Order> {
    try {
      // Generate unique order number
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Calculate final amount (with discount if applicable)
      let finalAmount = amount;
      let discountAmount = 0;
      
      if (discountCode) {
        const discount = await this.validateDiscountCode(discountCode, amount);
        if (discount) {
          discountAmount = discount.discount_value;
          finalAmount = amount - discountAmount;
        }
      }
      
      // Create order
      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          user_id: userId,
          course_id: courseId,
          amount: amount,
          currency: 'HKD',
          status: 'pending',
          payment_method_id: paymentMethodId,
          total_amount: finalAmount,
          discount_amount: discountAmount,
          discount_code: discountCode
        })
        .select()
        .single();
      
      if (error) throw new PaymentError('Failed to create order', 'ORDER_CREATE_FAILED', 'server', { error });
      
      return order;
    } catch (error) {
      if (error instanceof PaymentError) throw error;
      throw new PaymentError('Failed to create order', 'ORDER_CREATE_FAILED', 'server', { error });
    }
  }
  
  /**
   * Create payment intent for PayMe or FPS
   */
  static async createPaymentIntent(
    orderId: string,
    paymentMethod: PaymentMethod
  ): Promise<PaymentIntent> {
    try {
      // Get order details
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();
      
      if (orderError || !order) {
        throw new PaymentError('Order not found', 'ORDER_NOT_FOUND', 'validation');
      }
      
      // Create payment transaction
      const { data: transaction, error: transactionError } = await supabase
        .from('payment_transactions')
        .insert({
          order_id: orderId,
          amount: order.total_amount,
          currency: order.currency,
          status: 'pending',
          payment_method: paymentMethod.provider
        })
        .select()
        .single();
      
      if (transactionError) {
        throw new PaymentError('Failed to create payment transaction', 'TRANSACTION_CREATE_FAILED', 'server', { error: transactionError });
      }
      
      // Generate payment intent based on payment method
      const paymentIntent: PaymentIntent = {
        id: transaction.id,
        amount: order.total_amount,
        currency: order.currency
      };
      
      switch (paymentMethod.provider) {
        case 'payme':
          paymentIntent.payment_url = `https://payme.hsbc/liuhang`;
          paymentIntent.qr_code = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==`; // Placeholder QR code
          paymentIntent.instructions = {
            zh: `請使用 PayMe 完成付款\n\n1. 點擊下方按鈕或前往: https://payme.hsbc/liuhang\n2. 輸入金額: HK$${order.total_amount}\n3. 在備註欄填寫: ${order.order_number}\n4. 完成付款後，請截圖付款確認頁面\n5. 將截圖發送給我們以確認付款\n\n參考編號: ${order.order_number}`,
            en: `Please complete payment using PayMe\n\n1. Click the button below or go to: https://payme.hsbc/liuhang\n2. Enter amount: HK$${order.total_amount}\n3. Add reference in remarks: ${order.order_number}\n4. After payment, please screenshot the confirmation page\n5. Send us the screenshot to confirm payment\n\nReference: ${order.order_number}`
          };
          break;
          
        case 'fps':
          paymentIntent.payment_url = `fps://transfer?phone=56606161&amount=${order.total_amount}&reference=${order.order_number}`;
          paymentIntent.instructions = {
            zh: `請使用轉數快 (FPS) 完成付款\n\n收款電話號碼: 5660 6161\n金額: HK$${order.total_amount}\n備註: ${order.order_number}\n\n付款步驟:\n1. 開啟銀行應用程式\n2. 選擇轉數快付款\n3. 輸入電話號碼: 5660 6161\n4. 輸入金額: HK$${order.total_amount}\n5. 在備註欄填寫: ${order.order_number}\n6. 完成付款後，請截圖付款確認頁面\n7. 將截圖發送給我們以確認付款`,
            en: `Please complete payment using FPS\n\nPayee Phone: 5660 6161\nAmount: HK$${order.total_amount}\nReference: ${order.order_number}\n\nPayment Steps:\n1. Open your banking app\n2. Select FPS payment\n3. Enter phone number: 5660 6161\n4. Enter amount: HK$${order.total_amount}\n5. Add reference in remarks: ${order.order_number}\n6. After payment, please screenshot the confirmation page\n7. Send us the screenshot to confirm payment`
          };
          break;
          
        default:
          throw new PaymentError('Unsupported payment method', 'UNSUPPORTED_PAYMENT_METHOD', 'validation');
      }
      
      return paymentIntent;
    } catch (error) {
      if (error instanceof PaymentError) throw error;
      throw new PaymentError('Failed to create payment intent', 'PAYMENT_INTENT_FAILED', 'server', { error });
    }
  }
  
  /**
   * Process payment completion
   */
  static async processPaymentCompletion(
    orderId: string,
    transactionId: string
  ): Promise<CourseEnrollment> {
    try {
      // Update order status to paid
      const { error: orderUpdateError } = await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('id', orderId);
      
      if (orderUpdateError) {
        throw new PaymentError('Failed to update order status', 'ORDER_UPDATE_FAILED', 'server', { error: orderUpdateError });
      }
      
      // Update transaction status to completed
      const { error: transactionUpdateError } = await supabase
        .from('payment_transactions')
        .update({ 
          status: 'completed',
          transaction_id: transactionId
        })
        .eq('order_id', orderId);
      
      if (transactionUpdateError) {
        throw new PaymentError('Failed to update transaction status', 'TRANSACTION_UPDATE_FAILED', 'server', { error: transactionUpdateError });
      }
      
      // Get order details for enrollment
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();
      
      if (orderError || !order) {
        throw new PaymentError('Order not found', 'ORDER_NOT_FOUND', 'validation');
      }
      
      // Create course enrollment
      const { data: enrollment, error: enrollmentError } = await supabase
        .from('course_enrollments')
        .insert({
          user_id: order.user_id,
          course_id: order.course_id,
          order_id: orderId,
          status: 'active',
          access_level: 'premium'
        })
        .select()
        .single();
      
      if (enrollmentError) {
        throw new PaymentError('Failed to create enrollment', 'ENROLLMENT_CREATE_FAILED', 'server', { error: enrollmentError });
      }
      
      return enrollment;
    } catch (error) {
      if (error instanceof PaymentError) throw error;
      throw new PaymentError('Failed to process payment completion', 'PAYMENT_COMPLETION_FAILED', 'server', { error });
    }
  }
  
  /**
   * Check if user has access to a course
   */
  static async checkCourseAccess(
    userId: string,
    courseId: string
  ): Promise<boolean> {
    try {
      const { data: enrollment, error } = await supabase
        .from('course_enrollments')
        .select('status')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .eq('status', 'active')
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw new PaymentError('Failed to check course access', 'ORDER_UPDATE_FAILED', 'server', { error });
      }
      
      return !!enrollment;
    } catch (error) {
      if (error instanceof PaymentError) throw error;
      throw new PaymentError('Failed to check course access', 'ACCESS_CHECK_FAILED', 'server', { error });
    }
  }
  
  /**
   * Get available payment methods
   */
  static async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      const { data: methods, error } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      
      if (error) {
        throw new PaymentError('Failed to get payment methods', 'METHODS_FETCH_FAILED', 'server', { error });
      }
      
      return methods || [];
    } catch (error) {
      if (error instanceof PaymentError) throw error;
      throw new PaymentError('Failed to get payment methods', 'METHODS_FETCH_FAILED', 'server', { error });
    }
  }
  
  /**
   * Validate discount code
   */
  private static async validateDiscountCode(
    code: string,
    amount: number
  ): Promise<{ discount_value: number } | null> {
    try {
      const { data: discount, error } = await supabase
        .from('discount_codes')
        .select('*')
        .eq('code', code)
        .eq('is_active', true)
        .gte('valid_from', new Date().toISOString())
        .lte('valid_until', new Date().toISOString())
        .single();
      
      if (error || !discount) return null;
      
      // Check usage limit
      if (discount.usage_limit && discount.used_count >= discount.usage_limit) return null;
      
      // Check minimum amount
      if (discount.min_amount && amount < discount.min_amount) return null;
      
      // Calculate discount value
      let discountValue = 0;
      if (discount.discount_type === 'percentage') {
        discountValue = (amount * discount.discount_value) / 100;
        if (discount.max_discount) {
          discountValue = Math.min(discountValue, discount.max_discount);
        }
      } else {
        discountValue = discount.discount_value;
      }
      
      return { discount_value: discountValue };
    } catch (error) {
      console.error('Discount code validation error:', error);
      return null;
    }
  }
} 