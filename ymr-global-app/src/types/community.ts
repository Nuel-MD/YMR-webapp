export interface Profile {
  id: string;
  full_name: string | null;
  image_url: string | null;
}

export interface Media {
  id: string;
  url: string;
  media_type: 'image' | 'video' | 'gif';
  filename?: string;
  file_size?: number;
}

export interface Post {
  id: string;
  user_id: string; // Added for database compatibility
  author_id: string;
  group_id?: string | null;
  content: string; // HTML
  content_text?: string;
  title?: string | null;
  media?: Media[];
  is_pinned: boolean;
  
  // Counts
  likes_count: number;
  comments_count: number;
  views_count: number;
  
  // User interaction
  has_liked?: boolean;
  
  // Relations
  author: Profile;
  created_at: string;
  updated_at: string; // Added for database compatibility
}

export interface CreatePostData {
  title?: string;
  content: string;
  mediaFiles: File[];
  groupId?: string;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  parent_id: string | null;
  content: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  
  likes_count: number;
  has_liked?: boolean;
  
  author: Profile;
  replies?: Comment[];
}

export interface Group {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  about_image_url?: string | null;
  member_count?: number;
  is_member?: boolean;
  created_at: string;
}
