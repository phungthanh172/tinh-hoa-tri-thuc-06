
export interface NoteVersion {
  id: string;
  content: string;
  title: string;
  timestamp: Date;
  changes?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  path: string; // folder structure like "Folder/Subfolder/Note"
  links: string[]; // extracted [[wiki links]]
  tags: string[]; // extracted #tags
  createdAt: Date;
  updatedAt: Date;
  versions: NoteVersion[];
}

export interface GraphNode {
  id: string;
  title: string;
  group: number;
  tags: string[];
  linkCount: number;
  backLinkCount: number;
}

export interface GraphLink {
  source: string;
  target: string;
  type: 'wiki' | 'tag' | 'auto' | 'backlink';
  strength: number;
}

export interface SearchFilters {
  contentType: 'all' | 'title' | 'content' | 'path';
  dateRange: 'all' | '7days' | '30days' | '90days';
  tags: string[];
  folders: string[];
}
