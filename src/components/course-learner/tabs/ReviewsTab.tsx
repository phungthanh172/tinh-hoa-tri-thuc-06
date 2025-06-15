
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const ReviewsTab: React.FC = () => {
  const reviews = [
    {
      id: '1',
      author: 'Alice Johnson',
      avatar: 'AJ',
      rating: 5,
      comment: 'This course is amazing! The instructor is very knowledgeable and explains everything clearly.',
      date: '2024-01-20'
    },
    {
      id: '2',
      author: 'Bob Smith',
      avatar: 'BS',
      rating: 4,
      comment: 'I learned a lot from this course. The content is well-structured and easy to follow.',
      date: '2024-01-15'
    },
    {
      id: '3',
      author: 'Charlie Brown',
      avatar: 'CB',
      rating: 3,
      comment: 'The course is good, but I wish there were more examples and practice exercises.',
      date: '2024-01-10'
    }
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto w-full">
      <Card className="bg-white border-gray-200 shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-gray-900">
            <span>Reviews</span>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Leave a review
            </Button>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-white border-gray-200 shadow rounded-lg">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarFallback>{review.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-gray-900 font-semibold">{review.author}</h3>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-800 mb-3">{review.comment}</p>
                  
                  <div className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
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
