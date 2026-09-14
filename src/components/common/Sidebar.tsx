
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, LogOut, Plus, X } from "lucide-react";
import { NAV_ITEMS, findActiveNav } from "@/lib/navigation";
import { clearAuthToken } from "@/lib/auth";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { item: activeItem, child: activeChild } = findActiveNav(pathname);

  const [openLabel, setOpenLabel] = useState<string | null>(
    activeItem?.children ? activeItem.label : null
  );

  const handleLogout = () => {
    clearAuthToken();
    onClose();
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
        />
      )}

      {/* Aside: Desktop pe sticky + h-screen, mobile pe slide drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 shrink-0 -translate-x-full flex-col border-r border-slate-100 bg-white transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:w-64 lg:translate-x-0 xl:w-72 ${isOpen ? "translate-x-0" : ""
          }`}
      >
        {/* Brand / Logo: Is par tap karne se mobile me drawer close ho jayega */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-6 py-5">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-3 text-left focus:outline-none"
            title="Tap to close"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white">
              <Image src="/images/HSP_logo.png" alt="logo"
            priority height={50} width={40}/>
            </div>
            <div className="leading-tight">
              <p className="text-[15px] font-bold text-slate-900">HealthSpine</p>
              <p className="text-xs text-slate-400">Management System</p>
            </div>
          </button>

          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav list */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isParentActive = activeItem?.label === item.label;

            if (item.children) {
              const isOpenGroup = openLabel === item.label;
              return (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenLabel((current) => (current === item.label ? null : item.label))
                    }
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isParentActive
                        ? "text-green-600"
                        : "text-slate-600 hover:bg-slate-50"
                      }`}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform ${isOpenGroup ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {isOpenGroup && (
                    <div className="ml-4 mt-1 space-y-0.5 border-l border-slate-100 pl-4">
                      {item.children.map((child) => {
                        const isChildActive = activeChild?.href === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className={`relative block rounded-lg py-2 pl-3 text-sm transition-colors ${isChildActive
                                ? "font-semibold text-green-600"
                                : "text-slate-500 hover:text-slate-900"
                              }`}
                          >
                            {isChildActive && (
                              <span className="absolute -left-4 top-0 h-full w-0.5 rounded-full bg-green-600" />
                            )}
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href!}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isParentActive
                    ? "text-green-600"
                    : "text-slate-600 hover:bg-slate-50"
                  }`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Profile */}
        <div className="flex items-center gap-3 border-t border-slate-100 px-4 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
            DA
          </div>
          <div className="flex-1 leading-tight">
            <p className="text-sm font-semibold text-slate-900">Dr. Admin</p>
            <p className="text-xs text-slate-400">Super Admin</p>
          </div>
          <button
            type="button"
            aria-label="Log out"
            onClick={handleLogout}
            className="text-slate-400 transition-colors hover:text-slate-700"
          >
            <LogOut className="h-[18px] w-[18px]" />
          </button>
        </div>
      </aside>
    </>
  );
}