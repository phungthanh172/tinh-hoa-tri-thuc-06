
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
  type: string;
  url?: string;
  content?: string;
  totalSlides?: number;
  transcript?: string;
  questions?: any[];
  interactiveType?: string;
  chapters?: any[];
  resources?: any[];
}

interface Section {
  id: string;
  title: string;
  lectures: Lecture[];
}

const CourseLearner = () => {
  const { id } = useParams();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentLectureId, setCurrentLectureId] = useState('1');

  // Enhanced mock course data with comprehensive content types
  const course = {
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
            title: 'Course Introduction Video', 
            duration: '5:30', 
            completed: true, 
            isCurrentlyPlaying: true, 
            type: 'video',
            url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
          },
          { 
            id: '2', 
            title: 'JavaScript Fundamentals Guide', 
            duration: '15:20', 
            completed: true, 
            isCurrentlyPlaying: false, 
            type: 'text',
            content: '<h2>JavaScript Fundamentals</h2><p>Complete guide to JavaScript basics...</p>'
          },
          { 
            id: '3', 
            title: 'Setup and Installation PDF', 
            duration: '10:15', 
            completed: false, 
            isCurrentlyPlaying: false, 
            type: 'pdf',
            url: '/setup-guide.pdf'
          }
        ] as Lecture[]
      },
      {
        id: '2',
        title: 'Core Concepts',
        lectures: [
          { 
            id: '4', 
            title: 'Variables and Data Types Slides', 
            duration: '12:30', 
            completed: false, 
            isCurrentlyPlaying: false, 
            type: 'slide',
            totalSlides: 15
          },
          { 
            id: '5', 
            title: 'Functions Deep Dive Audio', 
            duration: '25:45', 
            completed: false, 
            isCurrentlyPlaying: false, 
            type: 'audio',
            url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
            transcript: 'In this audio lecture, we explore JavaScript functions...'
          },
          { 
            id: '6', 
            title: 'Knowledge Check Quiz', 
            duration: '8:00', 
            completed: false, 
            isCurrentlyPlaying: false, 
            type: 'quiz',
            questions: [
              {
                question: "What is a variable in JavaScript?",
                options: [
                  { text: "A container for data", correct: true },
                  { text: "A function", correct: false },
                  { text: "A loop", correct: false }
                ]
              }
            ]
          }
        ] as Lecture[]
      },
      {
        id: '3',
        title: 'Interactive Learning',
        lectures: [
          { 
            id: '7', 
            title: 'Code Challenge Editor', 
            duration: '30:00', 
            completed: false, 
            isCurrentlyPlaying: false, 
            type: 'interactive',
            interactiveType: 'code-editor'
          },
          { 
            id: '8', 
            title: 'JavaScript Flashcards', 
            duration: '15:00', 
            completed: false, 
            isCurrentlyPlaying: false, 
            type: 'interactive',
            interactiveType: 'flashcards'
          },
          { 
            id: '9', 
            title: 'DOM Manipulation Simulation', 
            duration: '20:00', 
            completed: false, 
            isCurrentlyPlaying: false, 
            type: 'interactive',
            interactiveType: 'simulation'
          }
        ] as Lecture[]
      }
    ] as Section[]
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
