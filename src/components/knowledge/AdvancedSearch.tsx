
import React from 'react';
import { Search, Calendar, Hash, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useNotes } from '@/hooks/useNotes';
import { getAllTags, getAllFolders } from '@/utils/noteUtils';

const AdvancedSearch = () => {
  const { notes, advancedFilters, setAdvancedFilters } = useNotes();
  
  const allTags = getAllTags(notes);
  const allFolders = getAllFolders(notes);

  const handleFilterChange = (key: keyof typeof advancedFilters, value: any) => {
    setAdvancedFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const addTag = (tag: string) => {
    if (!advancedFilters.tags.includes(tag)) {
      handleFilterChange('tags', [...advancedFilters.tags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    handleFilterChange('tags', advancedFilters.tags.filter(t => t !== tag));
  };

  const addFolder = (folder: string) => {
    if (!advancedFilters.folders.includes(folder)) {
      handleFilterChange('folders', [...advancedFilters.folders, folder]);
    }
  };

  const removeFolder = (folder: string) => {
    handleFilterChange('folders', advancedFilters.folders.filter(f => f !== folder));
  };

  const clearAllFilters = () => {
    setAdvancedFilters({
      contentType: 'all',
      dateRange: 'all',
      tags: [],
      folders: []
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Advanced Search</h3>
        <Button variant="outline" size="sm" onClick={clearAllFilters}>
          Clear All
        </Button>
      </div>

      {/* Content Type Filter */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Search In</Label>
        <Select
          value={advancedFilters.contentType}
          onValueChange={(value) => handleFilterChange('contentType', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Content</SelectItem>
            <SelectItem value="title">Title Only</SelectItem>
            <SelectItem value="content">Content Only</SelectItem>
            <SelectItem value="path">Path Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Date Range Filter */}
      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          Date Range
        </Label>
        <Select
          value={advancedFilters.dateRange}
          onValueChange={(value) => handleFilterChange('dateRange', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tags Filter */}
      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center">
          <Hash className="w-4 h-4 mr-1" />
          Tags
        </Label>
        
        {advancedFilters.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {advancedFilters.tags.map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => removeTag(tag)}
              >
                #{tag} ×
              </Badge>
            ))}
          </div>
        )}

        <div className="space-y-1 max-h-32 overflow-y-auto">
          {allTags.map(tag => (
            <Button
              key={tag}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => addTag(tag)}
              disabled={advancedFilters.tags.includes(tag)}
            >
              #{tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Folders Filter */}
      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center">
          <Folder className="w-4 h-4 mr-1" />
          Folders
        </Label>
        
        {advancedFilters.folders.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {advancedFilters.folders.map(folder => (
              <Badge
                key={folder}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => removeFolder(folder)}
              >
                {folder} ×
              </Badge>
            ))}
          </div>
        )}

        <div className="space-y-1 max-h-32 overflow-y-auto">
          {allFolders.map(folder => (
            <Button
              key={folder}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => addFolder(folder)}
              disabled={advancedFilters.folders.includes(folder)}
            >
              <Folder className="w-3 h-3 mr-1" />
              {folder}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
