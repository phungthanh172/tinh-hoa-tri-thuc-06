
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { GamificationProvider } from './contexts/GamificationContext';
import { Toaster } from './components/ui/sonner';

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
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProgressProvider>
          <GamificationProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/course/:id" element={<CourseDetail />} />
                  <Route path="/course/:id/learn" element={<CourseLearning />} />
                  <Route path="/course/:courseId/lecture/:lectureId" element={<CourseLearner />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/student-dashboard" element={<StudentDashboard />} />
                  <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/create-course" element={<CourseCreation />} />
                  <Route path="/course-creator" element={<CourseCreator />} />
                  <Route path="/course/:id/edit" element={<CourseEdit />} />
                  <Route path="/learning-progress" element={<LearningProgress />} />
                  <Route path="/life-path" element={<LifePath />} />
                  <Route path="/knowledge-management" element={<KnowledgeManagement />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/write-blog" element={<WriteBlog />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/student/notifications" element={<StudentNotifications />} />
                  <Route path="/student/messages" element={<StudentMessages />} />
                  <Route path="/student/certificates" element={<StudentCertificates />} />
                  <Route path="/student/wishlist" element={<StudentWishlist />} />
                  <Route path="/purchase-history" element={<PurchaseHistory />} />
                  <Route path="/elite-education" element={<EliteEducation />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Toaster />
            </Router>
          </GamificationProvider>
        </ProgressProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
