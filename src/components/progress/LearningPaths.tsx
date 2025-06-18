
import React, { useState } from 'react';
import { BookOpen, Trophy, Clock, Users, Star, ChevronRight, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const LearningPaths = () => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const learningPaths = [
    {
      id: 'frontend-developer',
      title: 'Frontend Developer Path',
      description: 'Master modern frontend development with React, JavaScript, and CSS',
      duration: '6-8 months',
      level: 'Beginner to Advanced',
      totalCourses: 8,
      completedCourses: 2,
      totalHours: 120,
      students: 45000,
      rating: 4.8,
      certificate: 'Frontend Developer Certificate',
      skills: ['JavaScript', 'React', 'CSS', 'HTML', 'TypeScript', 'Node.js'],
      courses: [
        {
          id: 1,
          title: 'HTML & CSS Fundamentals',
          duration: '12 hours',
          completed: true,
          current: false
        },
        {
          id: 2,
          title: 'JavaScript Essentials',
          duration: '18 hours',
          completed: true,
          current: false
        },
        {
          id: 3,
          title: 'React for Beginners',
          duration: '24 hours',
          completed: false,
          current: true
        },
        {
          id: 4,
          title: 'Advanced JavaScript',
          duration: '20 hours',
          completed: false,
          current: false
        },
        {
          id: 5,
          title: 'TypeScript Mastery',
          duration: '16 hours',
          completed: false,
          current: false
        }
      ]
    },
    {
      id: 'fullstack-javascript',
      title: 'Full-Stack JavaScript Developer',
      description: 'Complete web development with JavaScript, Node.js, and databases',
      duration: '8-10 months',
      level: 'Intermediate to Advanced',
      totalCourses: 10,
      completedCourses: 0,
      totalHours: 150,
      students: 32000,
      rating: 4.7,
      certificate: 'Full-Stack JavaScript Certificate',
      skills: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'React', 'REST APIs'],
      courses: [
        {
          id: 6,
          title: 'JavaScript Fundamentals',
          duration: '18 hours',
          completed: false,
          current: false
        },
        {
          id: 7,
          title: 'Node.js & Express',
          duration: '22 hours',
          completed: false,
          current: false
        },
        {
          id: 8,
          title: 'Database Design with MongoDB',
          duration: '16 hours',
          completed: false,
          current: false
        }
      ]
    }
  ];

  const currentPath = learningPaths.find(path => path.id === selectedPath);

  if (selectedPath && currentPath) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setSelectedPath(null)}
          >
            ← Back to Learning Paths
          </Button>
          <Badge variant="secondary">
            {currentPath.completedCourses}/{currentPath.totalCourses} courses completed
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{currentPath.title}</CardTitle>
                <p className="text-gray-600 mt-2">{currentPath.description}</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((currentPath.completedCourses / currentPath.totalCourses) * 100)}%
                </div>
                <div className="text-sm text-gray-500">Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentPath.totalHours}h</div>
                <div className="text-sm text-gray-500">Total Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentPath.students.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Students</div>
              </div>
            </div>

            <Progress value={(currentPath.completedCourses / currentPath.totalCourses) * 100} className="h-3" />

            <div>
              <h3 className="font-semibold mb-3">Skills You'll Learn</h3>
              <div className="flex flex-wrap gap-2">
                {currentPath.skills.map((skill, index) => (
                  <Badge key={index} variant="outline">{skill}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Course Roadmap</h3>
              <div className="space-y-3">
                {currentPath.courses.map((course, index) => (
                  <div
                    key={course.id}
                    className={`flex items-center space-x-4 p-4 border rounded-lg ${
                      course.current ? 'border-purple-300 bg-purple-50' : 
                      course.completed ? 'border-green-300 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {course.completed ? (
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      ) : course.current ? (
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 text-sm">{index + 1}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{course.title}</h4>
                      <p className="text-sm text-gray-600">{course.duration}</p>
                    </div>
                    <div>
                      {course.current ? (
                        <Button size="sm" asChild>
                          <Link to={`/course/${course.id}/learn`}>Continue</Link>
                        </Button>
                      ) : course.completed ? (
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/course/${course.id}`}>Review</Link>
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled>
                          Locked
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Learning Paths</h1>
        <p className="text-gray-600">
          Structured learning journeys to master specific skills and earn certificates
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Paths</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {learningPaths.map((path) => (
              <Card key={path.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{path.title}</CardTitle>
                      <p className="text-gray-600 mt-1">{path.description}</p>
                    </div>
                    <Trophy className="w-6 h-6 text-yellow-500" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{path.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span>{path.totalCourses} courses</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{path.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{path.rating}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{path.completedCourses}/{path.totalCourses} completed</span>
                    </div>
                    <Progress value={(path.completedCourses / path.totalCourses) * 100} className="h-2" />
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {path.skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {path.skills.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{path.skills.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => setSelectedPath(path.id)}
                  >
                    {path.completedCourses > 0 ? 'Continue Path' : 'Start Path'}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="in-progress">
          <div className="text-center py-8">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Continue Your Learning Journey</h3>
            <p className="text-gray-600">
              You have {learningPaths.filter(p => p.completedCourses > 0 && p.completedCourses < p.totalCourses).length} learning paths in progress
            </p>
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="text-center py-8">
            <Trophy className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Completed Paths Yet</h3>
            <p className="text-gray-600">
              Complete a learning path to earn your certificate and showcase your skills
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningPaths;
