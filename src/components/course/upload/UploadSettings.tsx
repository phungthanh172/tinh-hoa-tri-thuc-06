
import React from 'react';
import { Label } from '@/components/ui/label';

const UploadSettings = () => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Upload Settings</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="video-quality">Video Quality</Label>
          <select 
            id="video-quality"
            className="w-full mt-1 p-2 border rounded-md"
          >
            <option value="auto">Auto (Recommended)</option>
            <option value="720p">720p HD</option>
            <option value="1080p">1080p Full HD</option>
            <option value="4k">4K Ultra HD</option>
          </select>
        </div>
        <div>
          <Label htmlFor="auto-captions">Auto-generate Captions</Label>
          <select 
            id="auto-captions"
            className="w-full mt-1 p-2 border rounded-md"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UploadSettings;
