
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LectureProgress {
  lectureId: string;
  completed: boolean;
  watchTime: number;
  totalDuration: number;
  lastWatchPosition: number;
}

interface QuizProgress {
  quizId: string;
  completed: boolean;
  score: number;
  attempts: number;
  lastAttemptDate: Date;
}

interface CourseProgress {
  courseId: string;
  enrollmentDate: Date;
  lastAccessDate: Date;
  completionPercentage: number;
  completed: boolean;
  completionDate?: Date;
  certificateGenerated: boolean;
  lectures: LectureProgress[];
  quizzes: QuizProgress[];
}

interface ProgressContextType {
  courseProgress: CourseProgress[];
  updateLectureProgress: (courseId: string, lectureId: string, progress: Partial<LectureProgress>) => void;
  updateQuizProgress: (courseId: string, quizId: string, progress: Partial<QuizProgress>) => void;
  getCourseProgress: (courseId: string) => CourseProgress | undefined;
  markCourseComplete: (courseId: string) => void;
  generateCertificate: (courseId: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([
    {
      courseId: '1',
      enrollmentDate: new Date('2024-01-15'),
      lastAccessDate: new Date(),
      completionPercentage: 65,
      completed: false,
      certificateGenerated: false,
      lectures: [
        { lectureId: '1', completed: true, watchTime: 450, totalDuration: 450, lastWatchPosition: 450 },
        { lectureId: '2', completed: true, watchTime: 330, totalDuration: 330, lastWatchPosition: 330 },
        { lectureId: '3', completed: false, watchTime: 180, totalDuration: 420, lastWatchPosition: 180 }
      ],
      quizzes: [
        { quizId: '1', completed: true, score: 85, attempts: 1, lastAttemptDate: new Date('2024-01-20') },
        { quizId: '2', completed: false, score: 0, attempts: 0, lastAttemptDate: new Date() }
      ]
    }
  ]);

  const updateLectureProgress = (courseId: string, lectureId: string, progress: Partial<LectureProgress>) => {
    setCourseProgress(prev => prev.map(course => {
      if (course.courseId === courseId) {
        const updatedLectures = course.lectures.map(lecture => 
          lecture.lectureId === lectureId ? { ...lecture, ...progress } : lecture
        );
        
        const completedLectures = updatedLectures.filter(l => l.completed).length;
        const totalLectures = updatedLectures.length;
        const completionPercentage = Math.round((completedLectures / totalLectures) * 100);
        
        return {
          ...course,
          lectures: updatedLectures,
          completionPercentage,
          lastAccessDate: new Date(),
          completed: completionPercentage === 100
        };
      }
      return course;
    }));
  };

  const updateQuizProgress = (courseId: string, quizId: string, progress: Partial<QuizProgress>) => {
    setCourseProgress(prev => prev.map(course => {
      if (course.courseId === courseId) {
        const updatedQuizzes = course.quizzes.map(quiz => 
          quiz.quizId === quizId ? { ...quiz, ...progress } : quiz
        );
        
        return {
          ...course,
          quizzes: updatedQuizzes,
          lastAccessDate: new Date()
        };
      }
      return course;
    }));
  };

  const getCourseProgress = (courseId: string) => {
    return courseProgress.find(course => course.courseId === courseId);
  };

  const markCourseComplete = (courseId: string) => {
    setCourseProgress(prev => prev.map(course => {
      if (course.courseId === courseId && !course.completed) {
        return {
          ...course,
          completed: true,
          completionDate: new Date(),
          completionPercentage: 100
        };
      }
      return course;
    }));
  };

  const generateCertificate = (courseId: string) => {
    setCourseProgress(prev => prev.map(course => {
      if (course.courseId === courseId) {
        return {
          ...course,
          certificateGenerated: true
        };
      }
      return course;
    }));
  };

  return (
    <ProgressContext.Provider
      value={{
        courseProgress,
        updateLectureProgress,
        updateQuizProgress,
        getCourseProgress,
        markCourseComplete,
        generateCertificate
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
