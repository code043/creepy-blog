"use client";
import { Post } from "@/types/post";
import { useState, useEffect } from "react";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export function usePaginationSearch() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch(
          `${baseURL}/api/posts/all?page=${page}&limit=6&search=${debouncedSearch}`,
        );

        if (!res.ok) throw new Error("Search posts error");

        const json = await res.json();

        const postsArray = json?.data?.data ?? json?.data ?? [];
        const last = json?.data?.lastPage ?? json?.lastPage ?? 1;

        setPosts(postsArray);
        setLastPage(last);
      } catch (err) {
        console.error(err);
      }
    }

    loadPosts();
  }, [page, debouncedSearch]);

  return {
    posts,
    page,
    lastPage,
    search,
    setSearch: (value: string) => {
      setSearch(value);
      setPage(1);
    },
    setPage,
    nextPage: () => setPage((p: number) => Math.min(p + 1, lastPage)),
    prevPage: () => setPage((p: number) => Math.max(p - 1, 1)),
  };
}
