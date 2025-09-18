import React from 'react';
import { AlertTriangle, LogOut, X } from 'lucide-react';

const LogoutConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  userName
}) => {
  return (
    isOpen ? (
      <div className="dialog-overlay">
        <div className="dialog-content max-w-md">
          <div className="dialog-header">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="dialog-title">Xác nhận đăng xuất</h2>
                <p className="text-sm text-muted-foreground">
                  Bạn có chắc chắn muốn đăng xuất?
                </p>
              </div>
            </div>
            <button 
              className="dialog-close"
              onClick={onClose}
              disabled={isLoading}
              aria-label="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="dialog-body">
            <div className="space-y-4">
              {userName && (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium">Tài khoản hiện tại:</span> {userName}
                  </p>
                </div>
              )}
              
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Khi đăng xuất, bạn sẽ:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Mất quyền truy cập vào các tính năng học tập</li>
                  <li>Cần đăng nhập lại để tiếp tục sử dụng</li>
                  <li>Dữ liệu học tập được lưu an toàn</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="dialog-footer">
            <button
              className="btn btn-outline"
              onClick={onClose}
              disabled={isLoading}
            >
              <X className="w-4 h-4 mr-2" />
              Hủy
            </button>
            <button
              className="btn btn-destructive"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <AlertTriangle className="w-4 h-4 mr-2 animate-spin" />
                  Đang đăng xuất...
                </>
              ) : (
                <>
                  <LogOut className="w-4 h-4 mr-2" />
                  Đăng xuất
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default LogoutConfirmation;