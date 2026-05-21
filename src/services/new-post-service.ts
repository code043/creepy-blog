const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function uploadFileService(
  file: File,
  token: string,
): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(`${baseURL}/api/posts/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: fd,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Upload error");
  }

  return data.url ?? data.secure_url ?? "";
}

export async function newPostService(
  title: string,
  description: string,
  content: object,
  slug: string,
  image: string | undefined,
  token: string,
) {
  const res = await fetch(`${baseURL}/api/posts/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, content, slug, image }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { error: data.message || "Creation error" };
  }

  return data;
}
