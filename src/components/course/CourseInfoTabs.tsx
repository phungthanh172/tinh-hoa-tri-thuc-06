
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatWithAI from '@/components/progress/ChatWithAI';
import Notes from '@/components/progress/Notes';
import ProgressDashboard from '@/components/progress/ProgressDashboard';
import OverviewTab from './tabs/OverviewTab';
import LecturesTab from './tabs/LecturesTab';
import QuizzesTab from './tabs/QuizzesTab';

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
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="lectures">Lectures</TabsTrigger>
        <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
        <TabsTrigger value="chat">Chat with AI</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="progress">Progress</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-8">
        <OverviewTab
          course={course}
          whatYoullLearn={whatYoullLearn}
          courseContent={courseContent}
          requirements={requirements}
        />
      </TabsContent>
      
      <TabsContent value="lectures">
        <LecturesTab />
      </TabsContent>
      
      <TabsContent value="quizzes">
        <QuizzesTab sampleQuizQuestions={sampleQuizQuestions} />
      </TabsContent>
      
      <TabsContent value="chat">
        <ChatWithAI
          courseId="1"
          courseName={course.title}
        />
      </TabsContent>
      
      <TabsContent value="notes">
        <Notes
          courseId="1"
          courseName={course.title}
        />
      </TabsContent>
      
      <TabsContent value="progress">
        <ProgressDashboard
          courseId="1"
          courseName={course.title}
        />
      </TabsContent>
    </Tabs>
  );
};

export default CourseInfoTabs;
