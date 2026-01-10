'use server';

import { z } from 'zod';
import { postSchema } from './schemas/blog';
import { fetchMutation } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { redirect } from 'next/navigation';
import { getToken } from '@/lib/auth-server';

export async function createBlogAction(data: z.infer<typeof postSchema>) {
  const parsed = postSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error('Something went wrong');
  }

  const token = await getToken();

  if (!token) {
    throw new Error('Unauthorized');
  }

  await fetchMutation(
    api.posts.createPost,
    {
      title: parsed.data.title,
      content: parsed.data.content,
    },
    {
      token,
    }
  );

  return redirect('/');
}
