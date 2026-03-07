import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { ARTICLE_DATA_DIRECTORY, PUBLIC_DIRECTORY } from "@/constants/paths";
import type { ArticleCategory, ArticleMeta } from "@/types/article";
import type { ValidationError } from "@/types/error";

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
  // fullPath: 정규화된 절대 경로 (.. 포함해서 실제 위치 파악)
  const fullPath = path.resolve(PUBLIC_DIRECTORY, thumbnailPath);
  // allowedRoot: 허용된 범위 (/public 디렉토리 내만 접근 가능)
  const allowedRoot = path.resolve(PUBLIC_DIRECTORY);

  // 경로 범위 검증: fullPath가 allowedRoot 내에 있는가?
  if (
    !fullPath.startsWith(allowedRoot + path.sep) &&
    fullPath !== allowedRoot
  ) {
    return [
      {
        field: "thumbnail",
        message: "Thumbnail path escapes public directory",
      },
    ];
  }

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
  // cleanPath: 정제된 상대경로 (./ 제거)
  const cleanPath = thumbnailPath.startsWith("./")
    ? thumbnailPath.slice(2)
    : thumbnailPath;
  // fullPath: 정규화된 절대 경로 (.. 포함해서 실제 위치 파악)
  const fullPath = path.resolve(ARTICLE_DATA_DIRECTORY, slug, cleanPath);
  // allowedRoot: 허용된 범위 (특정 아티클 디렉토리 내만 접근 가능)
  const allowedRoot = path.resolve(ARTICLE_DATA_DIRECTORY, slug);

  // 경로 범위 검증: fullPath가 allowedRoot 내에 있는가?
  if (
    !fullPath.startsWith(allowedRoot + path.sep) &&
    fullPath !== allowedRoot
  ) {
    return [
      {
        field: "thumbnail",
        message: `Thumbnail path escapes article directory: ${cleanPath}`,
      },
    ];
  }

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

const extractImagePathsFromContent = (content: string): string[] => {
  const paths: string[] = [];

  // 코드 블록을 제거한 콘텐츠에서만 경로 추출
  // (코드 블록 내의 경로는 예시이므로 검증 대상에서 제외)
  const withoutCodeBlocks = content.replace(
    /```[\s\S]*?```/g,
    ""
  );

  // 마크다운 이미지 문법: ![alt](path)
  const markdownImageRegex = /!\[(?:[^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = markdownImageRegex.exec(withoutCodeBlocks)) !== null) {
    const imagePath = match[1];
    // URL(http/https) 제외, 로컬 경로만 수집
    if (!imagePath.startsWith("http://") && !imagePath.startsWith("https://")) {
      paths.push(imagePath);
    }
  }

  // JSX Image 컴포넌트: <Image src="..." /> 또는 <Image src='...' />
  const jsxImageRegex = /<Image\s+[^>]*src=["']([^"']+)["'][^>]*\/?>/g;
  while ((match = jsxImageRegex.exec(withoutCodeBlocks)) !== null) {
    const imagePath = match[1];
    // URL 제외, 로컬 경로만 수집
    if (!imagePath.startsWith("http://") && !imagePath.startsWith("https://")) {
      paths.push(imagePath);
    }
  }

  return paths;
};

const validateContentImagePath = (
  slug: string,
  imagePath: string
): ValidationError[] => {
  // 절대 경로 처리 (public 디렉토리 기준)
  if (imagePath.startsWith("/")) {
    // fullPath: 정규화된 절대 경로 (.. 포함해서 실제 위치 파악)
    const fullPath = path.resolve(PUBLIC_DIRECTORY, imagePath);
    // allowedRoot: 허용된 범위 (/public 디렉토리 내만 접근 가능)
    const allowedRoot = path.resolve(PUBLIC_DIRECTORY);

    // 경로 범위 검증: fullPath가 allowedRoot 내에 있는가?
    if (
      !fullPath.startsWith(allowedRoot + path.sep) &&
      fullPath !== allowedRoot
    ) {
      return [
        {
          field: "content",
          message: "Image path escapes public directory",
        },
      ];
    }

    if (!fs.existsSync(fullPath)) {
      return [
        {
          field: "content",
          message: `Image file not found: ${imagePath}`,
        },
      ];
    }

    return [];
  }

  // 상대 경로 처리 (아티클 디렉토리 내)
  // cleanPath: 정제된 상대경로 (./ 제거)
  const cleanPath = imagePath.startsWith("./")
    ? imagePath.slice(2)
    : imagePath;
  // fullPath: 정규화된 절대 경로 (.. 포함해서 실제 위치 파악)
  const fullPath = path.resolve(ARTICLE_DATA_DIRECTORY, slug, cleanPath);
  // allowedRoot: 허용된 범위 (특정 아티클 디렉토리 내만 접근 가능)
  const allowedRoot = path.resolve(ARTICLE_DATA_DIRECTORY, slug);

  // 경로 범위 검증: fullPath가 allowedRoot 내에 있는가?
  if (
    !fullPath.startsWith(allowedRoot + path.sep) &&
    fullPath !== allowedRoot
  ) {
    return [
      {
        field: "content",
        message: `Image path escapes article directory: ${cleanPath}`,
      },
    ];
  }

  if (!fs.existsSync(fullPath)) {
    return [
      {
        field: "content",
        message: `Image file not found: ${slug}/${cleanPath}`,
      },
    ];
  }

  return [];
};

const validateContentImagePaths = (
  slug: string,
  content: string
): ValidationError[] => {
  const imagePaths = extractImagePathsFromContent(content);
  const errors: ValidationError[] = [];

  for (const imagePath of imagePaths) {
    errors.push(...validateContentImagePath(slug, imagePath));
  }

  return errors;
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

  // 4. 본문 이미지 경로 검증
  errors.push(...validateContentImagePaths(slug, fileValidation.content));

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
