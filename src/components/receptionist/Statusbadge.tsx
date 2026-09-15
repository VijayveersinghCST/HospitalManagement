import { ReceptionistStatus } from "./Receptionist";

const STATUS_STYLES: Record<ReceptionistStatus, string> = {
    Active: "bg-status-activeBg text-status-activeText",
    Inactive: "bg-status-inactiveBg text-status-inactiveText",
    Suspended: "bg-status-suspendedBg text-status-suspendedText",
};

export default function StatusBadge({ status }: { status: ReceptionistStatus }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
        >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {status}
    </span>
    );
}