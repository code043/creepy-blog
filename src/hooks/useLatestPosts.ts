"use client";

import { useEffect, useState } from "react";
import { Post } from "@/types/post";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export function useLatestPosts(limit: number = 12) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${baseURL}/api/posts/latest?limit=${limit}`);

        if (!res.ok) throw new Error("Error fetching latest posts");

        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [limit]);

  return { posts };
}
