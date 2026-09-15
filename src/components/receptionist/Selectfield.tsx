// Selectfield.tsx
import { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { COLORS } from "@/constants/colors";

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    required?: boolean;
    hint?: string;
    placeholder?: string;
    options: readonly string[];
    error?: string;
}

export default function SelectField({
                                        label,
                                        required,
                                        hint,
                                        placeholder = "Select an option",
                                        options,
                                        error,
                                        id,
                                        className,
                                        ...selectProps
                                    }: SelectFieldProps) {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={fieldId} className="text-sm font-medium" style={{ color: COLORS.navy }}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <select
                    id={fieldId}
                    className={`w-full appearance-none rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#1565D8] focus:ring-2 focus:ring-[#1565D81a] ${
                        error ? "border-red-400" : "border-slate-200"
                    } ${className ?? ""}`}
                    style={{ color: COLORS.navy }}
                    {...selectProps}
                >
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: COLORS.gray }}
                />
            </div>
            {hint && !error && (
                <p className="text-xs" style={{ color: COLORS.gray }}>
                    {hint}
                </p>
            )}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}