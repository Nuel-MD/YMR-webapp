'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarIcon, Share2, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'

export default function DevotionalsPage() {
  const [date, setDate] = useState(new Date())

  // Mock Data for today's devotional
  const devotional = {
    date: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
    title: 'Walking in Divine Purpose',
    scripture: 'Jeremiah 29:11',
    scriptureText: '"For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."',
    content: [
      "God's plans for your life are not accidental. Every step you take, every challenge you face, is part of a greater design to mold you into who He created you to be.",
      "Often we look at our current circumstances and feel discouraged, but God sees the end from the beginning. He knows the destination even when we can only see the fog in front of us.",
      "Today, trust in His timing. Trust that He is working all things together for your good. Your future is bright because it is held in the hands of the Almighty."
    ],
    prayer: "Lord, help me to trust Your plan for my life even when I cannot see the way forward. Give me the faith to believe that You are working for my good. Amen.",
    author: 'Pastor Sarah'
  }

  const handlePrevDay = () => {
    const newDate = new Date(date)
    newDate.setDate(date.getDate() - 1)
    setDate(newDate)
  }

  const handleNextDay = () => {
    const newDate = new Date(date)
    newDate.setDate(date.getDate() + 1)
    setDate(newDate)
  }

  const isToday = new Date().toDateString() === date.toDateString()

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border p-4 shadow-sm">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <Button variant="ghost" size="icon" onClick={handlePrevDay}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex flex-col items-center">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Daily Devotional</span>
            <div className="flex items-center gap-2 font-semibold">
              <CalendarIcon className="h-4 w-4 text-primary" />
              {devotional.date}
            </div>
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleNextDay}
            disabled={isToday}
            className={isToday ? 'opacity-0' : ''}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        {/* Title Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground leading-tight">
            {devotional.title}
          </h1>
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            By {devotional.author}
          </div>
        </div>

        {/* Scripture Card */}
        <Card className="bg-card border-l-4 border-l-primary p-6 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <BookOpen className="h-24 w-24" />
          </div>
          <div className="relative z-10 space-y-2">
            <h3 className="font-bold text-primary text-lg">{devotional.scripture}</h3>
            <p className="text-lg italic text-foreground/90 font-serif leading-relaxed">
              {devotional.scriptureText}
            </p>
          </div>
        </Card>

        {/* Main Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          {devotional.content.map((paragraph, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Prayer Section */}
        <div className="bg-muted/30 rounded-xl p-6 border border-border space-y-3">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Daily Prayer
          </h3>
          <p className="text-foreground/90 italic">
            "{devotional.prayer}"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center pt-4">
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Share2 className="h-4 w-4" />
            Share Devotional
          </Button>
        </div>
      </div>
    </div>
  )
}
