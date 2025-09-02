/**
 * Payment Admin Panel
 * @fileoverview Admin interface for managing payments and granting course access
 * Only accessible by aiformula00@gmail.com
 * @author AI Formula Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  CreditCard, 
  Eye,
  UserCheck,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import Navigation from '@/components/Navigation';

interface PaymentRecord {
  id: string;
  order_reference: string;
  user_email: string | null;
  course_id: string;
  amount: number;
  payment_method: string;
  status: 'pending' | 'verified' | 'rejected';
  screenshot_received: boolean;
  access_granted: boolean;
  notes: string | null;
  created_at: string;
  verified_at: string | null;
}

const PaymentAdmin: React.FC = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  // Check if user is authorized admin
  const isAuthorized = user?.email === 'aiformula00@gmail.com';

  useEffect(() => {
    if (isAuthorized) {
      loadPayments();
    }
  }, [isAuthorized]);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('payment_records')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error('Error loading payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentStatus = async (id: string, status: 'verified' | 'rejected', notes?: string) => {
    try {
      setUpdating(id);
      
      const updateData: any = {
        status,
        verified_at: status === 'verified' ? new Date().toISOString() : null,
        access_granted: status === 'verified' ? true : false,
        notes: notes || null
      };

      const { error } = await supabase
        .from('payment_records')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      // If verified, also grant course access
      if (status === 'verified') {
        await grantCourseAccess(id);
        alert('Payment verified and course access granted successfully!');
      } else if (status === 'rejected') {
        alert('Payment has been rejected.');
      }

      await loadPayments();
    } catch (error) {
      console.error('Error updating payment:', error);
      alert('Failed to update payment status');
    } finally {
      setUpdating(null);
    }
  };

  const grantCourseAccess = async (paymentId: string) => {
    try {
      console.log('Granting course access for payment:', paymentId);
      
      // Get payment record details
      const { data: payment, error: paymentError } = await supabase
        .from('payment_records')
        .select('*')
        .eq('id', paymentId)
        .single();

      if (paymentError || !payment) {
        console.error('Error getting payment record:', paymentError);
        throw paymentError;
      }

      console.log('Payment record found:', payment);

             // Update payment record to mark access as granted
       const { error: updateError } = await supabase
         .from('payment_records')
         .update({ 
           access_granted: true,
           status: 'verified',
           verified_at: new Date().toISOString()
         })
         .eq('id', paymentId);

      if (updateError) {
        console.error('Error updating payment record:', updateError);
        throw updateError;
      }

      console.log('Payment record updated successfully');

      // For access passes, create course_access records
      if (payment.course_id === 'all-access' || payment.course_id === 'half-access') {
        // Get user ID from email (if user exists)
        const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
        
        if (!userError && userData?.users) {
          const targetUser = userData.users.find(u => u.email === payment.user_email);
          
          if (targetUser) {
            // Create course_access record for the access level
            const { error: accessError } = await supabase
              .from('course_access')
              .insert({
                user_id: targetUser.id,
                course_id: payment.course_id,
                access_level: payment.course_id, // 'all-access' or 'half-access'
                payment_record_id: paymentId
              });

            if (accessError) {
              console.error('Error creating course access:', accessError);
              // Don't throw error, payment is still verified
            } else {
              console.log('Course access created for access level:', payment.course_id);
            }
          }
        }
      }

      // Note: For individual courses, we'll handle course_access creation when the user actually logs in
      // The useCourseAccess hook will check payment_records table for verified payments
      
    } catch (error) {
      console.error('Error granting course access:', error);
      throw error;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-600"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'verified':
        return <Badge className="bg-green-600"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>;
      case 'rejected':
        return <Badge className="bg-red-600"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge className="bg-gray-600">Unknown</Badge>;
    }
  };

  const getPaymentMethodBadge = (method: string) => {
    switch (method) {
      case 'payme':
        return <Badge variant="outline" className="text-blue-400 border-blue-400">PayMe</Badge>;
      case 'fps':
        return <Badge variant="outline" className="text-green-400 border-green-400">FPS</Badge>;
      default:
        return <Badge variant="outline">{method}</Badge>;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Authentication Required</h1>
          <p className="text-gray-400">Please log in to access the admin panel.</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-gray-400">You are not authorized to access this admin panel.</p>
          <p className="text-sm text-gray-500 mt-2">Current user: {user.email}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Payment Administration</h1>
            <p className="text-gray-400">Manage course payments and grant access</p>
          </div>
          <Button 
            onClick={loadPayments}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-gray-400">Loading payments...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {payments.length === 0 ? (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8 text-center">
                  <CreditCard className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">No payment records found.</p>
                </CardContent>
              </Card>
            ) : (
              payments.map((payment) => (
                <Card key={payment.id} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-white">
                        Order: {payment.order_reference}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(payment.status)}
                        {getPaymentMethodBadge(payment.payment_method)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">
                            {payment.user_email || 'No email provided'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Eye className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">Course: {payment.course_id}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">Amount: HK${payment.amount}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-400">
                          Created: {new Date(payment.created_at).toLocaleString()}
                        </div>
                        {payment.verified_at && (
                          <div className="text-sm text-gray-400">
                            Verified: {new Date(payment.verified_at).toLocaleString()}
                          </div>
                        )}
                        <div className="flex items-center gap-4 text-sm">
                          <span className={`flex items-center gap-1 ${payment.access_granted ? 'text-green-400' : 'text-gray-400'}`}>
                            <UserCheck className="w-3 h-3" />
                            Access {payment.access_granted ? 'Granted' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {payment.notes && (
                      <div className="bg-gray-700 rounded p-3">
                        <p className="text-sm text-gray-300">
                          <strong>Notes:</strong> {payment.notes}
                        </p>
                      </div>
                    )}

                    {payment.status === 'pending' && (
                      <div className="flex gap-2 pt-4 border-t border-gray-700">
                        <Button
                          onClick={() => updatePaymentStatus(payment.id, 'verified', 'Payment verified and access granted')}
                          disabled={updating === payment.id}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Verify & Grant Access
                        </Button>
                        <Button
                          onClick={() => updatePaymentStatus(payment.id, 'rejected', 'Payment rejected')}
                          disabled={updating === payment.id}
                          variant="destructive"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentAdmin; 