import React, { useState } from 'react';
import { Folder, FolderOpen, Edit2, Plus, ChevronDown, ChevronRight, Copy, Trash2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
  onDuplicateNote: (noteId: string) => void;
  onReorderNotes: (folderPath: string, sourceIndex: number, targetIndex: number) => void;
  onDeleteFolder: (folderPath: string) => void;
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
  onDuplicateNote,
  onReorderNotes,
  onDeleteFolder,
  allFolders
}: DroppableFolderProps) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newFolderName, setNewFolderName] = useState(folder);
  const [dragOver, setDragOver] = useState(false);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragOver = (e: React.DragEvent, index?: number) => {
    e.preventDefault();
    setDragOver(true);
    if (index !== undefined) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOver(false);
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault();
    setDragOver(false);
    setDragOverIndex(null);
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      if (data.type === 'note') {
        const sourceNote = notes.find(note => note.id === data.noteId);
        if (sourceNote && sourceNote.path.includes(folder)) {
          // Reordering within the same folder
          if (targetIndex !== undefined) {
            const sourceIndex = sortedNotes.findIndex(note => note.id === data.noteId);
            if (sourceIndex !== -1 && sourceIndex !== targetIndex) {
              onReorderNotes(folder, sourceIndex, targetIndex);
              toast.success('Note reordered');
            }
          }
        } else {
          // Moving to different folder
          onMoveNote(data.noteId, folder);
          toast.success(`Moved "${data.title}" to ${folder}`);
        }
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

  const handleDeleteFolder = () => {
    if (window.confirm(`Are you sure you want to delete the folder "${folder}" and all its notes?`)) {
      onDeleteFolder(folder);
      toast.success('Folder deleted');
    }
  };

  const handleDuplicateFolder = () => {
    notes.forEach(note => {
      onDuplicateNote(note.id);
    });
    toast.success('Folder duplicated');
  };

  // Sort notes by index instead of title
  const sortedNotes = [...notes].sort((a, b) => a.index - b.index);

  // Filter available folders for moving, including Root option
  const availableFolders = ['Root', ...allFolders.filter(f => f !== folder)];

  return (
    <div className="mb-4">
      {folder !== 'Root' && (
        <div
          className={`flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 border-b transition-colors group ${
            dragOver ? 'bg-blue-50 border-blue-200' : ''
          }`}
          onDragOver={(e) => handleDragOver(e)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e)}
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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsRenaming(true)}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Rename Folder
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDuplicateFolder}>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate Folder
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleDeleteFolder}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Folder
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
          
          {sortedNotes.map((note, index) => (
            <div
              key={note.id}
              className={`${dragOverIndex === index ? 'border-t-2 border-blue-500' : ''}`}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
            >
              <DraggableNote
                note={note}
                isSelected={selectedNoteId === note.id}
                onSelect={onSelectNote}
                onDelete={onDeleteNote}
                onRename={onRenameNote}
                onMoveToFolder={onMoveNote}
                onDuplicate={onDuplicateNote}
                folders={availableFolders}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DroppableFolder;
