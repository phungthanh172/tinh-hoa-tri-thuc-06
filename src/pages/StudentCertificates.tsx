
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CertificateViewer from '@/components/student/CertificateViewer';

const StudentCertificates = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CertificateViewer />
      <Footer />
    </div>
  );
};

export default StudentCertificates;
