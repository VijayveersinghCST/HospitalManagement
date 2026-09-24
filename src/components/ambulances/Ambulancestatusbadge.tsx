import { AmbulanceStatus } from "./Ambulances";

const STATUS_STYLES: Record<AmbulanceStatus, string> = {
    Available: "bg-emerald-50 text-emerald-700",
    "On Duty": "bg-blue-50 text-blue-700",
    "Under Maintenance": "bg-amber-50 text-amber-700",
    "Out of Service": "bg-red-50 text-red-600",
};

export default function Ambulancestatusbadge({ status }: { status: AmbulanceStatus }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
        >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {status}
    </span>
    );
}