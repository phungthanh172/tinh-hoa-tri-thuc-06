
import React, { useState } from 'react';
import { Upload, FileText, Link, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface BlogContentImporterProps {
  onImport: (content: string, title?: string) => void;
}

const BlogContentImporter = ({ onImport }: BlogContentImporterProps) => {
  const [url, setUrl] = useState('');
  const [pastedContent, setPastedContent] = useState('');

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onImport(content, file.name.replace(/\.[^/.]+$/, ""));
        toast.success('File imported successfully!');
      };
      reader.readAsText(file);
    }
  };

  const handleUrlImport = () => {
    if (url.trim()) {
      // Simulate URL import - in real app, this would fetch content from URL
      const mockContent = `# Imported Content\n\nContent imported from: ${url}\n\nThis is a placeholder for content that would be fetched from the provided URL.`;
      onImport(mockContent, 'Imported Article');
      setUrl('');
      toast.success('Content imported from URL!');
    }
  };

  const handlePasteImport = () => {
    if (pastedContent.trim()) {
      onImport(pastedContent, 'Pasted Content');
      setPastedContent('');
      toast.success('Content imported from clipboard!');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Upload className="w-5 h-5 mr-2" />
          Import Content
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="file" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="file">File</TabsTrigger>
            <TabsTrigger value="url">URL</TabsTrigger>
            <TabsTrigger value="paste">Paste</TabsTrigger>
          </TabsList>
          
          <TabsContent value="file" className="space-y-4">
            <div>
              <Label htmlFor="file-import">Import from File</Label>
              <Input
                id="file-import"
                type="file"
                accept=".txt,.md,.html"
                onChange={handleFileImport}
                className="cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-1">
                Supports .txt, .md, and .html files
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="url" className="space-y-4">
            <div>
              <Label htmlFor="url-import">Import from URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="url-import"
                  placeholder="https://example.com/article"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <Button onClick={handleUrlImport} disabled={!url.trim()}>
                  <Link className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Import content from a web page or article URL
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="paste" className="space-y-4">
            <div>
              <Label htmlFor="paste-import">Paste Content</Label>
              <textarea
                id="paste-import"
                placeholder="Paste your content here..."
                value={pastedContent}
                onChange={(e) => setPastedContent(e.target.value)}
                rows={8}
                className="w-full p-3 border rounded-md resize-vertical"
              />
              <Button 
                onClick={handlePasteImport} 
                disabled={!pastedContent.trim()}
                className="w-full mt-2"
              >
                <Copy className="w-4 h-4 mr-2" />
                Import Pasted Content
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BlogContentImporter;
