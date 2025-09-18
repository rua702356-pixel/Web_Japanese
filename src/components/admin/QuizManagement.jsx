import { useState } from 'react';
import '../../styles/components/quiz-form.css';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Play,
  Eye,
  Download,
  Upload,
  Clock,
  Users,
  BarChart3,
  FileText,
  HelpCircle,
  Target,
  X,
  CheckCircle2,
  Send,
  BookOpen,
  Award,
  TrendingUp,
  Calendar,
  Filter,
  SortAsc,
  Copy,
  ExternalLink,
  Settings,
  AlertCircle
} from 'lucide-react';

const mockQuizData = [
  {
    id: '1',
    title: 'Kiểm tra Hiragana cơ bản - Bảng A-I-U-E-O',
    description: 'Bài kiểm tra toàn diện về bảng chữ cái Hiragana cơ bản, bao gồm cách đọc, viết và nhận biết các ký tự',
    level: 'N5',
    category: 'Chữ cái',
    timeLimit: 20,
    difficulty: 'Dễ',
    tags: ['Hiragana', 'Cơ bản', 'Bảng chữ cái'],
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        question: 'Cách đọc của ký tự あ là gì?',
        type: 'multiple_choice',
        options: ['a', 'i', 'u', 'e'],
        correctAnswer: 'a',
        explanation: 'あ được đọc là "a" - đây là ký tự đầu tiên trong bảng Hiragana',
        points: 1
      },
      {
        id: 'q2',
        question: 'Điền chữ cái thích hợp vào chỗ trống: こんにち___',
        type: 'fill_blank',
        correctAnswer: 'は',
        explanation: 'こんにちは (konnichiwa) - lời chào phổ biến trong tiếng Nhật',
        points: 2
      }
    ],
    isPublished: true,
    attempts: 245,
    averageScore: 87.5,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-25'
  },
  {
    id: '2', 
    title: 'Ngữ pháp N4 - Động từ và thể て (Te-form)',
    description: 'Bài kiểm tra chuyên sâu về ngữ pháp trình độ N4, tập trung vào động từ và cách biến đổi thể て',
    level: 'N4',
    category: 'Ngữ pháp',
    timeLimit: 35,
    difficulty: 'Trung bình',
    tags: ['Động từ', 'Te-form', 'N4'],
    passingScore: 75,
    questions: [
      {
        id: 'q3',
        question: 'Dạng て (te-form) của động từ 食べる là gì?',
        type: 'multiple_choice',
        options: ['食べて', '食べた', '食べない', '食べます'],
        correctAnswer: '食べて',
        explanation: '食べる (ru-verb) → 食べて. Động từ nhóm II bỏ る và thêm て',
        points: 2
      }
    ],
    isPublished: false,
    attempts: 0,
    averageScore: 0,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-26'
  },
  {
    id: '3',
    title: 'Từ vựng N3 - Cuộc sống hàng ngày',
    description: 'Bộ từ vựng thiết yếu cho cuộc sống hàng ngày ở Nhật Bản, phù hợp với trình độ N3',
    level: 'N3',
    category: 'Từ vựng',
    timeLimit: 25,
    difficulty: 'Trung bình',
    tags: ['Từ vựng', 'Cuộc sống', 'N3'],
    passingScore: 80,
    questions: [],
    isPublished: true,
    attempts: 128,
    averageScore: 74.2,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-28'
  }
];

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState(mockQuizData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('updated');

  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
  const categories = ['Chữ cái', 'Ngữ pháp', 'Từ vựng', 'Đọc hiểu', 'Nghe hiểu', 'Tổng hợp'];
  const difficulties = ['Dễ', 'Trung bình', 'Khó'];
  const questionTypes = [
    { value: 'multiple_choice', label: 'Trắc nghiệm' },
    { value: 'fill_blank', label: 'Điền vào chỗ trống' },
    { value: 'matching', label: 'Nối từ' },
    { value: 'true_false', label: 'Đúng/Sai' }
  ];

  // Filter and sort quizzes
  const filteredQuizzes = quizzes
    .filter(quiz => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = selectedLevel === '' || quiz.level === selectedLevel;
      const matchesCategory = selectedCategory === '' || quiz.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === '' || quiz.difficulty === selectedDifficulty;
      return matchesSearch && matchesLevel && matchesCategory && matchesDifficulty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'attempts':
          return b.attempts - a.attempts;
        case 'score':
          return b.averageScore - a.averageScore;
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'updated':
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

  // Statistics
  const stats = {
    total: quizzes.length,
    published: quizzes.filter(q => q.isPublished).length,
    draft: quizzes.filter(q => !q.isPublished).length,
    totalAttempts: quizzes.reduce((sum, q) => sum + q.attempts, 0),
    averageScore: quizzes.length > 0 ? 
      Math.round(quizzes.reduce((sum, q) => sum + q.averageScore, 0) / quizzes.length * 10) / 10 : 0
  };

  const handleAddQuiz = () => {
    setSelectedQuiz(null);
    setShowAddModal(true);
  };

  const handleEditQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setShowEditModal(true);
  };

  const handleViewQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setShowViewModal(true);
  };

  const handleDeleteQuiz = (id) => {
    const quiz = quizzes.find(q => q.id === id);
    if (window.confirm(`Bạn có chắc chắn muốn xóa bài kiểm tra "${quiz?.title}"?\nHành động này không thể hoàn tác.`)) {
      setQuizzes(prev => prev.filter(quiz => quiz.id !== id));
    }
  };

  const handleTogglePublish = (id) => {
    setQuizzes(prev => prev.map(quiz => 
      quiz.id === id ? { ...quiz, isPublished: !quiz.isPublished } : quiz
    ));
  };

  return (
    <div className="quiz-management">
      <div className="quiz-management-container">
        <div className="quiz-management-content">
          {/* Header */}
          <div className="quiz-management-header">
            <div>
              <h1 className="quiz-management-title">Quản lý bài kiểm tra</h1>
              <p className="quiz-management-subtitle">Tạo, chỉnh sửa và quản lý các bài kiểm tra</p>
            </div>
            <button 
              className="btn btn-primary"
              onClick={handleAddQuiz}
            >
              <Plus className="w-4 h-4 mr-2" />
              Tạo bài kiểm tra mới
            </button>
          </div>

          {/* Stats */}
          <div className="quiz-stats-container">
            <div className="quiz-stat-card">
              <div className="quiz-stat-icon bg-blue-100 text-blue-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="quiz-stat-value">{stats.total}</div>
                <div className="quiz-stat-label">Tổng bài kiểm tra</div>
              </div>
            </div>
            
            <div className="quiz-stat-card">
              <div className="quiz-stat-icon bg-green-100 text-green-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="quiz-stat-value">{stats.published}</div>
                <div className="quiz-stat-label">Đã xuất bản</div>
              </div>
            </div>
            
            <div className="quiz-stat-card">
              <div className="quiz-stat-icon bg-gray-100 text-gray-600">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="quiz-stat-value">{stats.draft}</div>
                <div className="quiz-stat-label">Bản nháp</div>
              </div>
            </div>
            
            <div className="quiz-stat-card">
              <div className="quiz-stat-icon bg-purple-100 text-purple-600">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="quiz-stat-value">{stats.totalAttempts}</div>
                <div className="quiz-stat-label">Lượt làm bài</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="card p-4 mb-6">
            <div className="quiz-filters-container">
              <div className="quiz-search-container">
                <Search className="quiz-search-icon" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài kiểm tra..."
                  className="input quiz-search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="quiz-filter-group">
                <Filter className="quiz-filter-icon" />
                <select
                  className="select"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  <option value="">Tất cả mức độ</option>
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                
                <select
                  className="select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Tất cả danh mục</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select
                  className="select"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  <option value="">Tất cả độ khó</option>
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
                
                <select
                  className="select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="updated">Sắp xếp theo cập nhật</option>
                  <option value="created">Sắp xếp theo tạo mới</option>
                  <option value="attempts">Sắp xếp theo lượt làm</option>
                  <option value="score">Sắp xếp theo điểm TB</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quiz List */}
          <div className="card">
            <div className="p-6">
              <div className="quiz-list-header">
                <h2 className="text-xl font-semibold">Danh sách bài kiểm tra</h2>
                <div className="quiz-list-controls">
                  <div className="quiz-tab-group">
                    <button 
                      className={`quiz-tab ${activeTab === 'all' ? 'active' : ''}`}
                      onClick={() => setActiveTab('all')}
                    >
                      Tất cả
                    </button>
                    <button 
                      className={`quiz-tab ${activeTab === 'published' ? 'active' : ''}`}
                      onClick={() => setActiveTab('published')}
                    >
                      Đã xuất bản
                    </button>
                    <button 
                      className={`quiz-tab ${activeTab === 'draft' ? 'active' : ''}`}
                      onClick={() => setActiveTab('draft')}
                    >
                      Bản nháp
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="quiz-list-container">
                {filteredQuizzes.length > 0 ? (
                  <div className="quiz-grid">
                    {filteredQuizzes.map(quiz => (
                      <div key={quiz.id} className="quiz-card">
                        <div className="quiz-card-header">
                          <div className="quiz-card-title-section">
                            <h3 className="quiz-card-title">{quiz.title}</h3>
                            <div className="quiz-card-badges">
                              <span className="badge">
                                {quiz.level}
                              </span>
                              <span className="badge badge-outline">
                                {quiz.category}
                              </span>
                              <span className="badge badge-outline">
                                {quiz.difficulty}
                              </span>
                              <span className={`badge ${quiz.isPublished ? 'badge-default' : 'badge-secondary'}`}>
                                {quiz.isPublished ? 'Đã xuất bản' : 'Bản nháp'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="quiz-card-actions">
                            <button
                              className="btn btn-ghost btn-sm"
                              onClick={() => handleViewQuiz(quiz)}
                              title="Xem chi tiết"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="btn btn-ghost btn-sm"
                              onClick={() => handleEditQuiz(quiz)}
                              title="Chỉnh sửa"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              className="btn btn-ghost btn-sm"
                              onClick={() => handleTogglePublish(quiz.id)}
                              title={quiz.isPublished ? 'Ẩn bài kiểm tra' : 'Xuất bản bài kiểm tra'}
                            >
                              {quiz.isPublished ? (
                                <Eye className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              className="btn btn-ghost btn-sm text-destructive"
                              onClick={() => handleDeleteQuiz(quiz.id)}
                              title="Xóa bài kiểm tra"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="quiz-card-content">
                          <p className="quiz-card-description">{quiz.description}</p>
                          
                          <div className="quiz-card-stats">
                            <div className="quiz-card-stat">
                              <Clock className="w-4 h-4" />
                              <span>{quiz.timeLimit} phút</span>
                            </div>
                            <div className="quiz-card-stat">
                              <HelpCircle className="w-4 h-4" />
                              <span>{quiz.questions.length} câu hỏi</span>
                            </div>
                            <div className="quiz-card-stat">
                              <Users className="w-4 h-4" />
                              <span>{quiz.attempts} lượt làm</span>
                            </div>
                            <div className="quiz-card-stat">
                              <BarChart3 className="w-4 h-4" />
                              <span>{quiz.averageScore}% điểm TB</span>
                            </div>
                          </div>
                          
                          <div className="quiz-card-tags">
                            {quiz.tags.map((tag, index) => (
                              <span key={index} className="badge badge-outline">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="quiz-empty-state">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-center mb-2">Không tìm thấy bài kiểm tra</h3>
                    <p className="text-gray-500 text-center mb-4">
                      {searchTerm || selectedLevel || selectedCategory || selectedDifficulty
                        ? 'Thử thay đổi bộ lọc để xem kết quả'
                        : 'Bắt đầu tạo bài kiểm tra đầu tiên của bạn'}
                    </p>
                    {!searchTerm && !selectedLevel && !selectedCategory && !selectedDifficulty && (
                      <button 
                        className="btn btn-primary mx-auto"
                        onClick={handleAddQuiz}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Tạo bài kiểm tra đầu tiên
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add/Edit Modal */}
      <div className={`dialog-overlay ${showAddModal || showEditModal ? '' : 'hidden'}`}>
        <div className="dialog-content max-w-2xl">
          <div className="dialog-header">
            <button 
              className="dialog-close"
              onClick={() => {
                setShowAddModal(false);
                setShowEditModal(false);
              }}
            >
              <X className="w-4 h-4" />
            </button>
            <h2 className="dialog-title">
              {showEditModal ? 'Chỉnh sửa bài kiểm tra' : 'Tạo bài kiểm tra mới'}
            </h2>
            <p className="text-muted-foreground">
              {showEditModal ? 'Chỉnh sửa thông tin bài kiểm tra' : 'Tạo bài kiểm tra mới để đánh giá học viên'}
            </p>
          </div>
          
          <div className="dialog-body">
            <div className="text-center py-8">
              <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Settings className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chỉnh sửa bài kiểm tra</h3>
              <p className="text-gray-600 mb-4">Tính năng chỉnh sửa bài kiểm tra đang được phát triển...</p>
              <button className="btn btn-primary">
                Sắp ra mắt
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Modal */}
      <div className={`dialog-overlay ${showViewModal ? '' : 'hidden'}`}>
        <div className="dialog-content max-w-5xl">
          <div className="dialog-body" style={{ padding: 0 }}>
            {selectedQuiz && (
              <div className="quiz-detail-container">
                <button 
                  className="quiz-detail-close"
                  onClick={() => setShowViewModal(false)}
                  aria-label="Đóng chi tiết bài kiểm tra"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="quiz-detail-header">
                  <h3 className="quiz-detail-title">{selectedQuiz.title}</h3>
                  <div className="quiz-detail-badges">
                    <span className="quiz-detail-badge level">
                      {selectedQuiz.level}
                    </span>
                    <span className="quiz-detail-badge category">
                      {selectedQuiz.category}
                    </span>
                    {selectedQuiz.difficulty && (
                      <span className="quiz-detail-badge category">
                        {selectedQuiz.difficulty}
                      </span>
                    )}
                    <span className={`quiz-detail-badge status ${selectedQuiz.isPublished ? '' : 'draft'}`}>
                      {selectedQuiz.isPublished ? 'Đã xuất bản' : 'Bản nháp'}
                    </span>
                  </div>
                  <p className="quiz-detail-description">{selectedQuiz.description}</p>
                </div>
                
                <div className="quiz-stats-grid">
                  <div className="quiz-stat-card">
                    <span className="quiz-stat-value">{selectedQuiz.timeLimit}</span>
                    <span className="quiz-stat-label">Phút</span>
                  </div>
                  <div className="quiz-stat-card">
                    <span className="quiz-stat-value">{selectedQuiz.questions.length}</span>
                    <span className="quiz-stat-label">Câu hỏi</span>
                  </div>
                  <div className="quiz-stat-card">
                    <span className="quiz-stat-value">{selectedQuiz.attempts}</span>
                    <span className="quiz-stat-label">Lượt làm</span>
                  </div>
                  <div className="quiz-stat-card">
                    <span className="quiz-stat-value">{selectedQuiz.averageScore}%</span>
                    <span className="quiz-stat-label">Điểm TB</span>
                  </div>
                  {selectedQuiz.passingScore && (
                    <div className="quiz-stat-card">
                      <span className="quiz-stat-value">{selectedQuiz.passingScore}%</span>
                      <span className="quiz-stat-label">Điểm qua</span>
                    </div>
                  )}
                </div>
                
                <div className="quiz-questions-section">
                  <div className="quiz-questions-header">
                    <HelpCircle className="quiz-questions-icon" />
                    <h4 className="quiz-questions-title">Danh sách câu hỏi</h4>
                  </div>
                  <div>
                    {selectedQuiz.questions.length > 0 ? (
                      selectedQuiz.questions.map((question, index) => (
                        <div key={question.id} className="quiz-question-item">
                          <div className="quiz-question-header">
                            <h5 className="quiz-question-title">
                              Câu {index + 1}: {question.question}
                            </h5>
                            <span className="quiz-question-points">{question.points} điểm</span>
                          </div>
                          
                          <span className="quiz-question-type">
                            {questionTypes.find(t => t.value === question.type)?.label}
                          </span>
                          
                          {question.options && (
                            <div className="quiz-question-options">
                              <p className="quiz-detail-text">
                                <strong>Lựa chọn:</strong> {question.options.join(', ')}
                              </p>
                            </div>
                          )}
                          
                          <div className="quiz-question-answer">
                            <p className="quiz-detail-text">
                              <strong>Đáp án:</strong> {Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : question.correctAnswer}
                            </p>
                          </div>
                          
                          {question.explanation && (
                            <div className="quiz-question-explanation">
                              <p className="quiz-detail-text">
                                <strong>Giải thích:</strong> {question.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">Chưa có câu hỏi nào được thêm vào bài kiểm tra này.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizManagement;