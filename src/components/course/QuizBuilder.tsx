
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import QuizCard from './quiz/QuizCard';
import { Quiz, QuizQuestion, QuizOption } from './quiz/types';

const QuizBuilder = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'JavaScript Basics Quiz',
      description: 'Test your understanding of JavaScript fundamentals',
      timeLimit: 30,
      passingScore: 70,
      questions: []
    }
  ]);

  const addQuiz = () => {
    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title: 'New Quiz',
      description: '',
      passingScore: 70,
      questions: []
    };
    setQuizzes([...quizzes, newQuiz]);
  };

  const updateQuiz = (quizId: string, field: string, value: string | number) => {
    setQuizzes(quizzes.map(quiz => 
      quiz.id === quizId ? { ...quiz, [field]: value } : quiz
    ));
  };

  const deleteQuiz = (quizId: string) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
  };

  const addQuestion = (quizId: string) => {
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      type: 'multiple-choice',
      question: '',
      options: [
        { id: '1', text: '', isCorrect: false },
        { id: '2', text: '', isCorrect: false }
      ],
      points: 1
    };
    
    setQuizzes(quizzes.map(quiz => 
      quiz.id === quizId 
        ? { ...quiz, questions: [...quiz.questions, newQuestion] }
        : quiz
    ));
  };

  const updateQuestion = (quizId: string, questionId: string, field: string, value: any) => {
    setQuizzes(quizzes.map(quiz => 
      quiz.id === quizId 
        ? {
            ...quiz,
            questions: quiz.questions.map(question =>
              question.id === questionId ? { ...question, [field]: value } : question
            )
          }
        : quiz
    ));
  };

  const deleteQuestion = (quizId: string, questionId: string) => {
    setQuizzes(quizzes.map(quiz => 
      quiz.id === quizId 
        ? { ...quiz, questions: quiz.questions.filter(question => question.id !== questionId) }
        : quiz
    ));
  };

  const addOption = (quizId: string, questionId: string) => {
    const newOption: QuizOption = {
      id: Date.now().toString(),
      text: '',
      isCorrect: false
    };

    setQuizzes(quizzes.map(quiz => 
      quiz.id === quizId 
        ? {
            ...quiz,
            questions: quiz.questions.map(question =>
              question.id === questionId 
                ? { ...question, options: [...question.options, newOption] }
                : question
            )
          }
        : quiz
    ));
  };

  const updateOption = (quizId: string, questionId: string, optionId: string, field: string, value: string | boolean) => {
    setQuizzes(quizzes.map(quiz => 
      quiz.id === quizId 
        ? {
            ...quiz,
            questions: quiz.questions.map(question =>
              question.id === questionId 
                ? {
                    ...question,
                    options: question.options.map(option =>
                      option.id === optionId ? { ...option, [field]: value } : option
                    )
                  }
                : question
            )
          }
        : quiz
    ));
  };

  const deleteOption = (quizId: string, questionId: string, optionId: string) => {
    setQuizzes(quizzes.map(quiz => 
      quiz.id === quizId 
        ? {
            ...quiz,
            questions: quiz.questions.map(question =>
              question.id === questionId 
                ? { ...question, options: question.options.filter(option => option.id !== optionId) }
                : question
            )
          }
        : quiz
    ));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Course Quizzes</CardTitle>
          <Button onClick={addQuiz} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Quiz
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {quizzes.map((quiz, quizIndex) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              quizIndex={quizIndex}
              onUpdateQuiz={updateQuiz}
              onDeleteQuiz={deleteQuiz}
              onAddQuestion={addQuestion}
              onUpdateQuestion={updateQuestion}
              onDeleteQuestion={deleteQuestion}
              onAddOption={addOption}
              onUpdateOption={updateOption}
              onDeleteOption={deleteOption}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizBuilder;
