import { usePosts } from '@/hooks/community/usePosts';
import { PostCard } from './PostCard';
import { Loader2 } from 'lucide-react';

interface FeedListProps {
    groupId?: string;
}

export function FeedList({ groupId }: FeedListProps) {
    const { posts, isLoading, error } = usePosts(groupId);

    if (isLoading) {
        return (
            <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10 text-red-500">
                Failed to load feed. Please try again.
            </div>
        );
    }

    if (!posts || posts.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                No posts yet. Be the first to share something!
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 py-4">
            {posts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
