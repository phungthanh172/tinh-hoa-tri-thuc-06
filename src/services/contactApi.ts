
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

export type ContactSubmission = Tables<'contact_submissions'>;
export type ContactSubmissionInsert = TablesInsert<'contact_submissions'>;

export const contactApi = {
  async submitContactForm(submission: Omit<ContactSubmissionInsert, 'id' | 'submitted_at' | 'status'>): Promise<ContactSubmission> {
    console.log('Submitting contact form:', submission);
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert(submission)
      .select()
      .single();

    if (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }

    console.log('Contact form submitted successfully:', data.id);
    return data;
  },

  async fetchAllSubmissions(): Promise<ContactSubmission[]> {
    console.log('Fetching all contact submissions...');
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('Error fetching contact submissions:', error);
      throw error;
    }

    console.log('Contact submissions fetched successfully:', data?.length);
    return data || [];
  }
};
