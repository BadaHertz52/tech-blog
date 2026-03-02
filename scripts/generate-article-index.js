#!/usr/bin/env node

/**
 * 빌드 시 아티클 slug 인덱스 파일 생성
 *
 * 오래된순으로 정렬된 slug 배열과 O(1) 탐색을 위한 indexMap을 생성합니다.
 * slugs[0] = 가장 오래된 글, slugs[n] = 가장 최신 글
 * → prev(이전글) = index - 1 (더 오래된), next(다음글) = index + 1 (더 최신)
 * 출력: public/articles/article-index.json
 */

const fs = require("fs");
const path = require("path");

const ARTICLES_DIR = path.join(__dirname, "../public/articles");
const OUTPUT_PATH = path.join(ARTICLES_DIR, "article-index.json");

const getArticleSlugsWithDates = () => {
  if (!fs.existsSync(ARTICLES_DIR)) {
    return [];
  }

  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((name) => {
      const fullPath = path.join(ARTICLES_DIR, name);
      return (
        fs.statSync(fullPath).isDirectory() &&
        fs.existsSync(path.join(fullPath, "index.mdx"))
      );
    })
    .map((slug) => {
      const mdxPath = path.join(ARTICLES_DIR, slug, "index.mdx");
      const content = fs.readFileSync(mdxPath, "utf-8");

      // frontmatter에서 date 추출
      const dateMatch = content.match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})["']?/m);
      const date = dateMatch ? dateMatch[1] : "1970-01-01";

      return { slug, date };
    });
};

const generateArticleIndex = () => {
  const articlesWithDates = getArticleSlugsWithDates();

  // 오래된순 정렬 (slugs[0] = 가장 오래된, slugs[n] = 가장 최신)
  const sorted = articlesWithDates.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const slugs = sorted.map((a) => a.slug);

  // O(1) 탐색을 위한 slug → index map
  const indexMap = {};
  slugs.forEach((slug, index) => {
    indexMap[slug] = index;
  });

  const output = { slugs, indexMap };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`✅ article-index.json 생성 완료 (${slugs.length}개 아티클)`);
};

generateArticleIndex();
