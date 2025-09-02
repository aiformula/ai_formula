/**
 * Payment System Types
 * @fileoverview TypeScript interfaces for the payment system
 * @author AI Formula Team
 * @version 1.0.0
 */

export interface PaymentMethod {
  id: number;
  name: string;
  display_name_zh: string;
  display_name_en: string;
  provider: 'payme' | 'fps';
  is_active: boolean;
  config?: Record<string, any>;
  sort_order: number;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  course_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  payment_method_id: number;
  created_at: string;
  updated_at: string;
  total_amount: number;
  discount_amount: number;
  discount_code?: string;
}

export interface PaymentTransaction {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: string;
  transaction_id?: string;
  payment_url?: string;
  qr_code?: string;
  instructions?: {
    zh: string;
    en: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CourseEnrollment {
  id: string;
  user_id: string;
  course_id: string;
  order_id: string;
  enrollment_date: string;
  status: 'active' | 'expired' | 'cancelled';
  access_level: 'basic' | 'premium' | 'enterprise';
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  payment_url?: string;
  qr_code?: string;
  instructions?: {
    zh: string;
    en: string;
  };
}

export interface CourseAccessResult {
  has_access: boolean;
  enrollment_status?: 'active' | 'expired' | 'cancelled';
  access_level?: 'basic' | 'premium' | 'enterprise';
  expires_at?: string;
  enrollment_date?: string;
}

export class PaymentError extends Error {
  code?: string;
  type?: 'validation' | 'payment' | 'network' | 'server';
  details?: Record<string, any>;
  
  constructor(message: string, code?: string, type?: 'validation' | 'payment' | 'network' | 'server', details?: Record<string, any>) {
    super(message);
    this.name = 'PaymentError';
    this.code = code;
    this.type = type;
    this.details = details;
  }
}

export type PaymentProvider = 'payme' | 'fps';

export interface DiscountCode {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_amount?: number;
  max_discount?: number;
  usage_limit?: number;
  used_count: number;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
  created_at: string;
} 