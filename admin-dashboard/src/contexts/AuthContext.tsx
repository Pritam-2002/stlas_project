
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (id: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for existing auth on initial load
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(true);
    }
  }, []);

  const login = async (id: string, password: string) => {
    // Mock login - replace with real authentication
    if (id === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem('adminToken', 'mock-token');
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/admin/login');
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && location.pathname.startsWith('/admin') && location.pathname !== '/admin/login') {
      navigate('/admin/login');
    }
  }, [isAuthenticated, location, navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
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

// Protected Route component
export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    } else if (!isAdmin && location.pathname.startsWith('/admin')) {
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, navigate, location]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
