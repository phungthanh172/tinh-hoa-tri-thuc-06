
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Upload, Video } from 'lucide-react';

interface SettingsMetadataStepProps {
  courseData: any;
  setCourseData: (data: any) => void;
  isEditing: boolean;
}

const SettingsMetadataStep = ({ courseData, setCourseData }: SettingsMetadataStepProps) => {
  const handleInputChange = (field: string, value: string | number | boolean) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File) => {
    setCourseData(prev => ({ ...prev, [field]: file }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings & Metadata</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Pricing Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Pricing & Currency</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Course Price</Label>
              <Input
                id="price"
                type="number"
                value={courseData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select value={courseData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="discount-enabled" />
            <Label htmlFor="discount-enabled">Enable promotional pricing</Label>
          </div>
        </div>

        {/* Course Media */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Course Media</h3>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Course Thumbnail */}
            <div>
              <Label>Course Thumbnail</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload course thumbnail</p>
                <p className="text-xs text-gray-500 mb-2">Recommended: 1280x720px, JPG/PNG</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('thumbnail', e.target.files[0])}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <Label htmlFor="thumbnail-upload">
                  <Button variant="outline" size="sm" asChild>
                    <span>Choose Image</span>
                  </Button>
                </Label>
                {courseData.thumbnail && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {courseData.thumbnail.name}
                  </p>
                )}
              </div>
            </div>

            {/* Promotional Video */}
            <div>
              <Label>Promotional Video</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload promotional video</p>
                <p className="text-xs text-gray-500 mb-2">Max 2 minutes, MP4 format</p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('promotionalVideo', e.target.files[0])}
                  className="hidden"
                  id="promo-video-upload"
                />
                <Label htmlFor="promo-video-upload">
                  <Button variant="outline" size="sm" asChild>
                    <span>Choose Video</span>
                  </Button>
                </Label>
                {courseData.promotionalVideo && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {courseData.promotionalVideo.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Language & Accessibility */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Language & Accessibility</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primary-language">Primary Language</Label>
              <Select value={courseData.language} onValueChange={(value) => handleInputChange('language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="Italian">Italian</SelectItem>
                  <SelectItem value="Portuguese">Portuguese</SelectItem>
                  <SelectItem value="Chinese">Chinese</SelectItem>
                  <SelectItem value="Japanese">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="caption-language">Caption Language</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Auto-generate captions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-generate</SelectItem>
                  <SelectItem value="manual">Manual upload</SelectItem>
                  <SelectItem value="none">No captions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Switch id="closed-captions" />
              <Label htmlFor="closed-captions">Enable closed captions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="transcript" />
              <Label htmlFor="transcript">Auto-generate transcripts</Label>
            </div>
          </div>
        </div>

        {/* SEO & Discovery */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">SEO & Course Discovery</h3>
          
          <div>
            <Label htmlFor="seo-title">SEO Title</Label>
            <Input
              id="seo-title"
              value={courseData.title}
              onChange={(e) => handleInputChange('seoTitle', e.target.value)}
              placeholder="Optimized title for search engines"
            />
            <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
          </div>

          <div>
            <Label htmlFor="meta-description">Meta Description</Label>
            <Textarea
              id="meta-description"
              value={courseData.description}
              onChange={(e) => handleInputChange('metaDescription', e.target.value)}
              placeholder="Brief description for search results"
              className="min-h-[80px]"
            />
            <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
          </div>

          <div>
            <Label htmlFor="keywords">Keywords & Tags</Label>
            <Input
              id="keywords"
              value={courseData.keywords}
              onChange={(e) => handleInputChange('keywords', e.target.value)}
              placeholder="Separate keywords with commas"
            />
            <p className="text-xs text-gray-500 mt-1">Help students find your course</p>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Advanced Settings</h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Switch id="downloadable-resources" />
              <Label htmlFor="downloadable-resources">Allow resource downloads</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="discussion-enabled" />
              <Label htmlFor="discussion-enabled">Enable Q&A discussions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="certificate-enabled" />
              <Label htmlFor="certificate-enabled">Issue completion certificates</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="mobile-optimized" />
              <Label htmlFor="mobile-optimized">Mobile-optimized content</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsMetadataStep;
