import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import { ToastProvider } from "./contexts/ToastContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Index from "./pages/public/Index";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import NotFound from "./pages/public/NotFound";
import UserProfile from "./components/user/UserProfile";
import InteractiveLessonContent from "./components/learning/InteractiveLessonContent";
import FlashcardStudy from "./components/user/FlashcardStudy";
import QuizAndTesting from "./components/learning/QuizAndTesting";
import Dictionary from "./pages/user/Dictionary";
import JLPTPreparation from "./components/learning/JLPTPreparation";
import LearningDashboard from "./components/user/LearningDashboard";
import ProgressTracking from "./components/user/ProgressTracking";
// Admin imports
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./components/admin/Dashboard";
import AlphabetManagement from "./components/admin/AlphabetManagement";
import GrammarManagement from "./components/admin/GrammarManagement";
import VocabularyManagement from "./components/admin/VocabularyManagement";
import QuizManagement from "./components/admin/QuizManagement";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DataProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                
                {/* Auth routes - only accessible when not logged in */}
                <Route 
                  path="/login" 
                  element={
                    <ProtectedRoute requireAuth={false}>
                      <Login />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/register" 
                  element={
                    <ProtectedRoute requireAuth={false}>
                      <Register />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Protected routes - require authentication */}
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/lessons" 
                  element={
                    <ProtectedRoute>
                      <InteractiveLessonContent />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/flashcards" 
                  element={
                    <ProtectedRoute>
                      <FlashcardStudy />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/quiz" 
                  element={
                    <ProtectedRoute>
                      <QuizAndTesting />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dictionary" 
                  element={
                    <ProtectedRoute>
                      <Dictionary />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/jlpt" 
                  element={
                    <ProtectedRoute>
                      <JLPTPreparation />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <LearningDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/progress" 
                  element={
                    <ProtectedRoute>
                      <ProgressTracking />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Admin routes - require authentication */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminLayout><AdminDashboard /></AdminLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/alphabet" 
                  element={
                    <ProtectedRoute>
                      <AdminLayout><AlphabetManagement /></AdminLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/grammar" 
                  element={
                    <ProtectedRoute>
                      <AdminLayout><GrammarManagement /></AdminLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/vocabulary" 
                  element={
                    <ProtectedRoute>
                      <AdminLayout><VocabularyManagement /></AdminLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/quiz" 
                  element={
                    <ProtectedRoute>
                      <AdminLayout><QuizManagement /></AdminLayout>
                    </ProtectedRoute>
                  } 
                />
                
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </DataProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;