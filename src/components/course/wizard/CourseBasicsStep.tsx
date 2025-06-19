import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

interface CourseBasicsStepProps {
  courseData: any;
  setCourseData: (data: any) => void;
  isEditing: boolean;
  onSwitchToTab?: (tabName: string) => void;
}

const CourseBasicsStep = ({ courseData, setCourseData }: CourseBasicsStepProps) => {
  const handleInputChange = (field: string, value: string) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const addLearningObjective = () => {
    setCourseData(prev => ({
      ...prev,
      learningObjectives: [...prev.learningObjectives, '']
    }));
  };

  const updateLearningObjective = (index: number, value: string) => {
    setCourseData(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives.map((obj, i) => 
        i === index ? value : obj
      )
    }));
  };

  const removeLearningObjective = (index: number) => {
    setCourseData(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter((_, i) => i !== index)
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Information & Learning Objectives</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Course Title *</Label>
              <Input
                id="title"
                value={courseData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter an engaging course title"
              />
            </div>

            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={courseData.subtitle}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                placeholder="Brief description for search results"
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={courseData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="photography">Photography</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="level">Level *</Label>
              <Select value={courseData.level} onValueChange={(value) => handleInputChange('level', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="all-levels">All Levels</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Textarea
                id="targetAudience"
                value={courseData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                placeholder="Who is this course for? (e.g., beginners, professionals, students)"
                className="min-h-[80px]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Course Description *</Label>
              <Textarea
                id="description"
                value={courseData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what students will learn and why they should take this course..."
                className="min-h-[120px]"
              />
            </div>

            <div>
              <Label htmlFor="prerequisites">Prerequisites</Label>
              <Textarea
                id="prerequisites"
                value={courseData.prerequisites}
                onChange={(e) => handleInputChange('prerequisites', e.target.value)}
                placeholder="What should students know before taking this course?"
                className="min-h-[80px]"
              />
            </div>

            <div>
              <Label htmlFor="keywords">SEO Keywords</Label>
              <Input
                id="keywords"
                value={courseData.keywords}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
                placeholder="Separate keywords with commas"
              />
            </div>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Learning Objectives *</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addLearningObjective}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Objective
            </Button>
          </div>
          
          <div className="space-y-3">
            {courseData.learningObjectives.map((objective, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={objective}
                  onChange={(e) => updateLearningObjective(index, e.target.value)}
                  placeholder="What will students be able to do after completing this course?"
                />
                {courseData.learningObjectives.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeLearningObjective(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseBasicsStep;
