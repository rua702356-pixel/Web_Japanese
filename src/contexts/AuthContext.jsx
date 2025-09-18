import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS, MOCK_PASSWORDS } from '../lib/constants';

const AuthContext = createContext(undefined);

// Mock user database for demo purposes
const mockUsers = MOCK_USERS;

// Mock password database (in real app, passwords would be hashed)
const mockPasswords = MOCK_PASSWORDS;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const savedUser = localStorage.getItem('auth_user');
        const savedToken = localStorage.getItem('auth_token');
        
        if (savedUser && savedToken) {
          const userData = JSON.parse(savedUser);
          
          // Validate user data structure
          if (userData && userData.id && userData.email) {
            setUser(userData);
            console.log('User session restored:', userData.username);
          } else {
            // Invalid user data, clear storage
            localStorage.removeItem('auth_user');
            localStorage.removeItem('auth_token');
            console.log('Invalid user data found, cleared storage');
          }
        } else {
          console.log('No valid session found');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
      } finally {
        setIsLoading(false);
      }
    };

    // Add a small delay to prevent flashing
    const timeoutId = setTimeout(checkAuthStatus, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!foundUser) {
        return {
          success: false,
          message: 'Không tìm thấy tài khoản với email này'
        };
      }
      
      // Check password
      const correctPassword = mockPasswords[foundUser.email];
      if (password !== correctPassword) {
        return {
          success: false,
          message: 'Mật khẩu không chính xác'
        };
      }
      
      // Generate mock token
      const token = `mock_token_${foundUser.id}_${Date.now()}`;
      
      // Save to localStorage with additional metadata
      const authData = {
        user: foundUser,
        timestamp: Date.now(),
        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };
      
      localStorage.setItem('auth_user', JSON.stringify(foundUser));
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_timestamp', authData.timestamp.toString());
      
      setUser(foundUser);
      
      console.log('User logged in successfully:', foundUser.username);
      
      return {
        success: true,
        message: 'Đăng nhập thành công!',
        user: foundUser
      };
    } catch (error) {
      return {
        success: false,
        message: 'Có lỗi xảy ra khi đăng nhập'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if email already exists
      const existingUser = mockUsers.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
      if (existingUser) {
        return {
          success: false,
          message: 'Email này đã được đăng ký'
        };
      }
      
      // Check if username already exists
      const existingUsername = mockUsers.find(u => u.username.toLowerCase() === userData.username.toLowerCase());
      if (existingUsername) {
        return {
          success: false,
          message: 'Tên đăng nhập này đã được sử dụng'
        };
      }
      
      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        username: userData.username,
        email: userData.email,
        fullName: userData.fullName,
        role: 'user',
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      // Add to mock database
      mockUsers.push(newUser);
      mockPasswords[newUser.email] = userData.password;
      
      // Generate mock token
      const token = `mock_token_${newUser.id}_${Date.now()}`;
      
      // Save to localStorage with metadata
      const authData = {
        user: newUser,
        timestamp: Date.now(),
        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };
      
      localStorage.setItem('auth_user', JSON.stringify(newUser));
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_timestamp', authData.timestamp.toString());
      
      setUser(newUser);
      
      console.log('User registered successfully:', newUser.username);
      
      return {
        success: true,
        message: 'Đăng ký thành công!',
        user: newUser
      };
    } catch (error) {
      return {
        success: false,
        message: 'Có lỗi xảy ra khi đăng ký'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      // Clear all auth data
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_remember');
      
      // Clear any other session data
      sessionStorage.clear();
      
      // Reset user state
      setUser(null);
      
      console.log('User successfully logged out');
    } catch (error) {
      console.error('Error during logout:', error);
      // Force clear user state even if localStorage fails
      setUser(null);
    }
  };

  const updateProfile = async (data) => {
    if (!user) {
      return {
        success: false,
        message: 'Người dùng chưa đăng nhập'
      };
    }

    try {
      const updatedUser = { ...user, ...data };
      
      // Update in mock database
      const userIndex = mockUsers.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = updatedUser;
      }
      
      // Update localStorage
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return {
        success: true,
        message: 'Cập nhật thông tin thành công'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Có lỗi xảy ra khi cập nhật thông tin'
      };
    }
  };

  const checkAdminAccess = () => {
    return !!user && user.role === 'admin';
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isAdmin: !!user && user.role === 'admin',
    login,
    register,
    logout,
    updateProfile,
    checkAdminAccess
  };

  return (
    <AuthContext.Provider value={value}>
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

export default AuthContext;