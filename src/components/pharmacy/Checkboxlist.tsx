import { COLORS } from "@/constants/colors";

interface Option {
    id: string;
    label: string;
}

interface CheckboxListProps {
    label: string;
    options: Option[];
    selectedIds: string[];
    onChange: (ids: string[]) => void;
}

export default function CheckboxList({ label, options, selectedIds, onChange }: CheckboxListProps) {
    const toggle = (id: string) => {
        onChange(selectedIds.includes(id) ? selectedIds.filter((v) => v !== id) : [...selectedIds, id]);
    };

    return (
        <div className="flex flex-col gap-2">
            <span className="text-sm font-medium" style={{ color: COLORS.navy }}>
                {label}
            </span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {options.map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2 text-sm" style={{ color: COLORS.navy }}>
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(opt.id)}
                            onChange={() => toggle(opt.id)}
                            className="h-4 w-4 rounded border-slate-300"
                            style={{ accentColor: COLORS.blue }}
                        />
                        {opt.label}
                    </label>
                ))}
            </div>
        </div>
    );
}