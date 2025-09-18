import { useState } from "react";
import { 
  TrendingUp,
  Target,
  BookOpen,
  CheckCircle
} from "lucide-react";
import PageLayout from "../../layouts/PageLayout";

const ProgressTracking = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [activeTab, setActiveTab] = useState('progress');

  const weeklyProgress = {
    studyDays: 5,
    totalTime: 180, // minutes
    lessonsCompleted: 12,
    vocabularyLearned: 45,
    averageScore: 87,
    streak: 7,
    dailyGoalMet: 71 // percentage
  };

  const monthlyProgress = {
    studyDays: 22,
    totalTime: 720, // minutes
    lessonsCompleted: 48,
    vocabularyLearned: 180,
    averageScore: 85,
    streak: 15,
    dailyGoalMet: 73
  };

  const yearlyProgress = {
    studyDays: 185,
    totalTime: 5400, // minutes
    lessonsCompleted: 240,
    vocabularyLearned: 890,
    averageScore: 83,
    streak: 25,
    dailyGoalMet: 68
  };

  const currentProgress = selectedPeriod === 'week' ? weeklyProgress : 
                         selectedPeriod === 'month' ? monthlyProgress : yearlyProgress;

  const skillProgress = [
    { skill: "Hiragana", progress: 95, level: "Thành thạo", color: "bg-green-500" },
    { skill: "Katakana", progress: 88, level: "Giỏi", color: "bg-blue-500" },
    { skill: "Kanji N5", progress: 65, level: "Trung bình", color: "bg-yellow-500" },
    { skill: "Từ vựng N5", progress: 72, level: "Khá", color: "bg-orange-500" },
    { skill: "Ngữ pháp N5", progress: 58, level: "Cơ bản", color: "bg-red-500" },
    { skill: "Nghe hiểu", progress: 45, level: "Cần cải thiện", color: "bg-purple-500" }
  ];

  const weeklyActivity = [
    { day: "CN", completed: true, time: 25, lessons: 2 },
    { day: "T2", completed: true, time: 35, lessons: 3 },
    { day: "T3", completed: false, time: 0, lessons: 0 },
    { day: "T4", completed: true, time: 40, lessons: 2 },
    { day: "T5", completed: true, time: 30, lessons: 3 },
    { day: "T6", completed: true, time: 50, lessons: 2 },
    { day: "T7", completed: false, time: 0, lessons: 0 }
  ];

  const achievements = [
    {
      title: "Streak Master",
      description: "Học 7 ngày liên tiếp",
      icon: "🔥",
      unlocked: true,
      date: "2024-03-15"
    },
    {
      title: "Hiragana Hero",
      description: "Thành thạo toàn bộ Hiragana",
      icon: "🎌",
      unlocked: true,
      date: "2024-03-10"
    },
    {
      title: "Vocabulary Collector",
      description: "Học 500 từ vựng",
      icon: "📚",
      unlocked: false,
      progress: 78
    },
    {
      title: "Quiz Champion",
      description: "Đạt 90% trong 10 quiz liên tiếp",
      icon: "🏆",
      unlocked: false,
      progress: 60
    }
  ];

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <PageLayout 
      title="Theo dõi tiến độ" 
      description="Phân tích chi tiết quá trình học tập và đạt được mục tiêu của bạn"
      showBreadcrumb={true}
      showFooter={false}
    >
      <section className="py-16 bg-gradient-card">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Theo dõi tiến độ
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Phân tích chi tiết quá trình học tập và đạt được mục tiêu của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Overview Stats */}
          <div className="lg:col-span-1">
            <div className="card p-6 mb-6">
              <h3 className="font-bold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Tổng quan
              </h3>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-primary rounded-lg text-white">
                  <div className="text-2xl font-bold">{currentProgress.streak}</div>
                  <div className="text-sm opacity-90">Ngày streak</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Ngày học:</span>
                    <span className="font-medium">{currentProgress.studyDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Thời gian:</span>
                    <span className="font-medium">{formatTime(currentProgress.totalTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Bài học:</span>
                    <span className="font-medium">{currentProgress.lessonsCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Từ vựng:</span>
                    <span className="font-medium">{currentProgress.vocabularyLearned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Điểm TB:</span>
                    <span className="font-medium">{currentProgress.averageScore}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Period Selector */}
            <div className="card p-4">
              <h4 className="font-medium mb-3">Thời gian</h4>
              <div className="space-y-2">
                {[
                  { key: 'week', label: 'Tuần này' },
                  { key: 'month', label: 'Tháng này' },
                  { key: 'year', label: 'Năm này' }
                ].map(period => (
                  <button
                    key={period.key}
                    className={`btn w-full justify-start ${
                      selectedPeriod === period.key ? 'btn-default' : 'btn-outline'
                    } btn-sm`}
                    onClick={() => setSelectedPeriod(period.key)}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="tabs space-y-6">
              <div className="tabs-list grid w-full grid-cols-4">
                <button 
                  className={`tab-trigger ${activeTab === 'progress' ? 'active' : ''}`}
                  onClick={() => setActiveTab('progress')}
                >
                  Tiến độ
                </button>
                <button 
                  className={`tab-trigger ${activeTab === 'activity' ? 'active' : ''}`}
                  onClick={() => setActiveTab('activity')}
                >
                  Hoạt động
                </button>
                <button 
                  className={`tab-trigger ${activeTab === 'skills' ? 'active' : ''}`}
                  onClick={() => setActiveTab('skills')}
                >
                  Kỹ năng
                </button>
                <button 
                  className={`tab-trigger ${activeTab === 'achievements' ? 'active' : ''}`}
                  onClick={() => setActiveTab('achievements')}
                >
                  Thành tích
                </button>
              </div>

              {activeTab === 'progress' && (
                <div className="tab-content space-y-6">
                  {/* Daily Goal Progress */}
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">Mục tiêu hàng ngày</h3>
                      <span className="badge badge-secondary">{currentProgress.dailyGoalMet}% hoàn thành</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Thời gian học (30 phút/ngày)</span>
                          <span>25/30 phút</span>
                        </div>
                        <div className="progress-container h-2">
                          <div className="progress-bar" style={{ width: '83%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Bài học (2 bài/ngày)</span>
                          <span>2/2 bài</span>
                        </div>
                        <div className="progress-container h-2">
                          <div className="progress-bar" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Từ vựng mới (5 từ/ngày)</span>
                          <span>3/5 từ</span>
                        </div>
                        <div className="progress-container h-2">
                          <div className="progress-bar" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Weekly Activity Chart */}
                  <div className="card p-6">
                    <h3 className="text-lg font-bold mb-4">Hoạt động trong tuần</h3>
                    <div className="grid grid-cols-7 gap-2">
                      {weeklyActivity.map((day, index) => (
                        <div key={index} className="text-center">
                          <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
                          <div 
                            className={`h-16 rounded-lg flex flex-col items-center justify-center text-xs ${
                              day.completed 
                                ? 'bg-green-500 text-white' 
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {day.completed ? (
                              <>
                                <CheckCircle className="w-4 h-4 mb-1" />
                                <span>{day.time}m</span>
                              </>
                            ) : (
                              <span>-</span>
                            )}
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
                    <h3 className="text-lg font-bold mb-4">Lịch sử học tập</h3>
                    <div className="space-y-4">
                      {[
                        { time: "2 giờ trước", activity: "Hoàn thành bài học Kanji N5", score: 92 },
                        { time: "5 giờ trước", activity: "Luyện tập từ vựng gia đình", score: 88 },
                        { time: "1 ngày trước", activity: "Quiz Hiragana cơ bản", score: 95 },
                        { time: "1 ngày trước", activity: "Flashcard Katakana", score: 87 },
                        { time: "2 ngày trước", activity: "Bài học ngữ pháp です", score: 90 }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <div className="font-medium">{item.activity}</div>
                            <div className="text-sm text-muted-foreground">{item.time}</div>
                          </div>
                          <span className="badge badge-secondary">{item.score}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="tab-content space-y-6">
                  <div className="card p-6">
                    <h3 className="text-lg font-bold mb-4">Phân tích kỹ năng</h3>
                    <div className="space-y-4">
                      {skillProgress.map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{skill.skill}</span>
                            <div className="flex items-center space-x-2">
                              <span className="badge badge-outline">{skill.level}</span>
                              <span className="text-sm font-medium">{skill.progress}%</span>
                            </div>
                          </div>
                          <div className="relative">
                            <div className="progress-container h-3">
                              <div 
                                className={`absolute top-0 left-0 h-3 rounded-full ${skill.color} transition-all duration-300`}
                                style={{ width: `${skill.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card p-6">
                    <h3 className="text-lg font-bold mb-4">Đề xuất cải thiện</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <Target className="w-4 h-4 text-yellow-600 mt-0.5" />
                          <div>
                            <div className="font-medium text-yellow-800">Tập trung vào Nghe hiểu</div>
                            <div className="text-sm text-yellow-700">Kỹ năng này cần được cải thiện. Hãy dành thêm thời gian luyện nghe.</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <BookOpen className="w-4 h-4 text-blue-600 mt-0.5" />
                          <div>
                            <div className="font-medium text-blue-800">Ôn tập Kanji thường xuyên</div>
                            <div className="text-sm text-blue-700">Luyện tập Kanji mỗi ngày để cải thiện khả năng ghi nhớ.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="tab-content space-y-6">
                  <div className="card p-6">
                    <h3 className="text-lg font-bold mb-4">Thành tích đã đạt được</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border ${
                            achievement.unlocked
                              ? 'bg-green-50 border-green-200'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="text-2xl">{achievement.icon}</div>
                            <div className="flex-1">
                              <h4 className={`font-medium ${
                                achievement.unlocked ? 'text-green-700' : 'text-muted-foreground'
                              }`}>
                                {achievement.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                {achievement.description}
                              </p>
                              
                              {achievement.unlocked ? (
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

                  <div className="card p-6">
                    <h3 className="text-lg font-bold mb-4">Thống kê tổng quát</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">4</div>
                        <div className="text-sm text-muted-foreground">Thành tích đã mở</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-500">2</div>
                        <div className="text-sm text-muted-foreground">Đang tiến bộ</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-500">87%</div>
                        <div className="text-sm text-muted-foreground">Tỷ lệ hoàn thành</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-500">15</div>
                        <div className="text-sm text-muted-foreground">Streak tối đa</div>
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

export default ProgressTracking;