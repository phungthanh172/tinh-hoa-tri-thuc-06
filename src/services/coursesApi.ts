
// Mock API service for courses - replace with real API calls when backend is ready
export interface Course {
  id: number;
  title: string;
  instructor: string;
  instructorAvatar: string;
  rating: number;
  reviewCount: number;
  studentsCount: number;
  duration: string;
  lectures: number;
  price: number;
  originalPrice: number;
  image: string;
  bestseller: boolean;
  level: string;
  lastUpdated: string;
  description: string;
  subtitle?: string;
  category?: string;
  language?: string;
}

// Mock data - this would come from your backend
const mockCourses: Course[] = [
  {
    id: 1,
    title: "The Complete JavaScript Course 2024: From Zero to Expert!",
    instructor: "Jonas Schmedtmann",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    rating: 4.7,
    reviewCount: 289456,
    studentsCount: 756843,
    duration: "69 total hours",
    lectures: 320,
    price: 84.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=200&fit=crop",
    bestseller: true,
    level: "All Levels",
    lastUpdated: "11/2023",
    description: "Learn modern JavaScript from scratch! Master JavaScript with projects, challenges and theory.",
    subtitle: "The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory.",
    category: "Development",
    language: "English"
  },
  {
    id: 2,
    title: "React - The Complete Guide 2024 (incl. Next.js, Redux)",
    instructor: "Maximilian Schwarzmüller",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    rating: 4.6,
    reviewCount: 152341,
    studentsCount: 434567,
    duration: "48.5 total hours",
    lectures: 835,
    price: 89.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
    bestseller: true,
    level: "Intermediate",
    lastUpdated: "12/2023",
    description: "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
    subtitle: "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
    category: "Development",
    language: "English"
  },
  {
    id: 3,
    title: "Node.js Complete Developer Course",
    instructor: "Andrew Mead",
    instructorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
    rating: 4.7,
    reviewCount: 80000,
    studentsCount: 95000,
    duration: "35 hours",
    lectures: 156,
    price: 69.99,
    originalPrice: 149.99,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
    bestseller: false,
    level: "Intermediate",
    lastUpdated: "10/2023",
    description: "Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!",
    subtitle: "Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!",
    category: "Development",
    language: "English"
  }
];

// API functions
export const coursesApi = {
  // Fetch all courses with optional filters
  fetchCourses: async (filters?: {
    category?: string;
    level?: string;
    rating?: number;
    duration?: string;
    language?: string;
    price?: string;
    search?: string;
  }): Promise<Course[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredCourses = [...mockCourses];
    
    if (filters?.search) {
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
        course.instructor.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }
    
    if (filters?.category) {
      filteredCourses = filteredCourses.filter(course => course.category === filters.category);
    }
    
    if (filters?.level) {
      filteredCourses = filteredCourses.filter(course => course.level === filters.level);
    }
    
    if (filters?.rating) {
      filteredCourses = filteredCourses.filter(course => course.rating >= filters.rating!);
    }
    
    return filteredCourses;
  },

  // Fetch featured courses
  fetchFeaturedCourses: async (): Promise<Course[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCourses.filter(course => course.bestseller).slice(0, 3);
  },

  // Fetch single course by ID
  fetchCourseById: async (id: number): Promise<Course | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCourses.find(course => course.id === id) || null;
  },

  // Create new course (for instructors)
  createCourse: async (courseData: Omit<Course, 'id'>): Promise<Course> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newCourse = {
      ...courseData,
      id: Math.max(...mockCourses.map(c => c.id)) + 1
    };
    mockCourses.push(newCourse);
    return newCourse;
  },

  // Update existing course
  updateCourse: async (id: number, courseData: Partial<Course>): Promise<Course> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const courseIndex = mockCourses.findIndex(course => course.id === id);
    if (courseIndex === -1) {
      throw new Error('Course not found');
    }
    mockCourses[courseIndex] = { ...mockCourses[courseIndex], ...courseData };
    return mockCourses[courseIndex];
  },

  // Delete course
  deleteCourse: async (id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const courseIndex = mockCourses.findIndex(course => course.id === id);
    if (courseIndex !== -1) {
      mockCourses.splice(courseIndex, 1);
    }
  }
};
