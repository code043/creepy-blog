const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function editPostService(
  title: string,
  description: string,
  content: string,
  slug: string,
  file: File | undefined,
  token: string,
  id: string,
) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("content", content);
  formData.append("slug", slug);
  if (file && file.size > 0) {
    formData.append("file", file);
  }

  const res = await fetch(`${baseURL}/api/posts/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      error: data.message || "Edition error",
    };
  }
  return data;
}
