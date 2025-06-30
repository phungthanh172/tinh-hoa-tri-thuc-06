
import { sampleCourses } from '@/data/sampleData';

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
    console.log('Using static sample courses for rapid development...');
    
    // Temporarily commented out Appwrite integration and using static sample data
    // try {
    //   // Fetch programs from Appwrite and transform them to match the Course interface
    //   const programs = await appwriteApi.fetchAllPrograms();

    //   if (!programs || programs.length === 0) {
    //     console.log('No programs found, returning mock courses');
    //     return this.getMockCourses();
    //   }

    //   // Transform programs to courses format
    //   const courses: Course[] = programs.map((program, index) => ({
    //     id: program.$id,
    //     title: program.title,
    //     subtitle: program.summary,
    //     description: program.full_description,
    //     instructor: 'Elite Education Team', // Default instructor since we don't have this relationship yet
    //     instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    //     image: program.image_url || `https://images.unsplash.com/photo-1517077177078-19b08548${String(index + 1).padStart(2, '0')}0-4ab5b2d4c5c0`,
    //     rating: 4.5 + (Math.random() * 0.5), // Random rating between 4.5-5.0
    //     studentsCount: Math.floor(Math.random() * 5000) + 1000, // Random students between 1000-6000
    //     duration: `${Math.floor(Math.random() * 20) + 10}h ${Math.floor(Math.random() * 60)}m`, // Random duration
    //     lectures: Math.floor(Math.random() * 50) + 20, // Random lectures between 20-70
    //     price: Math.floor(Math.random() * 200) + 50, // Random price between $50-$250
    //     originalPrice: Math.floor(Math.random() * 100) + 200, // Random original price
    //     level: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)],
    //     language: 'English',
    //     category: 'Technology'
    //   }));

    //   console.log('Courses transformed successfully:', courses.length);
    //   return courses;
    // } catch (error) {
    //   console.error('Error fetching courses from Appwrite:', error);
    //   console.log('Falling back to mock courses');
    //   return this.getMockCourses();
    // }

    // Using static sample data for rapid development
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return sampleCourses;
  },

  async fetchCourses(filters: any): Promise<Course[]> {
    console.log('Fetching courses with filters (using sample data):', filters);
    
    // Using static sample data for rapid development
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
    console.log('Fetching course by id (using sample data):', id);
    
    // Using static sample data for rapid development
    const courses = await this.fetchFeaturedCourses();
    return courses.find(course => course.id === id.toString()) || null;
  },

  async createCourse(courseData: any): Promise<Course> {
    console.log('Creating course (simulated with sample data):', courseData);
    
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
    console.log('Updating course (simulated with sample data):', id, courseData);
    
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
    // This method is kept for backwards compatibility but now returns the same sample data
    return sampleCourses;
  }
};
