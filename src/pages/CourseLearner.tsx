
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseLearnerHeader from '@/components/course-learner/CourseLearnerHeader';
import VideoLearnerSection from '@/components/course-learner/VideoLearnerSection';
import CourseLearnerTabs from '@/components/course-learner/CourseLearnerTabs';
import CourseContentSidebar from '@/components/course-learner/CourseContentSidebar';

interface Lecture {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  isCurrentlyPlaying: boolean;
  type: 'video' | 'pdf' | 'quiz' | 'text' | 'audio' | 'interactive';
  downloadable?: boolean;
  language?: string;
  resources?: Array<{ name: string; url: string; type: string; }>;
  content?: string;
  interactiveType?: 'simulation' | 'code-editor' | 'jupyter' | 'flashcards' | 'virtual-lab';
}

interface Section {
  id: string;
  title: string;
  lectures: Lecture[];
}

interface Course {
  id: number;
  title: string;
  completionPercentage: number;
  sections: Section[];
}

const CourseLearner = () => {
  const { id } = useParams();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentLectureId, setCurrentLectureId] = useState('1');

  // Enhanced mock course data with different content types
  const course: Course = {
    id: 1,
    title: "The Complete JavaScript Course 2024: From Zero to Expert!",
    completionPercentage: 35,
    sections: [
      {
        id: '1',
        title: 'Getting Started',
        lectures: [
          { 
            id: '1', 
            title: 'Course Introduction', 
            duration: '5:30', 
            completed: true, 
            isCurrentlyPlaying: true, 
            type: 'video',
            downloadable: true,
            language: 'English',
            resources: [
              { name: 'Course Slides', url: '/slides.pdf', type: 'PDF' }
            ]
          },
          { 
            id: '2', 
            title: 'JavaScript Fundamentals Guide', 
            duration: '10:15', 
            completed: true, 
            isCurrentlyPlaying: false, 
            type: 'pdf',
            downloadable: true,
            language: 'English'
          },
          { 
            id: '3', 
            title: 'Variables and Data Types Quiz', 
            duration: '8:45', 
            completed: false, 
            isCurrentlyPlaying: false, 
            type: 'quiz',
            downloadable: false,
            language: 'English'
          },
          { 
            id: '4', 
            title: 'Introduction to Programming Concepts', 
            duration: '15:00', 
            completed: false, 
            isCurrentlyPlaying: false, 
            type: 'text',
            content: 'This is a comprehensive introduction to programming concepts...',
            downloadable: false,
            language: 'English'
          },
          { 
            id: '5', 
            title: 'JavaScript Podcast - Best Practices', 
            duration: '22:30', 
            completed: false, 
            isCurrentlyPlaying: false, 
            type: 'audio',
            downloadable: true,
            language: 'English'
          }
        ]
      },
      {
        id: '2',
        title: 'Advanced Concepts',
        lectures: [
          { 
            id: '6', 
            title: 'Interactive Code Playground', 
            duration: '30:00', 
            completed: false, 
            isCurrentlyPlaying: false, 
            type: 'interactive',
            interactiveType: 'code-editor',
            downloadable: false,
            language: 'English'
          },
          { 
            id: '7', 
            title: 'JavaScript Concepts Flashcards', 
            duration: '15:00', 
            completed: false, 
            isCurrentlyPlaying: false, 
            type: 'interactive',
            interactiveType: 'flashcards',
            downloadable: false,
            language: 'English'
          },
          { 
            id: '8', 
            title: 'Functions and Scope Video', 
            duration: '18:20', 
            completed: false, 
            isCurrentlyPlaying: false, 
            type: 'video',
            downloadable: true,
            language: 'English',
            resources: [
              { name: 'Code Examples', url: '/examples.zip', type: 'ZIP' },
              { name: 'Exercise Files', url: '/exercises.pdf', type: 'PDF' }
            ]
          }
        ]
      }
    ]
  };

  const currentLecture = course.sections
    .flatMap((section: Section) => section.lectures)
    .find((lecture: Lecture) => lecture.id === currentLectureId);

  const handleLectureSelect = (lectureId: string) => {
    setCurrentLectureId(lectureId);
  };

  const handleNextLecture = () => {
    const allLectures = course.sections.flatMap((section: Section) => section.lectures);
    const currentIndex = allLectures.findIndex((lecture: Lecture) => lecture.id === currentLectureId);
    if (currentIndex < allLectures.length - 1) {
      setCurrentLectureId(allLectures[currentIndex + 1].id);
    }
  };

  const handlePreviousLecture = () => {
    const allLectures = course.sections.flatMap((section: Section) => section.lectures);
    const currentIndex = allLectures.findIndex((lecture: Lecture) => lecture.id === currentLectureId);
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
