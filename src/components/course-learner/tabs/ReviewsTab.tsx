
import React, { useState } from 'react';
import { Star, ThumbsUp, Flag, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const ReviewsTab: React.FC = () => {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');

  const courseStats = {
    averageRating: 4.7,
    totalReviews: 2847,
    ratingDistribution: {
      5: 1823,
      4: 642,
      3: 287,
      2: 73,
      1: 22
    }
  };

  const reviews = [
    {
      id: '1',
      author: 'Alice Johnson',
      avatar: '/placeholder.svg',
      rating: 5,
      comment: 'This course is absolutely fantastic! The instructor explains everything so clearly and the projects are really engaging. I went from knowing nothing about JavaScript to building my own projects. The Q&A section was incredibly helpful when I got stuck.',
      date: '2024-01-20',
      helpful: 24,
      isVerifiedPurchase: true,
      instructorReply: {
        content: 'Thank you so much for your kind words, Alice! I\'m thrilled to hear about your progress. Keep up the great work!',
        date: '2024-01-21'
      }
    },
    {
      id: '2',
      author: 'Bob Smith',
      avatar: '/placeholder.svg',
      rating: 4,
      comment: 'Great course with excellent content and structure. The pacing is perfect for beginners. I only wish there were more advanced projects included. The community support through the discussion forums is outstanding.',
      date: '2024-01-15',
      helpful: 18,
      isVerifiedPurchase: true,
      instructorReply: null
    },
    {
      id: '3',
      author: 'Charlie Brown',
      avatar: '/placeholder.svg',
      rating: 5,
      comment: 'Best investment I\'ve made in my career! The practical approach and real-world examples make complex concepts easy to understand. The instructor is very responsive in the Q&A section.',
      date: '2024-01-10',
      helpful: 31,
      isVerifiedPurchase: true,
      instructorReply: {
        content: 'Thank you Charlie! Comments like yours motivate me to keep creating quality content. Best of luck with your career!',
        date: '2024-01-11'
      }
    }
  ];

  const filteredReviews = reviews.filter(review => {
    if (filterBy === 'all') return true;
    if (filterBy === 'with-instructor-reply') return review.instructorReply !== null;
    if (filterBy === 'verified-only') return review.isVerifiedPurchase;
    if (filterBy.startsWith('rating-')) {
      const rating = parseInt(filterBy.split('-')[1]);
      return review.rating === rating;
    }
    return true;
  });

  const handleSubmitReview = () => {
    if (newReview.trim() && newRating > 0) {
      console.log('Submitting review:', { rating: newRating, comment: newReview });
      setNewReview('');
      setNewRating(0);
      setShowWriteReview(false);
    }
  };

  const handleHelpful = (reviewId: string) => {
    console.log('Marking review as helpful:', reviewId);
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'sm') => {
    const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6';
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto w-full">
      {/* Course Rating Overview */}
      <Card className="bg-white border-gray-200 shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-gray-900">Course Reviews & Ratings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">{courseStats.averageRating}</div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(courseStats.averageRating), 'lg')}
                </div>
                <p className="text-gray-600">{courseStats.totalReviews.toLocaleString()} reviews</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm w-8">{rating}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Progress 
                    value={(courseStats.ratingDistribution[rating as keyof typeof courseStats.ratingDistribution] / courseStats.totalReviews) * 100} 
                    className="flex-1 h-2" 
                  />
                  <span className="text-sm w-12 text-right">
                    {courseStats.ratingDistribution[rating as keyof typeof courseStats.ratingDistribution]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={() => setShowWriteReview(!showWriteReview)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Write a Review
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Write Review Form */}
      {showWriteReview && (
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">Write Your Review</h3>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Your Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setNewRating(star)}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= newRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Your Review</label>
              <Textarea
                placeholder="Share your experience with this course. What did you like? What could be improved?"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="min-h-[120px] bg-white"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowWriteReview(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitReview} className="bg-purple-600 hover:bg-purple-700">
                Submit Review
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Sorting */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All reviews</SelectItem>
                  <SelectItem value="rating-5">5 stars only</SelectItem>
                  <SelectItem value="rating-4">4 stars only</SelectItem>
                  <SelectItem value="rating-3">3 stars only</SelectItem>
                  <SelectItem value="rating-2">2 stars only</SelectItem>
                  <SelectItem value="rating-1">1 star only</SelectItem>
                  <SelectItem value="with-instructor-reply">With instructor reply</SelectItem>
                  <SelectItem value="verified-only">Verified purchases only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="highest-rated">Highest rated</SelectItem>
                <SelectItem value="lowest-rated">Lowest rated</SelectItem>
                <SelectItem value="most-helpful">Most helpful</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="bg-white border-gray-200 shadow rounded-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback>{review.author[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{review.author}</h4>
                      {review.isVerifiedPurchase && (
                        <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="sm">
                      <Flag className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  
                  <p className="text-gray-800 mb-3">{review.comment}</p>
                  
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => handleHelpful(review.id)}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                  </div>
                  
                  {review.instructorReply && (
                    <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-blue-600 text-white">Instructor Response</Badge>
                        <span className="text-sm text-gray-500">{new Date(review.instructorReply.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-800">{review.instructorReply.content}</p>
                    </div>
                  )}
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
