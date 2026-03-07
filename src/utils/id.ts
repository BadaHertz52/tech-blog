/**
 * UUID 생성 (crypto.randomUUID() 기반)
 * Node.js v15.7.0+에서 지원되는 표준 API 사용
 * @returns UUIDv4 형식의 고유 ID
 */
export const generateUUID = (): string => {
  return crypto.randomUUID();
};
