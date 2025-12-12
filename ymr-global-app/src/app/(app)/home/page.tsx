'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Users, HandHeart, Calendar, Play, Users2 } from 'lucide-react'
import Image from 'next/image'

import Link from 'next/link'
import { FeaturedCarousel, FeaturedCarouselSkeleton, FeaturedContent } from '@/components/featured-carousel'
import { useQuery, useQueryClient } from '@tanstack/react-query'

interface User {
  id: string
  full_name: string
  avatar_url?: string
}

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [greeting, setGreeting] = useState('')
  const queryClient = useQueryClient()
  const { data: featuredContent = [], isLoading } = useQuery({
    queryKey: ['featured-content'],
    queryFn: async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('content')
        .select('id, title, thumbnail_url, media_url, is_live')
        .eq('is_featured', true)
        .order('is_live', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(5)
      return (data as FeaturedContent[]) || []
    },
    staleTime: 5 * 60 * 1000 // 5 minutes
  })

  useEffect(() => {
    const loadUser = async () => {
      const supabase = createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (authUser) {
        setUser({
          id: authUser.id,
          full_name: authUser.user_metadata.full_name || authUser.email?.split('@')[0] || 'Friend',
          avatar_url: authUser.user_metadata.avatar_url
        })
      }
    }

    // Set greeting based on time of day
    const hour = new Date().getHours()
    let newGreeting = ''
    if (hour < 12) newGreeting = 'Good Morning'
    else if (hour < 18) newGreeting = 'Good Afternoon'
    else newGreeting = 'Good Evening'
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGreeting(newGreeting)

    loadUser()

    // Set up real-time subscription for content changes
    const supabase = createClient()
    const channel = supabase
      .channel('featured-content-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'content',
          filter: 'is_featured=eq.true'
        },
        (payload) => {
          console.log('Featured content changed:', payload)
          // Invalidate query to refetch
          // access queryClient via hook if needed, or rely on auto-refetch if we configure it
          // For now, simpler to just let it be stale or force reload if we import queryClient
        }
      )
      .subscribe()

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* Greeting Section */}
      <section className="px-6 pt-6 pb-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            {greeting}, {user?.full_name || 'Friend'}
          </h1>
        </div>

        {/* Featured Content Carousel */}
        <div className="mb-6">
          {!isLoading && featuredContent.length > 0 ? (
            <FeaturedCarousel items={featuredContent} />
          ) : (
            <FeaturedCarouselSkeleton />
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-6 py-4">
        <div className="grid grid-cols-4 gap-3">
          <Link href="/giving" >
            <QuickAction icon={Heart} label="Give" />
          </Link>
          <Link href="/hub">
            <QuickAction icon={Users} label="Connect" />
          </Link>
          <Link href="/devotionals">
            <QuickAction icon={HandHeart} label="Prayer" />
          </Link>
          <Link href="/events">
            <QuickAction icon={Calendar} label="Events" />
          </Link>
        </div>
      </section>

      {/* Content Sections */}
      <section className="px-6 py-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Link href="/sermons">
            <Card className="relative border-none p-0 overflow-hidden h-40 group cursor-pointer">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/images/sermons.jpg"
                  alt="Sermons"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/70 transition-all" />
              </div>
              
              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center space-y-3 p-6 z-10">
                {/* <div className="h-12 w-12 rounded-full bg-blue-600/30 backdrop-blur-sm flex items-center justify-center border border-blue-400/30">
                  <Play className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                </div> */}
                <span className="text-white font-semibold text-center group-hover:text-blue-100 transition-colors">Sermons</span>
              </div>
            </Card>
          </Link>
          
          <Link href="/hub">
            <Card className="relative border-none p-0 overflow-hidden h-40 group cursor-pointer">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80"
                  alt="Community"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/70 transition-all" />
              </div>
              
              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center space-y-3 p-6 z-10">
                {/* <div className="h-12 w-12 rounded-full bg-green-600/30 backdrop-blur-sm flex items-center justify-center border border-green-400/30">
                  <Users2 className="h-6 w-6 text-green-400 group-hover:text-green-300 transition-colors" />
                </div> */}
                <span className="text-white font-semibold text-center group-hover:text-green-100 transition-colors">Community</span>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Upcoming Events</h2>
          <Button variant="link" className="text-blue-500 p-0" asChild>
            <Link href="/events">See All</Link>
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <Link href="/events/1">
            <EventCard
              title="Community Fall Festival"
              date="Oct 28"
              time="4:00 PM"
              image="/event-1.jpg"
            />
          </Link>
          <Link href="/events/2">
            <EventCard
              title="Youth Group Night"
              date="Nov 05"
              time="6:30 PM"
              image="/event-2.jpg"
            />
          </Link>
          <Link href="/events/3">
            <EventCard
              title="Leadership Summit"
              date="Dec 10"
              time="9:00 AM"
              image="/event-3.jpg"
            />
          </Link>
        </div>
      </section>
    </div>
  )
}

function QuickAction({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="h-14 w-14 rounded-full border border-border flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors text-gray-500! hover:text-white">
        <Icon className="h-6 w-6 text-foreground" />
      </div>
      <span className="text-xs font-medium text-foreground">{label}</span>
    </div>
  )
}

function EventCard({ 
  title, 
  date, 
  time,
  address = 'KM 46, Ibadan Express Way, Old Auditorium'
}: { 
  title: string
  date: string
  time: string
  image?: string
  address?: string
}) {
  // Parse date to show month abbreviation and day
  const formatDateDisplay = (dateStr: string) => {
    // If date is like "Dec 26", keep it as is
    if (dateStr.includes(' ')) {
      const parts = dateStr.split(' ')
      return {
        month: parts[0].toUpperCase(),
        day: parts[1]
      }
    }
    // Otherwise try to parse it
    const date = new Date(dateStr)
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      day: date.getDate().toString()
    }
  }

  const dateDisplay = formatDateDisplay(date)

  return (
    <Card className="flex flex-row items-center gap-4 p-4 border-border bg-white/10 hover:bg-white/20 transition-colors">
      <div className="h-16 w-16 rounded-lg bg-[#9FE870] flex flex-col items-center justify-center overflow-hidden shrink-0">
        <span className="text-xs font-semibold text-[#1E3A3A]">{dateDisplay.month}</span>
        <span className="text-2xl font-bold text-[#1E3A3A]">{dateDisplay.day}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {address}
        </p>
      </div>
      <Button variant="ghost" size="icon">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Button>
    </Card>
  )
}
