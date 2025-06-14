
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CurriculumBuilder from '@/components/course/CurriculumBuilder';
import QuizBuilder from '@/components/course/QuizBuilder';
import ContentUploader from '@/components/course/ContentUploader';
import CourseBasicsForm from '@/components/course/CourseBasicsForm';
import CourseSettings from '@/components/course/CourseSettings';
import CourseCreatorHeader from '@/components/course/CourseCreatorHeader';

const CourseCreator = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    level: '',
    language: 'English',
    price: '',
    thumbnail: null as File | null
  });

  const [currentTab, setCurrentTab] = useState('basics');

  const handleInputChange = (field: string, value: string) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (file: File) => {
    setCourseData(prev => ({ ...prev, thumbnail: file }));
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...', courseData);
  };

  const handlePublish = () => {
    console.log('Publishing course...', courseData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <CourseCreatorHeader 
          onSaveDraft={handleSaveDraft}
          onPublish={handlePublish}
        />

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="basics">Course Basics</TabsTrigger>
            <TabsTrigger value="content">Content Upload</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="basics">
            <CourseBasicsForm
              courseData={courseData}
              onInputChange={handleInputChange}
              onFileUpload={handleFileUpload}
            />
          </TabsContent>

          <TabsContent value="content">
            <ContentUploader />
          </TabsContent>

          <TabsContent value="curriculum">
            <CurriculumBuilder />
          </TabsContent>

          <TabsContent value="quizzes">
            <QuizBuilder />
          </TabsContent>

          <TabsContent value="settings">
            <CourseSettings />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default CourseCreator;
