
// Appwrite Configuration
// Replace these with your actual Appwrite credentials from your console

export const APPWRITE_CONFIG = {
  endpoint: 'https://cloud.appwrite.io/v1', // Your Appwrite Endpoint
  projectId: 'your-project-id', // Your Appwrite Project ID
  databaseId: 'your-database-id', // Your Database ID
  
  // Collection IDs - replace with your actual collection IDs
  collections: {
    programs: 'programs',
    teachers: 'teachers',
    articles: 'articles',
    testimonials: 'testimonials',
    contactSubmissions: 'contact_submissions'
  }
};
