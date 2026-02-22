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
  let useCustomThumbnail = "";

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

  // 기본 썸네일 사용 여부
  console.log("\n🖼️  기본 썸네일(basic-thumbnail.webp) 사용 여부");
  while (!useCustomThumbnail) {
    const input = await prompt('기본 썸네일을 사용하시겠습니까? (y/n): ');
    const normalized = input.toLowerCase();
    if (normalized === "y" || normalized === "n" || normalized === "yes" || normalized === "no") {
      useCustomThumbnail = normalized;
    } else {
      console.log("❌ 'y' 또는 'n'을 입력해주세요.");
    }
  }

  rl.close();
  const isDefaultThumbnail = useCustomThumbnail === "y" || useCustomThumbnail === "yes";
  createArticle(slug, category, isDefaultThumbnail);
}

function createArticle(slug, category, useDefaultThumbnail) {
  const date = new Date().toISOString().split("T")[0];
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // 폴더명 및 slug: YYYY-MM-DD-{입력slug}
  const folderName = `${date}-${slug}`;

  // 썸네일 경로 결정
  const thumbnailPath = useDefaultThumbnail
    ? "/articles/assets/basic-thumbnail.webp"
    : "./images/custom-thumbnail.webp";

  const template = `---
title: "${title}"
description: "간단한 설명 (20자 이내)"
date: "${date}"
category: "${category}"
thumbnail: "${thumbnailPath}"
slug: "${folderName}"
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

  const articlesDir = path.join(__dirname, "../public/articles");
  const articleDir = path.join(articlesDir, folderName);
  const imagesDir = path.join(articleDir, "images");
  const filePath = path.join(articleDir, "index.mdx");

  // 아티클 폴더 생성
  if (!fs.existsSync(articleDir)) {
    fs.mkdirSync(articleDir, { recursive: true });
  }

  // images 폴더는 커스텀 썸네일을 사용할 때만 생성
  if (!useDefaultThumbnail) {
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
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
  console.log(`📝 slug: ${slug}`);
  console.log(`📁 폴더명: ${folderName}`);

  if (useDefaultThumbnail) {
    console.log(`🖼️  썸네일: 기본 이미지 사용 (/articles/assets/basic-thumbnail.webp)\n`);
  } else {
    console.log(`📂 이미지 폴더: ${imagesDir}`);
    console.log(`🖼️  썸네일: 커스텀 이미지 사용\n`);
    console.log(`💡 팁: ${imagesDir}/custom-thumbnail.webp 파일을 추가하세요.\n`);
  }
}

main();
