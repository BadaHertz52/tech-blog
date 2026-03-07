import { describe, expect, it } from "vitest";

import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  testHelpers,
  validateArticle,
} from "./index";

const {
  validateTitle,
  validateDescription,
  validateDate,
  validateCategory,
  validateSlug,
} = testHelpers;

describe("아티클 마크다운", () => {
  describe("제목 검증 (validateTitle)", () => {
    it("유효한 제목이면 통과해야 한다", () => {
      const result = validateTitle("유효한 제목");
      expect(result).toHaveLength(0);
    });

    it("제목이 문자열이 아니면 실패해야 한다", () => {
      const result = validateTitle(123);
      expect(result).toHaveLength(1);
      expect(result[0].field).toBe("title");
      expect(result[0].message).toContain("string");
    });

    it("제목이 비어있으면 실패해야 한다", () => {
      const result = validateTitle("");
      expect(result).toHaveLength(1);
      expect(result[0].message).toContain("empty");
    });

    it("제목이 최대 길이를 초과하면 실패해야 한다", () => {
      const longTitle = "a".repeat(MAX_TITLE_LENGTH + 1);
      const result = validateTitle(longTitle);
      expect(result).toHaveLength(1);
      expect(result[0].message).toContain(String(MAX_TITLE_LENGTH));
    });

    it("제목이 최대 길이이면 통과해야 한다", () => {
      const maxTitle = "a".repeat(MAX_TITLE_LENGTH);
      const result = validateTitle(maxTitle);
      expect(result).toHaveLength(0);
    });
  });

  describe("소개 검증 (validateDescription)", () => {
    it("유효한 소개면 통과해야 한다", () => {
      const result = validateDescription("유효한 설명");
      expect(result).toHaveLength(0);
    });

    it("소개문이 문자열이 아니면 실패해야 한다", () => {
      const result = validateDescription(null);
      expect(result).toHaveLength(1);
      expect(result[0].field).toBe("description");
    });

    it("소개문이 비어있으면 실패해야 한다", () => {
      const result = validateDescription("");
      expect(result).toHaveLength(1);
      expect(result[0].message).toContain("empty");
    });

    it("소개문이 최대 길이를 초과하면 실패해야 한다", () => {
      const longDescription = "a".repeat(MAX_DESCRIPTION_LENGTH + 1);
      const result = validateDescription(longDescription);
      expect(result).toHaveLength(1);
      expect(result[0].message).toContain(String(MAX_DESCRIPTION_LENGTH));
    });
  });

  describe("날짜 검증 (validateDate)", () => {
    it("유효한 날짜이면 통과해야 한다", () => {
      const result = validateDate("2026-02-15");
      expect(result).toHaveLength(0);
    });

    it("형식이 잘못된 날짜이면 실패해야 한다", () => {
      const result = validateDate("2026/02/15");
      expect(result).toHaveLength(1);
      expect(result[0].field).toBe("date");
      expect(result[0].message).toContain("YYYY-MM-DD");
    });

    it("문자열이 아닌 입력이면 실패해야 한다", () => {
      const result = validateDate(20260215);
      expect(result).toHaveLength(1);
      expect(result[0].field).toBe("date");
    });

    it("유효하지 않은 날짜이면 실패해야 한다", () => {
      const result = validateDate("2026-02-30");
      expect(result).toHaveLength(1);
      expect(result[0].field).toBe("date");
    });

    it("윤년 날짜이면 통과해야 한다", () => {
      const result = validateDate("2024-02-29");
      expect(result).toHaveLength(0);
    });
  });

  describe("카테고리 검증 (validateCategory)", () => {
    const validCategories = [
      "troubleshooting",
      "retrospective",
      "frontend",
      "cs",
      "project",
      "ai",
      "etc",
    ];

    it("유효한 카테고리이면 통과해야 한다", () => {
      validCategories.forEach((category) => {
        const result = validateCategory(category);
        expect(result).toHaveLength(0);
      });
    });

    it("카테고리가 문자열이 아니면 실패해야 한다", () => {
      const result = validateCategory(123);
      expect(result).toHaveLength(1);
      expect(result[0].message).toContain("string");
    });

    it("유효하지 않은 카테고리이면 실패해야 한다", () => {
      const result = validateCategory("invalid-category");
      expect(result).toHaveLength(1);
      expect(result[0].message).toContain("one of");
    });
  });

  describe("슬러그 검증 (validateSlug)", () => {
    it("유효한 슬러그이면 통과해야 한다", () => {
      const result = validateSlug("my-article-slug");
      expect(result).toHaveLength(0);
    });

    it("슬러그가 문자열이 아니면 실패해야 한다", () => {
      const result = validateSlug(123);
      expect(result).toHaveLength(1);
      expect(result[0].message).toContain("string");
    });

    it("슬러그가 비어있으면 실패해야 한다", () => {
      const result = validateSlug("");
      expect(result).toHaveLength(1);
      expect(result[0].message).toContain("empty");
    });
  });
});
