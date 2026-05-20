"use client"
import { ReactNode, useEffect } from "react";
import { useAuth } from "../context/auth-content";
import { useRouter } from "next/navigation";

export default function DashboardLayout({children}: { children: ReactNode}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

   if (loading)
    return (
      <div className="m-30">
        <p className="text-center">Loading...</p>
      </div>
    );

  if (!user) return null;
  return (
    <div className=" bg-black text-white min-h-225 py-30">
    
      <main>{children}</main>
    </div>
  );
}
