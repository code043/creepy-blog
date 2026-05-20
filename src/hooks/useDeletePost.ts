"use client";

import { useAuth } from "@/app/context/auth-content";
import { useState } from "react";
const baseURL = process.env.NEXT_PUBLIC_API_URL;


export function useDeletePost() {
  const { getAccessToken } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deletePost = async (id: string) => {
    const token = getAccessToken();

    if (!token) {
      setError("Authentication is missing!");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${baseURL}/api/posts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("It'is not possible delete post");
      }

      return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deletePost, loading, error };
}