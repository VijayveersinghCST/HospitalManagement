interface CheckboxOption {
    id: string;
    label: string;
    helper?: string;
}

interface CheckboxGridProps {
    label: string;
    options: readonly CheckboxOption[];
    selectedIds: string[];
    onChange: (ids: string[]) => void;
}

export default function Checkboxgrid({ label, options, selectedIds, onChange }: CheckboxGridProps) {
    const toggle = (id: string) => {
        if (selectedIds.includes(id)) {
            onChange(selectedIds.filter((v) => v !== id));
        } else {
            onChange([...selectedIds, id]);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {options.map((option) => {
                    const checked = selectedIds.includes(option.id);
                    return (
                        <label
                            key={option.id}
                            className={`flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2.5 transition ${
                                checked ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggle(option.id)}
                                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="flex flex-col">
                <span className="text-sm font-medium text-slate-800">{option.label}</span>
                                {option.helper && <span className="text-xs text-slate-400">{option.helper}</span>}
              </span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}