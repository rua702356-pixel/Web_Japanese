import {
  Users,
  BookOpen,
  FileText,
  MessageSquare,
  TestTube,
  TrendingUp,
  Clock,
  Plus,
  Activity,
  BarChart3,
  Zap,
  Sparkles,
  ArrowRight,
  Eye,
  Star,
  Shield,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Enhanced stats with modern styling and trends
  const stats = [
    {
      title: 'Tổng người dùng',
      value: '2,431',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      description: 'Người dùng hoạt động'
    },
    {
      title: 'Bài học',
      value: '156',
      change: '+3',
      changeType: 'increase',
      icon: BookOpen,
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
      description: 'Bài học đã tạo'
    },
    {
      title: 'Từ vựng',
      value: '3,247',
      change: '+89',
      changeType: 'increase',
      icon: MessageSquare,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      description: 'Từ vựng trong hệ thống'
    },
    {
      title: 'Bài kiểm tra',
      value: '87',
      change: '+5',
      changeType: 'increase',
      icon: TestTube,
      gradient: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
      description: 'Bài kiểm tra hoạt động'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Thêm từ vựng mới',
      target: 'いぬ (inu) - con chó',
      time: '5 phút trước',
      type: 'create'
    },
    {
      id: 2,
      action: 'Cập nhật ngữ pháp',
      target: 'Cấu trúc です/である',
      time: '1 giờ trước',
      type: 'update'
    },
    {
      id: 3,
      action: 'Xóa bài kiểm tra',
      target: 'JLPT N5 Practice #12',
      time: '2 giờ trước',
      type: 'delete'
    },
    {
      id: 4,
      action: 'Thêm người dùng mới',
      target: 'user@example.com',
      time: '3 giờ trước',
      type: 'create'
    }
  ];

  const quickActions = [
    {
      title: 'Thêm từ vựng',
      description: 'Thêm từ vựng mới vào từ điển',
      href: '/admin/vocabulary/new',
      icon: MessageSquare,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Tạo bài kiểm tra',
      description: 'Tạo bài kiểm tra mới cho học viên',
      href: '/admin/quiz/new',
      icon: TestTube,
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Thêm ngữ pháp',
      description: 'Thêm cấu trúc ngữ pháp mới',
      href: '/admin/grammar/new',
      icon: BookOpen,
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Quản lý người dùng',
      description: 'Xem và quản lý tài khoản người dùng',
      href: '/admin/users',
      icon: Users,
      gradient: 'from-blue-500 to-blue-600'
    }
  ];

  const getActivityTypeText = (type) => {
    switch (type) {
      case 'create':
        return 'Tạo mới';
      case 'update':
        return 'Cập nhật';
      case 'delete':
        return 'Xóa';
      default:
        return 'Khác';
    }
  };

  return (
    <div className="space-y-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 opacity-50"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10">
        {/* Modern Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 shadow-lg">
            <Shield className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-600 uppercase tracking-wide">Quản trị viên</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Tổng quan Hệ thống
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Quản lý và giám sát toàn bộ hoạt động của nền tảng học tiếng Nhật
          </p>
        </div>

        {/* Modern Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card card-modern group hover-lift relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-20`}></div>
                <div className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.description}
                      </p>
                    </div>
                    <div className={`p-3 rounded-2xl bg-gradient-to-r ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">{stat.change}</span>
                    <span className="text-muted-foreground ml-1">từ tháng trước</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="xl:col-span-2">
            <div className="card card-modern overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Thao tác nhanh</h3>
                    <p className="text-indigo-100">Các tác vụ thường dùng để quản lý nội dung</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-full">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Link
                        key={index}
                        to={action.href}
                        className="block p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group bg-gradient-to-r from-white to-gray-50"
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${action.gradient} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-2">
                              {action.title}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {action.description}
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div>
            <div className="card card-modern overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Hoạt động gần đây</h3>
                    <p className="text-green-100">Theo dõi các thay đổi mới nhất</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-full">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <span 
                        className={`badge ${
                          activity.type === 'create' ? 'badge-default' : 
                          activity.type === 'update' ? 'badge-secondary' : 'badge-destructive'
                        } mt-1 text-xs`}
                      >
                        {getActivityTypeText(activity.type)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {activity.action}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {activity.target}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t">
                  <button className="btn btn-ghost w-full group">
                    <Link to="/admin/activities" className="flex items-center justify-center">
                      Xem tất cả hoạt động
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Management Overview */}
        <div className="card card-modern overflow-hidden mt-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Quản lý nội dung</h3>
                <p className="text-purple-100">Tổng quan về tài liệu học tập</p>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <FileText className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2 text-gray-900">Bảng chữ cái</h4>
                  <p className="text-3xl font-bold text-indigo-600 mb-2">46+46</p>
                  <p className="text-sm text-muted-foreground mb-4">Hiragana + Katakana</p>
                  <button className="btn btn-outline btn-sm group-hover:bg-indigo-50 group-hover:border-indigo-200">
                    <Link to="/admin/alphabet">Quản lý</Link>
                  </button>
                </div>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2 text-gray-900">Ngữ pháp</h4>
                  <p className="text-3xl font-bold text-green-600 mb-2">156</p>
                  <p className="text-sm text-muted-foreground mb-4">Cấu trúc ngữ pháp</p>
                  <button className="btn btn-outline btn-sm group-hover:bg-green-50 group-hover:border-green-200">
                    <Link to="/admin/grammar">Quản lý</Link>
                  </button>
                </div>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <MessageSquare className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2 text-gray-900">Từ vựng</h4>
                  <p className="text-3xl font-bold text-purple-600 mb-2">3,247</p>
                  <p className="text-sm text-muted-foreground mb-4">Từ và cụm từ</p>
                  <button className="btn btn-outline btn-sm group-hover:bg-purple-50 group-hover:border-purple-200">
                    <Link to="/admin/vocabulary">Quản lý</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;