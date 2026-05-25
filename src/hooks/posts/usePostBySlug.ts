"use client";

import { mapPost } from "@/mappers/postMapper";
import { Post } from "@/types/post";
import { useEffect, useState, useCallback } from "react";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export function usePostBySlug(slug: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPost = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${baseURL}/api/posts/slug/${slug}`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("I'ts not possible get the post");
      }

      const data = await res.json();
      setPost(mapPost(data.post ?? data));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPost();
  }, [loadPost]);

  return {
    post,
    loading,
    error,
    reload: loadPost,
  };
}
