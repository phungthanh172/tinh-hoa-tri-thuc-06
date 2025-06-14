
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, CheckCircle } from 'lucide-react';

interface QuizAssignmentStepProps {
  courseData: any;
  setCourseData: (data: any) => void;
  isEditing: boolean;
}

const QuizAssignmentStep = ({ courseData, setCourseData }: QuizAssignmentStepProps) => {
  const [quizzes, setQuizzes] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const addQuiz = () => {
    const newQuiz = {
      id: Date.now().toString(),
      title: 'New Quiz',
      description: '',
      timeLimit: 30,
      passingScore: 70,
      attempts: 1,
      questions: []
    };
    setQuizzes([...quizzes, newQuiz]);
  };

  const addQuestion = (quizId: string) => {
    const newQuestion = {
      id: Date.now().toString(),
      type: 'multiple-choice',
      question: '',
      options: ['', ''],
      correctAnswer: 0,
      points: 1
    };
    
    setQuizzes(quizzes.map(quiz => 
      quiz.id === quizId 
        ? { ...quiz, questions: [...quiz.questions, newQuestion] }
        : quiz
    ));
  };

  const addAssignment = () => {
    const newAssignment = {
      id: Date.now().toString(),
      title: 'New Assignment',
      description: '',
      dueDate: '',
      allowedFileTypes: [],
      maxFileSize: '10MB',
      passingScore: 70
    };
    setAssignments([...assignments, newAssignment]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quizzes & Assignments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Quizzes Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Quizzes</h3>
            <Button onClick={addQuiz} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Quiz
            </Button>
          </div>

          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="border-l-4 border-blue-500">
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Quiz Title</Label>
                    <Input
                      value={quiz.title}
                      onChange={(e) => {
                        setQuizzes(quizzes.map(q => 
                          q.id === quiz.id ? { ...q, title: e.target.value } : q
                        ));
                      }}
                      placeholder="Enter quiz title"
                    />
                  </div>
                  <div>
                    <Label>Time Limit (minutes)</Label>
                    <Input
                      type="number"
                      value={quiz.timeLimit}
                      onChange={(e) => {
                        setQuizzes(quizzes.map(q => 
                          q.id === quiz.id ? { ...q, timeLimit: parseInt(e.target.value) } : q
                        ));
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Passing Score (%)</Label>
                    <Input
                      type="number"
                      value={quiz.passingScore}
                      onChange={(e) => {
                        setQuizzes(quizzes.map(q => 
                          q.id === quiz.id ? { ...q, passingScore: parseInt(e.target.value) } : q
                        ));
                      }}
                    />
                  </div>
                  <div>
                    <Label>Number of Attempts</Label>
                    <Select
                      value={quiz.attempts.toString()}
                      onValueChange={(value) => {
                        setQuizzes(quizzes.map(q => 
                          q.id === quiz.id ? { ...q, attempts: parseInt(value) } : q
                        ));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 attempt</SelectItem>
                        <SelectItem value="2">2 attempts</SelectItem>
                        <SelectItem value="3">3 attempts</SelectItem>
                        <SelectItem value="-1">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={quiz.description}
                    onChange={(e) => {
                      setQuizzes(quizzes.map(q => 
                        q.id === quiz.id ? { ...q, description: e.target.value } : q
                      ));
                    }}
                    placeholder="Brief description of the quiz"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={() => addQuestion(quiz.id)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setQuizzes(quizzes.filter(q => q.id !== quiz.id));
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Questions */}
                {quiz.questions.map((question, index) => (
                  <Card key={question.id} className="ml-4">
                    <CardContent className="p-3 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 space-y-3">
                          <div>
                            <Label>Question {index + 1}</Label>
                            <Textarea
                              value={question.question}
                              onChange={(e) => {
                                setQuizzes(quizzes.map(q => 
                                  q.id === quiz.id 
                                    ? {
                                        ...q,
                                        questions: q.questions.map(ques => 
                                          ques.id === question.id 
                                            ? { ...ques, question: e.target.value }
                                            : ques
                                        )
                                      }
                                    : q
                                ));
                              }}
                              placeholder="Enter your question"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label>Question Type</Label>
                              <Select value={question.type}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                                  <SelectItem value="true-false">True/False</SelectItem>
                                  <SelectItem value="fill-blank">Fill in the Blank</SelectItem>
                                  <SelectItem value="open-ended">Open Ended</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Points</Label>
                              <Input
                                type="number"
                                value={question.points}
                                onChange={(e) => {
                                  setQuizzes(quizzes.map(q => 
                                    q.id === quiz.id 
                                      ? {
                                          ...q,
                                          questions: q.questions.map(ques => 
                                            ques.id === question.id 
                                              ? { ...ques, points: parseInt(e.target.value) }
                                              : ques
                                          )
                                        }
                                      : q
                                  ));
                                }}
                              />
                            </div>
                          </div>

                          {question.type === 'multiple-choice' && (
                            <div className="space-y-2">
                              <Label>Answer Options</Label>
                              {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center space-x-2">
                                  <Input
                                    value={option}
                                    onChange={(e) => {
                                      setQuizzes(quizzes.map(q => 
                                        q.id === quiz.id 
                                          ? {
                                              ...q,
                                              questions: q.questions.map(ques => 
                                                ques.id === question.id 
                                                  ? {
                                                      ...ques,
                                                      options: ques.options.map((opt, i) => 
                                                        i === optionIndex ? e.target.value : opt
                                                      )
                                                    }
                                                  : ques
                                              )
                                            }
                                          : q
                                      ));
                                    }}
                                    placeholder={`Option ${optionIndex + 1}`}
                                  />
                                  <Button
                                    variant={question.correctAnswer === optionIndex ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => {
                                      setQuizzes(quizzes.map(q => 
                                        q.id === quiz.id 
                                          ? {
                                              ...q,
                                              questions: q.questions.map(ques => 
                                                ques.id === question.id 
                                                  ? { ...ques, correctAnswer: optionIndex }
                                                  : ques
                                              )
                                            }
                                          : q
                                      ));
                                    }}
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setQuizzes(quizzes.map(q => 
                                    q.id === quiz.id 
                                      ? {
                                          ...q,
                                          questions: q.questions.map(ques => 
                                            ques.id === question.id 
                                              ? { ...ques, options: [...ques.options, ''] }
                                              : ques
                                          )
                                        }
                                      : q
                                  ));
                                }}
                              >
                                Add Option
                              </Button>
                            </div>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setQuizzes(quizzes.map(q => 
                              q.id === quiz.id 
                                ? {
                                    ...q,
                                    questions: q.questions.filter(ques => ques.id !== question.id)
                                  }
                                : q
                            ));
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Assignments Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Assignments</h3>
            <Button onClick={addAssignment} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Assignment
            </Button>
          </div>

          {assignments.map((assignment) => (
            <Card key={assignment.id} className="border-l-4 border-green-500">
              <CardContent className="p-4 space-y-4">
                <div>
                  <Label>Assignment Title</Label>
                  <Input
                    value={assignment.title}
                    onChange={(e) => {
                      setAssignments(assignments.map(a => 
                        a.id === assignment.id ? { ...a, title: e.target.value } : a
                      ));
                    }}
                    placeholder="Enter assignment title"
                  />
                </div>

                <div>
                  <Label>Description & Instructions</Label>
                  <Textarea
                    value={assignment.description}
                    onChange={(e) => {
                      setAssignments(assignments.map(a => 
                        a.id === assignment.id ? { ...a, description: e.target.value } : a
                      ));
                    }}
                    placeholder="Provide detailed instructions for the assignment"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Due Date</Label>
                    <Input
                      type="date"
                      value={assignment.dueDate}
                      onChange={(e) => {
                        setAssignments(assignments.map(a => 
                          a.id === assignment.id ? { ...a, dueDate: e.target.value } : a
                        ));
                      }}
                    />
                  </div>
                  <div>
                    <Label>Max File Size</Label>
                    <Select value={assignment.maxFileSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5MB">5 MB</SelectItem>
                        <SelectItem value="10MB">10 MB</SelectItem>
                        <SelectItem value="25MB">25 MB</SelectItem>
                        <SelectItem value="50MB">50 MB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Passing Score (%)</Label>
                    <Input
                      type="number"
                      value={assignment.passingScore}
                      onChange={(e) => {
                        setAssignments(assignments.map(a => 
                          a.id === assignment.id ? { ...a, passingScore: parseInt(e.target.value) } : a
                        ));
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAssignments(assignments.filter(a => a.id !== assignment.id));
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
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

export default QuizAssignmentStep;
