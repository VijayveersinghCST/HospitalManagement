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
      <span className="text-sm font-medium text-slate-700">
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
                            className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                                isSelected
                                    ? "border-brand-500 bg-brand-50 text-brand-700"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                            }`}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}