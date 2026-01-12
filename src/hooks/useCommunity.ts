import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { toast } from '@/hooks/use-toast';

export interface CommunityPost {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  likes_count: number;
  comments_count: number;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  author?: {
    full_name: string | null;
    username: string | null;
    avatar_url: string | null;
  };
  has_liked?: boolean;
  has_bookmarked?: boolean;
}

export interface CommunityComment {
  id: string;
  post_id: string;
  user_id: string;
  parent_id: string | null;
  content: string;
  likes_count: number;
  created_at: string;
  updated_at: string;
  author?: {
    full_name: string | null;
    username: string | null;
    avatar_url: string | null;
  };
  has_liked?: boolean;
  replies?: CommunityComment[];
}

export interface CreatePostData {
  title: string;
  content: string;
  category: string;
}

export interface CreateCommentData {
  post_id: string;
  content: string;
  parent_id?: string;
}

export const POST_CATEGORIES = [
  { value: 'algemeen', label: 'Algemeen', color: 'bg-blue-500' },
  { value: 'tips', label: 'Tips & Tricks', color: 'bg-emerald-500' },
  { value: 'vragen', label: 'Vragen', color: 'bg-amber-500' },
  { value: 'successen', label: 'Successen', color: 'bg-purple-500' },
  { value: 'discussie', label: 'Discussie', color: 'bg-pink-500' },
  { value: 'nieuws', label: 'Nieuws', color: 'bg-cyan-500' },
];

export function useCommunity() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all posts
  const { data: posts = [], isLoading: postsLoading } = useQuery({
    queryKey: ['community-posts'],
    queryFn: async () => {
      const { data: postsData, error } = await supabase
        .from('community_posts')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch authors for all posts
      const userIds = [...new Set(postsData.map(p => p.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name, username, avatar_url')
        .in('user_id', userIds);

      // Fetch user's likes if logged in
      let userLikes: string[] = [];
      let userBookmarks: string[] = [];
      
      if (user) {
        const { data: likesData } = await supabase
          .from('community_post_likes')
          .select('post_id')
          .eq('user_id', user.id);
        userLikes = likesData?.map(l => l.post_id) || [];

        const { data: bookmarksData } = await supabase
          .from('community_bookmarks')
          .select('post_id')
          .eq('user_id', user.id);
        userBookmarks = bookmarksData?.map(b => b.post_id) || [];
      }

      return postsData.map(post => ({
        ...post,
        author: profiles?.find(p => p.user_id === post.user_id) || null,
        has_liked: userLikes.includes(post.id),
        has_bookmarked: userBookmarks.includes(post.id),
      })) as CommunityPost[];
    },
  });

  // Fetch single post with comments
  const usePost = (postId: string) => {
    return useQuery({
      queryKey: ['community-post', postId],
      queryFn: async () => {
        const { data: post, error } = await supabase
          .from('community_posts')
          .select('*')
          .eq('id', postId)
          .single();

        if (error) throw error;

        // Fetch author
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_id, full_name, username, avatar_url')
          .eq('user_id', post.user_id)
          .single();

        // Fetch user's like status
        let hasLiked = false;
        let hasBookmarked = false;
        
        if (user) {
          const { data: likeData } = await supabase
            .from('community_post_likes')
            .select('id')
            .eq('post_id', postId)
            .eq('user_id', user.id)
            .maybeSingle();
          hasLiked = !!likeData;

          const { data: bookmarkData } = await supabase
            .from('community_bookmarks')
            .select('id')
            .eq('post_id', postId)
            .eq('user_id', user.id)
            .maybeSingle();
          hasBookmarked = !!bookmarkData;
        }

        return {
          ...post,
          author: profile || null,
          has_liked: hasLiked,
          has_bookmarked: hasBookmarked,
        } as CommunityPost;
      },
      enabled: !!postId,
    });
  };

  // Fetch comments for a post
  const useComments = (postId: string) => {
    return useQuery({
      queryKey: ['community-comments', postId],
      queryFn: async () => {
        const { data: commentsData, error } = await supabase
          .from('community_comments')
          .select('*')
          .eq('post_id', postId)
          .order('created_at', { ascending: true });

        if (error) throw error;

        // Fetch authors
        const userIds = [...new Set(commentsData.map(c => c.user_id))];
        const { data: profiles } = await supabase
          .from('profiles')
          .select('user_id, full_name, username, avatar_url')
          .in('user_id', userIds);

        // Fetch user's likes
        let userLikes: string[] = [];
        if (user) {
          const { data: likesData } = await supabase
            .from('community_comment_likes')
            .select('comment_id')
            .eq('user_id', user.id);
          userLikes = likesData?.map(l => l.comment_id) || [];
        }

        const commentsWithAuthors = commentsData.map(comment => ({
          ...comment,
          author: profiles?.find(p => p.user_id === comment.user_id) || null,
          has_liked: userLikes.includes(comment.id),
        })) as CommunityComment[];

        // Build nested structure
        const topLevelComments = commentsWithAuthors.filter(c => !c.parent_id);
        const replies = commentsWithAuthors.filter(c => c.parent_id);

        return topLevelComments.map(comment => ({
          ...comment,
          replies: replies.filter(r => r.parent_id === comment.id),
        }));
      },
      enabled: !!postId,
    });
  };

  // Create post
  const createPost = useMutation({
    mutationFn: async (data: CreatePostData) => {
      if (!user) throw new Error('Je moet ingelogd zijn');

      const { data: newPost, error } = await supabase
        .from('community_posts')
        .insert({
          user_id: user.id,
          title: data.title,
          content: data.content,
          category: data.category,
        })
        .select()
        .single();

      if (error) throw error;
      return newPost;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
      toast({
        title: 'Bericht geplaatst!',
        description: 'Je bericht is succesvol geplaatst in de community.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Fout bij plaatsen',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Update post
  const updatePost = useMutation({
    mutationFn: async ({ id, ...data }: Partial<CommunityPost> & { id: string }) => {
      const { error } = await supabase
        .from('community_posts')
        .update(data)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
      queryClient.invalidateQueries({ queryKey: ['community-post', variables.id] });
      toast({
        title: 'Bericht bijgewerkt',
        description: 'Je bericht is succesvol bijgewerkt.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Fout bij bijwerken',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Delete post
  const deletePost = useMutation({
    mutationFn: async (postId: string) => {
      const { error } = await supabase
        .from('community_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
      toast({
        title: 'Bericht verwijderd',
        description: 'Je bericht is verwijderd.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Fout bij verwijderen',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Toggle like on post
  const togglePostLike = useMutation({
    mutationFn: async (postId: string) => {
      if (!user) throw new Error('Je moet ingelogd zijn');

      const { data: existingLike } = await supabase
        .from('community_post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingLike) {
        await supabase.from('community_post_likes').delete().eq('id', existingLike.id);
        return { liked: false };
      } else {
        await supabase.from('community_post_likes').insert({ post_id: postId, user_id: user.id });
        return { liked: true };
      }
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
      queryClient.invalidateQueries({ queryKey: ['community-post', postId] });
    },
  });

  // Toggle bookmark
  const toggleBookmark = useMutation({
    mutationFn: async (postId: string) => {
      if (!user) throw new Error('Je moet ingelogd zijn');

      const { data: existingBookmark } = await supabase
        .from('community_bookmarks')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingBookmark) {
        await supabase.from('community_bookmarks').delete().eq('id', existingBookmark.id);
        return { bookmarked: false };
      } else {
        await supabase.from('community_bookmarks').insert({ post_id: postId, user_id: user.id });
        return { bookmarked: true };
      }
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
      queryClient.invalidateQueries({ queryKey: ['community-post', postId] });
      queryClient.invalidateQueries({ queryKey: ['community-bookmarks'] });
    },
  });

  // Create comment
  const createComment = useMutation({
    mutationFn: async (data: CreateCommentData) => {
      if (!user) throw new Error('Je moet ingelogd zijn');

      const { data: newComment, error } = await supabase
        .from('community_comments')
        .insert({
          post_id: data.post_id,
          user_id: user.id,
          content: data.content,
          parent_id: data.parent_id || null,
        })
        .select()
        .single();

      if (error) throw error;
      return newComment;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['community-comments', variables.post_id] });
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
      queryClient.invalidateQueries({ queryKey: ['community-post', variables.post_id] });
      toast({
        title: 'Reactie geplaatst',
        description: 'Je reactie is succesvol geplaatst.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Fout bij plaatsen',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Delete comment
  const deleteComment = useMutation({
    mutationFn: async ({ commentId, postId }: { commentId: string; postId: string }) => {
      const { error } = await supabase
        .from('community_comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;
      return { postId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['community-comments', data.postId] });
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
      toast({
        title: 'Reactie verwijderd',
        description: 'Je reactie is verwijderd.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Fout bij verwijderen',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Toggle comment like
  const toggleCommentLike = useMutation({
    mutationFn: async ({ commentId, postId }: { commentId: string; postId: string }) => {
      if (!user) throw new Error('Je moet ingelogd zijn');

      const { data: existingLike } = await supabase
        .from('community_comment_likes')
        .select('id')
        .eq('comment_id', commentId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingLike) {
        await supabase.from('community_comment_likes').delete().eq('id', existingLike.id);
        return { liked: false, postId };
      } else {
        await supabase.from('community_comment_likes').insert({ comment_id: commentId, user_id: user.id });
        return { liked: true, postId };
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['community-comments', data.postId] });
    },
  });

  // Fetch user's bookmarks
  const { data: bookmarks = [], isLoading: bookmarksLoading } = useQuery({
    queryKey: ['community-bookmarks'],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('community_bookmarks')
        .select('post_id')
        .eq('user_id', user.id);

      if (error) throw error;
      return data.map(b => b.post_id);
    },
    enabled: !!user,
  });

  // Get user's posts
  const { data: userPosts = [], isLoading: userPostsLoading } = useQuery({
    queryKey: ['community-user-posts', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as CommunityPost[];
    },
    enabled: !!user,
  });

  return {
    posts,
    postsLoading,
    bookmarks,
    bookmarksLoading,
    userPosts,
    userPostsLoading,
    usePost,
    useComments,
    createPost,
    updatePost,
    deletePost,
    togglePostLike,
    toggleBookmark,
    createComment,
    deleteComment,
    toggleCommentLike,
    POST_CATEGORIES,
  };
}
