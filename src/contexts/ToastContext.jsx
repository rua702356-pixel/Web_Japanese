import React, { createContext, useContext, useState, useEffect } from 'react';

const ToastContext = createContext();

let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = toastId++;
    const newToast = {
      id,
      ...toast,
      open: true,
    };

    setToasts((prev) => [newToast, ...prev].slice(0, 3)); // Limit to 3 toasts

    // Auto dismiss after 5 seconds
    if (toast.duration !== 0) {
      setTimeout(() => {
        dismissToast(id);
      }, toast.duration || 5000);
    }

    return id;
  };

  const dismissToast = (id) => {
    setToasts((prev) =>
      prev.map((toast) => (toast.id === id ? { ...toast, open: false } : toast))
    );

    // Remove from DOM after animation
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 300);
  };

  const toast = {
    success: (title, options = {}) => {
      return addToast({
        title,
        ...options,
        variant: 'success',
      });
    },
    error: (title, options = {}) => {
      return addToast({
        title,
        ...options,
        variant: 'error',
      });
    },
    info: (title, options = {}) => {
      return addToast({
        title,
        ...options,
        variant: 'info',
      });
    },
    warning: (title, options = {}) => {
      return addToast({
        title,
        ...options,
        variant: 'warning',
      });
    },
  };

  return (
    <ToastContext.Provider value={{ toast, dismissToast }}>
      {children}
      <div className="toast-viewport">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast--${toast.variant || 'default'} ${
              toast.open ? 'slide-in-right' : 'fade-out'
            }`}
          >
            <div className="flex-1">
              {toast.title && <div className="toast-title">{toast.title}</div>}
              {toast.description && (
                <div className="toast-description">{toast.description}</div>
              )}
            </div>
            <button
              className="toast-close"
              onClick={() => dismissToast(toast.id)}
              aria-label="Close toast"
            >
              <svg
                className="toast-close-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};