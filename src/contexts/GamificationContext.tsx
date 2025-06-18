
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate?: Date;
  isEarned: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  type: 'completion' | 'streak' | 'quiz' | 'milestone';
  points: number;
  unlocked: boolean;
  unlockedDate?: Date;
}

interface UserProgress {
  totalPoints: number;
  level: number;
  streakDays: number;
  totalCoursesCompleted: number;
  totalQuizzesCompleted: number;
  averageQuizScore: number;
  badges: Badge[];
  achievements: Achievement[];
}

interface GamificationContextType {
  userProgress: UserProgress;
  awardBadge: (badgeId: string) => void;
  unlockAchievement: (achievementId: string) => void;
  addPoints: (points: number) => void;
  updateStreak: (days: number) => void;
  getNextLevelProgress: () => number;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

interface GamificationProviderProps {
  children: ReactNode;
}

export const GamificationProvider: React.FC<GamificationProviderProps> = ({ children }) => {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalPoints: 1250,
    level: 3,
    streakDays: 7,
    totalCoursesCompleted: 2,
    totalQuizzesCompleted: 8,
    averageQuizScore: 87,
    badges: [
      {
        id: 'first-course',
        name: 'First Steps',
        description: 'Complete your first course',
        icon: '🎯',
        earnedDate: new Date('2024-01-20'),
        isEarned: true
      },
      {
        id: 'quiz-master',
        name: 'Quiz Master',
        description: 'Score 90% or higher on 5 quizzes',
        icon: '🧠',
        earnedDate: new Date('2024-02-15'),
        isEarned: true
      },
      {
        id: 'streak-week',
        name: 'Week Warrior',
        description: 'Learn for 7 consecutive days',
        icon: '🔥',
        earnedDate: new Date(),
        isEarned: true
      },
      {
        id: 'video-binge',
        name: 'Video Binge',
        description: 'Watch 50 hours of content',
        icon: '📺',
        isEarned: false
      }
    ],
    achievements: [
      {
        id: 'js-master',
        title: 'JavaScript Master',
        description: 'Complete 3 JavaScript courses',
        type: 'completion',
        points: 500,
        unlocked: true,
        unlockedDate: new Date('2024-02-10')
      },
      {
        id: 'quick-learner',
        title: 'Quick Learner',
        description: 'Complete a course in under a week',
        type: 'milestone',
        points: 200,
        unlocked: true,
        unlockedDate: new Date('2024-01-22')
      },
      {
        id: 'perfectionist',
        title: 'Perfectionist',
        description: 'Get 100% on 3 quizzes',
        type: 'quiz',
        points: 300,
        unlocked: false
      }
    ]
  });

  const awardBadge = (badgeId: string) => {
    setUserProgress(prev => ({
      ...prev,
      badges: prev.badges.map(badge =>
        badge.id === badgeId
          ? { ...badge, isEarned: true, earnedDate: new Date() }
          : badge
      )
    }));
  };

  const unlockAchievement = (achievementId: string) => {
    setUserProgress(prev => {
      const achievement = prev.achievements.find(a => a.id === achievementId);
      if (achievement && !achievement.unlocked) {
        return {
          ...prev,
          totalPoints: prev.totalPoints + achievement.points,
          achievements: prev.achievements.map(a =>
            a.id === achievementId
              ? { ...a, unlocked: true, unlockedDate: new Date() }
              : a
          )
        };
      }
      return prev;
    });
  };

  const addPoints = (points: number) => {
    setUserProgress(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + points
    }));
  };

  const updateStreak = (days: number) => {
    setUserProgress(prev => ({
      ...prev,
      streakDays: days
    }));
  };

  const getNextLevelProgress = () => {
    const pointsPerLevel = 500;
    const currentLevelPoints = (userProgress.level - 1) * pointsPerLevel;
    const nextLevelPoints = userProgress.level * pointsPerLevel;
    const progressPoints = userProgress.totalPoints - currentLevelPoints;
    return (progressPoints / (nextLevelPoints - currentLevelPoints)) * 100;
  };

  return (
    <GamificationContext.Provider
      value={{
        userProgress,
        awardBadge,
        unlockAchievement,
        addPoints,
        updateStreak,
        getNextLevelProgress
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};
