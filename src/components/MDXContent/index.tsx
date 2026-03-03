"use client";

import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import { generateHeadingId } from "@/utils/article";
import EmptyState from "../EmptyState";
import "highlight.js/styles/felipec.css";

interface MDXImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}

const extractTextFromChildren = (children: ReactNode): string => {
  if (typeof children === "string") {
    return children;
  }
  if (Array.isArray(children)) {
    return children
      .map((child) =>
        typeof child === "string" ? child : child?.props?.children || ""
      )
      .join("");
  }
  return "";
};

const MDXComponents = {
  h2: ({ children }: { children: ReactNode }) => {
    const text = extractTextFromChildren(children);
    const id = generateHeadingId(text);
    return (
      <h2 id={id} className="text-h2-mobile font-extrabold md:text-h2-desktop">
        {children}
      </h2>
    );
  },
  h3: ({ children }: { children: ReactNode }) => {
    const text = extractTextFromChildren(children);
    const id = generateHeadingId(text);
    return (
      <h3 id={id} className="text-h3-mobile font-extrabold md:text-h3-desktop">
        {children}
      </h3>
    );
  },
  h4: ({ children }: { children: ReactNode }) => {
    const text = extractTextFromChildren(children);
    const id = generateHeadingId(text);
    return (
      <h4 id={id} className="text-lg font-extrabold md:text-xl">
        {children}
      </h4>
    );
  },
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-base leading-relaxed text-text-primary">{children}</p>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="list-disc space-y-3 pl-6">{children}</ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal space-y-3 pl-6">{children}</ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="text-base text-text-primary">{children}</li>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <pre className="overflow-x-auto rounded-lg bg-gray-charcoal p-4">
      {children}
    </pre>
  ),
  code: ({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }) => {
    const isInline = !className?.includes("language-");

    if (isInline) {
      return (
        <code className="rounded bg-gray-light px-2 py-1 font-mono text-sm">
          {children}
        </code>
      );
    }

    return (
      <code className="font-mono text-sm text-gray-light">{children}</code>
    );
  },
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 border-primary-blue pl-4 italic text-gray-600">
      {children}
    </blockquote>
  ),
  img: ({ src, alt, width, height }: MDXImageProps) => {
    if (!src) return null;

    if (!width || !height) {
      return (
        <Image
          src={src}
          alt={alt || ""}
          fill
          className="h-auto max-w-full rounded-lg"
        />
      );
    }

    return (
      <Image
        src={src}
        alt={alt || ""}
        width={width}
        height={height}
        className="h-auto max-w-full rounded-lg"
      />
    );
  },
  a: ({ children, href }: { children: ReactNode; href?: string }) => (
    <a
      href={href}
      className="text-primary-blue hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  table: ({ children }: { children: ReactNode }) => (
    <table className="w-full border-collapse bg-white">{children}</table>
  ),
  thead: ({ children }: { children: ReactNode }) => (
    <thead className="bg-gray-light">{children}</thead>
  ),
  tbody: ({ children }: { children: ReactNode }) => <tbody>{children}</tbody>,
  tr: ({ children }: { children: ReactNode }) => <tr>{children}</tr>,
  th: ({ children }: { children: ReactNode }) => (
    <th className="border border-gray-200 p-3 text-center font-semibold">
      {children}
    </th>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="border border-gray-200 p-3 text-center">{children}</td>
  ),
};

interface MDXContentProps {
  source: string;
}

export default function MDXContent({ source }: MDXContentProps) {
  const [mdxSource, setMdxSource] = useState<any>(null);

  useEffect(() => {
    const compileMdx = async () => {
      try {
        const compiled = await serialize(source, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight],
          },
        });
        setMdxSource(compiled);
      } catch (error) {
        console.error("Failed to serialize MDX:", error);
      }
    };

    compileMdx();
  }, [source]);

  if (!mdxSource) {
    return (
      <div className="flex items-center justify-center py-8">
        <EmptyState>
          <EmptyState.Icon />
          <EmptyState.Content>
            <p>죄송해요. 이 글을 표시할 수 없어요.</p>
          </EmptyState.Content>
        </EmptyState>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-[33px] px-[14px]">
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </div>
  );
}
