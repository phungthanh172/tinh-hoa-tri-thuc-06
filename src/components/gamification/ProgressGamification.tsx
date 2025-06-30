
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Trophy, 
  Star, 
  Flame, 
  Target, 
  Award, 
  Zap, 
  BookOpen, 
  Calendar,
  TrendingUp,
  Gift
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'bronze' | 'silver' | 'gold' | 'platinum';
  earned: boolean;
  earnedDate?: Date;
  progress: number;
  maxProgress: number;
}

interface LearningStreak {
  current: number;
  longest: number;
  lastActivity: Date;
}

interface UserStats {
  totalXP: number;
  level: number;
  coursesCompleted: number;
  hoursLearned: number;
  certificatesEarned: number;
  currentStreak: LearningStreak;
}

const mockAchievements: Achievement[] = [
  {
    id: 'first-course',
    title: 'First Steps',
    description: 'Complete your first course',
    icon: '🎯',
    type: 'bronze',
    earned: true,
    earnedDate: new Date('2024-01-15'),
    progress: 1,
    maxProgress: 1
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Learn for 7 consecutive days',
    icon: '🔥',
    type: 'silver',
    earned: true,
    earnedDate: new Date('2024-01-22'),
    progress: 7,
    maxProgress: 7
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Score 100% on 5 quizzes',
    icon: '💯',
    type: 'gold',
    earned: false,
    progress: 3,
    maxProgress: 5
  },
  {
    id: 'speed-learner',
    title: 'Speed Learner',
    description: 'Complete a course in under 3 days',
    icon: '⚡',
    type: 'silver',
    earned: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'knowledge-master',
    title: 'Knowledge Master',
    description: 'Complete 10 courses',
    icon: '🏆',
    type: 'platinum',
    earned: false,
    progress: 3,
    maxProgress: 10
  }
];

const mockUserStats: UserStats = {
  totalXP: 2850,
  level: 8,
  coursesCompleted: 3,
  hoursLearned: 47.5,
  certificatesEarned: 2,
  currentStreak: {
    current: 12,
    longest: 15,
    lastActivity: new Date()
  }
};

interface ProgressGamificationProps {
  compact?: boolean;
}

const ProgressGamification: React.FC<ProgressGamificationProps> = ({ compact = false }) => {
  const [userStats, setUserStats] = useState<UserStats>(mockUserStats);
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
  const [showCelebration, setShowCelebration] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  const calculateXPToNextLevel = (currentXP: number, level: number) => {
    const baseXP = 500;
    const nextLevelXP = baseXP * level;
    const currentLevelXP = level > 1 ? baseXP * (level - 1) : 0;
    const progress = currentXP - currentLevelXP;
    const needed = nextLevelXP - currentLevelXP;
    return { progress, needed, percentage: (progress / needed) * 100 };
  };

  const earnedAchievements = achievements.filter(a => a.earned);
  const xpProgress = calculateXPToNextLevel(userStats.totalXP, userStats.level);

  const triggerAchievement = (achievementId: string) => {
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.earned) {
      const updatedAchievement = { ...achievement, earned: true, earnedDate: new Date() };
      setAchievements(prev => prev.map(a => a.id === achievementId ? updatedAchievement : a));
      setNewAchievement(updatedAchievement);
      setShowCelebration(true);
    }
  };

  if (compact) {
    return (
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">Level {userStats.level}</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">{userStats.currentStreak.current} day streak</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {userStats.level + 1}</span>
              <span>{Math.round(xpProgress.percentage)}%</span>
            </div>
            <Progress value={xpProgress.percentage} className="h-2" />
          </div>
          
          <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
            <span>{earnedAchievements.length} achievements</span>
            <span>{userStats.totalXP} XP</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-purple-600">Level {userStats.level}</div>
            <div className="text-sm text-gray-600">{userStats.totalXP} XP</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Flame className="w-8 h-8 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{userStats.currentStreak.current}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{userStats.coursesCompleted}</div>
            <div className="text-sm text-gray-600">Courses Completed</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-8 h-8 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600">{userStats.certificatesEarned}</div>
            <div className="text-sm text-gray-600">Certificates</div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Level Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Level {userStats.level}</span>
              <span className="text-lg font-semibold">Level {userStats.level + 1}</span>
            </div>
            
            <div className="relative">
              <Progress value={xpProgress.percentage} className="h-4" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-white">
                {xpProgress.progress} / {xpProgress.needed} XP
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-600">
              {xpProgress.needed - xpProgress.progress} XP to next level
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Achievements ({earnedAchievements.length}/{achievements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 border rounded-lg transition-all ${
                  achievement.earned
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                    
                    {achievement.earned ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Award className="w-3 h-3 mr-1" />
                        Earned {achievement.earnedDate?.toLocaleDateString()}
                      </Badge>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Milestone Celebration Dialog */}
      <Dialog open={showCelebration} onOpenChange={setShowCelebration}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center gap-2 text-2xl">
              <Trophy className="w-8 h-8 text-yellow-500" />
              Achievement Unlocked!
            </DialogTitle>
          </DialogHeader>
          
          {newAchievement && (
            <div className="space-y-4">
              <div className="text-6xl">{newAchievement.icon}</div>
              <h3 className="text-xl font-bold">{newAchievement.title}</h3>
              <p className="text-gray-600">{newAchievement.description}</p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 text-yellow-800">
                  <Gift className="w-5 h-5" />
                  <span className="font-medium">+100 XP Bonus!</span>
                </div>
              </div>
              
              <Button
                onClick={() => setShowCelebration(false)}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Continue Learning!
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Quick Action to Test Achievement */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Test Achievement System</h4>
              <p className="text-sm text-gray-600">Try unlocking a new achievement!</p>
            </div>
            <Button
              onClick={() => triggerAchievement('perfectionist')}
              variant="outline"
              size="sm"
              className="border-yellow-400 text-yellow-700 hover:bg-yellow-50"
            >
              <Zap className="w-4 h-4 mr-2" />
              Unlock Achievement
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressGamification;
