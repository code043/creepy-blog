"use server";

import { newPostService } from "@/services/new-post-service";

export async function newPostAction(
  title: string,
  description: string,
  content: object,
  slug: string,
  image: string | undefined,
  category: string,
  token: string,
) {
  return await newPostService(title, description, content, slug, image, category, token);
}
