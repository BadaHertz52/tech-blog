import fs from "fs";
import path from "path";
import matter from "gray-matter";

import type { ArticleCategory, ArticleMeta } from "@/types/article";
import type { ValidationError } from "@/types/error";

const ARTICLE_DATA_DIRECTORY = path.join(process.cwd(), "public/articles");

const VALID_CATEGORIES: ArticleCategory[] = [
  "troubleshooting",
  "retrospective",
  "frontend",
  "cs",
  "project",
  "ai",
  "etc",
];

const REQUIRED_FIELDS = [
  "title",
  "description",
  "date",
  "category",
  "thumbnail",
  "slug",
];

export const MAX_TITLE_LENGTH = 100;
export const MAX_DESCRIPTION_LENGTH = 100;
const DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const isValidDate = (dateString: unknown): boolean => {
  if (typeof dateString !== "string") {
    return false;
  }

  if (!DATE_FORMAT_REGEX.test(dateString)) {
    return false;
  }

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  // JavaScript Date는 유효하지 않은 날짜를 보정하므로, 입력과 실제 값을 비교
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

const validateRequiredFields = (
  meta: Record<string, unknown>
): ValidationError[] => {
  return REQUIRED_FIELDS.filter((field) => !(field in meta)).map((field) => ({
    field,
    message: `Required field "${field}" is missing`,
  }));
};

const validateTitle = (title: unknown): ValidationError[] => {
  if (typeof title !== "string") {
    return [{ field: "title", message: "title must be a string" }];
  }

  if (title.length === 0) {
    return [{ field: "title", message: "title cannot be empty" }];
  }

  if (title.length > MAX_TITLE_LENGTH) {
    return [
      {
        field: "title",
        message: `title must be ${MAX_TITLE_LENGTH} characters or less`,
      },
    ];
  }

  return [];
};

const validateDescription = (description: unknown): ValidationError[] => {
  if (typeof description !== "string") {
    return [{ field: "description", message: "description must be a string" }];
  }

  if (description.length === 0) {
    return [{ field: "description", message: "description cannot be empty" }];
  }

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return [
      {
        field: "description",
        message: `description must be ${MAX_DESCRIPTION_LENGTH} characters or less (ideally ≤20)`,
      },
    ];
  }

  return [];
};

const validateDate = (date: unknown): ValidationError[] => {
  return !isValidDate(date)
    ? [
        {
          field: "date",
          message: "date must be in YYYY-MM-DD format and be a valid date",
        },
      ]
    : [];
};

const validateCategory = (category: unknown): ValidationError[] => {
  if (typeof category !== "string") {
    return [{ field: "category", message: "category must be a string" }];
  }

  if (!VALID_CATEGORIES.includes(category as ArticleCategory)) {
    return [
      {
        field: "category",
        message: `category must be one of: ${VALID_CATEGORIES.join(", ")}`,
      },
    ];
  }

  return [];
};

const validateThumbnailField = (thumbnail: unknown): ValidationError[] => {
  if (typeof thumbnail !== "string") {
    return [{ field: "thumbnail", message: "thumbnail must be a string" }];
  }

  if (thumbnail.length === 0) {
    return [{ field: "thumbnail", message: "thumbnail cannot be empty" }];
  }

  return [];
};

const validateSlug = (slug: unknown): ValidationError[] => {
  if (typeof slug !== "string") {
    return [{ field: "slug", message: "slug must be a string" }];
  }
  if (slug.length === 0) {
    return [{ field: "slug", message: "slug cannot be empty" }];
  }
  return [];
};

const collectFrontmatterErrors = (
  meta: Record<string, unknown>
): ValidationError[] => {
  return [
    ...validateRequiredFields(meta),
    ...validateTitle(meta.title),
    ...validateDescription(meta.description),
    ...validateDate(meta.date),
    ...validateCategory(meta.category),
    ...validateThumbnailField(meta.thumbnail),
    ...validateSlug(meta.slug),
  ];
};

const buildArticleMeta = (meta: Record<string, unknown>): ArticleMeta => {
  return {
    title: meta.title as string,
    description: meta.description as string,
    date: meta.date as string,
    category: meta.category as ArticleCategory,
    thumbnail: meta.thumbnail as string,
    slug: meta.slug as string,
  };
};

