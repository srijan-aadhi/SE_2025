import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar"; // ✅ your custom nav

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
