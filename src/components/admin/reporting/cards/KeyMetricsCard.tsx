
import React from 'react';
import { Users, BookOpen, DollarSign, Star, TrendingUp, UserCheck, Award, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface KeyMetrics {
  totalUsers: number;
  activeUsers: number;
  newRegistrations: number;
  totalCourses: number;
  totalEnrollments: number;
  totalRevenue: number;
  averageRating: number;
  courseCompletionRate: number;
}

interface KeyMetricsCardProps {
  metrics: KeyMetrics;
}

const KeyMetricsCard: React.FC<KeyMetricsCardProps> = ({ metrics }) => {
  const metricItems = [
    {
      title: 'Total Users',
      value: metrics.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Users',
      value: metrics.activeUsers.toLocaleString(),
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'New Registrations',
      value: metrics.newRegistrations.toLocaleString(),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Total Courses',
      value: metrics.totalCourses.toLocaleString(),
      icon: BookOpen,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Total Enrollments',
      value: metrics.totalEnrollments.toLocaleString(),
      icon: Award,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Total Revenue',
      value: `$${metrics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Average Rating',
      value: `${metrics.averageRating}/5`,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Completion Rate',
      value: `${metrics.courseCompletionRate}%`,
      icon: BarChart3,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Performance Indicators</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metricItems.map((item, index) => (
            <div key={index} className={`p-4 rounded-lg ${item.bgColor}`}>
              <div className="flex items-center justify-between mb-2">
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                <p className="text-sm text-gray-600">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyMetricsCard;
