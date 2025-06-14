
import React from 'react';
import { Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface CourseData {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: string;
  language: string;
  price: string;
  thumbnail: File | null;
}

interface CourseBasicsFormProps {
  courseData: CourseData;
  onInputChange: (field: string, value: string) => void;
  onFileUpload: (file: File) => void;
}

const CourseBasicsForm = ({ courseData, onInputChange, onFileUpload }: CourseBasicsFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={courseData.title}
                onChange={(e) => onInputChange('title', e.target.value)}
                placeholder="Enter course title"
              />
            </div>

            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={courseData.subtitle}
                onChange={(e) => onInputChange('subtitle', e.target.value)}
                placeholder="Enter course subtitle"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={courseData.category} onValueChange={(value) => onInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="level">Level</Label>
              <Select value={courseData.level} onValueChange={(value) => onInputChange('level', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                value={courseData.price}
                onChange={(e) => onInputChange('price', e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Course Description</Label>
              <Textarea
                id="description"
                value={courseData.description}
                onChange={(e) => onInputChange('description', e.target.value)}
                placeholder="Describe what students will learn..."
                className="min-h-[200px]"
              />
            </div>

            <div>
              <Label>Course Thumbnail</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload course thumbnail</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && onFileUpload(e.target.files[0])}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <Label htmlFor="thumbnail-upload">
                  <Button variant="outline" size="sm" asChild>
                    <span>Choose File</span>
                  </Button>
                </Label>
                {courseData.thumbnail && (
                  <p className="text-sm text-green-600 mt-2">
                    File selected: {courseData.thumbnail.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseBasicsForm;
