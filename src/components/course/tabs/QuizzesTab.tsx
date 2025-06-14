
import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import QuizTaker from '@/components/progress/QuizTaker';

interface QuizzesTabProps {
  sampleQuizQuestions: any[];
}

const QuizzesTab: React.FC<QuizzesTabProps> = ({ sampleQuizQuestions }) => {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);

  return (
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
  );
};

export default QuizzesTab;
