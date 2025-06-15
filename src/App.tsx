
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { GamificationProvider } from "@/contexts/GamificationContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
              <Route path="/course/:id/learn" element={<CourseLearner />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/blog/write" element={<WriteBlog />} />
              <Route path="/blog/edit/:id" element={<WriteBlog />} />
              <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
              <Route path="/instructor/course/create" element={<CourseCreator />} />
              <Route path="/instructor/course/:id/edit" element={<CourseCreator />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/learning-progress" element={<LearningProgress />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FloatingChatBox />
          </BrowserRouter>
        </TooltipProvider>
      </GamificationProvider>
    </ProgressProvider>
  </QueryClientProvider>
);

export default App;
