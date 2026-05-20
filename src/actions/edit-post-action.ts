"use server";

import { editPostService } from "@/services/edit-post-service";

export async function editPostAction(
  formData: FormData,
  token: string,
  id: string,
) {
 
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const slug = formData.get("slug") as string;
  const file = formData.get("file") as File | null;
  const hasFile = file && file.size > 0;
  return await editPostService(
    title,
    description,
    content,
    slug,
    hasFile ? file : undefined,
    token,
    id,
  );
}
