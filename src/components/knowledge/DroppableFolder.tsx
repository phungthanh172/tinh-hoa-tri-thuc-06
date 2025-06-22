
import React, { useState } from 'react';
import { Folder, FolderOpen, Edit2, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Note } from '@/types/note';
import { toast } from 'sonner';
import DraggableNote from './DraggableNote';

interface DroppableFolderProps {
  folder: string;
  notes: Note[];
  selectedNoteId?: string;
  isExpanded: boolean;
  onToggleExpanded: (folder: string) => void;
  onSelectNote: (noteId: string) => void;
  onDeleteNote: (noteId: string) => void;
  onRenameNote: (noteId: string, newTitle: string) => void;
  onRenameFolder: (oldPath: string, newPath: string) => void;
  onMoveNote: (noteId: string, targetFolder: string) => void;
  onCreateNote: (folderPath: string) => void;
  allFolders: string[];
}

const DroppableFolder = ({
  folder,
  notes,
  selectedNoteId,
  isExpanded,
  onToggleExpanded,
  onSelectNote,
  onDeleteNote,
  onRenameNote,
  onRenameFolder,
  onMoveNote,
  onCreateNote,
  allFolders
}: DroppableFolderProps) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newFolderName, setNewFolderName] = useState(folder);
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      if (data.type === 'note') {
        onMoveNote(data.noteId, folder);
        toast.success(`Moved "${data.title}" to ${folder}`);
      }
    } catch (error) {
      console.error('Failed to parse drag data:', error);
    }
  };

  const handleRenameFolder = () => {
    if (newFolderName.trim() && newFolderName !== folder) {
      onRenameFolder(folder, newFolderName.trim());
      toast.success('Folder renamed');
    }
    setIsRenaming(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRenameFolder();
    } else if (e.key === 'Escape') {
      setNewFolderName(folder);
      setIsRenaming(false);
    }
  };

  // Sort notes by title
  const sortedNotes = [...notes].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="mb-4">
      {folder !== 'Root' && (
        <div
          className={`flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 border-b transition-colors ${
            dragOver ? 'bg-blue-50 border-blue-200' : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex items-center space-x-2 flex-1">
            <button
              onClick={() => onToggleExpanded(folder)}
              className="flex items-center space-x-1"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              {isExpanded ? (
                <FolderOpen className="w-4 h-4" />
              ) : (
                <Folder className="w-4 h-4" />
              )}
            </button>
            
            {isRenaming ? (
              <Input
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onBlur={handleRenameFolder}
                onKeyDown={handleKeyPress}
                className="text-sm h-6 p-1 flex-1"
                autoFocus
              />
            ) : (
              <span className="flex-1">{folder} ({notes.length})</span>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCreateNote(folder)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Plus className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsRenaming(true)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      )}
      
      {(folder === 'Root' || isExpanded) && (
        <div className="space-y-1 p-2 group">
          {folder === 'Root' && (
            <div className="flex justify-end mb-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCreateNote('Root')}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Plus className="w-3 h-3 mr-1" />
                New Note
              </Button>
            </div>
          )}
          
          {sortedNotes.map((note) => (
            <DraggableNote
              key={note.id}
              note={note}
              isSelected={selectedNoteId === note.id}
              onSelect={onSelectNote}
              onDelete={onDeleteNote}
              onRename={onRenameNote}
              onMoveToFolder={onMoveNote}
              folders={allFolders.filter(f => f !== folder)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DroppableFolder;
