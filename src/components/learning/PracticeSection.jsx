import { 
  PenTool, 
  Headphones, 
  BookOpen, 
  Target, 
  Trophy, 
  Clock,
  CheckCircle
} from "lucide-react";

const PracticeSection = () => {
  const practiceTypes = [
    {
      icon: PenTool,
      title: "Luyện viết",
      subtitle: "Luyện viết",
      description: "Luyện thứ tự nét viết Hiragana, Katakana, Kanji",
      color: "bg-gradient-primary",
      exercises: 45,
      completed: 28
    },
    {
      icon: Headphones,
      title: "Luyện nghe",
      subtitle: "Luyện nghe",
      description: "Nghe âm thanh và chọn đáp án đúng",
      color: "bg-gradient-secondary",
      exercises: 32,
      completed: 20
    },
    {
      icon: BookOpen,
      title: "Đọc hiểu",
      subtitle: "Đọc hiểu",
      description: "Đọc đoạn văn và hiểu nội dung",
      color: "bg-kanji",
      exercises: 25,
      completed: 15
    },
    {
      icon: Target,
      title: "Thi thử JLPT",
      subtitle: "Thi thử JLPT",
      description: "Kiểm tra trình độ với định dạng thi thật",
      color: "bg-accent",
      exercises: 12,
      completed: 8
    }
  ];

  const recentQuizzes = [
    {
      title: "Quiz nhận diện Hiragana",
      level: "N5",
      score: 85,
      totalQuestions: 20,
      timeSpent: "05:30",
      status: "completed"
    },
    {
      title: "Luyện nghe hội thoại hàng ngày",
      level: "N4", 
      score: 72,
      totalQuestions: 15,
      timeSpent: "12:45",
      status: "completed"
    },
    {
      title: "Cách đọc Kanji",
      level: "N3",
      score: 0,
      totalQuestions: 25,
      timeSpent: "00:00",
      status: "in-progress"
    }
  ];

  const sampleQuiz = {
    question: "Chọn từ phù hợp nhất để điền vào chỗ trống trong câu sau:",
    sentence: "今日は天気が（　）、散歩に行きましょう。",
    options: ["いい", "悪い", "寒い", "暑い"],
    correctAnswer: 0
  };

  return (
    <section id="practice" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Luyện tập và kiểm tra
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nâng cao kỹ năng với các bài tập đa dạng
          </p>
        </div>

        {/* Practice Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {practiceTypes.map((practice, index) => {
            const progress = (practice.completed / practice.exercises) * 100;
            return (
              <div key={index} className="card p-6 hover:shadow-elegant transition-smooth group cursor-pointer">
                <div className={`w-12 h-12 ${practice.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-bounce`}>
                  <practice.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-1">{practice.title}</h3>
                <p className="text-sm text-accent mb-2">{practice.subtitle}</p>
                <p className="text-muted-foreground text-sm mb-4">{practice.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tiến độ</span>
                    <span>{practice.completed}/{practice.exercises}</span>
                  </div>
                  <div className="progress-container h-2">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <button className="btn btn-outline w-full mt-4">
                  Bắt đầu luyện tập
                </button>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Quizzes */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Quiz gần đây</h3>
            <div className="space-y-4">
              {recentQuizzes.map((quiz, index) => (
                <div key={index} className="card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        quiz.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {quiz.status === 'completed' ? 
                          <CheckCircle className="w-5 h-5" /> : 
                          <Clock className="w-5 h-5" />
                        }
                      </div>
                      <div>
                        <h4 className="font-medium">{quiz.title}</h4>
                        <span className="badge badge-outline text-xs">
                          {quiz.level}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      {quiz.status === 'completed' && (
                        <div className="text-lg font-bold text-primary">
                          {quiz.score}%
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground">
                        {quiz.timeSpent}
                      </div>
                    </div>
                  </div>
                  
                  {quiz.status === 'completed' && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{Math.round(quiz.totalQuestions * quiz.score / 100)}/{quiz.totalQuestions} 正解</span>
                      <button className="btn btn-ghost btn-sm">
                        復習する
                      </button>
                    </div>
                  )}
                  
                  {quiz.status === 'in-progress' && (
                    <button className="btn btn-outline btn-sm w-full">
                      続ける
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sample Quiz */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Câu hỏi mẫu</h3>
            <div className="card p-6">
              <div className="mb-6">
                <span className="badge bg-jlpt-n4 text-white mb-4">N4レベル</span>
                <p className="text-muted-foreground mb-4">{sampleQuiz.question}</p>
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <p className="text-lg font-medium">{sampleQuiz.sentence}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {sampleQuiz.options.map((option, index) => (
                  <button
                    key={index}
                    className="btn btn-outline w-full justify-start text-left h-auto py-3"
                  >
                    <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm mr-3">
                      {index + 1}
                    </span>
                    {option}
                  </button>
                ))}
              </div>

              <div className="flex space-x-3">
                <button className="btn btn-default flex-1 bg-gradient-primary">
                  Trả lời
                </button>
                <button className="btn btn-outline flex-1">
                  Bỏ qua
                </button>
              </div>
            </div>

            <div className="mt-6">
              <button className="btn btn-secondary btn-lg w-full bg-gradient-secondary">
                <Trophy className="w-5 h-5 mr-2" />
                Thi thử JLPT
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeSection;