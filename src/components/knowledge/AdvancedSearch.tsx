
import React, { useState, useMemo } from 'react';
import { Search, Calendar, Hash, Folder, FileText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useNotes } from '@/hooks/useNotes';
import { getAllTags, getAllFolders, searchNotes } from '@/utils/noteUtils';

const AdvancedSearch = () => {
  const { notes, advancedFilters, setAdvancedFilters } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  
  const allTags = getAllTags(notes);
  const allFolders = getAllFolders(notes);

  // Filter notes based on search query and advanced filters
  const filteredResults = useMemo(() => {
    if (!searchQuery && 
        advancedFilters.contentType === 'all' && 
        advancedFilters.dateRange === 'all' && 
        advancedFilters.tags.length === 0 && 
        advancedFilters.folders.length === 0) {
      return [];
    }
    
    return searchNotes(notes, searchQuery, advancedFilters);
  }, [notes, searchQuery, advancedFilters]);

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
    setSearchQuery('');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 space-y-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Advanced Search</h3>
          <Button variant="outline" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        </div>

        {/* Search Input */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center">
            <Search className="w-4 h-4 mr-1" />
            Search Query
          </Label>
          <Input
            placeholder="Enter search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
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

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto">
        {filteredResults.length > 0 ? (
          <div className="p-4">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700">
                Search Results ({filteredResults.length})
              </h4>
            </div>
            <div className="space-y-3">
              {filteredResults.map(note => (
                <div
                  key={note.id}
                  className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => {
                    // This will be handled by the parent component
                    window.dispatchEvent(new CustomEvent('selectNote', { detail: note.id }));
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <FileText className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-sm text-gray-900 truncate">
                        {note.title}
                      </h5>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {note.content.replace(/<[^>]*>/g, '').slice(0, 100)}...
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{note.updatedAt.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Folder className="w-3 h-3" />
                          <span>{note.path}</span>
                        </div>
                        {note.tags.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <Hash className="w-3 h-3" />
                            <span>{note.tags.length} tags</span>
                          </div>
                        )}
                      </div>
                      {note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {note.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                              #{tag}
                            </Badge>
                          ))}
                          {note.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs px-1 py-0">
                              +{note.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <div>
              {searchQuery || advancedFilters.tags.length > 0 || advancedFilters.folders.length > 0 || 
               advancedFilters.contentType !== 'all' || advancedFilters.dateRange !== 'all' ? (
                <>
                  <p className="text-sm">No results found</p>
                  <p className="text-xs mt-1">Try adjusting your search criteria</p>
                </>
              ) : (
                <>
                  <p className="text-sm">Enter search criteria</p>
                  <p className="text-xs mt-1">Use the filters above to search your notes</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch;
