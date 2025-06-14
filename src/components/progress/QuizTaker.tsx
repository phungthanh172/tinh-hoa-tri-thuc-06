
import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useProgress } from '@/contexts/ProgressContext';

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false';
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation?: string;
  points: number;
}

interface QuizTakerProps {
  courseId: string;
  quizId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit?: number;
  passingScore: number;
  onComplete?: (score: number, passed: boolean) => void;
}

const QuizTaker: React.FC<QuizTakerProps> = ({
  courseId,
  quizId,
  title,
  description,
  questions,
  timeLimit,
  passingScore,
  onComplete
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(timeLimit ? timeLimit * 60 : null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  
  const { updateQuizProgress, getCourseProgress } = useProgress();
  const courseProgress = getCourseProgress(courseId);
  const quizProgress = courseProgress?.quizzes.find(q => q.quizId === quizId);

  React.useEffect(() => {
    if (timeRemaining === null) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleAnswerChange = (questionId: string, answerId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    let totalPoints = 0;

    questions.forEach(question => {
      totalPoints += question.points;
      const selectedAnswerId = answers[question.id];
      const selectedOption = question.options.find(opt => opt.id === selectedAnswerId);
      
      if (selectedOption?.isCorrect) {
        correctAnswers += question.points;
      }
    });

    return Math.round((correctAnswers / totalPoints) * 100);
  };

  const handleSubmitQuiz = () => {
    const finalScore = calculateScore();
    const passed = finalScore >= passingScore;
    
    setScore(finalScore);
    setIsCompleted(true);
    setShowResults(true);

    const attempts = (quizProgress?.attempts || 0) + 1;
    
    updateQuizProgress(courseId, quizId, {
      completed: passed,
      score: finalScore,
      attempts,
      lastAttemptDate: new Date()
    });

    if (onComplete) {
      onComplete(finalScore, passed);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {score >= passingScore ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600" />
            )}
            <span>Quiz Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{score}%</div>
            <div className="text-lg">
              {score >= passingScore ? (
                <span className="text-green-600">Congratulations! You passed!</span>
              ) : (
                <span className="text-red-600">You need {passingScore}% to pass. Try again!</span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <Progress value={score} className="h-4" />
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-semibold">{questions.filter(q => {
                  const selectedAnswerId = answers[q.id];
                  const selectedOption = q.options.find(opt => opt.id === selectedAnswerId);
                  return selectedOption?.isCorrect;
                }).length}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div>
                <div className="text-2xl font-semibold">{questions.length}</div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Review Answers:</h3>
            {questions.map((question, index) => {
              const selectedAnswerId = answers[question.id];
              const selectedOption = question.options.find(opt => opt.id === selectedAnswerId);
              const correctOption = question.options.find(opt => opt.isCorrect);
              const isCorrect = selectedOption?.isCorrect;

              return (
                <div key={question.id} className="border rounded p-4">
                  <div className="flex items-start space-x-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">Question {index + 1}: {question.question}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Your answer: {selectedOption?.text || 'No answer'}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-600 mt-1">
                          Correct answer: {correctOption?.text}
                        </p>
                      )}
                      {question.explanation && (
                        <p className="text-sm text-gray-700 mt-2 italic">
                          {question.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {score < passingScore && (
            <Button onClick={() => window.location.reload()} className="w-full">
              Retake Quiz
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          {timeRemaining !== null && (
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          )}
        </div>
        <p className="text-gray-600">{description}</p>
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
          
          <RadioGroup
            value={answers[currentQuestion.id] || ''}
            onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          
          {currentQuestionIndex === questions.length - 1 ? (
            <Button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(answers).length !== questions.length}
            >
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              disabled={!answers[currentQuestion.id]}
            >
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizTaker;
