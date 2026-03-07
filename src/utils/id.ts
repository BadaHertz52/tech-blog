/**
 * UUID 생성 (crypto.randomUUID() 기반)
 * @returns UUIDv4 형식의 고유 ID
 */
export const generateUUID = (): string => {
  return crypto.randomUUID();
};
