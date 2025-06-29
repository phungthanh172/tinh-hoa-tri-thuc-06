
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type Article = Tables<'articles'>;
export type ArticleWithAuthor = Article & {
  teachers: Tables<'teachers'> | null;
};

export const articlesApi = {
  async fetchAllArticles(): Promise<ArticleWithAuthor[]> {
    console.log('Fetching all articles...');
    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        teachers (
          *
        )
      `)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }

    console.log('Articles fetched successfully:', data?.length);
    return data || [];
  },

  async fetchArticleBySlug(slug: string): Promise<ArticleWithAuthor | null> {
    console.log('Fetching article by slug:', slug);
    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        teachers (
          *
        )
      `)
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error('Error fetching article by slug:', error);
      throw error;
    }

    console.log('Article fetched by slug:', data?.title);
    return data;
  }
};
