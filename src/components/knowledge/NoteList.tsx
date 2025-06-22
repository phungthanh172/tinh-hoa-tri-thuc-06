
import React, { useState } from 'react';
import { FileText, Plus, FolderPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Note } from '@/types/note';
import { toast } from 'sonner';
import DroppableFolder from './DroppableFolder';

interface NoteListProps {
  notes: Note[];
  selectedNoteId?: string;
  onSelectNote: (noteId: string) => void;
  onDeleteNote: (noteId: string) => void;
  onRenameNote: (noteId: string, newTitle: string) => void;
  onRenameFolder: (oldPath: string, newPath: string) => void;
  onMoveNote: (noteId: string, targetFolder: string) => void;
  onCreateNote: (folderPath?: string) => void;
  onDuplicateNote: (noteId: string) => void;
  onReorderNotes: (folderPath: string, sourceIndex: number, targetIndex: number) => void;
  onCreateFolder: (folderName: string) => void;
  onDeleteFolder: (folderPath: string) => void;
}

const NoteList = ({ 
  notes, 
  selectedNoteId, 
  onSelectNote, 
  onDeleteNote,
  onRenameNote,
  onRenameFolder,
  onMoveNote,
  onCreateNote,
  onDuplicateNote,
  onReorderNotes,
  onCreateFolder,
  onDeleteFolder
}: NoteListProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['Root']));
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const toggleFolder = (folder: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folder)) {
      newExpanded.delete(folder);
    } else {
      newExpanded.add(folder);
    }
    setExpandedFolders(newExpanded);
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName.trim());
      setNewFolderName('');
      setIsCreatingFolder(false);
      toast.success('Folder created');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateFolder();
    } else if (e.key === 'Escape') {
      setNewFolderName('');
      setIsCreatingFolder(false);
    }
  };

  // Group notes by folder
  const notesByFolder = notes.reduce((acc, note) => {
    const folder = note.path.includes('/') ? note.path.split('/').slice(0, -1).join('/') : 'Root';
    if (!acc[folder]) acc[folder] = [];
    acc[folder].push(note);
    return acc;
  }, {} as Record<string, Note[]>);

  const allFolders = Object.keys(notesByFolder);

  return (
    <div className="h-full overflow-y-auto">
      {/* Create Folder Section */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center space-x-2">
          {isCreatingFolder ? (
            <div className="flex-1 flex items-center space-x-2">
              <Input
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onBlur={handleCreateFolder}
                onKeyDown={handleKeyPress}
                placeholder="Folder name..."
                className="text-sm"
                autoFocus
              />
              <Button size="sm" onClick={handleCreateFolder}>
                Create
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCreatingFolder(true)}
              className="w-full"
            >
              <FolderPlus className="w-4 h-4 mr-2" />
              Create Folder
            </Button>
          )}
        </div>
      </div>

      {Object.entries(notesByFolder).map(([folder, folderNotes]) => (
        <DroppableFolder
          key={folder}
          folder={folder}
          notes={folderNotes}
          selectedNoteId={selectedNoteId}
          isExpanded={expandedFolders.has(folder)}
          onToggleExpanded={toggleFolder}
          onSelectNote={onSelectNote}
          onDeleteNote={onDeleteNote}
          onRenameNote={onRenameNote}
          onRenameFolder={onRenameFolder}
          onMoveNote={onMoveNote}
          onCreateNote={onCreateNote}
          onDuplicateNote={onDuplicateNote}
          onReorderNotes={onReorderNotes}
          onDeleteFolder={onDeleteFolder}
          allFolders={allFolders}
        />
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
