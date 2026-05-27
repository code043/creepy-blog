"use client";
import { mapPost } from "@/mappers/postMapper";
import { Post } from "@/types/post";
import { useState, useEffect } from "react";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export function useCategoryPostsBySlug(slug: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [search, setSearchState] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    async function loadPosts() {
      if (debouncedSearch) {
        setLoadingSearch(true);
      } else {
        setLoadingInitial(true);
      }
     
      try {
        const res = await fetch(
          `${baseURL}/api/categories/${slug}/posts?page=${page}&limit=5&search=${debouncedSearch}`,
        );

        if (!res.ok) throw new Error("Search posts error");

        const json = await res.json();
        const postsArray = json?.data?.data ?? json?.data ?? [];
        const last = json?.data?.lastPage ?? json?.lastPage ?? 1;

        setPosts(postsArray.map(mapPost));
        setLastPage(last);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingInitial(false);
        setLoadingSearch(false);
      }
    }

    loadPosts();
  }, [page, debouncedSearch, slug]);

  return {
    posts,
    page,
    lastPage,
    pages: Array.from({ length: lastPage }, (_, i) => i + 1),
    setPage,
    search,
    loadingInitial,
    loadingSearch,
    setSearch: (value: string) => {
      setSearchState(value);
      setPage(1);
    },
    nextPage: () => setPage((p) => Math.min(p + 1, lastPage)),
    prevPage: () => setPage((p) => Math.max(p - 1, 1)),
  };
}
