
import React from 'react';
import { Trophy, Award, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGamification } from '@/contexts/GamificationContext';

const BadgesAchievements: React.FC = () => {
  const { badges, userProgress } = useGamification();

  const earnedBadges = userProgress.achievements.map(achievement => {
    const badge = badges.find(b => b.id === achievement.badgeId);
    return { ...badge, earnedDate: achievement.earnedDate };
  }).filter(Boolean);

  const availableBadges = badges.filter(badge => 
    !userProgress.achievements.some(a => a.badgeId === badge.id)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <span>Your Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {earnedBadges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {earnedBadges.map((badge) => (
                <div key={badge.id} className="flex items-center space-x-3 p-3 border rounded-lg bg-green-50 border-green-200">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${badge.color}`}>
                    {badge.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-green-800">{badge.name}</h4>
                    <p className="text-sm text-green-600">{badge.description}</p>
                    <p className="text-xs text-green-500 mt-1">
                      Earned: {badge.earnedDate.toLocaleDateString()}
                    </p>
                  </div>
                  <Award className="w-5 h-5 text-green-600" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No achievements yet. Start learning to earn your first badge!</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-purple-600" />
            <span>Available Badges</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableBadges.map((badge) => {
              const progress = getProgressForBadge(badge, userProgress);
              return (
                <div key={badge.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-gray-100 grayscale">
                    {badge.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{badge.name}</h4>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {progress}%
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const getProgressForBadge = (badge: any, userProgress: any): number => {
  switch (badge.requirement.type) {
    case 'courses_completed':
      return Math.min(100, (userProgress.totalCoursesCompleted / badge.requirement.value) * 100);
    case 'certificates_earned':
      return Math.min(100, (userProgress.totalCertificatesEarned / badge.requirement.value) * 100);
    case 'streak_days':
      return Math.min(100, (userProgress.streakDays / badge.requirement.value) * 100);
    default:
      return 0;
  }
};

export default BadgesAchievements;
