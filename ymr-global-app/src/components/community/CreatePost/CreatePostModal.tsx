'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePosts } from '@/hooks/community/usePosts';
import { ComposerRoot, ComposerTitle, ComposerEditor, ComposerToolbar, ComposerSubmitButton } from './Composer';

interface CreatePostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupId?: string;
  initialAction?: 'text' | 'photo' | 'video' | null;
}

export function CreatePostModal({ open, onOpenChange, groupId, initialAction }: CreatePostModalProps) {
  const { createPost } = usePosts(groupId);
  // Mock profile - ideally usage of useUserProfile hook
  const profile = { image_url: '', full_name: 'User Name' };

  const handlePostSubmit = async (data: { title: string; content: string; content_text: string; mediaFiles: File[] }) => {
    await createPost.mutateAsync({
      content: data.content,
      content_text: data.content_text,
      mediaFiles: data.mediaFiles,
      groupId
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%] sm:max-w-[600px] p-0 gap-0 overflow-hidden bg-white border border-[#D0D5DD] shadow-xl z-60 rounded-xl sm:rounded-xl">
        <DialogHeader className="p-6 pb-2 border-b border-gray-100 flex flex-row items-center gap-4 space-y-0">
          <Avatar className="h-14 w-14 border border-gray-200">
            <AvatarImage src={profile?.image_url || undefined} />
            <AvatarFallback className="bg-gray-100 text-gray-900 font-semibold text-lg">
              {profile?.full_name?.[0] ?? 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 ">
            <span className="font-medium text-lg text-black text-left">{profile.full_name}</span>
            <span className="text-sm text-gray-500">Post to Community</span>
          </div>
          <DialogTitle className="sr-only">Create Post</DialogTitle>
          <DialogDescription className="sr-only">
             Create a new post to share with the community.
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6 pt-4">
             <ComposerRoot onSubmit={handlePostSubmit} className="gap-2" initialAction={initialAction}>
                <ComposerTitle />
                <ComposerEditor />
                <div className="flex items-center justify-between mt-2 pt-2 ">
                    <ComposerToolbar />
                    <ComposerSubmitButton />
                </div>
             </ComposerRoot>
        </div>
      </DialogContent>
    </Dialog>
  );
}
