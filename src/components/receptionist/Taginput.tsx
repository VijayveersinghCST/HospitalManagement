import { KeyboardEvent, useState } from "react";
import { X } from "lucide-react";

interface TagInputProps {
    label: string;
    required?: boolean;
    hint?: string;
    values: string[];
    onChange: (values: string[]) => void;
    suggestions?: readonly string[];
    placeholder?: string;
}

export default function TagInput({
                                     label,
                                     required,
                                     hint,
                                     values,
                                     onChange,
                                     suggestions = [],
                                     placeholder = "Type to add...",
                                 }: TagInputProps) {
    const [draft, setDraft] = useState("");

    const addTag = (tag: string) => {
        const trimmed = tag.trim();
        if (trimmed && !values.includes(trimmed)) {
            onChange([...values, trimmed]);
        }
        setDraft("");
    };

    const removeTag = (tag: string) => {
        onChange(values.filter((v) => v !== tag));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag(draft);
        } else if (e.key === "Backspace" && draft === "" && values.length > 0) {
            removeTag(values[values.length - 1]);
        }
    };

    const filteredSuggestions = suggestions.filter(
        (s) => !values.includes(s) && s.toLowerCase().includes(draft.toLowerCase()) && draft.length > 0
    );

    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 px-2 py-2 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100">
                    {values.map((tag) => (
                        <span
                            key={tag}
                            className="flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700"
                        >
              {tag}
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="text-brand-500 hover:text-brand-700"
                                aria-label={`Remove ${tag}`}
                            >
                <X size={12} />
              </button>
            </span>
                    ))}
                    <input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={values.length === 0 ? placeholder : ""}
                        className="min-w-[100px] flex-1 border-none px-1 py-0.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                </div>
                {filteredSuggestions.length > 0 && (
                    <ul className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-sm">
                        {filteredSuggestions.map((s) => (
                            <li key={s}>
                                <button
                                    type="button"
                                    onClick={() => addTag(s)}
                                    className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                                >
                                    {s}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {hint && <p className="text-xs text-slate-400">{hint}</p>}
        </div>
    );
}