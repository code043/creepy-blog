"use server";

import { newPostService } from "@/services/new-post-service";

export async function newPostAction(formData: FormData, token: string) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const slug = formData.get("slug") as string;
  const file = formData.get("file") as File;
  return await newPostService(
    title,
    description,
    content,
    slug,
    file,
    token
  );
}
