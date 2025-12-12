'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CreatePostTrigger } from './CreatePost/CreatePostTrigger'
import { CreatePostModal } from './CreatePost/CreatePostModal'
import { FeedList } from './Feed/FeedList'
import { useState } from 'react'

export function FeedView() {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [initialAction, setInitialAction] = useState<'text' | 'photo' | 'video' | null>(null)

  const handleOpen = (action: 'text' | 'photo' | 'video' = 'text') => {
    setInitialAction(action)
    setIsCreatePostOpen(true)
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Create Post Trigger */}
      <CreatePostTrigger 
        onClick={() => handleOpen('text')} 
        onPhotoClick={() => handleOpen('photo')}
        onVideoClick={() => handleOpen('video')}
      />

      {/* Posts Feed */}
      <FeedList />

      {/* Create Post Modal */}
      <CreatePostModal 
        open={isCreatePostOpen} 
        onOpenChange={setIsCreatePostOpen} 
        initialAction={initialAction}
      />
    </div>
  )
}
