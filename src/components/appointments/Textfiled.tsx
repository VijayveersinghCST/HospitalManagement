import { InputHTMLAttributes } from "react";

interface TextfieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    required?: boolean;
    hint?: string;
    error?: string;
}

export default function Textfield({
                                      label,
                                      required,
                                      hint,
                                      error,
                                      id,
                                      className,
                                      ...inputProps
                                  }: TextfieldProps) {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={fieldId} className="text-sm font-medium text-slate-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                id={fieldId}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                    error ? "border-red-400" : "border-slate-200"
                } ${className ?? ""}`}
                {...inputProps}
            />
            {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}