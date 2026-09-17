// src/components/common/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, LogOut, X } from "lucide-react";
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

  // Desktop icon-only toggle state
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [openLabel, setOpenLabel] = useState<string | null>(
    activeItem?.children ? activeItem.label : null
  );

  const handleLogout = () => {
    clearAuthToken();
    onClose();
    router.push("/login");
  };

  // Logo tap handler: Mobile par close karega, Desktop par icons mode toggle karega
  const handleLogoClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      onClose();
    } else {
      setIsCollapsed((prev) => !prev);
    }
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

      {/* Aside: Shadowed border + Dynamic width for collapse */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen shrink-0 -translate-x-full flex-col border-r border-slate-200/80 bg-white shadow-[4px_0_24px_rgba(15,23,42,0.05)] transition-all duration-300 ease-in-out lg:sticky lg:top-0 lg:translate-x-0 ${isOpen ? "translate-x-0" : ""
          } ${isCollapsed
            ? "w-72 lg:w-[72px] xl:w-[72px]"
            : "w-72 lg:w-60 xl:w-64"
          }`}
      >
        {/* Brand / Logo */}
        <div
          className={`flex items-center border-b border-slate-100 py-4 transition-all ${isCollapsed
              ? "justify-center px-2"
              : "justify-between px-5"
            }`}
        >
          <button
            type="button"
            onClick={handleLogoClick}
            className={`flex items-center gap-3 text-left focus:outline-none ${isCollapsed ? "justify-center" : ""
              }`}
            title={isCollapsed ? "Click to expand sidebar" : "Click to collapse sidebar"}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
              <Image
                src="/images/HSP_logo.png"
                alt="logo"
                priority
                height={36}
                width={36}
                className="h-8 w-8 object-contain"
              />
            </div>
            {!isCollapsed && (
              <div className="leading-tight overflow-hidden transition-all">
                <p className="text-[14px] font-bold text-slate-900 truncate">HealthSpine</p>
                <p className="text-[11px] text-slate-400 truncate">Management System</p>
              </div>
            )}
          </button>

          {/* Close button for mobile screen */}
          {!isCollapsed && (
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Nav list */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-2.5 py-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isParentActive = activeItem?.label === item.label;

            if (item.children) {
              const isOpenGroup = openLabel === item.label;
              return (
                <div key={item.label}>
                  <button
                    type="button"
                    title={isCollapsed ? item.label : undefined}
                    onClick={() => {
                      if (isCollapsed) {
                        setIsCollapsed(false);
                        setOpenLabel(item.label);
                      } else {
                        setOpenLabel((current) =>
                          current === item.label ? null : item.label
                        );
                      }
                    }}
                    className={`flex w-full items-center rounded-xl py-2.5 text-sm font-medium transition-colors ${isCollapsed ? "justify-center px-0" : "gap-3 px-3"
                      } ${isParentActive
                        ? "bg-green-50/80 text-green-600 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={isParentActive ? 2.4 : 2} />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left truncate">{item.label}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-slate-400 transition-transform ${isOpenGroup ? "rotate-180" : ""
                            }`}
                        />
                      </>
                    )}
                  </button>

                  {/* Submenu links */}
                  {!isCollapsed && isOpenGroup && (
                    <div className="ml-3 mt-1 space-y-0.5 border-l border-slate-100 pl-3">
                      {item.children.map((child) => {
                        const isChildActive = activeChild?.href === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className={`relative block rounded-lg py-1.5 pl-3 text-xs transition-colors ${isChildActive
                                ? "font-semibold text-green-600"
                                : "text-slate-500 hover:text-slate-900"
                              }`}
                          >
                            {isChildActive && (
                              <span className="absolute -left-3 top-0 h-full w-0.5 rounded-full bg-green-600" />
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
                title={isCollapsed ? item.label : undefined}
                onClick={onClose}
                className={`flex items-center rounded-xl py-2.5 text-sm font-medium transition-colors ${isCollapsed ? "justify-center px-0" : "gap-3 px-3"
                  } ${isParentActive
                    ? "bg-green-50/80 text-green-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={isParentActive ? 2.4 : 2} />
                {!isCollapsed && <span className="flex-1 text-left truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Profile Footer */}
        <div
          className={`flex items-center border-t border-slate-100 py-3.5 transition-all ${isCollapsed
              ? "flex-col gap-3 px-2 justify-center"
              : "gap-3 px-4 justify-between"
            }`}
        >
          <div
            className={`flex items-center gap-2.5 min-w-0 ${isCollapsed ? "justify-center" : ""
              }`}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
              DA
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0 leading-tight">
                <p className="text-xs font-semibold text-slate-900 truncate">Dr. Admin</p>
                <p className="text-[11px] text-slate-400 truncate">Super Admin</p>
              </div>
            )}
          </div>

          <button
            type="button"
            title="Log out"
            aria-label="Log out"
            onClick={handleLogout}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-red-600"
          >
            <LogOut className="h-[18px] w-[18px]" />
          </button>
        </div>
      </aside>
    </>
  );
}