
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type Testimonial = Tables<'testimonials'>;
export type TestimonialWithProgram = Testimonial & {
  programs: Tables<'programs'> | null;
};

export const testimonialsApi = {
  async fetchAllTestimonials(): Promise<TestimonialWithProgram[]> {
    console.log('Fetching all testimonials...');
    const { data, error } = await supabase
      .from('testimonials')
      .select(`
        *,
        programs (
          *
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }

    console.log('Testimonials fetched successfully:', data?.length);
    return data || [];
  }
};
