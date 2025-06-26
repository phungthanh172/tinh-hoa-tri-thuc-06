
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, HeadphonesIcon } from 'lucide-react';
import FloatingChatBox from './FloatingChatBox';
import NoteCreationForm from './NoteCreationForm';
import { useNotes } from '@/hooks/useNotes';

const FloatingActionButtons = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false);
  const { createNote, selectNote } = useNotes();

  const handleSaveNote = (title: string, content: string) => {
    const newNote = createNote(title, content);
    selectNote(newNote.id);
  };

  // Don't render buttons if either chat or note form is open
  if (isChatOpen || isNoteFormOpen) {
    return (
      <>
        {isChatOpen && (
          <FloatingChatBox 
            isOpen={isChatOpen} 
            onClose={() => setIsChatOpen(false)} 
          />
        )}
        <NoteCreationForm
          isOpen={isNoteFormOpen}
          onClose={() => setIsNoteFormOpen(false)}
          onSave={handleSaveNote}
        />
      </>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
      <Button
        onClick={() => setIsNoteFormOpen(true)}
        size="lg"
        className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white"
        title="Note Anything"
      >
        <FileText className="w-6 h-6 text-white" />
      </Button>
      <Button
        onClick={() => setIsChatOpen(true)}
        size="lg"
        className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white"
        title="Chat with Professor"
      >
        <HeadphonesIcon className="w-6 h-6 text-white" />
      </Button>
    </div>
  );
};

export default FloatingActionButtons;
