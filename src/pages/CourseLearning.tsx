
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  BookOpen, 
  CheckCircle,
  Clock,
  ArrowLeft
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CourseLearning = () => {
  const { courseId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(1);
  const [lessonProgress, setLessonProgress] = useState(0);

  // Mock course data - in a real app, this would come from an API
  const courseData = {
    1: {
      title: "The Complete JavaScript Course 2024",
      instructor: "Jonas Schmedtmann",
      currentLesson: "Async/Await in JavaScript",
      totalLessons: 320,
      completedLessons: 240,
      progress: 75,
      lessons: [
        { id: 1, title: "Introduction to JavaScript", duration: "15:30", completed: true },
        { id: 2, title: "Variables and Data Types", duration: "22:45", completed: true },
        { id: 3, title: "Functions and Scope", duration: "28:15", completed: true },
        { id: 4, title: "Async/Await in JavaScript", duration: "31:20", completed: false },
        { id: 5, title: "Modern JavaScript Features", duration: "25:10", completed: false },
      ]
    },
    2: {
      title: "React - The Complete Guide 2024",
      instructor: "Maximilian Schwarzmüller",
      currentLesson: "React Hooks Deep Dive",
      totalLessons: 835,
      completedLessons: 376,
      progress: 45,
      lessons: [
        { id: 1, title: "Introduction to React", duration: "18:30", completed: true },
        { id: 2, title: "Components and JSX", duration: "25:45", completed: true },
        { id: 3, title: "State Management", duration: "32:15", completed: true },
        { id: 4, title: "React Hooks Deep Dive", duration: "28:20", completed: false },
        { id: 5, title: "Advanced React Patterns", duration: "35:10", completed: false },
      ]
    }
  };

  const course = courseData[courseId as keyof typeof courseData];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setLessonProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
            <Link to="/student-dashboard">
              <Button>Return to Dashboard</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextLesson = () => {
    if (currentLesson < course.lessons.length) {
      setCurrentLesson(currentLesson + 1);
      setLessonProgress(0);
      setIsPlaying(false);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLesson > 1) {
      setCurrentLesson(currentLesson - 1);
      setLessonProgress(0);
      setIsPlaying(false);
    }
  };

  const currentLessonData = course.lessons[currentLesson - 1];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/student-dashboard" className="flex items-center text-purple-600 hover:text-purple-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
          <p className="text-gray-600">By {course.instructor}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="bg-black aspect-video rounded-t-lg flex items-center justify-center relative">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">🎥</div>
                    <h3 className="text-xl font-semibold mb-2">{currentLessonData?.title}</h3>
                    <p className="text-gray-300">{currentLessonData?.duration}</p>
                  </div>
                  
                  {/* Play/Pause Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-purple-600 hover:bg-purple-700 rounded-full w-16 h-16"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                    </Button>
                  </div>
                </div>
                
                {/* Video Controls */}
                <div className="p-4 bg-gray-900 text-white rounded-b-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-gray-700"
                        onClick={handlePreviousLesson}
                        disabled={currentLesson === 1}
                      >
                        <SkipBack className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-gray-700"
                        onClick={handlePlayPause}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-gray-700"
                        onClick={handleNextLesson}
                        disabled={currentLesson === course.lessons.length}
                      >
                        <SkipForward className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-sm">
                      Lesson {currentLesson} of {course.lessons.length}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{lessonProgress}%</span>
                    </div>
                    <Progress value={lessonProgress} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-gray-600">{course.completedLessons}/{course.totalLessons} lessons</span>
                  </div>
                  <Progress value={course.progress} className="h-3" />
                  <p className="text-sm text-gray-600">{course.progress}% complete</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lesson List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Course Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course.lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        currentLesson === lesson.id
                          ? 'bg-purple-50 border-purple-200'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setCurrentLesson(lesson.id);
                        setLessonProgress(lesson.completed ? 100 : 0);
                        setIsPlaying(false);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1">{lesson.title}</h4>
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>{lesson.duration}</span>
                            {lesson.completed && (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Completed
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseLearning;
