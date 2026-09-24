import { AppointmentStatus } from "./Appointments";

const STATUS_STYLES: Record<AppointmentStatus, string> = {
    Scheduled: "bg-blue-50 text-blue-700",
    Confirmed: "bg-emerald-50 text-emerald-700",
    Completed: "bg-slate-100 text-slate-600",
    Cancelled: "bg-red-50 text-red-600",
    "No Show": "bg-amber-50 text-amber-700",
};

export default function Appointmentstatusbadge({ status }: { status: AppointmentStatus }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
        >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {status}
    </span>
    );
}