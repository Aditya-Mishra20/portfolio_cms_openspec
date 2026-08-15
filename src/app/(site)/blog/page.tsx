import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBlogPosts } from "@/sanity/lib/queries/blog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles and notes from my developer journey.",
};

function formatDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-16">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground max-w-2xl">
          Articles, tutorials, and notes.
        </p>
      </section>

      {posts.length ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug.current} href={`/blog/${post.slug.current}`}>
              <Card className="hover:bg-accent h-full transition-colors">
                {post.coverImage ? (
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  {post.publishedAt ? (
                    <p className="text-muted-foreground text-sm">
                      {formatDate(post.publishedAt)}
                    </p>
                  ) : null}
                </CardHeader>
                {post.excerpt ? (
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {post.excerpt}
                    </p>
                  </CardContent>
                ) : null}
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No posts yet — check back soon.</p>
      )}
    </div>
  );
}
