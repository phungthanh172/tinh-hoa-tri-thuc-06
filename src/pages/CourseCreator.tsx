
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCreationWizard from '@/components/course/CourseCreationWizard';
import CourseCreatorHeader from '@/components/course/CourseCreatorHeader';

const CourseCreator = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [courseData, setCourseData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    level: '',
    language: 'English',
    price: '',
    currency: 'USD',
    targetAudience: '',
    learningObjectives: [''],
    prerequisites: '',
    thumbnail: null as File | null,
    promotionalVideo: null as File | null,
    keywords: '',
    isDraft: true
  });

  const handleSaveDraft = () => {
    setCourseData(prev => ({ ...prev, isDraft: true }));
    console.log('Saving draft...', courseData);
  };

  const handlePublish = () => {
    setCourseData(prev => ({ ...prev, isDraft: false }));
    console.log('Publishing course...', courseData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <CourseCreatorHeader 
          onSaveDraft={handleSaveDraft}
          onPublish={handlePublish}
          isEditing={isEditing}
        />

        <CourseCreationWizard
          courseData={courseData}
          setCourseData={setCourseData}
          isEditing={isEditing}
        />
      </div>

      <Footer />
    </div>
  );
};

export default CourseCreator;
