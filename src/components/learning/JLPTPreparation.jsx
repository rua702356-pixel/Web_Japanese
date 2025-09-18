import { 
  Award,
  Clock,
  Target,
  CheckCircle,
  PlayCircle,
  TrendingUp,
  Users,
  Calendar
} from "lucide-react";
import PageLayout from "../../layouts/PageLayout";

const JLPTPreparation = () => {
  const jlptLevels = [
    {
      level: "N5",
      name: "Cơ bản",
      description: "Hiểu được những câu và cụm từ thường gặp",
      vocabulary: 800,
      kanji: 103,
      grammar: 75,
      duration: "3-6 tháng",
      difficulty: "Dễ",
      color: "bg-green-500",
      progress: 65,
      enrolled: 1250
    },
    {
      level: "N4", 
      name: "Sơ cấp",
      description: "Hiểu được tiếng Nhật cơ bản trong đời sống hàng ngày",
      vocabulary: 1500,
      kanji: 181,
      grammar: 150,
      duration: "6-8 tháng",
      difficulty: "Dễ",
      color: "bg-blue-500",
      progress: 40,
      enrolled: 950
    },
    {
      level: "N3",
      name: "Trung cấp",
      description: "Hiểu được tiếng Nhật trong nhiều tình huống khác nhau",
      vocabulary: 3750,
      kanji: 367,
      grammar: 200,
      duration: "8-12 tháng",
      difficulty: "Trung bình",
      color: "bg-yellow-500",
      progress: 20,
      enrolled: 720
    },
    {
      level: "N2",
      name: "Trung cao",
      description: "Hiểu được tiếng Nhật trong đời sống và tình huống rộng",
      vocabulary: 6000,
      kanji: 1007,
      grammar: 250,
      duration: "12-18 tháng",
      difficulty: "Khó",
      color: "bg-orange-500",
      progress: 5,
      enrolled: 450
    },
    {
      level: "N1",
      name: "Cao cấp",
      description: "Hiểu được tiếng Nhật trong nhiều tình huống phức tạp",
      vocabulary: 10000,
      kanji: 2136,
      grammar: 300,
      duration: "18-24 tháng",
      difficulty: "Rất khó",
      color: "bg-red-500",
      progress: 0,
      enrolled: 280
    }
  ];

  const studyPlan = [
    {
      week: "Tuần 1-2",
      focus: "Hiragana & Katakana",
      tasks: ["Học 46 ký tự Hiragana", "Học 46 ký tự Katakana", "Luyện viết và đọc"],
      completed: true
    },
    {
      week: "Tuần 3-4", 
      focus: "Từ vựng cơ bản N5",
      tasks: ["200 từ vựng thiết yếu", "Ngữ pháp cơ bản", "Luyện nghe N5"],
      completed: true
    },
    {
      week: "Tuần 5-6",
      focus: "Kanji N5 + Ngữ pháp",
      tasks: ["103 Kanji N5", "Ngữ pháp N5", "Đọc hiểu cơ bản"],
      completed: false
    },
    {
      week: "Tuần 7-8",
      focus: "Ôn tập & Luyện thi",
      tasks: ["Làm đề thi thử", "Ôn tập toàn diện", "Chiến lược làm bài"],
      completed: false
    }
  ];

  const mockTests = [
    {
      name: "JLPT N5 - Mock Test 1",
      duration: "105 phút",
      sections: ["Từ vựng", "Ngữ pháp", "Đọc hiểu", "Nghe"],
      difficulty: "Chuẩn",
      attempts: 1234,
      avgScore: 78
    },
    {
      name: "JLPT N5 - Mock Test 2", 
      duration: "105 phút",
      sections: ["Từ vựng", "Ngữ pháp", "Đọc hiểu", "Nghe"],
      difficulty: "Khó",
      attempts: 867,
      avgScore: 65
    },
    {
      name: "JLPT N4 - Mock Test 1",
      duration: "125 phút", 
      sections: ["Từ vựng", "Ngữ pháp", "Đọc hiểu", "Nghe"],
      difficulty: "Chuẩn",
      attempts: 543,
      avgScore: 72
    }
  ];

  // --- RENDER GIAO DIỆN COMPONENT ---
  return (
    <PageLayout 
      title="Luyện thi JLPT" 
      description="Chuẩn bị chu đáo cho kỳ thi Năng lực Tiếng Nhật quốc tế"
      showBreadcrumb={true}
      showFooter={false}
    >
      <section id="jlpt" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Tiêu đề chính của section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-secondary bg-clip-text text-transparent">
            Luyện thi JLPT
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chuẩn bị chu đáo cho kỳ thi Năng lực Tiếng Nhật quốc tế
          </p>
        </div>

        {/* Sử dụng component Tabs để tổ chức nội dung thành các tab khác nhau */}
        <div className="tabs max-w-6xl mx-auto">
          {/* Thanh điều hướng của Tabs */}
          <div className="tabs-list grid w-full grid-cols-3 mb-8">
            <button 
              className="tab-trigger active py-2 px-4 text-center font-medium"
              data-value="levels"
            >
              Cấp độ JLPT
            </button>
            <button 
              className="tab-trigger py-2 px-4 text-center font-medium"
              data-value="study-plan"
            >
              Kế hoạch học
            </button>
            <button 
              className="tab-trigger py-2 px-4 text-center font-medium"
              data-value="mock-tests"
            >
              Đề thi thử
            </button>
          </div>

          {/* --- NỘI DUNG TAB 1: CẤP ĐỘ JLPT --- */}
          <div className="tab-content">
            <div className="tab-panel active" data-value="levels">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Lặp qua mảng jlptLevels để render thông tin cho mỗi cấp độ */}
                {jlptLevels.map((level, index) => (
                  <div key={index} className="card p-6 hover:shadow-elegant transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {/* Vòng tròn màu sắc đặc trưng cho mỗi cấp độ */}
                        <div className={`w-12 h-12 ${level.color} rounded-full flex items-center justify-center`}>
                          <span className="text-white font-bold text-lg">{level.level}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{level.name}</h3>
                          <span className="badge badge-outline">{level.difficulty}</span>
                        </div>
                      </div>
                      <Award className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground mb-4 text-sm">{level.description}</p>
                    
                    {/* Thống kê chi tiết về từ vựng, kanji, etc. */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span>Từ vựng:</span>
                        <span className="font-medium">{level.vocabulary} từ</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Kanji:</span>
                        <span className="font-medium">{level.kanji} chữ</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Ngữ pháp:</span>
                        <span className="font-medium">{level.grammar} mẫu</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Thời gian:</span>
                        <span className="font-medium">{level.duration}</span>
                      </div>
                    </div>

                    {/* Thanh tiến độ của người dùng (chỉ hiển thị nếu progress > 0) */}
                    {level.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Tiến độ của bạn</span>
                          <span>{level.progress}%</span>
                        </div>
                        <div className="progress-container h-2">
                          <div 
                            className="progress-bar" 
                            style={{ width: `${level.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Thông tin thêm: số học viên, thời gian học */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{level.enrolled} học viên</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{level.duration}</span>
                      </div>
                    </div>

                    {/* Nút hành động, text thay đổi dựa vào tiến độ */}
                    <button className="btn btn-default w-full bg-gradient-primary">
                      {level.progress > 0 ? 'Tiếp tục học' : 'Bắt đầu học'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="tab-panel" data-value="study-plan">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Kế hoạch học JLPT N5</h3>
                  <span className="badge bg-green-500">Đang theo học</span>
                </div>
                <div className="space-y-6">
                  {/* Lặp qua mảng studyPlan để render timeline */}
                  {studyPlan.map((plan, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      {/* Icon check hoặc số thứ tự, tùy thuộc vào trạng thái 'completed' */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        plan.completed ? 'bg-green-500' : 'bg-muted'
                      }`}>
                        {plan.completed ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{plan.week}</h4>
                          <span className={`badge ${
                            plan.completed ? 'badge-default' : 'badge-secondary'
                          }`}>
                            {plan.completed ? 'Hoàn thành' : 'Sắp tới'}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-3">{plan.focus}</p>
                        {/* Danh sách các công việc cụ thể */}
                        <ul className="space-y-1">
                          {plan.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-center space-x-2 text-sm">
                              <div className={`w-2 h-2 rounded-full ${
                                plan.completed ? 'bg-green-500' : 'bg-muted'
                              }`} />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Thẻ tóm tắt tiến độ tổng thể */}
                <div className="mt-8 p-4 bg-gradient-primary rounded-lg">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <h4 className="font-semibold mb-1">Tiến độ tổng thể</h4>
                      <p className="text-sm opacity-90">Bạn đã hoàn thành 2/4 giai đoạn</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">50%</div>
                      <Calendar className="w-5 h-5 mx-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- NỘI DUNG TAB 3: ĐỀ THI THỬ --- */}
            <div className="tab-panel" data-value="mock-tests">
              <div className="space-y-6">
                {/* Lặp qua mảng mockTests để render danh sách đề thi */}
                {mockTests.map((test, index) => (
                  <div key={index} className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{test.name}</h3>
                        {/* Thông tin chi tiết: thời gian, lượt thi, điểm trung bình */}
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{test.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{test.attempts} lượt thi</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-4 h-4" />
                            <span>Điểm TB: {test.avgScore}%</span>
                          </div>
                        </div>
                      </div>
                      {/* Badge độ khó với màu sắc tương ứng */}
                      <span className={`badge ${
                        test.difficulty === 'Khó' ? 'badge-destructive' : 'badge-default'
                      }`}>
                        {test.difficulty}
                      </span>
                    </div>
                    {/* Các phần của bài thi */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {test.sections.map((section, sectionIndex) => (
                        <span key={sectionIndex} className="badge badge-outline">
                          {section}
                        </span>
                      ))}
                    </div>
                    {/* Các nút hành động */}
                    <div className="flex space-x-3">
                      <button className="btn btn-default flex-1 bg-gradient-primary">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Làm bài thi
                      </button>
                      <button className="btn btn-outline">
                        <Target className="w-4 h-4 mr-2" />
                        Xem đáp án
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Nút xem thêm */}
              <div className="mt-8 text-center">
                <button className="btn btn-outline btn-lg">
                  Xem thêm đề thi thử
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </PageLayout>
  );
};

export default JLPTPreparation;