import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '../../hooks/use-navigation';
import { useActionHandler } from '../../hooks/use-action-handler';
import PageLayout from '../../layouts/PageLayout';
import Hero from "../../components/common/Hero";
import LearningDashboard from "../../components/user/LearningDashboard";
import AlphabetSection from "../../components/learning/AlphabetSection";
import GrammarSection from "../../components/learning/GrammarSection";
import VocabularySection from "../../components/learning/VocabularySection";
import PracticeSection from "../../components/learning/PracticeSection";
import JLPTPreparation from "../../components/learning/JLPTPreparation";
import Dictionary from "../user/Dictionary";
import { 
  BookOpen, 
  Target, 
  Users, 
  Award, 
  TrendingUp, 
  ChevronRight,
  Play,
  Bookmark,
  Clock,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const { goToLearning, goToPractice, goToProfile } = useNavigation();
  const { handleLoad, isLoading } = useActionHandler();
  
  const [learningStats, setLearningStats] = useState({
    lessonsCompleted: 0,
    totalLessons: 50,
    wordsLearned: 0,
    studyStreak: 0,
    jlptLevel: 'N5'
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [showAllSections, setShowAllSections] = useState(!isAuthenticated);

  // Quick actions for authenticated users
  const quickActions = [
    {
      id: 'continue-lesson',
      title: 'Tiếp tục bài học',
      description: 'Học tiếp từ nơi bạn đã dừng lại',
      icon: Play,
      href: '/lessons',
      color: 'bg-blue-500',
      requiresAuth: true
    },
    {
      id: 'practice-vocab',
      title: 'Luyện từ vựng',
      description: 'Ôn tập với flashcards',
      icon: BookOpen,
      href: '/flashcards',
      color: 'bg-green-500',
      requiresAuth: true
    },
    {
      id: 'take-quiz',
      title: 'Kiểm tra',
      description: 'Đánh giá trình độ hiện tại',
      icon: Target,
      href: '/quiz',
      color: 'bg-purple-500',
      requiresAuth: true
    },
    {
      id: 'jlpt-prep',
      title: 'Luyện thi JLPT',
      description: 'Chuẩn bị cho kỳ thi',
      icon: Award,
      href: '/jlpt',
      color: 'bg-orange-500',
      requiresAuth: true
    }
  ];

  // Load user data on component mount
  useEffect(() => {
    if (isAuthenticated) {
      loadUserData();
    }
  }, [isAuthenticated]);

  const loadUserData = async () => {
    await handleLoad(async () => {
      // Simulate API call to load user stats
      const mockStats = {
        lessonsCompleted: 12,
        totalLessons: 50,
        wordsLearned: 156,
        studyStreak: 7,
        jlptLevel: 'N5'
      };
      
      const mockActivity = [
        {
          id: 1,
          type: 'lesson',
          title: 'Học bài "Giới thiệu bản thân"',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          completed: true
        },
        {
          id: 2,
          type: 'vocabulary',
          title: 'Học 15 từ vựng mới',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          completed: true
        },
        {
          id: 3,
          type: 'quiz',
          title: 'Hoàn thành quiz N5 Level 1',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          completed: true
        }
      ];
      
      setLearningStats(mockStats);
      setRecentActivity(mockActivity);
    }, {
      showLoading: false,
      errorMessage: 'Không thể tải dữ liệu người dùng'
    });
  };

  const handleQuickAction = (action) => {
    if (action.requiresAuth && !isAuthenticated) {
      // Redirect to login if not authenticated
      return;
    }
    
    switch (action.id) {
      case 'continue-lesson':
        goToLearning('lessons');
        break;
      case 'practice-vocab':
        goToPractice('flashcards');
        break;
      case 'take-quiz':
        goToPractice('quiz');
        break;
      case 'jlpt-prep':
        goToPractice('jlpt');
        break;
      default:
        break;
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Vừa xong';
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    return `${Math.floor(diffInHours / 24)} ngày trước`;
  };

  const progressPercentage = Math.round((learningStats.lessonsCompleted / learningStats.totalLessons) * 100);

  return (
    <PageLayout 
      showBreadcrumb={false} 
      showFooter={true}
      maxWidth="full"
      className="p-0"
    >
      <div className="index-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container-full">
            <Hero />
          </div>
        </section>
        
        {/* Authenticated User Dashboard */}
        {isAuthenticated && (
          <section className="section dashboard-section bg-gray-50">
            <div className="container-full">
              <div className="px-4 md:px-6 lg:px-8">
                {/* Welcome Section */}
                <div className="welcome-section mb-8">
                  <h2 className="text-2xl font-bold mb-2">Xin chào, {user?.fullName || user?.username}! 👋</h2>
                  <p className="text-muted-foreground">Hãy tiếp tục hành trình học tiếng Nhật của bạn</p>
                </div>

              {/* Quick Stats */}
              <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="card">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Tiến độ bài học</p>
                        <p className="text-2xl font-bold">{progressPercentage}%</p>
                        <p className="text-xs text-muted-foreground">{learningStats.lessonsCompleted}/{learningStats.totalLessons} bài</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-blue-500" />
                    </div>
                  </div>
                </div>
                
                <div className="card">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Từ vựng đã học</p>
                        <p className="text-2xl font-bold">{learningStats.wordsLearned}</p>
                        <p className="text-xs text-muted-foreground">từ</p>
                      </div>
                      <BookOpen className="w-8 h-8 text-green-500" />
                    </div>
                  </div>
                </div>
                
                <div className="card">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Chuỗi học tập</p>
                        <p className="text-2xl font-bold">{learningStats.studyStreak}</p>
                        <p className="text-xs text-muted-foreground">ngày</p>
                      </div>
                      <Award className="w-8 h-8 text-orange-500" />
                    </div>
                  </div>
                </div>
                
                <div className="card">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Mức độ JLPT</p>
                        <p className="text-2xl font-bold">{learningStats.jlptLevel}</p>
                        <p className="text-xs text-muted-foreground">hiện tại</p>
                      </div>
                      <Target className="w-8 h-8 text-purple-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card quick-actions-card mb-8">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <ChevronRight className="w-5 h-5" />
                    Hành động nhanh
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={action.id}
                          className="btn btn-outline quick-action-btn h-auto p-4 flex flex-col items-start gap-2 hover:bg-muted transition-colors"
                          onClick={() => handleQuickAction(action)}
                          disabled={isLoading}
                        >
                          <div className={`p-2 rounded-lg ${action.color} text-white`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium">{action.title}</div>
                            <div className="text-xs text-muted-foreground">{action.description}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="activity-section grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="card">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Hoạt động gần đây
                      </h3>
                      <div className="space-y-4">
                        {recentActivity.map((activity) => (
                          <div key={activity.id} className="activity-item flex items-center gap-3 p-3 rounded-lg border">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <div className="flex-1">
                              <p className="font-medium">{activity.title}</p>
                              <p className="text-sm text-muted-foreground">{formatTimeAgo(activity.timestamp)}</p>
                            </div>
                            <span className="badge badge-secondary">
                              {activity.type === 'lesson' ? 'Bài học' : 
                               activity.type === 'vocabulary' ? 'Từ vựng' : 'Quiz'}
                            </span>
                          </div>
                        ))}
                      </div>
                      <button 
                        className="btn btn-ghost w-full mt-4"
                        onClick={goToProfile}
                      >
                        Xem tất cả hoạt động
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="card">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Bookmark className="w-5 h-5" />
                        Mục tiêu tuần này
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Hoàn thành 5 bài học</span>
                          <span className="badge badge-outline">3/5</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Học 50 từ vựng mới</span>
                          <span className="badge badge-outline">32/50</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Luyện tập 30 phút/ngày</span>
                          <span className="badge badge-secondary">Hoàn thành</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </section>
        )}
        
        {/* Learning Dashboard - Show for all users */}
        <section className="section learning-dashboard-section">
          <div className="container-full">
            <div className="px-4 md:px-6 lg:px-8">
              <LearningDashboard />
            </div>
          </div>
        </section>
        
        {/* Content Sections - Show based on authentication */}
        {(showAllSections || !isAuthenticated) && (
          <>
            <section className="section alphabet-section bg-gray-50">
              <div className="container-full">
                <div className="px-4 md:px-6 lg:px-8">
                  <AlphabetSection />
                </div>
              </div>
            </section>
            
            <section className="section grammar-section">
              <div className="container-full">
                <div className="px-4 md:px-6 lg:px-8">
                  <GrammarSection />
                </div>
              </div>
            </section>
            
            <section className="section vocabulary-section bg-gray-50">
              <div className="container-full">
                <div className="px-4 md:px-6 lg:px-8">
                  <VocabularySection />
                </div>
              </div>
            </section>
            
            <section className="section practice-section">
              <div className="container-full">
                <div className="px-4 md:px-6 lg:px-8">
                  <PracticeSection />
                </div>
              </div>
            </section>
            
            <section className="section jlpt-section bg-gray-50">
              <div className="container-full">
                <div className="px-4 md:px-6 lg:px-8">
                  <JLPTPreparation />
                </div>
              </div>
            </section>
            
            <section className="section dictionary-section">
              <div className="container-full">
                <div className="px-4 md:px-6 lg:px-8">
                  <Dictionary />
                </div>
              </div>
            </section>
          </>
        )}
        
        {/* Toggle button for authenticated users */}
        {isAuthenticated && (
          <section className="section toggle-section text-center">
            <div className="container-full">
              <div className="px-4 md:px-6 lg:px-8">
                <button
                  className="btn btn-outline mb-8"
                  onClick={() => setShowAllSections(!showAllSections)}
                >
                  {showAllSections ? 'Ẩn các phần học tập' : 'Xem tất cả các phần học tập'}
                  <ChevronRight className={`w-4 h-4 ml-2 transition-transform ${
                    showAllSections ? 'rotate-90' : ''
                  }`} />
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  );
};

export default Index;