import { Post } from "@/types/post";
import { useState, useCallback, useEffect } from "react";
const baseURL = process.env.NEXT_PUBLIC_API_URL;


export function usePagination() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadPosts = useCallback(async (pageNumber: number) => {
    try {
      setLoading(true);

      const res = await fetch(
        `${baseURL}/api/posts/all?page=${pageNumber}&limit=3`
      );

      const data = await res.json();

      setPosts(data.data);
      setPage(data.page);
      setLastPage(data.lastPage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPosts(page);
  }, [page, loadPosts]);

  return {
    posts,
    page,
    lastPage,
    loading,
    nextPage: () => {
      if (page < lastPage) setPage((p) => p + 1);
    },
    prevPage: () => {
      if (page > 1) setPage((p) => p - 1);
    },
    goToPage: (p: number) => setPage(p),
  };
}