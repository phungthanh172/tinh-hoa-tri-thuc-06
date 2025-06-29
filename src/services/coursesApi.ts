
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type Course = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  image: string;
  rating: number;
  studentsCount: number;
  duration: string;
  lectures: number;
  price: number;
  originalPrice?: number;
  level: string;
  language?: string;
  category?: string;
};

export const coursesApi = {
  async fetchFeaturedCourses(): Promise<Course[]> {
    console.log('Fetching featured courses from programs...');
    
    // Fetch programs from the database and transform them to match the Course interface
    const { data: programs, error } = await supabase
      .from('programs')
      .select('*')
      .limit(6);

    if (error) {
      console.error('Error fetching programs:', error);
      // Return mock data as fallback
      return this.getMockCourses();
    }

    if (!programs || programs.length === 0) {
      console.log('No programs found, returning mock courses');
      return this.getMockCourses();
    }

    // Transform programs to courses format
    const courses: Course[] = programs.map((program, index) => ({
      id: program.id,
      title: program.title,
      subtitle: program.summary,
      description: program.full_description,
      instructor: 'Elite Education Team', // Default instructor since we don't have this relationship yet
      instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      image: program.image_url || `https://images.unsplash.com/photo-1517077177078-19b08548${String(index + 1).padStart(2, '0')}0-4ab5b2d4c5c0`,
      rating: 4.5 + (Math.random() * 0.5), // Random rating between 4.5-5.0
      studentsCount: Math.floor(Math.random() * 5000) + 1000, // Random students between 1000-6000
      duration: `${Math.floor(Math.random() * 20) + 10}h ${Math.floor(Math.random() * 60)}m`, // Random duration
      lectures: Math.floor(Math.random() * 50) + 20, // Random lectures between 20-70
      price: Math.floor(Math.random() * 200) + 50, // Random price between $50-$250
      originalPrice: Math.floor(Math.random() * 100) + 200, // Random original price
      level: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)],
      language: 'English',
      category: 'Technology'
    }));

    console.log('Courses transformed successfully:', courses.length);
    return courses;
  },

  async fetchCourses(filters: any): Promise<Course[]> {
    console.log('Fetching courses with filters:', filters);
    
    // For now, return the same data as featured courses
    // In a real implementation, you would apply filters here
    const courses = await this.fetchFeaturedCourses();
    
    // Apply basic filtering logic
    let filteredCourses = [...courses];
    
    if (filters.level) {
      filteredCourses = filteredCourses.filter(course => course.level === filters.level);
    }
    
    if (filters.rating && filters.rating > 0) {
      filteredCourses = filteredCourses.filter(course => course.rating >= filters.rating);
    }
    
    return filteredCourses;
  },

  async fetchCourseById(id: number): Promise<Course | null> {
    console.log('Fetching course by id:', id);
    
    // For now, return a mock course since we don't have a real course creation system yet
    const courses = await this.fetchFeaturedCourses();
    return courses.find(course => course.id === id.toString()) || null;
  },

  async createCourse(courseData: any): Promise<Course> {
    console.log('Creating course:', courseData);
    
    // For now, return a mock course with generated ID
    // In a real implementation, this would save to the database
    const newCourse: Course = {
      id: Date.now().toString(),
      title: courseData.title,
      subtitle: courseData.subtitle,
      description: courseData.description,
      instructor: courseData.instructor,
      instructorAvatar: courseData.instructorAvatar,
      image: courseData.image,
      rating: 0,
      studentsCount: 0,
      duration: courseData.duration,
      lectures: courseData.lectures,
      price: courseData.price,
      originalPrice: courseData.originalPrice,
      level: courseData.level,
      language: courseData.language,
      category: courseData.category
    };
    
    return newCourse;
  },

  async updateCourse(id: number, courseData: any): Promise<Course> {
    console.log('Updating course:', id, courseData);
    
    // For now, return the updated course data
    // In a real implementation, this would update the database
    const updatedCourse: Course = {
      id: id.toString(),
      title: courseData.title,
      subtitle: courseData.subtitle,
      description: courseData.description,
      instructor: courseData.instructor,
      instructorAvatar: courseData.instructorAvatar,
      image: courseData.image,
      rating: 4.5,
      studentsCount: 100,
      duration: courseData.duration,
      lectures: courseData.lectures,
      price: courseData.price,
      originalPrice: courseData.originalPrice,
      level: courseData.level,
      language: courseData.language,
      category: courseData.category
    };
    
    return updatedCourse;
  },

  getMockCourses(): Course[] {
    return [
      {
        id: '1',
        title: 'Complete JavaScript Mastery',
        subtitle: 'Master JavaScript from basics to advanced',
        description: 'Learn JavaScript programming from the ground up with hands-on projects and real-world applications.',
        instructor: 'Sarah Johnson',
        instructorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c6?w=40&h=40&fit=crop&crop=face',
        image: 'https://images.unsplash.com/photo-1517077177078-19b085480c5c',
        rating: 4.8,
        studentsCount: 12547,
        duration: '42h 15m',
        lectures: 156,
        price: 89,
        originalPrice: 149,
        level: 'Beginner',
        language: 'English',
        category: 'Programming'
      },
      {
        id: '2',
        title: 'React Development Bootcamp',
        subtitle: 'Build modern web applications with React',
        description: 'Master React.js and build professional web applications with hooks, context, and modern best practices.',
        instructor: 'Mike Chen',
        instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
        rating: 4.9,
        studentsCount: 8932,
        duration: '38h 30m',
        lectures: 128,
        price: 129,
        originalPrice: 199,
        level: 'Intermediate',
        language: 'English',
        category: 'Web Development'
      },
      {
        id: '3',
        title: 'Python for Data Science',
        subtitle: 'Data analysis and machine learning with Python',
        description: 'Learn Python programming for data science, including pandas, numpy, matplotlib, and machine learning libraries.',
        instructor: 'Dr. Amanda Rodriguez',
        instructorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935',
        rating: 4.7,
        studentsCount: 15673,
        duration: '55h 45m',
        lectures: 189,
        price: 149,
        originalPrice: 249,
        level: 'Advanced',
        language: 'English',
        category: 'Data Science'
      }
    ];
  }
};
