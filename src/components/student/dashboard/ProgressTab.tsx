
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LearningStats {
  totalHours: number;
  coursesCompleted: number;
  certificatesEarned: number;
  currentStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

interface Deadline {
  id: number;
  course: string;
  task: string;
  dueDate: string;
  priority: string;
}

interface ProgressTabProps {
  learningStats: LearningStats;
  upcomingDeadlines: Deadline[];
}

const ProgressTab = ({ learningStats, upcomingDeadlines }: ProgressTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Learning Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Learning Hours</span>
              <span className="text-lg font-bold">{learningStats.totalHours}h</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Courses Completed</span>
              <span className="text-lg font-bold">{learningStats.coursesCompleted}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Certificates Earned</span>
              <span className="text-lg font-bold">{learningStats.certificatesEarned}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Current Streak</span>
              <span className="text-lg font-bold">{learningStats.currentStreak} days</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deadlines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-semibold text-sm">{deadline.task}</p>
                  <p className="text-xs text-gray-600">{deadline.course}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{deadline.dueDate}</p>
                  <Badge variant={deadline.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                    {deadline.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTab;
