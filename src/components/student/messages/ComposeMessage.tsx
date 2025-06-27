
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ComposeMessage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Message</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">To (Instructor)</label>
          <select className="w-full p-2 border rounded-md">
            <option>Select an instructor...</option>
            <option>Jonas Schmedtmann</option>
            <option>Maximilian Schwarzmüller</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Subject</label>
          <Input placeholder="Enter message subject..." />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <Textarea 
            placeholder="Type your message here..."
            className="min-h-[200px]"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline">Save Draft</Button>
          <Button>Send Message</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComposeMessage;
