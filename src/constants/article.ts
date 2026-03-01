import { ArticleCategory } from "@/types/article";

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  troubleshooting: "TROUBLESHOOTING",
  retrospective: "RETROSPECTIVE",
  frontend: "FRONTEND",
  cs: "CS",
  project: "PROJECT",
  etc: "ETC",
  ai: "AI",
};

export const CATEGORY_LABELS_COLOR: Record<
  ArticleCategory,
  { bg: string; text: string }
> = {
  troubleshooting: { bg: "bg-red-100", text: "text-red-500" },
  retrospective: { bg: "bg-yellow-100", text: "text-yellow-500" },
  frontend: { bg: "bg-blue-100", text: "text-blue-500" },
  cs: { bg: "bg-green-100", text: "text-green-500" },
  project: { bg: "bg-purple-100", text: "text-purple-500" },
  etc: { bg: "bg-gray-100", text: "text-gray-500" },
  ai: { bg: "bg-pink-100", text: "text-pink-500" },
};
