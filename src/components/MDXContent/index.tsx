"use client";

import hljs from "highlight.js";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { ReactNode, useEffect, useState } from "react";
import remarkGfm from "remark-gfm";

import "highlight.js/styles/felipec.css";

const MDXComponents = {
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="text-h2-mobile font-extrabold md:text-h2-desktop">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="text-h3-mobile font-extrabold md:text-h3-desktop">
      {children}
    </h3>
  ),
  h4: ({ children }: { children: ReactNode }) => (
    <h4 className="text-lg font-extrabold md:text-xl">{children}</h4>
  ),
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

    // 코드 블록: highlight.js로 하이라이팅
    const language = className?.replace("language-", "") || "plaintext";
    const codeString = String(children).trim();

    try {
      const highlighted = hljs.highlight(codeString, {
        language,
        ignoreIllegals: true,
      }).value;

      return (
        <code
          className="font-mono text-sm"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      );
    } catch (error) {
      // 하이라이팅 실패 시 원본 코드 반환
      return (
        <code className="font-mono text-sm text-gray-light">{children}</code>
      );
    }
  },
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 border-primary-blue pl-4 italic text-gray-600">
      {children}
    </blockquote>
  ),
  img: (props: any) => (
    <img
      {...props}
      className="h-auto max-w-full rounded-lg"
      alt={props.alt || ""}
    />
  ),
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
    <table className="w-full border-collapse border border-gray-light">
      {children}
    </table>
  ),
  thead: ({ children }: { children: ReactNode }) => (
    <thead className="bg-gray-light">{children}</thead>
  ),
  tbody: ({ children }: { children: ReactNode }) => <tbody>{children}</tbody>,
  tr: ({ children }: { children: ReactNode }) => (
    <tr className="border border-gray-light">{children}</tr>
  ),
  th: ({ children }: { children: ReactNode }) => (
    <th className="border border-gray-light p-3 text-center font-semibold">
      {children}
    </th>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="border border-gray-light p-3 text-center">{children}</td>
  ),
};

interface MDXContentProps {
  source: string;
}

export default function MDXContent({ source }: MDXContentProps) {
  const [mdxSource, setMdxSource] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const compileMdx = async () => {
      try {
        const compiled = await serialize(source, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        });
        setMdxSource(compiled);
      } catch (error) {
        console.error("Failed to serialize MDX:", error);
      } finally {
        setIsLoading(false);
      }
    };

    compileMdx();
  }, [source]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-text-primary">로딩 중...</div>
      </div>
    );
  }

  if (!mdxSource) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-500">콘텐츠를 로드할 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[33px] px-[14px]">
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </div>
  );
}
