/**
 * Course Access Hook
 * @fileoverview Hook to check user's course access permissions
 * @author AI Formula Team
 * @version 1.0.0
 */

import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export interface CourseAccessResult {
  hasAccess: boolean;
  isPaid: boolean;
  paymentStatus?: 'pending' | 'verified' | 'rejected';
  accessLevel?: 'single' | 'half-access' | 'all-access';
  message?: string;
}

export const useCourseAccess = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAccessLevel = useCallback(async (courseId: string): Promise<CourseAccessResult> => {
    if (!user) {
      return {
        hasAccess: false,
        isPaid: false,
        message: 'Please log in to access course content'
      };
    }

    try {
      setLoading(true);
      setError(null);

      // Check for all-access pass first
      const { data: allAccess } = await supabase
        .from('course_access')
        .select('*')
        .eq('user_id', user.id)
        .eq('access_level', 'all-access')
        .single();

      if (allAccess) {
        return {
          hasAccess: true,
          isPaid: true,
          accessLevel: 'all-access',
          message: 'Full access granted'
        };
      }

      // Check for half-access pass (intermediate courses only)
      const { data: halfAccess } = await supabase
        .from('course_access')
        .select('*')
        .eq('user_id', user.id)
        .eq('access_level', 'half-access')
        .single();

      if (halfAccess) {
        // Check if the requested course is intermediate level
        const intermediateCourses = ['perplexity', 'claude', 'gemini'];
        if (intermediateCourses.includes(courseId)) {
          return {
            hasAccess: true,
            isPaid: true,
            accessLevel: 'half-access',
            message: 'Intermediate access granted'
          };
        } else {
          return {
            hasAccess: false,
            isPaid: false,
            accessLevel: 'half-access',
            message: 'This course requires higher access level'
          };
        }
      }

      // Check payment_records for access passes as fallback
      const { data: paymentRecords, error: paymentError } = await supabase
        .from('payment_records')
        .select('*')
        .eq('user_email', user.email)
        .in('course_id', ['all-access', 'half-access'])
        .eq('status', 'verified')
        .eq('access_granted', true);

      if (!paymentError && paymentRecords && paymentRecords.length > 0) {
        // Check if user has all-access from payment records
        const allAccessPayment = paymentRecords.find(p => p.course_id === 'all-access');
        if (allAccessPayment) {
          return {
            hasAccess: true,
            isPaid: true,
            accessLevel: 'all-access',
            message: 'Full access granted via payment record'
          };
        }

        // Check if user has half-access from payment records
        const halfAccessPayment = paymentRecords.find(p => p.course_id === 'half-access');
        if (halfAccessPayment) {
          const intermediateCourses = ['perplexity', 'claude', 'gemini'];
          if (intermediateCourses.includes(courseId)) {
            return {
              hasAccess: true,
              isPaid: true,
              accessLevel: 'half-access',
              message: 'Intermediate access granted via payment record'
            };
          } else {
            return {
              hasAccess: false,
              isPaid: false,
              accessLevel: 'half-access',
              message: 'This course requires higher access level'
            };
          }
        }
      }

      // Fall back to individual course access check
      return await checkCourseAccess(courseId);
    } catch (error) {
      console.error('Error checking access level:', error);
      setError('Failed to check access level');
      return {
        hasAccess: false,
        isPaid: false,
        message: 'Error checking access'
      };
    } finally {
      setLoading(false);
    }
  }, [user]);

  const checkCourseAccess = useCallback(async (courseId: string): Promise<CourseAccessResult> => {
    if (!user) {
      return {
        hasAccess: false,
        isPaid: false,
        message: 'Please log in to access course content'
      };
    }

    try {
      setLoading(true);
      setError(null);

      // Check if user has course access
      const { data: courseAccess, error: accessError } = await supabase
        .from('course_access')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single();

      if (accessError && accessError.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('Error checking course access:', accessError);
        // Continue to check payment records even if course_access query fails
      }

      // If user has course access, they can access the content
      if (courseAccess) {
        console.log('User has course access:', courseAccess);
        return {
          hasAccess: true,
          isPaid: true,
          message: 'Access granted'
        };
      }

      // Check payment records to see if there's a verified payment
      const { data: paymentRecords, error: paymentError } = await supabase
        .from('payment_records')
        .select('*')
        .eq('user_email', user.email)
        .eq('course_id', courseId)
        .order('created_at', { ascending: false });

      if (paymentError) {
        console.error('Error checking payment records:', paymentError);
        return {
          hasAccess: false,
          isPaid: false,
          message: 'Error checking payment status'
        };
      }

      if (!paymentRecords || paymentRecords.length === 0) {
        return {
          hasAccess: false,
          isPaid: false,
          message: 'No payment found for this course'
        };
      }

      // Check the latest payment record
      const latestPayment = paymentRecords[0];
      console.log('Latest payment record:', latestPayment);

      if (latestPayment.status === 'verified' && latestPayment.access_granted) {
        return {
          hasAccess: true,
          isPaid: true,
          paymentStatus: 'verified',
          message: 'Payment verified, access granted'
        };
      } else if (latestPayment.status === 'pending') {
        return {
          hasAccess: false,
          isPaid: true,
          paymentStatus: 'pending',
          message: 'Payment pending verification. Please wait for admin approval.'
        };
      } else if (latestPayment.status === 'rejected') {
        return {
          hasAccess: false,
          isPaid: false,
          paymentStatus: 'rejected',
          message: 'Payment was rejected. Please contact support.'
        };
      }

      return {
        hasAccess: false,
        isPaid: false,
        message: 'Payment not verified yet'
      };

    } catch (error) {
      console.error('Error in checkCourseAccess:', error);
      setError('Failed to check course access');
      return {
        hasAccess: false,
        isPaid: false,
        message: 'Error checking access'
      };
    } finally {
      setLoading(false);
    }
  }, [user]);

  const checkLessonAccess = useCallback(async (courseId: string, themeId?: string, unitId?: string): Promise<boolean> => {
    const accessResult = await checkCourseAccess(courseId);
    return accessResult.hasAccess;
  }, [checkCourseAccess]);

  return {
    checkCourseAccess,
    checkAccessLevel,
    checkLessonAccess,
    loading,
    error
  };
}; 