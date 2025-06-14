
import React, { useState } from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface QuizViewerProps {
  title: string;
}

const QuizViewer: React.FC<QuizViewerProps> = ({ title }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the correct way to declare a variable in JavaScript?",
      options: [
        { id: 'a', text: 'var myVariable;' },
        { id: 'b', text: 'variable myVariable;' },
        { id: 'c', text: 'v myVariable;' },
        { id: 'd', text: 'declare myVariable;' }
      ],
      correct: 'a'
    },
    {
      id: 2,
      question: "Which of the following is NOT a JavaScript data type?",
      options: [
        { id: 'a', text: 'String' },
        { id: 'b', text: 'Boolean' },
        { id: 'c', text: 'Float' },
        { id: 'd', text: 'Number' }
      ],
      correct: 'c'
    }
  ];

  const handleSubmit = () => {
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setShowResult(false);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <Card className="w-full h-full min-h-[600px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>No time limit</span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Progress */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {currentQ.question}
            </h3>

            {/* Options */}
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              <div className="space-y-3">
                {currentQ.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={option.id} 
                      id={option.id}
                      disabled={showResult}
                    />
                    <Label 
                      htmlFor={option.id} 
                      className={`flex-1 p-3 rounded border cursor-pointer ${
                        showResult && option.id === currentQ.correct 
                          ? 'bg-green-50 border-green-500 text-green-700'
                          : showResult && option.id === selectedAnswer && option.id !== currentQ.correct
                          ? 'bg-red-50 border-red-500 text-red-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {option.text}
                      {showResult && option.id === currentQ.correct && (
                        <CheckCircle className="inline w-4 h-4 ml-2 text-green-600" />
                      )}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <div>
              {showResult && (
                <p className={`text-sm ${
                  selectedAnswer === currentQ.correct ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedAnswer === currentQ.correct ? 'Correct!' : 'Incorrect. The correct answer is highlighted above.'}
                </p>
              )}
            </div>
            <div className="space-x-2">
              {!showResult ? (
                <Button 
                  onClick={handleSubmit}
                  disabled={!selectedAnswer}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Submit Answer
                </Button>
              ) : (
                <>
                  {currentQuestion < questions.length - 1 ? (
                    <Button onClick={nextQuestion} className="bg-purple-600 hover:bg-purple-700">
                      Next Question
                    </Button>
                  ) : (
                    <Button className="bg-green-600 hover:bg-green-700">
                      Complete Quiz
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizViewer;
