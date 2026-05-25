"use client";

import { useAuth } from "@/app/context/auth-content";
import { Post } from "@/types/post";
import { useEffect, useState, useCallback } from "react";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export function usePosts() {
  const { user, getAccessToken } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    const token = getAccessToken();

    if (!token) {
      setError("Authentication is missing");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(baseURL + "/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
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
  }, [getAccessToken]);

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadPosts();
    } else {
      setLoading(false);
    }
  }, [user, loadPosts]);

  return {
    posts,
    loading,
    error,
    reload: loadPosts,
  };
}
