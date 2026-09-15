// Segmentedchoice.tsx
import { COLORS } from "@/constants/colors";

interface SegmentedChoiceProps {
    label: string;
    required?: boolean;
    options: readonly string[];
    value: string;
    onChange: (value: string) => void;
}

export default function SegmentedChoice({
                                            label,
                                            required,
                                            options,
                                            value,
                                            onChange,
                                        }: SegmentedChoiceProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium" style={{ color: COLORS.navy }}>
                {label} {required && <span className="text-red-500">*</span>}
            </span>
            <div className="grid grid-cols-3 gap-2">
                {options.map((option) => {
                    const isSelected = value === option;
                    return (
                        <button
                            key={option}
                            type="button"
                            onClick={() => onChange(option)}
                            className="rounded-lg border px-3 py-2.5 text-sm font-medium transition"
                            style={
                                isSelected
                                    ? { borderColor: COLORS.blueLight, backgroundColor: `${COLORS.blue}0d`, color: COLORS.blue }
                                    : { borderColor: "#E2E8F0", backgroundColor: "#FFFFFF", color: COLORS.gray }
                            }
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}