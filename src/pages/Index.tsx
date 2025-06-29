
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedCourses from '@/components/FeaturedCourses';
import Features from '@/components/Features';
import TestimonialsSection from '@/components/TestimonialsSection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import ProgressNavigation from '@/components/progress/ProgressNavigation';
import InactivityPopup from '@/components/InactivityPopup';
import FloatingActionButtons from '@/components/FloatingActionButtons';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        <ProgressNavigation />
      </div>
      
      <FeaturedCourses />
      <Features />
      <TestimonialsSection />
      <CallToAction />
      <Footer />
      
      <InactivityPopup />
      <FloatingActionButtons />
    </div>
  );
};

export default Index;
