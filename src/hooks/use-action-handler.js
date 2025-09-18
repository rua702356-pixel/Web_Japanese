import { useCallback, useState, useRef, useEffect } from 'react';
import { useToast } from '../contexts/ToastContext';

export const useActionHandler = () => {
  const [actionState, setActionState] = useState({
    isLoading: false,
    error: null,
    lastAction: null,
    timestamp: null
  });
  
  const { toast } = useToast();
  const timeoutRef = useRef(null);
  const lastActionRef = useRef(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const executeAction = useCallback(async (
    actionName,
    actionFn,
    options = {}
  ) => {
    const {
      showLoading = true,
      showSuccess = true,
      showError = true,
      preventDuplicate = true,
      debounceMs = 300,
      successMessage,
      errorMessage
    } = options;

    // Prevent duplicate actions
    if (preventDuplicate && lastActionRef.current) {
      const timeSinceLastAction = Date.now() - lastActionRef.current.timestamp;
      if (lastActionRef.current.action === actionName && timeSinceLastAction < debounceMs) {
        return null;
      }
    }

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Update state
    setActionState({
      isLoading: showLoading,
      error: null,
      lastAction: actionName,
      timestamp: Date.now()
    });

    // Update last action reference
    lastActionRef.current = {
      action: actionName,
      timestamp: Date.now()
    };

    try {
      const result = await actionFn();

      // Show success message
      if (showSuccess) {
        toast({
          title: 'Thành công',
          description: successMessage || `${actionName} đã hoàn thành`,
          variant: 'default'
        });
      }

      // Reset loading state
      setActionState(prev => ({
        ...prev,
        isLoading: false
      }));

      return result;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Có lỗi xảy ra';
      
      // Update error state
      setActionState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMsg
      }));

      // Show error message
      if (showError) {
        toast({
          title: 'Lỗi',
          description: errorMessage || errorMsg,
          variant: 'destructive'
        });
      }

      return null;
    }
  }, [toast]);

  // Specific action handlers
  const handleSubmit = useCallback(async (
    formData,
    submitFn,
    options
  ) => {
    return executeAction(
      'Gửi form',
      () => submitFn(formData),
      {
        successMessage: 'Form đã được gửi thành công',
        errorMessage: 'Không thể gửi form',
        ...options
      }
    );
  }, [executeAction]);

  const handleDelete = useCallback(async (
    item,
    deleteFn,
    options
  ) => {
    return executeAction(
      'Xóa',
      () => deleteFn(item),
      {
        successMessage: 'Đã xóa thành công',
        errorMessage: 'Không thể xóa',
        ...options
      }
    );
  }, [executeAction]);

  const handleUpdate = useCallback(async (
    item,
    updateFn,
    options
  ) => {
    return executeAction(
      'Cập nhật',
      () => updateFn(item),
      {
        successMessage: 'Đã cập nhật thành công',
        errorMessage: 'Không thể cập nhật',
        ...options
      }
    );
  }, [executeAction]);

  const handleCreate = useCallback(async (
    data,
    createFn,
    options
  ) => {
    return executeAction(
      'Tạo mới',
      () => createFn(data),
      {
        successMessage: 'Đã tạo mới thành công',
        errorMessage: 'Không thể tạo mới',
        ...options
      }
    );
  }, [executeAction]);

  const handleSearch = useCallback(async (
    query,
    searchFn,
    options
  ) => {
    return executeAction(
      'Tìm kiếm',
      () => searchFn(query),
      {
        showSuccess: false,
        errorMessage: 'Không thể thực hiện tìm kiếm',
        debounceMs: 500,
        ...options
      }
    );
  }, [executeAction]);

  const handleFilter = useCallback(async (
    filters,
    filterFn,
    options
  ) => {
    return executeAction(
      'Lọc',
      () => filterFn(filters),
      {
        showSuccess: false,
        errorMessage: 'Không thể áp dụng bộ lọc',
        debounceMs: 300,
        ...options
      }
    );
  }, [executeAction]);

  const handleLoad = useCallback(async (
    loadFn,
    options
  ) => {
    return executeAction(
      'Tải dữ liệu',
      loadFn,
      {
        showSuccess: false,
        errorMessage: 'Không thể tải dữ liệu',
        ...options
      }
    );
  }, [executeAction]);

  const handleSave = useCallback(async (
    data,
    saveFn,
    options
  ) => {
    return executeAction(
      'Lưu',
      () => saveFn(data),
      {
        successMessage: 'Đã lưu thành công',
        errorMessage: 'Không thể lưu',
        ...options
      }
    );
  }, [executeAction]);

  // Clear error state
  const clearError = useCallback(() => {
    setActionState(prev => ({
      ...prev,
      error: null
    }));
  }, []);

  // Reset all state
  const resetState = useCallback(() => {
    setActionState({
      isLoading: false,
      error: null,
      lastAction: null,
      timestamp: null
    });
    lastActionRef.current = null;
  }, []);

  return {
    // State
    isLoading: actionState.isLoading,
    error: actionState.error,
    lastAction: actionState.lastAction,
    
    // Generic action handler
    executeAction,
    
    // Specific handlers
    handleSubmit,
    handleDelete,
    handleUpdate,
    handleCreate,
    handleSearch,
    handleFilter,
    handleLoad,
    handleSave,
    
    // Utilities
    clearError,
    resetState
  };
};

export default useActionHandler;