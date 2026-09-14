import type { LucideIcon } from "lucide-react";
import { ArrowRight, TrendingUp } from "lucide-react";

export interface StatCardProps {
  label: string;
  value: string | number;
  helper: string;
  icon: LucideIcon;
  iconClassName: string;
  trend?: string;
  trendDirection?: "up" | "neutral";
}

export default function StatCard({
  label,
  value,
  helper,
  icon: Icon,
  iconClassName,
  trend,
  trendDirection = "up",
}: StatCardProps) {
  return (
    <div
      className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_2px_6px_rgba(15,23,42,0.06)] transition-shadow duration-200 hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.18)] sm:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}
        >
          <Icon className="h-[18px] w-[18px]" />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="text-2xl font-bold text-slate-900 sm:text-3xl">{value}</span>
        {trend && (
          <span
            className={`flex items-center gap-0.5 text-sm font-semibold ${
              trendDirection === "up" ? "text-green-600" : "text-slate-400"
            }`}
          >
            {trendDirection === "up" ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <ArrowRight className="h-3.5 w-3.5" />
            )}
            {trend}
          </span>
        )}
      </div>

      <p className="mt-1.5 text-sm text-slate-400">{helper}</p>
    </div>
  );
}
