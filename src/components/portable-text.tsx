import {
  PortableText as PortableTextRenderer,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import Link from "next/link";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-muted-foreground">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold tracking-tight">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold tracking-tight">{children}</h3>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <Link
        href={value?.href ?? "#"}
        className="text-primary underline underline-offset-4"
      >
        {children}
      </Link>
    ),
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="text-muted-foreground ml-6 list-disc space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="text-muted-foreground ml-6 list-decimal space-y-2">
        {children}
      </ol>
    ),
  },
  listItem: ({ children }) => <li>{children}</li>,
};

export function PortableText({
  blocks,
  className,
}: {
  blocks?: PortableTextBlock[];
  className?: string;
}) {
  if (!blocks?.length) return null;
  return (
    <div className={className ?? "space-y-4"}>
      <PortableTextRenderer value={blocks} components={components} />
    </div>
  );
}
