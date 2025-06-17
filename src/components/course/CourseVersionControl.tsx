
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  GitBranch, 
  Clock, 
  User, 
  RotateCcw, 
  Save, 
  Download,
  Upload,
  Eye,
  MessageSquare
} from 'lucide-react';

interface Version {
  id: string;
  version: string;
  timestamp: Date;
  author: string;
  description: string;
  changes: string[];
  status: 'draft' | 'published' | 'archived';
  size: string;
}

interface CourseVersionControlProps {
  courseId: string;
  courseName: string;
}

const CourseVersionControl = ({ courseId, courseName }: CourseVersionControlProps) => {
  const [versions, setVersions] = useState<Version[]>([
    {
      id: '1',
      version: '2.1.0',
      timestamp: new Date('2024-01-15'),
      author: 'John Smith',
      description: 'Added new quiz section and updated video quality',
      changes: [
        'Added 5 new quiz questions to Section 3',
        'Upgraded video resolution to 4K',
        'Fixed typos in lecture notes',
        'Updated course prerequisites'
      ],
      status: 'published',
      size: '2.4 GB'
    },
    {
      id: '2',
      version: '2.0.5',
      timestamp: new Date('2024-01-10'),
      author: 'John Smith',
      description: 'Bug fixes and minor improvements',
      changes: [
        'Fixed broken download links',
        'Updated assignment instructions',
        'Improved audio quality in Lecture 7'
      ],
      status: 'published',
      size: '2.2 GB'
    },
    {
      id: '3',
      version: '2.0.0',
      timestamp: new Date('2024-01-01'),
      author: 'John Smith',
      description: 'Major update with new content structure',
      changes: [
        'Restructured course into 8 sections',
        'Added 12 new lectures',
        'Introduced hands-on projects',
        'Updated all course materials'
      ],
      status: 'archived',
      size: '2.0 GB'
    }
  ]);

  const [newVersionData, setNewVersionData] = useState({
    description: '',
    changes: ['']
  });

  const [isCreatingVersion, setIsCreatingVersion] = useState(false);

  const createNewVersion = () => {
    const newVersion: Version = {
      id: Date.now().toString(),
      version: getNextVersion(),
      timestamp: new Date(),
      author: 'Current User',
      description: newVersionData.description,
      changes: newVersionData.changes.filter(change => change.trim() !== ''),
      status: 'draft',
      size: '2.5 GB'
    };

    setVersions([newVersion, ...versions]);
    setNewVersionData({ description: '', changes: [''] });
    setIsCreatingVersion(false);
  };

  const getNextVersion = () => {
    const latestVersion = versions[0]?.version || '2.0.0';
    const parts = latestVersion.split('.').map(Number);
    parts[2] += 1;
    return parts.join('.');
  };

  const revertToVersion = (versionId: string) => {
    console.log('Reverting to version:', versionId);
    // In a real app, this would restore the course to that version
  };

  const addChangeItem = () => {
    setNewVersionData({
      ...newVersionData,
      changes: [...newVersionData.changes, '']
    });
  };

  const updateChangeItem = (index: number, value: string) => {
    const newChanges = [...newVersionData.changes];
    newChanges[index] = value;
    setNewVersionData({
      ...newVersionData,
      changes: newChanges
    });
  };

  const removeChangeItem = (index: number) => {
    setNewVersionData({
      ...newVersionData,
      changes: newVersionData.changes.filter((_, i) => i !== index)
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{courseName} - Version History</h2>
          <p className="text-gray-600">Track and manage course versions</p>
        </div>
        <Button onClick={() => setIsCreatingVersion(true)}>
          <Save className="w-4 h-4 mr-2" />
          Create New Version
        </Button>
      </div>

      {/* Create New Version Form */}
      {isCreatingVersion && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Version</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Version Description
              </label>
              <Textarea
                value={newVersionData.description}
                onChange={(e) => setNewVersionData({
                  ...newVersionData,
                  description: e.target.value
                })}
                placeholder="Describe what changed in this version..."
                className="min-h-[80px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Changes Made
              </label>
              {newVersionData.changes.map((change, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={change}
                    onChange={(e) => updateChangeItem(index, e.target.value)}
                    placeholder="Describe a specific change..."
                  />
                  {newVersionData.changes.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeChangeItem(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addChangeItem}
              >
                Add Change
              </Button>
            </div>

            <div className="flex gap-2">
              <Button onClick={createNewVersion}>
                <Save className="w-4 h-4 mr-2" />
                Create Version
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsCreatingVersion(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Version List */}
      <div className="space-y-4">
        {versions.map((version, index) => (
          <Card key={version.id} className={index === 0 ? 'border-purple-500 border-2' : ''}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-lg">v{version.version}</span>
                    </div>
                    <Badge className={getStatusColor(version.status)}>
                      {version.status}
                    </Badge>
                    {index === 0 && (
                      <Badge variant="outline" className="text-purple-600">
                        Current
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-700 mb-3">{version.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {version.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDate(version.timestamp)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {version.size}
                    </div>
                  </div>

                  {/* Changes */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-800">Changes:</h4>
                    <ul className="space-y-1">
                      {version.changes.map((change, changeIndex) => (
                        <li key={changeIndex} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-6">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                  {index !== 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => revertToVersion(version.id)}
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Revert
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Notes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import Version
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export All Versions
            </Button>
            <Button variant="outline">
              <GitBranch className="w-4 h-4 mr-2" />
              Compare Versions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseVersionControl;
