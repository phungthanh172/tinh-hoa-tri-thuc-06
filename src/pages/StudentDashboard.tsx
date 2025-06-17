
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StudentDashboard from '@/components/student/StudentDashboard';

const StudentDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <StudentDashboard />
      <Footer />
    </div>
  );
};

export default StudentDashboardPage;
