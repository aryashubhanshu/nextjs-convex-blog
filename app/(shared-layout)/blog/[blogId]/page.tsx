import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CommentSection } from '@/components/web/CommentSection';
import { PostPresence } from '@/components/web/PostPresence';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { getToken } from '@/lib/auth-server';
import { cn } from '@/lib/utils';
import { fetchQuery, preloadQuery } from 'convex/nextjs';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPostPageProps {
  params: Promise<{ blogId: Id<'posts'> }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { blogId } = await params;

  const post = await fetchQuery(api.posts.getPostById, { postId: blogId });

  if (!post) {
    return {
      title: 'Post not found',
      description: 'Post not found',
    };
  }

  return {
    title: post.title,
    description: post.content,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { blogId } = await params;

  const token = await getToken();

  const [post, preloadedComments, userId] = await Promise.all([
    await fetchQuery(api.posts.getPostById, { postId: blogId }),
    await preloadQuery(api.comments.getCommentsByPostId, { postId: blogId }),
    await fetchQuery(api.presence.getUserId, {}, { token }),
  ]);

  if (!post) {
    return (
      <div>
        <h1 className="text-6xl font-extrabold text-red-500 py-20">
          Post not found
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link
        className={cn(buttonVariants({ variant: 'ghost' }), 'mb-4')}
        href="/blog"
      >
        <ArrowLeft className="size-4" /> Back to Blog
      </Link>

      <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm">
        <Image
          src={
            post.imageUrl ??
            'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          alt={post.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="space-y-4 flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {post.title}
          </h1>

          <div>
            {userId && <PostPresence roomId={post._id} userId={userId} />}
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Posted on: {new Date(post._creationTime).toLocaleDateString('en-US')}
        </p>

        <Separator className="my-2" />

        <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
          {post.content}
        </p>

        <CommentSection preloadedComments={preloadedComments} />
      </div>
    </div>
  );
}
