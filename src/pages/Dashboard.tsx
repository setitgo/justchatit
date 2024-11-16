import { useNavigate } from 'react-router-dom';
import { MessageSquare, LogOut, LifeBuoy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SubscriptionDetails } from '../components/SubscriptionDetails';

// Mock data - In a real app, this would come from your API
const mockSubscription = {
  plan: 'Professional Plan',
  status: 'active',
  currentPeriodEnd: '2024-04-30T00:00:00Z',
  cancelAtPeriodEnd: false,
  amount: 99,
  interval: 'month' as const,
};

const mockPaymentHistory = [
  {
    id: '1',
    date: '2024-03-01T00:00:00Z',
    amount: 99,
    status: 'succeeded' as const,
  },
  {
    id: '2',
    date: '2024-02-01T00:00:00Z',
    amount: 99,
    status: 'succeeded' as const,
  },
  {
    id: '3',
    date: '2024-01-01T00:00:00Z',
    amount: 99,
    status: 'succeeded' as const,
  },
];

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                JustChatIt
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Subscription Details */}
        <SubscriptionDetails 
          subscription={mockSubscription}
          paymentHistory={mockPaymentHistory}
        />

        {/* Support Contact Form */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <LifeBuoy className="h-5 w-5 text-purple-600" />
            <h2 className="text-lg font-semibold">Contact Support</h2>
          </div>
          <form className="space-y-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="How can we help you?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe your issue or question..."
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}