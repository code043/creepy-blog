"use client";
import { useAuth } from "@/app/context/auth-content";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { user } = useAuth();
  

  return (
    <header className="text-4xl w-full  shadow-sm bg-[#060309] text-[#f5b461]">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href={"/"}>
          <h2 className="font-creepster text-center text-4xl tracking-tight leading-8">
            Creepy
          </h2>
        </Link>
        <nav className="hidden md:block font-bold text-[12px]">
          <ul className=" space-x-8 ">
            <Link href={"/"}>HOME</Link>
            <Link href={"/about"}>ABOUT</Link>
            {user &&  <Link href={"/dashboard"}>{user.username}</Link>}
          </ul>
        </nav>
        <Menu className="md:hidden" />
      </div>
    </header>
  );
}
