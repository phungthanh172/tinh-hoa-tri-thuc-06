
import React from 'react';
import { Trophy, Clock, BookOpen, Award, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProgress } from '@/contexts/ProgressContext';

interface ProgressDashboardProps {
  courseId: string;
  courseName: string;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ courseId, courseName }) => {
  const { getCourseProgress, generateCertificate } = useProgress();
  const courseProgress = getCourseProgress(courseId);

  if (!courseProgress) {
    return <div>No progress data available</div>;
  }

  const completedLectures = courseProgress.lectures.filter(l => l.completed).length;
  const totalLectures = courseProgress.lectures.length;
  const completedQuizzes = courseProgress.quizzes.filter(q => q.completed).length;
  const totalQuizzes = courseProgress.quizzes.length;
  
  const totalWatchTime = courseProgress.lectures.reduce((acc, lecture) => acc + lecture.watchTime, 0);
  const averageQuizScore = courseProgress.quizzes.length > 0
    ? Math.round(courseProgress.quizzes.reduce((acc, quiz) => acc + quiz.score, 0) / courseProgress.quizzes.length)
    : 0;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const handleGenerateCertificate = () => {
    generateCertificate(courseId);
    // In a real app, this would trigger certificate generation and download
    alert('Certificate generated! Download will start shortly.');
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Course Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Completion</span>
                <span className="text-sm text-gray-600">{courseProgress.completionPercentage}%</span>
              </div>
              <Progress value={courseProgress.completionPercentage} className="h-3" />
            </div>

            {courseProgress.completed && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-green-800">
                  <Trophy className="w-5 h-5" />
                  <span className="font-medium">Congratulations! Course Completed</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Completed on {courseProgress.completionDate?.toLocaleDateString()}
                </p>
                {!courseProgress.certificateGenerated && (
                  <Button
                    onClick={handleGenerateCertificate}
                    className="mt-3 bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Generate Certificate
                  </Button>
                )}
                {courseProgress.certificateGenerated && (
                  <Button variant="outline" size="sm" className="mt-3">
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Lectures</p>
                <p className="text-2xl font-bold">{completedLectures}/{totalLectures}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Quizzes</p>
                <p className="text-2xl font-bold">{completedQuizzes}/{totalQuizzes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Watch Time</p>
                <p className="text-2xl font-bold">{formatTime(totalWatchTime)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Avg Quiz Score</p>
                <p className="text-2xl font-bold">{averageQuizScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lecture Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Lecture Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {courseProgress.lectures.map((lecture, index) => (
                <div key={lecture.lectureId} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Lecture {index + 1}</span>
                      {lecture.completed && (
                        <Badge variant="secondary" className="text-xs">
                          ✓ Complete
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1">
                      <Progress 
                        value={(lecture.watchTime / lecture.totalDuration) * 100} 
                        className="h-2" 
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formatTime(lecture.watchTime)} / {formatTime(lecture.totalDuration)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quiz Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Quiz Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {courseProgress.quizzes.map((quiz, index) => (
                <div key={quiz.quizId} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Quiz {index + 1}</span>
                      {quiz.completed ? (
                        <Badge className="bg-green-100 text-green-800">
                          {quiz.score}% ✓
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          Not Started
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Attempts: {quiz.attempts}
                      {quiz.lastAttemptDate && (
                        <span className="ml-2">
                          Last: {quiz.lastAttemptDate.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressDashboard;
