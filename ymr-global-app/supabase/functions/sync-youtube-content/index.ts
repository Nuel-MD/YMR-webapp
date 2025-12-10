import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

// YouTube Channel IDs to fetch from
const CHANNELS = [
  {
    id: 'UC_PDANIEL_CHANNEL_ID', // Replace with actual channel ID
    name: 'Pdaniel Olawande',
    author_id: null // Will be set to a specific user ID if needed
  },
  {
    id: 'UC_YMR_CHANNEL_ID', // Replace with actual channel ID
    name: 'YMR',
    author_id: null
  }
];

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  videoUrl: string;
  isLive: boolean;
}

async function fetchChannelVideos(channelId: string): Promise<YouTubeVideo[]> {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet&order=date&maxResults=10&type=video`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(`YouTube API error: ${data.error?.message || 'Unknown error'}`);
  }
  
  return data.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
    publishedAt: item.snippet.publishedAt,
    videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    isLive: item.snippet.liveBroadcastContent === 'live'
  }));
}

async function syncVideosToDatabase(videos: YouTubeVideo[], channelName: string, authorId: string | null) {
  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
  
  const results = {
    inserted: 0,
    updated: 0,
    errors: 0
  };
  
  for (const video of videos) {
    try {
      // Check if video already exists
      const { data: existing } = await supabase
        .from('content')
        .select('id')
        .eq('media_url', video.videoUrl)
        .single();
      
      const contentData = {
        title: video.title,
        description: video.description,
        type: 'sermon' as const,
        media_url: video.videoUrl,
        thumbnail_url: video.thumbnailUrl,
        published_at: video.publishedAt,
        author_id: authorId,
        updated_at: new Date().toISOString()
      };
      
      if (existing) {
        // Update existing video
        const { error } = await supabase
          .from('content')
          .update(contentData)
          .eq('id', existing.id);
        
        if (error) throw error;
        results.updated++;
      } else {
        // Insert new video
        const { error } = await supabase
          .from('content')
          .insert({
            ...contentData,
            created_at: new Date().toISOString()
          });
        
        if (error) throw error;
        results.inserted++;
      }
    } catch (error) {
      console.error(`Error syncing video ${video.id}:`, error);
      results.errors++;
    }
  }
  
  return results;
}

Deno.serve(async (req: Request) => {
  // Verify request method
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  // Verify API key is configured
  if (!YOUTUBE_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'YouTube API key not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  try {
    const allResults = {
      channels: [] as any[],
      totalInserted: 0,
      totalUpdated: 0,
      totalErrors: 0
    };
    
    // Fetch and sync videos from each channel
    for (const channel of CHANNELS) {
      console.log(`Fetching videos from ${channel.name}...`);
      
      const videos = await fetchChannelVideos(channel.id);
      const liveVideos = videos.filter(v => v.isLive);
      
      console.log(`Found ${videos.length} videos (${liveVideos.length} live) from ${channel.name}`);
      
      const results = await syncVideosToDatabase(videos, channel.name, channel.author_id);
      
      allResults.channels.push({
        name: channel.name,
        videosFound: videos.length,
        liveVideos: liveVideos.length,
        ...results
      });
      
      allResults.totalInserted += results.inserted;
      allResults.totalUpdated += results.updated;
      allResults.totalErrors += results.errors;
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        timestamp: new Date().toISOString(),
        ...allResults
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Connection': 'keep-alive'
        }
      }
    );
  } catch (error: any) {
    console.error('Error in sync-youtube-content:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Unknown error occurred',
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
});
