import { CommentSection } from '@/components/community/Comments/CommentSection';
import { Post } from '@/types/community';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, MoreVertical, Pin, Send, Image as ImageIcon, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useState, useRef, useEffect } from 'react';
import { PostContentRenderer } from './PostContentRenderer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useComments } from '@/hooks/community/useComments'; // Assuming this hook exists or I should use it for the quick comment input

// Simplified Avatar
const UserAvatar = ({ src, name }: { src?: string | null, name?: string | null }) => (
  <Avatar className="h-10 w-10 border border-neutral-700">
    <AvatarImage src={src || undefined} alt={name || 'User'} />
    <AvatarFallback className="bg-neutral-800 text-neutral-400">{name?.[0] || 'U'}</AvatarFallback>
  </Avatar>
);

interface PostCardProps {
  post: Post;
  defaultShowComments?: boolean;
}

export function PostCard({ post, defaultShowComments = false }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.has_liked);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [showComments, setShowComments] = useState(defaultShowComments);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Quick comment state
  const [quickComment, setQuickComment] = useState('');
  const { addComment } = useComments(post.id); // Assuming hook can be used here. If not, I might need to move this logic.

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    // TODO: Call API
  };

  useEffect(() => {
    if (contentRef.current) {
        // 200px is roughly line-clamp-3 height for standard text, adjust as needed or use line-clamp logic check
        if (contentRef.current.scrollHeight > 150) { 
            setShowReadMore(true);
        }
    }
  }, [post.content]);

  const handleQuickCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickComment.trim()) return;
    await addComment.mutateAsync({ content: quickComment });
    setQuickComment('');
    setShowComments(true); // Open comments to show the new one
  };

  return (
    <Card className="mb-4 overflow-hidden border rounded-xl bg-[#17302E] shadow-sm">
      {/* Pinned Header */}
      {post.is_pinned && (
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1f3d3b] border-b border-border/20 text-xs font-semibold text-primary">
            <Pin className="h-3 w-3 fill-current" />
            <span>Pinned Post</span>
        </div>
      )}

      <CardHeader className="flex flex-row items-center gap-3 p-4 pb-2 space-y-0">
        <UserAvatar src={post.author.image_url} name={post.author.full_name} />
        <div className="flex flex-col">
            <span className="font-semibold text-sm text-neutral-100">{post.author.full_name || 'Unknown User'}</span>
            <span className="text-xs text-neutral-400">{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800/50">
            <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
         {post.title && <h3 className="font-bold mb-2 text-lg text-neutral-50">{post.title}</h3>}
         
         <div className="relative">
             <div 
                ref={contentRef}
                className={cn(
                    "transition-all duration-300",
                    !isExpanded && showReadMore ? "max-h-[150px] overflow-hidden mask-linear-gradient" : ""
                )}
             >
                <PostContentRenderer content={post.content} />
             </div>
             
             {showReadMore && (
                 <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xs font-medium text-blue-400 hover:text-blue-300 mt-2 block focus:outline-none"
                 >
                    {isExpanded ? "See Less" : "See More"}
                 </button>
             )}
         </div>

      </CardContent>
      
      <CardFooter className="flex-col p-0 bg-transparent">
        {/* Metrics Row */}
        <div className="flex w-full justify-between items-center px-4 py-3 border-t border-border/10">
             <Button variant="ghost" size="sm" className={`gap-1.5 h-8 px-2 text-neutral-400 hover:text-red-500 hover:bg-red-500/10 ${isLiked ? 'text-red-500' : ''}`} onClick={handleLike}>
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-xs">{likesCount}</span>
            </Button>
            
            <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="gap-1.5 h-8 px-2 text-neutral-400 hover:text-blue-400 hover:bg-blue-400/10" onClick={() => setShowComments(!showComments)}>
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs">{post.comments_count}</span>
                </Button>
            </div>
        </div>
        
        {/* Quick Comment Input */}
        <div className="w-full px-4 pb-4">
             <form onSubmit={handleQuickCommentSubmit} className="relative flex items-center gap-2">
                <Avatar className="h-8 w-8">
                     {/* Current user avatar would go here, using generic fallback for now */}
                    <AvatarFallback className="text-xs">U</AvatarFallback>
                </Avatar>
                <div className="flex-1 relative">
                    <input 
                        type="text" 
                        value={quickComment}
                        onChange={(e) => setQuickComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full h-9 bg-neutral-900/50 border border-neutral-700/50 rounded-full pl-4 pr-10 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                         <Button type="button" size="icon" variant="ghost" className="h-6 w-6 rounded-full text-neutral-400 hover:text-neutral-200">
                            <ImageIcon className="h-3.5 w-3.5" />
                         </Button>
                    </div>
                </div>
                 {quickComment && (
                    <Button type="submit" size="icon" variant="ghost" className="h-8 w-8 rounded-full text-blue-400 hover:bg-blue-400/10">
                        <Send className="h-4 w-4" />
                    </Button>
                 )}
             </form>
        </div>

        {showComments && (
            <div className="w-full px-4 border-t border-border/10 bg-black/20">
                 <CommentSection postId={post.id} />
            </div>
        )}
      </CardFooter>
    </Card>
  );
}
