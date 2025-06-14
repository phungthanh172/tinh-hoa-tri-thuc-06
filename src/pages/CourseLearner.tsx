
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseLearnerHeader from '@/components/course-learner/CourseLearnerHeader';
import VideoLearnerSection from '@/components/course-learner/VideoLearnerSection';
import CourseLearnerTabs from '@/components/course-learner/CourseLearnerTabs';
import CourseContentSidebar from '@/components/course-learner/CourseContentSidebar';

const CourseLearner = () => {
  const { id } = useParams();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentLectureId, setCurrentLectureId] = useState('1');

  // Mock course data with different content types
  const course = {
    id: 1,
    title: "The Complete JavaScript Course 2024: From Zero to Expert!",
    completionPercentage: 35,
    sections: [
      {
        id: '1',
        title: 'Getting Started',
        lectures: [
          { id: '1', title: 'Course Introduction', duration: '5:30', completed: true, isCurrentlyPlaying: true, type: 'video' },
          { id: '2', title: 'JavaScript Fundamentals PDF', duration: '10:15', completed: true, isCurrentlyPlaying: false, type: 'pdf' },
          { id: '3', title: 'Variables and Data Types Quiz', duration: '8:45', completed: false, isCurrentlyPlaying: false, type: 'quiz' }
        ]
      },
      {
        id: '2',
        title: 'JavaScript Fundamentals',
        lectures: [
          { id: '4', title: 'Functions Presentation', duration: '12:30', completed: false, isCurrentlyPlaying: false, type: 'slide' },
          { id: '5', title: 'Functions and Scope Video', duration: '15:20', completed: false, isCurrentlyPlaying: false, type: 'video' }
        ]
      }
    ]
  };

  const currentLecture = course.sections
    .flatMap(section => section.lectures)
    .find(lecture => lecture.id === currentLectureId);

  const handleLectureSelect = (lectureId: string) => {
    setCurrentLectureId(lectureId);
  };

  const handleNextLecture = () => {
    const allLectures = course.sections.flatMap(section => section.lectures);
    const currentIndex = allLectures.findIndex(lecture => lecture.id === currentLectureId);
    if (currentIndex < allLectures.length - 1) {
      setCurrentLectureId(allLectures[currentIndex + 1].id);
    }
  };

  const handlePreviousLecture = () => {
    const allLectures = course.sections.flatMap(section => section.lectures);
    const currentIndex = allLectures.findIndex(lecture => lecture.id === currentLectureId);
    if (currentIndex > 0) {
      setCurrentLectureId(allLectures[currentIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CourseLearnerHeader 
        course={course}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <div className="flex">
        {/* Main Content Panel */}
        <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'w-full' : 'w-3/4'}`}>
          <VideoLearnerSection 
            courseId={course.id.toString()}
            lectureId={currentLectureId}
            lecture={currentLecture}
            onNext={handleNextLecture}
            onPrevious={handlePreviousLecture}
          />
          
          <CourseLearnerTabs courseId={course.id.toString()} />
        </div>

        {/* Sidebar */}
        {!isSidebarCollapsed && (
          <CourseContentSidebar 
            course={course}
            currentLectureId={currentLectureId}
            onLectureSelect={handleLectureSelect}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CourseLearner;
