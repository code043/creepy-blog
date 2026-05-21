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
        <Link href="/">
          <h2 className="font-creepster text-center text-4xl tracking-tight leading-8">
            Creepy
          </h2>
        </Link>
        <nav className="hidden md:block font-bold text-[12px]">
          <ul className="flex space-x-8">
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
            {user === null && !loading ? (
              <div className={`w-5 h-5 rounded-full bg-red-500 `} />
            ) : null}
            {loading ? (
              <div className="w-5 h-5 rounded-full bg-zinc-600 animate-pulse" />
            ) : user ? (
              <li>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 text-white bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold uppercase">
                    {user.name[0]}
                  </div>
                </div>
              </li>
            ) : null}
          </ul>
        </nav>
        <button
          onClick={() => setOpen((prev) => !prev)}
          onTouchEnd={(e) => {
            e.preventDefault();
            setOpen((prev) => !prev);
          }}
          className="md:hidden p-3 touch-manipulation cursor-pointer"
          aria-label="Toggle menu"
        >
          <Menu />
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#060309] text-[#f5b461] px-6 pb-4 transition-all duration-200">
          <nav className="flex flex-col gap-4 font-bold text-sm list-none">
            <li>
              <Link href="/" onClick={() => setOpen(false)}>
                HOME
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setOpen(false)}>
                ABOUT
              </Link>
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
            {user && (
              <li>
                <div className="flex items-center gap-2">
                  <div className=" text-blue-500 flex items-center justify-center text-sm font-bold uppercase">
                    {user.username}
                  </div>
                </div>
              </li>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
