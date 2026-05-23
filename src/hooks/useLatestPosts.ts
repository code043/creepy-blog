"use client";

import { useEffect, useState } from "react";
import { Post } from "@/types/post";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export function useLatestPosts(limit: number = 12) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await fetch(`${baseURL}/api/posts/latest?limit=${limit}`);

        if (!res.ok) throw new Error("Error fetching latest posts");

        const data = await res.json();
        setPosts(data);
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.error(err);
      }
    }

    load();
  }, [limit]);

  return { posts, loading };
}
