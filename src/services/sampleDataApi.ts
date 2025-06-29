
import { supabase } from '@/integrations/supabase/client';

export const sampleDataApi = {
  async insertSampleData() {
    console.log('Inserting sample data...');
    
    try {
      // Insert sample teachers
      const { data: teachers, error: teachersError } = await supabase
        .from('teachers')
        .insert([
          {
            name: 'Dr. Sarah Johnson',
            title: 'Senior Software Engineer',
            bio: 'Expert in JavaScript and React with over 10 years of experience in web development.',
            image_url: 'https://images.unsplash.com/photo-1494790108755-2616b4e10db4',
            specialties: ['JavaScript', 'React', 'Node.js']
          },
          {
            name: 'Prof. Michael Chen',
            title: 'Data Science Consultant',
            bio: 'Leading data scientist with expertise in Python, machine learning, and statistical analysis.',
            image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            specialties: ['Python', 'Machine Learning', 'Data Analysis']
          },
          {
            name: 'Dr. Amanda Rodriguez',
            title: 'UI/UX Design Director',
            bio: 'Creative director with a passion for user-centered design and modern web interfaces.',
            image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
            specialties: ['UI/UX Design', 'Figma', 'User Research']
          }
        ])
        .select();

      if (teachersError) throw teachersError;
      console.log('Teachers inserted:', teachers?.length);

      // Insert sample programs
      const { data: programs, error: programsError } = await supabase
        .from('programs')
        .insert([
          {
            title: 'Complete JavaScript Mastery',
            slug: 'complete-javascript-mastery',
            summary: 'Master JavaScript from basics to advanced concepts',
            full_description: 'This comprehensive course covers everything you need to know about JavaScript, from basic syntax to advanced concepts like closures, promises, and async/await.',
            target_audience: 'Beginners to intermediate developers',
            image_url: 'https://images.unsplash.com/photo-1517077177078-19b085480c5c'
          },
          {
            title: 'React Development Bootcamp',
            slug: 'react-development-bootcamp',
            summary: 'Build modern web applications with React',
            full_description: 'Learn to build scalable web applications using React, including hooks, context, routing, and state management.',
            target_audience: 'JavaScript developers looking to learn React',
            image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee'
          },
          {
            title: 'Python for Data Science',
            slug: 'python-for-data-science',
            summary: 'Analyze data and build machine learning models',
            full_description: 'Comprehensive data science course using Python, pandas, numpy, and scikit-learn for data analysis and machine learning.',
            target_audience: 'Aspiring data scientists and analysts',
            image_url: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935'
          }
        ])
        .select();

      if (programsError) throw programsError;
      console.log('Programs inserted:', programs?.length);

      // Insert sample articles
      if (teachers && teachers.length > 0) {
        const { data: articles, error: articlesError } = await supabase
          .from('articles')
          .insert([
            {
              title: 'The Future of Web Development',
              slug: 'future-of-web-development',
              summary: 'Exploring upcoming trends and technologies in web development',
              content: 'Web development continues to evolve rapidly. In this article, we explore the latest trends including serverless architecture, JAMstack, and the rise of component-based frameworks...',
              author_id: teachers[0].id,
              tags: ['Web Development', 'Technology', 'Trends'],
              image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'
            },
            {
              title: 'Machine Learning Fundamentals',
              slug: 'machine-learning-fundamentals',
              summary: 'Understanding the basics of machine learning and AI',
              content: 'Machine learning is transforming industries worldwide. This comprehensive guide covers the fundamental concepts, algorithms, and practical applications...',
              author_id: teachers[1].id,
              tags: ['Machine Learning', 'AI', 'Data Science'],
              image_url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c'
            }
          ])
          .select();

        if (articlesError) throw articlesError;
        console.log('Articles inserted:', articles?.length);
      }

      // Insert sample testimonials
      if (programs && programs.length > 0) {
        const { data: testimonials, error: testimonialsError } = await supabase
          .from('testimonials')
          .insert([
            {
              student_name: 'Alex Thompson',
              course_taken_id: programs[0].id,
              quote: 'This course completely transformed my understanding of JavaScript. The instructor explains complex concepts in a way that\'s easy to understand.',
              student_image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
            },
            {
              student_name: 'Emily Davis',
              course_taken_id: programs[1].id,
              quote: 'The React bootcamp gave me the confidence to build my own projects. Now I\'m working as a frontend developer!',
              student_image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
            },
            {
              student_name: 'David Kim',
              course_taken_id: programs[2].id,
              quote: 'Excellent introduction to data science. The hands-on projects really helped solidify the concepts.',
              student_image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
            }
          ])
          .select();

        if (testimonialsError) throw testimonialsError;
        console.log('Testimonials inserted:', testimonials?.length);
      }

      console.log('Sample data insertion completed successfully!');
      return { success: true, message: 'Sample data inserted successfully' };

    } catch (error) {
      console.error('Error inserting sample data:', error);
      throw error;
    }
  }
};
