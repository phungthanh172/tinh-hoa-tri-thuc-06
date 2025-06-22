
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { Note } from '@/types/note';
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
}

const NoteList = ({ 
  notes, 
  selectedNoteId, 
  onSelectNote, 
  onDeleteNote,
  onRenameNote,
  onRenameFolder,
  onMoveNote,
  onCreateNote
}: NoteListProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['Root']));

  const toggleFolder = (folder: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folder)) {
      newExpanded.delete(folder);
    } else {
      newExpanded.add(folder);
    }
    setExpandedFolders(newExpanded);
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
