import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { CreditCard, Clock, Calendar, Receipt, ExternalLink, AlertCircle } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

// Validate Stripe public key
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
if (!stripePublicKey) {
  console.error('Missing Stripe public key');
}

// Initialize Stripe with error handling
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  status: 'succeeded' | 'failed' | 'pending';
}

interface SubscriptionDetailsProps {
  subscription: {
    plan: string;
    status: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
    amount: number;
    interval: 'month' | 'year';
  };
  paymentHistory: PaymentHistory[];
}

export function SubscriptionDetails({ subscription, paymentHistory }: SubscriptionDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isStripeReady, setIsStripeReady] = useState(false);

  useEffect(() => {
    // Check if Stripe is properly initialized
    if (!stripePromise) {
      setError('Payment system is not properly configured');
      return;
    }
    setIsStripeReady(true);
  }, []);

  const handleManageSubscription = async () => {
    if (!isStripeReady) {
      setError('Payment system is not available');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        throw new Error('API URL is not configured');
      }

      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Authentication required');
      }

      // Create a Checkout Session
      const response = await fetch(`${apiUrl}/create-portal-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to create portal session');
      }

      const { url } = await response.json();
      if (!url) {
        throw new Error('Invalid response from server');
      }
      
      // Redirect to Stripe Portal
      window.location.href = url;
    } catch (err) {
      console.error('Stripe error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load billing portal');
    } finally {
      setIsLoading(false);
    }
  };

  // Rest of the component remains the same...
  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
            <p className="text-sm text-gray-500">Manage your subscription and billing</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {subscription.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
            <CreditCard className="h-5 w-5 text-purple-600" />
            <div>
              <p className="font-medium text-purple-900">{subscription.plan}</p>
              <p className="text-sm text-purple-700">
                ${subscription.amount}/{subscription.interval}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <Calendar className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">Next Payment</p>
              <p className="text-sm text-blue-700">
                {format(new Date(subscription.currentPeriodEnd), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
        </div>

        {subscription.cancelAtPeriodEnd && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-lg flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-800 font-medium">Subscription Ending</p>
              <p className="text-sm text-yellow-700">
                Your subscription will end on {format(new Date(subscription.currentPeriodEnd), 'MMMM d, yyyy')}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={handleManageSubscription}
            disabled={isLoading || !isStripeReady}
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <Clock className="animate-spin h-5 w-5" />
            ) : (
              <>
                <CreditCard className="h-5 w-5" />
                <span>Manage Subscription</span>
              </>
            )}
          </button>
          {error && (
            <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </p>
          )}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
            <p className="text-sm text-gray-500">View your recent payments</p>
          </div>
          <Receipt className="h-5 w-5 text-gray-400" />
        </div>

        <div className="space-y-4">
          {paymentHistory.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  payment.status === 'succeeded' ? 'bg-green-500' :
                  payment.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                }`} />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    ${payment.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(payment.date), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <span className={`text-sm ${
                payment.status === 'succeeded' ? 'text-green-600' :
                payment.status === 'failed' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleManageSubscription}
          disabled={!isStripeReady}
          className="mt-6 inline-flex items-center space-x-2 text-sm text-purple-600 hover:text-purple-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>View all transactions</span>
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}