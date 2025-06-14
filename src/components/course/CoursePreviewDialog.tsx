
import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, CheckCircle } from 'lucide-react';

interface CoursePreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  courseData: any;
}

const CoursePreviewDialog: React.FC<CoursePreviewDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  courseData
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">Save your course?</AlertDialogTitle>
          <AlertDialogDescription>
            Here's how your course will look to students. Review and save your progress.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-6 py-4">
          {/* Course Preview Content */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{courseData.title || 'Course Title'}</CardTitle>
                  <p className="text-gray-600 mt-1">{courseData.subtitle || 'Course subtitle'}</p>
                </div>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  {courseData.level || 'Beginner'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                {courseData.promotionalVideo ? (
                  <div className="text-center">
                    <Play className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Promotional Video</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Play className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">Course thumbnail preview</p>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-semibold mb-2">What you'll learn:</h4>
                <ul className="space-y-1">
                  {courseData.learningObjectives?.filter(obj => obj.trim()).map((objective, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{objective}</span>
                    </li>
                  )) || (
                    <li className="text-sm text-gray-500">No learning objectives specified</li>
                  )}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Course Description:</h4>
                <p className="text-sm text-gray-700">
                  {courseData.description || 'No description provided'}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">5h 30m total</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-600">12 lectures</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600">
                    ${courseData.price || '0'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-800">
            No, edit your course
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onSave}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CoursePreviewDialog;
