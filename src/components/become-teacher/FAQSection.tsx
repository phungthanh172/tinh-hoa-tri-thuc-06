
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const faqs: FAQ[] = [
    {
      question: "What qualifications do I need to become a teacher on the platform?",
      answer: "We require a minimum of 3 years of industry experience in your field, demonstrated expertise, and a passion for teaching. While formal teaching credentials are helpful, they're not mandatory. We value practical experience and the ability to effectively communicate knowledge."
    },
    {
      question: "How much can I earn as an online educator?",
      answer: "Earnings vary based on course popularity, pricing, and student engagement. Our top educators earn $10,000+ monthly, with the average being around $4,200/month. You set your own prices and keep a substantial portion of the revenue from your courses."
    },
    {
      question: "What equipment do I need to start teaching?",
      answer: "Basic requirements include: high-speed internet (50+ Mbps), a quality microphone, good lighting, and a quiet teaching space. We provide technical support and guidance on setting up professional recording equipment as you grow."
    },
    {
      question: "How long does the application process take?",
      answer: "The typical process takes 2-4 weeks from application to course launch. This includes application review (1-2 weeks), onboarding and training, course development support, and final approval. We provide guidance throughout the entire process."
    },
    {
      question: "Can I teach part-time while keeping my current job?",
      answer: "Absolutely! Many of our educators start part-time with 5-15 hours per week. Our platform is designed for flexibility, allowing you to create content and engage with students on your own schedule while building your teaching presence."
    },
    {
      question: "What support do you provide for new educators?",
      answer: "We offer comprehensive support including: dedicated success managers, instructional design assistance, marketing guidance, technical support, community forums, and regular training sessions to help you succeed."
    },
    {
      question: "How do I get students to enroll in my courses?",
      answer: "We provide marketing support through our platform promotion, SEO optimization, social media features, email marketing tools, and affiliate programs. We also offer guidance on creating compelling course descriptions and promotional materials."
    },
    {
      question: "Can I create courses in languages other than English?",
      answer: "Yes! We support courses in 80+ languages and actively promote multilingual education. This helps you reach global audiences and connect with students in their preferred language."
    },
    {
      question: "What types of courses perform best?",
      answer: "High-demand areas include technology, business skills, creative arts, personal development, and professional certifications. However, niche expertise often performs exceptionally well due to lower competition and highly engaged audiences."
    },
    {
      question: "How do I handle student questions and support?",
      answer: "Our platform includes built-in Q&A systems, discussion forums, and messaging tools. We recommend responding to student questions within 24-48 hours and provide templates and best practices for effective student communication."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Get answers to common questions about becoming an educator and building 
              your successful teaching career on our platform.
            </p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm animate-fade-in">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-gray-200 rounded-xl px-6 hover:shadow-lg transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-indigo-600 py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 leading-relaxed text-base pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="text-center mt-12 animate-fade-in">
            <p className="text-lg text-gray-600 mb-6">
              Still have questions? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@platform.com" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
              >
                Email Support
              </a>
              <a 
                href="#" 
                className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
