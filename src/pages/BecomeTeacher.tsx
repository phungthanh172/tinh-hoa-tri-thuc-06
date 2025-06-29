
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BecomeTeacherHero from '@/components/become-teacher/BecomeTeacherHero';
import TeachingBenefits from '@/components/become-teacher/TeachingBenefits';
import SuccessStories from '@/components/become-teacher/SuccessStories';
import ApplicationForm from '@/components/become-teacher/ApplicationForm';
import FAQSection from '@/components/become-teacher/FAQSection';

const BecomeTeacher = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Enhanced platform statistics
  const platformStats = [
    { number: "2.5M+", label: "Active Students", growth: "+150% YoY" },
    { number: "25K+", label: "Expert Educators", growth: "Growing Daily" },
    { number: "$120M+", label: "Educator Earnings", growth: "+300% This Year" },
    { number: "195", label: "Countries Served", growth: "Global Presence" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Header />
      
      <BecomeTeacherHero platformStats={platformStats} />
      <TeachingBenefits />
      <SuccessStories />
      <ApplicationForm />
      <FAQSection />

      <Footer />
    </div>
  );
};

export default BecomeTeacher;
