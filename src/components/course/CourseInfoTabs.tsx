
import React, { useState } from 'react';
import { Play, Trophy, Star, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import VideoPlayer from '@/components/progress/VideoPlayer';
import QuizTaker from '@/components/progress/QuizTaker';
import ProgressDashboard from '@/components/progress/ProgressDashboard';
import CourseContentSection from './CourseContentSection';

interface CourseInfoTabsProps {
  course: any;
  whatYoullLearn: string[];
  courseContent: any[];
  requirements: string[];
  sampleQuizQuestions: any[];
}

const CourseInfoTabs: React.FC<CourseInfoTabsProps> = ({
  course,
  whatYoullLearn,
  courseContent,
  requirements,
  sampleQuizQuestions
}) => {
  const [selectedLecture, setSelectedLecture] = useState<string | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="lectures">Lectures</TabsTrigger>
        <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
        <TabsTrigger value="progress">Progress</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-8">
        {/* What you'll learn */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {whatYoullLearn.map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-4 h-4 text-green-600 mt-0.5">✓</div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <CourseContentSection courseContent={courseContent} />

        {/* Requirements */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="space-y-2">
            {requirements.map((req, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="w-1 h-1 bg-gray-400 rounded-full mt-2"></span>
                <span className="text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructor */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Instructor</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={course.instructor.avatar} />
                  <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{course.instructor.name}</h3>
                  <p className="text-gray-600 mb-4">{course.instructor.title}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{course.instructor.rating} Instructor Rating</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span>{course.instructor.reviewCount.toLocaleString()} Reviews</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{course.instructor.students.toLocaleString()} Students</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Play className="w-4 h-4" />
                      <span>{course.instructor.courses} Courses</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700">{course.instructor.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="lectures">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Course Lectures</h2>
          {selectedLecture ? (
            <div className="space-y-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedLecture(null)}
              >
                ← Back to Lecture List
              </Button>
              <VideoPlayer
                courseId="1"
                lectureId={selectedLecture}
                videoUrl="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
                title={`Lecture ${selectedLecture}`}
                duration={450}
                onComplete={() => console.log('Lecture completed')}
              />
            </div>
          ) : (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {['1', '2', '3'].map((lectureId) => (
                    <div 
                      key={lectureId}
                      className="flex items-center justify-between p-4 border rounded hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedLecture(lectureId)}
                    >
                      <div className="flex items-center space-x-3">
                        <Play className="w-5 h-5 text-purple-600" />
                        <div>
                          <h3 className="font-medium">Lecture {lectureId}: JavaScript Fundamentals</h3>
                          <p className="text-sm text-gray-600">7:30 • Introduction to JavaScript</p>
                        </div>
                      </div>
                      <Badge variant="outline">Video</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="quizzes">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Course Quizzes</h2>
          {selectedQuiz ? (
            <div className="space-y-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedQuiz(null)}
              >
                ← Back to Quiz List
              </Button>
              <QuizTaker
                courseId="1"
                quizId={selectedQuiz}
                title="JavaScript Basics Quiz"
                description="Test your understanding of JavaScript fundamentals"
                questions={sampleQuizQuestions}
                timeLimit={10}
                passingScore={70}
                onComplete={(score, passed) => {
                  console.log(`Quiz completed: ${score}%, Passed: ${passed}`);
                }}
              />
            </div>
          ) : (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {['1', '2'].map((quizId) => (
                    <div 
                      key={quizId}
                      className="flex items-center justify-between p-4 border rounded hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedQuiz(quizId)}
                    >
                      <div className="flex items-center space-x-3">
                        <Trophy className="w-5 h-5 text-yellow-600" />
                        <div>
                          <h3 className="font-medium">Quiz {quizId}: JavaScript Fundamentals</h3>
                          <p className="text-sm text-gray-600">5 questions • 10 minutes • 70% to pass</p>
                        </div>
                      </div>
                      <Badge variant="outline">Quiz</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="progress">
        <ProgressDashboard
          courseId="1"
          courseName="The Complete JavaScript Course 2024"
        />
      </TabsContent>
    </Tabs>
  );
};

export default CourseInfoTabs;
