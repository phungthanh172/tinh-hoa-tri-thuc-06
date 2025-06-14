
import React from 'react';
import { HelpCircle, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import QuestionCard from './QuestionCard';
import { Quiz, QuizQuestion } from './types';

interface QuizCardProps {
  quiz: Quiz;
  quizIndex: number;
  onUpdateQuiz: (quizId: string, field: string, value: string | number) => void;
  onDeleteQuiz: (quizId: string) => void;
  onAddQuestion: (quizId: string) => void;
  onUpdateQuestion: (quizId: string, questionId: string, field: string, value: any) => void;
  onDeleteQuestion: (quizId: string, questionId: string) => void;
  onAddOption: (quizId: string, questionId: string) => void;
  onUpdateOption: (quizId: string, questionId: string, optionId: string, field: string, value: string | boolean) => void;
  onDeleteOption: (quizId: string, questionId: string, optionId: string) => void;
}

const QuizCard = ({
  quiz,
  quizIndex,
  onUpdateQuiz,
  onDeleteQuiz,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onAddOption,
  onUpdateOption,
  onDeleteOption
}: QuizCardProps) => {
  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-500">Quiz {quizIndex + 1}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteQuiz(quiz.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <Label className="text-sm">Quiz Title</Label>
              <Input
                value={quiz.title}
                onChange={(e) => onUpdateQuiz(quiz.id, 'title', e.target.value)}
                placeholder="Quiz title"
              />
            </div>
            
            <div>
              <Label className="text-sm">Description</Label>
              <Textarea
                value={quiz.description}
                onChange={(e) => onUpdateQuiz(quiz.id, 'description', e.target.value)}
                placeholder="Quiz description"
                className="min-h-[80px]"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-sm">Time Limit (minutes)</Label>
                <Input
                  type="number"
                  value={quiz.timeLimit || ''}
                  onChange={(e) => onUpdateQuiz(quiz.id, 'timeLimit', Number(e.target.value) || 0)}
                  placeholder="30"
                />
              </div>
              
              <div>
                <Label className="text-sm">Passing Score (%)</Label>
                <Input
                  type="number"
                  value={quiz.passingScore}
                  onChange={(e) => onUpdateQuiz(quiz.id, 'passingScore', Number(e.target.value) || 70)}
                  placeholder="70"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {quiz.questions.map((question, questionIndex) => (
            <QuestionCard
              key={question.id}
              question={question}
              questionIndex={questionIndex}
              onUpdateQuestion={(field, value) => onUpdateQuestion(quiz.id, question.id, field, value)}
              onDeleteQuestion={() => onDeleteQuestion(quiz.id, question.id)}
              onAddOption={() => onAddOption(quiz.id, question.id)}
              onUpdateOption={(optionId, field, value) => onUpdateOption(quiz.id, question.id, optionId, field, value)}
              onDeleteOption={(optionId) => onDeleteOption(quiz.id, question.id, optionId)}
            />
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddQuestion(quiz.id)}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
