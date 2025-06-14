
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Calendar, Clock, CheckCircle, AlertCircle, Play, Share } from 'lucide-react';

interface PreviewPublishStepProps {
  courseData: any;
  setCourseData: (data: any) => void;
  isEditing: boolean;
}

const PreviewPublishStep = ({ courseData, setCourseData, isEditing }: PreviewPublishStepProps) => {
  const [publishOption, setPublishOption] = useState('immediate');
  const [scheduledDate, setScheduledDate] = useState('');

  const completionChecks = [
    { id: 'title', label: 'Course title', completed: Boolean(courseData.title) },
    { id: 'description', label: 'Course description', completed: Boolean(courseData.description) },
    { id: 'category', label: 'Category selected', completed: Boolean(courseData.category) },
    { id: 'level', label: 'Difficulty level', completed: Boolean(courseData.level) },
    { id: 'objectives', label: 'Learning objectives', completed: courseData.learningObjectives?.some(obj => obj.trim()) },
    { id: 'curriculum', label: 'Curriculum structure', completed: true }, // Would check actual curriculum
    { id: 'content', label: 'Course content uploaded', completed: true }, // Would check actual content
    { id: 'pricing', label: 'Pricing information', completed: Boolean(courseData.price) },
    { id: 'thumbnail', label: 'Course thumbnail', completed: Boolean(courseData.thumbnail) }
  ];

  const completedCount = completionChecks.filter(check => check.completed).length;
  const isReadyToPublish = completedCount === completionChecks.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview & Publish Course</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">Course Preview</TabsTrigger>
            <TabsTrigger value="checklist">Publishing Checklist</TabsTrigger>
            <TabsTrigger value="publish">Publish Options</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-6">
            {/* Course Preview */}
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
                      <Eye className="w-12 h-12 text-gray-400 mx-auto mb-2" />
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
                      <Calendar className="w-4 h-4 text-gray-500" />
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

            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-2" />
                Preview as Student
              </Button>
              <Button variant="outline" className="flex-1">
                <Share className="w-4 h-4 mr-2" />
                Share Preview Link
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="checklist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publishing Readiness</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${(completedCount / completionChecks.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {completedCount}/{completionChecks.length}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {completionChecks.map((check) => (
                    <div key={check.id} className="flex items-center space-x-3">
                      {check.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                      )}
                      <span className={`${check.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>

                {!isReadyToPublish && (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Course Not Ready</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          Please complete all required items before publishing your course.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publish" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publishing Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="save-draft"
                      name="publish-option"
                      value="draft"
                      checked={publishOption === 'draft'}
                      onChange={(e) => setPublishOption(e.target.value)}
                    />
                    <label htmlFor="save-draft" className="flex-1">
                      <div>
                        <p className="font-medium">Save as Draft</p>
                        <p className="text-sm text-gray-600">
                          Continue working on your course without publishing
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="submit-review"
                      name="publish-option"
                      value="review"
                      checked={publishOption === 'review'}
                      onChange={(e) => setPublishOption(e.target.value)}
                    />
                    <label htmlFor="submit-review" className="flex-1">
                      <div>
                        <p className="font-medium">Submit for Review</p>
                        <p className="text-sm text-gray-600">
                          Submit your course for admin approval (2-3 business days)
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="publish-immediately"
                      name="publish-option"
                      value="immediate"
                      checked={publishOption === 'immediate'}
                      onChange={(e) => setPublishOption(e.target.value)}
                      disabled={!isReadyToPublish}
                    />
                    <label htmlFor="publish-immediately" className={`flex-1 ${!isReadyToPublish ? 'opacity-50' : ''}`}>
                      <div>
                        <p className="font-medium">Publish Immediately</p>
                        <p className="text-sm text-gray-600">
                          Make your course live immediately after approval
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="schedule-publish"
                      name="publish-option"
                      value="scheduled"
                      checked={publishOption === 'scheduled'}
                      onChange={(e) => setPublishOption(e.target.value)}
                      disabled={!isReadyToPublish}
                    />
                    <label htmlFor="schedule-publish" className={`flex-1 ${!isReadyToPublish ? 'opacity-50' : ''}`}>
                      <div>
                        <p className="font-medium">Schedule Publishing</p>
                        <p className="text-sm text-gray-600">
                          Set a specific date and time to publish your course
                        </p>
                      </div>
                    </label>
                  </div>

                  {publishOption === 'scheduled' && (
                    <div className="ml-6 mt-3">
                      <label htmlFor="scheduled-date" className="block text-sm font-medium mb-1">
                        Publish Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        id="scheduled-date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t">
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setCourseData(prev => ({ ...prev, isDraft: true }));
                        console.log('Saving draft...');
                      }}
                    >
                      Save Draft
                    </Button>
                    <Button
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                      disabled={publishOption !== 'draft' && !isReadyToPublish}
                      onClick={() => {
                        if (publishOption === 'draft') {
                          setCourseData(prev => ({ ...prev, isDraft: true }));
                          console.log('Saving draft...');
                        } else {
                          setCourseData(prev => ({ ...prev, isDraft: false }));
                          console.log('Publishing course with option:', publishOption);
                        }
                      }}
                    >
                      {publishOption === 'draft' ? 'Save Draft' : 
                       publishOption === 'review' ? 'Submit for Review' :
                       publishOption === 'immediate' ? 'Publish Course' :
                       'Schedule Publishing'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PreviewPublishStep;
