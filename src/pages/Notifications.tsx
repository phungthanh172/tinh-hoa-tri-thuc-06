
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NotificationCenter from '@/components/student/NotificationCenter';

const Notifications = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NotificationCenter />
      <Footer />
    </div>
  );
};

export default Notifications;
