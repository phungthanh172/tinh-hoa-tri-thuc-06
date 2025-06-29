
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type Program = Tables<'programs'>;

export const programsApi = {
  async fetchAllPrograms(): Promise<Program[]> {
    console.log('Fetching all programs...');
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching programs:', error);
      throw error;
    }

    console.log('Programs fetched successfully:', data?.length);
    return data || [];
  },

  async fetchProgramBySlug(slug: string): Promise<Program | null> {
    console.log('Fetching program by slug:', slug);
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error('Error fetching program by slug:', error);
      throw error;
    }

    console.log('Program fetched by slug:', data?.title);
    return data;
  }
};
