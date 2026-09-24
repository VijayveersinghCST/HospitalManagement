import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    required?: boolean;
    hint?: string;
}

export default function Textarea({
                                     label,
                                     required,
                                     hint,
                                     id,
                                     className,
                                     rows = 3,
                                     ...textareaProps
                                 }: TextareaProps) {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={fieldId} className="text-sm font-medium text-slate-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
                id={fieldId}
                rows={rows}
                className={`w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                    className ?? ""
                }`}
                {...textareaProps}
            />
            {hint && <p className="text-xs text-slate-400">{hint}</p>}
        </div>
    );
}