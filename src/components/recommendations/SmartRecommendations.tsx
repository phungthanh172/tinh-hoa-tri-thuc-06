
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Star, Users, Clock, Target, Sparkles, TrendingUp } from 'lucide-react';
import { sampleCourses } from '@/data/sampleData';

interface AssessmentQuestion {
  id: string;
  question: string;
  options: Array<{
    value: string;
    label: string;
    weight: Record<string, number>;
  }>;
}

const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'experience',
    question: 'What\'s your current experience level?',
    options: [
      { value: 'beginner', label: 'Complete Beginner', weight: { beginner: 3, intermediate: 1, advanced: 0 } },
      { value: 'some', label: 'Some Experience', weight: { beginner: 1, intermediate: 3, advanced: 1 } },
      { value: 'experienced', label: 'Experienced', weight: { beginner: 0, intermediate: 1, advanced: 3 } }
    ]
  },
  {
    id: 'goal',
    question: 'What\'s your primary learning goal?',
    options: [
      { value: 'career-change', label: 'Career Change', weight: { comprehensive: 3, practical: 2, quick: 1 } },
      { value: 'skill-upgrade', label: 'Upgrade Current Skills', weight: { comprehensive: 1, practical: 3, quick: 2 } },
      { value: 'hobby', label: 'Personal Interest/Hobby', weight: { comprehensive: 1, practical: 1, quick: 3 } }
    ]
  },
  {
    id: 'timeframe',
    question: 'How much time can you dedicate weekly?',
    options: [
      { value: 'intensive', label: '10+ hours/week', weight: { intensive: 3, moderate: 1, light: 0 } },
      { value: 'moderate', label: '5-10 hours/week', weight: { intensive: 1, moderate: 3, light: 1 } },
      { value: 'light', label: 'Less than 5 hours/week', weight: { intensive: 0, moderate: 1, light: 3 } }
    ]
  }
];

interface SmartRecommendationsProps {
  onRecommendationsReady?: (courses: any[]) => void;
}

const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({ onRecommendationsReady }) => {
  const [showAssessment, setShowAssessment] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);

  useEffect(() => {
    const savedRecommendations = localStorage.getItem('user-recommendations');
    if (savedRecommendations) {
      setRecommendations(JSON.parse(savedRecommendations));
      setHasCompletedAssessment(true);
    }
  }, []);

  const generateRecommendations = (userAnswers: Record<string, string>) => {
    // Simple recommendation algorithm based on user preferences
    const scores: Record<string, number> = {};
    
    // Calculate scores for each course based on user answers
    sampleCourses.forEach(course => {
      let score = 0;
      
      // Experience level matching
      if (userAnswers.experience === 'beginner' && course.level === 'Beginner') score += 3;
      if (userAnswers.experience === 'some' && course.level === 'Intermediate') score += 3;
      if (userAnswers.experience === 'experienced' && course.level === 'Advanced') score += 3;
      
      // Goal-based scoring
      if (userAnswers.goal === 'career-change' && course.price > 100) score += 2; // Premium courses for career change
      if (userAnswers.goal === 'skill-upgrade' && course.rating > 4.5) score += 2; // High-rated courses for skill upgrade
      if (userAnswers.goal === 'hobby' && course.price < 100) score += 2; // Affordable courses for hobbies
      
      // Time commitment scoring
      const courseDuration = parseInt(course.duration.split('h')[0]);
      if (userAnswers.timeframe === 'intensive' && courseDuration > 40) score += 2;
      if (userAnswers.timeframe === 'moderate' && courseDuration >= 20 && courseDuration <= 40) score += 2;
      if (userAnswers.timeframe === 'light' && courseDuration < 20) score += 2;
      
      // Popularity boost
      if (course.studentsCount > 3000) score += 1;
      if (course.rating > 4.7) score += 1;
      
      scores[course.id] = score;
    });
    
    // Sort courses by score and return top 4
    const recommendedCourses = sampleCourses
      .map(course => ({ ...course, score: scores[course.id] }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
    
    return recommendedCourses;
  };

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [assessmentQuestions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Complete assessment
      const recommendedCourses = generateRecommendations(answers);
      setRecommendations(recommendedCourses);
      localStorage.setItem('user-recommendations', JSON.stringify(recommendedCourses));
      setHasCompletedAssessment(true);
      setShowAssessment(false);
      onRecommendationsReady?.(recommendedCourses);
    }
  };

  const startAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowAssessment(true);
  };

  const retakeAssessment = () => {
    localStorage.removeItem('user-recommendations');
    setHasCompletedAssessment(false);
    setRecommendations([]);
    startAssessment();
  };

  if (!hasCompletedAssessment && recommendations.length === 0) {
    return (
      <>
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Get Personalized Course Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Take our quick 30-second assessment to discover courses perfectly tailored to your goals and experience level.
            </p>
            <Button onClick={startAssessment} className="bg-purple-600 hover:bg-purple-700">
              <Target className="w-4 h-4 mr-2" />
              Start Assessment
            </Button>
          </CardContent>
        </Card>

        <Dialog open={showAssessment} onOpenChange={setShowAssessment}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Quick Learning Assessment</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Question {currentQuestion + 1} of {assessmentQuestions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / assessmentQuestions.length) * 100)}%</span>
                </div>
                <Progress value={((currentQuestion + 1) / assessmentQuestions.length) * 100} />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  {assessmentQuestions[currentQuestion].question}
                </h3>
                
                <RadioGroup
                  value={answers[assessmentQuestions[currentQuestion].id] || ''}
                  onValueChange={handleAnswerChange}
                >
                  {assessmentQuestions[currentQuestion].options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Button
                onClick={handleNext}
                disabled={!answers[assessmentQuestions[currentQuestion].id]}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {currentQuestion === assessmentQuestions.length - 1 ? 'Get My Recommendations' : 'Next Question'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Your Personalized Recommendations
            </div>
            <Button variant="outline" size="sm" onClick={retakeAssessment}>
              Retake Assessment
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Based on your assessment, here are the courses we think you'll love:
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((course, index) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow relative">
            {index === 0 && (
              <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-white">
                #1 Pick
              </Badge>
            )}
            <CardHeader className="p-0">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-32 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>
              
              <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{course.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{course.studentsCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{course.duration}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-purple-600">${course.price}</span>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Enroll Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SmartRecommendations;
