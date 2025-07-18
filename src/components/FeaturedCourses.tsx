
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Clock, Users, Plus } from 'lucide-react';
import { sampleCourses } from '@/data/sampleData';
import { toast } from 'sonner';

const FeaturedCourses = () => {
  // Temporarily commented out the real data query and using static sample data
  // const { data: courses, isLoading, error, refetch } = useQuery({
  //   queryKey: ['featured-courses'],
  //   queryFn: coursesApi.fetchFeaturedCourses,
  //   staleTime: 5 * 60 * 1000, // 5 minutes
  // });

  // Using static sample data for rapid development
  const courses = sampleCourses;
  const isLoading = false;
  const error = null;

  const handleInsertSampleData = async () => {
    // Temporarily commented out real sample data insertion
    // try {
    //   console.log('Starting sample data insertion...');
    //   await sampleDataApi.insertSampleData();
    //   toast.success('Sample data inserted successfully!');
    //   refetch(); // Refresh the courses data
    // } catch (error) {
    //   console.error('Failed to insert sample data:', error);
    //   toast.error('Failed to insert sample data. Please try again.');
    // }
    
    toast.success('Sample data is already loaded for development!');
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular courses, carefully selected to help you master the skills that matter most in today's tech industry.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="p-0">
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 w-1/2"></div>
                  <div className="flex justify-between">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Featured Courses</h2>
          <p className="text-red-600 mb-4">Failed to load courses. Please try again later.</p>
          <Button 
            onClick={handleInsertSampleData}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Insert Sample Data
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl font-bold">Featured Courses</h2>
            <Button 
              onClick={handleInsertSampleData}
              size="sm"
              variant="outline"
              className="text-purple-600 border-purple-600 hover:bg-purple-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Sample Data Loaded
            </Button>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular courses, carefully selected to help you master the skills that matter most in today's tech industry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses?.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-lg mb-2 line-clamp-2">{course.title}</CardTitle>
                <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{course.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{course.studentsCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">${course.price}</span>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
