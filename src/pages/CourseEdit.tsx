
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCreatorHeader from '@/components/course/CourseCreatorHeader';
import CourseCreationWizard from '@/components/course/CourseCreationWizard';
import { toast } from 'sonner';

const CourseEdit = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate loading course data
    console.log(`Loading course data for ID: ${courseId}`);
    const mockCourseData = {
      id: courseId,
      title: "Sample Course",
      description: "This is a sample course for editing",
      price: 99.99
    };
    setCourseData(mockCourseData);
  }, [courseId]);

  const handleSaveDraft = () => {
    setIsLoading(true);
    console.log('Updating course draft...', courseData);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Course updated successfully');
    }, 1000);
  };

  const handlePublish = () => {
    setIsLoading(true);
    console.log('Publishing course updates...', courseData);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Course changes published successfully');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <CourseCreatorHeader 
          onSaveDraft={handleSaveDraft}
          onPublish={handlePublish}
          isEditing={true}
          courseData={courseData}
          isLoading={isLoading}
        />
        
        {courseData && (
          <CourseCreationWizard initialData={courseData} />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CourseEdit;
