
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Award, Clock, Users, Smartphone, Headphones } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with years of real-world experience."
    },
    {
      icon: Award,
      title: "Certificates",
      description: "Earn verified certificates upon completion to showcase your skills."
    },
    {
      icon: Clock,
      title: "Learn at Your Pace",
      description: "Self-paced learning that fits your schedule and lifestyle."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a community of learners and get help when you need it."
    },
    {
      icon: Smartphone,
      title: "Mobile Learning",
      description: "Access courses on any device, anywhere, anytime."
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Get help whenever you need it with our dedicated support team."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide everything you need to succeed in your learning journey with cutting-edge features and support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
