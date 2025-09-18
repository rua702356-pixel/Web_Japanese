import { useState, useCallback, useEffect } from 'react';
import { useToast } from '../contexts/ToastContext';

export const useSidebar = (options = {}) => {
  const {
    autoCloseDelay = 0,
    enableKeyboardShortcuts = true,
    enableClickOutside = true,
    onOpen,
    onClose
  } = options;

  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle opening sidebar
  const openSidebar = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsOpen(true);
    onOpen?.();
    
    // Auto-close after delay if specified
    if (autoCloseDelay > 0) {
      setTimeout(() => {
        closeSidebar();
      }, autoCloseDelay);
    }
    
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating, autoCloseDelay, onOpen]);

  // Handle closing sidebar with animation
  const closeSidebar = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsClosing(true);
    
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setIsAnimating(false);
      onClose?.();
    }, 200);
  }, [isAnimating, onClose]);

  // Toggle sidebar state
  const toggleSidebar = useCallback(() => {
    if (isOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }, [isOpen, openSidebar, closeSidebar]);

  // Force close without animation (for emergency cases)
  const forceClose = useCallback(() => {
    setIsOpen(false);
    setIsClosing(false);
    setIsAnimating(false);
    onClose?.();
  }, [onClose]);

  // Handle keyboard events
  useEffect(() => {
    if (!enableKeyboardShortcuts) return;

    const handleKeyDown = (event) => {
      // ESC key to close sidebar
      if (event.key === 'Escape' && isOpen) {
        event.preventDefault();
        closeSidebar();
        toast({
          title: 'Sidebar đóng',
          description: 'Đã đóng menu bằng phím ESC',
          variant: 'default'
        });
      }
      
      // Ctrl/Cmd + B to toggle sidebar
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault();
        toggleSidebar();
        toast({
          title: 'Sidebar toggle',
          description: `Đã ${isOpen ? 'đóng' : 'mở'} menu bằng phím tắt`,
          variant: 'default'
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboardShortcuts, isOpen, closeSidebar, toggleSidebar, toast]);

  // Handle click outside to close
  useEffect(() => {
    if (!enableClickOutside || !isOpen) return;

    const handleClickOutside = (event) => {
      const target = event.target;
      const sidebar = document.querySelector('[data-sidebar]');
      const trigger = document.querySelector('[data-sidebar-trigger]');
      
      if (sidebar && !sidebar.contains(target) && !trigger?.contains(target)) {
        closeSidebar();
      }
    };

    // Delay to prevent immediate closure
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [enableClickOutside, isOpen, closeSidebar]);

  // Prevent body scroll when sidebar is open (for mobile)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Handle focus trap for accessibility
  useEffect(() => {
    if (!isOpen) return;

    const sidebar = document.querySelector('[data-sidebar]');
    if (!sidebar) return;

    const focusableElements = sidebar.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (event) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    sidebar.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      sidebar.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen]);

  return {
    isOpen,
    isClosing,
    isAnimating,
    openSidebar,
    closeSidebar,
    toggleSidebar,
    forceClose,
    
    // Helper functions for event handlers
    handleBackdropClick: (event) => {
      event.stopPropagation();
      closeSidebar();
    },
    
    handleCloseButtonClick: (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeSidebar();
    },
    
    handleOpenButtonClick: (event) => {
      event.preventDefault();
      event.stopPropagation();
      openSidebar();
    },
    
    // Data attributes for markup
    sidebarProps: {
      'data-sidebar': true,
      'aria-hidden': !isOpen,
      'role': 'dialog',
      'aria-modal': isOpen
    },
    
    triggerProps: {
      'data-sidebar-trigger': true,
      'aria-expanded': isOpen,
      'aria-controls': 'sidebar'
    },
    
    backdropProps: {
      'data-sidebar-backdrop': true,
      'aria-hidden': true
    }
  };
};

export default useSidebar;