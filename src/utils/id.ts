/**
 * 간단한 UUID 생성
 */
export const generateUUID = (): string => {
  return Math.random().toString(36).substring(2, 9);
};
