
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Frontend Developer",
      company: "Tech Corp",
      rating: 5,
      content: "The courses here completely transformed my career. The instructors are knowledgeable and the content is always up-to-date with industry standards.",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Full Stack Developer",
      company: "StartupXYZ",
      rating: 5,
      content: "I went from complete beginner to landing my dream job in just 6 months. The practical projects and real-world examples made all the difference.",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "Design Studio",
      rating: 5,
      content: "The quality of education is outstanding. I love how I can learn at my own pace while still feeling connected to a community of learners.",
      avatar: "/placeholder.svg"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our successful students have to say about their learning experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-purple-200 mr-2" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
