'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Video, 
  Calendar, 
  BookOpenText, 
  Users2, 
  Play,
  Music,
  Heart,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { DailyInspiration } from '@/components/daily-inspiration'

// --- Mock Data ---
const CATEGORIES = [
  { id: 'sermons', label: 'Sermons', icon: Video, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 'worship', label: 'Worship', icon: Music, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { id: 'bible', label: 'Bible Study', icon: BookOpenText, color: 'text-green-400', bg: 'bg-green-400/10' },
  { id: 'events', label: 'Events', icon: Calendar, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { id: 'groups', label: 'Groups', icon: Users2, color: 'text-pink-400', bg: 'bg-pink-400/10' },
]

const TRENDING_VIDEOS = [
  {
    id: 1,
    title: "Walking in Divine Purpose",
    preacher: "P. Daniel Olawande",
    views: "2.4k views",
    thumbnail: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Understanding The Times",
    preacher: "YMR 2024",
    views: "1.8k views",
    thumbnail: "https://images.unsplash.com/photo-1470229722913-7ea0386db909?w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "The Power of Prayer",
    preacher: "Minister Theophilus",
    views: "3.1k views",
    thumbnail: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&auto=format&fit=crop"
  }
]

const COMMUNITIES = [
  { id: 1, name: "Prayer Warriors", members: 1240, initials: "PW" },
  { id: 2, name: "Bible Study", members: 850, initials: "BS" },
  { id: 3, name: "Worship Team", members: 432, initials: "WT" },
]

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [userAvatar, setUserAvatar] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.user_metadata?.avatar_url) {
        setUserAvatar(user.user_metadata.avatar_url)
      }
    }
    getUser()
  }, [])

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* 1. Header Area */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className="pl-9 bg-secondary/50 border-transparent focus-visible:bg-secondary focus-visible:ring-primary rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Categories Horizontal Scroll */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all
                  ${cat.bg} hover:brightness-110 active:scale-95 border border-transparent hover:border-white/5
                `}
              >
                <cat.icon className={`h-4 w-4 ${cat.color}`} />
                <span className="text-sm font-medium text-foreground">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8 p-4 pt-6">
        
        {/* 2. Daily Inspiration Hero */}
        <section>
          <DailyInspiration />
        </section>

        {/* 3. Trending Sermons (Netflix-style scroll) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Play className="h-5 w-5 text-primary fill-primary" />
              Latest Sermons
            </h2>
            <Link href="/sermons" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              View All
            </Link>
          </div>
          
          <div className="overflow-x-auto -mx-4 px-4 pb-4 scrollbar-hide">
            <div className="flex gap-4">
              {TRENDING_VIDEOS.map(video => (
                <div key={video.id} className="w-[280px] shrink-0 group cursor-pointer">
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                    <Image 
                      src={video.thumbnail} 
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="h-5 w-5 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {video.preacher}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Community Hub Preview */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Users2 className="h-5 w-5 text-primary" />
              Community Hub
            </h2>
            <Link href="/community" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Find Group
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Link href="/hub">
              <div className="p-4 rounded-xl bg-linear-to-br from-primary/10 via-background to-secondary/10 border border-primary/10 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                      alt="Member"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full border-2 object-cover border-primary"
                      style={{ zIndex: 3 }}
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                      alt="Member"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full border-2 object-cover border-primary"
                      style={{ zIndex: 2 }}
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                      alt="Member"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full border-2 object-cover border-primary"
                      style={{ zIndex: 1 }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Join the Conversation</h3>
                    <p className="text-xs text-muted-foreground">Check for new discussions around you</p>
                  </div>
                </div>
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>

            <div className="grid grid-cols-2 gap-3">
               {COMMUNITIES.slice(0, 2).map(group => (
                 <Card key={group.id} className="p-3 bg-secondary/20 border-none hover:bg-secondary/40 transition-colors flex items-center gap-3 cursor-pointer">
                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      {group.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{group.name}</p>
                      <p className="text-[10px] text-muted-foreground">{group.members} members</p>
                    </div>
                 </Card>
               ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
