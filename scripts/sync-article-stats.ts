import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const ARTICLE_INDEX_PATH = path.join(
  process.cwd(),
  "public/articles/article-index.json"
);

interface ArticleIndex {
  slugs: string[];
  indexMap: Record<string, number>;
}

interface ArticleStats {
  slug: string;
  view_count: number;
  share_count: number;
  like_count: number;
}

async function syncArticleStats() {
  // 1. 환경변수 확인
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error(
      "❌ Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required"
    );
    process.exit(1);
  }

  // 2. Supabase 클라이언트 초기화
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  try {
    // 3. article-index.json에서 현재 아티클 목록 읽기
    if (!fs.existsSync(ARTICLE_INDEX_PATH)) {
      console.error(`❌ Error: ${ARTICLE_INDEX_PATH} not found`);
      process.exit(1);
    }

    const indexContent = fs.readFileSync(ARTICLE_INDEX_PATH, "utf-8");
    const articleIndex: ArticleIndex = JSON.parse(indexContent);
    const currentSlugs = new Set(articleIndex.slugs);

    console.log(`📄 Found ${currentSlugs.size} articles in article-index.json`);

    // 4. Supabase에서 기존 article_stats 조회
    const { data: existingStats, error: fetchError } = await supabase
      .from("article_stats")
      .select("slug");

    if (fetchError) {
      console.error("❌ Error fetching article_stats:", fetchError.message);
      process.exit(1);
    }

    const existingSlugs = new Set(
      existingStats?.map((stat) => stat.slug) || []
    );

    console.log(
      `💾 Found ${existingSlugs.size} articles in article_stats table`
    );

    // 5. 추가할 아티클 (article-index.json에는 있지만 article_stats에는 없음)
    const toAdd = Array.from(currentSlugs).filter(
      (slug) => !existingSlugs.has(slug)
    );

    // 6. 삭제할 아티클 (article_stats에는 있지만 article-index.json에는 없음)
    const toDelete = Array.from(existingSlugs).filter(
      (slug) => !currentSlugs.has(slug)
    );

    console.log(`➕ Articles to add: ${toAdd.length}`);
    console.log(`➖ Articles to delete: ${toDelete.length}`);

    // 7. 추가 작업
    if (toAdd.length > 0) {
      const newStats = toAdd.map((slug) => ({
        slug,
        view_count: 0,
        share_count: 0,
        like_count: 0,
      }));

      const { error: insertError } = await supabase
        .from("article_stats")
        .insert(newStats);

      if (insertError) {
        console.error("❌ Error inserting new articles:", insertError.message);
        process.exit(1);
      }

      console.log(`✅ Added ${toAdd.length} new articles to article_stats`);
      toAdd.forEach((slug) => console.log(`   - ${slug}`));
    }

    // 8. 삭제 작업
    if (toDelete.length > 0) {
      const { error: deleteError } = await supabase
        .from("article_stats")
        .delete()
        .in("slug", toDelete);

      if (deleteError) {
        console.error("❌ Error deleting articles:", deleteError.message);
        process.exit(1);
      }

      console.log(`✅ Deleted ${toDelete.length} articles from article_stats`);
      toDelete.forEach((slug) => console.log(`   - ${slug}`));
    }

    // 9. 완료 메시지
    if (toAdd.length === 0 && toDelete.length === 0) {
      console.log("✨ No changes needed - article_stats is already in sync");
    } else {
      console.log("✨ article_stats has been synced successfully");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    process.exit(1);
  }
}

syncArticleStats();
