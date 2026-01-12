'use client';

import { Loader2, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { commentSchema } from '@/app/schemas/comment';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import z from 'zod';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';

export function CommentSection() {
  const params = useParams<{ blogId: Id<'posts'> }>();
  const [isPending, startTransition] = useTransition();

  const comments = useQuery(api.comments.getCommentsByPostId, {
    postId: params.blogId,
  });
  const createComment = useMutation(api.comments.createComment);

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: '',
      postId: params.blogId,
    },
  });

  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    try {
      startTransition(() => {
        createComment(data);
        form.reset();
        toast.success('Comment posted');
      });
    } catch {
      toast.error('Failed to create comment');
    }
  };

  if (comments === undefined) return <p>No comments yet!</p>;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 border-b">
        <MessageSquare className="size-5" />
        <h2 className="text-xl font-bold">{comments?.length ?? 0} Comments</h2>
      </CardHeader>
      <CardContent className="space-y-8">
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Comment</FieldLabel>
                <Textarea
                  aria-invalid={fieldState.invalid}
                  placeholder="Write your comment here"
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Posting...
              </>
            ) : (
              'Post'
            )}
          </Button>
        </form>

        {comments?.length > 0 && <Separator />}

        <section className="space-y-6">
          {comments?.map((comment) => (
            <div key={comment._id} className="flex gap-4">
              <Avatar>
                <AvatarImage
                  src={`https://avatar.vercel.sh/${comment.authorName}`}
                />
                <AvatarFallback>
                  {comment.authorName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">{comment.authorName}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(comment._creationTime).toLocaleDateString(
                      'en-US'
                    )}
                  </p>
                </div>
                <p className="text-sm text-foreground/90 whitespace-pre-wrap">
                  {comment.body}
                </p>
              </div>
            </div>
          ))}
        </section>
      </CardContent>
    </Card>
  );
}
