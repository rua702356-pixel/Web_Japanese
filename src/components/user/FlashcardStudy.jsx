import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '../../hooks/use-navigation';
import { useActionHandler } from '../../hooks/use-action-handler';
import PageLayout from '../../layouts/PageLayout';
import { useToast } from '../../contexts/ToastContext';
import { 
  Play, Pause, RotateCcw, ArrowRight, ArrowLeft, CheckCircle, 
  XCircle, Volume2, Star, Timer, Target, BookOpen, Brain, Zap
} from 'lucide-react';
import { MOCK_FLASHCARDS, FLASHCARD_CATEGORIES } from '../../lib/constants';

// Helper function to shuffle array
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const FlashcardStudy = () => {
  const { isAuthenticated, user } = useAuth();
  const { goToProfile } = useNavigation();
  const { handleLoad, handleSave, isLoading } = useActionHandler();
  const { toast } = useToast();

  // State management
  const [session, setSession] = useState(null);
  const [stats, setStats] = useState({
    todayStudied: 0,
    todayGoal: 20,
    weeklyStreak: 3,
    totalCards: 156,
    masteredCards: 45,
    averageAccuracy: 78
  });
  const [studyMode, setStudyMode] = useState('study');
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(['basic']);

  // Mock flashcard data
  const mockCards = MOCK_FLASHCARDS;
  const categories = FLASHCARD_CATEGORIES;

  // Load initial data
  useEffect(() => {
    if (isAuthenticated) {
      loadUserProgress();
    }
  }, [isAuthenticated]);

  const loadUserProgress = useCallback(async () => {
    await handleLoad(async () => {
      // Load user study statistics and progress
      const savedStats = localStorage.getItem('flashcard_stats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    }, { showLoading: false });
  }, [handleLoad]);

  // Start new study session
  const startSession = useCallback(async (mode) => {
    await handleLoad(async () => {
      const filteredCards = mockCards.filter(card => 
        selectedCategories.length === 0 || selectedCategories.includes(card.category)
      );

      if (filteredCards.length === 0) {
        throw new Error('Không có thẻ nào để học');
      }

      const newSession = {
        id: Date.now().toString(),
        cards: shuffleArray([...filteredCards]),
        currentIndex: 0,
        isRevealed: false,
        correctAnswers: 0,
        incorrectAnswers: 0,
        startTime: new Date(),
        timeSpent: 0,
        mode
      };

      setSession(newSession);
      setShowAnswer(false);
      setStudyMode(mode);
    }, {
      successMessage: `Bắt đầu ${mode === 'study' ? 'học' : mode === 'test' ? 'kiểm tra' : 'ôn tập'}`,
      errorMessage: 'Không thể bắt đầu phiên học'
    });
  }, [selectedCategories, handleLoad]);

  // Navigation functions
  const nextCard = useCallback(() => {
    if (!session) return;

    const newIndex = Math.min(session.currentIndex + 1, session.cards.length - 1);
    setSession(prev => prev ? { ...prev, currentIndex: newIndex, isRevealed: false } : null);
    setShowAnswer(false);
  }, [session]);

  const previousCard = useCallback(() => {
    if (!session) return;

    const newIndex = Math.max(session.currentIndex - 1, 0);
    setSession(prev => prev ? { ...prev, currentIndex: newIndex, isRevealed: false } : null);
    setShowAnswer(false);
  }, [session]);

  const revealAnswer = useCallback(() => {
    setShowAnswer(true);
    if (session) {
      setSession(prev => prev ? { ...prev, isRevealed: true } : null);
    }
  }, [session]);

  // Answer handling
  const handleAnswer = useCallback(async (isCorrect) => {
    if (!session || !showAnswer) return;

    const newSession = {
      ...session,
      correctAnswers: isCorrect ? session.correctAnswers + 1 : session.correctAnswers,
      incorrectAnswers: isCorrect ? session.incorrectAnswers : session.incorrectAnswers + 1
    };

    setSession(newSession);

    // Update card statistics
    const currentCard = session.cards[session.currentIndex];
    const updatedCard = {
      ...currentCard,
      reviewCount: currentCard.reviewCount + 1,
      correctCount: isCorrect ? currentCard.correctCount + 1 : currentCard.correctCount,
      lastReviewed: new Date()
    };

    // Save progress
    await handleSave(updatedCard, async (data) => {
      // Save to localStorage or API
      console.log('Saving card progress:', data);
    }, { 
      showSuccess: false,
      showLoading: false 
    });

    // Auto-advance to next card
    setTimeout(() => {
      if (session.currentIndex < session.cards.length - 1) {
        nextCard();
      } else {
        completeSession();
      }
    }, 1000);
  }, [session, showAnswer, nextCard, handleSave]);

  const completeSession = useCallback(async () => {
    if (!session) return;

    const accuracy = Math.round((session.correctAnswers / (session.correctAnswers + session.incorrectAnswers)) * 100);
    const timeSpent = Math.floor((Date.now() - session.startTime.getTime()) / 1000);

    // Update stats
    const newStats = {
      ...stats,
      todayStudied: stats.todayStudied + session.cards.length,
      averageAccuracy: Math.round((stats.averageAccuracy + accuracy) / 2)
    };

    setStats(newStats);
    localStorage.setItem('flashcard_stats', JSON.stringify(newStats));

    toast({
      title: 'Hoàn thành phiên học!',
      description: `Đúng ${session.correctAnswers}/${session.cards.length} thẻ (${accuracy}%)`,
      variant: 'default'
    });

    setSession(null);
  }, [session, stats, toast]);

  const resetSession = useCallback(() => {
    setSession(null);
    setShowAnswer(false);
  }, []);

  const currentCard = session?.cards[session.currentIndex];
  const progress = session ? ((session.currentIndex + 1) / session.cards.length) * 100 : 0;

  return (
    <PageLayout title="Học Flashcards" description="Học từ vựng với thẻ ghi nhớ" showFooter={false}>
      <div className="flashcard-container max-w-4xl mx-auto p-6 space-y-6">
        {!session ? (
          // Setup Screen
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Hôm nay</p>
                      <p className="text-2xl font-bold">{stats.todayStudied}/{stats.todayGoal}</p>
                    </div>
                    <Target className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
              </div>
              
              <div className="card">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Độ chính xác</p>
                      <p className="text-2xl font-bold">{stats.averageAccuracy}%</p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-500" />
                  </div>
                </div>
              </div>
              
              <div className="card">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Chuỗi học</p>
                      <p className="text-2xl font-bold">{stats.weeklyStreak} ngày</p>
                    </div>
                    <Zap className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Category Selection */}
            <div className="card">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Chọn danh mục học</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`btn ${selectedCategories.includes(category) ? 'btn-primary' : 'btn-outline'} btn-sm`}
                      onClick={() => {
                        setSelectedCategories(prev => 
                          prev.includes(category) 
                            ? prev.filter(c => c !== category)
                            : [...prev, category]
                        );
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Start Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => startSession('study')}
                className="btn btn-primary h-16 flex flex-col gap-2"
                disabled={isLoading || selectedCategories.length === 0}
              >
                <BookOpen className="w-6 h-6" />
                Học tập
              </button>
              
              <button
                onClick={() => startSession('test')}
                className="btn btn-outline h-16 flex flex-col gap-2"
                disabled={isLoading || selectedCategories.length === 0}
              >
                <Target className="w-6 h-6" />
                Kiểm tra
              </button>
              
              <button
                onClick={() => startSession('review')}
                className="btn btn-outline h-16 flex flex-col gap-2"
                disabled={isLoading || selectedCategories.length === 0}
              >
                <Brain className="w-6 h-6" />
                Ôn tập
              </button>
            </div>
          </div>
        ) : (
          // Study Screen
          <div className="space-y-6">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Thẻ {session.currentIndex + 1} / {session.cards.length}</span>
                <span>{session.correctAnswers} đúng, {session.incorrectAnswers} sai</span>
              </div>
              <div className="progress h-2 w-full">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            {/* Flashcard */}
            <div className="card min-h-[300px]">
              <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                {currentCard && (
                  <>
                    <div className="space-y-4">
                      <div className="text-4xl font-bold text-primary">
                        {currentCard.front.japanese}
                      </div>
                      <div className="text-xl text-muted-foreground">
                        {currentCard.front.hiragana}
                      </div>
                    </div>

                    {showAnswer && (
                      <div className="mt-8 space-y-4 border-t pt-6">
                        <div className="text-2xl font-semibold">
                          {currentCard.back.vietnamese}
                        </div>
                        <div className="text-lg text-muted-foreground">
                          {currentCard.back.romaji}
                        </div>
                        {currentCard.back.example && (
                          <div className="text-sm italic text-muted-foreground">
                            Ví dụ: {currentCard.back.example}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4">
              {!showAnswer ? (
                <button onClick={revealAnswer} className="btn btn-primary btn-lg">
                  Hiện đáp án
                </button>
              ) : (
                <div className="space-x-2">
                  <button
                    onClick={() => handleAnswer(false)}
                    className="btn btn-destructive btn-lg"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Sai
                  </button>
                  <button
                    onClick={() => handleAnswer(true)}
                    className="btn btn-primary btn-lg"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Đúng
                  </button>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={previousCard}
                className="btn btn-outline"
                disabled={session.currentIndex === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Trước
              </button>
              
              <button onClick={resetSession} className="btn btn-outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Kết thúc
              </button>
              
              <button
                onClick={nextCard}
                className="btn btn-outline"
                disabled={session.currentIndex === session.cards.length - 1}
              >
                Sau
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default FlashcardStudy;