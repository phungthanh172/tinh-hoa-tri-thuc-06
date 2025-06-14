
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QAndATab from './tabs/QAndATab';
import NotesTab from './tabs/NotesTab';
import AnnouncementsTab from './tabs/AnnouncementsTab';
import ReviewsTab from './tabs/ReviewsTab';
import ChatWithAI from '@/components/progress/ChatWithAI';
import QuizzesTab from '@/components/course/tabs/QuizzesTab';
import ProgressDashboard from '@/components/progress/ProgressDashboard';

interface CourseLearnerTabsProps {
  courseId: string;
}

const CourseLearnerTabs: React.FC<CourseLearnerTabsProps> = ({ courseId }) => {
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
    }
  ];

  return (
    <div className="px-6 pb-6">
      <Tabs defaultValue="qanda" className="w-full">
        <TabsList className="grid w-full grid-cols-7 bg-gray-800">
          <TabsTrigger value="qanda" className="text-white data-[state=active]:bg-gray-700">Q&A</TabsTrigger>
          <TabsTrigger value="notes" className="text-white data-[state=active]:bg-gray-700">Notes</TabsTrigger>
          <TabsTrigger value="announcements" className="text-white data-[state=active]:bg-gray-700">Announcements</TabsTrigger>
          <TabsTrigger value="reviews" className="text-white data-[state=active]:bg-gray-700">Reviews</TabsTrigger>
          <TabsTrigger value="quizzes" className="text-white data-[state=active]:bg-gray-700">Quizzes</TabsTrigger>
          <TabsTrigger value="chat" className="text-white data-[state=active]:bg-gray-700">Chat with AI</TabsTrigger>
          <TabsTrigger value="progress" className="text-white data-[state=active]:bg-gray-700">Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="qanda" className="mt-6">
          <QAndATab />
        </TabsContent>
        
        <TabsContent value="notes" className="mt-6">
          <NotesTab courseId={courseId} />
        </TabsContent>
        
        <TabsContent value="announcements" className="mt-6">
          <AnnouncementsTab />
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <ReviewsTab />
        </TabsContent>
        
        <TabsContent value="quizzes" className="mt-6">
          <QuizzesTab sampleQuizQuestions={sampleQuizQuestions} />
        </TabsContent>
        
        <TabsContent value="chat" className="mt-6">
          <ChatWithAI courseId={courseId} courseName="JavaScript Course" />
        </TabsContent>
        
        <TabsContent value="progress" className="mt-6">
          <ProgressDashboard courseId={courseId} courseName="JavaScript Course" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseLearnerTabs;
