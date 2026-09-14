import type { DoctorStatus } from "@/types/doctor";

const STYLES: Record<DoctorStatus, string> = {
  Available: "bg-green-50 text-green-700",
  "In Surgery": "bg-blue-50 text-blue-700",
  "Off Duty": "bg-slate-100 text-slate-500",
};

const DOT_STYLES: Record<DoctorStatus, string> = {
  Available: "bg-green-500",
  "In Surgery": "bg-blue-500",
  "Off Duty": "bg-slate-400",
};

export default function StatusBadge({ status }: { status: DoctorStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${STYLES[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${DOT_STYLES[status]}`} />
      {status}
    </span>
  );
}
