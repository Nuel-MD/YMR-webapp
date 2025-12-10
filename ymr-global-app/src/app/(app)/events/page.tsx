'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Clock, ChevronRight, Share2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

// Mock Data
const FEATURED_EVENT = {
  id: '1',
  title: 'YMR Global Retreat 2024',
  date: 'Dec 15-18, 2024',
  time: '9:00 AM EST',
  location: 'Lagos, Nigeria & Online',
  address: 'KM 46, Ibadan Express Way, Old Auditorium',
  image: '/images/YMR1.jpg',
  description: 'Join thousands of young ministers for a life-transforming encounter. Theme: The Burning Generation.',
  status: 'Registration Open'
}

const UPCOMING_EVENTS = [
  {
    id: '2',
    title: 'Worship Night: Deep Calls',
    date: 'Oct 28',
    time: '6:00 PM EST',
    location: 'Main Auditorium',
    address: 'KM 46, Ibadan Express Way, Old Auditorium',
    image: '/images/YMR2.jpg',
    category: 'Worship',
    description: 'An evening of powerful worship and praise.'
  },
  {
    id: '3',
    title: 'Leadership Masterclass',
    date: 'Nov 05',
    time: '10:00 AM EST',
    location: 'Zoom (Online)',
    address: 'Virtual Event - Link will be sent',
    image: '/images/YMR 3.jpg',
    category: 'Training',
    description: 'Learn essential leadership skills for ministry.'
  },
  {
    id: '4',
    title: 'Community Outreach',
    date: 'Nov 12',
    time: '8:00 AM EST',
    location: 'City Center',
    address: 'City Center Plaza, Downtown',
    image: '/images/YMR1.jpg',
    category: 'Outreach',
    description: 'Reach out to the community with love and service.'
  }
]

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<typeof FEATURED_EVENT | typeof UPCOMING_EVENTS[0] | null>(null)

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

  if (selectedEvent) {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="p-6 bg-card border-b border-border">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedEvent(null)}
            className="mb-2 -ml-2"
          >
            ← Back to Events
          </Button>
          <h1 className="text-2xl font-bold">{selectedEvent.title}</h1>
        </div>

        <div className="p-4">
          <Card className="overflow-hidden border-primary/20">
            <div className="relative aspect-video w-full">
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.title}
                fill
                className="object-cover"
              />
              {'status' in selectedEvent && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-primary hover:bg-primary text-white border-none">
                    {selectedEvent.status}
                  </Badge>
                </div>
              )}
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold leading-tight mb-2">{selectedEvent.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {selectedEvent.description}
                </p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-foreground/80">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/80">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/80">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{selectedEvent.address}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1 bg-primary hover:bg-primary/90">Register Now</Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="p-6 bg-card border-b border-border">
        <h1 className="text-2xl font-bold">Events</h1>
        <p className="text-muted-foreground">Gather with the saints.</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Featured Event */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Featured</h2>
          <button 
            onClick={() => setSelectedEvent(FEATURED_EVENT)}
            className="w-full text-left"
          >
            <Card className="overflow-hidden border-primary/20 hover:border-primary/40 transition-colors">
              <div className="relative aspect-video w-full">
                <Image
                  src={FEATURED_EVENT.image}
                  alt={FEATURED_EVENT.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-primary hover:bg-primary text-white border-none">
                    {FEATURED_EVENT.status}
                  </Badge>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="text-xl font-bold leading-tight mb-2">{FEATURED_EVENT.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {FEATURED_EVENT.description}
                  </p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-foreground/80">
                    <Calendar className="h-4 w-4 text-primary" />
                    {FEATURED_EVENT.date}
                  </div>
                  <div className="flex items-center gap-2 text-foreground/80">
                    <Clock className="h-4 w-4 text-primary" />
                    {FEATURED_EVENT.time}
                  </div>
                  <div className="flex items-center gap-2 text-foreground/80">
                    <MapPin className="h-4 w-4 text-primary" />
                    {FEATURED_EVENT.location}
                  </div>
                </div>
              </div>
            </Card>
          </button>
        </section>

        {/* Upcoming Events List */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Upcoming</h2>
          <div className="space-y-3">
            {UPCOMING_EVENTS.map(event => {
              const dateDisplay = formatDateDisplay(event.date)
              
              return (
                <button
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="w-full text-left"
                >
                  <Card className="flex flex-row items-center gap-4 p-4 border-border bg-white/10 hover:bg-white/20 transition-colors">
                    <div className="h-16 w-16 rounded-lg bg-[#9FE870] flex flex-col items-center justify-center overflow-hidden shrink-0">
                      <span className="text-xs font-semibold text-[#1E3A3A]">{dateDisplay.month}</span>
                      <span className="text-2xl font-bold text-[#1E3A3A]">{dateDisplay.day}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate mb-1">{event.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.address}
                      </p>
                    </div>
                    <div className="flex items-center justify-center pl-1">
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </Card>
                </button>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
