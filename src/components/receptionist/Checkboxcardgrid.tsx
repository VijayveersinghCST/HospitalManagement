// Checkboxcardgrid.tsx
import { COLORS } from "@/constants/colors";

interface CheckboxOption {
    id: string;
    label: string;
    helper?: string;
}

interface CheckboxCardGridProps {
    label: string;
    options: readonly CheckboxOption[];
    selectedIds: string[];
    onChange: (ids: string[]) => void;
}

export default function CheckboxCardGrid({
                                             label,
                                             options,
                                             selectedIds,
                                             onChange,
                                         }: CheckboxCardGridProps) {
    const toggle = (id: string) => {
        if (selectedIds.includes(id)) {
            onChange(selectedIds.filter((v) => v !== id));
        } else {
            onChange([...selectedIds, id]);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <span className="text-sm font-medium" style={{ color: COLORS.navy }}>
                {label}
            </span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {options.map((option) => {
                    const checked = selectedIds.includes(option.id);
                    return (
                        <label
                            key={option.id}
                            className="flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2.5 transition"
                            style={
                                checked
                                    ? { borderColor: COLORS.blueLight, backgroundColor: `${COLORS.blue}0d` }
                                    : { borderColor: "#E2E8F0", backgroundColor: "#FFFFFF" }
                            }
                        >
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggle(option.id)}
                                className="mt-0.5 h-4 w-4 rounded border-slate-300 focus:ring-2"
                                style={{ accentColor: COLORS.blue }}
                            />
                            <span className="flex flex-col">
                                <span className="text-sm font-medium" style={{ color: COLORS.navy }}>
                                    {option.label}
                                </span>
                                {option.helper && (
                                    <span className="text-xs" style={{ color: COLORS.gray }}>
                                        {option.helper}
                                    </span>
                                )}
                            </span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}