export interface DailyReading {
  id: string
  date: Date
  readings: string
  otReading: string
  ntReading: string
  completed: boolean
}

// Common Bible books list with chapter counts
export const BIBLE_BOOKS = [
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

export function generateReadingPlan(): DailyReading[] {
  const today = new Date()
  const readings: DailyReading[] = []
  
  // Sample reading assignments
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

  // Generate readings for the next 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // Create consistent, deterministic IDs based on date string YYYY-MM-DD
    const dateId = date.toISOString().split('T')[0]
    
    const planIndex = i % planData.length
    readings.push({
      id: dateId, 
      date,
      readings: `${planData[planIndex].ot}, ${planData[planIndex].nt}`,
      otReading: planData[planIndex].ot,
      ntReading: planData[planIndex].nt,
      completed: i > 5
    })
  }

  return readings
}
