import { Play, BookOpen, Trophy, Users, Star, Sparkles, ArrowRight, ChevronDown } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "../../hooks/use-navigation";

const Hero = () => {
  const { isAuthenticated } = useAuth();
  const { goToLearning } = useNavigation();

  const stats = [
    { icon: BookOpen, label: "Bài học", value: "1000+", color: "from-blue-500 to-cyan-500" },
    { icon: Users, label: "Học viên", value: "50K+", color: "from-green-500 to-emerald-500" },
    { icon: Trophy, label: "Tỷ lệ đỗ", value: "95%", color: "from-yellow-500 to-orange-500" },
  ];

  const features = [
    { icon: Star, text: "Học từ cơ bản đến nâng cao" },
    { icon: Sparkles, text: "Phương pháp học hiện đại" },
    { icon: Trophy, text: "Luyện thi JLPT chuyên nghiệp" },
  ];

  const handleGetStarted = () => {
    if (isAuthenticated) {
      goToLearning('lessons');
    } else {
      // Scroll to learning sections or redirect to login
      document.getElementById('learning-sections')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="modern-hero">
      {/* Animated Background */}
      <div className="hero-background">
        <div className="hero-gradient-overlay"></div>
        <div className="hero-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
        </div>
        <div className="hero-floating-elements">
          <div className="floating-char floating-char-1">あ</div>
          <div className="floating-char floating-char-2">カ</div>
          <div className="floating-char floating-char-3">漢</div>
          <div className="floating-char floating-char-4">が</div>
          <div className="floating-char floating-char-5">の</div>
        </div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge">
            <Sparkles className="w-4 h-4" />
            <span>Nền tảng học tiếng Nhật #1 Việt Nam</span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-title">
            Học tiếng Nhật
            <span className="hero-title-highlight">
              <span className="gradient-text">Hiệu quả nhất</span>
              <div className="highlight-decoration"></div>
            </span>
            với phương pháp hiện đại
          </h1>
          
          <p className="hero-subtitle">
            Từ Hiragana, Katakana, Kanji đến giao tiếp thành thạo.
            <br />
            <span className="hero-subtitle-highlight">Luyện thi JLPT chuyên nghiệp với tỷ lệ đỗ 95%!</span>
          </p>

          {/* Features List */}
          <div className="hero-features">
            {features.map((feature, index) => (
              <div key={index} className="hero-feature-item">
                <feature.icon className="hero-feature-icon" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta">
            <button 
              className="btn btn-default btn-lg hero-cta-primary"
              onClick={handleGetStarted}
            >
              <Play className="w-5 h-5 mr-2" />
              {isAuthenticated ? 'Tiếp tục học' : 'Bắt đầu học miễn phí'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            <button 
              className="btn btn-outline btn-lg hero-cta-secondary"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Xem khóa học
            </button>
          </div>

          {/* Stats Cards */}
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="hero-stat-card">
                <div className="hero-stat-header">
                  <div className={`hero-stat-icon-wrapper bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="hero-stat-icon" />
                  </div>
                  <div className="hero-stat-value">{stat.value}</div>
                </div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="hero-scroll-indicator">
            <ChevronDown className="w-6 h-6" />
            <span>Khám phá thêm</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;