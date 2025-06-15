
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedCourses from '@/components/FeaturedCourses';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import ProgressNavigation from '@/components/progress/ProgressNavigation';
import InactivityPopup from '@/components/InactivityPopup';

import { useLanguage } from '@/contexts/LanguageContext';
import { Language, MainLabels, MainLabelsVI } from '@/constants/labels';

const Index = () => {
  const { language } = useLanguage();

  // Helper function for main labels
  const tMain = (key: keyof typeof MainLabels) =>
    language === Language.EN ? MainLabels[key] : MainLabelsVI[key];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Example swap for main labels. If Hero, FeaturedCourses, etc should also localize, pass main label values as props OR refactor those components to use the labels Enum via context, similar to this pattern. */}
      <Hero
        title={tMain("HERO_TITLE")}
        subtitle={tMain("HERO_SUBTITLE")}
        ctaText={tMain("START_LEARNING")}
      />
      <div className="container mx-auto px-4 py-12">
        <ProgressNavigation />
      </div>
      <FeaturedCourses
        title={tMain("FEATURED_COURSES")}
        desc={tMain("FEATURED_COURSES_DESC")}
      />
      <Features
        mainTitle={tMain("WHY_CHOOSE_PLATFORM")}
        mainDesc={tMain("WHY_CHOOSE_DESC")}
      />
      <Testimonials
        mainTitle={tMain("WHAT_STUDENTS_SAY")}
        mainDesc={tMain("WHAT_STUDENTS_DESC")}
      />
      <CallToAction
        mainTitle={tMain("LEARNING_JOURNEY")}
        mainDesc={tMain("LEARNING_JOURNEY_DESC")}
        cta1={tMain("START_FREE_TRIAL")}
        cta2={tMain("VIEW_ALL_COURSES")}
        instantAccess={tMain("INSTANT_ACCESS")}
        guarantee={tMain("GURANTEE")}
        lifetimeAccess={tMain("LIFETIME_ACCESS")}
      />
      <Footer />
      <InactivityPopup />
    </div>
  );
};

export default Index;
