import React, { useState } from 'react';
import { Search, MessageSquare, ThumbsUp, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const QAndATab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const questions = [
    {
      id: '1',
      question: 'How do I declare a variable in JavaScript?',
      author: 'John Doe',
      timestamp: '2 hours ago',
      answers: 3,
      upvotes: 12,
      hasAnswer: true
    },
    {
      id: '2',
      question: 'What is the difference between let and var?',
      author: 'Jane Smith',
      timestamp: '1 day ago',
      answers: 5,
      upvotes: 8,
      hasAnswer: true
    },
    {
      id: '3',
      question: 'Why is my function not working as expected?',
      author: 'Mike Johnson',
      timestamp: '3 days ago',
      answers: 1,
      upvotes: 2,
      hasAnswer: false
    }
  ];

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Q&A</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search existing questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Ask a question
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="recent">Most recent</SelectItem>
                <SelectItem value="upvoted">Most upvoted</SelectItem>
                <SelectItem value="unanswered">Unanswered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredQuestions.map((question) => (
          <Card key={question.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-2">{question.question}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>by {question.author}</span>
                    <span>{question.timestamp}</span>
                    {question.hasAnswer && (
                      <Badge variant="secondary" className="bg-green-600 text-white">
                        Answered
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{question.answers}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{question.upvotes}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QAndATab;