const validateFrontmatter = (
  metadata: unknown
):
  | { valid: true; data: ArticleMeta }
  | { valid: false; errors: ValidationError[] } => {
  if (typeof metadata !== "object" || metadata === null) {
    return {
      valid: false,
      errors: [
        { field: "metadata", message: "Frontmatter must be a valid object" },
      ],
    };
  }

  const meta = metadata as Record<string, unknown>;
  const errors = collectFrontmatterErrors(meta);

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: buildArticleMeta(meta),
  };
};

const validateArticleStructure = (slug: string): ValidationError[] => {
  const errors: ValidationError[] = [];
  const articleDir = path.join(ARTICLE_DATA_DIRECTORY, slug);
  const mdxPath = path.join(articleDir, "index.mdx");

  if (!fs.existsSync(articleDir)) {
    errors.push({
      field: "structure",
      message: `Article directory not found: ${articleDir}`,
    });

    return errors;
  }

  if (!fs.existsSync(mdxPath)) {
    errors.push({
      field: "structure",
      message: `index.mdx file not found in ${articleDir}`,
    });
  }

  return errors;
};

const validateAbsoluteThumbnailPath = (
  thumbnailPath: string
): ValidationError[] => {
  const fullPath = path.join(process.cwd(), "public", thumbnailPath);
  if (!fs.existsSync(fullPath)) {
    return [
      {
        field: "thumbnail",
        message: `Thumbnail file not found: ${thumbnailPath}`,
      },
    ];
  }

  return [];
};

const validateRelativeThumbnailPath = (
  slug: string,
  thumbnailPath: string
): ValidationError[] => {
  const cleanPath = thumbnailPath.startsWith("./")
    ? thumbnailPath.slice(2)
    : thumbnailPath;
  const fullPath = path.join(ARTICLE_DATA_DIRECTORY, slug, cleanPath);

  if (!fs.existsSync(fullPath)) {
    return [
      {
        field: "thumbnail",
        message: `Thumbnail file not found: ${slug}/${cleanPath}`,
      },
    ];
  }

  return [];
};

const validateThumbnailFile = (
  slug: string,
  thumbnailPath: string
): ValidationError[] => {
  if (thumbnailPath.startsWith("/")) {
    return validateAbsoluteThumbnailPath(thumbnailPath);
  }

  return validateRelativeThumbnailPath(slug, thumbnailPath);
};

const parseMDXFile = (
  slug: string
):
  | { valid: true; data: Record<string, unknown>; content: string }
  | { valid: false; errors: ValidationError[] } => {
  try {
    const mdxPath = path.join(ARTICLE_DATA_DIRECTORY, slug, "index.mdx");
    const fileContent = fs.readFileSync(mdxPath, "utf-8");
    const { data, content } = matter(fileContent);

    return { valid: true, data, content };
  } catch (error) {
    return {
      valid: false,
      errors: [
        {
          field: "parse",
          message: `Failed to parse MDX file: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
    };
  }
};

const validateArticleFile = (
  slug: string
):
  | {
      valid: true;
      meta: Record<string, unknown>;
      content: string;
    }
  | {
      valid: false;
      errors: ValidationError[];
    } => {
  const mdxPath = path.join(ARTICLE_DATA_DIRECTORY, slug, "index.mdx");

  if (!fs.existsSync(mdxPath)) {
    return {
      valid: false,
      errors: [
        {
          field: "file",
          message: `index.mdx not found for slug: ${slug}`,
        },
      ],
    };
  }

  const parseResult = parseMDXFile(slug);
  if (!parseResult.valid) {
    return parseResult;
  }

  const validation = validateFrontmatter(parseResult.data);
  if (!validation.valid) {
    return {
      valid: false,
      errors: validation.errors,
    };
  }

  return {
    valid: true,
    meta: parseResult.data,
    content: parseResult.content,
  };
};

export const validateArticle = (slug: string): ValidationError[] => {
  const errors: ValidationError[] = [];

  // 1. 폴더/파일 구조 검증
  errors.push(...validateArticleStructure(slug));
  if (errors.length > 0) {
    return errors;
  }

  // 2. MDX 파일 파싱 및 frontmatter 검증
  const fileValidation = validateArticleFile(slug);
  if (!fileValidation.valid) {
    return fileValidation.errors;
  }

  // 3. 썸네일 존재 검증
  const thumbnailPath = fileValidation.meta.thumbnail;
  if (typeof thumbnailPath === "string") {
    errors.push(...validateThumbnailFile(slug, thumbnailPath));
  }

  return errors;
};

// Export helper functions for testing
export const testHelpers = {
  isValidDate,
  validateTitle,
  validateDescription,
  validateDate,
  validateCategory,
  validateSlug,
};
