
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TeacherSuccessStory {
  name: string;
  subject: string;
  image: string;
  earnings: string;
  students: string;
  courses: number;
  story: string;
  rating: number;
  achievement: string;
  background: string;
}

const SuccessStories: React.FC = () => {
  const teacherSuccessStories: TeacherSuccessStory[] = [
    {
      name: "Dr. Sarah Chen",
      subject: "Data Science & AI",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
      earnings: "$12,500/month",
      students: "25,000+",
      courses: 8,
      story: "From struggling PhD to globally recognized AI educator. Teaching online has given me financial freedom and the platform to share cutting-edge research with practitioners worldwide.",
      rating: 4.9,
      achievement: "Top 1% Global Educator",
      background: "Former Google AI Researcher"
    },
    {
      name: "Marcus Rodriguez",
      subject: "Full-Stack Development",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      earnings: "$8,900/month",
      students: "18,500+",
      courses: 12,
      story: "Transitioned from senior developer to full-time educator. Now I help thousands launch their tech careers while earning more than my corporate salary with complete flexibility.",
      rating: 4.8,
      achievement: "Career Transformation Leader",
      background: "Ex-Netflix Senior Engineer"
    },
    {
      name: "Prof. Emma Williams",
      subject: "Digital Marketing Strategy",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      earnings: "$7,200/month",
      students: "15,200+",
      courses: 6,
      story: "After 15 years in academia, online teaching has allowed me to reach more students in 2 years than in my entire university career, while building a thriving consulting practice.",
      rating: 4.9,
      achievement: "Academic Excellence Award",
      background: "Harvard Business School"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-gray-900">Educator Success Stories</h2>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Meet inspiring educators who transformed their careers, impacted thousands of lives, 
              and built thriving educational businesses through our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {teacherSuccessStories.map((teacher, index) => (
              <Card key={index} className="p-8 hover:shadow-2xl transition-all duration-500 border-0 shadow-xl bg-gradient-to-br from-gray-50 to-white group hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4 mb-8">
                    <img 
                      src={teacher.image} 
                      alt={teacher.name}
                      className="w-20 h-20 rounded-full object-cover shadow-lg border-4 border-white"
                    />
                    <div>
                      <h4 className="font-bold text-xl text-gray-900">{teacher.name}</h4>
                      <p className="text-indigo-600 font-semibold text-sm">{teacher.subject}</p>
                      <p className="text-gray-500 text-xs">{teacher.background}</p>
                      <div className="flex items-center mt-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(teacher.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">{teacher.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100 transform hover:scale-105 transition-transform">
                      <div className="text-2xl font-black text-green-600">{teacher.earnings}</div>
                      <div className="text-xs text-gray-600">Monthly Income</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100 transform hover:scale-105 transition-transform">
                      <div className="text-2xl font-black text-blue-600">{teacher.students}</div>
                      <div className="text-xs text-gray-600">Students Taught</div>
                    </div>
                  </div>
                  
                  <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {teacher.achievement}
                  </Badge>
                  
                  <p className="text-gray-700 italic leading-relaxed">&ldquo;{teacher.story}&rdquo;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
