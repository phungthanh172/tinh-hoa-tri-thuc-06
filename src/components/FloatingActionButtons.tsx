
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail, ChevronUp, BookOpen, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const FloatingActionButtons = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChatSupport = () => {
    if (!user) {
      toast.error('Please log in to access chat support');
      navigate('/auth');
      return;
    }
    // Simulate opening chat support
    toast.success('Chat support opened');
  };

  const handleQuickSearch = () => {
    navigate('/search');
  };

  const handleMyLearning = () => {
    if (!user) {
      toast.error('Please log in to access your courses');
      navigate('/auth');
      return;
    }
    navigate('/courses');
  };

  const handleContactSupport = () => {
    // Simulate contact support
    toast.success('Contact form opened');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end space-y-3">
        {/* Expanded Action Buttons */}
        {isExpanded && (
          <div className="flex flex-col space-y-2 animate-in slide-in-from-bottom-2">
            <Button
              size="icon"
              className="bg-blue-600 hover:bg-blue-700 shadow-lg"
              onClick={handleQuickSearch}
              title="Quick Search"
            >
              <Search className="w-5 h-5" />
            </Button>
            
            <Button
              size="icon"
              className="bg-green-600 hover:bg-green-700 shadow-lg"
              onClick={handleMyLearning}
              title="My Learning"
            >
              <BookOpen className="w-5 h-5" />
            </Button>
            
            <Button
              size="icon"
              className="bg-purple-600 hover:bg-purple-700 shadow-lg"
              onClick={handleChatSupport}
              title="Chat Support"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
            
            <Button
              size="icon"
              className="bg-orange-600 hover:bg-orange-700 shadow-lg"
              onClick={handleContactSupport}
              title="Contact Support"
            >
              <Mail className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Main Toggle Button */}
        <Button
          size="icon"
          className={`bg-purple-600 hover:bg-purple-700 shadow-lg transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
          onClick={toggleExpanded}
          title={isExpanded ? 'Hide Actions' : 'Show Actions'}
        >
          <ChevronUp className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default FloatingActionButtons;
