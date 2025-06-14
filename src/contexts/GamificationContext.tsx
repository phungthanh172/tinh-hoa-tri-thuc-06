
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requirement: {
    type: 'courses_completed' | 'quiz_score' | 'streak_days' | 'certificates_earned' | 'learning_path_completed';
    value: number;
    courseId?: string;
    pathId?: string;
  };
}

interface Achievement {
  id: string;
  badgeId: string;
  earnedDate: Date;
  courseId?: string;
  pathId?: string;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: string[];
  estimatedHours: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  certificate: {
    title: string;
    description: string;
  };
}

interface UserProgress {
  userId: string;
  achievements: Achievement[];
  streakDays: number;
  lastActiveDate: Date;
  totalCoursesCompleted: number;
  totalCertificatesEarned: number;
}

interface GamificationContextType {
  badges: Badge[];
  learningPaths: LearningPath[];
  userProgress: UserProgress;
  checkForNewAchievements: (courseId?: string, pathId?: string) => Achievement[];
  getLearningPathProgress: (pathId: string) => number;
  isLearningPathCompleted: (pathId: string) => boolean;
  updateUserProgress: (updates: Partial<UserProgress>) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

const defaultBadges: Badge[] = [
  {
    id: 'first-course',
    name: 'First Steps',
    description: 'Complete your first course',
    icon: '🌟',
    color: 'bg-yellow-500',
    requirement: { type: 'courses_completed', value: 1 }
  },
  {
    id: 'course-collector',
    name: 'Course Collector',
    description: 'Complete 5 courses',
    icon: '📚',
    color: 'bg-blue-500',
    requirement: { type: 'courses_completed', value: 5 }
  },
  {
    id: 'quiz-master',
    name: 'Quiz Master',
    description: 'Score 100% on any quiz',
    icon: '🎯',
    color: 'bg-green-500',
    requirement: { type: 'quiz_score', value: 100 }
  },
  {
    id: 'learning-streak',
    name: 'Learning Streak',
    description: 'Learn for 7 consecutive days',
    icon: '🔥',
    color: 'bg-red-500',
    requirement: { type: 'streak_days', value: 7 }
  },
  {
    id: 'certified-learner',
    name: 'Certified Learner',
    description: 'Earn your first certificate',
    icon: '🏆',
    color: 'bg-purple-500',
    requirement: { type: 'certificates_earned', value: 1 }
  }
];

const defaultLearningPaths: LearningPath[] = [
  {
    id: 'web-development',
    title: 'Complete Web Development',
    description: 'Master frontend and backend development with modern technologies',
    courses: ['1', '2', '3'],
    estimatedHours: 120,
    difficulty: 'Intermediate',
    certificate: {
      title: 'Full Stack Web Developer',
      description: 'Certified in modern web development technologies'
    }
  },
  {
    id: 'javascript-mastery',
    title: 'JavaScript Mastery',
    description: 'From basics to advanced JavaScript concepts',
    courses: ['1'],
    estimatedHours: 40,
    difficulty: 'Beginner',
    certificate: {
      title: 'JavaScript Expert',
      description: 'Proficient in JavaScript programming'
    }
  }
];

interface GamificationProviderProps {
  children: ReactNode;
}

export const GamificationProvider: React.FC<GamificationProviderProps> = ({ children }) => {
  const [badges] = useState<Badge[]>(defaultBadges);
  const [learningPaths] = useState<LearningPath[]>(defaultLearningPaths);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    userId: 'user-1',
    achievements: [],
    streakDays: 3,
    lastActiveDate: new Date(),
    totalCoursesCompleted: 0,
    totalCertificatesEarned: 0
  });

  const checkForNewAchievements = (courseId?: string, pathId?: string): Achievement[] => {
    const newAchievements: Achievement[] = [];
    
    badges.forEach(badge => {
      const alreadyEarned = userProgress.achievements.some(a => a.badgeId === badge.id);
      if (alreadyEarned) return;

      let shouldEarn = false;
      
      switch (badge.requirement.type) {
        case 'courses_completed':
          shouldEarn = userProgress.totalCoursesCompleted >= badge.requirement.value;
          break;
        case 'certificates_earned':
          shouldEarn = userProgress.totalCertificatesEarned >= badge.requirement.value;
          break;
        case 'streak_days':
          shouldEarn = userProgress.streakDays >= badge.requirement.value;
          break;
        case 'learning_path_completed':
          shouldEarn = pathId === badge.requirement.pathId && isLearningPathCompleted(pathId);
          break;
      }

      if (shouldEarn) {
        const achievement: Achievement = {
          id: `${badge.id}-${Date.now()}`,
          badgeId: badge.id,
          earnedDate: new Date(),
          courseId,
          pathId
        };
        newAchievements.push(achievement);
      }
    });

    if (newAchievements.length > 0) {
      setUserProgress(prev => ({
        ...prev,
        achievements: [...prev.achievements, ...newAchievements]
      }));
    }

    return newAchievements;
  };

  const getLearningPathProgress = (pathId: string): number => {
    const path = learningPaths.find(p => p.id === pathId);
    if (!path) return 0;
    
    // This would integrate with ProgressContext to get actual course completion
    // For now, returning mock data
    return 65;
  };

  const isLearningPathCompleted = (pathId: string): boolean => {
    return getLearningPathProgress(pathId) === 100;
  };

  const updateUserProgress = (updates: Partial<UserProgress>) => {
    setUserProgress(prev => ({ ...prev, ...updates }));
  };

  return (
    <GamificationContext.Provider
      value={{
        badges,
        learningPaths,
        userProgress,
        checkForNewAchievements,
        getLearningPathProgress,
        isLearningPathCompleted,
        updateUserProgress
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};
