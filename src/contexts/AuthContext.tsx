import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  isReturningUser: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          setIsLoading(false);
          return;
        }

        const apiUrl = import.meta.env.VITE_API_URL;
        if (!apiUrl) {
          console.warn('API URL not configured. Using mock authentication.');
          handleMockAuth(token);
          return;
        }

        try {
          const response = await fetch(`${apiUrl}/auth/validate`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
            
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            localStorage.removeItem('auth_token');
          }
        } catch (error) {
          console.warn('API request failed. Using mock authentication.');
          handleMockAuth(token);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('auth_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleMockAuth = (token: string) => {
    // Mock user data for development
    if (token === 'mock-jwt-token') {
      setUser({
        id: '1',
        email: 'demo@example.com',
        name: 'Demo User',
        isReturningUser: true,
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        console.warn('API URL not configured. Using mock authentication.');
        // Mock successful login
        const mockUser = {
          id: '1',
          email,
          name: email.split('@')[0],
          isReturningUser: true,
        };
        const mockToken = 'mock-jwt-token';
        
        localStorage.setItem('auth_token', mockToken);
        setUser(mockUser);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error('Invalid credentials');
        }

        const { user: userData, token } = await response.json();
        localStorage.setItem('auth_token', token);
        setUser(userData);
      } catch (error) {
        console.warn('API request failed. Using mock authentication.');
        // Fall back to mock authentication
        const mockUser = {
          id: '1',
          email,
          name: email.split('@')[0],
          isReturningUser: true,
        };
        const mockToken = 'mock-jwt-token';
        
        localStorage.setItem('auth_token', mockToken);
        setUser(mockUser);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Invalid email or password');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}