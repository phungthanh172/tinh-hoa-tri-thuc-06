
import React, { useState } from 'react';
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
import SmartRecommendations from '@/components/recommendations/SmartRecommendations';
import ProgressGamification from '@/components/gamification/ProgressGamification';
import FloatingChatBox from '@/components/FloatingChatBox';
import EnhancedNoteCreationForm from '@/components/EnhancedNoteCreationForm';

const Index = () => {
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);

  const handleRecommendationsReady = (courses: any[]) => {
    console.log('Recommendations ready:', courses);
  };

  const handleChatOpen = () => {
    setShowChat(true);
  };

  const handleChatClose = () => {
    setShowChat(false);
  };

  const handleNoteFormOpen = () => {
    setShowNoteForm(true);
  };

  const handleNoteFormClose = () => {
    setShowNoteForm(false);
  };

  const handleNoteSave = (title: string, content: string) => {
    console.log('Note saved:', { title, content });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        {showRecommendations && (
          <div className="mb-12">
            <SmartRecommendations onRecommendationsReady={handleRecommendationsReady} />
          </div>
        )}
        
        <div className="mb-12">
          <ProgressGamification compact />
        </div>
        
        <ProgressNavigation />
      </div>
      
      <div data-tour="featured-courses">
        <FeaturedCourses />
      </div>
      
      <div data-tour="features">
        <Features />
      </div>
      
      <div data-tour="instructors">
        <TestimonialsSection />
      </div>
      
      <CallToAction />
      <Footer />
      
      <InactivityPopup />
      <FloatingActionButtons 
        onChatOpen={handleChatOpen} 
        onNoteFormOpen={handleNoteFormOpen} 
      />
      <FloatingChatBox isOpen={showChat} onClose={handleChatClose} />
      <EnhancedNoteCreationForm 
        isOpen={showNoteForm} 
        onClose={handleNoteFormClose}
        onSave={handleNoteSave}
      />
    </div>
  );
};

export default Index;
