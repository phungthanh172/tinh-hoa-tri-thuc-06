
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import CourseDetail from './pages/CourseDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import InstructorDashboard from './pages/InstructorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import CourseLearner from './pages/CourseLearner';
import LearningProgress from './pages/LearningProgress';
import CertificateViewer from './components/student/CertificateViewer';
import { QueryClient } from './queryClient';
import { ProgressProvider } from '@/contexts/ProgressContext';
import { GamificationProvider } from '@/contexts/GamificationContext';

function App() {
  return (
    <QueryClient>
      <ProgressProvider>
        <GamificationProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/course/:id/learn" element={<CourseLearner />} />
              <Route path="/learning-progress" element={<LearningProgress />} />
              <Route path="/student/certificates" element={<CertificateViewer />} />
            </Routes>
          </Router>
        </GamificationProvider>
      </ProgressProvider>
    </QueryClient>
  );
}

export default App;
