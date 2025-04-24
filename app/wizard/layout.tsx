// app/wizard/layout.tsx
import React from "react";

export default function WizardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen px-4 py-8">
      {children}
    </div>
  );
}
