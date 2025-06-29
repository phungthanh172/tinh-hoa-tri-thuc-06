
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type Course = {
  id: string;
  title: string;
  instructor: string;
  image: string;
  rating: number;
  studentsCount: number;
  duration: string;
  price: number;
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
      instructor: 'Elite Education Team', // Default instructor since we don't have this relationship yet
      image: program.image_url || `https://images.unsplash.com/photo-${1517077179-19b085${(index + 1) * 100}-4ab5b2d4c5c0`,
      rating: 4.5 + (Math.random() * 0.5), // Random rating between 4.5-5.0
      studentsCount: Math.floor(Math.random() * 5000) + 1000, // Random students between 1000-6000
      duration: `${Math.floor(Math.random() * 20) + 10}h ${Math.floor(Math.random() * 60)}m`, // Random duration
      price: Math.floor(Math.random() * 200) + 50 // Random price between $50-$250
    }));

    console.log('Courses transformed successfully:', courses.length);
    return courses;
  },

  getMockCourses(): Course[] {
    return [
      {
        id: '1',
        title: 'Complete JavaScript Mastery',
        instructor: 'Sarah Johnson',
        image: 'https://images.unsplash.com/photo-1517077177078-19b085480c5c',
        rating: 4.8,
        studentsCount: 12547,
        duration: '42h 15m',
        price: 89
      },
      {
        id: '2',
        title: 'React Development Bootcamp',
        instructor: 'Mike Chen',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
        rating: 4.9,
        studentsCount: 8932,
        duration: '38h 30m',
        price: 129
      },
      {
        id: '3',
        title: 'Python for Data Science',
        instructor: 'Dr. Amanda Rodriguez',
        image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935',
        rating: 4.7,
        studentsCount: 15673,
        duration: '55h 45m',
        price: 149
      }
    ];
  }
};
