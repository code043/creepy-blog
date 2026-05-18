import { Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 shadow-sm bg-[#080311] text-[#99d2c2]">
      <h2 className="text-center text-4xl tracking-tight leading-8">
        Creepy
      </h2>
      <nav className="hidden md:block">
        <ul className="font-serif space-x-8">
          <Link href={"/"}>HOME</Link>
          <Link href={"/about"}>ABOUT</Link>
        </ul>
      </nav>
      <Menu className="md:hidden" />
    </header>
  );
}
