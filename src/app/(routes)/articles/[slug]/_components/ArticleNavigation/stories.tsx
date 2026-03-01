import type { Meta, StoryObj } from "@storybook/react";

import { ArticleCardData } from "@/types/article";
import ArticleNavigation from "./index";

const BASIC_THUMBNAIL = "/articles/assets/basic-thumbnail.webp";

const mockArticles: Record<string, ArticleCardData> = {
  prev: {
    title: "이전 글: Next.js에서 이미지 최적화하기",
    description: "Image 컴포넌트로 성능 개선",
    date: "2026-02-17",
    category: "frontend",
    thumbnail: BASIC_THUMBNAIL,
    slug: "nextjs-optimization",
  },
  next: {
    title: "다음 글: Async/Await 깊이 있게 이해하기",
    description: "이벤트 루프와 Promise, 그리고 async 함수의 동작 원리",
    date: "2026-02-10",
    category: "cs",
    thumbnail: BASIC_THUMBNAIL,
    slug: "understanding-async-await",
  },
};

const meta = {
  title: "Article/ArticleNavigation",
  component: ArticleNavigation,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ArticleNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <div className="flex w-full max-w-2xl flex-col gap-1">
        <h2 className="mb-4 text-xl font-bold">Article Navigation</h2>
        <ArticleNavigation prev={mockArticles.prev} next={mockArticles.next} />
      </div>
      <div className="flex w-full max-w-2xl flex-col gap-1">
        <h2 className="mt-8 text-xl font-bold">No Next Article</h2>
        <ArticleNavigation prev={mockArticles.prev} />
      </div>
      <div className="flex w-full max-w-2xl flex-col gap-1">
        <h2 className="mt-8 text-xl font-bold">No Previous Article</h2>
        <ArticleNavigation next={mockArticles.next} />
      </div>
    </>
  ),
};
