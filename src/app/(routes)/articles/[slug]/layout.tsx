import { ReactNode } from "react";

interface ArticleDetailLayoutProps {
  children: ReactNode;
}

export default function ArticleDetailLayout({
  children,
}: ArticleDetailLayoutProps) {
  return <article className="flex h-full w-full gap-8">{children}</article>;
}
