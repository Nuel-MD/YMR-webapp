import { createClient } from '@/lib/supabase/client';
import { Comment } from '@/types/community';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { MOCK_COMMENTS, MOCK_USERS, getCommentsForPost, getRepliesForComment } from '@/lib/mockData/community';

const USE_MOCK_DATA = true;

export function useComments(postId: string) {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const { data: comments, isLoading, error } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Get top-level comments
        const topLevelComments = getCommentsForPost(postId);
        
        // Add replies to each comment
        return topLevelComments.map(comment => ({
          ...comment,
          replies: getRepliesForComment(comment.id),
        }));
      }

      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          author:author_id(id, full_name, avatar_url)
        `)
        .eq('post_id', postId)
        .is('parent_id', null)
        .order('created_at', { ascending: true });
      
      if (error) throw error;

      // Fetch replies for each comment
      const commentsWithReplies = await Promise.all(
        (data || []).map(async (comment: any) => {
          const { data: replies } = await supabase
            .from('comments')
            .select(`
              *,
              author:author_id(id, full_name, avatar_url)
            `)
            .eq('parent_id', comment.id)
            .order('created_at', { ascending: true });

          return {
            ...comment,
            author: comment.author ? {
              id: comment.author.id,
              full_name: comment.author.full_name,
              image_url: comment.author.avatar_url
            } : null,
            replies: (replies || []).map((reply: any) => ({
              ...reply,
              author: reply.author ? {
                id: reply.author.id,
                full_name: reply.author.full_name,
                image_url: reply.author.avatar_url
              } : null,
            })),
          };
        })
      );

      return commentsWithReplies as Comment[];
    },
    enabled: !!postId
  });

  const addComment = useMutation({
    mutationFn: async ({ content, parentId }: { content: string; parentId?: string }) => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const newComment: Comment = {
          id: `comment-${Date.now()}`,
          post_id: postId,
          author_id: 'current-user',
          author: MOCK_USERS[4], // Current user
          parent_id: parentId || null,
          content,
          likes_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
        };

        MOCK_COMMENTS.push(newComment);
        return newComment;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          author_id: user.id,
          parent_id: parentId || null,
          content,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      toast.success('Comment added');
    },
    onError: () => {
      toast.error('Failed to add comment');
    },
  });

  return { comments, isLoading, error, addComment };
}
