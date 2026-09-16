import { Building2, Stethoscope, BedDouble, Siren } from "lucide-react";
import { AssignedUnitOption } from "./Pharmacystaff";
import { COLORS } from "@/constants/colors";

const ICONS = { main: Building2, opd: Stethoscope, ipd: BedDouble, emergency: Siren };

interface AssignedUnitGridProps {
    label: string;
    options: AssignedUnitOption[];
    value: string;
    onChange: (id: string) => void;
}

export default function AssignedUnitGrid({ label, options, value, onChange }: AssignedUnitGridProps) {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-sm font-medium" style={{ color: COLORS.navy }}>
                {label}
            </span>
            <div className="grid grid-cols-2 gap-3">
                {options.map((opt) => {
                    const Icon = ICONS[opt.icon];
                    const selected = value === opt.id;
                    return (
                        <button
                            key={opt.id}
                            type="button"
                            onClick={() => onChange(opt.id)}
                            className="flex items-center gap-2.5 rounded-lg border px-3 py-3 text-left text-sm font-medium transition"
                            style={
                                selected
                                    ? { borderColor: COLORS.blueLight, backgroundColor: `${COLORS.blue}0d`, color: COLORS.blue }
                                    : { borderColor: "#E2E8F0", backgroundColor: "#FFFFFF", color: COLORS.navy }
                            }
                        >
                            <Icon size={16} />
                            {opt.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}