
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { GamificationProvider } from './contexts/GamificationContext';
import { Toaster } from './components/ui/sonner';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Import pages
import Index from './pages/Index';
import Auth from './pages/Auth';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import CourseLearner from './pages/CourseLearner';
import CourseLearning from './pages/CourseLearning';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CourseCreation from './pages/CourseCreation';
import CourseCreator from './pages/CourseCreator';
import CourseEdit from './pages/CourseEdit';
import LearningProgress from './pages/LearningProgress';
import LifePath from './pages/LifePath';
import KnowledgeManagement from './pages/KnowledgeManagement';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import WriteBlog from './pages/WriteBlog';
import Notifications from './pages/Notifications';
import StudentNotifications from './pages/StudentNotifications';
import StudentMessages from './pages/StudentMessages';
import StudentCertificates from './pages/StudentCertificates';
import StudentWishlist from './pages/StudentWishlist';
import PurchaseHistory from './pages/PurchaseHistory';
import EliteEducation from './pages/EliteEducation';
import BecomeTeacher from './pages/BecomeTeacher';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <ProgressProvider>
            <GamificationProvider>
              <div className="App">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/course/:id" element={<CourseDetail />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/elite-education" element={<EliteEducation />} />
                  <Route path="/become-teacher" element={<BecomeTeacher />} />
                  
                  {/* Protected routes - require authentication */}
                  <Route path="/cart" element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  } />
                  <Route path="/wishlist" element={
                    <ProtectedRoute>
                      <Wishlist />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/course/:id/learn" element={
                    <ProtectedRoute>
                      <CourseLearning />
                    </ProtectedRoute>
                  } />
                  <Route path="/course/:courseId/lecture/:lectureId" element={
                    <ProtectedRoute>
                      <CourseLearner />
                    </ProtectedRoute>
                  } />
                  <Route path="/learning-progress" element={
                    <ProtectedRoute>
                      <LearningProgress />
                    </ProtectedRoute>
                  } />
                  <Route path="/lifepath" element={
                    <ProtectedRoute>
                      <LifePath />
                    </ProtectedRoute>
                  } />
                  <Route path="/knowledge-management" element={
                    <ProtectedRoute>
                      <KnowledgeManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/purchase-history" element={
                    <ProtectedRoute>
                      <PurchaseHistory />
                    </ProtectedRoute>
                  } />
                  <Route path="/notifications" element={
                    <ProtectedRoute>
                      <Notifications />
                    </ProtectedRoute>
                  } />
                  
                  {/* Student-specific routes */}
                  <Route path="/student/dashboard" element={
                    <ProtectedRoute requiredRole="student">
                      <StudentDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/student/notifications" element={
                    <ProtectedRoute requiredRole="student">
                      <StudentNotifications />
                    </ProtectedRoute>
                  } />
                  <Route path="/student/messages" element={
                    <ProtectedRoute requiredRole="student">
                      <StudentMessages />
                    </ProtectedRoute>
                  } />
                  <Route path="/student/certificates" element={
                    <ProtectedRoute requiredRole="student">
                      <StudentCertificates />
                    </ProtectedRoute>
                  } />
                  <Route path="/student/wishlist" element={
                    <ProtectedRoute requiredRole="student">
                      <StudentWishlist />
                    </ProtectedRoute>
                  } />
                  
                  {/* Instructor-specific routes */}
                  <Route path="/instructor/dashboard" element={
                    <ProtectedRoute requiredRole="instructor">
                      <InstructorDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/create-course" element={
                    <ProtectedRoute requiredRole="instructor">
                      <CourseCreation />
                    </ProtectedRoute>
                  } />
                  <Route path="/course-creator" element={
                    <ProtectedRoute requiredRole="instructor">
                      <CourseCreator />
                    </ProtectedRoute>
                  } />
                  <Route path="/course/:id/edit" element={
                    <ProtectedRoute requiredRole="instructor">
                      <CourseEdit />
                    </ProtectedRoute>
                  } />
                  <Route path="/write-blog" element={
                    <ProtectedRoute requiredRole={["instructor", "admin"]}>
                      <WriteBlog />
                    </ProtectedRoute>
                  } />
                  
                  {/* Admin-specific routes */}
                  <Route path="/admin/dashboard" element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  
                  {/* Catch-all route for 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Toaster />
            </GamificationProvider>
          </ProgressProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
