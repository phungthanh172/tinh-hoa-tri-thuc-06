
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import CourseBasicsStep from './wizard/CourseBasicsStep';
import CurriculumStep from './wizard/CurriculumStep';
import ContentUploadStep from './wizard/ContentUploadStep';
import QuizAssignmentStep from './wizard/QuizAssignmentStep';
import SettingsMetadataStep from './wizard/SettingsMetadataStep';
import PreviewPublishStep from './wizard/PreviewPublishStep';

interface CourseCreationWizardProps {
  courseData: any;
  setCourseData: (data: any) => void;
  isEditing: boolean;
}

const CourseCreationWizard = ({ courseData, setCourseData, isEditing }: CourseCreationWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Course Basics', component: CourseBasicsStep },
    { title: 'Curriculum', component: CurriculumStep },
    { title: 'Content Upload', component: ContentUploadStep },
    { title: 'Quizzes & Assignments', component: QuizAssignmentStep },
    { title: 'Settings & Metadata', component: SettingsMetadataStep },
    { title: 'Preview & Publish', component: PreviewPublishStep }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
              </h2>
              <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
            
            {/* Step Navigation */}
            <div className="flex justify-center space-x-2 mt-4">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    index === currentStep
                      ? 'bg-purple-600 text-white'
                      : index < currentStep
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Step Content */}
      <CurrentStepComponent
        courseData={courseData}
        setCourseData={setCourseData}
        isEditing={isEditing}
      />

      {/* Navigation Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseCreationWizard;
