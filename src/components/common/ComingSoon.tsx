import type { LucideIcon } from "lucide-react";
import { Hammer } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
}

export default function ComingSoon({
  title,
  description = "This module is being built and will be available soon.",
  icon: Icon = Hammer,
}: ComingSoonProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
        <Icon className="h-7 w-7" strokeWidth={1.75} />
      </div>
      <h2 className="mt-5 text-xl font-bold text-slate-900">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-slate-500">{description}</p>
      <span className="mt-5 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
        Coming soon
      </span>
    </div>
  );
}
