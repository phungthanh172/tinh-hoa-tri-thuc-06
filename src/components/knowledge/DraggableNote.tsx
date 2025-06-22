
import React, { useState } from 'react';
import { FileText, Hash, Calendar, MoreVertical, Edit2, Trash2, Copy, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Note } from '@/types/note';
import { toast } from 'sonner';

interface DraggableNoteProps {
  note: Note;
  isSelected: boolean;
  onSelect: (noteId: string) => void;
  onDelete: (noteId: string) => void;
  onRename: (noteId: string, newTitle: string) => void;
  onMoveToFolder: (noteId: string, folderPath: string) => void;
  onDuplicate: (noteId: string) => void;
  folders: string[];
}

const DraggableNote = ({ 
  note, 
  isSelected, 
  onSelect, 
  onDelete, 
  onRename, 
  onMoveToFolder,
  onDuplicate,
  folders 
}: DraggableNoteProps) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(note.title);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      type: 'note',
      noteId: note.id,
      title: note.title
    }));
  };

  const handleRename = () => {
    if (newTitle.trim() && newTitle !== note.title) {
      onRename(note.id, newTitle.trim());
      toast.success('Note renamed');
    }
    setIsRenaming(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setNewTitle(note.title);
      setIsRenaming(false);
    }
  };

  const handleDeleteNote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDelete(note.id);
      toast.success('Note deleted');
    }
  };

  const handleDuplicateNote = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDuplicate(note.id);
    toast.success('Note duplicated');
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => onSelect(note.id)}
      className={`p-3 rounded-lg cursor-pointer transition-colors group ${
        isSelected
          ? 'bg-blue-50 border border-blue-200'
          : 'hover:bg-gray-50 border border-transparent'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {isRenaming ? (
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={handleRename}
                onKeyDown={handleKeyPress}
                className="text-sm font-medium h-6 p-1"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <h3 className="font-medium text-sm text-gray-900 truncate">
                {note.title}
              </h3>
            )}
          </div>
          
          <p className="text-xs text-gray-600 line-clamp-2 mb-2">
            {note.content.replace(/<[^>]*>/g, '').slice(0, 100)}...
          </p>
          
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{note.updatedAt.toLocaleDateString()}</span>
            </div>
            
            {note.tags.length > 0 && (
              <div className="flex items-center space-x-1">
                <Hash className="w-3 h-3" />
                <span>{note.tags.length}</span>
              </div>
            )}
          </div>
          
          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {note.tags.slice(0, 3).map((tag) => (
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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation();
              setIsRenaming(true);
            }}>
              <Edit2 className="w-4 h-4 mr-2" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDuplicateNote}>
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            {folders.map(folder => (
              <DropdownMenuItem 
                key={folder}
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveToFolder(note.id, folder);
                  toast.success(`Moved to ${folder}`);
                }}
              >
                <FolderOpen className="w-4 h-4 mr-2" />
                Move to {folder}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem 
              onClick={handleDeleteNote}
              className="text-red-600"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DraggableNote;
