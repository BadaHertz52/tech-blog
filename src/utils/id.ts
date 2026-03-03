/**
 * 간단한 UUID v4 생성
 * @returns 생성된 UUID (예: "a1b2c3d4e5f6")
 */
export const generateUUID = (): string => {
  return Math.random().toString(36).substring(2, 9);
};
