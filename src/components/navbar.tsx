import { Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="text-4xl w-full flex items-center justify-between px-6 py-4 shadow-sm bg-[#060309] text-[#f5b461]">
      <h2 className="font-creepster text-center text-4xl tracking-tight leading-8">
        Creepy
      </h2>
      <nav className="hidden md:block font-bold text-[12px]">
        <ul className=" space-x-8 ">
          <Link href={"/"}>HOME</Link>
          <Link href={"/about"}>ABOUT</Link>
        </ul>
      </nav>
      <Menu className="md:hidden" />
    </header>
  );
}
