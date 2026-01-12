import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PostCard } from './PostCard';
import { CommunityPost, POST_CATEGORIES } from '@/hooks/useCommunity';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/lib/auth';

interface CommunityFeedProps {
  posts: CommunityPost[];
  bookmarkedPostIds: string[];
  filter: string;
  isLoading: boolean;
  onLike: (postId: string) => void;
  onBookmark: (postId: string) => void;
  onEdit: (post: CommunityPost) => void;
  onDelete: (postId: string) => void;
  onNewPost: () => void;
}

export function CommunityFeed({
  posts,
  bookmarkedPostIds,
  filter,
  isLoading,
  onLike,
  onBookmark,
  onEdit,
  onDelete,
  onNewPost,
}: CommunityFeedProps) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Apply filter
    if (filter === 'trending') {
      result = result.filter(p => p.likes_count > 0 || p.comments_count > 0);
    } else if (filter === 'bookmarks') {
      result = result.filter(p => bookmarkedPostIds.includes(p.id));
    } else if (filter === 'my-posts') {
      result = result.filter(p => p.user_id === user?.id);
    } else if (filter.startsWith('cat-')) {
      const category = filter.replace('cat-', '');
      result = result.filter(p => p.category === category);
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p => 
          p.title.toLowerCase().includes(query) || 
          p.content.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    if (sortBy === 'popular') {
      result.sort((a, b) => (b.likes_count + b.comments_count) - (a.likes_count + a.comments_count));
    } else {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    // Pinned posts always on top
    result.sort((a, b) => (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0));

    return result;
  }, [posts, filter, searchQuery, sortBy, bookmarkedPostIds, user?.id]);

  const getFilterTitle = () => {
    if (filter === 'all') return 'Alle berichten';
    if (filter === 'trending') return 'Populaire berichten';
    if (filter === 'bookmarks') return 'Opgeslagen berichten';
    if (filter === 'my-posts') return 'Mijn berichten';
    if (filter.startsWith('cat-')) {
      const category = POST_CATEGORIES.find(c => c.value === filter.replace('cat-', ''));
      return category?.label || 'Berichten';
    }
    return 'Berichten';
  };

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="font-heading font-bold text-xl">{getFilterTitle()}</h2>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Zoeken..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as 'newest' | 'popular')}>
            <SelectTrigger className="w-[130px]">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="newest">Nieuwste</SelectItem>
              <SelectItem value="popular">Populair</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mobile New Post Button */}
      {user && (
        <Button onClick={onNewPost} className="w-full lg:hidden gap-2">
          <PlusCircle className="h-4 w-4" />
          Nieuw bericht
        </Button>
      )}

      {/* Posts List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card-elevated p-5 space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-16 w-full" />
              <div className="flex gap-4">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-2xl border border-border/50">
          <p className="text-lg font-medium text-foreground mb-2">Geen berichten gevonden</p>
          <p className="text-muted-foreground mb-6">
            {filter === 'my-posts' 
              ? 'Je hebt nog geen berichten geplaatst.'
              : filter === 'bookmarks'
              ? 'Je hebt nog geen berichten opgeslagen.'
              : 'Wees de eerste die een bericht plaatst!'}
          </p>
          {user && (
            <Button onClick={onNewPost}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Plaats een bericht
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={onLike}
              onBookmark={onBookmark}
              onEdit={onEdit}
              onDelete={onDelete}
              compact
            />
          ))}
        </div>
      )}
    </div>
  );
}
