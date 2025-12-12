import { Post, Group, Comment, Profile } from '@/types/community';

// Mock Users/Profiles
export const MOCK_USERS: Profile[] = [
  {
    id: '1',
    full_name: 'Sarah Williams',
    image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    full_name: 'Pastor Daniel',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    full_name: 'Grace Chen',
    image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
  {
    id: '4',
    full_name: 'Michael Johnson',
    image_url: null,
  },
  {
    id: 'current-user',
    full_name: 'You',
    image_url: null,
  }
];

// Mock Groups
export const MOCK_GROUPS: Group[] = [
  {
    id: 'group-1',
    name: 'Prayer Warriors',
    description: 'A dedicated group for intercessory prayer and spiritual warfare. Join us as we stand in the gap for our community.',
    image_url: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=800&h=400&fit=crop', // Group prayer circle
    about_image_url: 'https://images.unsplash.com/photo-1445445290350-12a3b863b130?w=800&h=400&fit=crop',
    member_count: 1240,
    created_at: '2024-01-15T10:00:00Z',
    is_member: true,
  },
  {
    id: 'group-2',
    name: 'Bible Study: Romans',
    description: 'Deep dive into the book of Romans. Meets weekly on Zoom every Thursday at 7 PM.',
    image_url: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=800&h=400&fit=crop', // Open bible on table
    about_image_url: 'https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?w=800&h=400&fit=crop',
    member_count: 85,
    created_at: '2024-02-01T10:00:00Z',
    is_member: false,
  },
  {
    id: 'group-3',
    name: 'Worship Leaders',
    description: 'Community for worship leaders to share songs, tips, and encouragement.',
    image_url: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&h=400&fit=crop', // Concert worship
    about_image_url: 'https://images.unsplash.com/photo-1510915361409-e2db71d5333e?w=800&h=400&fit=crop',
    member_count: 432,
    created_at: '2024-01-20T10:00:00Z',
    is_member: true,
  },
  {
    id: 'group-4',
    name: 'Youth Ministry',
    description: 'Connecting youth pastors and leaders globally for support and resource sharing.',
    image_url: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&h=400&fit=crop', // Youth group
    about_image_url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=400&fit=crop',
    member_count: 210,
    created_at: '2024-03-01T10:00:00Z',
    is_member: false,
  }
];

// Mock Posts
export const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    user_id: '1',
    author_id: '1',
    author: MOCK_USERS[0],
    content: '<p>Just finished reading the book of James. <strong>"Faith without works is dead."</strong> Such a powerful reminder that our belief must be accompanied by action! 🙏✨</p>',
    content_text: 'Just finished reading the book of James. "Faith without works is dead." Such a powerful reminder that our belief must be accompanied by action!',
    title: null,
    group_id: null,
    media: [],
    likes_count: 24,
    comments_count: 5,
    has_liked: false,
    is_pinned: false,
    views_count: 156,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'post-2',
    user_id: '2',
    author_id: '2',
    author: MOCK_USERS[1],
    content: '<p>Who is ready for the upcoming retreat? 🔥 We have some <em>amazing</em> speakers lined up!</p><p>Tag a friend you want to bring along. Let\'s make this the best retreat yet! 🙌</p>',
    content_text: 'Who is ready for the upcoming retreat? We have some amazing speakers lined up! Tag a friend you want to bring along.',
    title: 'YMR Retreat 2025 Announcement',
    group_id: null,
    media: [
      {
        id: 'media-1',
        url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
        media_type: 'image',
      }
    ],
    likes_count: 156,
    comments_count: 42,
    has_liked: true,
    is_pinned: true,
    views_count: 892,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'post-3',
    user_id: '3',
    author_id: '3',
    author: MOCK_USERS[2],
    content: '<p><strong>Prayer Request:</strong> Please pray for my grandmother who is undergoing surgery tomorrow. Believing for a complete healing! 🙏</p><p>Thank you all for your prayers and support. This community means the world to me.</p>',
    content_text: 'Prayer Request: Please pray for my grandmother who is undergoing surgery tomorrow. Believing for a complete healing!',
    title: null,
    group_id: 'group-1', // Posted in Prayer Warriors group
    media: [],
    likes_count: 89,
    comments_count: 34,
    has_liked: false,
    is_pinned: false,
    views_count: 234,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'post-4',
    user_id: '4',
    author_id: '4',
    author: MOCK_USERS[3],
    content: '<p>Romans 8:28 - "And we know that in all things God works for the good of those who love him, who have been called according to his purpose."</p><p>This verse has been my anchor this week. No matter what we face, God is working it out for our good! 💪</p>',
    content_text: 'Romans 8:28 - And we know that in all things God works for the good of those who love him...',
    title: null,
    group_id: 'group-2', // Posted in Bible Study group
    media: [],
    likes_count: 45,
    comments_count: 12,
    has_liked: false,
    is_pinned: false,
    views_count: 178,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'post-5',
    user_id: '1',
    author_id: '1',
    author: MOCK_USERS[0],
    content: '<p>New worship song we\'re learning this Sunday! 🎵</p><p>"Goodness of God" - Such a beautiful reminder of His faithfulness. Can\'t wait to lead worship with this one!</p>',
    content_text: 'New worship song we\'re learning this Sunday! Goodness of God - Such a beautiful reminder of His faithfulness.',
    title: null,
    group_id: 'group-3', // Posted in Worship Leaders group
    media: [
      {
        id: 'media-2',
        url: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&h=600&fit=crop',
        media_type: 'image',
      },
      {
        id: 'media-3',
        url: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=800&h=600&fit=crop',
        media_type: 'image',
      }
    ],
    likes_count: 67,
    comments_count: 18,
    has_liked: true,
    is_pinned: false,
    views_count: 289,
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  }
];

