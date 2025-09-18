import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw, 
  BookOpen, 
  Volume2,
  CheckCircle,
  XCircle,
  Award,
  Clock,
  Target,
  Trophy
} from "lucide-react";
import PageLayout from "../../layouts/PageLayout";

const QuizAndTesting = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const availableQuizzes = [
    {
      id: "hiragana-basic",
      title: "Hiragana Cơ Bản",
      description: "Kiểm tra kiến thức về bảng chữ cái Hiragana",
      level: "N5",
      totalQuestions: 5,
      timeLimit: 10,
      passingScore: 70,
      questions: [
        {
          id: "h1",
          type: "multiple-choice",
          question: "Chữ あ được phát âm như thế nào?",
          options: ["/a/", "/i/", "/u/", "/e/"],
          correctAnswer: 0,
          explanation: "Chữ あ phát âm là /a/",
          points: 20
        },
        {
          id: "h2",
          type: "multiple-choice",
          question: "Từ いぬ có nghĩa là gì?",
          options: ["mèo", "chó", "chim", "cá"],
          correctAnswer: 1,
          explanation: "いぬ có nghĩa là chó",
          points: 20
        }
      ]
    }
  ];

  const currentQuestion = currentQuiz?.questions[currentQuestionIndex];
  const progress = currentQuiz ? ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100 : 0;

  useEffect(() => {
    let interval;
    if (isQuizActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isQuizActive, timeLeft]);

  const startQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(quiz.timeLimit || 1800); // Default 30 minutes
    setIsQuizActive(true);
    toast.success(`Bắt đầu ${quiz.title}!`);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showAnswer) return;

    setSelectedAnswer(answerIndex);
    setShowAnswer(true);

    if (currentQuiz.questions[currentQuestionIndex].correctAnswer === answerIndex) {
      setScore(prev => prev + 1);
      toast.success("Chính xác! 🎉");
    } else {
      toast.error("Sai rồi!");
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowAnswer(false);
      } else {
        setIsQuizActive(false);
        setIsQuizCompleted(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestionIndex(0);
    setIsQuizActive(false);
    setTimeLeft(0);
    setIsQuizCompleted(false);
    setSelectedAnswer(null);
    setScore(0);
    setShowAnswer(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isQuizCompleted && currentQuiz) {
    const percentage = (score / currentQuiz.questions.length) * 100;
    const passed = percentage >= currentQuiz.passingScore;

    return (
      <PageLayout 
        title="Kết quả kiểm tra" 
        description="Xem kết quả bài kiểm tra của bạn"
        showBreadcrumb={true}
        showFooter={false}
      >
        <section className="py-16 bg-gradient-card">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="card p-8 text-center">
              <div className="mb-6">
                {passed ? (
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-10 h-10 text-white" />
                  </div>
                )}
                
                <h2 className="text-3xl font-bold mb-2">
                  {passed ? "Chúc mừng!" : "Chưa đạt"}
                </h2>
                <p className="text-muted-foreground">
                  {passed ? "Bạn đã hoàn thành xuất sắc!" : "Hãy ôn tập và thử lại!"}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{percentage.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">Điểm số</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{score}</div>
                  <div className="text-sm text-muted-foreground">Câu đúng</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{currentQuiz.questions.length}</div>
                  <div className="text-sm text-muted-foreground">Tổng câu hỏi</div>
                </div>
              </div>

              <div className="flex space-x-4 justify-center">
                <button className="btn btn-outline" onClick={resetQuiz}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Làm lại
                </button>
                <button className="btn btn-default bg-gradient-primary" onClick={resetQuiz}>
                  Chọn bài khác
                </button>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  if (currentQuiz && isQuizActive && currentQuestion) {
    return (
      <PageLayout 
        title={`${currentQuiz.title} - Câu ${currentQuestionIndex + 1}/${currentQuiz.questions.length}`}
        description="Đang làm bài kiểm tra"
        showBreadcrumb={true}
        showFooter={false}
      >
        <section className="py-16 bg-gradient-card">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="card p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">{currentQuiz.title}</h2>
                  <span>Câu {currentQuestionIndex + 1}/{currentQuiz.questions.length}</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {formatTime(timeLeft)}
                  </div>
                  <div className="progress-container w-32 h-2 mt-1">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">{currentQuestion.question}</h3>
                </div>

                {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        className={`btn h-12 text-left justify-start ${
                          selectedAnswer === index ? 'btn-default' : 'btn-outline'
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showAnswer}
                      >
                        <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center mr-3 text-xs font-bold">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                <div className="text-center">
                  <button
                    onClick={handleAnswerSelect}
                    disabled={selectedAnswer === null}
                    className={`btn btn-lg bg-gradient-primary px-8 ${
                      selectedAnswer === null ? 'disabled' : ''
                    }`}
                  >
                    {currentQuestionIndex === currentQuiz.questions.length - 1 ? 'Hoàn thành' : 'Câu tiếp theo'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="Kiểm tra và đánh giá" 
      description="Làm các bài kiểm tra để đánh giá năng lực tiếng Nhật của bạn"
      showBreadcrumb={true}
      showFooter={false}
    >
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Kiểm tra & Luyện thi
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Đánh giá trình độ và chuẩn bị cho kỳ thi JLPT
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableQuizzes.map((quiz) => (
              <div key={quiz.id} className="card p-6 hover:shadow-soft transition-smooth">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold mb-2">{quiz.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {quiz.description}
                      </p>
                    </div>
                    <span className="badge badge-secondary">{quiz.level}</span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>Câu hỏi:</span>
                      </span>
                      <span className="font-medium">{quiz.totalQuestions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Thời gian:</span>
                      </span>
                      <span className="font-medium">{quiz.timeLimit} phút</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span>Điểm qua:</span>
                      </span>
                      <span className="font-medium">{quiz.passingScore}%</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => startQuiz(quiz)}
                    className="btn w-full bg-gradient-primary"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Bắt đầu
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default QuizAndTesting;