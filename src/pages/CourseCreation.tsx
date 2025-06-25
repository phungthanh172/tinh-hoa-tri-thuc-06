
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCreatorHeader from '@/components/course/CourseCreatorHeader';
import CourseCreationWizard from '@/components/course/CourseCreationWizard';
import { toast } from 'sonner';

const CourseCreation = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    level: '',
    language: 'English',
    price: 0,
    originalPrice: 0,
    targetAudience: '',
    learningObjectives: [''],
    prerequisites: '',
    thumbnail: null as File | null,
    promotionalVideo: null as File | null,
    keywords: '',
    isDraft: true,
    instructor: 'Current User',
    instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=200&fit=crop',
    duration: '0 hours',
    lectures: 0
  });

  const handleSaveDraft = () => {
    console.log('Saving course draft...');
    toast.success('Course saved as draft');
  };

  const handlePublish = () => {
    console.log('Publishing course...');
    toast.success('Course published successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <CourseCreatorHeader 
          onSaveDraft={handleSaveDraft}
          onPublish={handlePublish}
          isEditing={false}
          courseData={courseData}
        />
        
        <CourseCreationWizard 
          courseData={courseData}
          setCourseData={setCourseData}
          isEditing={false}
        />
      </div>

      <Footer />
    </div>
  );
};

export default CourseCreation;
