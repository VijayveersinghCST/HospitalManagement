// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Bell, Menu, Search, Settings } from "lucide-react";
// import { findActiveNav } from "@/lib/navigation";

// interface TopbarProps {
//   onMenuClick: () => void;
// }

// export default function Topbar({ onMenuClick }: TopbarProps) {
//   const pathname = usePathname();
//   const { item, child } = findActiveNav(pathname);

//   const crumb = child?.label ?? item?.label ?? "Dashboard";

//   return (
//     <header className="flex h-[65px] shrink-0 items-center justify-between gap-3 border-b border-slate-100 bg-white px-4 sm:h-[73px] sm:px-6 lg:px-8">
//       <div className="flex min-w-0 items-center gap-3">
//         <button
//           type="button"
//           aria-label="Open menu"
//           onClick={onMenuClick}
//           className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
//         >
//           <Menu className="h-5 w-5" />
//         </button>

//         <div className="flex min-w-0 items-center gap-2 text-sm">
//           <Link href="/dashboard" className="shrink-0 text-green-600 hover:underline">
//             Dashboard
//           </Link>
//           {crumb !== "Dashboard" && (
//             <>
//               <span className="text-slate-300">/</span>
//               <span className="truncate font-medium text-slate-900">{crumb}</span>
//             </>
//           )}
//         </div>
//       </div>

//       <div className="flex items-center gap-2 sm:gap-3">
//         <div className="relative hidden md:block">
//           <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//           <input
//             type="text"
//             placeholder="Search doctors, ID..."
//             className="w-48 rounded-lg border border-transparent bg-slate-100 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-200 focus:bg-white focus:ring-2 focus:ring-green-100 lg:w-64"
//           />
//         </div>

//         <button
//           type="button"
//           aria-label="Search"
//           className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 md:hidden"
//         >
//           <Search className="h-[18px] w-[18px]" />
//         </button>

//         <button
//           type="button"
//           aria-label="Notifications"
//           className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
//         >
//           <Bell className="h-[18px] w-[18px]" />
//           <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
//         </button>

//         <button
//           type="button"
//           aria-label="Settings"
//           className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:flex"
//         >
//           <Settings className="h-[18px] w-[18px]" />
//         </button>
//       </div>
//     </header>
//   );
// }
