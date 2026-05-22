export function normalizeContent(content: unknown) {
  if (typeof content === "string") {
    try {
      return JSON.parse(content);
    } catch {
      return [];
    }
  }

  if (Array.isArray(content)) {
    return content;
  }

  return [];
}