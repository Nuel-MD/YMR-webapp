'use client'

import { useState, useEffect, useCallback, Suspense, useRef } from 'react'
import { useLayoutStore } from '@/lib/store'
import { ChevronDown, Calendar, X, CheckCircle2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

// Common Bible books list with chapter counts
const BIBLE_BOOKS = [
  { name: 'Genesis', chapters: 50 },
  { name: 'Exodus', chapters: 40 },
  { name: 'Leviticus', chapters: 27 },
  { name: 'Numbers', chapters: 36 },
  { name: 'Deuteronomy', chapters: 34 },
  { name: 'Joshua', chapters: 24 },
  { name: 'Judges', chapters: 21 },
  { name: 'Ruth', chapters: 4 },
  { name: '1 Samuel', chapters: 31 },
  { name: '2 Samuel', chapters: 24 },
  { name: '1 Kings', chapters: 22 },
  { name: '2 Kings', chapters: 25 },
  { name: '1 Chronicles', chapters: 29 },
  { name: '2 Chronicles', chapters: 36 },
  { name: 'Ezra', chapters: 10 },
  { name: 'Nehemiah', chapters: 13 },
  { name: 'Esther', chapters: 10 },
  { name: 'Job', chapters: 42 },
  { name: 'Psalms', chapters: 150 },
  { name: 'Proverbs', chapters: 31 },
  { name: 'Ecclesiastes', chapters: 12 },
  { name: 'Song of Solomon', chapters: 8 },
  { name: 'Isaiah', chapters: 66 },
  { name: 'Jeremiah', chapters: 52 },
  { name: 'Lamentations', chapters: 5 },
  { name: 'Ezekiel', chapters: 48 },
  { name: 'Daniel', chapters: 12 },
  { name: 'Hosea', chapters: 14 },
  { name: 'Joel', chapters: 3 },
  { name: 'Amos', chapters: 9 },
  { name: 'Obadiah', chapters: 1 },
  { name: 'Jonah', chapters: 4 },
  { name: 'Micah', chapters: 7 },
  { name: 'Nahum', chapters: 3 },
  { name: 'Habakkuk', chapters: 3 },
  { name: 'Zephaniah', chapters: 3 },
  { name: 'Haggai', chapters: 2 },
  { name: 'Zechariah', chapters: 14 },
  { name: 'Malachi', chapters: 4 },
  { name: 'Matthew', chapters: 28 },
  { name: 'Mark', chapters: 16 },
  { name: 'Luke', chapters: 24 },
  { name: 'John', chapters: 21 },
  { name: 'Acts', chapters: 28 },
  { name: 'Romans', chapters: 16 },
  { name: '1 Corinthians', chapters: 16 },
  { name: '2 Corinthians', chapters: 13 },
  { name: 'Galatians', chapters: 6 },
  { name: 'Ephesians', chapters: 6 },
  { name: 'Philippians', chapters: 4 },
  { name: 'Colossians', chapters: 4 },
  { name: '1 Thessalonians', chapters: 5 },
  { name: '2 Thessalonians', chapters: 3 },
  { name: '1 Timothy', chapters: 6 },
  { name: '2 Timothy', chapters: 4 },
  { name: 'Titus', chapters: 3 },
  { name: 'Philemon', chapters: 1 },
  { name: 'Hebrews', chapters: 13 },
  { name: 'James', chapters: 5 },
  { name: '1 Peter', chapters: 5 },
  { name: '2 Peter', chapters: 3 },
  { name: '1 John', chapters: 5 },
  { name: '2 John', chapters: 1 },
  { name: '3 John', chapters: 1 },
  { name: 'Jude', chapters: 1 },
  { name: 'Revelation', chapters: 22 },
]

// Available Bible translations from bible-api.com
const BIBLE_TRANSLATIONS = [
  { id: 'kjv', name: 'King James Version', abbr: 'KJV' },
  { id: 'web', name: 'World English Bible', abbr: 'WEB' },
  { id: 'asv', name: 'American Standard Version', abbr: 'ASV' },
  { id: 'bbe', name: 'Bible in Basic English', abbr: 'BBE' },
  { id: 'darby', name: 'Darby Translation', abbr: 'DARBY' },
  { id: 'ylt', name: "Young's Literal Translation", abbr: 'YLT' },
  { id: 'webbe', name: 'World English Bible British', abbr: 'WEBBE' },
  { id: 'oeb-us', name: 'Open English Bible (US)', abbr: 'OEB' },
]

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
  translation_note: string
}

