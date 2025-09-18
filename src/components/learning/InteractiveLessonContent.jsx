// --- IMPORT CÁC THƯ VIỆN, COMPONENT VÀ ICONS ---
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Eye,
  Brain
} from "lucide-react";

// --- ĐỊNH NGHĨA COMPONENT CHÍNH: InteractiveLessonContent ---
const InteractiveLessonContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // --- KHAI BÁO CÁC STATE (TRẠNG THÁI) ---
  const [currentLesson, setCurrentLesson] = useState(null); // Lưu trữ dữ liệu bài học hiện tại
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // Chỉ số của bước học đang hiển thị
  const [isPlaying, setIsPlaying] = useState(false); // Trạng thái phát âm thanh
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Lưu trữ câu trả lời người dùng đã chọn (dành cho quiz)
  const [showAnswer, setShowAnswer] = useState(false); // Cờ để hiển thị đáp án đúng/sai (dành cho quiz)
  const [score, setScore] = useState(0); // Điểm số của người dùng trong bài học
  const [isCompleted, setIsCompleted] = useState(false); // Cờ để đánh dấu bài học đã hoàn thành
  const [completedSteps, setCompletedSteps] = useState(new Set()); // Lưu các bước đã hoàn thành để hiển thị progress

  // --- DỮ LIỆU MẪU (SAU NÀY SẺ ĐƯỢC LẤY TỪ API) ---
  const sampleLesson = {
    id: "hiragana-basic-1",
    title: "Hiragana Cơ Bản - Nhóm A",
    level: "N5",
    category: "Bảng chữ cái",
    duration: "15 phút",
    difficulty: "Dễ",
    objectives: [
      "Học cách viết và đọc 5 chữ Hiragana đầu tiên",
      "Hiểu thứ tự nét viết chính xác",
      "Ghi nhớ cách phát âm",
      "Luyện tập với từ ví dụ"
    ],
    steps: [
      {
        id: "learn-a",
        type: "learn",
        title: "Học chữ あ (A)",
        content: {
          japanese: "あ",
          hiragana: "あ",
          romaji: "a",
          vietnamese: "/a/",
          explanation: "Chữ あ là chữ cái đầu tiên trong bảng Hiragana, phát âm giống như 'a' trong tiếng Việt.",
          strokeOrder: ["1. Ngang", "2. Dọc", "3. Ngang"],
          examples: [
            { japanese: "あか", vietnamese: "màu đỏ", romaji: "aka" },
            { japanese: "あさ", vietnamese: "buổi sáng", romaji: "asa" }
          ]
        }
      },
      {
        id: "practice-a",
        type: "practice",
        title: "Luyện tập viết あ",
        content: {
          japanese: "あ",
          explanation: "Hãy luyện tập viết chữ あ theo thứ tự nét đã học."
        }
      }
    ]
  };

  // --- HOOKS ---
  // useEffect để tải dữ liệu bài học khi component được mount
  useEffect(() => {
    setCurrentLesson(sampleLesson);
  }, []);

  // --- CÁC BIẾN ĐƯỢC SUY RA TỪ STATE (DERIVED STATE) ---
  const currentStep = currentLesson?.steps[currentStepIndex]; // Lấy ra bước học hiện tại
  const progress = currentLesson ? ((currentStepIndex + 1) / currentLesson.steps.length) * 100 : 0; // Tính toán tiến độ

  // --- CÁC HÀM XỬ LÝ SỰ KIỆN (EVENT HANDLERS) ---

  /** Chuyển đến bước tiếp theo của bài học */
  const handleNext = () => {
    if (currentLesson && currentStepIndex < currentLesson.steps.length - 1) {
      setCompletedSteps(prev => new Set(prev).add(currentStepIndex)); // Đánh dấu bước hiện tại đã hoàn thành
      setCurrentStepIndex(prev => prev + 1);
      // Reset trạng thái của quiz cho bước tiếp theo
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      handleCompleteLesson();
    }
  };

  /** Quay lại bước trước đó */
  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  /** Xử lý khi người dùng chọn một đáp án trong quiz */
  const handleAnswerSelect = (answerIndex) => {
    if (showAnswer) return; // Không cho chọn lại khi đã hiển thị đáp án

    setSelectedAnswer(answerIndex);
    setShowAnswer(true); // Hiển thị kết quả đúng/sai

    if (currentStep?.question?.correctAnswer === answerIndex) {
      setScore(prev => prev + 100);
      toast.success("Chính xác! 🎉");
    } else {
      toast.error("Sai rồi! Hãy xem lại đáp án đúng.");
    }
  };

  /** Phát âm thanh (giả lập) */
  const playAudio = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1000);
    toast.info("Đang phát âm...");
  };

  /** Reset lại toàn bộ bài học */
  const resetLesson = () => {
    setCurrentStepIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setIsCompleted(false);
    toast.info("Đã reset bài học");
  };

  /** Xử lý khi hoàn thành bài học */
  const handleCompleteLesson = () => {
    setIsCompleted(true);
    // Nếu là bước cuối cùng, kết thúc bài học
    toast.success("Chúc mừng! Bạn đã hoàn thành bài học!", {
      description: `Điểm số: ${score}/${(currentLesson?.steps.filter(s => s.type === 'quiz').length || 0) * 100}`
    });
  };

  // --- RENDER GIAO DIỆN ---
  if (!currentLesson || !currentStep) {
    return <div>Đang tải bài học...</div>; // Trạng thái chờ tải dữ liệu
  }

  return (
    <PageLayout 
      title="Bài học tương tác" 
      description="Học tiếng Nhật qua các bài học tương tác và thú vị"
      showBreadcrumb={true}
      showFooter={false}
    >
      <section className="py-16 bg-gradient-card">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* ===== PHẦN HEADER CỦA BÀI HỌC ===== */}
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{currentLesson.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="badge badge-secondary">{currentLesson.level}</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{currentLesson.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="w-4 h-4" />
                  <span>{currentLesson.difficulty}</span>
                </div>
              </div>
            </div>
            
            <button
              className="btn btn-outline btn-sm"
              onClick={resetLesson}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Tiến độ: {currentStepIndex + 1}/{currentLesson.steps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="progress-container h-2">
              <div 
                className="progress-bar" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* ===== PHẦN NỘI DUNG CHÍNH (THAY ĐỔI THEO TỪNG BƯỚC) ===== */}
        <div className="card p-8">
          {/* Tiêu đề của bước học */}
          <div className="text-center mb-6">
            <span className="badge badge-outline mb-4">
              {currentStep.type === 'learn' ? 'Học' : currentStep.type === 'practice' ? 'Luyện tập' : 'Kiểm tra'}
            </span>
            <h2 className="text-xl font-bold">{currentStep.title}</h2>
          </div>

          {/* --- 1. GIAO DIỆN CHO BƯỚC HỌC LÝ THUYẾT ('learn') --- */}
          {currentStep.type === 'learn' && (
            <div className="space-y-8">
              {/* Hiển thị ký tự */}
              <div className="text-center">
                <div className="text-8xl font-bold text-primary mb-4">
                  {currentStep.content.japanese}
                </div>
                <div className="space-y-2">
                  <div className="text-xl font-medium">{currentStep.content.romaji}</div>
                  <div className="text-lg text-muted-foreground">{currentStep.content.vietnamese}</div>
                </div>
                <button
                  className="btn btn-outline btn-sm mt-4"
                  onClick={playAudio}
                  disabled={isPlaying}
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  {isPlaying ? "Đang phát..." : "Nghe phát âm"}
                </button>
              </div>

              {/* Giải thích */}
              {currentStep.content.explanation && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Giải thích
                  </h3>
                  <p className="text-muted-foreground">{currentStep.content.explanation}</p>
                </div>
              )}

              {/* Thứ tự nét viết */}
              {currentStep.content.strokeOrder && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Thứ tự nét viết
                  </h3>
                  <ol className="list-decimal list-inside space-y-1">
                    {currentStep.content.strokeOrder.map((stroke, index) => (
                      <li key={index} className="text-muted-foreground">{stroke}</li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Ví dụ */}
              {currentStep.content.examples && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3 flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    Ví dụ từ vựng
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentStep.content.examples.map((example, index) => (
                      <div key={index} className="p-3 bg-background rounded border">
                        <div className="text-lg font-medium text-center mb-1">
                          {example.japanese}
                        </div>
                        <div className="text-sm text-center text-muted-foreground">
                          {example.romaji}
                        </div>
                        <div className="text-sm text-center font-medium">
                          {example.vietnamese}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* --- 2. GIAO DIỆN CHO BƯỚC LUYỆN TẬP ('practice') --- */}
          {currentStep.type === 'practice' && (
            <div className="text-center space-y-6">
              <div className="text-6xl font-bold text-primary mb-4">
                {currentStep.content.japanese}
              </div>
              <div className="bg-muted/50 p-6 rounded-lg">
                {currentStep.content.explanation && (
                  <p className="mb-4">{currentStep.content.explanation}</p>
                )}
                <div className="border-2 border-dashed border-muted-foreground/30 h-32 rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Khu vực luyện tập viết</span>
                </div>
              </div>
            </div>
          )}

          {/* --- 3. GIAO DIỆN CHO BƯỚC KIỂM TRA ('quiz') --- */}
          {currentStep.type === 'quiz' && currentStep.question && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-4">
                  {currentStep.content.japanese}
                </div>
                <h3 className="text-lg font-medium">{currentStep.question.text}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentStep.question.options.map((option, index) => (
                  <button
                    key={index}
                    className={`btn ${
                      showAnswer
                        ? index === currentStep.question.correctAnswer
                          ? "btn-default"
                          : selectedAnswer === index
                          ? "btn-destructive"
                          : "btn-outline"
                        : selectedAnswer === index
                        ? "btn-secondary"
                        : "btn-outline"
                    } h-12 text-left justify-start ${
                      showAnswer && index === currentStep.question.correctAnswer
                        ? "bg-green-500 hover:bg-green-600"
                        : ""
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showAnswer}
                  >
                    <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center mr-3 text-xs font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                    {showAnswer && index === currentStep.question.correctAnswer && (
                      <CheckCircle className="w-4 h-4 ml-auto" />
                    )}
                    {showAnswer && selectedAnswer === index && index !== currentStep.question.correctAnswer && (
                      <XCircle className="w-4 h-4 ml-auto" />
                    )}
                  </button>
                ))}
              </div>

              {/* Hiển thị giải thích sau khi trả lời */
              }
              {showAnswer && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Giải thích:</h4>
                  <p className="text-muted-foreground">{currentStep.question.explanation}</p>
                </div>
              )}
            </div>
          )}

          {/* ===== PHẦN ĐIỀU HƯỚNG (NAVIGATION) ===== */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            {/* Nút Quay lại */}
            <button
              className="btn btn-outline"
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Quay lại
            </button>

            {/* Chỉ báo tiến độ dạng chấm tròn */}
            <div className="flex items-center space-x-2">
              {currentLesson.steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStepIndex
                      ? "bg-primary"
                      : completedSteps.has(index)
                      ? "bg-green-500"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>

            {/* Nút Tiếp theo/Hoàn thành */}
            <button
              onClick={handleNext}
              disabled={
                currentStep.type === 'quiz' && !showAnswer
              }
              className="btn btn-default bg-gradient-primary"
            >
              {currentStepIndex === currentLesson.steps.length - 1 ? "Hoàn thành" : "Tiếp theo"}
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        {/* ===== MỤC TIÊU BÀI HỌC ===== */}
        <div className="card p-6 mt-6">
          <h3 className="font-bold mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-primary" />
            Mục tiêu bài học
          </h3>
          <ul className="space-y-2">
            {currentLesson.objectives.map((objective, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
    </PageLayout>
  );
};

export default InteractiveLessonContent;