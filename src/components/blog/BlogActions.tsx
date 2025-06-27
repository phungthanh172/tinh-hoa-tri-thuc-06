
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Bookmark, Twitter, Facebook, Link2, Check } from 'lucide-react';
import { toast } from 'sonner';

interface BlogActionsProps {
  title: string;
  url?: string;
}

const BlogActions = ({ title, url = window.location.href }: BlogActionsProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(42);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from reading list' : 'Added to reading list');
  };

  const handleShare = (platform: string) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard');
        setShowShareMenu(false);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setShowShareMenu(false);
    }
  };

  return (
    <div className="flex items-center justify-between py-6 border-t border-b border-gray-200 bg-gray-50 px-6 rounded-lg">
      <div className="flex items-center space-x-4">
        <Button
          variant={isLiked ? "default" : "outline"}
          size="sm"
          onClick={handleLike}
          className={`flex items-center space-x-2 ${isLiked ? 'bg-red-500 hover:bg-red-600' : ''}`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
          <span>{likes}</span>
        </Button>
        
        <Button
          variant={isBookmarked ? "default" : "outline"}
          size="sm"
          onClick={handleBookmark}
          className={isBookmarked ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
        </Button>
      </div>
      
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="flex items-center space-x-2"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </Button>
        
        {showShareMenu && (
          <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
            <div className="flex flex-col space-y-1 min-w-[160px]">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('twitter')}
                className="justify-start"
              >
                <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                Twitter
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('facebook')}
                className="justify-start"
              >
                <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                Facebook
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('copy')}
                className="justify-start"
              >
                <Link2 className="w-4 h-4 mr-2" />
                Copy link
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogActions;
