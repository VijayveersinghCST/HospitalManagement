import { InputHTMLAttributes, ReactNode } from "react";

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
            <label htmlFor={fieldId} className="text-sm font-medium text-slate-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <input
                    id={fieldId}
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${
                        error ? "border-red-400" : "border-slate-200"
                    } ${icon ? "pr-10" : ""} ${className ?? ""}`}
                    {...inputProps}
                />
                {icon && (
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
                )}
            </div>
            {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}