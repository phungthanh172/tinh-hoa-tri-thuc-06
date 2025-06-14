
import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  explanation?: string;
  options: QuizOption[];
  points: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimit?: number;
  passingScore: number;
  questions: QuizQuestion[];
}

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
            <Card key={quiz.id} className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-500">Quiz {quizIndex + 1}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteQuiz(quiz.id)}
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
                        onChange={(e) => updateQuiz(quiz.id, 'title', e.target.value)}
                        placeholder="Quiz title"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm">Description</Label>
                      <Textarea
                        value={quiz.description}
                        onChange={(e) => updateQuiz(quiz.id, 'description', e.target.value)}
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
                          onChange={(e) => updateQuiz(quiz.id, 'timeLimit', parseInt(e.target.value) || 0)}
                          placeholder="30"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-sm">Passing Score (%)</Label>
                        <Input
                          type="number"
                          value={quiz.passingScore}
                          onChange={(e) => updateQuiz(quiz.id, 'passingScore', parseInt(e.target.value) || 70)}
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
                    <Card key={question.id} className="bg-gray-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <GripVertical className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">Question {questionIndex + 1}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteQuestion(quiz.id, question.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="md:col-span-2">
                              <Label className="text-xs">Question</Label>
                              <Textarea
                                value={question.question}
                                onChange={(e) => updateQuestion(quiz.id, question.id, 'question', e.target.value)}
                                placeholder="Enter your question..."
                                className="min-h-[80px]"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <div>
                                <Label className="text-xs">Type</Label>
                                <Select
                                  value={question.type}
                                  onValueChange={(value) => updateQuestion(quiz.id, question.id, 'type', value)}
                                >
                                  <SelectTrigger size="sm">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                                    <SelectItem value="true-false">True/False</SelectItem>
                                    <SelectItem value="short-answer">Short Answer</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div>
                                <Label className="text-xs">Points</Label>
                                <Input
                                  type="number"
                                  value={question.points}
                                  onChange={(e) => updateQuestion(quiz.id, question.id, 'points', parseInt(e.target.value) || 1)}
                                  min="1"
                                  size="sm"
                                />
                              </div>
                            </div>
                          </div>
                          
                          {question.type === 'multiple-choice' && (
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <Label className="text-xs">Answer Options</Label>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addOption(quiz.id, question.id)}
                                >
                                  <Plus className="w-3 h-3 mr-1" />
                                  Add Option
                                </Button>
                              </div>
                              
                              <div className="space-y-2">
                                {question.options.map((option, optionIndex) => (
                                  <div key={option.id} className="flex items-center space-x-2">
                                    <Checkbox
                                      checked={option.isCorrect}
                                      onCheckedChange={(checked) => updateOption(quiz.id, question.id, option.id, 'isCorrect', checked)}
                                    />
                                    <Input
                                      value={option.text}
                                      onChange={(e) => updateOption(quiz.id, question.id, option.id, 'text', e.target.value)}
                                      placeholder={`Option ${optionIndex + 1}`}
                                      size="sm"
                                      className="flex-1"
                                    />
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => deleteOption(quiz.id, question.id, option.id)}
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div>
                            <Label className="text-xs">Explanation (optional)</Label>
                            <Textarea
                              value={question.explanation || ''}
                              onChange={(e) => updateQuestion(quiz.id, question.id, 'explanation', e.target.value)}
                              placeholder="Explain the correct answer..."
                              className="min-h-[60px]"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addQuestion(quiz.id)}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizBuilder;
