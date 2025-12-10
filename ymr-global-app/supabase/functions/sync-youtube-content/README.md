# YouTube Content Sync - Setup Guide

## Overview

This Edge Function fetches videos from YouTube channels and syncs them to your Supabase database. It supports:

- Fetching latest videos from multiple channels
- Detecting live streams
- Automatic deduplication (won't create duplicates)
- Can be triggered via cron job

## Setup Instructions

### 1. Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **YouTube Data API v3**
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy your API key

### 2. Get YouTube Channel IDs

For each channel, you need the Channel ID (not the username):

**Method 1: From Channel URL**

- Visit the channel page
- Look at the URL: `youtube.com/channel/UC...` - the part after `/channel/` is the ID
- OR if it's `youtube.com/@username`, view page source and search for `"channelId"`

**Method 2: Use a tool**

- Visit: https://commentpicker.com/youtube-channel-id.php
- Paste the channel URL

### 3. Update the Edge Function

Edit `supabase/functions/sync-youtube-content/index.ts`:

```typescript
const CHANNELS = [
  {
    id: "UCxxxxxxxxxxxxx", // Pdaniel Olawande's actual channel ID
    name: "Pdaniel Olawande",
    author_id: null,
  },
  {
    id: "UCxxxxxxxxxxxxx", // YMR's actual channel ID
    name: "YMR",
    author_id: null,
  },
];
```

### 4. Set Environment Variables in Supabase

Go to your Supabase Dashboard → Settings → Edge Functions → Add secret:

```
YOUTUBE_API_KEY=your_youtube_api_key_here
```

(SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are automatically available)

### 5. Deploy the Edge Function

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref xtimqbwhpzdjtsuastlo

# Deploy the function
supabase functions deploy sync-youtube-content
```

### 6. Test the Function

```bash
# Get your function URL from Supabase Dashboard
curl -X POST https://xtimqbwhpzdjtsuastlo.supabase.co/functions/v1/sync-youtube-content \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### 7. Set Up Cron Job (Optional)

**Option A: Using Supabase Cron (Recommended)**

Create a database function and use `pg_cron`:

```sql
-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create a function to call the Edge Function
CREATE OR REPLACE FUNCTION trigger_youtube_sync()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM
    net.http_post(
      url := 'https://xtimqbwhpzdjtsuastlo.supabase.co/functions/v1/sync-youtube-content',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
      ),
      body := '{}'::jsonb
    );
END;
$$;

-- Schedule to run every hour
SELECT cron.schedule(
  'youtube-sync-hourly',
  '0 * * * *', -- Every hour at minute 0
  $$SELECT trigger_youtube_sync()$$
);
```

**Option B: Using External Cron Service**

Use a service like:

- **Cron-job.org** (free)
- **EasyCron** (free tier available)
- **GitHub Actions** (if your repo is on GitHub)

Set it to POST to your function URL every hour/minute.

**Option C: Using Vercel Cron (if deploying to Vercel)**

Create `app/api/cron/sync-youtube/route.ts`:

```typescript
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/sync-youtube-content`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
    }
  );

  const data = await response.json();
  return Response.json(data);
}
```

Then add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/sync-youtube",
      "schedule": "0 * * * *"
    }
  ]
}
```

## Response Format

The function returns:

```json
{
  "success": true,
  "timestamp": "2024-01-28T10:30:00.000Z",
  "channels": [
    {
      "name": "Pdaniel Olawande",
      "videosFound": 10,
      "liveVideos": 1,
      "inserted": 3,
      "updated": 7,
      "errors": 0
    },
    {
      "name": "YMR",
      "videosFound": 10,
      "liveVideos": 0,
      "inserted": 5,
      "updated": 5,
      "errors": 0
    }
  ],
  "totalInserted": 8,
  "totalUpdated": 12,
  "totalErrors": 0
}
```

## Notes

- **YouTube API Quota**: Free tier gives 10,000 units/day. Each search costs ~100 units. With 2 channels, you can run ~50 times/day safely.
- **Live Streams**: The function detects live streams via `liveBroadcastContent === 'live'`
- **Deduplication**: Uses `media_url` (YouTube URL) as unique identifier
- **Cron Frequency**: Running every minute might hit quota limits. Consider hourly or every 30 minutes.

## Troubleshooting

**"YouTube API key not configured"**

- Make sure you added the secret in Supabase Dashboard

**"Quota exceeded"**

- You've hit YouTube's daily quota. Wait 24 hours or request quota increase

**No videos inserted**

- Check that channel IDs are correct
- Verify the channels have public videos
- Check Supabase logs: Dashboard → Edge Functions → Logs
