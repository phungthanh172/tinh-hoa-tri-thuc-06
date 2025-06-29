
import { databases } from '@/lib/appwrite';
import { ID, Query } from 'appwrite';

// Database and Collection IDs - you'll need to replace these with your actual IDs
const DATABASE_ID = 'your-database-id';
const COLLECTIONS = {
  PROGRAMS: 'programs',
  TEACHERS: 'teachers',
  ARTICLES: 'articles',
  TESTIMONIALS: 'testimonials',
  CONTACT_SUBMISSIONS: 'contact_submissions'
};

export const appwriteApi = {
  // Programs API
  async fetchAllPrograms() {
    console.log('Fetching all programs from Appwrite...');
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.PROGRAMS,
        [Query.orderDesc('$createdAt')]
      );
      console.log('Programs fetched successfully:', response.documents.length);
      return response.documents;
    } catch (error) {
      console.error('Error fetching programs:', error);
      throw error;
    }
  },

  async fetchProgramBySlug(slug: string) {
    console.log('Fetching program by slug:', slug);
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.PROGRAMS,
        [Query.equal('slug', slug)]
      );
      console.log('Program fetched by slug:', response.documents[0]?.title);
      return response.documents[0] || null;
    } catch (error) {
      console.error('Error fetching program by slug:', error);
      throw error;
    }
  },

  // Teachers API
  async fetchAllTeachers() {
    console.log('Fetching all teachers from Appwrite...');
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.TEACHERS,
        [Query.orderDesc('$createdAt')]
      );
      console.log('Teachers fetched successfully:', response.documents.length);
      return response.documents;
    } catch (error) {
      console.error('Error fetching teachers:', error);
      throw error;
    }
  },

  async fetchTeacherById(id: string) {
    console.log('Fetching teacher by id:', id);
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.TEACHERS,
        id
      );
      console.log('Teacher fetched by id:', response.name);
      return response;
    } catch (error) {
      console.error('Error fetching teacher by id:', error);
      throw error;
    }
  },

  // Articles API
  async fetchAllArticles() {
    console.log('Fetching all articles from Appwrite...');
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ARTICLES,
        [Query.orderDesc('published_at')]
      );
      console.log('Articles fetched successfully:', response.documents.length);
      return response.documents;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  },

  async fetchArticleBySlug(slug: string) {
    console.log('Fetching article by slug:', slug);
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ARTICLES,
        [Query.equal('slug', slug)]
      );
      console.log('Article fetched by slug:', response.documents[0]?.title);
      return response.documents[0] || null;
    } catch (error) {
      console.error('Error fetching article by slug:', error);
      throw error;
    }
  },

  // Testimonials API
  async fetchAllTestimonials() {
    console.log('Fetching all testimonials from Appwrite...');
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.TESTIMONIALS,
        [Query.orderDesc('$createdAt')]
      );
      console.log('Testimonials fetched successfully:', response.documents.length);
      return response.documents;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  },

  // Contact Submissions API
  async submitContactForm(submission: any) {
    console.log('Submitting contact form to Appwrite:', submission);
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.CONTACT_SUBMISSIONS,
        ID.unique(),
        {
          ...submission,
          submitted_at: new Date().toISOString(),
          status: 'NEW'
        }
      );
      console.log('Contact form submitted successfully:', response.$id);
      return response;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },

  async fetchAllSubmissions() {
    console.log('Fetching all contact submissions from Appwrite...');
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.CONTACT_SUBMISSIONS,
        [Query.orderDesc('$createdAt')]
      );
      console.log('Contact submissions fetched successfully:', response.documents.length);
      return response.documents;
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      throw error;
    }
  }
};
