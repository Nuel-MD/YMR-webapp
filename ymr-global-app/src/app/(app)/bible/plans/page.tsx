'use client'

import { ArrowLeft, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Generate reading plan data based on a chronological Bible reading schedule
// This creates daily readings spanning Old Testament and New Testament
function generateReadingPlan(): DailyReading[] {
  const today = new Date()
  const readings: DailyReading[] = []
  
  // Sample reading assignments - in a real app, this would come from a database
  const planData = [
    { ot: 'Job 10-12', nt: 'Luke 23:44-24:18' },
    { ot: 'Job 7-9', nt: 'Luke 23:13-43' },
    { ot: 'Job 4-6', nt: 'Luke 22:54-23:12' },
    { ot: 'Job 1-3', nt: 'Luke 22:24-53' },
    { ot: 'Esther 7-10', nt: 'Luke 21:34-22:23' },
    { ot: 'Esther 4-6', nt: 'Luke 21:1-33' },
    { ot: 'Esther 1-3', nt: 'Luke 20:20-47' },
    { ot: 'Nehemiah 12-13', nt: 'Luke 20:1-19' },
    { ot: 'Nehemiah 10-11', nt: 'Luke 19:28-48' },
    { ot: 'Nehemiah 8-9', nt: 'Luke 19:1-27' },
    { ot: 'Nehemiah 5-7', nt: 'Luke 18:24-43' },
    { ot: 'Nehemiah 3-4', nt: 'Luke 18:1-23' },
    { ot: 'Nehemiah 1-2', nt: 'Luke 17:20-37' },
    { ot: 'Ezra 8-10', nt: 'Luke 17:1-19' },
    { ot: 'Ezra 5-7', nt: 'Luke 16:19-31' },
    { ot: 'Ezra 1-4', nt: 'Luke 16:1-18' },
    { ot: 'Psalms 145-150', nt: 'Luke 15:11-32' },
    { ot: 'Psalms 140-144', nt: 'Luke 15:1-10' },
    { ot: 'Psalms 135-139', nt: 'Luke 14:25-35' },
    { ot: 'Psalms 130-134', nt: 'Luke 14:1-24' },
    { ot: 'Psalms 119:89-176', nt: 'Luke 13:22-35' },
    { ot: 'Psalms 119:1-88', nt: 'Luke 13:1-21' },
    { ot: 'Psalms 113-118', nt: 'Luke 12:35-59' },
    { ot: 'Psalms 107-112', nt: 'Luke 12:1-34' },
    { ot: 'Psalms 102-106', nt: 'Luke 11:29-54' },
    { ot: 'Psalms 97-101', nt: 'Luke 11:1-28' },
    { ot: 'Psalms 91-96', nt: 'Luke 10:25-42' },
    { ot: 'Psalms 85-90', nt: 'Luke 10:1-24' },
    { ot: 'Psalms 78-84', nt: 'Luke 9:37-62' },
    { ot: 'Psalms 72-77', nt: 'Luke 9:1-36' },
  ]

  // Generate readings for the next 30 days (showing most recent first like the reference)
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    const planIndex = i % planData.length
    readings.push({
      id: `day-${i}`,
      date,
      readings: `${planData[planIndex].ot}, ${planData[planIndex].nt}`,
      otReading: planData[planIndex].ot,
      ntReading: planData[planIndex].nt,
      completed: i > 5 // Mark older readings as completed for demo
    })
  }

  return readings
}

interface DailyReading {
  id: string
  date: Date
  readings: string
  otReading: string
  ntReading: string
  completed: boolean
}

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function formatDateLabel(date: Date): { month: string; day: number; dayName: string } {
  return {
    month: MONTHS[date.getMonth()],
    day: date.getDate(),
    dayName: DAYS[date.getDay()]
  }
}

// Parse a reading like "Job 10-12" to get book and first chapter
function parseReading(reading: string): { book: string; chapter: number } {
  // Handle formats like "Job 10-12", "Luke 23:44-24:18", "Psalms 119:1-88"
  const match = reading.match(/^([1-3]?\s?[A-Za-z]+)\s+(\d+)/)
  if (match) {
    return {
      book: match[1].trim(),
      chapter: parseInt(match[2], 10)
    }
  }
  return { book: 'Genesis', chapter: 1 }
}

export default function ReadingPlansPage() {
  const router = useRouter()
  const [readings] = useState<DailyReading[]>(() => generateReadingPlan())

  const handleReadingClick = (reading: DailyReading) => {
    // Parse the first reading to navigate to
    const parsed = parseReading(reading.otReading)
    // Navigate to bible page with the book and chapter as query params
    router.push(`/bible?book=${encodeURIComponent(parsed.book)}&chapter=${parsed.chapter}`)
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border/30">
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
              className={`w-full flex items-start gap-4 px-4 py-5 border-b border-border/20 transition-colors hover:bg-muted/20 text-left ${
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
                  {reading.completed && !today && (
                    <span className="flex items-center gap-1 text-xs text-primary/70">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {reading.readings}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
