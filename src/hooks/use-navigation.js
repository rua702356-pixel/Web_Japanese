import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { useToast } from '../contexts/ToastContext';

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Define page information
  const pageInfo = useMemo(() => ({
    '/': {
      title: 'Trang chủ',
      description: 'Khám phá hành trình học tiếng Nhật',
      category: 'general'
    },
    '/lessons': {
      title: 'Bài học tương tác',
      description: 'Học tiếng Nhật qua các bài học có cấu trúc',
      category: 'learning',
      requiresAuth: true
    },
    '/dictionary': {
      title: 'Từ điển tiếng Nhật',
      description: 'Tra cứu từ vựng và kanji',
      category: 'learning',
      requiresAuth: true
    },
    '/flashcards': {
      title: 'Luyện tập thẻ từ',
      description: 'Ghi nhớ từ vựng với flashcards',
      category: 'practice',
      requiresAuth: true
    },
    '/quiz': {
      title: 'Kiểm tra kiến thức',
      description: 'Đánh giá trình độ qua các bài quiz',
      category: 'practice',
      requiresAuth: true
    },
    '/progress': {
      title: 'Theo dõi tiến độ',
      description: 'Xem báo cáo học tập của bạn',
      category: 'learning',
      requiresAuth: true
    },
    '/jlpt': {
      title: 'Luyện thi JLPT',
      description: 'Chuẩn bị cho kỳ thi năng lực tiếng Nhật',
      category: 'practice',
      requiresAuth: true
    },
    '/profile': {
      title: 'Hồ sơ cá nhân',
      description: 'Quản lý thông tin và cài đặt',
      category: 'profile',
      requiresAuth: true
    },
    '/admin': {
      title: 'Bảng điều khiển Admin',
      description: 'Quản lý nội dung và người dùng',
      category: 'admin',
      requiresAuth: true,
      requiresAdmin: true
    },
    '/admin/vocabulary': {
      title: 'Quản lý từ vựng',
      description: 'Thêm, sửa, xóa từ vựng',
      category: 'admin',
      requiresAuth: true,
      requiresAdmin: true
    },
    '/admin/grammar': {
      title: 'Quản lý ngữ pháp',
      description: 'Quản lý các cấu trúc ngữ pháp',
      category: 'admin',
      requiresAuth: true,
      requiresAdmin: true
    }
  }), []);

  // Navigation functions
  const navigateTo = useCallback((path, options = {}) => {
    const { replace = false, state, preventDuplicate = true } = options;

    // Prevent navigating to the same page
    if (preventDuplicate && location.pathname === path) {
      toast({
        title: 'Thông báo',
        description: 'Bạn đã ở trang này rồi',
        variant: 'default'
      });
      return;
    }

    try {
      navigate(path, { replace, state });
    } catch (error) {
      toast({
        title: 'Lỗi điều hướng',
        description: 'Không thể chuyển đến trang đã yêu cầu',
        variant: 'destructive'
      });
    }
  }, [navigate, location, toast]);

  const goBack = useCallback(() => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigateTo('/');
    }
  }, [navigate, navigateTo]);

  const goToHome = useCallback(() => {
    navigateTo('/');
  }, [navigateTo]);

  const goToLearning = useCallback((section) => {
    switch (section) {
      case 'lessons':
        navigateTo('/lessons');
        break;
      case 'dictionary':
        navigateTo('/dictionary');
        break;
      case 'progress':
        navigateTo('/progress');
        break;
      default:
        navigateTo('/lessons');
    }
  }, [navigateTo]);

  const goToPractice = useCallback((type) => {
    switch (type) {
      case 'flashcards':
        navigateTo('/flashcards');
        break;
      case 'quiz':
        navigateTo('/quiz');
        break;
      case 'jlpt':
        navigateTo('/jlpt');
        break;
      default:
        navigateTo('/flashcards');
    }
  }, [navigateTo]);

  const goToAdmin = useCallback((section) => {
    switch (section) {
      case 'vocabulary':
        navigateTo('/admin/vocabulary');
        break;
      case 'grammar':
        navigateTo('/admin/grammar');
        break;
      case 'alphabet':
        navigateTo('/admin/alphabet');
        break;
      case 'quiz':
        navigateTo('/admin/quiz');
        break;
      default:
        navigateTo('/admin');
    }
  }, [navigateTo]);

  const goToProfile = useCallback(() => {
    navigateTo('/profile');
  }, [navigateTo]);

  // Current page info
  const currentPageInfo = useMemo(() => {
    return pageInfo[location.pathname] || {
      title: 'Trang không xác định',
      category: 'general'
    };
  }, [location.pathname, pageInfo]);

  // Check if current route is active
  const isRouteActive = useCallback((path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  // Get pages by category
  const getPagesByCategory = useCallback((category) => {
    return Object.entries(pageInfo)
      .filter(([, info]) => info.category === category)
      .map(([path, info]) => ({ path, ...info }));
  }, [pageInfo]);

  return {
    // Navigation functions
    navigateTo,
    goBack,
    goToHome,
    goToLearning,
    goToPractice,
    goToAdmin,
    goToProfile,
    
    // Current page info
    currentPageInfo,
    currentPath: location.pathname,
    isRouteActive,
    
    // Page organization
    getPagesByCategory,
    pageInfo
  };
};

export default useNavigation;