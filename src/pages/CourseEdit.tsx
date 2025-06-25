
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCreatorHeader from '@/components/course/CourseCreatorHeader';
import CourseCreationWizard from '@/components/course/CourseCreationWizard';
import { toast } from 'sonner';

const CourseEdit = () => {
  const { courseId } = useParams();
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate loading course data
    console.log(`Loading course data for ID: ${courseId}`);
    const mockCourseData = {
      id: courseId,
      title: "Sample Course",
      subtitle: "Learn the fundamentals",
      description: "This is a sample course for editing",
      category: "Programming",
      level: "Beginner",
      language: "English",
      price: 99.99,
      originalPrice: 149.99,
      targetAudience: "Beginners",
      learningObjectives: ["Learn basics", "Practice coding"],
      prerequisites: "None",
      thumbnail: null as File | null,
      promotionalVideo: null as File | null,
      keywords: "programming, basics",
      isDraft: true,
      instructor: 'Current User',
      instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=200&fit=crop',
      duration: '4 hours',
      lectures: 12
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
        
        <CourseCreationWizard 
          courseData={courseData}
          setCourseData={setCourseData}
          isEditing={true}
        />
      </div>

      <Footer />
    </div>
  );
};

export default CourseEdit;
