'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Search, 
  Video, 
  Calendar, 
  BookOpenText, 
  Heart, 
  Users2, 
  ChevronRight,
  TrendingUp,
  Play
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { FeaturedCarousel, FeaturedCarouselSkeleton, FeaturedContent } from '@/components/featured-carousel'

// --- Mock Data for Community Groups (matching groups-view.tsx) ---
const TRENDING_GROUPS = [
  {
    id: '1',
    name: 'Prayer Warriors',
    members: 1240,
    image: null,
    initials: 'PW'
  },
  {
    id: '2',
    name: 'Bible Study: Romans',
    members: 85,
    image: null,
    initials: 'BS'
  },
  {
    id: '3',
    name: 'Worship Leaders',
    members: 432,
    image: null,
    initials: 'WL'
  }
]

// --- Mock Data for Categories ---
const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'sermons', label: 'Sermons' },
  { id: 'worship', label: 'Worship' },
  { id: 'events', label: 'Events' },
  { id: 'bible', label: 'Bible Study' },
  { id: 'youth', label: 'Youth' },
]

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [featuredContent, setFeaturedContent] = useState<FeaturedContent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch Featured Content (reuse logic from Home)
  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient()
      const { data: featuredData } = await supabase
        .from('content')
        .select('id, title, thumbnail_url, media_url, is_live')
        .eq('is_featured', true)
        .order('is_live', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(5)

      if (featuredData) {
        setFeaturedContent(featuredData)
      }
      setIsLoading(false)
    }

    loadData()
  }, [])

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* 1. Header & Search */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border p-4 space-y-4">
        <h1 className="text-2xl font-bold">Discover</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search sermons, events, groups..." 
            className="pl-9 bg-secondary/50 border-transparent focus-visible:bg-secondary focus-visible:ring-primary rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Categories (Horizontal Scroll) */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {CATEGORIES.map(cat => (
                <button 
                  key={cat.id}
                  className="whitespace-nowrap px-4 py-1.5 rounded-full bg-secondary/50 border border-transparent hover:border-primary/50 hover:bg-secondary text-sm font-medium transition-all"
                >
                    {cat.label}
                </button>
            ))}
        </div>
      </div>

      <div className="space-y-8 pt-4">
        
        {/* 2. Featured Content Carousel */}
        <section className="px-4">
           {isLoading ? (
             <FeaturedCarouselSkeleton />
           ) : (
             featuredContent.length > 0 && <FeaturedCarousel items={featuredContent} />
           )}
        </section>

        {/* 3. Quick Access Grid */}
        <section className="px-4">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Explore
            </h2>
            <div className="grid grid-cols-2 gap-3">
                <Link href="/sermons">
                    <Card className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-white/5 border-none bg-gradient-to-br from-secondary/50 to-secondary/30 transition-colors">
                        <Video className="h-6 w-6 text-blue-400" />
                        <span className="font-medium text-sm">Sermons</span>
                    </Card>
                </Link>
                <Link href="/events">
                    <Card className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-white/5 border-none bg-linear-to-br from-secondary/50 to-secondary/30 transition-colors">
                        <Calendar className="h-6 w-6 text-orange-400" />
                        <span className="font-medium text-sm">Events</span>
                    </Card>
                </Link>
                <Link href="/bible">
                    <Card className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-white/5 border-none bg-linear-to-br from-secondary/50 to-secondary/30 transition-colors">
                        <BookOpenText className="h-6 w-6 text-green-400" />
                        <span className="font-medium text-sm">Bible</span>
                    </Card>
                </Link>
                <Link href="/giving">
                    <Card className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-white/5 border-none bg-linear-to-br from-secondary/50 to-secondary/30 transition-colors">
                        <Heart className="h-6 w-6 text-pink-400" />
                        <span className="font-medium text-sm">Give</span>
                    </Card>
                </Link>
            </div>
        </section>

        {/* 4. Community Snippet (Trending Groups) */}
        <section>
            <div className="px-4 mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Users2 className="h-5 w-5 text-primary" />
                    Community
                </h2>
                <Link href="/hub" className="text-xs text-primary font-medium hover:underline">
                    View All
                </Link>
            </div>
            
            {/* Horizontal Scroll List */}
            <div className="overflow-x-auto pb-4 px-4 scrollbar-hide">
                <div className="flex gap-4">
                    {/* Create Group Card (First Item) */}
                    <div className="shrink-0 w-32">
                         <div className="h-full flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer text-center">
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <span className="text-xl text-primary">+</span>
                            </div>
                            <span className="text-xs font-semibold text-primary">Join Interest</span>
                         </div>
                    </div>

                    {TRENDING_GROUPS.map(group => (
                        <div key={group.id} className="shrink-0 w-60">
                            <Card className="p-3 h-full flex items-center gap-3 hover:bg-white/5 transition-colors cursor-pointer border-border/50 bg-secondary/30">
                                <Avatar className="h-12 w-12 rounded-lg">
                                    <AvatarImage src={group.image || ''} />
                                    <AvatarFallback className="rounded-lg bg-primary/20 text-primary font-bold">
                                        {group.initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                    <h3 className="font-medium text-sm truncate">{group.name}</h3>
                                    <p className="text-xs text-muted-foreground">{group.members.toLocaleString()} members</p>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* 5. Trending / Recent Content */}
        <section className="px-4">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Play className="h-5 w-5 text-primary" />
                Trending Now
            </h2>
            <div className="space-y-4">
                {/* Fallback Static Content if no featured content fetched yet or extra static items */}
                <div className="flex gap-3 items-start p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="relative w-32 aspect-video rounded-md overflow-hidden bg-muted">
                        <Image 
                             src="https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&auto=format&fit=crop&q=80" 
                             alt="Thumbnail" 
                             fill 
                             className="object-cover"
                        />
                         <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                             <Play className="h-8 w-8 text-white/80 fill-white/20" />
                         </div>
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                        <h3 className="font-medium text-sm line-clamp-2 leading-tight mb-1">Walking in Divine Purpose - Day 3</h3>
                        <p className="text-xs text-muted-foreground">P. Daniel Olawande • 2.4k views</p>
                    </div>
                </div>

                 <div className="flex gap-3 items-start p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="relative w-32 aspect-video rounded-md overflow-hidden bg-muted">
                        <Image 
                             src="https://images.unsplash.com/photo-1470229722913-7ea0386db909?w=800&auto=format&fit=crop&q=80" 
                             alt="Thumbnail" 
                             fill 
                             className="object-cover"
                        />
                         <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                             <Play className="h-8 w-8 text-white/80 fill-white/20" />
                         </div>
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                        <h3 className="font-medium text-sm line-clamp-2 leading-tight mb-1">Understanding The Times</h3>
                        <p className="text-xs text-muted-foreground">YMR 2024 • 1.8k views</p>
                    </div>
                </div>
            </div>
        </section>

      </div>
    </div>
  )
}
