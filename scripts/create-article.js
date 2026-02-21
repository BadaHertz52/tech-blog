#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const validCategories = [
  "frontend",
  "cs",
  "troubleshooting",
  "retrospective",
  "project",
  "etc",
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function main() {
  console.log("\n📝 새 MDX 아티클 생성\n");

  let slug = "";
  let category = "";

  // Slug 입력받기
  while (!slug) {
    slug = await prompt("📄 Article slug (예: my-article): ");
    if (!slug.trim()) {
      console.log("❌ slug를 입력해주세요.");
      slug = "";
    }
  }
  slug = slug.trim();

  // 카테고리 선택
  console.log("\n📂 카테고리를 선택하세요:");
  validCategories.forEach((cat, index) => {
    console.log(`  ${index + 1}. ${cat}`);
  });

  while (!category) {
    const input = await prompt("\n선택 (1-6): ");
    const index = parseInt(input) - 1;

    if (index >= 0 && index < validCategories.length) {
      category = validCategories[index];
    } else {
      console.log("❌ 1-6 사이의 숫자를 입력해주세요.");
    }
  }

  rl.close();
  createArticle(slug, category);
}

function createArticle(slug, category) {
  const date = new Date().toISOString().split("T")[0];
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const template = `---
title: "${title}"
description: "간단한 설명 (20자 이내)"
date: "${date}"
category: "${category}"
thumbnail: "/images/hero.webp"
slug: "${slug}"
views: 0
---

## 섹션 제목

본문 내용을 작성하세요.

### 코드 예시

\`\`\`typescript
// 코드를 작성하세요
const example = () => {
  console.log('Hello World')
}
\`\`\`

## 다음 섹션

마무리 문단.
`;

  const articlesDir = path.join(__dirname, "../data/articles");
  const fileName = `mock-${slug}.mdx`;
  const filePath = path.join(articlesDir, fileName);

  // articles 폴더 존재 확인
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
  }

  // 파일 중복 확인
  if (fs.existsSync(filePath)) {
    console.error(`\n❌ 파일이 이미 존재합니다: ${filePath}`);
    process.exit(1);
  }

  fs.writeFileSync(filePath, template);
  console.log(`\n✅ 생성 완료: ${filePath}`);
  console.log(`📅 날짜: ${date}`);
  console.log(`🏷️  카테고리: ${category}`);
  console.log(`📝 slug: ${slug}\n`);
}

main();
