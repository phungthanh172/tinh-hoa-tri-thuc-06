
import React from 'react';
import { ArrowLeft, Hash, Link, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Note } from '@/types/note';
import { findBacklinks } from '@/utils/noteUtils';

interface BacklinksPanelProps {
  currentNote: Note | null;
  allNotes: Note[];
  onNavigateToNote: (noteId: string) => void;
}

const BacklinksPanel = ({ currentNote, allNotes, onNavigateToNote }: BacklinksPanelProps) => {
  if (!currentNote) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg">Backlinks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            <ArrowLeft className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-sm">Select a note to see its backlinks</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const backlinks = findBacklinks(currentNote, allNotes);
  const totalBacklinks = backlinks.direct.length + backlinks.mentions.length + backlinks.tags.length;

  const NoteLink = ({ note, type }: { note: Note; type: string }) => (
    <div
      onClick={() => onNavigateToNote(note.id)}
      className="p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-gray-900 truncate">
            {note.title}
          </h4>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
            {note.content.replace(/[#*\[\]]/g, '').slice(0, 80)}...
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="outline" className="text-xs">
              {type}
            </Badge>
            <span className="text-xs text-gray-500">
              {note.updatedAt.toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Backlinks ({totalBacklinks})
        </CardTitle>
        <p className="text-sm text-gray-600">
          Notes that reference "{currentNote.title}"
        </p>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto space-y-4">
        {/* Direct Links */}
        {backlinks.direct.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
              <Link className="w-4 h-4 mr-1" />
              Direct Links ({backlinks.direct.length})
            </h3>
            <div className="space-y-2">
              {backlinks.direct.map(note => (
                <NoteLink key={note.id} note={note} type="direct link" />
              ))}
            </div>
          </div>
        )}

        {/* Mentions */}
        {backlinks.mentions.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              Mentions ({backlinks.mentions.length})
            </h3>
            <div className="space-y-2">
              {backlinks.mentions.map(note => (
                <NoteLink key={note.id} note={note} type="mention" />
              ))}
            </div>
          </div>
        )}

        {/* Shared Tags */}
        {backlinks.tags.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
              <Hash className="w-4 h-4 mr-1" />
              Shared Tags ({backlinks.tags.length})
            </h3>
            <div className="space-y-2">
              {backlinks.tags.map(note => (
                <NoteLink key={note.id} note={note} type="shared tags" />
              ))}
            </div>
          </div>
        )}

        {totalBacklinks === 0 && (
          <div className="text-center text-gray-500 py-8">
            <ArrowLeft className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-sm">No backlinks found</p>
            <p className="text-xs mt-1">
              Create links to this note using [[{currentNote.title}]]
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BacklinksPanel;
