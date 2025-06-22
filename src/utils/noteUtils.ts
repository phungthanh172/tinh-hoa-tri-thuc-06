
import { Note, SearchFilters } from '@/types/note';

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const extractLinks = (content: string): string[] => {
  const linkRegex = /\[\[([^\]]+)\]\]/g;
  const links: string[] = [];
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    links.push(match[1]);
  }
  
  return [...new Set(links)]; // Remove duplicates
};

export const extractTags = (content: string): string[] => {
  const tagRegex = /#([a-zA-Z0-9_-]+)/g;
  const tags: string[] = [];
  let match;
  
  while ((match = tagRegex.exec(content)) !== null) {
    tags.push(match[1]);
  }
  
  return [...new Set(tags)]; // Remove duplicates
};

export const searchNotes = (
  notes: Note[],
  query: string,
  filters?: SearchFilters
): Note[] => {
  if (!query && !filters) return notes;
  
  let filtered = notes;
  
  // Apply text search
  if (query) {
    const searchTerm = query.toLowerCase();
    filtered = filtered.filter(note => {
      const titleMatch = note.title.toLowerCase().includes(searchTerm);
      const contentMatch = note.content.toLowerCase().includes(searchTerm);
      const pathMatch = note.path.toLowerCase().includes(searchTerm);
      const tagMatch = note.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      
      if (filters?.contentType) {
        switch (filters.contentType) {
          case 'title': return titleMatch;
          case 'content': return contentMatch;
          case 'path': return pathMatch;
          default: return titleMatch || contentMatch || pathMatch || tagMatch;
        }
      }
      
      return titleMatch || contentMatch || pathMatch || tagMatch;
    });
  }
  
  // Apply advanced filters
  if (filters) {
    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (filters.dateRange) {
        case '7days':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case '30days':
          cutoffDate.setDate(now.getDate() - 30);
          break;
        case '90days':
          cutoffDate.setDate(now.getDate() - 90);
          break;
      }
      
      filtered = filtered.filter(note => note.updatedAt >= cutoffDate);
    }
    
    // Tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(note =>
        filters.tags.some(tag => note.tags.includes(tag))
      );
    }
    
    // Folders filter
    if (filters.folders.length > 0) {
      filtered = filtered.filter(note =>
        filters.folders.some(folder => note.path.startsWith(folder))
      );
    }
  }
  
  return filtered;
};

export const findBacklinks = (targetNote: Note, allNotes: Note[]) => {
  const backlinks = {
    direct: [] as Note[],
    mentions: [] as Note[],
    tags: [] as Note[]
  };
  
  allNotes.forEach(note => {
    if (note.id === targetNote.id) return;
    
    // Direct wiki links
    if (note.links.includes(targetNote.title)) {
      backlinks.direct.push(note);
    }
    
    // Title mentions (not in wiki links)
    const contentWithoutLinks = note.content.replace(/\[\[([^\]]+)\]\]/g, '');
    if (contentWithoutLinks.toLowerCase().includes(targetNote.title.toLowerCase())) {
      backlinks.mentions.push(note);
    }
    
    // Shared tags
    const sharedTags = note.tags.filter(tag => targetNote.tags.includes(tag));
    if (sharedTags.length > 0) {
      backlinks.tags.push(note);
    }
  });
  
  return backlinks;
};

export const getAllTags = (notes: Note[]): string[] => {
  const allTags = notes.flatMap(note => note.tags);
  return [...new Set(allTags)].sort();
};

export const getAllFolders = (notes: Note[]): string[] => {
  const folders = notes
    .map(note => {
      const pathParts = note.path.split('/');
      return pathParts.slice(0, -1).join('/');
    })
    .filter(folder => folder.length > 0);
  
  return [...new Set(folders)].sort();
};
