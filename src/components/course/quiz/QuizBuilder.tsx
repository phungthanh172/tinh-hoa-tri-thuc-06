
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, CheckCircle, GripVertical } from 'lucide-react';
import { QuizQuestion } from '../curriculum/types';

interface QuizBuilderProps {
  questions: QuizQuestion[];
  onQuestionsChange: (questions: QuizQuestion[]) => void;
  timeLimit?: number;
  onTimeLimitChange?: (timeLimit: number) => void;
  passingScore?: number;
  onPassingScoreChange?: (score: number) => void;
  attempts?: number;
  onAttemptsChange?: (attempts: number) => void;
}

const QuizBuilder = ({
  questions,
  onQuestionsChange,
  timeLimit = 30,
  onTimeLimitChange,
  passingScore = 70,
  onPassingScoreChange,
  attempts = 1,
  onAttemptsChange
}: QuizBuilderProps) => {
  const [randomizeQuestions, setRandomizeQuestions] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(true);

  const addQuestion = (type: string = 'multiple-choice') => {
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      type: type as any,
      question: '',
      points: 1,
      options: type === 'multiple-choice' ? ['', '', '', ''] : [],
      correctAnswer: type === 'multiple-choice' ? 0 : '',
      explanation: ''
    };
    onQuestionsChange([...questions, newQuestion]);
  };

  const updateQuestion = (questionId: string, field: string, value: any) => {
    onQuestionsChange(
      questions.map(q => 
        q.id === questionId ? { ...q, [field]: value } : q
      )
    );
  };

  const deleteQuestion = (questionId: string) => {
    onQuestionsChange(questions.filter(q => q.id !== questionId));
  };

  const addOption = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.options) {
      updateQuestion(questionId, 'options', [...question.options, '']);
    }
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.options) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      updateQuestion(questionId, 'options', newOptions);
    }
  };

  const deleteOption = (questionId: string, optionIndex: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.options && question.options.length > 2) {
      const newOptions = question.options.filter((_, index) => index !== optionIndex);
      updateQuestion(questionId, 'options', newOptions);
      
      // Adjust correct answer if needed
      if (question.correctAnswer === optionIndex) {
        updateQuestion(questionId, 'correctAnswer', 0);
      } else if (typeof question.correctAnswer === 'number' && question.correctAnswer > optionIndex) {
        updateQuestion(questionId, 'correctAnswer', question.correctAnswer - 1);
      }
    }
  };

  const getTotalPoints = () => {
    return questions.reduce((total, question) => total + question.points, 0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Quiz Builder</span>
          <div className="flex gap-2">
            <Select onValueChange={addQuestion}>
              <SelectTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                <SelectItem value="true-false">True/False</SelectItem>
                <SelectItem value="fill-blank">Fill in the Blank</SelectItem>
                <SelectItem value="open-ended">Open Ended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quiz Settings */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <Label htmlFor="time-limit">Time Limit (minutes)</Label>
            <Input
              id="time-limit"
              type="number"
              value={timeLimit}
              onChange={(e) => onTimeLimitChange?.(parseInt(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <Label htmlFor="passing-score">Passing Score (%)</Label>
            <Input
              id="passing-score"
              type="number"
              value={passingScore}
              onChange={(e) => onPassingScoreChange?.(parseInt(e.target.value))}
              min="0"
              max="100"
            />
          </div>
          <div>
            <Label htmlFor="attempts">Attempts Allowed</Label>
            <Select value={attempts.toString()} onValueChange={(value) => onAttemptsChange?.(parseInt(value))}>
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
          <div>
            <Label>Total Points</Label>
            <div className="text-lg font-semibold text-purple-600 mt-2">
              {getTotalPoints()}
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="space-y-3 p-4 border rounded-lg">
          <div className="flex items-center space-x-2">
            <Switch 
              id="randomize" 
              checked={randomizeQuestions}
              onCheckedChange={setRandomizeQuestions}
            />
            <Label htmlFor="randomize">Randomize question order</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch 
              id="show-answers" 
              checked={showCorrectAnswers}
              onCheckedChange={setShowCorrectAnswers}
            />
            <Label htmlFor="show-answers">Show correct answers after submission</Label>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {questions.map((question, index) => (
            <Card key={question.id} className="border-l-4 border-purple-500">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <GripVertical className="w-5 h-5 text-gray-400 cursor-grab mt-1" />
                  <div className="flex-1 space-y-4">
                    {/* Question Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-4">
                          <Label className="text-sm font-medium">
                            Question {index + 1}
                          </Label>
                          <Select 
                            value={question.type} 
                            onValueChange={(value) => updateQuestion(question.id, 'type', value)}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                              <SelectItem value="true-false">True/False</SelectItem>
                              <SelectItem value="fill-blank">Fill in the Blank</SelectItem>
                              <SelectItem value="open-ended">Open Ended</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex items-center gap-2">
                            <Label className="text-sm">Points:</Label>
                            <Input
                              type="number"
                              value={question.points}
                              onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value))}
                              className="w-16"
                              min="1"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label>Question Text</Label>
                          <Textarea
                            value={question.question}
                            onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                            placeholder="Enter your question here..."
                            className="min-h-[80px]"
                          />
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteQuestion(question.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Question Options */}
                    {question.type === 'multiple-choice' && (
                      <div className="space-y-3">
                        <Label>Answer Options</Label>
                        {question.options?.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center gap-2">
                            <Button
                              variant={question.correctAnswer === optionIndex ? "default" : "outline"}
                              size="sm"
                              onClick={() => updateQuestion(question.id, 'correctAnswer', optionIndex)}
                              className="flex-shrink-0"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Input
                              value={option}
                              onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                              placeholder={`Option ${optionIndex + 1}`}
                            />
                            {question.options && question.options.length > 2 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteOption(question.id, optionIndex)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addOption(question.id)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Option
                        </Button>
                      </div>
                    )}

                    {question.type === 'true-false' && (
                      <div className="space-y-2">
                        <Label>Correct Answer</Label>
                        <div className="flex gap-2">
                          <Button
                            variant={question.correctAnswer === 'true' ? "default" : "outline"}
                            onClick={() => updateQuestion(question.id, 'correctAnswer', 'true')}
                          >
                            True
                          </Button>
                          <Button
                            variant={question.correctAnswer === 'false' ? "default" : "outline"}
                            onClick={() => updateQuestion(question.id, 'correctAnswer', 'false')}
                          >
                            False
                          </Button>
                        </div>
                      </div>
                    )}

                    {question.type === 'fill-blank' && (
                      <div>
                        <Label>Correct Answer</Label>
                        <Input
                          value={question.correctAnswer as string}
                          onChange={(e) => updateQuestion(question.id, 'correctAnswer', e.target.value)}
                          placeholder="Enter the correct answer"
                        />
                      </div>
                    )}

                    {/* Explanation */}
                    <div>
                      <Label>Explanation (Optional)</Label>
                      <Textarea
                        value={question.explanation || ''}
                        onChange={(e) => updateQuestion(question.id, 'explanation', e.target.value)}
                        placeholder="Explain why this is the correct answer..."
                        className="min-h-[60px]"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {questions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No questions added yet</p>
            <Button onClick={() => addQuestion()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Question
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizBuilder;
