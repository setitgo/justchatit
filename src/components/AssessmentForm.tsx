import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormState {
  email: string;
  isSubmitting: boolean;
  error: string;
}

export function AssessmentForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    email: '',
    isSubmitting: false,
    error: ''
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.email) {
      setForm(prev => ({ ...prev, error: 'Email is required' }));
      return;
    }

    if (!validateEmail(form.email)) {
      setForm(prev => ({ ...prev, error: 'Please enter a valid email address' }));
      return;
    }

    setForm(prev => ({ ...prev, isSubmitting: true, error: '' }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/assessment-results');
    } catch (error) {
      setForm(prev => ({ ...prev, error: 'Something went wrong. Please try again.' }));
    } finally {
      setForm(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="assessment-email" className="sr-only">
          Email address
        </label>
        <div className="relative">
          <input
            type="email"
            id="assessment-email"
            className={`w-full px-4 py-3 rounded-lg bg-white/80 backdrop-blur-sm border ${
              form.error ? 'border-red-300' : 'border-purple-300'
            } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            placeholder="Enter your email address"
            value={form.email}
            onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value, error: '' }))}
            disabled={form.isSubmitting}
          />
          {form.error && (
            <p className="absolute -bottom-6 left-0 text-sm text-red-500">
              {form.error}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={form.isSubmitting}
        className="w-full px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {form.isSubmitting ? 'Processing...' : 'Start Free Assessment'}
      </button>
    </form>
  );
}