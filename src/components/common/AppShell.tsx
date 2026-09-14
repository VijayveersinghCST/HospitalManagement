"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/common/Sidebar";
import { Plus, Menu } from "lucide-react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Route change hone par mobile drawer automatically close ho jayega
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 1. Constant Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* 2. Main Page Content */}
      <div className="flex min-h-screen flex-1 flex-col min-w-0">
        {/* Mobile Header (Sirf mobile me dikhega) */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
          {/* Mobile Logo: Is par tap karne se Sidebar Open/Close toggle hoga */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="flex items-center gap-2.5 text-left focus:outline-none active:scale-95 transition-transform"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white shadow-sm">
              <Plus className="h-4 w-4" strokeWidth={3} />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-slate-900">Shri Ram Hospital</p>
              <p className="text-[11px] text-slate-400">
                {isSidebarOpen ? "Tap to close" : "Tap menu"}
              </p>
            </div>
          </button>

          {/* Right Hamburger icon */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}