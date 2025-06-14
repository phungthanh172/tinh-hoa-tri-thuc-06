
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CourseLearnerHeader from '@/components/course-learner/CourseLearnerHeader';
import VideoLearnerSection from '@/components/course-learner/VideoLearnerSection';
import CourseLearnerTabs from '@/components/course-learner/CourseLearnerTabs';
import CourseContentSidebar from '@/components/course-learner/CourseContentSidebar';

const CourseLearner = () => {
  const { id } = useParams();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentLectureId, setCurrentLectureId] = useState('1');

  // Mock course data
  const course = {
    id: 1,
    title: "The Complete JavaScript Course 2024: From Zero to Expert!",
    completionPercentage: 35,
    sections: [
      {
        id: '1',
        title: 'Getting Started',
        lectures: [
          { id: '1', title: 'Course Introduction', duration: '5:30', completed: true, isCurrentlyPlaying: true },
          { id: '2', title: 'Setting Up Your Environment', duration: '10:15', completed: true, isCurrentlyPlaying: false },
          { id: '3', title: 'Your First JavaScript Program', duration: '8:45', completed: false, isCurrentlyPlaying: false }
        ]
      },
      {
        id: '2',
        title: 'JavaScript Fundamentals',
        lectures: [
          { id: '4', title: 'Variables and Data Types', duration: '12:30', completed: false, isCurrentlyPlaying: false },
          { id: '5', title: 'Functions and Scope', duration: '15:20', completed: false, isCurrentlyPlaying: false }
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
    <div className="min-h-screen bg-gray-900 text-white">
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
    </div>
  );
};

export default CourseLearner;
