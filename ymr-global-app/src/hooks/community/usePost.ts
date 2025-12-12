import { createClient } from '@/lib/supabase/client';
import { Post } from '@/types/community';
import { useQuery } from '@tanstack/react-query';

export function usePost(postId: string) {
  const supabase = createClient();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          author:author_id(id, full_name, image_url),
          media(*),
          reactions(user_id)
        `)
        .eq('id', postId)
        .single();
      
      if (error) throw error;
      
      return {
        ...data,
        author: data.author,
        media: data.media || [],
        has_liked: false, // TODO
        likes_count: data.likes_count || 0
      } as Post;
    },
    enabled: !!postId
  });

  return { post, isLoading, error };
}
