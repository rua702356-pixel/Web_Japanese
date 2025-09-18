import { useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useActionHandler } from '../hooks/use-action-handler';
import { useSidebar } from '../hooks/use-sidebar';
import { useToast } from '../contexts/ToastContext';
import Navbar from '../components/common/Navbar';
import '../styles/components/admin-layout.css';
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  MessageSquare,
  TestTube,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  Home,
  Bell,
  Search
} from 'lucide-react';

const AdminLayout = ({ children }) => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { executeAction, isLoading } = useActionHandler();
  
  // Debug logging
  console.log('AdminLayout rendered:', { user, isAdmin, location: location.pathname });
  
  // Enhanced sidebar management with improved feedback
  const {
    isOpen: sidebarOpen,
    isClosing,
    closeSidebar,
    handleBackdropClick,
    handleCloseButtonClick,
    handleOpenButtonClick,
    sidebarProps,
    triggerProps,
    backdropProps
  } = useSidebar({
    enableKeyboardShortcuts: true,
    enableClickOutside: true,
    onOpen: () => {
      toast({
        title: '🎌 Menu mở',
        description: 'Sử dụng ESC để đóng hoặc click bên ngoài',
        variant: 'default',
        duration: 2000
      });
    },
    onClose: () => {
      toast({
        title: '👋 Menu đã đóng',
        description: 'Sử dụng Ctrl+B để mở lại nhanh',
        variant: 'default',
        duration: 1500
      });
    }
  });

  // Handle keyboard events for sidebar
  // (Now handled by useSidebar hook)

  // Handle sidebar close with animation
  // (Now handled by useSidebar hook)

  // Handle admin logout with confirmation
  const handleAdminLogout = useCallback(async () => {
    const confirmed = window.confirm(
      'Bạn có chắc chắn muốn đăng xuất khỏi bảng điều khiển admin?'
    );
    
    if (!confirmed) return;

    await executeAction(
      'Đăng xuất admin',
      async () => {
        logout();
        navigate('/', { replace: true });
      },
      {
        successMessage: 'Đã đăng xuất thành công',
        errorMessage: 'Có lỗi xảy ra khi đăng xuất'
      }
    );
  }, [executeAction, logout, navigate]);

  // Handle navigation with feedback
  const handleNavigation = useCallback((href, name) => {
    console.log('Navigation clicked:', { href, name, sidebarOpen });
    
    // Close sidebar on mobile
    if (sidebarOpen) {
      closeSidebar();
    }
    
    try {
      // Navigate to the page
      navigate(href);
      console.log('Navigation successful to:', href);
      
      // Show feedback toast
      toast({
        title: 'Chuyển trang',
        description: `Đã chuyển đến ${name}`,
        variant: 'default',
        duration: 2000
      });
    } catch (error) {
      console.error('Navigation error:', error);
      toast({
        title: 'Lỗi chuyển trang',
        description: 'Không thể chuyển trang. Vui lòng thử lại.',
        variant: 'destructive',
        duration: 3000
      });
    }
  }, [toast, closeSidebar, navigate, sidebarOpen]);

  if (!isAdmin) {
    console.log('Access denied - User is not admin:', { user, isAdmin });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
        <div className="card p-8 text-center max-w-md shadow-2xl border-red-200 dark:border-red-800">
          <div className="animate-bounce">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-red-700 dark:text-red-300">
            Không có quyền truy cập
          </h1>
          <p className="text-muted-foreground mb-6">
            Bạn cần quyền quản trị viên để truy cập trang này.
          </p>
          <div className="space-y-3">
            <button className="btn w-full">
              <Link to="/">Về trang chủ</Link>
            </button>
            <button className="btn btn-outline w-full">
              <Link to="/login">Đăng nhập lại</Link>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const navigation = [
    {
      name: 'Tổng quan',
      href: '/admin',
      icon: LayoutDashboard,
      exact: true
    },
    {
      name: 'Bảng chữ cái',
      href: '/admin/alphabet',
      icon: FileText
    },
    {
      name: 'Ngữ pháp',
      href: '/admin/grammar',
      icon: BookOpen
    },
    {
      name: 'Từ vựng',
      href: '/admin/vocabulary',
      icon: MessageSquare
    },
    {
      name: 'Bài kiểm tra',
      href: '/admin/quiz',
      icon: TestTube
    },
    {
      name: 'Người dùng',
      href: '/admin/users',
      icon: Users
    },
    {
      name: 'Cài đặt',
      href: '/admin/settings',
      icon: Settings
    }
  ];

  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === item.href;
    }
    return location.pathname.startsWith(item.href);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Navigation Header */}
      <header className="page-header">
        <Navbar />
      </header>
      
      {/* Admin Layout Content */}
      <div className="admin-layout flex-grow bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div
            className={`admin-backdrop fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-all duration-400 ${
              isClosing ? 'opacity-0 closing' : 'opacity-100'
            }`}
            onClick={handleBackdropClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                closeSidebar();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Đóng menu"
            style={{
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent'
            }}
            {...backdropProps}
          />
        )}

        {/* Sidebar */}
        <div 
          className={`admin-sidebar
            fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 
            shadow-2xl transform transition-all duration-300 ease-out
            ${sidebarOpen && !isClosing ? 'translate-x-0 opacity-100 open' : '-translate-x-full opacity-90'}
            ${isClosing ? 'closing' : ''}
            md:translate-x-0 md:opacity-100 md:static md:inset-0
          `}
          id="sidebar"
          {...sidebarProps}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-center space-x-3 relative z-10">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-lg transition-transform duration-300 hover:scale-110">
                  <span className="text-white font-bold text-lg animate-pulse">日</span>
                </div>
                <div>
                  <span className="font-bold text-lg drop-shadow-md">Admin Panel</span>
                  <p className="text-xs text-white/80 drop-shadow-sm">Nihongo Hub</p>
                </div>
              </div>
              <button
                className={`admin-close-btn md:hidden text-white hover:bg-white/20 hover:text-white transition-all duration-300 rounded-xl relative overflow-hidden group ${
                  isClosing ? 'closing' : ''
                }`}
                onClick={handleCloseButtonClick}
                disabled={isClosing}
                aria-label="Đóng menu admin"
                title="Đóng menu (ESC)"
                onMouseDown={(e) => {
                  if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                  }
                  e.currentTarget.style.transform = 'scale(0.95)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = '';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                }}
              >
                <X className={`close-icon w-5 h-5 transition-transform duration-300 ${
                  isClosing ? 'rotate-180 scale-75 opacity-60' : 'rotate-0 scale-100 opacity-100'
                }`} />
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12 transform translate-x-full group-hover:-translate-x-full" 
                     style={{ transition: 'transform 0.8s ease-in-out, opacity 0.3s ease' }} />
              </button>
            </div>

            {/* User info */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-750">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="admin-user-avatar w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    <span className="text-white font-bold text-lg">
                      {user?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="admin-status-indicator absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-slate-100 truncate">{
                    user?.fullName || user?.username
                  }</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{user?.email}</p>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                  Quản lý nội dung
                </h3>
              </div>
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`admin-nav-item
                      group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
                      relative overflow-hidden cursor-pointer
                      ${
                        active
                          ? 'active bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-[1.02]'
                          : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800/50 hover:scale-[1.01]'
                      }
                    `}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(item.href, item.name);
                    }}
                  >
                    {active && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-20 rounded-xl" />
                    )}
                    <Icon className={`w-5 h-5 transition-all duration-200 ${
                      active ? 'text-white scale-110' : 'text-slate-500 dark:text-slate-400 group-hover:text-blue-500 group-hover:scale-110'
                    }`} />
                    <span className="relative z-10">{item.name}</span>
                    {active && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </Link>
                );
              })}
              
              {/* Quick Actions */}
              <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700">
                <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                  Thao tác nhanh
                </h3>
                <div className="space-y-2">
                  <button
                    className="btn btn-ghost w-full justify-start text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800/50"
                    onClick={() => {
                      handleNavigation('/', 'Trang chủ');
                      navigate('/');
                    }}
                  >
                    <Home className="w-4 h-4 mr-3" />
                    Về trang chủ
                  </button>
                  <button
                    className="btn btn-ghost w-full justify-start text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800/50"
                    onClick={() => {
                      toast({
                        title: 'Tìm kiếm',
                        description: 'Chức năng tìm kiếm đang được phát triển',
                        variant: 'default'
                      });
                    }}
                  >
                    <Search className="w-4 h-4 mr-3" />
                    Tìm kiếm
                  </button>
                  <button
                    className="btn btn-ghost w-full justify-start text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800/50"
                    onClick={() => {
                      toast({
                        title: 'Thông báo',
                        description: 'Không có thông báo mới nào',
                        variant: 'default'
                      });
                    }}
                  >
                    <Bell className="w-4 h-4 mr-3" />
                    Thông báo
                  </button>
                </div>
              </div>
            </nav>

            {/* Logout button */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <button
                className="btn btn-ghost w-full justify-start text-red-600 dark:text-red-400 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 rounded-xl font-medium"
                onClick={handleAdminLogout}
                disabled={isLoading}
              >
                <LogOut className={`w-5 h-5 mr-3 transition-transform duration-200 ${
                  isLoading ? 'admin-loading' : 'group-hover:scale-110'
                }`} />
                {isLoading ? 'Đang đăng xuất...' : 'Đăng xuất'}
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="md:ml-72 transition-all duration-300">
          {/* Mobile header */}
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <button
                className="btn btn-ghost btn-icon text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 group relative overflow-hidden"
                onClick={handleOpenButtonClick}
                aria-label="Mở menu admin"
                title="Mở menu (Ctrl+B)"
                onMouseDown={(e) => {
                  if ('vibrate' in navigator) {
                    navigator.vibrate(30);
                  }
                  e.currentTarget.style.transform = 'scale(0.95)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = '';
                }}
                {...triggerProps}
              >
                <Menu className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                
                {/* Ripple effect */}
                <div className="absolute inset-0 bg-blue-500/20 rounded-xl opacity-0 group-active:opacity-100 transition-opacity duration-150" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">日</span>
                </div>
                <h1 className="font-bold text-slate-900 dark:text-slate-100">Admin Panel</h1>
              </div>
              <div className="w-10" /> {/* Spacer */}
            </div>
          </div>

          {/* Page content */}
          <main className="p-6 flex-grow bg-slate-50 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;