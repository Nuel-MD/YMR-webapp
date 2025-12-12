'use client';

import { Comment } from '@/types/community';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { Heart, Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// Helper to render content with mentions
const renderContentWithMentions = (content: string) => {
  // Regex to match @username words
  const mentionRegex = /(@[\w\s]+)/g;
  const parts = content.split(mentionRegex);

  return parts.map((part, index) => {
    if (part.match(mentionRegex)) {
      return (
        <span key={index} className="text-[#2E90FA] font-medium cursor-pointer hover:underline">
          {part}
        </span>
      );
    }
    return part;
  });
};

interface CommentCardProps {
  comment: Comment;
  onReply: (comment: Comment) => void;
  onLike?: (commentId: string) => void;
  isReplying?: boolean;
}

export function CommentCard({ comment, onReply, onLike, isReplying }: CommentCardProps) {
  const [isLiked, setIsLiked] = useState(comment.has_liked);
  const [likesCount, setLikesCount] = useState(comment.likes_count);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.(comment.id);
  };

  return (
    <div className="flex gap-3 group">
      <Avatar className="h-8 w-8 border border-neutral-700 mt-1">
        <AvatarImage src={comment.author.image_url || undefined} />
        <AvatarFallback className="bg-neutral-800 text-neutral-400 text-xs">{comment.author.full_name?.[0] || 'U'}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="bg-black/20 rounded-2xl px-4 py-3 border border-white/5 shadow-sm relative hover:bg-black/30 transition-colors">
             <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold text-sm text-neutral-200">{comment.author.full_name}</span>
                  <span className="text-[10px] text-neutral-500 font-medium ml-2">
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                  </span>
             </div>
             
             <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">
                {renderContentWithMentions(comment.content)}
             </p>
        </div>

        <div className="flex items-center gap-4 mt-1 ml-2">
            <button 
                onClick={handleLike}
                className={cn(
                    "flex items-center gap-1.5 text-xs font-semibold transition-colors",
                    isLiked ? "text-red-500" : "text-neutral-500 hover:text-red-400"
                )}
            >
                <Heart className={cn("size-3.5", isLiked && "fill-current")} />
                {likesCount > 0 && <span>{likesCount} Likes</span>}
                {!likesCount && <span className="group-hover:opacity-100 opacity-75">Like</span>}
            </button>
            
            <button 
                onClick={() => onReply(comment)}
                className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-blue-400 transition-colors"
            >
                <Reply className="size-3.5" />
                <span>Reply</span>
            </button>
        </div>
      </div>
    </div>
  );
}
