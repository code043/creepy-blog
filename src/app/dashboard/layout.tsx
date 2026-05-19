import { ReactNode } from "react";

export default function DashboardLayout({children}: { children: ReactNode}) {
  return (
    <div className=" py-20  bg-black text-white min-h-225">
      <h1 className="text-center text-4xl font-bold tracking-tight leading-tight">
        Dashboard
      </h1>
      <main>{children}</main>
    </div>
  );
}
