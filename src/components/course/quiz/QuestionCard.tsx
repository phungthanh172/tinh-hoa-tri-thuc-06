
import React from 'react';
import { GripVertical, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { QuizQuestion } from './types';

interface QuestionCardProps {
  question: QuizQuestion;
  questionIndex: number;
  onUpdateQuestion: (field: string, value: any) => void;
  onDeleteQuestion: () => void;
  onAddOption: () => void;
  onUpdateOption: (optionId: string, field: string, value: string | boolean) => void;
  onDeleteOption: (optionId: string) => void;
}

const QuestionCard = ({
  question,
  questionIndex,
  onUpdateQuestion,
  onDeleteQuestion,
  onAddOption,
  onUpdateOption,
  onDeleteOption
}: QuestionCardProps) => {
  return (
    <Card className="bg-gray-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <GripVertical className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Question {questionIndex + 1}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDeleteQuestion}
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
                onChange={(e) => onUpdateQuestion('question', e.target.value)}
                placeholder="Enter your question..."
                className="min-h-[80px]"
              />
            </div>
            
            <div className="space-y-2">
              <div>
                <Label className="text-xs">Type</Label>
                <Select
                  value={question.type}
                  onValueChange={(value) => onUpdateQuestion('type', value)}
                >
                  <SelectTrigger>
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
                  onChange={(e) => onUpdateQuestion('points', Number(e.target.value) || 1)}
                  min="1"
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
                  onClick={onAddOption}
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
                      onCheckedChange={(checked) => onUpdateOption(option.id, 'isCorrect', checked)}
                    />
                    <Input
                      value={option.text}
                      onChange={(e) => onUpdateOption(option.id, 'text', e.target.value)}
                      placeholder={`Option ${optionIndex + 1}`}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteOption(option.id)}
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
              onChange={(e) => onUpdateQuestion('explanation', e.target.value)}
              placeholder="Explain the correct answer..."
              className="min-h-[60px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
