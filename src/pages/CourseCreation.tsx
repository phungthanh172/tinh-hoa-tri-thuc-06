
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCreatorHeader from '@/components/course/CourseCreatorHeader';
import CourseCreationWizard from '@/components/course/CourseCreationWizard';
import { toast } from 'sonner';

const CourseCreation = () => {
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
        />
        
        <CourseCreationWizard />
      </div>

      <Footer />
    </div>
  );
};

export default CourseCreation;
