import { Post } from "@/types/post";
import { ContentBlock } from "@/types/blocks";

function normalizeContent(content: unknown): ContentBlock[] {
  if (typeof content === "string") {
    try {
      return JSON.parse(content);
    } catch {
      return [];
    }
  }

  if (Array.isArray(content)) return content;

  return [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapPost(data: any): Post {
  return {
    ...data,
    content: normalizeContent(data.content),
  };
}
