"use client";

import { useAuth } from "@/app/context/auth-content";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const navRef = useRef<HTMLElement>(null);

  // click outside
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  return (
    <header
      ref={navRef}
      className="w-full fixed bg-[#060309] flex justify-center shadow-sm text-[#f5b461] border-b border-b-[#f5b461]/40 z-50"
    >
      <div className="w-full max-w-[1800] text-4xl ">
        <div className="flex items-center justify-between px-6 py-4">
          {/* LOGO */}
          <Link href="/">
            <h2 className="ml-1 font-creepster text-4xl tracking-tight leading-8">
              Creepy
            </h2>
          </Link>

          {/* SEARCH */}

          {/* DESKTOP NAV */}
          <nav className="hidden md:block text-[14px] mx-1 font-bold">
            <ul className="flex space-x-8 items-center">
              <li className="hover:text-white hover:underline font-imfell text-[16px] drop-shadow-sm">
                <Link href="/">HOME</Link>
              </li>
              <li className="hover:text-white hover:underline font-imfell text-[16px] drop-shadow-sm">
                <Link href="/articles">POSTS</Link>
              </li>
              <li className="hover:text-white hover:underline font-imfell text-[16px] drop-shadow-sm">
                <Link href="/about">ABOUT</Link>
              </li>

              {user && (
                <>
                  <li className="hover:text-white hover:underline font-imfell text-[16px] drop-shadow-sm">
                    <Link href="/dashboard">DASHBOARD</Link>
                  </li>
                  <li className="hover:text-white hover:underline font-imfell text-[16px] drop-shadow-sm">
                    <Link href="/dashboard/new">NEW</Link>
                  </li>
                </>
              )}

              {/* AUTH STATUS */}
              {loading ? (
                <li className="hover:text-red-500">
                  <div className="w-5 h-5 rounded-full bg-zinc-600 animate-pulse" />
                </li>
              ) : user ? (
                <li className="hover:text-red-500">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-sans font-bold uppercase">
                    {user.username[0] ?? "?"}
                  </div>
                </li>
              ) : (
                <li className="hover:text-red-500">
                  <div className="w-5 h-5 rounded-full bg-red-500" />
                </li>
              )}
            </ul>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden p-3"
            aria-label="Toggle menu"
          >
            <Menu />
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden bg-[#060309] text-[#f5b461] px-6 pb-4">
            <nav className="flex flex-col gap-4 font-bold text-sm">
              <Link href="/" onClick={() => setOpen(false)}>
                HOME
              </Link>
              <Link href="/articles" onClick={() => setOpen(false)}>
                POSTS
              </Link>
              <Link href="/about" onClick={() => setOpen(false)}>
                ABOUT
              </Link>

              {user && (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)}>
                    DASHBOARD
                  </Link>
                  <Link href="/dashboard/new" onClick={() => setOpen(false)}>
                    NEW
                  </Link>
                </>
              )}

              {/* MOBILE USER */}
              {!loading && user && (
                <div className="text-blue-500 font-sans font-bold uppercase">
                  {user.username ?? user.name ?? "user"}
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
