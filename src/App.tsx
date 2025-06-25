import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { GamificationProvider } from './contexts/GamificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleBasedRedirect from './components/auth/RoleBasedRedirect';

import Index from './pages/Index';
import Auth from './pages/Auth';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import CourseLearner from './pages/CourseLearner';
import CourseCreator from './pages/CourseCreator';
import CourseCreation from './pages/CourseCreation';
import CourseEdit from './pages/CourseEdit';
import InstructorDashboard from './pages/InstructorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LearningProgress from './pages/LearningProgress';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import WriteBlog from './pages/WriteBlog';
import KnowledgeManagement from './pages/KnowledgeManagement';
import LifePath from './pages/LifePath';
import StudentMessages from './pages/StudentMessages';
import StudentNotifications from './pages/StudentNotifications';
import StudentCertificates from './pages/StudentCertificates';
import StudentWishlist from './pages/StudentWishlist';
import PurchaseHistory from './pages/PurchaseHistory';
import NotFound from './pages/NotFound';

import './App.css';

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
                  <Route path="/search" element={<Search />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  
                  {/* Protected Routes */}
                  <Route path="/learn/:courseId" element={
                    <ProtectedRoute>
                      <CourseLearner />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/progress" element={
                    <ProtectedRoute>
                      <LearningProgress />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  
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
                  
                  <Route path="/knowledge" element={
                    <ProtectedRoute>
                      <KnowledgeManagement />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/lifepath" element={
                    <ProtectedRoute>
                      <LifePath />
                    </ProtectedRoute>
                  } />

                  {/* Student Routes */}
                  <Route path="/student/dashboard" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentDashboard />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/student/messages" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentMessages />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/student/notifications" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentNotifications />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/student/certificates" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentCertificates />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/student/wishlist" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentWishlist />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/student/purchases" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <PurchaseHistory />
                    </ProtectedRoute>
                  } />

                  {/* Instructor Routes */}
                  <Route path="/instructor/dashboard" element={
                    <ProtectedRoute allowedRoles={['instructor']}>
                      <InstructorDashboard />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/instructor/course/create" element={
                    <ProtectedRoute allowedRoles={['instructor']}>
                      <CourseCreation />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/instructor/course/:courseId/edit" element={
                    <ProtectedRoute allowedRoles={['instructor']}>
                      <CourseEdit />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/course-creator" element={
                    <ProtectedRoute allowedRoles={['instructor']}>
                      <CourseCreator />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/blog/write" element={
                    <ProtectedRoute allowedRoles={['instructor', 'admin']}>
                      <WriteBlog />
                    </ProtectedRoute>
                  } />

                  {/* Admin Routes */}
                  <Route path="/admin/dashboard" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />

                  {/* Role-based redirect */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <RoleBasedRedirect />
                    </ProtectedRoute>
                  } />

                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
              </div>
            </Router>
          </GamificationProvider>
        </ProgressProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
