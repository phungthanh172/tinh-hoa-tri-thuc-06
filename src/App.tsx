
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { GamificationProvider } from "@/contexts/GamificationContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import FloatingChatBox from "@/components/FloatingChatBox";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CourseLearner from "./pages/CourseLearner";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import InstructorDashboard from "./pages/InstructorDashboard";
import CourseCreator from "./pages/CourseCreator";
import LearningProgress from "./pages/LearningProgress";
import Search from "./pages/Search";
import AdminDashboard from "./pages/AdminDashboard";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import WriteBlog from "./pages/WriteBlog";
import EliteEducation from "./pages/EliteEducation";
import LifePath from "./pages/LifePath";
import StudentDashboard from "./pages/StudentDashboard";
import StudentNotifications from "./pages/StudentNotifications";
import StudentWishlist from "./pages/StudentWishlist";
import StudentMessages from "./pages/StudentMessages";
import StudentCertificates from "./pages/StudentCertificates";
import PurchaseHistory from "./pages/PurchaseHistory";
import KnowledgeManagement from "./pages/KnowledgeManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ProgressProvider>
        <GamificationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/search" element={<Search />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/course/:id" element={<CourseDetail />} />
                <Route 
                  path="/course/:id/learn" 
                  element={
                    <ProtectedRoute>
                      <CourseLearner />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/auth" element={<Auth />} />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/life-path" 
                  element={
                    <ProtectedRoute>
                      <LifePath />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/knowledge-management" 
                  element={
                    <ProtectedRoute>
                      <KnowledgeManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route 
                  path="/blog/write" 
                  element={
                    <ProtectedRoute requiredRole={['instructor', 'admin']}>
                      <WriteBlog />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/elite-education" element={<EliteEducation />} />
                <Route 
                  path="/instructor/dashboard" 
                  element={
                    <ProtectedRoute requiredRole="instructor">
                      <InstructorDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/instructor/course/create" 
                  element={
                    <ProtectedRoute requiredRole="instructor">
                      <CourseCreator />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/instructor/course/:id/edit" 
                  element={
                    <ProtectedRoute requiredRole="instructor">
                      <CourseCreator />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/learning-progress" 
                  element={
                    <ProtectedRoute>
                      <LearningProgress />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/student/dashboard" 
                  element={
                    <ProtectedRoute requiredRole="student">
                      <StudentDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/student/notifications" 
                  element={
                    <ProtectedRoute requiredRole="student">
                      <StudentNotifications />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/student/wishlist" 
                  element={
                    <ProtectedRoute requiredRole="student">
                      <StudentWishlist />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/student/messages" 
                  element={
                    <ProtectedRoute requiredRole="student">
                      <StudentMessages />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/student/certificates" 
                  element={
                    <ProtectedRoute requiredRole="student">
                      <StudentCertificates />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/student/purchase-history" 
                  element={
                    <ProtectedRoute requiredRole="student">
                      <PurchaseHistory />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <FloatingChatBox />
            </BrowserRouter>
          </TooltipProvider>
        </GamificationProvider>
      </ProgressProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
