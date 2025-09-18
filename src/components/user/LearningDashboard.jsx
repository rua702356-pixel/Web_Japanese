import { 
  BookOpen, 
  Brain, 
  Target, 
  Calendar,
  Trophy,
  Star,
  Clock,
  TrendingUp,
  ArrowRight,
  Play,
  Award,
  Zap
} from "lucide-react";

const LearningDashboard = () => {
  const learningStats = [
    {
      title: "Streak hiện tại",
      value: "7 ngày",
      icon: Calendar,
      color: "text-orange-500",
      bgColor: "bg-gradient-to-br from-orange-400 to-red-500",
      trend: "+2 từ hôm qua"
    },
    {
      title: "Từ vựng học",
      value: "234 từ",
      icon: BookOpen,
      color: "text-blue-500",
      bgColor: "bg-gradient-to-br from-blue-400 to-indigo-600",
      trend: "+15 từ tuần này"
    },
    {
      title: "Điểm trung bình",
      value: "85%",
      icon: Target,
      color: "text-green-500",
      bgColor: "bg-gradient-to-br from-green-400 to-emerald-600",
      trend: "+5% so với tháng trước"
    },
    {
      title: "Thời gian học",
      value: "2.5h",
      icon: Clock,
      color: "text-purple-500",
      bgColor: "bg-gradient-to-br from-purple-400 to-pink-600",
      trend: "Hôm nay"
    }
  ];

  const recentLessons = [
    {
      title: "Hiragana Cơ Bản",
      progress: 85,
      timeSpent: "15 phút",
      status: "completed",
      score: 92
    },
    {
      title: "Katakana Nâng Cao",
      progress: 60,
      timeSpent: "12 phút",
      status: "in-progress"
    },
    {
      title: "Kanji N5 - Phần 1",
      progress: 45,
      timeSpent: "20 phút",
      status: "in-progress"
    },
    {
      title: "Ngữ pháp cơ bản",
      progress: 100,
      timeSpent: "25 phút",
      status: "completed",
      score: 88
    }
  ];

  const achievements = [
    {
      title: "Học viên chăm chỉ",
      description: "Học 7 ngày liên tiếp",
      icon: "🏆",
      earned: true,
      progress: 100
    },
    {
      title: "Bậc thầy Hiragana",
      description: "Hoàn thành tất cả bài Hiragana",
      icon: "📚",
      earned: true,
      progress: 100
    },
    {
      title: "Katakana Pro",
      description: "Đạt 90% điểm Katakana",
      icon: "⭐",
      earned: false,
      progress: 75
    },
    {
      title: "JLPT N5 Ready",
      description: "Sẵn sàng thi JLPT N5",
      icon: "🎯",
      earned: false,
      progress: 60
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Bảng điều khiển học tập
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Theo dõi tiến độ học tập và thành tích của bạn với giao diện hiện đại và trực quan
          </p>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {learningStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="p-8 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">{stat.title}</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-1">{stat.value}</p>
                      {stat.trend && (
                        <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {stat.trend}
                        </p>
                      )}
                    </div>
                    <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white drop-shadow-sm" />
                    </div>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="mt-4">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${75 + index * 5}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Lessons */}
          <div className="xl:col-span-2">
            <div className="card bg-white/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Bài học gần đây</h3>
                    <p className="text-blue-100">Tiếp tục hành trình học tập của bạn</p>
                  </div>
                  <button className="btn btn-secondary btn-sm bg-white/20 hover:bg-white/30 text-white border-white/30">
                    Xem tất cả
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {recentLessons.map((lesson, index) => (
                  <div key={index} className="group relative">
                    <div className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            lesson.status === 'completed' 
                              ? 'bg-gradient-to-br from-green-400 to-emerald-600' 
                              : 'bg-gradient-to-br from-blue-400 to-indigo-600'
                          }`}>
                            {lesson.status === 'completed' ? (
                              <Trophy className="w-6 h-6 text-white" />
                            ) : (
                              <Play className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-gray-900">{lesson.title}</h4>
                            <div className="flex items-center gap-3 mt-1">
                              <span className={`badge ${
                                lesson.status === 'completed' ? 'badge-default' : 'badge-secondary'
                              } text-xs`}>
                                {lesson.status === 'completed' ? 'Hoàn thành' : 'Đang học'}
                              </span>
                              <span className="text-sm text-gray-500">• {lesson.timeSpent}</span>
                            </div>
                          </div>
                        </div>
                        {lesson.score && (
                          <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-2 rounded-lg">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-bold text-yellow-700">{lesson.score}%</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Tiến độ: {lesson.progress}%</span>
                          <span className="font-medium">{lesson.progress}/100</span>
                        </div>
                        <div className="progress-container h-3 bg-gray-100">
                          <div 
                            className="progress-bar bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${lesson.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {lesson.status === 'in-progress' && (
                        <button className="btn btn-default mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300">
                          <Play className="w-4 h-4 mr-2" />
                          Tiếp tục học
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div className="card bg-white/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Thành tích</h3>
                    <p className="text-purple-100">Các mốc đích đã đạt được</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-full">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`relative p-4 rounded-xl border-2 transition-all duration-300 group overflow-hidden ${
                    achievement.earned 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm' 
                      : 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200 hover:border-gray-300'
                  }`}>
                    {/* Progress background for incomplete achievements */}
                    {!achievement.earned && achievement.progress && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                           style={{ width: `${achievement.progress}%` }}></div>
                    )}
                    
                    <div className="relative z-10 flex items-center space-x-4">
                      <div className={`text-3xl w-12 h-12 flex items-center justify-center rounded-full ${
                        achievement.earned ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-bold text-sm mb-1 ${
                          achievement.earned ? 'text-green-800' : 'text-gray-700'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-xs leading-relaxed ${
                          achievement.earned ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>
                        {!achievement.earned && achievement.progress && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Tiến độ</span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${achievement.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                      {achievement.earned && (
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                          <Trophy className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 pt-0">
                <button className="btn btn-default w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <Zap className="w-4 h-4 mr-2" />
                  Thử thách mới
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningDashboard;