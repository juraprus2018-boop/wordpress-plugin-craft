import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CommunitySidebar } from '@/components/community/CommunitySidebar';
import { CommunityFeed } from '@/components/community/CommunityFeed';
import { PostForm } from '@/components/community/PostForm';
import { useCommunity, CommunityPost } from '@/hooks/useCommunity';
import { useAuth } from '@/lib/auth';
import { toast } from '@/hooks/use-toast';

export default function Community() {
  const { user } = useAuth();
  const { 
    posts, 
    postsLoading, 
    bookmarks,
    createPost, 
    updatePost,
    deletePost,
    togglePostLike, 
    toggleBookmark 
  } = useCommunity();

  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<CommunityPost | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleNewPost = () => {
    if (!user) {
      toast({
        title: 'Inloggen vereist',
        description: 'Je moet ingelogd zijn om een bericht te plaatsen.',
        variant: 'destructive',
      });
      return;
    }
    setEditingPost(null);
    setShowPostForm(true);
  };

  const handleEditPost = (post: CommunityPost) => {
    setEditingPost(post);
    setShowPostForm(true);
  };

  const handleSubmitPost = async (data: { title: string; content: string; category: string }) => {
    if (editingPost) {
      await updatePost.mutateAsync({ id: editingPost.id, ...data });
    } else {
      await createPost.mutateAsync(data);
    }
  };

  const handleLike = (postId: string) => {
    if (!user) {
      toast({
        title: 'Inloggen vereist',
        description: 'Je moet ingelogd zijn om te liken.',
        variant: 'destructive',
      });
      return;
    }
    togglePostLike.mutate(postId);
  };

  const handleBookmark = (postId: string) => {
    if (!user) {
      toast({
        title: 'Inloggen vereist',
        description: 'Je moet ingelogd zijn om berichten op te slaan.',
        variant: 'destructive',
      });
      return;
    }
    toggleBookmark.mutate(postId);
  };

  const handleDeletePost = (postId: string) => {
    deletePost.mutate(postId);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="font-heading font-bold text-2xl lg:text-3xl">Community</h1>
          <p className="text-muted-foreground mt-1">
            Deel ervaringen en leer van anderen over financieel beheer
          </p>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          <CommunitySidebar
            onNewPost={handleNewPost}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
          
          <CommunityFeed
            posts={posts}
            bookmarkedPostIds={bookmarks}
            filter={activeFilter}
            isLoading={postsLoading}
            onLike={handleLike}
            onBookmark={handleBookmark}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
            onNewPost={handleNewPost}
          />
        </div>
      </div>

      {/* Post Form Dialog */}
      <PostForm
        open={showPostForm}
        onOpenChange={setShowPostForm}
        onSubmit={handleSubmitPost}
        editPost={editingPost}
        isLoading={createPost.isPending || updatePost.isPending}
      />
    </DashboardLayout>
  );
}
