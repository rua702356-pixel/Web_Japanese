import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  Github,
  Chrome,
  Facebook,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const AuthModal = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(loginData.username, loginData.password);
      
      if (success) {
        toast.success("Đăng nhập thành công!", {
          description: "Chào mừng bạn trở lại Nihongo Hub!"
        });
        onClose();
        // Reset form
        setLoginData({ username: "", password: "" });
      } else {
        toast.error("Đăng nhập thất bại!", {
          description: "Tên đăng nhập hoặc mật khẩu không chính xác."
        });
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!", {
        description: "Vui lòng thử lại sau."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Mật khẩu không khớp!");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate register API call
    setTimeout(() => {
      toast.success("Đăng ký thành công!", {
        description: "Tài khoản đã được tạo. Chào mừng đến với Nihongo Hub!"
      });
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    toast.info(`Đang kết nối với ${provider}...`, {
      description: "Vui lòng chờ trong giây lát"
    });
  };

  return (
    isOpen ? (
      <div className="dialog-overlay">
        <div className="dialog-content sm:max-w-md">
          <div className="dialog-header">
            <h2 className="dialog-title text-center text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Nihongo Hub
            </h2>
          </div>

          <div className="tabs w-full">
            <div className="tabs-list grid w-full grid-cols-2">
              <button 
                className="tab-trigger active py-2 px-4 text-center font-medium"
                data-value="login"
              >
                Đăng nhập
              </button>
              <button 
                className="tab-trigger py-2 px-4 text-center font-medium"
                data-value="register"
              >
                Đăng ký
              </button>
            </div>

            <div className="tab-content">
              <div className="tab-panel active space-y-4" data-value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="username" className="label">Tên đăng nhập</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="username"
                        type="text"
                        placeholder="admin hoặc user"
                        className="input pl-10"
                        value={loginData.username}
                        onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                        required
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Demo: admin/admin123 hoặc user/user123
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="label">Mật khẩu</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="input pl-10 pr-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-default w-full bg-gradient-primary" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                  </button>
                </form>

                <div className="text-center">
                  <button className="text-sm text-muted-foreground underline bg-transparent border-none cursor-pointer">
                    Quên mật khẩu?
                  </button>
                </div>
              </div>

              <div className="tab-panel space-y-4" data-value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="label">Họ và tên</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="name"
                        type="text"
                        placeholder="Nguyễn Văn A"
                        className="input pl-10"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="reg-email" className="label">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="reg-email"
                        type="email"
                        placeholder="your@email.com"
                        className="input pl-10"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="reg-password" className="label">Mật khẩu</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="reg-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="input pl-10 pr-10"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="label">Xác nhận mật khẩu</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="confirm-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="input pl-10"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-default w-full bg-gradient-primary" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang tạo tài khoản..." : "Đăng ký"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="relative my-4">
            <div className="separator"></div>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
              Hoặc
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              className="btn btn-outline w-full"
              onClick={() => handleSocialLogin("Google")}
            >
              <Chrome className="w-4 h-4" />
            </button>
            <button
              className="btn btn-outline w-full"
              onClick={() => handleSocialLogin("Facebook")}
            >
              <Facebook className="w-4 h-4" />
            </button>
            <button
              className="btn btn-outline w-full"
              onClick={() => handleSocialLogin("GitHub")}
            >
              <Github className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Bằng cách đăng ký, bạn đồng ý với{" "}
            <button className="text-sm bg-transparent border-none underline cursor-pointer p-0">
              Điều khoản sử dụng
            </button>{" "}
            và{" "}
            <button className="text-sm bg-transparent border-none underline cursor-pointer p-0">
              Chính sách bảo mật
            </button>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default AuthModal;