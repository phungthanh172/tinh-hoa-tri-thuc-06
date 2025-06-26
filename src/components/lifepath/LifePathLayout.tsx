
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActionButtons from '@/components/FloatingActionButtons';

interface LifePathLayoutProps {
  children: React.ReactNode;
}

const LifePathLayout = ({ children }: LifePathLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex flex-col">
      <Header />
      <main className="flex-1 pb-6">
        {children}
      </main>
      <FloatingActionButtons />
      <Footer />
    </div>
  );
};

export default LifePathLayout;
