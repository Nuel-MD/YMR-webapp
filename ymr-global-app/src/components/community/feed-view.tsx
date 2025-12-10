'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'

// Mock Data
const POSTS = [
  {
    id: '1',
    user: {
      name: 'Sarah Williams',
      avatar: '/avatars/sarah.jpg',
      initials: 'SW'
    },
    time: '2 hours ago',
    content: 'Just finished reading the book of James. "Faith without works is dead." Such a powerful reminder that our belief must be accompanied by action! 🙏✨',
    likes: 24,
    comments: 5,
    image: null
  },
  {
    id: '2',
    user: {
      name: 'YMR Official',
      avatar: '/images/YMR-LOGO-NEW.png',
      initials: 'YMR'
    },
    time: '5 hours ago',
    content: 'Who is ready for the upcoming retreat? We have some amazing speakers lined up! Tag a friend you want to bring along. 🔥',
    likes: 156,
    comments: 42,
    image: '/images/YMR1.jpg'
  },
  {
    id: '3',
    user: {
      name: 'David Chen',
      avatar: null,
      initials: 'DC'
    },
    time: '1 day ago',
    content: 'Prayer request: Please pray for my grandmother who is undergoing surgery tomorrow. Believing for a complete healing!',
    likes: 89,
    comments: 34,
    image: null
  }
]

export function FeedView() {
  return (
    <div className="space-y-4 pb-20">
      {/* Create Post Input */}
      <Card className="p-4 flex gap-4 items-center border-2 border-border/40 shadow-sm">
        <Avatar>
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <input 
            type="text" 
            placeholder="Share your testimony or prayer request..." 
            className="w-full bg-transparent border-none focus:outline-none text-sm"
          />
        </div>
        <Button size="sm" variant="ghost">Post</Button>
      </Card>

      {/* Posts Feed */}
      {POSTS.map(post => (
        <Card key={post.id} className="p-5 space-y-4 border-2 border-border/40 shadow-md hover:shadow-lg transition-shadow">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.user.avatar || ''} />
                <AvatarFallback>{post.user.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm">{post.user.name}</h3>
                <p className="text-xs text-muted-foreground">{post.time}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>

          {/* Image Attachment */}
          {post.image && (
            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-muted border border-border/30">
              <Image 
                src={post.image} 
                alt="Post content" 
                fill 
                className="object-cover"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t-2 border-border/30">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-red-500">
              <Heart className="h-4 w-4" />
              <span>{post.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-blue-500">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-green-500">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
