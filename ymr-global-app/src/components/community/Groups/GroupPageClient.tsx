'use client';

import { useGroup } from '@/hooks/community/useGroup';
import { GroupHeader } from './GroupHeader';
import { FeedList } from '@/components/community/Feed/FeedList';
import { CreatePostTrigger } from '@/components/community/CreatePost/CreatePostTrigger';
import { CreatePostModal } from '@/components/community/CreatePost/CreatePostModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface GroupPageClientProps {
  groupId: string;
}

export function GroupPageClient({ groupId }: GroupPageClientProps) {
  const { group, isLoading, error } = useGroup(groupId);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="flex h-screen items-center justify-center text-destructive">
        Group not found or error loading group.
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-20">
      <GroupHeader group={group} />

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Tabs defaultValue="discussion" className="w-full">
            <TabsList className="w-full bg-transparent p-0 h-auto border-b border-border justify-start rounded-none">
                <TabsTrigger 
                    value="discussion" 
                    className="rounded-none border-0 border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-medium data-[state=active]:border-b-[#277C28]! data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                    Discussion
                </TabsTrigger>
                <TabsTrigger 
                    value="media" 
                    className="rounded-none border-0 border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-medium data-[state=active]:border-b-[#277C28]! data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                    Media
                </TabsTrigger>
                <TabsTrigger 
                    value="members" 
                    className="rounded-none border-0 border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-medium data-[state=active]:border-b-[#277C28]! data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                    Members
                </TabsTrigger>
                <TabsTrigger 
                    value="about" 
                    className="rounded-none border-0 border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-medium data-[state=active]:border-b-[#277C28]! data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                    About
                </TabsTrigger>
            </TabsList>

            <TabsContent value="discussion" className="mt-6">
                 {/* Create Post Trigger */}
                 <div className="max-w-2xl mb-6">
                    <CreatePostTrigger onClick={() => setIsCreatePostOpen(true)} />
                 </div>
                 {/* Feed */}
                 <div className="max-w-2xl">
                    <FeedList groupId={groupId} />
                 </div>
            </TabsContent>

            <TabsContent value="media" className="mt-6">
                <div className="text-center py-10 text-muted-foreground border rounded-lg bg-card">Media coming soon...</div>
            </TabsContent>
            
             <TabsContent value="members" className="mt-6">
                <div className="text-center py-10 text-muted-foreground border rounded-lg bg-card">Members list coming soon...</div>
            </TabsContent>

            <TabsContent value="about" className="mt-6">
                <div className="max-w-2xl bg-card p-6 rounded-lg border">
                    <h3 className="font-bold text-lg mb-4 text-foreground">About this Group</h3>
                    <p className="text-muted-foreground mb-4">{group.description}</p>
                    
                    {group.about_image_url && (
                        <div className="rounded-lg overflow-hidden mt-4">
                             <img src={group.about_image_url} alt="Group About" className="w-full" />
                        </div>
                    )}
                </div>
            </TabsContent>
        </Tabs>
      </div>

      <CreatePostModal 
        open={isCreatePostOpen} 
        onOpenChange={setIsCreatePostOpen} 
        groupId={groupId}
      />
    </div>
  );
}
