
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type Teacher = Tables<'teachers'>;

export const teachersApi = {
  async fetchAllTeachers(): Promise<Teacher[]> {
    console.log('Fetching all teachers...');
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching teachers:', error);
      throw error;
    }

    console.log('Teachers fetched successfully:', data?.length);
    return data || [];
  },

  async fetchTeacherById(id: string): Promise<Teacher | null> {
    console.log('Fetching teacher by id:', id);
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching teacher by id:', error);
      throw error;
    }

    console.log('Teacher fetched by id:', data?.name);
    return data;
  }
};
