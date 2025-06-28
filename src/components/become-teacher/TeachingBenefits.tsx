
import React from 'react';
import { Heart, DollarSign, Globe, Rocket, LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TeachingBenefit {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight: string;
  stats: string;
}

const TeachingBenefits: React.FC = () => {
  const teachingBenefits: TeachingBenefit[] = [
    {
      icon: Heart,
      title: "Transform Lives Globally",
      description: "Impact millions of students worldwide and become part of the educational revolution that's reshaping how people learn, grow, and achieve their dreams.",
      highlight: "Global Impact",
      stats: "2M+ Lives Changed"
    },
    {
      icon: DollarSign,
      title: "Build Sustainable Income",
      description: "Create multiple revenue streams through courses, mentoring, and premium content. Top educators earn $10,000+ monthly while maintaining flexible schedules.",
      highlight: "Up to $15,000/month",
      stats: "Avg. $4,200/month"
    },
    {
      icon: Globe,
      title: "Reach Global Audience",
      description: "Break geographical boundaries and teach students from every continent. Build your personal brand as a world-class educator and thought leader.",
      highlight: "195+ Countries",
      stats: "50M+ Global Learners"
    },
    {
      icon: Rocket,
      title: "Career Acceleration",
      description: "Teaching enhances your expertise, builds your network, and opens doors to consulting, speaking, and leadership opportunities in your field.",
      highlight: "10x Career Growth",
      stats: "85% Career Advancement"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-gray-900">Why Choose Teaching Excellence?</h2>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Teaching is the ultimate career catalyst – combining purpose, prosperity, and global impact 
              while building the future you want to live in.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {teachingBenefits.map((benefit, index) => (
              <Card key={index} className="p-10 hover:shadow-2xl transition-all duration-500 border-0 shadow-xl bg-gradient-to-br from-indigo-50 to-purple-50 group hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-6 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-3xl font-bold text-gray-900">{benefit.title}</h3>
                        <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 px-4 py-2 text-sm font-semibold">
                          {benefit.highlight}
                        </Badge>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-lg mb-4">{benefit.description}</p>
                      <div className="text-sm text-indigo-600 font-semibold">{benefit.stats}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeachingBenefits;
