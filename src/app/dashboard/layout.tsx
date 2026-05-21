"use client";
import { ReactNode, useEffect } from "react";
import { useAuth } from "../context/auth-content";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) return null;

  return (
    <div className=" bg-black text-white min-h-screen py-30">
      <main>{children}</main>
    </div>
  );
}
