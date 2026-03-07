#!/usr/bin/env node
import { execSync } from "child_process";

import { validateArticle } from "../src/utils/validators/article";

interface ValidationResult {
  valid: boolean;
  validSlugs: string[];
  errors: Record<string, unknown[]>;
}

const getChangedArticleSlugs = (): string[] => {
  // GITHUB_BASE_REF: GitHub Actions에서 제공하는 기본 브랜치 (main, release 등)
  // 로컬 환경: undefined → origin/main을 기본값으로 사용
  const baseRef = process.env.GITHUB_BASE_REF || "origin/main";

  try {
    const output = execSync(
      `git diff --name-only ${baseRef}...HEAD`,
      {
        encoding: "utf-8",
      }
    );

    const changedFiles = output.split("\n").filter((line) => line.trim());
    const articleSlugs = new Set<string>();

    for (const file of changedFiles) {
      const match = file.match(/^public\/articles\/([^/]+)\/index\.mdx$/);
      if (match) {
        articleSlugs.add(match[1]);
      }
    }

    return Array.from(articleSlugs).sort();
  } catch (error) {
    // git diff 실패 시 즉시 CI 실패 처리
    // (에러를 무시하고 통과시키면 검증이 건너뜀)
    console.error(
      `❌ Failed to detect changed articles: ${error instanceof Error ? error.message : String(error)}`
    );
    process.exit(1);
  }
};

const validateChangedArticles = (): ValidationResult => {
  const slugs = getChangedArticleSlugs();

  if (slugs.length === 0) {
    console.log("ℹ️  No articles to validate");
    return { valid: true, validSlugs: [], errors: {} };
  }

  console.log(`🔍 Validating ${slugs.length} article(s)...\n`);

  const validSlugs: string[] = [];
  const errors: Record<string, unknown[]> = {};

  for (const slug of slugs) {
    const validationErrors = validateArticle(slug);

    if (validationErrors.length > 0) {
      errors[slug] = validationErrors;
      console.log(`❌ ${slug}`);
    } else {
      validSlugs.push(slug);
      console.log(`✅ ${slug}`);
    }
  }

  console.log("");

  return {
    valid: Object.keys(errors).length === 0,
    validSlugs,
    errors,
  };
};

const printValidationErrors = (errors: Record<string, unknown[]>): void => {
  console.log("❌ Validation failed:\n");

  for (const [slug, slugErrors] of Object.entries(errors)) {
    console.log(`📄 ${slug}:`);

    for (const error of slugErrors) {
      const err = error as { field: string; message: string };
      console.log(`   - field: "${err.field}"`);
      console.log(`     message: "${err.message}"`);
    }

    console.log("");
  }
};

const printSummary = (result: ValidationResult): void => {
  const totalCount =
    result.validSlugs.length + Object.keys(result.errors).length;
  const successCount = result.validSlugs.length;
  const failureCount = Object.keys(result.errors).length;

  console.log("📊 Summary:");
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failure: ${failureCount}`);
  console.log(`   📈 Total: ${totalCount}`);
};

const main = (): void => {
  const result = validateChangedArticles();

  if (!result.valid) {
    printValidationErrors(result.errors);
    printSummary(result);
    process.exit(1);
  }

  printSummary(result);
  process.exit(0);
};

main();
