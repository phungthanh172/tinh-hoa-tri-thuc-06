
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WishlistManager from '@/components/student/WishlistManager';

const Wishlist = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <WishlistManager />
      <Footer />
    </div>
  );
};

export default Wishlist;
