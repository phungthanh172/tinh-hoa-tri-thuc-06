
import { useState, useEffect, useMemo } from 'react';
import { Note, NoteVersion, SearchFilters } from '@/types/note';
import { extractLinks, extractTags, generateId, searchNotes } from '@/utils/noteUtils';

const INITIAL_NOTES: Note[] = [
  {
    id: 'welcome',
    title: 'Welcome to Your Knowledge Base',
    content: `# Welcome to Your Knowledge Base

This is your personal knowledge management system, inspired by tools like Obsidian and Roam Research.

## Features

- **Wiki-style linking**: Use [[Note Title]] to create links between notes
- **Tags**: Use #tag to categorize your notes
- **Graph view**: Visualize connections between your notes
- **Advanced search**: Find notes by content, tags, or date
- **Version history**: Track changes to your notes over time

## Getting Started

1. Create a new note using the "New Note" button
2. Start writing and use [[links]] and #tags
3. Explore the graph view to see connections
4. Use the search to find specific content

## Examples

You can link to [[Personal Projects]] or add tags like #tutorial #knowledge-management

Try editing this note to see how the system works!`,
    path: 'Welcome',
    links: ['Personal Projects'],
    tags: ['tutorial', 'knowledge-management'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    versions: []
  },
  {
    id: 'projects',
    title: 'Personal Projects',
    content: `# Personal Projects

This note contains information about my ongoing projects.

## Current Projects

### Knowledge Base System
- Building a personal knowledge management tool
- Features: linking, tagging, graph visualization
- Status: In progress
- Tags: #project #development #knowledge

### Learning Goals
- Master React and TypeScript
- Learn about graph databases
- Understand information architecture
- Tags: #learning #goals #development

## Ideas for Future Projects

- Mobile app for note-taking
- Integration with external tools
- Collaborative features

## Resources

- [[Welcome to Your Knowledge Base]] - Main documentation
- Research on #knowledge-management systems
- Tools like Obsidian, Roam Research, and Notion

---

*Last updated: ${new Date().toLocaleDateString()}*`,
    path: 'Projects/Personal Projects',
    links: ['Welcome to Your Knowledge Base'],
    tags: ['project', 'development', 'knowledge', 'learning', 'goals', 'knowledge-management'],
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date(),
    versions: []
  }
];

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<SearchFilters>({
    contentType: 'all',
    dateRange: 'all',
    tags: [],
    folders: []
  });

  // Auto-select first note on initial load
  useEffect(() => {
    if (notes.length > 0 && !selectedNote) {
      setSelectedNote(notes[0]);
    }
  }, [notes, selectedNote]);

  const filteredNotes = useMemo(() => {
    if (!searchQuery && !isAdvancedSearch) return notes;
    return searchNotes(notes, searchQuery, isAdvancedSearch ? advancedFilters : undefined);
  }, [notes, searchQuery, isAdvancedSearch, advancedFilters]);

  const createNote = (title: string = 'New Note', content: string = '', folderPath?: string): Note => {
    const notePath = folderPath && folderPath !== 'Root' ? `${folderPath}/${title}` : title;
    const newNote: Note = {
      id: generateId(),
      title,
      content,
      path: notePath,
      links: extractLinks(content),
      tags: extractTags(content),
      createdAt: new Date(),
      updatedAt: new Date(),
      versions: []
    };

    setNotes(prev => [newNote, ...prev]);
    return newNote;
  };

  const updateNote = (noteId: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(note => {
      if (note.id === noteId) {
        const updatedNote = { ...note, ...updates };
        
        // Update links and tags if content changed
        if (updates.content) {
          updatedNote.links = extractLinks(updates.content);
          updatedNote.tags = extractTags(updates.content);
        }
        
        // Create version if content changed significantly
        if (updates.content && updates.content !== note.content) {
          const version: NoteVersion = {
            id: generateId(),
            content: note.content,
            title: note.title,
            timestamp: new Date(note.updatedAt),
            changes: 'Content updated'
          };
          updatedNote.versions = [version, ...note.versions].slice(0, 10); // Keep last 10 versions
        }
        
        updatedNote.updatedAt = new Date();
        
        // Update selected note if it's the one being updated
        if (selectedNote?.id === noteId) {
          setSelectedNote(updatedNote);
        }
        
        return updatedNote;
      }
      return note;
    }));
  };

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(notes.find(note => note.id !== noteId) || null);
    }
  };

  const selectNote = (noteId: string) => {
    const note = notes.find(n => n.id === noteId);
    if (note) {
      setSelectedNote(note);
    }
  };

  const renameNote = (noteId: string, newTitle: string) => {
    const note = notes.find(n => n.id === noteId);
    if (note) {
      const folderPath = note.path.includes('/') ? note.path.split('/').slice(0, -1).join('/') : '';
      const newPath = folderPath ? `${folderPath}/${newTitle}` : newTitle;
      
      updateNote(noteId, { 
        title: newTitle, 
        path: newPath 
      });
    }
  };

  const renameFolder = (oldPath: string, newPath: string) => {
    setNotes(prev => prev.map(note => {
      if (note.path.startsWith(oldPath + '/') || note.path === oldPath) {
        const relativePath = note.path.slice(oldPath.length);
        const newNotePath = newPath + relativePath;
        return { ...note, path: newNotePath };
      }
      return note;
    }));
  };

  const moveNote = (noteId: string, targetFolder: string) => {
    const note = notes.find(n => n.id === noteId);
    if (note) {
      const newPath = targetFolder === 'Root' ? note.title : `${targetFolder}/${note.title}`;
      updateNote(noteId, { path: newPath });
    }
  };

  const createNoteInFolder = (folderPath?: string) => {
    const newNote = createNote('New Note', '# New Note\n\nStart writing your thoughts here...', folderPath);
    selectNote(newNote.id);
  };

  const duplicateNote = (noteId: string) => {
    const note = notes.find(n => n.id === noteId);
    if (note) {
      const folderPath = note.path.includes('/') ? note.path.split('/').slice(0, -1).join('/') : '';
      const duplicatedNote = createNote(
        `${note.title} (Copy)`,
        note.content,
        folderPath || 'Root'
      );
      selectNote(duplicatedNote.id);
    }
  };

  const reorderNotes = (folderPath: string, sourceIndex: number, targetIndex: number) => {
    setNotes(prev => {
      const folderNotes = prev.filter(note => {
        const noteFolder = note.path.includes('/') ? note.path.split('/').slice(0, -1).join('/') : 'Root';
        return noteFolder === folderPath;
      });
      
      const otherNotes = prev.filter(note => {
        const noteFolder = note.path.includes('/') ? note.path.split('/').slice(0, -1).join('/') : 'Root';
        return noteFolder !== folderPath;
      });

      // Reorder the folder notes
      const reorderedFolderNotes = [...folderNotes];
      const [movedNote] = reorderedFolderNotes.splice(sourceIndex, 1);
      reorderedFolderNotes.splice(targetIndex, 0, movedNote);

      return [...reorderedFolderNotes, ...otherNotes];
    });
  };

  const createFolder = (folderName: string) => {
    // Create a placeholder note in the new folder to ensure it appears
    createNote('New Note', '# New Note\n\nStart writing your thoughts here...', folderName);
  };

  const deleteFolder = (folderPath: string) => {
    setNotes(prev => prev.filter(note => {
      const noteFolder = note.path.includes('/') ? note.path.split('/').slice(0, -1).join('/') : 'Root';
      return noteFolder !== folderPath;
    }));
    
    // If selected note was in deleted folder, select another note
    if (selectedNote) {
      const selectedNoteFolder = selectedNote.path.includes('/') ? 
        selectedNote.path.split('/').slice(0, -1).join('/') : 'Root';
      if (selectedNoteFolder === folderPath) {
        const remainingNotes = notes.filter(note => {
          const noteFolder = note.path.includes('/') ? note.path.split('/').slice(0, -1).join('/') : 'Root';
          return noteFolder !== folderPath;
        });
        setSelectedNote(remainingNotes[0] || null);
      }
    }
  };

  const exportVault = async () => {
    // This would implement ZIP export functionality
    // For now, we'll just create a simple export
    const exportData = {
      notes: notes.map(note => ({
        ...note,
        createdAt: note.createdAt.toISOString(),
        updatedAt: note.updatedAt.toISOString(),
        versions: note.versions.map(v => ({
          ...v,
          timestamp: v.timestamp.toISOString()
        }))
      })),
      exportedAt: new Date().toISOString(),
      version: '1.0.0'
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `knowledge-base-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return {
    notes,
    selectedNote,
    searchQuery,
    isAdvancedSearch,
    advancedFilters,
    filteredNotes,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
    renameNote,
    renameFolder,
    moveNote,
    createNoteInFolder,
    duplicateNote,
    reorderNotes,
    createFolder,
    deleteFolder,
    setSearchQuery,
    setIsAdvancedSearch,
    setAdvancedFilters,
    exportVault
  };
};
