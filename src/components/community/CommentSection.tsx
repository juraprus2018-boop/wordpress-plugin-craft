import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Heart, Reply, Trash2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { CommunityComment } from '@/hooks/useCommunity';
import { cn } from '@/lib/utils';

interface CommentSectionProps {
  postId: string;
  comments: CommunityComment[];
  onAddComment: (content: string, parentId?: string) => Promise<void>;
  onDeleteComment: (commentId: string) => void;
  onLikeComment: (commentId: string) => void;
  isLoading?: boolean;
}

interface CommentItemProps {
  comment: CommunityComment;
  postId: string;
  onReply: (parentId: string) => void;
  onDelete: (commentId: string) => void;
  onLike: (commentId: string) => void;
  isNested?: boolean;
}

function CommentItem({ comment, postId, onReply, onDelete, onLike, isNested = false }: CommentItemProps) {
  const { user } = useAuth();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const isOwner = user?.id === comment.user_id;
  const authorName = comment.author?.full_name || comment.author?.username || 'Anoniem';
  const authorInitials = authorName.slice(0, 2).toUpperCase();

  return (
    <>
      <div className={cn(
        "flex gap-3",
        isNested && "ml-12 mt-3"
      )}>
        <Avatar className={cn("border border-border", isNested ? "h-8 w-8" : "h-10 w-10")}>
          <AvatarImage src={comment.author?.avatar_url || undefined} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
            {authorInitials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="bg-muted/50 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm">{authorName}</span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: nl })}
              </span>
            </div>
            <p className="text-sm text-foreground whitespace-pre-wrap">{comment.content}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(comment.id)}
              className={cn(
                "h-7 gap-1 text-xs text-muted-foreground hover:text-destructive",
                comment.has_liked && "text-destructive"
              )}
            >
              <Heart className={cn("h-3 w-3", comment.has_liked && "fill-current")} />
              {comment.likes_count > 0 && comment.likes_count}
            </Button>

            {user && !isNested && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onReply(comment.id)}
                className="h-7 gap-1 text-xs text-muted-foreground hover:text-primary"
              >
                <Reply className="h-3 w-3" />
                Reageer
              </Button>
            )}

            {isOwner && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
                className="h-7 gap-1 text-xs text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Nested replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="space-y-3 mt-3">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  postId={postId}
                  onReply={onReply}
                  onDelete={onDelete}
                  onLike={onLike}
                  isNested
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reactie verwijderen?</AlertDialogTitle>
            <AlertDialogDescription>
              Weet je zeker dat je deze reactie wilt verwijderen?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(comment.id)}
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

export function CommentSection({ 
  postId, 
  comments, 
  onAddComment, 
  onDeleteComment, 
  onLikeComment,
  isLoading 
}: CommentSectionProps) {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    
    setSubmitting(true);
    try {
      await onAddComment(newComment.trim(), replyingTo || undefined);
      setNewComment('');
      setReplyingTo(null);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = (parentId: string) => {
    setReplyingTo(parentId);
    // Focus the textarea
    document.getElementById('comment-input')?.focus();
  };

  const replyingToComment = replyingTo 
    ? comments.find(c => c.id === replyingTo) 
    : null;

  return (
    <div className="space-y-6">
      <h3 className="font-heading font-semibold text-lg">
        Reacties ({comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0)})
      </h3>

      {/* Comment input */}
      {user ? (
        <div className="space-y-2">
          {replyingTo && replyingToComment && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
              <Reply className="h-4 w-4" />
              <span>
                Reageren op {replyingToComment.author?.full_name || 'Anoniem'}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyingTo(null)}
                className="h-6 px-2 ml-auto"
              >
                Annuleren
              </Button>
            </div>
          )}
          
          <div className="flex gap-3">
            <Textarea
              id="comment-input"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Schrijf een reactie..."
              className="min-h-[80px] resize-none"
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleSubmit} 
              disabled={!newComment.trim() || submitting}
              size="sm"
            >
              <Send className="h-4 w-4 mr-2" />
              Plaatsen
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 bg-muted/50 rounded-xl">
          <p className="text-muted-foreground">
            <a href="/auth" className="text-primary hover:underline">Log in</a> om te reageren
          </p>
        </div>
      )}

      {/* Comments list */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="h-10 w-10 rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-20 rounded-xl bg-muted" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nog geen reacties. Wees de eerste!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={postId}
              onReply={handleReply}
              onDelete={onDeleteComment}
              onLike={onLikeComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}
