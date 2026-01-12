import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CommentSection } from '@/components/web/CommentSection';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { fetchQuery } from 'convex/nextjs';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPostPageProps {
  params: Promise<{ blogId: Id<'posts'> }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { blogId } = await params;

  const post = await fetchQuery(api.posts.getPostById, { postId: blogId });

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
        <div className="flex items-baseline justify-between">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {post.title}
          </h1>

          <p className="text-sm text-muted-foreground">
            Posted on:{' '}
            {new Date(post._creationTime).toLocaleDateString('en-US')}
          </p>
        </div>

        <Separator className="my-4" />

        <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
          {post.content}
        </p>

        <Separator className="my-4" />

        <CommentSection />
      </div>
    </div>
  );
}
