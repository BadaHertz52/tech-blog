"use server";

import { dbIncrementShareCount, dbIncrementViewCount } from "./index";

export const incrementViewCount = async (slug: string) => {
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
