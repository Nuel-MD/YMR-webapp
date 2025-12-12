'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Quote } from 'lucide-react'

// Mock Data for Daily Inspiration
const INSPIRATION_DATA = [
  {
    verse: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
    reference: "Jeremiah 29:11",
    image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    verse: "But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.",
    reference: "Isaiah 40:31",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop"
  },
  {
    verse: "I can do all things through him who strengthens me.",
    reference: "Philippians 4:13",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop"
  },
  {
    verse: "The Lord is my shepherd; I shall not want.",
    reference: "Psalm 23:1",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    verse: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reference: "Romans 8:28",
    image: "https://images.unsplash.com/photo-1501854140884-074bf86ee911?q=80&w=2070&auto=format&fit=crop"
  },
  {
    verse: "Trust in the Lord with all your heart, and do not lean on your own understanding.",
    reference: "Proverbs 3:5",
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    verse: "Be strong and courageous. Do not be frightened, and do not be dismayed, for the Lord your God is with you wherever you go.",
    reference: "Joshua 1:9",
    image: "https://images.unsplash.com/photo-1519681393784-d8e5b5a4546e?q=80&w=2070&auto=format&fit=crop"
  }
]

export function DailyInspiration() {
  const [inspiration, setInspiration] = useState(INSPIRATION_DATA[0])

  useEffect(() => {
    // Get day of year to ensure consistent daily rotation
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000)
    const oneDay = 1000 * 60 * 60 * 24
    const dayOfYear = Math.floor(diff / oneDay)
    
    // Select index based on day of year
    const index = dayOfYear % INSPIRATION_DATA.length
    setInspiration(INSPIRATION_DATA[index])
  }, [])

  return (
    <Card className="relative overflow-hidden h-[300px] w-full border-none group">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${inspiration.image})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 w-fit">
            <span className="text-xs font-medium text-white tracking-wide uppercase">Daily Inspiration</span>
          </div>
          
          <div className="relative">
            <Quote className="absolute -top-4 -left-2 h-8 w-8 text-white/20 rotate-180" />
            <p className="text-xl md:text-3xl font-serif font-medium text-white leading-tight italic pl-4">
              {inspiration.verse}
            </p>
          </div>
          
          <p className="text-lg text-white/80 font-medium pl-4">
            — {inspiration.reference}
          </p>
        </div>
      </div>
    </Card>
  )
}
