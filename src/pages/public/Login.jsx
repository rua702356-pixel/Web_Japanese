import React, { useState, useEffect } from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  LogIn,
  ArrowLeft,
  Loader2,
  UserPlus,

  X
} from 'lucide-react';
import '../../styles/components/login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    username: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email hoặc tên đăng nhập là bắt buộc';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 3) {
      newErrors.password = 'Mật khẩu phải có ít nhất 3 ký tự';
    }

    // Confirm password validation for signup
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
    }

    // Full name validation for signup
    if (!isLogin && !formData.fullName) {
      newErrors.fullName = 'Họ và tên là bắt buộc';
    }

    // Username validation for signup
    if (!isLogin && !formData.username) {
      newErrors.username = 'Tên đăng nhập là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      if (isLogin) {
        // Login logic
        const result = await login(formData.email, formData.password);

        if (result.success) {
          toast({
            title: 'Đăng nhập thành công!',
            description: `Chào mừng ${result.user?.fullName}`,
            variant: 'default'
          });

          // Role-based redirection
          if (result.user?.role === 'admin') {
            navigate('/admin', { replace: true });
          } else {
            navigate('/dashboard', { replace: true });
          }
        } else {
          setErrors({
            general: result.message
          });
          toast({
            title: 'Đăng nhập thất bại',
            description: result.message,
            variant: 'destructive'
          });
        }
      } else {
        // Signup logic (simplified for demo)
        toast({
          title: 'Tài khoản đã được tạo!',
          description: 'Tài khoản của bạn đã được tạo thành công',
          variant: 'default'
        });
        // Switch to login after signup
        setIsLogin(true);
      }
    } catch (error) {
      setErrors({
        general: 'Có lỗi xảy ra. Vui lòng thử lại.'
      });
      toast({
        title: 'Lỗi',
        description: 'Vui lòng thử lại sau',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast({
      title: `Đăng nhập ${provider}`,
      description: `Đang đăng nhập với ${provider}...`,
      variant: 'default'
    });
    // In a real app, this would initiate OAuth flow
  };

  return (
    <div className="login-container">
      <div className="login-content">
        {/* Close button */}
        <button
          className="close-btn"
          onClick={() => navigate('/')}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left side - Form */}
        <div className="login-left">
          <div className="form-container">
            <div className="header">
              <h1 className="title">
                HỌC BÀI MỚI CÙNG<br />
                DUNGMORI NÀO!
              </h1>
              <p className="subtitle">
                Tiếng Nhật khó, đã có Dungmori!<br />
                Hệ sinh thái Nhật ngữ số 1 dành cho người Việt!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="form">
              {/* General error */}
              {errors.general && (
                <div className="error-message">
                  <p>{errors.general}</p>
                </div>
              )}

              {/* Email field */}
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Email hoặc tên đăng nhập"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`input ${errors.email ? 'error' : ''}`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="field-error">{errors.email}</p>
                )}
              </div>

              {/* Password field */}
              <div className="input-group">
                <label htmlFor="password">Mật khẩu</label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`input ${errors.password ? 'error' : ''}`}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="field-error">{errors.password}</p>
                )}
              </div>

              {/* Additional fields for registration */}
              {!isLogin && (
                <>
                  <div className="input-group">
                    <label htmlFor="fullName">Họ và tên</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Nhập họ và tên"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`input ${errors.fullName ? 'error' : ''}`}
                      disabled={isLoading}
                    />
                    {errors.fullName && (
                      <p className="field-error">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="input-group">
                    <label htmlFor="username">Tên đăng nhập</label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Chọn tên đăng nhập"
                      value={formData.username}
                      onChange={handleInputChange}
                      className={`input ${errors.username ? 'error' : ''}`}
                      disabled={isLoading}
                    />
                    {errors.username && (
                      <p className="field-error">{errors.username}</p>
                    )}
                  </div>

                  <div className="input-group">
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Xác nhận mật khẩu"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`input ${errors.confirmPassword ? 'error' : ''}`}
                      disabled={isLoading}
                    />
                    {errors.confirmPassword && (
                      <p className="field-error">{errors.confirmPassword}</p>
                    )}
                  </div>
                </>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isLogin ? 'Đang đăng nhập...' : 'Đang tạo tài khoản...'}
                  </div>
                ) : (
                  isLogin ? 'Đăng nhập' : 'Đăng ký'
                )}
              </button>

              {/* Forgot password link (login only) */}
              {isLogin && (
                <div className="forgot-password">
                  <Link to="/forgot-password" className="link">
                    Quên mật khẩu?
                  </Link>
                </div>
              )}

              {/* Social login */}
              <div className="social-section">
                <div className="divider">
                  <span>Hoặc đăng nhập với</span>
                </div>

                <div className="social-buttons">
                  <button
                    type="button"
                    className="social-btn facebook"
                    onClick={() => handleSocialLogin('Facebook')}
                    disabled={isLoading}
                  >
                    <FaFacebookF className="w-5 h-5" />
                    Facebook
                  </button>

                  <button
                    type="button"
                    className="social-btn google"
                    onClick={() => handleSocialLogin('Google')}
                    disabled={isLoading}
                  >
                    <FcGoogle className="w-5 h-5" />
                    Google
                  </button>

                </div>
              </div>

              {/* Switch between login/register */}
              <div className="switch-mode">
                <p>
                  {isLogin ? 'Bạn chưa có tài khoản? ' : 'Đã có tài khoản? '}
                  <button
                    type="button"
                    className="switch-link"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Branding */}
        <div className="login-right">
          <div className="branding">
            <div className="character">
              <div className="avatar">
                <div className="face">
                  <div className="eyes">
                    <div className="eye"></div>
                    <div className="eye"></div>
                  </div>
                  <div className="smile"></div>
                </div>
              </div>
            </div>

            <div className="brand-text">
              <div className="speech-bubble">
                <p>Hệ sinh thái Nhật<br />Ngữ số 1 dành cho<br />người Việt</p>
              </div>

              <div className="logo-section">
                <h2 className="logo">
                  DUNG<br />MORI
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;