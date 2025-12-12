import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const passage = searchParams.get('passage')
  const translation = searchParams.get('translation') || 'kjv'

  if (!passage) {
    return NextResponse.json(
      { error: 'Passage parameter is required' },
      { status: 400 }
    )
  }

  try {
    const url = `https://bible-api.com/${encodeURIComponent(passage)}${
      translation !== 'web' ? `?translation=${translation}` : ''
    }`

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'YMR-App/1.0',
      },
      // Add caching to reduce API calls
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Bible API returned ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Bible API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Bible passage' },
      { status: 500 }
    )
  }
}
