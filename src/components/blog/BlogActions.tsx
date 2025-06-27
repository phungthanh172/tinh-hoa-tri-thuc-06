
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Bookmark, Twitter, Facebook, Link2, MessageCircle, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface BlogActionsProps {
  title: string;
  url?: string;
}

const BlogActions = ({ title, url = window.location.href }: BlogActionsProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(142);
  const [views] = useState(2847);
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
    <div className="flex items-center justify-between py-6 px-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100 shadow-lg">
      <div className="flex items-center space-x-6">
        <Button
          variant={isLiked ? "default" : "outline"}
          size="sm"
          onClick={handleLike}
          className={`flex items-center space-x-2 transition-all duration-200 ${
            isLiked 
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' 
              : 'hover:bg-red-50 hover:border-red-300 hover:text-red-600'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
          <span className="font-medium">{likes}</span>
        </Button>
        
        <Button
          variant={isBookmarked ? "default" : "outline"}
          size="sm"
          onClick={handleBookmark}
          className={`flex items-center space-x-2 transition-all duration-200 ${
            isBookmarked 
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg' 
              : 'hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-600'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
          <span className="hidden sm:inline">Save</span>
        </Button>

        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <Eye className="w-4 h-4" />
          <span>{views.toLocaleString()} views</span>
        </div>
      </div>
      
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </Button>
        
        {showShareMenu && (
          <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-20 min-w-[180px]">
            <div className="flex flex-col space-y-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('twitter')}
                className="justify-start hover:bg-blue-50 rounded-lg"
              >
                <Twitter className="w-4 h-4 mr-3 text-blue-400" />
                Share on Twitter
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('facebook')}
                className="justify-start hover:bg-blue-50 rounded-lg"
              >
                <Facebook className="w-4 h-4 mr-3 text-blue-600" />
                Share on Facebook
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('copy')}
                className="justify-start hover:bg-gray-50 rounded-lg"
              >
                <Link2 className="w-4 h-4 mr-3 text-gray-600" />
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
