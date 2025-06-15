
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Heading {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
  activeSection: string;
}

const TableOfContents = ({ headings, activeSection }: TableOfContentsProps) => {
  return (
    <div className="sticky top-8">
      <Card className="shadow-lg border-0">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3 text-sm text-gray-900">Table of Contents</h3>
          <ScrollArea className="h-96">
            <nav className="space-y-2">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`block text-sm transition-colors ${
                    activeSection === heading.id
                      ? 'text-purple-600 font-medium'
                      : 'text-gray-600 hover:text-purple-500'
                  } ${heading.level === 3 ? 'ml-4' : ''}`}
                >
                  {heading.title}
                </a>
              ))}
            </nav>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default TableOfContents;
