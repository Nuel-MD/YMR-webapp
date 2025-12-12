import { useComments } from '@/hooks/community/useComments';
import { Comment } from '@/types/community';
import { Button } from '@/components/ui/button';
import { Loader2, Send, Image as ImageIcon, Smile, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { CommentCard } from './CommentCard';

interface CommentSectionProps {
    postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
    const { comments, isLoading, addComment } = useComments(postId);
    const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

    if (isLoading) {
        return <div className="py-4 flex justify-center"><Loader2 className="size-5 animate-spin text-neutral-400" /></div>;
    }

    const handleReply = (comment: Comment) => {
        setActiveReplyId(comment.id);
    };

    return (
        <div className="pt-4  mt-2 mb-6">
            <div className="space-y-6 mb-6">
                {(comments || []).map(comment => (
                    <Thread 
                        key={comment.id} 
                        comment={comment} 
                        postId={postId} 
                        activeReplyId={activeReplyId}
                        onReply={handleReply}
                        onCancelReply={() => setActiveReplyId(null)}
                    />
                ))}
            </div>
            
            {/* Main Comment Input */}
            <CommentInput 
                onSubmit={async (text, file) => {
                    await addComment.mutateAsync({ content: text });
                }}
                placeholder="Write a comment..."
            />
        </div>
    );
}

// Thread Component to handle hierarchy
function Thread({ 
    comment, 
    postId, 
    activeReplyId, 
    onReply,
    onCancelReply
}: { 
    comment: Comment, 
    postId: string, 
    activeReplyId: string | null,
    onReply: (c: Comment) => void,
    onCancelReply: () => void
}) {
    const { addComment } = useComments(postId);

    return (
        <div className="flex flex-col gap-3">
            <CommentCard 
                comment={comment} 
                onReply={onReply} 
            />
            
            {/* Reply Input */}
            {activeReplyId === comment.id && (
                <div className="ml-11 mt-2 mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    <CommentInput 
                        initialContent={`@${comment.author.full_name} `}
                        onSubmit={async (text, file) => {
                            await addComment.mutateAsync({ content: text, parentId: comment.id });
                            onCancelReply();
                        }}
                        placeholder={`Reply to ${comment.author.full_name}...`}
                        isReply
                        autoFocus
                        onCancel={onCancelReply}
                    />
                </div>
            )}

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="ml-4 pl-4 border-l-2 border-neutral-800/20 space-y-4 py-2">
                    {comment.replies.map(reply => (
                        <Thread 
                            key={reply.id} 
                            comment={reply} 
                            postId={postId}
                            activeReplyId={activeReplyId}
                            onReply={onReply}
                            onCancelReply={onCancelReply}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// ... imports
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// ... (other components unchanged)

// Reusable Rich Input Component
function CommentInput({ 
    onSubmit, 
    placeholder, 
    initialContent = '',
    isReply = false,
    autoFocus = false,
    onCancel
}: { 
    onSubmit: (text: string, file: File | null) => Promise<void>, 
    placeholder?: string,
    initialContent?: string,
    isReply?: boolean,
    autoFocus?: boolean,
    onCancel?: () => void
}) {
    const [content, setContent] = useState(initialContent);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() && !selectedFile) return;

        setIsSubmitting(true);
        try {
            await onSubmit(content, selectedFile);
            setContent('');
            setSelectedFile(null);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };
    
    const onEmojiClick = (emojiData: EmojiClickData) => {
        setContent(prev => prev + emojiData.emoji);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-black/20 p-2 rounded-2xl border border-white/10 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-transparent border-none focus:outline-none resize-none px-2 py-1 text-sm min-h-[40px] max-h-[120px] text-neutral-200 placeholder:text-neutral-500"
                rows={isReply ? 2 : 1}
                autoFocus={autoFocus}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                    }
                }}
            />
            
            {selectedFile && (
                <div className="relative w-fit mx-2 mb-2 group">
                    <div className="h-16 w-16 rounded-lg border border-white/10 overflow-hidden bg-white/5">
                        <img src={URL.createObjectURL(selectedFile)} className="h-full w-full object-cover opacity-80" alt="Preview" />
                    </div>
                    <button 
                        type="button"
                        onClick={() => setSelectedFile(null)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                    >
                        <X className="size-3" />
                    </button>
                </div>
            )}

            <div className="flex justify-between items-center px-1">
                <div className="flex gap-1 text-neutral-500">
                    <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        className="p-1.5 hover:bg-white/10 hover:text-neutral-300 rounded-full transition-colors"
                    >
                        <ImageIcon className="size-4" />
                    </button>
                    
                    <Popover>
                        <PopoverTrigger asChild>
                            <button type="button" className="p-1.5 hover:bg-white/10 hover:text-neutral-300 rounded-full transition-colors">
                                <Smile className="size-4" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 border-none shadow-none bg-transparent w-auto">
                            <EmojiPicker onEmojiClick={onEmojiClick} theme={'dark' as any} />
                        </PopoverContent>
                    </Popover>

                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileSelect}
                    />
                </div>
                
                <div className="flex gap-2">
                     {onCancel && (
                        <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={onCancel}
                            className="text-neutral-500 hover:text-neutral-300 hover:bg-white/5 h-8 text-xs"
                        >
                            Cancel
                        </Button>
                     )}
                     <Button 
                        type="submit" 
                        size="sm" 
                        disabled={!content.trim() && !selectedFile || isSubmitting} 
                        className="rounded-full h-8 px-4 text-xs bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? <Loader2 className="size-3 animate-spin" /> : (isReply ? 'Reply' : 'Post')}
                    </Button>
                </div>
            </div>
        </form>
    );
}

