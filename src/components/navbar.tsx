"use client";

import { useAuth } from "@/app/context/auth-content";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();

  return (
    <header className="fixed w-full text-4xl shadow-sm bg-[#060309] text-[#f5b461] border-b border-b-[#f5b461]/40 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link href="/">
          <h2 className="font-creepster text-4xl tracking-tight leading-8">
            Creepy
          </h2>
        </Link>

        {/* SEARCH */}

        {/* DESKTOP NAV */}
        <nav className="hidden md:block font-bold text-[12px] mx-10">
          <ul className="flex space-x-8 items-center">
            <li>
              <Link href="/">HOME</Link>
            </li>
            <li>
              <Link href="/articles">ARTICLES</Link>
            </li>
            <li>
              <Link href="/about">ABOUT</Link>
            </li>

            {user && (
              <>
                <li>
                  <Link href="/dashboard">DASHBOARD</Link>
                </li>
                <li>
                  <Link href="/dashboard/new">NEW</Link>
                </li>
              </>
            )}

            {/* AUTH STATUS */}
            {loading ? (
              <li>
                <div className="w-5 h-5 rounded-full bg-zinc-600 animate-pulse" />
              </li>
            ) : user ? (
              <li>
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold uppercase">
                  {user.username?.[0] ?? "?"}
                </div>
              </li>
            ) : (
              <li>
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
              <div className="text-blue-500 font-bold uppercase">
                {user.username ?? user.name ?? "user"}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
