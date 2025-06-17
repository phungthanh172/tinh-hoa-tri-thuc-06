
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MessageCenter from '@/components/student/MessageCenter';

const StudentMessages = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MessageCenter />
      <Footer />
    </div>
  );
};

export default StudentMessages;
