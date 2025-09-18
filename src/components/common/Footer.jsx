import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Nội dung học tập",
      links: [
        "Hiragana & Katakana",
        "Học Kanji",
        "Bài học ngữ pháp",
        "Luyện từ vựng",
        "Luyện hội thoại"
      ]
    },
    {
      title: "Luyện thi JLPT",
      links: [
        "Cấp độ N5",
        "Cấp độ N4",
        "Cấp độ N3",
        "Cấp độ N2",
        "Cấp độ N1"
      ]
    },
    {
      title: "Hỗ trợ",
      links: [
        "Câu hỏi thường gặp",
        "Hướng dẫn học",
        "Liên hệ",
        "Hỗ trợ kỹ thuật",
        "Cộng đồng"
      ]
    },
    {
      title: "Thông tin công ty",
      links: [
        "Về chúng tôi",
        "Giới thiệu giảng viên",
        "Chính sách bảo mật",
        "Điều khoản sử dụng",
        "Tuyển dụng"
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { icon: Instagram, href: "#", color: "hover:text-pink-600" },
    { icon: Youtube, href: "#", color: "hover:text-red-600" }
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">日</span>
              </div>
              <span className="text-2xl font-bold">Nihongo Hub</span>
            </div>
            <p className="text-secondary-foreground/80 mb-6 max-w-sm">
              Nền tảng học tiếng Nhật tốt nhất dành cho người Việt Nam.
              Từ người mới bắt đầu đến nâng cao, chúng tôi cung cấp khóa học phù hợp với trình độ của bạn.
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>TP. Hồ Chí Minh, Việt Nam</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@nihongohub.vn</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold mb-4 text-lg">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-secondary-foreground/70 hover:text-primary transition-smooth text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="separator my-8"></div>

        {/* Newsletter Section */}
        <div className="card bg-gradient-primary p-6 mb-8">
          <div className="text-center text-primary-foreground">
            <h3 className="text-xl font-bold mb-2">Nhận thông tin mới nhất</h3>
            <p className="mb-4 opacity-90">
              Chúng tôi sẽ gửi thông tin về bài học mới và luyện thi JLPT qua email
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Địa chỉ email"
                className="input flex-1 px-4 py-2 rounded-lg text-foreground"
              />
              <button className="btn btn-secondary bg-white text-primary hover:bg-white/90">
                Đăng ký
              </button>
            </div>
          </div>
        </div>

        <div className="separator my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-secondary-foreground/70">
            © 2024 Nihongo Hub. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-secondary-foreground/70 mr-2">Theo dõi:</span>
            {socialLinks.map((social, index) => (
              <button
                key={index}
                className={`btn btn-ghost h-8 w-8 p-0 text-secondary-foreground/70 ${social.color}`}
              >
                <social.icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-secondary-foreground/70" />
            <select className="bg-transparent text-sm text-secondary-foreground/70 border border-secondary-foreground/20 rounded px-2 py-1">
              <option value="vi">Tiếng Việt</option>
              <option value="ja">日本語</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;