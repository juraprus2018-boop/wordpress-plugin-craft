import { useParams, useNavigate, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { nl } from 'date-fns/locale';
import { ArrowLeft, Heart, Bookmark, Share2, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
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
import { CommentSection } from '@/components/community/CommentSection';
import { PostForm } from '@/components/community/PostForm';
import { useCommunity, POST_CATEGORIES } from '@/hooks/useCommunity';
import { useAuth } from '@/lib/auth';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function CommunityPost() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    usePost, 
    useComments, 
    togglePostLike, 
    toggleBookmark, 
    updatePost,
    deletePost,
    createComment,
    deleteComment,
    toggleCommentLike,
  } = useCommunity();

  const { data: post, isLoading: postLoading } = usePost(postId || '');
  const { data: comments = [], isLoading: commentsLoading } = useComments(postId || '');

  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (postLoading) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto space-y-6">
          <Skeleton className="h-10 w-32" />
          <div className="card-elevated p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!post) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto text-center py-16">
          <h1 className="font-heading font-bold text-2xl mb-4">Bericht niet gevonden</h1>
          <p className="text-muted-foreground mb-6">
            Dit bericht bestaat niet of is verwijderd.
          </p>
          <Link to="/community">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug naar community
            </Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const isOwner = user?.id === post.user_id;
  const category = POST_CATEGORIES.find(c => c.value === post.category);
  const authorName = post.author?.full_name || post.author?.username || 'Anoniem';
  const authorInitials = authorName.slice(0, 2).toUpperCase();

  const handleLike = () => {
    if (!user) {
      toast({
        title: 'Inloggen vereist',
        description: 'Je moet ingelogd zijn om te liken.',
        variant: 'destructive',
      });
      return;
    }
    togglePostLike.mutate(post.id);
  };

  const handleBookmark = () => {
    if (!user) {
      toast({
        title: 'Inloggen vereist',
        description: 'Je moet ingelogd zijn om berichten op te slaan.',
        variant: 'destructive',
      });
      return;
    }
    toggleBookmark.mutate(post.id);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.content.slice(0, 100) + '...',
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link gekopieerd',
        description: 'De link is naar je klembord gekopieerd.',
      });
    }
  };

  const handleDelete = () => {
    deletePost.mutate(post.id, {
      onSuccess: () => navigate('/community'),
    });
  };

  const handleEditSubmit = async (data: { title: string; content: string; category: string }) => {
    await updatePost.mutateAsync({ id: post.id, ...data });
    setShowEditForm(false);
  };

  const handleAddComment = async (content: string, parentId?: string) => {
    await createComment.mutateAsync({
      post_id: post.id,
      content,
      parent_id: parentId,
    });
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment.mutate({ commentId, postId: post.id });
  };

  const handleLikeComment = (commentId: string) => {
    if (!user) {
      toast({
        title: 'Inloggen vereist',
        description: 'Je moet ingelogd zijn om te liken.',
        variant: 'destructive',
      });
      return;
    }
    toggleCommentLike.mutate({ commentId, postId: post.id });
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back Button */}
        <Link to="/community">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Terug naar community
          </Button>
        </Link>

        {/* Post */}
        <article className="card-elevated p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-border">
                <AvatarImage src={post.author?.avatar_url || undefined} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {authorInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{authorName}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: nl })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
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
                    <DropdownMenuItem onClick={() => setShowEditForm(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Bewerken
                    </DropdownMenuItem>
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
            <h1 className="font-heading font-bold text-2xl mb-4">{post.title}</h1>
            <p className="text-foreground whitespace-pre-wrap leading-relaxed">{post.content}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={cn(
                  "gap-2 text-muted-foreground hover:text-destructive",
                  post.has_liked && "text-destructive"
                )}
              >
                <Heart className={cn("h-5 w-5", post.has_liked && "fill-current")} />
                <span>{post.likes_count}</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="h-9 w-9 text-muted-foreground hover:text-primary"
              >
                <Share2 className="h-5 w-5" />
              </Button>
              
              {user && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBookmark}
                  className={cn(
                    "h-9 w-9 text-muted-foreground hover:text-primary",
                    post.has_bookmarked && "text-primary"
                  )}
                >
                  <Bookmark className={cn("h-5 w-5", post.has_bookmarked && "fill-current")} />
                </Button>
              )}
            </div>
          </div>
        </article>

        {/* Comments */}
        <div className="card-elevated p-6">
          <CommentSection
            postId={post.id}
            comments={comments}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
            onLikeComment={handleLikeComment}
            isLoading={commentsLoading}
          />
        </div>
      </div>

      {/* Edit Form */}
      <PostForm
        open={showEditForm}
        onOpenChange={setShowEditForm}
        onSubmit={handleEditSubmit}
        editPost={post}
        isLoading={updatePost.isPending}
      />

      {/* Delete Dialog */}
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
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Verwijderen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
