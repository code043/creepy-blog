"use client";

import { useAuth } from "@/app/context/auth-content";
import { mapPost } from "@/mappers/postMapper";
import { Post } from "@/types/post";
import { useEffect, useState, useCallback } from "react";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export function useOnePost(id: string) {
  const { user, getAccessToken } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPost = useCallback(async () => {
    const token = getAccessToken();

    if (!token) {
      setError("Authentication is missing!");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${baseURL}/api/posts/id/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
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
  }, [getAccessToken, id]);

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadPost();
    } else {
      setLoading(false);
    }
  }, [user, loadPost]);

  return {
    post,
    loading,
    error,
    reload: loadPost,
  };
}
