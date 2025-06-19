
import React, { useState } from 'react';
import { Search, MessageSquare, ThumbsUp, Plus, Filter, Bell, Star, Pin, Flag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';

const QAndATab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [notifications, setNotifications] = useState(true);

  const questions = [
    {
      id: '1',
      title: 'How do I declare a variable in JavaScript?',
      question: 'I\'m confused about the different ways to declare variables. Can someone explain the differences?',
      author: 'John Doe',
      authorAvatar: '/placeholder.svg',
      timestamp: '2 hours ago',
      answers: 3,
      upvotes: 12,
      hasAnswer: true,
      hasInstructorAnswer: true,
      isPinned: false,
      tags: ['variables', 'javascript', 'fundamentals'],
      answers_list: [
        {
          id: '1a',
          author: 'Sarah Wilson',
          authorAvatar: '/placeholder.svg',
          content: 'There are three main ways: var, let, and const. Let me explain the differences...',
          timestamp: '1 hour ago',
          upvotes: 8,
          isInstructor: true
        }
      ]
    },
    {
      id: '2',
      title: 'What is the difference between let and var?',
      question: 'I keep seeing both let and var used in examples. When should I use each one?',
      author: 'Jane Smith',
      authorAvatar: '/placeholder.svg',
      timestamp: '1 day ago',
      answers: 5,
      upvotes: 8,
      hasAnswer: true,
      hasInstructorAnswer: false,
      isPinned: true,
      tags: ['variables', 'scope'],
      answers_list: []
    },
    {
      id: '3',
      title: 'Why is my function not working as expected?',
      question: 'I wrote this function but it\'s not returning what I expect. Here\'s my code...',
      author: 'Mike Johnson',
      authorAvatar: '/placeholder.svg',
      timestamp: '3 days ago',
      answers: 1,
      upvotes: 2,
      hasAnswer: false,
      hasInstructorAnswer: false,
      isPinned: false,
      tags: ['functions', 'debugging'],
      answers_list: []
    }
  ];

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         q.question.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterBy === 'unanswered') return matchesSearch && !q.hasAnswer;
    if (filterBy === 'instructor-answered') return matchesSearch && q.hasInstructorAnswer;
    if (filterBy === 'pinned') return matchesSearch && q.isPinned;
    
    return matchesSearch;
  });

  const handleAskQuestion = () => {
    if (newQuestionTitle.trim() && newQuestion.trim()) {
      console.log('Asking question:', { title: newQuestionTitle, question: newQuestion });
      setNewQuestionTitle('');
      setNewQuestion('');
      setShowAskQuestion(false);
    }
  };

  const handleUpvote = (questionId: string) => {
    console.log('Upvoting question:', questionId);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto w-full">
      <Card className="bg-white border-gray-200 shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center justify-between">
            <span>Course Q&A</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm">
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <Badge variant="outline">{filteredQuestions.length} questions</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search questions and answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-100 border-gray-300 text-gray-900"
              />
            </div>
            <Button 
              onClick={() => setShowAskQuestion(!showAskQuestion)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ask Question
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-48 bg-gray-100 border-gray-300 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="all">All questions</SelectItem>
                  <SelectItem value="unanswered">Unanswered</SelectItem>
                  <SelectItem value="instructor-answered">Instructor answered</SelectItem>
                  <SelectItem value="pinned">Pinned</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-gray-100 border-gray-300 text-gray-900">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="recent">Most recent</SelectItem>
                <SelectItem value="upvoted">Most upvoted</SelectItem>
                <SelectItem value="answered">Most answered</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {showAskQuestion && (
            <Card className="border-purple-200 bg-purple-50">
              <CardContent className="p-4 space-y-4">
                <Input
                  placeholder="Question title..."
                  value={newQuestionTitle}
                  onChange={(e) => setNewQuestionTitle(e.target.value)}
                  className="bg-white"
                />
                <Textarea
                  placeholder="Describe your question in detail. Include any relevant code or context..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="min-h-[120px] bg-white"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAskQuestion(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAskQuestion} className="bg-purple-600 hover:bg-purple-700">
                    Post Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredQuestions.map((question) => (
          <Card key={question.id} className="bg-white border-gray-200 shadow rounded-lg hover:bg-gray-50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={question.authorAvatar} />
                  <AvatarFallback>{question.author[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {question.isPinned && <Pin className="w-4 h-4 text-purple-600" />}
                      <h3 className="text-gray-900 font-semibold">{question.title}</h3>
                      {question.hasInstructorAnswer && (
                        <Badge className="bg-green-600 text-white">Instructor Answered</Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="sm">
                      <Flag className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{question.question}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {question.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>by {question.author}</span>
                      <span>{question.timestamp}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={() => handleUpvote(question.id)}
                        className="flex items-center space-x-1 text-sm text-gray-500 hover:text-purple-600"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{question.upvotes}</span>
                      </button>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <MessageSquare className="w-4 h-4" />
                        <span>{question.answers} answers</span>
                      </div>
                    </div>
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
