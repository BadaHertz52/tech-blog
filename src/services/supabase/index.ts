import { createClient } from "@supabase/supabase-js";

import { RPC_FUNCTIONS, TABLES } from "../../../constants/supabase";
import type { ArticleStats } from "./types";

// Server-only Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * increment 함수들 - RPC 호출로 atomic increment 처리
 */

export const dbIncrementViewCount = async (
  slug: string
): Promise<ArticleStats> => {
  // RPC 함수 호출 후 현재 stats 조회
  const { error: rpcError } = await supabase.rpc(
    RPC_FUNCTIONS.INCREMENT_VIEW_COUNT,
    {
      p_slug: slug,
    }
  );

  if (rpcError) {
    console.error("incrementViewCount error:", rpcError);
    throw rpcError;
  }

  // 현재 stats 조회
  const { data, error } = await supabase
    .from(TABLES.ARTICLE_STATS)
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("fetch article_stats error:", error);
    throw error;
  }

  return data as ArticleStats;
};

export const dbIncrementShareCount = async (
  slug: string
): Promise<ArticleStats> => {
  // RPC 함수 호출 후 현재 stats 조회
  const { error: rpcError } = await supabase.rpc(
    RPC_FUNCTIONS.INCREMENT_SHARE_COUNT,
    {
      p_slug: slug,
    }
  );

  if (rpcError) {
    console.error("incrementShareCount error:", rpcError);
    throw rpcError;
  }

  // 현재 stats 조회
  const { data, error } = await supabase
    .from(TABLES.ARTICLE_STATS)
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("fetch article_stats error:", error);
    throw error;
  }

  return data as ArticleStats;
};
