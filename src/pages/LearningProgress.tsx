
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoPlayer from '@/components/progress/VideoPlayer';
import QuizTaker from '@/components/progress/QuizTaker';
import ProgressDashboard from '@/components/progress/ProgressDashboard';
import CertificateGenerator from '@/components/progress/CertificateGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProgress } from '@/contexts/ProgressContext';

const LearningProgress = () => {
  const { getCourseProgress } = useProgress();
  const courseProgress = getCourseProgress('1');

  const sampleQuizQuestions = [
    {
      id: '1',
      question: 'What is the correct way to declare a variable in JavaScript?',
      type: 'multiple-choice' as const,
      options: [
        { id: 'a', text: 'var myVariable;', isCorrect: true },
        { id: 'b', text: 'variable myVariable;', isCorrect: false },
        { id: 'c', text: 'v myVariable;', isCorrect: false },
        { id: 'd', text: 'declare myVariable;', isCorrect: false }
      ],
      explanation: 'In JavaScript, variables are declared using var, let, or const keywords.',
      points: 1
    },
    {
      id: '2',
      question: 'JavaScript is a compiled language.',
      type: 'multiple-choice' as const,
      options: [
        { id: 'a', text: 'True', isCorrect: false },
        { id: 'b', text: 'False', isCorrect: true }
      ],
      explanation: 'JavaScript is an interpreted language, not a compiled language.',
      points: 1
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Progress Tracking</h1>
          <p className="text-gray-600">Track your learning journey with comprehensive progress monitoring</p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="video">Video Learning</TabsTrigger>
            <TabsTrigger value="quiz">Quiz Practice</TabsTrigger>
            <TabsTrigger value="certificate">Certificate</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <ProgressDashboard
              courseId="1"
              courseName="The Complete JavaScript Course 2024"
            />
          </TabsContent>

          <TabsContent value="video" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Learning Session</CardTitle>
              </CardHeader>
              <CardContent>
                <VideoPlayer
                  courseId="1"
                  lectureId="1"
                  videoUrl="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
                  title="JavaScript Fundamentals - Variables and Data Types"
                  duration={450}
                  onComplete={() => console.log('Video completed')}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quiz" className="mt-6">
            <QuizTaker
              courseId="1"
              quizId="1"
              title="JavaScript Basics Quiz"
              description="Test your understanding of JavaScript fundamentals"
              questions={sampleQuizQuestions}
              timeLimit={10}
              passingScore={70}
              onComplete={(score, passed) => {
                console.log(`Quiz completed: ${score}%, Passed: ${passed}`);
              }}
            />
          </TabsContent>

          <TabsContent value="certificate" className="mt-6">
            {courseProgress?.completed ? (
              <CertificateGenerator
                studentName="John Doe"
                courseName="The Complete JavaScript Course 2024"
                instructorName="Jonas Schmedtmann"
                completionDate={courseProgress.completionDate || new Date()}
                certificateId="CERT-2024-JS-001"
                courseHours={69}
              />
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold mb-4">Certificate Not Available</h3>
                  <p className="text-gray-600">
                    Complete the course to generate your certificate of completion.
                  </p>
                  <div className="mt-4">
                    <div className="text-2xl font-bold text-purple-600">
                      {courseProgress?.completionPercentage || 0}%
                    </div>
                    <div className="text-sm text-gray-500">Course Progress</div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default LearningProgress;
