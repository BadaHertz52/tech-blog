import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { ReactNode } from "react";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import { generateUUID } from "@/utils/id";
import "highlight.js/styles/felipec.css";
import type { TocHeading } from "@/types/article";

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

/**
 * 마크다운 포맷팅 제거
 * **굵게**, *기울임*, `코드` 등을 제거하여 순수 텍스트만 추출
 */
const stripMarkdown = (text: string): string => {
  return text
    .replace(/\*\*\*(.+?)\*\*\*/g, "$1") // ***굵은기울임*** → 굵은기울임
    .replace(/\*\*(.+?)\*\*/g, "$1") // **굵게** → 굵게
    .replace(/\*(.+?)\*/g, "$1") // *기울임* → 기울임
    .replace(/__(.+?)__/g, "$1") // __굵게__ → 굵게
    .replace(/_(.+?)_/g, "$1") // _기울임_ → 기울임
    .replace(/`(.+?)`/g, "$1") // `코드` → 코드
    .replace(/\[(.+?)\]\(.+?\)/g, "$1") // [링크](url) → 링크
    .trim();
};

const getHeadingId = ({
  text,
  level,
  headings,
}: {
  text: string;
  level: 2 | 3 | 4;
  headings: TocHeading[];
}): string => {
  const cleanText = stripMarkdown(text);
  const heading = headings.find((h) => h.text === cleanText && h.level === level);
  return heading?.id ?? `heading-h${level}-${generateUUID()}`;
};

const createMDXComponents = (headings: TocHeading[]) => ({
  h2: ({ children }: { children: ReactNode }) => {
    const text = extractTextFromChildren(children);
    const id = getHeadingId({ text, level: 2, headings });
    return (
      <h2 id={id} className="text-h2-mobile font-extrabold md:text-h2-desktop">
        {children}
      </h2>
    );
  },
  h3: ({ children }: { children: ReactNode }) => {
    const text = extractTextFromChildren(children);
    const id = getHeadingId({ text, level: 3, headings });
    return (
      <h3 id={id} className="text-h3-mobile font-extrabold md:text-h3-desktop">
        {children}
      </h3>
    );
  },
  h4: ({ children }: { children: ReactNode }) => {
    const text = extractTextFromChildren(children);
    const id = getHeadingId({ text, level: 4, headings });
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
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
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
});

interface MDXContentProps {
  source: string;
  headings: TocHeading[];
}

export default function MDXContent({ source, headings }: MDXContentProps) {
  const mdxComponents = createMDXComponents(headings);

  return (
    <div className="flex w-full flex-col gap-[33px] px-[14px]">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight],
          },
        }}
        components={mdxComponents}
      />
    </div>
  );
}
