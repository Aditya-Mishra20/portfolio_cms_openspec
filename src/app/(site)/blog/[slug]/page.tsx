import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PortableText } from "@/components/portable-text";
import { Button } from "@/components/ui/button";
import { getBlogPost, getBlogPosts } from "@/sanity/lib/queries/blog";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.coverImage
      ? {
          title: post.title,
          description: post.excerpt,
          images: [post.coverImage],
        }
      : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl space-y-8 px-4 py-16">
      <Button
        render={<Link href="/blog" />}
        variant="ghost"
        size="sm"
        nativeButton={false}
      >
        ← Back to blog
      </Button>
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
        {post.publishedAt ? (
          <p className="text-muted-foreground text-sm">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        ) : null}
      </header>
      {post.coverImage ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      ) : null}
      <PortableText
        blocks={post.body}
        className="space-y-4 text-lg leading-relaxed"
      />
    </article>
  );
}
