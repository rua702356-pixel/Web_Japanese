import { Home, BookOpen, Globe, Target, BarChart3, GraduationCap, User, Menu, X, Shield, LogOut, UserPlus, AlertCircle, ChevronDown, FileText, Brain } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, isAuthenticated, isAdmin, logout: authLogout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const navItems = [
    { name: "Trang chủ", href: "/", icon: Home, color: "text-blue-500" },
    { name: "Bài học", href: "/lessons", icon: BookOpen, color: "text-emerald-500" },
    { name: "Từ điển", href: "/dictionary", icon: Globe, color: "text-purple-500" },
    { name: "Luyện tập", href: "/flashcards", icon: Brain, color: "text-orange-500" },
    { name: "Kiểm tra", href: "/quiz", icon: Target, color: "text-red-500" },
    { name: "Tiến độ", href: "/progress", icon: BarChart3, color: "text-indigo-500" },
    { name: "JLPT", href: "/jlpt", icon: GraduationCap, color: "text-pink-500" },
  ];

  // Check if user is active and authenticated
  const isUserLoggedIn = isAuthenticated && user;
  
  // Enhanced logout function with confirmation and feedback
  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    const confirmLogout = window.confirm(
      "Đăng xuất khỏi tài khoản? Bạn sẽ cần đăng nhập lại để truy cập các tính năng."
    );
    
    if (!confirmLogout) return;
    
    try {
      setIsLoggingOut(true);
      
      // Perform logout
      authLogout();
      
      // Close mobile menu if open
      setIsMenuOpen(false);
      
      // Show success message
      toast({
        title: "Đăng xuất thành công",
        description: "Bạn đã đăng xuất khỏi hệ thống",
        variant: "default"
      });
      
      // Redirect to home page
      navigate("/", { replace: true });
      
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Lỗi đăng xuất",
        description: "Có lỗi xảy ra khi đăng xuất. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const getUserInitials = () => {
    if (!user) return "?";
    if (user.fullName) {
      const names = user.fullName.split(" ");
      if (names.length >= 2) {
        return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
      }
      return user.fullName.charAt(0).toUpperCase();
    }
    return user.username?.charAt(0).toUpperCase() || "?";
  };

  const getUserDisplayName = () => {
    if (!user) return "";
    return user.fullName || user.username || "User";
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-icon">
              <span>日</span>
            </div>
            <span className="navbar-logo-text">
              Nihongo Hub
            </span>
          </Link>

          {/* Desktop Navigation - Only show for authenticated users */}
          <div className="navbar-nav">
            {isUserLoggedIn && navItems.map((item) => {
              const ItemIcon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`navbar-nav-item ${
                    isActive(item.href) ? 'navbar-nav-item--active' : ''
                  }`}
                >
                  <ItemIcon className={`w-4 h-4 ${item.color}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            {/* Admin Link - Only visible to admins */}
            {isUserLoggedIn && isAdmin && (
              <Link
                to="/admin"
                className={`navbar-nav-item text-primary ${
                  location.pathname.startsWith('/admin') ? 'navbar-nav-item--active' : ''
                }`}
                title="Admin Panel"
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="navbar-actions">
            {isUserLoggedIn ? (
              <div className="flex items-center space-x-3">
                {/* User Profile */}
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  title={`Profile: ${getUserDisplayName()}`}
                >
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary-foreground">
                      {getUserInitials()}
                    </span>
                  </div>
                  <span className="hidden md:inline">{getUserDisplayName()}</span>
                </Link>
                
                {/* Admin Button with Simple Dropdown */}
                {isAdmin && (
                  <div className="relative">
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                      onBlur={() => setTimeout(() => setIsAdminDropdownOpen(false), 150)}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Admin
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </button>
                    {isAdminDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                        <Link 
                          to="/admin" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAdminDropdownOpen(false)}
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Tổng quan Admin
                        </Link>
                        <div className="border-t border-gray-100"></div>
                        <Link 
                          to="/admin/vocabulary" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAdminDropdownOpen(false)}
                        >
                          <BookOpen className="w-4 h-4 mr-2 text-emerald-500" />
                          Quản lý từ vựng
                        </Link>
                        <Link 
                          to="/admin/grammar" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAdminDropdownOpen(false)}
                        >
                          <FileText className="w-4 h-4 mr-2 text-purple-500" />
                          Quản lý ngữ pháp
                        </Link>
                        <Link 
                          to="/admin/alphabet" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAdminDropdownOpen(false)}
                        >
                          <Globe className="w-4 h-4 mr-2 text-blue-500" />
                          Quản lý bảng chữ cái
                        </Link>
                        <Link 
                          to="/admin/quiz" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAdminDropdownOpen(false)}
                        >
                          <Target className="w-4 h-4 mr-2 text-red-500" />
                          Quản lý quiz
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Logout Button */}
                <button
                  className="btn btn-ghost btn-sm text-muted-foreground hover:text-foreground"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button className="btn btn-ghost btn-sm">
                  <Link to="/login" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Đăng nhập
                  </Link>
                </button>
                <button className="btn btn-primary btn-sm">
                  <Link to="/register" className="flex items-center">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Đăng ký
                  </Link>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="btn btn-ghost navbar-mobile-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="navbar-mobile-menu">
            <div className="navbar-mobile-content">
              {/* User Info for Mobile */}
              {isUserLoggedIn && (
                <div className="navbar-mobile-user">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                      {getUserInitials()}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{getUserDisplayName()}</div>
                    <div className="text-sm text-muted-foreground">
                      {isAdmin ? 'Admin' : 'Học viên'}
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Navigation Links */}
              <div className="navbar-mobile-nav">
                {(isUserLoggedIn ? navItems : []).map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`navbar-mobile-nav-item ${
                        isActive(item.href) ? 'navbar-mobile-nav-item--active' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <ItemIcon className={`w-5 h-5 ${item.color}`} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}

                {/* Admin Links for Mobile */}
                {isUserLoggedIn && isAdmin && (
                  <>
                    <div className="navbar-mobile-divider" />
                    <div className="navbar-mobile-section-title">
                      <Shield className="w-4 h-4" />
                      Quản trị
                    </div>
                    <Link
                      to="/admin"
                      className={`navbar-mobile-nav-item ${
                        location.pathname === '/admin' ? 'navbar-mobile-nav-item--active' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Shield className="w-5 h-5 text-primary" />
                      <span>Tổng quan Admin</span>
                    </Link>
                    <Link
                      to="/admin/vocabulary"
                      className={`navbar-mobile-nav-item ${
                        location.pathname === '/admin/vocabulary' ? 'navbar-mobile-nav-item--active' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <BookOpen className="w-5 h-5 text-emerald-500" />
                      <span>Quản lý từ vựng</span>
                    </Link>
                    <Link
                      to="/admin/grammar"
                      className={`navbar-mobile-nav-item ${
                        location.pathname === '/admin/grammar' ? 'navbar-mobile-nav-item--active' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FileText className="w-5 h-5 text-purple-500" />
                      <span>Quản lý ngữ pháp</span>
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Actions */}
              <div className="navbar-mobile-actions">
                {isUserLoggedIn ? (
                  <button
                    className="btn btn-outline w-full"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    disabled={isLoggingOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button className="btn btn-outline w-full">
                      <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Đăng nhập
                      </Link>
                    </button>
                    <button className="btn btn-primary w-full">
                      <Link to="/register" onClick={() => setIsMenuOpen(false)} className="flex items-center">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Đăng ký
                      </Link>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;