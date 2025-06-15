
import React, { useState } from 'react';
import { MessageSquare, Reply } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Reply {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
  replies: Reply[];
}

interface CommentsSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
  onAddReply: (commentId: number, content: string) => void;
  isLoggedIn: boolean;
  currentUser?: {
    name: string;
    avatar: string;
  };
}

const CommentsSection = ({ 
  comments, 
  onAddComment, 
  onAddReply, 
  isLoggedIn, 
  currentUser 
}: CommentsSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [replyToComment, setReplyToComment] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() && isLoggedIn) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const handleAddReply = (commentId: number) => {
    if (replyText.trim() && isLoggedIn) {
      onAddReply(commentId, replyText);
      setReplyText('');
      setReplyToComment(null);
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardContent className="p-8">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="w-5 h-5" />
          <h3 className="text-xl font-bold">Comments ({comments.length})</h3>
        </div>

        {/* Add Comment Form */}
        {isLoggedIn && currentUser ? (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3 mb-4">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <Textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-3"
                  rows={3}
                />
                <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-600 mb-3">Please log in to leave a comment</p>
            <Button>Log In</Button>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start gap-3">
                <img 
                  src={comment.avatar} 
                  alt={comment.author}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{comment.author}</span>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{comment.content}</p>
                  
                  {isLoggedIn && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyToComment(comment.id)}
                    >
                      <Reply className="w-3 h-3 mr-1" />
                      Reply
                    </Button>
                  )}

                  {/* Reply Form */}
                  {replyToComment === comment.id && currentUser && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <img 
                          src={currentUser.avatar} 
                          alt={currentUser.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <Textarea
                            placeholder="Write a reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="mb-3"
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleAddReply(comment.id)}
                              disabled={!replyText.trim()}
                            >
                              Reply
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setReplyToComment(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  {comment.replies.length > 0 && (
                    <div className="mt-4 ml-6 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-3">
                          <img 
                            src={reply.avatar} 
                            alt={reply.author}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">{reply.author}</span>
                              <span className="text-xs text-gray-500">{reply.date}</span>
                            </div>
                            <p className="text-gray-700 text-sm">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentsSection;
