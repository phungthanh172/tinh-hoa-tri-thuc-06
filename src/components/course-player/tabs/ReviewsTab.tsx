
import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';

const ReviewsTab: React.FC = () => {
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');

  const courseRating = {
    average: 4.7,
    total: 12543,
    distribution: {
      5: 75,
      4: 15,
      3: 6,
      2: 2,
      1: 2
    }
  };

  const reviews = [
    {
      id: '1',
      author: 'Sarah Johnson',
      rating: 5,
      date: '2024-01-10',
      content: 'Excellent course! Jonas explains everything clearly and the projects are really helpful for understanding the concepts.',
      helpful: 24,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '2',
      author: 'Mike Chen',
      rating: 4,
      date: '2024-01-08',
      content: 'Great content overall. Some sections could be a bit more detailed, but the practical examples are fantastic.',
      helpful: 18,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    }
  ];

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-400'
        } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
        onClick={() => interactive && setUserRating(index + 1)}
      />
    ));
  };

  const handleSubmitReview = () => {
    if (userRating && userReview.trim()) {
      console.log('Submitting review:', { rating: userRating, review: userReview });
      setUserRating(0);
      setUserReview('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Course Rating Summary */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Course Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                {courseRating.average}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(courseRating.average))}
              </div>
              <div className="text-gray-400 text-sm">
                {courseRating.total.toLocaleString()} reviews
              </div>
            </div>
            
            <div className="space-y-2">
              {Object.entries(courseRating.distribution).reverse().map(([stars, percentage]) => (
                <div key={stars} className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400 w-8">{stars}★</span>
                  <Progress value={percentage} className="flex-1 h-2" />
                  <span className="text-sm text-gray-400 w-8">{percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Write Review */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Leave a Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Your Rating</label>
            <div className="flex space-x-1">
              {renderStars(userRating, true)}
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Your Review</label>
            <Textarea
              placeholder="Share your experience with this course..."
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={4}
            />
          </div>
          
          <Button 
            onClick={handleSubmitReview}
            disabled={!userRating || !userReview.trim()}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Submit Review
          </Button>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-10 h-10 rounded-full"
                />
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-white">{review.author}</span>
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">{review.date}</span>
                  </div>
                  
                  <p className="text-gray-300 mb-3">{review.content}</p>
                  
                  <div className="flex items-center space-x-4">
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Reply
                    </Button>
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

export default ReviewsTab;
