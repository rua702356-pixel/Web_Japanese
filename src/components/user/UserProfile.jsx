import { useState } from "react";
import PageLayout from "../../layouts/PageLayout";
import { useToast } from "../../contexts/ToastContext";
import { 
  Mail, 
  Lock, 
  Calendar,
  Trophy,
  Target,
  BookOpen,
  Settings,
  Award,
  Star,
  Clock,
  TrendingUp,
  Camera,
  Edit3,
  Save,
  X
} from "lucide-react";

const UserProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('stats');
  const [userInfo, setUserInfo] = useState({
    name: "Nguyễn Văn A",
    email: "user@example.com",
    avatar: "/placeholder.svg",
    level: "N4 - Trung cấp",
    joinDate: "Tháng 3, 2024",
    streak: 15,
    totalStudyTime: "45 giờ",
    completedLessons: 128,
    achievementCount: 12
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    studyReminders: true,
    weeklyReport: true,
    language: "vi",
    theme: "light"
  });

  const achievements = [
    {
      title: "Học viên chăm chỉ",
      description: "Học 30 ngày liên tiếp",
      icon: "🏆",
      earned: true,
      date: "15/03/2024"
    },
    {
      title: "Bậc thầy Hiragana",
      description: "Hoàn thành tất cả bài Hiragana",
      icon: "📚",
      earned: true,
      date: "10/03/2024"
    },
    {
      title: "Katakana Pro",
      description: "Đạt 95% điểm Katakana",
      icon: "⭐",
      earned: true,
      date: "08/03/2024"
    },
    {
      title: "Từ vựng N5",
      description: "Hoàn thành 500+ từ vựng N5",
      icon: "📖",
      earned: false,
      progress: 78
    },
    {
      title: "JLPT N4 Ready",
      description: "Sẵn sàng thi JLPT N4",
      icon: "🎯",
      earned: false,
      progress: 45
    },
    {
      title: "Streak Master",
      description: "Học 100 ngày liên tiếp",
      icon: "🔥",
      earned: false,
      progress: 15
    }
  ];

  const studyStats = [
    {
      period: "Hôm nay",
      time: "25 phút",
      lessons: 3,
      score: 92
    },
    {
      period: "Tuần này",
      time: "3.2 giờ",
      lessons: 18,
      score: 87
    },
    {
      period: "Tháng này",
      time: "12.5 giờ",
      lessons: 65,
      score: 89
    },
    {
      period: "Tổng cộng",
      time: "45 giờ",
      lessons: 128,
      score: 88
    }
  ];

  const recentActivity = [
    {
      type: "lesson",
      title: "Hoàn thành: Kanji N4 - Phần 3",
      time: "2 giờ trước",
      score: 94,
      icon: BookOpen
    },
    {
      type: "achievement",
      title: "Đạt thành tích: Katakana Pro",
      time: "1 ngày trước",
      icon: Trophy
    },
    {
      type: "streak",
      title: "Duy trì streak 15 ngày",
      time: "1 ngày trước",
      icon: Calendar
    },
    {
      type: "quiz",
      title: "Hoàn thành quiz từ vựng",
      time: "2 ngày trước",
      score: 88,
      icon: Target
    }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success("Cập nhật thông tin thành công!");
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    toast.success("Đã cập nhật cài đặt");
  };

  return (
    <PageLayout 
      title="Hồ sơ cá nhân" 
      description="Quản lý thông tin và theo dõi tiến độ học tập của bạn"
      showBreadcrumb={true}
      showFooter={false}
    >
      <section className="py-16 bg-gradient-card">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Hồ sơ cá nhân
          </h1>
          <p className="text-muted-foreground">
            Quản lý thông tin và theo dõi tiến độ học tập của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center text-3xl font-bold text-white mb-4">
                    {userInfo.name.charAt(0)}
                  </div>
                
                </div>
                 {/*  nếu nhấn vào chỉnh sửa sẽ hiện ra*/}
                {isEditing ? (
                  <div className="space-y-3">
                    {/*  thanh chỉnh sửa tên */}
                    <input
                      value={userInfo.name}
                      onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                      className="input text-center"
                    />
                    {/*  thanh chỉnh sửa email */}
                    <input
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                      className="input text-center"
                    />
                    <div className="flex space-x-2">
                      {/*  nút hủy */}
                      <button
                        className="btn btn-outline btn-sm flex-1"
                        onClick={() => setIsEditing(false)}
                      >
                        <X className="w-3 h-3 mr-1" />
                        Hủy
                      </button>
                      {/*  nút lưu */}
                      <button
                        className="btn btn-default btn-sm flex-1 bg-gradient-primary"
                        onClick={handleSaveProfile}
                      >
                        <Save className="w-3 h-3 mr-1" />
                        Lưu
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-bold mb-1">{userInfo.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{userInfo.email}</p>
                    <span className="badge badge-secondary mb-4">
                      {userInfo.level}
                    </span>
                    <button
                      className="btn btn-outline btn-sm w-full"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit3 className="w-3 h-3 mr-2" />
                      Chỉnh sửa
                    </button>
                  </div>
                )}
              </div>

              <div className="separator mb-6"></div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm">Tham gia</span>
                  </div>
                  <span className="text-sm font-medium">{userInfo.joinDate}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">Streak</span>
                  </div>
                  <span className="text-sm font-medium">{userInfo.streak} ngày</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Thời gian học</span>
                  </div>
                  <span className="text-sm font-medium">{userInfo.totalStudyTime}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Bài hoàn thành</span>
                  </div>
                  <span className="text-sm font-medium">{userInfo.completedLessons}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Thành tích</span>
                  </div>
                  <span className="text-sm font-medium">{userInfo.achievementCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="tabs space-y-6">
              <div className="tabs-list grid w-full grid-cols-4">
                <button 
                  className={`tab-trigger ${activeTab === 'stats' ? 'active' : ''}`}
                  onClick={() => setActiveTab('stats')}
                >
                  Thống kê
                </button>
                <button 
                  className={`tab-trigger ${activeTab === 'achievements' ? 'active' : ''}`}
                  onClick={() => setActiveTab('achievements')}
                >
                  Thành tích
                </button>
                <button 
                  className={`tab-trigger ${activeTab === 'activity' ? 'active' : ''}`}
                  onClick={() => setActiveTab('activity')}
                >
                  Hoạt động
                </button>
                <button 
                  className={`tab-trigger ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  Cài đặt
                </button>
              </div>

              {activeTab === 'stats' && (
                <div className="tab-content space-y-6">
                  <div className="card p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                      Thống kê học tập
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {studyStats.map((stat, index) => (
                        <div key={index} className="p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-medium mb-3">{stat.period}</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Thời gian:</span>
                              <span className="text-sm font-medium">{stat.time}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Bài học:</span>
                              <span className="text-sm font-medium">{stat.lessons}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Điểm TB:</span>
                              <span className="text-sm font-medium">{stat.score}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="tab-content space-y-6">
                  <div className="card p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-primary" />
                      Thành tích ({achievements.filter(a => a.earned).length}/{achievements.length})
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border ${
                            achievement.earned
                              ? 'bg-green-50 border-green-200 dark:bg-green-900/20'
                              : 'bg-gray-50 border-gray-200 dark:bg-gray-800/50'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="text-2xl">{achievement.icon}</div>
                            <div className="flex-1">
                              <h4 className={`font-medium ${
                                achievement.earned ? 'text-green-700 dark:text-green-300' : 'text-muted-foreground'
                              }`}>
                                {achievement.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                {achievement.description}
                              </p>
                              
                              {achievement.earned ? (
                                <span className="badge badge-secondary text-xs">
                                  Đạt được: {achievement.date}
                                </span>
                              ) : achievement.progress !== undefined ? (
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span>Tiến độ:</span>
                                    <span>{achievement.progress}%</span>
                                  </div>
                                  <div className="progress-container h-2">
                                    <div 
                                      className="progress-bar" 
                                      style={{ width: `${achievement.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              ) : (
                                <span className="badge badge-outline text-xs">
                                  Chưa đạt được
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="tab-content space-y-6">
                  <div className="card p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-primary" />
                      Hoạt động gần đây
                    </h3>
                    
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <activity.icon className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{activity.title}</p>
                            <div className="flex items-center space-x-3 mt-1">
                              <span className="text-xs text-muted-foreground">{activity.time}</span>
                              {activity.score && (
                                <span className="badge badge-secondary text-xs">
                                  {activity.score}%
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="tab-content space-y-6">
                  <div className="card p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-primary" />
                      Cài đặt tài khoản
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-3">Thông báo</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <label htmlFor="email-notifications" className="label">Email thông báo</label>
                              <p className="text-sm text-muted-foreground">Nhận thông báo qua email</p>
                            </div>
                            {/* ô tick vào và hiện thông báo*/}
                            <input
                              type="checkbox"
                              id="email-notifications"
                              checked={preferences.emailNotifications}
                              onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                              className="h-4 w-4 text-primary"
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <label htmlFor="push-notifications" className="label">Thông báo đẩy</label>
                              <p className="text-sm text-muted-foreground">Nhận thông báo trên trình duyệt</p>
                            </div>
                            <input
                              type="checkbox"
                              id="push-notifications"
                              checked={preferences.pushNotifications}
                              onChange={(e) => handlePreferenceChange('pushNotifications', e.target.checked)}
                              className="h-4 w-4 text-primary"
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <label htmlFor="study-reminders" className="label">Nhắc nhở học tập</label>
                              <p className="text-sm text-muted-foreground">Nhắc nhở học hàng ngày</p>
                            </div>
                            <input
                              type="checkbox"
                              id="study-reminders"
                              checked={preferences.studyReminders}
                              onChange={(e) => handlePreferenceChange('studyReminders', e.target.checked)}
                              className="h-4 w-4 text-primary"
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <label htmlFor="weekly-report" className="label">Báo cáo hàng tuần</label>
                              <p className="text-sm text-muted-foreground">Tóm tắt tiến độ học tập</p>
                            </div>
                            <input
                              type="checkbox"
                              id="weekly-report"
                              checked={preferences.weeklyReport}
                              onChange={(e) => handlePreferenceChange('weeklyReport', e.target.checked)}
                              className="h-4 w-4 text-primary"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="separator"></div>

                      <div>
                        <h4 className="font-medium mb-3">Bảo mật</h4>
                        <div className="space-y-3">
                          <button className="btn btn-outline w-full justify-start">
                            <Lock className="w-4 h-4 mr-2" />
                            Đổi mật khẩu
                          </button>
                          <button className="btn btn-outline w-full justify-start">
                            <Mail className="w-4 h-4 mr-2" />
                            Đổi email
                          </button>
                        </div>
                      </div>

                      <div className="separator"></div>

                      <div>
                        <h4 className="font-medium mb-3">Khác</h4>
                        <div className="space-y-3">
                          <button className="btn btn-outline w-full justify-start text-red-600 hover:text-red-700">
                            <X className="w-4 h-4 mr-2" />
                            Xóa tài khoản
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
    </PageLayout>
  );
};

export default UserProfile;