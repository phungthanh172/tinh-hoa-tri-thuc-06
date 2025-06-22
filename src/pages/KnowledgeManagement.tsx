
import React, { useState, useEffect } from 'react';
import { Search, Plus, FileText, Network, Settings, Download, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { useNotes } from '@/hooks/useNotes';
import NoteList from '@/components/knowledge/NoteList';
import NoteEditor from '@/components/knowledge/NoteEditor';
import GraphView from '@/components/knowledge/GraphView';
import AdvancedSearch from '@/components/knowledge/AdvancedSearch';
import BacklinksPanel from '@/components/knowledge/BacklinksPanel';
import { Note } from '@/types/note';

const KnowledgeManagement = () => {
  const {
    notes,
    selectedNote,
    searchQuery,
    isAdvancedSearch,
    filteredNotes,
    createNote,
    selectNote,
    updateNote,
    deleteNote,
    setSearchQuery,
    setIsAdvancedSearch,
    exportVault
  } = useNotes();

  const [activeView, setActiveView] = useState<'editor' | 'graph'>('editor');
  const [showBacklinks, setShowBacklinks] = useState(false);

  const handleCreateNote = () => {
    const newNote = createNote('New Note', '# New Note\n\nStart writing your thoughts here...');
    selectNote(newNote.id);
    toast.success('New note created');
  };

  const handleExport = async () => {
    try {
      await exportVault();
      toast.success('Knowledge base exported successfully');
    } catch (error) {
      toast.error('Failed to export knowledge base');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Profile
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Knowledge Management
              </h1>
              <p className="text-gray-600 mt-1">{notes.length} notes in your knowledge base</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBacklinks(!showBacklinks)}
              className={showBacklinks ? 'bg-blue-50' : ''}
            >
              {showBacklinks ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              Backlinks
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm" onClick={handleCreateNote}>
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </Button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex gap-6 h-[calc(100vh-200px)]">
          {/* Left Sidebar - Search & Notes */}
          <div className="w-80 flex flex-col bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant={!isAdvancedSearch ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setIsAdvancedSearch(false)}
                  className="flex-1"
                >
                  Simple
                </Button>
                <Button
                  variant={isAdvancedSearch ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setIsAdvancedSearch(true)}
                  className="flex-1"
                >
                  Advanced
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              {isAdvancedSearch ? (
                <AdvancedSearch />
              ) : (
                <NoteList
                  notes={filteredNotes}
                  selectedNoteId={selectedNote?.id}
                  onSelectNote={selectNote}
                  onDeleteNote={deleteNote}
                />
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <Tabs value={activeView} onValueChange={(value) => setActiveView(value as 'editor' | 'graph')}>
                <TabsList>
                  <TabsTrigger value="editor" className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Editor</span>
                  </TabsTrigger>
                  <TabsTrigger value="graph" className="flex items-center space-x-2">
                    <Network className="w-4 h-4" />
                    <span>Graph</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="editor" className="h-full mt-0">
                {selectedNote ? (
                  <NoteEditor
                    note={selectedNote}
                    onUpdate={updateNote}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium mb-2">No note selected</p>
                      <p className="text-sm">Select a note from the sidebar or create a new one</p>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="graph" className="h-full mt-0">
                <GraphView
                  notes={notes}
                  selectedNoteId={selectedNote?.id}
                  onSelectNote={selectNote}
                />
              </TabsContent>
            </div>
          </div>

          {/* Right Sidebar - Backlinks */}
          {showBacklinks && (
            <div className="w-80">
              <BacklinksPanel
                currentNote={selectedNote}
                allNotes={notes}
                onNavigateToNote={selectNote}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeManagement;
