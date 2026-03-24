"use server";

import {
  dbGetArticleStats,
  dbIncrementShareCount,
  dbIncrementViewCount,
} from "./index";

const isDevelopment = process.env.NODE_ENV === "development";

export const incrementViewCount = async (slug: string) => {
  if (isDevelopment) return;

  try {
    const stats = await dbIncrementViewCount(slug);
    console.info(
      `[Article Stats] View count incremented for "${slug}":`,
      stats
    );
    return stats;
  } catch (error) {
    console.error("[Article Stats] Error incrementing view count:", error);
    throw error;
  }
};

export const incrementShareCount = async (slug: string) => {
  if (isDevelopment) return;

  try {
    const stats = await dbIncrementShareCount(slug);
    console.info(
      `[Article Stats] Share count incremented for "${slug}":`,
      stats
    );
    return stats;
  } catch (error) {
    console.error("[Article Stats] Error incrementing share count:", error);
    throw error;
  }
};

export const getArticleStats = async (slug: string) => {
  try {
    const stats = await dbGetArticleStats(slug);
    return stats;
  } catch (error) {
    console.error("[Article Stats] Error fetching article stats:", error);
    throw error;
  }
};
