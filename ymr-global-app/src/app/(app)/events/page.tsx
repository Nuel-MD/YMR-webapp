'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Clock, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Mock Data
const EVENTS = [
  {
    id: '1',
    title: 'YMR Global Retreat 2024',
    date: 'Dec 15-18, 2024',
    time: '9:00 AM EST',
    location: 'Lagos, Nigeria & Online',
    address: 'KM 46, Ibadan Express Way, Old Auditorium',
    image: '/images/YMR1.jpg',
    description: 'Join thousands of young ministers for a life-transforming encounter.',
    status: 'Registration Open',
    type: 'featured'
  },
  {
    id: '2',
    title: 'Worship Night: Deep Calls',
    date: 'Oct 28',
    time: '6:00 PM EST',
    location: 'Main Auditorium',
    address: 'KM 46, Ibadan Express Way, Old Auditorium',
    image: '/images/YMR2.jpg',
    type: 'upcoming'
  },
  {
    id: '3',
    title: 'Leadership Masterclass',
    date: 'Nov 05',
    time: '10:00 AM EST',
    location: 'Online',
    address: 'Virtual Event',
    image: '/images/YMR 3.jpg',
    type: 'upcoming'
  },
   {
    id: '5',
    title: 'Daily Morning Prayer',
    date: 'Daily',
    time: '5:00 AM EST',
    location: 'Online',
    address: 'Zoom Link',
    image: '/images/prayer.jpg',
    type: 'ongoing'
  },
  {
    id: '4',
    title: 'Community Outreach',
    date: 'Nov 12',
    time: '8:00 AM EST',
    location: 'City Center',
    address: 'Downtown',
    image: '/images/YMR1.jpg',
    type: 'past'
  }
]

export default function EventsPage() {
  const featuredEvent = EVENTS.find(e => e.type === 'featured')
  const upcomingEvents = EVENTS.filter(e => e.type === 'upcoming')
  const ongoingEvents = EVENTS.filter(e => e.type === 'ongoing')
  const pastEvents = EVENTS.filter(e => e.type === 'past')

  // Parse date to show month abbreviation and day
  const formatDateDisplay = (dateStr: string) => {
    if (dateStr.includes('Daily')) return { month: 'EVERY', day: 'DAY' }
    
    // If date is like "Dec 26", keep it as is
    if (dateStr.includes(' ')) {
      const parts = dateStr.slice(0, 6).split(' ')
      if(parts.length >= 2) {
          return {
            month: parts[0].toUpperCase(),
            day: parts[1].replace(/[^0-9]/g, '')
          }
      }
    }
    return { month: 'NOV', day: '12' } // Fallback
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="p-6 bg-card border-b border-border sticky top-0 z-10 backdrop-blur-sm bg-card/95">
        <h1 className="text-2xl font-bold">Events</h1>
        <p className="text-muted-foreground">Gather with the saints.</p>
      </div>

      <div className="p-4 space-y-8">
        {/* Featured Event */}
        {featuredEvent && (
            <section>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1">Featured</h2>
            <Link href={`/events/${featuredEvent.id}`}>
                <Card className="overflow-hidden border-primary/20 hover:border-primary/40 transition-all active:scale-[0.99]">
                <div className="relative aspect-video w-full">
                    <Image
                    src={featuredEvent.image}
                    alt={featuredEvent.title}
                    fill
                    className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                    <Badge className="bg-primary/90 text-white border-none backdrop-blur-sm shadow-sm">
                        {featuredEvent.status}
                    </Badge>
                    </div>
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-90" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl font-bold leading-tight mb-1 text-white">{featuredEvent.title}</h3>
                        <div className="flex items-center gap-2 text-white/90 text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>{featuredEvent.date} • {featuredEvent.time}</span>
                        </div>
                    </div>
                </div>
                </Card>
            </Link>
            </section>
        )}

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
            <section>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1">Upcoming</h2>
            <div className="space-y-3">
                {upcomingEvents.map(event => (
                <EventListItem key={event.id} event={event} formatDateDisplay={formatDateDisplay} />
                ))}
            </div>
            </section>
        )}

         {/* Ongoing Events */}
         {ongoingEvents.length > 0 && (
            <section>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1">Ongoing</h2>
            <div className="space-y-3">
                {ongoingEvents.map(event => (
                <EventListItem key={event.id} event={event} formatDateDisplay={formatDateDisplay} />
                ))}
            </div>
            </section>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
            <section className="opacity-70 grayscale-[0.5]">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1">Past Events</h2>
            <div className="space-y-3">
                {pastEvents.map(event => (
                <EventListItem key={event.id} event={event} formatDateDisplay={formatDateDisplay} />
                ))}
            </div>
            </section>
        )}
      </div>
    </div>
  )
}

function EventListItem({ event, formatDateDisplay }: { event: any, formatDateDisplay: any }) {
    const dateDisplay = formatDateDisplay(event.date)
    return (
        <Link href={`/events/${event.id}`} className="block">
            <Card className="flex flex-row items-center gap-4 p-3 border-border bg-white/5 hover:bg-white/10 transition-all active:scale-[0.99]">
            <div className="h-16 w-16 rounded-lg bg-primary/20 flex flex-col items-center justify-center overflow-hidden shrink-0 border border-primary/10">
                <span className="text-[10px] font-bold text-primary uppercase">{dateDisplay.month}</span>
                <span className="text-xl font-bold text-foreground">{dateDisplay.day}</span>
            </div>
            <div className="flex-1 min-w-0 py-1">
                <h3 className="font-semibold text-foreground truncate mb-1">{event.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{event.location}</span>
                </div>
                 <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3" />
                    <span>{event.time}</span>
                </div>
            </div>
            <div className="flex items-center justify-center pl-1 pr-1">
                <ChevronRight className="h-5 w-5 text-muted-foreground/50" />
            </div>
            </Card>
        </Link>
    )
}
