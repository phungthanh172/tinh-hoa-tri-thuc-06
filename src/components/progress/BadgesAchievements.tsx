
import React from 'react';
import { Trophy, Award, Star, Zap, Target, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGamification } from '@/contexts/GamificationContext';

const BadgesAchievements = () => {
  const { userProgress, getNextLevelProgress } = useGamification();

  const nextLevelProgress = getNextLevelProgress();
  const pointsToNextLevel = (userProgress.level * 500) - userProgress.totalPoints;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Achievements & Badges</h1>
        <p className="text-gray-600">Track your learning milestones and earn rewards</p>
      </div>

      {/* Player Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userProgress.totalPoints}</div>
            <div className="text-sm text-gray-600">Total Points</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">Level {userProgress.level}</div>
            <div className="text-sm text-gray-600">{pointsToNextLevel} to next level</div>
            <Progress value={nextLevelProgress} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Award className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {userProgress.badges.filter(b => b.isEarned).length}
            </div>
            <div className="text-sm text-gray-600">Badges Earned</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {userProgress.achievements.filter(a => a.unlocked).length}
            </div>
            <div className="text-sm text-gray-600">Achievements</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="badges" className="w-full">
        <TabsList>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userProgress.badges.map((badge) => (
              <Card
                key={badge.id}
                className={`${
                  badge.isEarned
                    ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{badge.icon}</div>
                  <h3 className="font-semibold mb-2">{badge.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                  {badge.isEarned ? (
                    <div>
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                        ✓ Earned
                      </Badge>
                      {badge.earnedDate && (
                        <p className="text-xs text-gray-500 mt-2">
                          {badge.earnedDate.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ) : (
                    <Badge variant="outline" className="opacity-60">
                      Not Earned
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userProgress.achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`${
                  achievement.unlocked
                    ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50'
                    : 'border-gray-200'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{achievement.title}</h3>
                      <p className="text-gray-600 text-sm">{achievement.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">
                        +{achievement.points}
                      </div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        achievement.type === 'completion' ? 'default' :
                        achievement.type === 'streak' ? 'secondary' :
                        achievement.type === 'quiz' ? 'outline' : 'default'
                      }
                      className="text-xs"
                    >
                      {achievement.type}
                    </Badge>
                    
                    {achievement.unlocked ? (
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-green-600 font-medium">Unlocked</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Locked</span>
                    )}
                  </div>
                  
                  {achievement.unlocked && achievement.unlockedDate && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>Unlocked {achievement.unlockedDate.toLocaleDateString()}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Learning Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rank: 1, name: 'Alex Johnson', points: 3420, level: 7, badge: '🏆' },
                  { rank: 2, name: 'Sarah Chen', points: 2890, level: 6, badge: '🥈' },
                  { rank: 3, name: 'You', points: userProgress.totalPoints, level: userProgress.level, badge: '🥉', isCurrentUser: true },
                  { rank: 4, name: 'Mike Wilson', points: 1180, level: 3, badge: '' },
                  { rank: 5, name: 'Emma Davis', points: 980, level: 2, badge: '' }
                ].map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      user.isCurrentUser ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold">
                        {user.badge || user.rank}
                      </div>
                      <div>
                        <div className={`font-medium ${user.isCurrentUser ? 'text-purple-700' : ''}`}>
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-600">Level {user.level}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{user.points.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BadgesAchievements;
