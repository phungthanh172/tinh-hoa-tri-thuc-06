
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  date: string;
}

interface AchievementsTabProps {
  recentAchievements: Achievement[];
}

const AchievementsTab = ({ recentAchievements }: AchievementsTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recentAchievements.map((achievement) => (
        <Card key={achievement.id}>
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4">{achievement.icon}</div>
            <h3 className="font-semibold mb-2">{achievement.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
            <p className="text-xs text-gray-500">{achievement.date}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AchievementsTab;
