'use client'

import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Clock, Share2, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Mock Data - In a real app, you'd fetch this by ID
const EVENTS = [
  {
    id: '1',
    title: 'YMR Global Retreat 2024',
    date: 'Dec 15-18, 2024',
    time: '9:00 AM EST',
    location: 'Lagos, Nigeria & Online',
    address: 'KM 46, Ibadan Express Way, Old Auditorium',
    image: '/images/YMR1.jpg',
    description: 'Join thousands of young ministers for a life-transforming encounter. Theme: The Burning Generation.',
    status: 'Registration Open',
    category: 'Featured'
  },
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

export default function EventDetailPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string

  // Simple lookup
  const event = EVENTS.find(e => e.id === eventId)

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-4">
        <h1 className="text-2xl font-bold">Event Not Found</h1>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="p-6 bg-card border-b border-border sticky top-0 z-10">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-2 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
        </Button>
        <h1 className="text-2xl font-bold leading-tight">{event.title}</h1>
      </div>

      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Banner Image */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-lg border border-white/10">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          {event.status && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-primary hover:bg-primary text-white border-none shadow-md backdrop-blur-sm">
                {event.status}
              </Badge>
            </div>
          )}
        </div>

        {/* Event Details */}
        <div className="space-y-6">
            <div className="space-y-4 bg-card rounded-xl p-5 border border-border">
              <div>
                <h2 className="text-lg font-semibold mb-2 text-foreground">About the Event</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </div>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 rounded-full bg-primary/10">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Date</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 rounded-full bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Time</p>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 rounded-full bg-primary/10">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Location</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                    <p className="text-xs text-muted-foreground/70 mt-0.5">{event.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button size="lg" className="flex-1 font-semibold text-base shadow-lg animate-in fade-in transition-all active:scale-[0.98]">
                Join Event
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 shrink-0 border-white/20 bg-white/5 hover:bg-white/10">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
        </div>
      </div>
    </div>
  )
}