// Skeleton loading component for verses
function VerseSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[...Array(12)].map((_, i) => (
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

// Book/Chapter Jumper Modal Component
function BookChapterModal({
  isOpen,
  onClose,
  currentBook,
  currentChapter,
  onSelect,
}: {
  isOpen: boolean
  onClose: () => void
  currentBook: string
  currentChapter: number
  onSelect: (book: string, chapter: number) => void
}) {
  const [selectedBook, setSelectedBook] = useState(currentBook)
  const selectedBookData = BIBLE_BOOKS.find(b => b.name === selectedBook)
  const chapterCount = selectedBookData?.chapters || 1

  useEffect(() => {
    setSelectedBook(currentBook)
  }, [currentBook, isOpen])

  if (!isOpen) return null

  const handleChapterSelect = (chapter: number) => {
    onSelect(selectedBook, chapter)
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm animate-slide-up"
      style={{ animation: 'slideUp 0.3s ease-out' }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/50 p-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-foreground">Select Book & Chapter</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted/50 transition-colors"
          >
            <X className="w-5 h-5 text-foreground/70" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex h-[calc(100vh-80px)] max-w-2xl mx-auto">
        {/* Book List - Left Side */}
        <div className="w-2/5 border-r border-border/30 overflow-y-auto py-2 scrollbar-thin">
          {BIBLE_BOOKS.map((book) => (
            <button
              key={book.name}
              onClick={() => setSelectedBook(book.name)}
              className={`w-full px-4 py-3 text-left transition-all ${
                selectedBook === book.name
                  ? 'bg-primary/20 text-primary border-l-2 border-primary'
                  : 'text-foreground/80 hover:bg-muted/30'
              }`}
            >
              <span className="font-medium">{book.name}</span>
              {book.chapters === 1 && (
                <span className="ml-2 text-xs text-muted-foreground">(1)</span>
              )}
            </button>
          ))}
        </div>

        {/* Chapter Grid - Right Side */}
        <div className="w-3/5 overflow-y-auto p-4">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-foreground">{selectedBook}</h3>
            <p className="text-sm text-muted-foreground">{chapterCount} chapters</p>
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            {[...Array(chapterCount)].map((_, i) => {
              const chapter = i + 1
              const isCurrentChapter = selectedBook === currentBook && chapter === currentChapter
              return (
                <button
                  key={chapter}
                  onClick={() => handleChapterSelect(chapter)}
                  className={`aspect-square flex items-center justify-center rounded-lg font-medium text-sm transition-all ${
                    isCurrentChapter
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                      : 'bg-muted/30 text-foreground hover:bg-muted/50 hover:scale-105'
                  }`}
                >
                  {chapter}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// Version Selector Modal Component (Bottom Sheet)
function VersionModal({
  isOpen,
  onClose,
  currentVersion,
  onSelect,
}: {
  isOpen: boolean
  onClose: () => void
  currentVersion: string
  onSelect: (version: string) => void
}) {
  if (!isOpen) return null

  const handleVersionSelect = (versionId: string) => {
    onSelect(versionId)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl shadow-2xl"
        style={{ animation: 'slideUpSheet 0.3s ease-out' }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-6 pb-4 border-b border-border/30">
          <h2 className="text-lg font-semibold text-foreground">Select Translation</h2>
          <p className="text-sm text-muted-foreground">Choose your preferred Bible version</p>
        </div>

        {/* Version List */}
        <div className="max-h-[60vh] overflow-y-auto py-2">
          {BIBLE_TRANSLATIONS.map((trans) => (
            <button
              key={trans.id}
              onClick={() => handleVersionSelect(trans.id)}
              className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${
                currentVersion === trans.id
                  ? 'bg-primary/10'
                  : 'hover:bg-muted/30'
              }`}
            >
              <div className='flex flex-row items-center gap-4'>
                <span className={`font-bold text-lg  ${
                  currentVersion === trans.id ? 'text-primary' : 'text-foreground'
                }`}>
                  {trans.abbr}
                </span>
                <p className="text-sm text-muted-foreground">{trans.name}</p>
              </div>
              {currentVersion === trans.id && (
                <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
              )}
            </button>
          ))}
        </div>

        {/* Safe area padding for mobile */}
        <div className="h-[72px]" />
      </div>
    </>
  )
}

function BiblePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Initialize from URL params if coming from reading plan
  const initialBook = searchParams.get('book') || 'John'
  const initialChapter = parseInt(searchParams.get('chapter') || '3', 10)
  
  const [book, setBook] = useState(initialBook)
  const [chapter, setChapter] = useState(initialChapter)
  const [translation, setTranslation] = useState('kjv')
  const [bibleData, setBibleData] = useState<BibleResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Modal states
  const [showBookChapterModal, setShowBookChapterModal] = useState(false)
  const [showVersionModal, setShowVersionModal] = useState(false)

  const currentTranslation = BIBLE_TRANSLATIONS.find(t => t.id === translation)

  // Update state when URL params change (e.g., from reading plan navigation)
  useEffect(() => {
    const urlBook = searchParams.get('book')
    const urlChapter = searchParams.get('chapter')
    if (urlBook) setBook(urlBook)
    if (urlChapter) setChapter(parseInt(urlChapter, 10))
  }, [searchParams])

  const fetchChapter = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Use our internal API route to avoid CORS issues
      const passage = `${book} ${chapter}`
      const url = `/api/bible?passage=${encodeURIComponent(passage)}&translation=${translation}`
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch chapter')
      const data = await res.json()
      setBibleData(data)
    } catch {
      setError('Could not load scripture. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [book, chapter, translation])

  useEffect(() => {
    fetchChapter()
  }, [fetchChapter])

  const handleBookChapterSelect = (newBook: string, newChapter: number) => {
    setBook(newBook)
    setChapter(newChapter)
  }

  const handleVersionSelect = (newVersion: string) => {
    setTranslation(newVersion)
  }

  // Layout store for fullscreen reading
  const { setFullscreen, setHeaderVisible, setBottomNavVisible } = useLayoutStore()
  const scrollRef = useRef<HTMLDivElement>(null)
  const lastScrollTop = useRef(0)

  // Reset layout visibility on mount/unmount
  useEffect(() => {
    setHeaderVisible(true)
    setBottomNavVisible(true)
    return () => {
      setHeaderVisible(true)
      setBottomNavVisible(true)
    }
  }, [setHeaderVisible, setBottomNavVisible])

  const handleScroll = () => {
    if (!scrollRef.current) return
    const scrollTop = scrollRef.current.scrollTop
    
    // Ignore small scroll movements (bounce/jitter)
    if (Math.abs(scrollTop - lastScrollTop.current) < 10) return

    if (scrollTop > lastScrollTop.current && scrollTop > 50) {
      // Scrolling down - hide UI
      setFullscreen(true)
    } else {
      // Scrolling up - show UI
      setFullscreen(false)
    }
    lastScrollTop.current = scrollTop
  }

  const handleTap = () => {
    // Show UI on tap
    setFullscreen(false)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Reading Content - Full screen focus */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        onClick={handleTap}
        onDoubleClick={handleTap}
        className="flex-1 overflow-y-auto pb-24 scroll-smooth transition-all"
      >
        <div className="max-w-lg mx-auto px-5 py-6">
          {loading ? (
            <VerseSkeleton />
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <p className="text-destructive text-center">{error}</p>
              <button 
                onClick={fetchChapter}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className='space-y-6'>
              <div className="text-center mb-6">
    <h1 className="text-2xl font-bold text-foreground">
      {bibleData?.reference}
    </h1>
    <p className="text-xs text-muted-foreground uppercase tracking-wider">
      {bibleData?.translation_name}
    </p>
  </div>
      <div className="prose prose-invert max-w-none">
              {bibleData?.verses.map((verse) => (
                <span key={verse.verse} className="leading-loose text-lg">
                  <sup className="text-xs text-primary font-bold mr-1.5 select-none">
                    {verse.verse}
                  </sup>
                  <span className="text-foreground/90 hover:bg-primary/10 transition-colors rounded px-0.5">
                    {verse.text}
                  </span>
                  {' '}
                </span>
              ))}
            </div>
            </div>
      
          )}
        </div>
      </div>

      {/* Bottom Toolbar - Clean, minimal design */}
      <div className="fixed bottom-[68px] left-0 right-0 z-40">
        <div className="max-w-lg mx-auto px-4">
          <div 
            className="flex items-center justify-between bg-card/95 backdrop-blur-md border-2 border-primary/20 rounded-2xl px-4 py-3 shadow-xl shadow-primary/5"
          >
            {/* Book/Chapter Selector */}
            <button 
              onClick={() => setShowBookChapterModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-muted/30 transition-colors group"
            >
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {book} {chapter}
              </span>
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>

            {/* Reading Plan Button */}
            <button 
              onClick={() => router.push('/bible/plans')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-muted/30 transition-colors group"
            >
              <Calendar className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="font-medium text-foreground/80 group-hover:text-primary transition-colors">
                Plan
              </span>
            </button>

            {/* Version Selector */}
            <button 
              onClick={() => setShowVersionModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-muted/30 transition-colors group"
            >
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {currentTranslation?.abbr || 'KJV'}
              </span>
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BookChapterModal
        isOpen={showBookChapterModal}
        onClose={() => setShowBookChapterModal(false)}
        currentBook={book}
        currentChapter={chapter}
        onSelect={handleBookChapterSelect}
      />

      <VersionModal
        isOpen={showVersionModal}
        onClose={() => setShowVersionModal(false)}
        currentVersion={translation}
        onSelect={handleVersionSelect}
      />
      
      {/* Complete Button for Reading Plan Mode */}
      {searchParams.get('planMode') === 'true' && (
        <div className="fixed bottom-24 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <button 
            onClick={() => router.back()}
            className="pointer-events-auto bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/30 animate-in fade-in slide-in-from-bottom-4 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Complete Reading
          </button>
        </div>
      )}
    </div>
  )
}

// Loading fallback while Suspense resolves searchParams
function BibleLoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-48 bg-muted/50 rounded mx-auto" />
        <div className="h-4 w-64 bg-muted/30 rounded" />
        <div className="h-4 w-56 bg-muted/30 rounded" />
        <div className="h-4 w-60 bg-muted/30 rounded" />
      </div>
    </div>
  )
}

export default function BiblePage() {
  return (
    <Suspense fallback={<BibleLoadingFallback />}>
      <BiblePageContent />
    </Suspense>
  )
}
