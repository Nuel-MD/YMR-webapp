'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { generateReadingPlan } from '@/lib/bible-data'
import { useState, useEffect, useMemo } from 'react'

interface BibleVerse {
  book_id: string
  book_name: string
  chapter: number
  verse: number
  text: string
}

interface BibleResponse {
  reference: string
  verses: BibleVerse[]
  text: string
  translation_id: string
  translation_name: string
}

interface PassageData {
  reference: string
  verses: BibleVerse[]
  loading: boolean
  error: boolean
}

// Skeleton loader for verses
function VerseSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex gap-2">
          <div className="w-6 h-5 bg-primary/20 rounded" />
          <div className="flex-1 space-y-2">
            <div 
              className="h-5 bg-muted/50 rounded" 
              style={{ width: `${Math.random() * 30 + 70}%` }} 
            />
            {Math.random() > 0.5 && (
              <div 
                className="h-5 bg-muted/50 rounded" 
                style={{ width: `${Math.random() * 40 + 30}%` }} 
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ReadingPlanDayPage() {
  const router = useRouter()
  const params = useParams()
  const planId = params.id as string
  
  // Memoize the plan lookup to avoid recreating on every render
  const plan = useMemo(() => {
    return generateReadingPlan().find(p => p.id === planId)
  }, [planId])
  
  const [isCompleted, setIsCompleted] = useState(plan?.completed || false)
  
  // State for passages
  const [otPassage, setOtPassage] = useState<PassageData>({
    reference: '',
    verses: [],
    loading: true,
    error: false
  })
  
  const [ntPassage, setNtPassage] = useState<PassageData>({
    reference: '',
    verses: [],
    loading: true,
    error: false
  })

  // Parse reading reference to get book and chapter range
  const parseReadingRef = (ref: string) => {
    // Examples: "Hosea 12-14" or "John 13:21-14:10"
    // For simplicity, we'll fetch the starting chapter/verse
    const match = ref.match(/^([1-3]?\s?[A-Za-z\s]+)\s+(\d+)/)
    if (match) {
      const book = match[1].trim()
      const chapter = match[2]
      return { book, chapter, fullRef: ref }
    }
    return null
  }

  // Fetch Bible passage
  const fetchPassage = async (readingRef: string, setter: React.Dispatch<React.SetStateAction<PassageData>>) => {
    const parsed = parseReadingRef(readingRef)
    if (!parsed) {
      setter(prev => ({ ...prev, loading: false, error: true }))
      return
    }

    try {
      setter(prev => ({ ...prev, loading: true, error: false }))
      
      // Use our internal API route to avoid CORS issues
      const url = `/api/bible?passage=${encodeURIComponent(readingRef)}&translation=kjv`
      const res = await fetch(url)
      
      if (!res.ok) throw new Error('Failed to fetch')
      
      const data: BibleResponse = await res.json()
      
      setter({
        reference: data.reference,
        verses: data.verses,
        loading: false,
        error: false
      })
    } catch (error) {
      setter(prev => ({ ...prev, loading: false, error: true }))
    }
  }

  // Only fetch when planId changes, not when plan object changes
  useEffect(() => {
    if (plan) {
      fetchPassage(plan.otReading, setOtPassage)
      fetchPassage(plan.ntReading, setNtPassage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planId]) // Only depend on planId, not plan object

  if (!plan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Plan not found</p>
      </div>
    )
  }

  const formattedDate = plan.date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  })

  const handleComplete = () => {
    // Mark as completed
    setIsCompleted(true)
    
    // Store completion in localStorage
    const completedPlans = JSON.parse(localStorage.getItem('completedPlans') || '[]')
    if (!completedPlans.includes(planId)) {
      completedPlans.push(planId)
      localStorage.setItem('completedPlans', JSON.stringify(completedPlans))
    }
    
    // Navigate back after a brief delay
    setTimeout(() => {
      router.back()
    }, 500)
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
          <h1 className="text-lg font-semibold text-foreground">
            {formattedDate}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 pb-24">
        {/* Old Testament Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {otPassage.reference || plan.otReading}
          </h2>
          
          {otPassage.loading ? (
            <VerseSkeleton />
          ) : otPassage.error ? (
            <div className="text-destructive text-center py-8">
              Failed to load passage
            </div>
          ) : (
            <div className="space-y-1">
              {otPassage.verses.map((verse) => {
                // Check if the verse contains quoted text
                const parts = verse.text.split(/(".*?")/) 
                
                return (
                  <p key={`ot-${verse.book_name}-${verse.chapter}-${verse.verse}`} className="text-foreground/90 leading-relaxed text-lg">
                    <sup className="text-xs text-primary font-bold mr-2 select-none">
                      {verse.verse}
                    </sup>
                    {parts.map((part, idx) => {
                      // If part starts and ends with quotes, render in red
                      if (part.startsWith('"') && part.endsWith('"')) {
                        return (
                          <span key={idx} className="text-red-500">
                            {part}
                          </span>
                        )
                      }
                      return <span key={idx}>{part}</span>
                    })}
                  </p>
                )
              })}
            </div>
          )}
        </div>

        {/* New Testament Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {ntPassage.reference || plan.ntReading}
          </h2>
          
          {ntPassage.loading ? (
            <VerseSkeleton />
          ) : ntPassage.error ? (
            <div className="text-destructive text-center py-8">
              Failed to load passage
            </div>
          ) : (
            <div className="space-y-1">
              {ntPassage.verses.map((verse) => {
                // Check if the verse contains quoted text
                const parts = verse.text.split(/(".*?")/)
                
                return (
                  <p key={`nt-${verse.book_name}-${verse.chapter}-${verse.verse}`} className="text-foreground/90 leading-relaxed text-lg">
                    <sup className="text-xs text-primary font-bold mr-2 select-none">
                      {verse.verse}
                    </sup>
                    {parts.map((part, idx) => {
                      // If part starts and ends with quotes, render in red
                      if (part.startsWith('"') && part.endsWith('"')) {
                        return (
                          <span key={idx} className="text-red-500">
                            {part}
                          </span>
                        )
                      }
                      return <span key={idx}>{part}</span>
                    })}
                  </p>
                )
              })}
            </div>
          )}
        </div>

        {/* Complete Button - Inline at bottom of content */}
        <div className="mt-12 mb-8">
          {!isCompleted ? (
            <button
              onClick={handleComplete}
              disabled={otPassage.loading || ntPassage.loading}
              className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/30 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Complete {plan.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </button>
          ) : (
            <div className="w-full bg-primary/20 text-primary py-4 rounded-2xl font-bold text-lg text-center border-2 border-primary/30">
              Completed
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
