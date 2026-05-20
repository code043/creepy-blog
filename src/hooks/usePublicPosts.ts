"use client";

import { Post } from "@/types/post";
import { useEffect, useState, useCallback } from "react";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export function usePublicPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAllPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(baseURL + "/api/posts/all", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Search posts error!");
      }

      const data = await res.json();
      setPosts(data.posts ?? data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Somethin went wrong!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadAllPosts();
  }, [loadAllPosts]);

  return {
    posts,
    loading,
    error,
    reload: loadAllPosts,
  };
}
