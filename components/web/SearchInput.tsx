'use client';

import { Loader2, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';

export const SearchInput = () => {
  const [term, setTerm] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const results = useQuery(
    api.posts.searchPosts,
    term.length >= 2 ? { limit: 5, term: term } : 'skip'
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    setOpen(true);
  };

  return (
    <div className="relative w-full max-w-sm z-10">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 size-4" />
        <Input
          type="text"
          placeholder="Search Blogs..."
          className="w-full pl-8 bg-background"
          onChange={handleInputChange}
        />
      </div>

      {open && term.length >= 2 && (
        <div className="absolute top-full mt-2 rounded-md border bg-popover text-popover-foreground shadow-sm outline-none animate-in fade-in-0 zoom-in-95">
          {results === undefined ? (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
              <Loader2 className="mr-2 size-4 animate-spin" /> Searching...
            </div>
          ) : (
            <div>
              {results.length === 0 ? (
                <p className="p-4 text-sm text-muted-foreground text-center">
                  No results found!
                </p>
              ) : (
                <div className="py-1">
                  {results.map((blog) => (
                    <Link
                      className="flex flex-col px-4 py-2 text-sm hover:text-accent-foreground cursor-pointer"
                      href={`/blog/${blog._id}`}
                      key={blog._id}
                      onClick={() => {
                        setOpen(false);
                        setTerm('');
                      }}
                    >
                      <p className="font-medium truncate">{blog.title}</p>
                      <p className="text-xs text-muted-foreground pt-1">
                        {blog.content.substring(0, 50)}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
