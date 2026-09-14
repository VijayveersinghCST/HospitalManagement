import { ChevronRight, Plus } from "lucide-react";
import { COLORS } from "@/constants/colors";

export default function PageHeader() {
    return (
        <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
                <div className="flex items-center gap-1.5 text-[0.8rem]">
                    <span style={{ color: COLORS.gray }}>Dashboard</span>
                    <ChevronRight size={13} style={{ color: COLORS.gray }} />
                    <span className="font-semibold" style={{ color: COLORS.navy }}>
            Receptionist Management
          </span>
                </div>

                <h1 className="mt-2 text-[1.7rem] font-extrabold" style={{ color: COLORS.navy }}>
                    Receptionist Management
                </h1>
                <p className="mt-1 max-w-xl text-[0.9rem]" style={{ color: COLORS.gray }}>
                    Manage front-desk staff, OPD/IPD desks, shifts, and receptionist access rights.
                </p>
            </div>

            <button
                type="button"
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[0.88rem] font-semibold text-white shadow-sm"
                style={{ backgroundColor: COLORS.blue }}
            >
                <Plus size={16} />
                Add Receptionist
            </button>
        </div>
    );
}