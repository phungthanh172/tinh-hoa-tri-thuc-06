
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PurchaseHistory from '@/components/student/PurchaseHistory';

const PurchaseHistoryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PurchaseHistory />
      <Footer />
    </div>
  );
};

export default PurchaseHistoryPage;
