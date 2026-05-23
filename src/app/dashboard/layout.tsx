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
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <h1 className="mx-auto text-white text-center text-lg font-bold tracking-tight font-body">
          Carregando...
        </h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <h1 className="mx-auto text-white text-center text-lg font-bold tracking-tight font-body">
          Redirecionando...
        </h1>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <h2 className="mx-auto text-white text-center text-lg font-bold tracking-tight font-body">
          Carregando...
        </h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Verificando...</p>
      </div>
    );
  }

  return (
    <div className=" bg-black text-white min-h-screen py-30">
      <main>{children}</main>
    </div>
  );
}
