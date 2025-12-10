// app/(website)/layout.tsx
import type { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function WebsiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="lg:ml-64 pt-28">
        {children}
      </main>
    </>
  );
}