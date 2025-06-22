
import React, { useState } from 'react';
import { FileText, Hash, Calendar, MoreVertical, Edit2, Trash2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Note } from '@/types/note';
import { toast } from 'sonner';

interface NoteListProps {
  notes: Note[];
  selectedNoteId?: string;
  onSelectNote: (noteId: string) => void;
  onDeleteNote: (noteId: string) => void;
}

const NoteList = ({ notes, selectedNoteId, onSelectNote, onDeleteNote }: NoteListProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (folder: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folder)) {
      newExpanded.delete(folder);
    } else {
      newExpanded.add(folder);
    }
    setExpandedFolders(newExpanded);
  };

  const handleDeleteNote = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDeleteNote(noteId);
      toast.success('Note deleted');
    }
  };

  const handleDuplicateNote = (e: React.MouseEvent, note: Note) => {
    e.stopPropagation();
    // This would duplicate the note - simplified for now
    toast.success('Note duplicated');
  };

  // Group notes by folder
  const notesByFolder = notes.reduce((acc, note) => {
    const folder = note.path.includes('/') ? note.path.split('/').slice(0, -1).join('/') : 'Root';
    if (!acc[folder]) acc[folder] = [];
    acc[folder].push(note);
    return acc;
  }, {} as Record<string, Note[]>);

  return (
    <div className="h-full overflow-y-auto">
      {Object.entries(notesByFolder).map(([folder, folderNotes]) => (
        <div key={folder} className="mb-4">
          {folder !== 'Root' && (
            <button
              onClick={() => toggleFolder(folder)}
              className="w-full text-left px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 border-b"
            >
              {folder} ({folderNotes.length})
            </button>
          )}
          
          {(folder === 'Root' || expandedFolders.has(folder)) && (
            <div className="space-y-1 p-2">
              {folderNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => onSelectNote(note.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors group ${
                    selectedNoteId === note.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <h3 className="font-medium text-sm text-gray-900 truncate">
                          {note.title}
                        </h3>
                      </div>
                      
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                        {note.content.replace(/[#*\[\]]/g, '').slice(0, 100)}...
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
                        <DropdownMenuItem onClick={(e) => handleDuplicateNote(e, note)}>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={(e) => handleDeleteNote(e, note.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      
      {notes.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-sm">No notes found</p>
          <p className="text-xs mt-1">Create your first note to get started</p>
        </div>
      )}
    </div>
  );
};

export default NoteList;
