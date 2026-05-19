const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function newPostService(
  title: string,
  description: string,
  content: string,
  slug: string,
  file: File,
  token: string,
) {
  const formData = new FormData();
  console.log(formData);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("content", content);
  formData.append("slug", slug);
  formData.append("file", file);

  const res = await fetch(`${baseURL}/api/posts/new`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      error: data.message || "Creation error",
    };
  }
  console.log(data);
  return data;
}
