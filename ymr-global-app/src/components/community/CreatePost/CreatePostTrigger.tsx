'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Video } from 'lucide-react';

interface CreatePostTriggerProps {
  onClick: () => void;
  onPhotoClick?: () => void;
  onVideoClick?: () => void;
}

export function CreatePostTrigger({
  onClick,
  onPhotoClick,
  onVideoClick,
}: CreatePostTriggerProps) {
  // Mock profile data for now - ideally this comes from a hook
  const profile = { image_url: '', full_name: 'User' };

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <button
          className="flex-1 rounded-full bg-muted px-6 py-3 text-left text-base text-muted-foreground hover:bg-muted/80 transition-colors duration-200 outline-none focus:ring-2 focus:ring-primary/20"
          onClick={onClick}
        >
          Share something...
        </button>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onPhotoClick?.();
              onClick();
            }}
            className="text-muted-foreground hover:text-foreground gap-2 h-9 px-3"
          >
            <ImageIcon className="size-5" />
            <span className="font-medium">Photo</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onVideoClick?.();
              onClick();
            }}
            className="text-muted-foreground hover:text-foreground gap-2 h-9 px-3"
          >
            <Video className="size-5" />
            <span className="font-medium">Video</span>
          </Button>
        </div>
        
        <Button 
            onClick={onClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 rounded-full"
        >
            Post
        </Button>
      </div>
    </div>
  );
}
