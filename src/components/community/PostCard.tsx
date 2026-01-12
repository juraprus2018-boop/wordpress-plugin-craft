import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { nl } from 'date-fns/locale';
import { 
  Heart, 
  MessageCircle, 
  Bookmark, 
  MoreHorizontal, 
  Edit, 
  Trash2,
  Pin,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/lib/auth';
import { CommunityPost, POST_CATEGORIES } from '@/hooks/useCommunity';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: CommunityPost;
  onLike: (postId: string) => void;
  onBookmark: (postId: string) => void;
  onEdit?: (post: CommunityPost) => void;
  onDelete: (postId: string) => void;
  compact?: boolean;
}

export function PostCard({ post, onLike, onBookmark, onEdit, onDelete, compact = false }: PostCardProps) {
  const { user } = useAuth();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const isOwner = user?.id === post.user_id;
  const category = POST_CATEGORIES.find(c => c.value === post.category);
  
  const authorName = post.author?.full_name || post.author?.username || 'Anoniem';
  const authorInitials = authorName.slice(0, 2).toUpperCase();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.content.slice(0, 100) + '...',
          url: window.location.origin + `/community/${post.id}`,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(window.location.origin + `/community/${post.id}`);
    }
  };

  return (
    <>
      <article className={cn(
        "card-elevated p-5 space-y-4 transition-all duration-200",
        post.is_pinned && "border-primary/30 bg-primary/5"
      )}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-border">
              <AvatarImage src={post.author?.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                {authorInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{authorName}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: nl })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {post.is_pinned && (
              <Pin className="h-4 w-4 text-primary" />
            )}
            {category && (
              <Badge variant="secondary" className={cn("text-xs", category.color, "text-white")}>
                {category.label}
              </Badge>
            )}
            {isOwner && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover">
                  {onEdit && (
                    <DropdownMenuItem onClick={() => onEdit(post)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Bewerken
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => setShowDeleteDialog(true)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Verwijderen
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Content */}
        <div>
          <Link 
            to={`/community/${post.id}`} 
            className="block group"
          >
            <h3 className="font-heading font-semibold text-lg group-hover:text-primary transition-colors">
              {post.title}
            </h3>
          </Link>
          <p className={cn(
            "text-muted-foreground mt-2",
            compact && "line-clamp-2"
          )}>
            {post.content}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(post.id)}
              className={cn(
                "gap-2 text-muted-foreground hover:text-destructive",
                post.has_liked && "text-destructive"
              )}
            >
              <Heart className={cn("h-4 w-4", post.has_liked && "fill-current")} />
              <span className="text-sm">{post.likes_count}</span>
            </Button>
            
            <Link to={`/community/${post.id}`}>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">{post.comments_count}</span>
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            
            {user && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onBookmark(post.id)}
                className={cn(
                  "h-8 w-8 text-muted-foreground hover:text-primary",
                  post.has_bookmarked && "text-primary"
                )}
              >
                <Bookmark className={cn("h-4 w-4", post.has_bookmarked && "fill-current")} />
              </Button>
            )}
          </div>
        </div>
      </article>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bericht verwijderen?</AlertDialogTitle>
            <AlertDialogDescription>
              Weet je zeker dat je dit bericht wilt verwijderen? Dit kan niet ongedaan worden gemaakt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(post.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Verwijderen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
