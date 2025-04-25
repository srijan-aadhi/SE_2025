import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="mt-12">
        <div className="mt-12">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
