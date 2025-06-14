
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { coursesApi } from '@/services/coursesApi';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCreationWizard from '@/components/course/CourseCreationWizard';
import CourseCreatorHeader from '@/components/course/CourseCreatorHeader';

const CourseCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = Boolean(id);

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
    instructor: 'Current User', // This would come from auth context
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=200&fit=crop',
    duration: '0 hours',
    lectures: 0
  });

  // Fetch existing course data if editing
  const { data: existingCourse, isLoading } = useQuery({
    queryKey: ['course', id],
    queryFn: () => coursesApi.fetchCourseById(Number(id)),
    enabled: isEditing && !!id,
  });

  // Create course mutation
  const createCourseMutation = useMutation({
    mutationFn: coursesApi.createCourse,
    onSuccess: (newCourse) => {
      toast({
        title: "Course Created",
        description: "Your course has been created successfully!",
      });
      navigate(`/instructor/course/${newCourse.id}/edit`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create course. Please try again.",
        variant: "destructive",
      });
      console.error('Create course error:', error);
    },
  });

  // Update course mutation
  const updateCourseMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => 
      coursesApi.updateCourse(id, data),
    onSuccess: () => {
      toast({
        title: "Course Updated",
        description: "Your course has been updated successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update course. Please try again.",
        variant: "destructive",
      });
      console.error('Update course error:', error);
    },
  });

  // Load existing course data when editing
  useEffect(() => {
    if (existingCourse && isEditing) {
      setCourseData({
        title: existingCourse.title,
        subtitle: existingCourse.subtitle || '',
        description: existingCourse.description,
        category: existingCourse.category || '',
        level: existingCourse.level,
        language: existingCourse.language || 'English',
        price: existingCourse.price,
        originalPrice: existingCourse.originalPrice,
        targetAudience: '',
        learningObjectives: [''],
        prerequisites: '',
        thumbnail: null,
        promotionalVideo: null,
        keywords: '',
        isDraft: true,
        instructor: existingCourse.instructor,
        image: existingCourse.image,
        duration: existingCourse.duration,
        lectures: existingCourse.lectures
      });
    }
  }, [existingCourse, isEditing]);

  const handleSaveDraft = () => {
    const dataToSave = { ...courseData, isDraft: true };
    
    if (isEditing && id) {
      updateCourseMutation.mutate({ id: Number(id), data: dataToSave });
    } else {
      createCourseMutation.mutate(dataToSave);
    }
  };

  const handlePublish = () => {
    const dataToPublish = { ...courseData, isDraft: false };
    
    if (isEditing && id) {
      updateCourseMutation.mutate({ id: Number(id), data: dataToPublish });
    } else {
      createCourseMutation.mutate(dataToPublish);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading course data...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <CourseCreatorHeader 
          onSaveDraft={handleSaveDraft}
          onPublish={handlePublish}
          isEditing={isEditing}
          courseData={courseData}
          isLoading={createCourseMutation.isPending || updateCourseMutation.isPending}
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
