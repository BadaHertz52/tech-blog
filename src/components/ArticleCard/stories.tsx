import type { Meta, StoryObj } from "@storybook/react";

import { ArticleCardData } from "@/types/article";
import ArticleCard from "./index";

const BASIC_THUMBNAIL = "/articles/assets/basic-thumbnail.webp";

const mockArticles: Record<string, ArticleCardData> = {
  troubleshooting: {
    title: "CORS 에러 해결하기",
    description: "브라우저 보안 정책 이해",
    date: "2026-02-18",
    category: "troubleshooting",
    thumbnail: BASIC_THUMBNAIL,
    slug: "troubleshooting-cors-error",
    views: 142,
    readingTime: 5,
  },
  frontend: {
    title: "Next.js에서 이미지 최적화하기",
    description: "Image 컴포넌트로 성능 개선",
    date: "2026-02-17",
    category: "frontend",
    thumbnail: BASIC_THUMBNAIL,
    slug: "nextjs-optimization",
    views: 87,
    readingTime: 8,
  },
  retrospective: {
    title: "제목 말줄임 테스트 케이스 123 3456789012",
    description:
      "소개글 말줄임 테스트 케이스 1234567890 1234567890 1234456788 !!!  1231242353465457568678677  4523524624634623523",
    date: "2026-01-15",
    category: "retrospective",
    thumbnail: BASIC_THUMBNAIL,
    slug: "2025-retrospective",
    views: 203,
    readingTime: 12,
  },
  cs: {
    title: "Async/Await 깊이 있게 이해하기",
    description: "이벤트 루프와 Promise, 그리고 async 함수의 동작 원리",
    date: "2026-02-10",
    category: "cs",
    thumbnail: BASIC_THUMBNAIL,
    slug: "understanding-async-await",
    views: 156,
    readingTime: 10,
  },
  project: {
    title: "개인 프로젝트로 배운 것들",
    description: "사이드 프로젝트 개발 경험 공유",
    date: "2026-02-05",
    category: "project",
    thumbnail: BASIC_THUMBNAIL,
    slug: "personal-project-journey",
    views: 94,
    readingTime: 7,
  },
  etc: {
    title: "개발자를 위한 생산성 팁",
    description: "일상 개발 업무에서 활용할 수 있는 팁들",
    date: "2026-02-01",
    category: "etc",
    thumbnail: BASIC_THUMBNAIL,
    slug: "productivity-tips",
    views: 267,
    readingTime: 6,
  },
};

const meta: Meta<typeof ArticleCard> = {
  title: "Components/ArticleCard",
  component: ArticleCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    article: {
      control: "object",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleCard>;

export const AllCategories: Story = {
  name: "All Categories",
  render: () => (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Object.values(mockArticles).map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  ),
};
