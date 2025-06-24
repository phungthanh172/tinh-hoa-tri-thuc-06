
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useBehaviorTracking } from '@/hooks/useBehaviorTracking';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  hasRole: (role: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample accounts for testing
const SAMPLE_ACCOUNTS: Record<string, { password: string; user: User }> = {
  'student@example.com': {
    password: 'student123',
    user: {
      id: '1',
      email: 'student@example.com',
      name: 'John Student',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    }
  },
  'instructor@example.com': {
    password: 'instructor123',
    user: {
      id: '2',
      email: 'instructor@example.com',
      name: 'Sarah Instructor',
      role: 'instructor',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
    }
  },
  'admin@example.com': {
    password: 'admin123',
    user: {
      id: '3',
      email: 'admin@example.com',
      name: 'Mike Admin',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    }
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setCookie, getCookie, removeCookie } = useBehaviorTracking();

  useEffect(() => {
    // Check for stored session on app load
    const storedUser = getCookie('auth_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        removeCookie('auth_user');
      }
    }
    setIsLoading(false);
  }, [getCookie, removeCookie]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const account = SAMPLE_ACCOUNTS[email.toLowerCase()];
    
    if (account && account.password === password) {
      setUser(account.user);
      setCookie('auth_user', JSON.stringify(account.user), { expires: 7 }); // 7 days
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    removeCookie('auth_user');
  };

  const hasRole = (role: string | string[]): boolean => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoading,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