// Mock Comments
export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'comment-1',
    post_id: 'post-1',
    author_id: '2',
    author: MOCK_USERS[1],
    parent_id: null,
    content: 'Amen! James is such a practical book. Love how it challenges us to live out our faith.',
    likes_count: 5,
    created_at: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
    deleted_at: null,
  },
  {
    id: 'comment-2',
    post_id: 'post-1',
    author_id: '3',
    author: MOCK_USERS[2],
    parent_id: 'comment-1',
    content: 'Absolutely! It\'s one of my favorite books for this reason.',
    likes_count: 2,
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    deleted_at: null,
  },
  {
    id: 'comment-3',
    post_id: 'post-2',
    author_id: '1',
    author: MOCK_USERS[0],
    parent_id: null,
    content: 'So excited! Already registered! 🙌',
    likes_count: 12,
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    deleted_at: null,
  },
  {
    id: 'comment-4',
    post_id: 'post-3',
    author_id: '2',
    author: MOCK_USERS[1],
    parent_id: null,
    content: 'Praying for your grandmother and your family. God is faithful! 🙏',
    likes_count: 8,
    created_at: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    deleted_at: null,
  },
  {
    id: 'comment-5',
    post_id: 'post-3',
    author_id: '4',
    author: MOCK_USERS[3],
    parent_id: null,
    content: 'Standing with you in prayer! Believing for complete healing.',
    likes_count: 6,
    created_at: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    deleted_at: null,
  }
];

// Helper function to get comments for a post
export function getCommentsForPost(postId: string): Comment[] {
  return MOCK_COMMENTS.filter(comment => comment.post_id === postId && !comment.parent_id);
}

// Helper function to get replies for a comment
export function getRepliesForComment(commentId: string): Comment[] {
  return MOCK_COMMENTS.filter(comment => comment.parent_id === commentId);
}

// Helper function to get posts for a group
export function getPostsForGroup(groupId: string | undefined): Post[] {
  if (!groupId) {
    return MOCK_POSTS; // Return all posts for global feed
  }
  return MOCK_POSTS.filter(post => post.group_id === groupId);
}
