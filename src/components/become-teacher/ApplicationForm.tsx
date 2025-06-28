
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Mail, BookOpen, Award, Send, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const applicationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  expertise: z.string().min(1, 'Please select your area of expertise'),
  experience: z.string().min(1, 'Please select your experience level'),
  motivation: z.string().min(50, 'Please provide at least 50 characters describing your motivation'),
  sampleContent: z.string().min(100, 'Please provide at least 100 characters for your sample content'),
  availability: z.string().min(1, 'Please select your availability'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
  receiveUpdates: z.boolean().optional()
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const ApplicationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      expertise: '',
      experience: '',
      motivation: '',
      sampleContent: '',
      availability: '',
      agreeToTerms: false,
      receiveUpdates: false
    }
  });

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Application submitted:', data);
    
    toast({
      title: "Application Submitted Successfully!",
      description: "We'll review your application and get back to you within 2-3 business days."
    });
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <section className="py-24 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
            <p className="text-xl text-gray-700 mb-8">
              Thank you for your interest in becoming an educator. Our team will review your application 
              and reach out to you within 2-3 business days.
            </p>
            <p className="text-gray-600">
              In the meantime, check your email for next steps and additional resources.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-gray-900">Apply to Become an Educator</h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Ready to transform lives and build your teaching career? Complete our application 
              and join thousands of educators making global impact.
            </p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm animate-fade-in">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
                <Award className="w-8 h-8 text-indigo-600" />
                Teaching Application Form
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold flex items-center gap-2">
                            <User className="w-5 h-5 text-indigo-600" />
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} className="h-12 text-lg" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold flex items-center gap-2">
                            <Mail className="w-5 h-5 text-indigo-600" />
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} className="h-12 text-lg" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" {...field} className="h-12 text-lg" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="expertise"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-indigo-600" />
                            Area of Expertise
                          </FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="h-12 text-lg">
                                <SelectValue placeholder="Select your expertise" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="technology">Technology & Programming</SelectItem>
                                <SelectItem value="business">Business & Finance</SelectItem>
                                <SelectItem value="design">Design & Creative Arts</SelectItem>
                                <SelectItem value="marketing">Marketing & Sales</SelectItem>
                                <SelectItem value="language">Language & Communication</SelectItem>
                                <SelectItem value="science">Science & Engineering</SelectItem>
                                <SelectItem value="health">Health & Wellness</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold">Teaching Experience</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="h-12 text-lg">
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="beginner">New to teaching (0-1 years)</SelectItem>
                                <SelectItem value="intermediate">Some experience (2-5 years)</SelectItem>
                                <SelectItem value="experienced">Very experienced (5+ years)</SelectItem>
                                <SelectItem value="expert">Expert educator (10+ years)</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold">Weekly Availability</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="h-12 text-lg">
                                <SelectValue placeholder="Hours per week" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="part-time">Part-time (5-15 hours)</SelectItem>
                                <SelectItem value="regular">Regular (15-30 hours)</SelectItem>
                                <SelectItem value="full-time">Full-time (30+ hours)</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="motivation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">Why do you want to teach online?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your passion for education and what motivates you to teach..." 
                            className="min-h-[120px] text-lg"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sampleContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">Sample Course Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe a course you'd like to teach, including learning objectives and target audience..." 
                            className="min-h-[120px] text-lg"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="agreeToTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm">
                              I agree to the Terms of Service and Privacy Policy *
                            </FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="receiveUpdates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm">
                              I'd like to receive updates about teaching opportunities and platform news
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xl py-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        Submitting Application...
                      </div>
                    ) : (
                      <>
                        <Send className="w-6 h-6 mr-3" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
