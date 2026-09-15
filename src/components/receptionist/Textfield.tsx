// Textfield.tsx
import { InputHTMLAttributes, ReactNode } from "react";
import { COLORS } from "@/constants/colors";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    required?: boolean;
    hint?: string;
    icon?: ReactNode;
    error?: string;
}

export default function TextField({
                                      label,
                                      required,
                                      hint,
                                      icon,
                                      error,
                                      id,
                                      className,
                                      ...inputProps
                                  }: TextFieldProps) {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={fieldId} className="text-sm font-medium" style={{ color: COLORS.navy }}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <input
                    id={fieldId}
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#1565D8] focus:ring-2 focus:ring-[#1565D81a] ${
                        error ? "border-red-400" : "border-slate-200"
                    } ${icon ? "pr-10" : ""} ${className ?? ""}`}
                    style={{ color: COLORS.navy }}
                    {...inputProps}
                />
                {icon && (
                    <span
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                        style={{ color: COLORS.gray }}
                    >
                        {icon}
                    </span>
                )}
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