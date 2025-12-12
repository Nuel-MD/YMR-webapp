'use client'

import { ArrowLeft, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { generateReadingPlan, DailyReading } from '@/lib/bible-data'

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function formatDateLabel(date: Date): { month: string; day: number; dayName: string } {
  return {
    month: MONTHS[date.getMonth()],
    day: date.getDate(),
    dayName: DAYS[date.getDay()]
  }
}

export default function ReadingPlansPage() {
  const router = useRouter()
  const [readings, setReadings] = useState<DailyReading[]>(() => generateReadingPlan())
  const [completedPlans, setCompletedPlans] = useState<string[]>([])

  // Load completed plans from localStorage on mount
  useEffect(() => {
    const loadCompletedPlans = () => {
      const stored = localStorage.getItem('completedPlans')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          setCompletedPlans(parsed)
          
          // Update readings with completion status
          setReadings(prev => prev.map(reading => ({
            ...reading,
            completed: parsed.includes(reading.id)
          })))
        } catch (e) {
          console.error('Failed to parse completed plans:', e)
        }
      }
    }

    loadCompletedPlans()

    // Refresh when the page becomes visible again (user returns from detail page)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadCompletedPlans()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const handleReadingClick = (reading: DailyReading) => {
    // Navigate to the day's subpage
    router.push(`/bible/plans/${reading.id}`)
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border/30">
        <div className="flex items-center gap-4 px-4 py-4 max-w-lg mx-auto">
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-full hover:bg-muted/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Reading Plan</h1>
        </div>
      </div>

      {/* Reading List */}
      <div className="max-w-lg mx-auto pb-24">
        {readings.map((reading, index) => {
          const { month, day, dayName } = formatDateLabel(reading.date)
          const today = isToday(reading.date)
          
          return (
            <button
              key={reading.id}
              onClick={() => handleReadingClick(reading)}
              className={`w-full flex items-center gap-4 px-4 py-5 border-b border-border/20 transition-colors hover:bg-muted/20 text-left ${
                today ? 'bg-primary/5' : ''
              }`}
            >
              {/* Date Column */}
              <div className="flex flex-col items-center min-w-[50px]">
                <span className="text-xs font-medium text-muted-foreground tracking-wider">
                  {month}
                </span>
                <span className={`text-3xl font-light ${today ? 'text-primary' : 'text-foreground/70'}`}>
                  {day}
                </span>
              </div>

              {/* Content Column */}
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${today ? 'text-primary' : 'text-foreground'}`}>
                    {dayName}
                  </span>
                  {today && (
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-primary/20 text-primary rounded-full">
                      Today
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {reading.readings}
                </p>
              </div>

              {/* Check Icon Column */}
              <div className="flex items-center justify-center min-w-[40px] ">
                {reading.completed && (
                  <div >
                    <Check className="w-8 h-8 text-white" />
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

