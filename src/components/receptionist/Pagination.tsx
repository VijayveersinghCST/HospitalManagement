import { COLORS } from "@/constants/colors";

interface PaginationProps {
    from?: number;
    to?: number;
    total?: number;
}

export default function Pagination({ from = 1, to = 5, total = 24 }: PaginationProps) {
    return (
        <div className="flex items-center justify-between px-1">
            <p className="text-[0.8rem]" style={{ color: COLORS.gray }}>
                Showing {from}-{to} of {total}
            </p>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-[0.8rem] font-medium"
                    style={{ color: COLORS.gray }}
                >
                    Previous
                </button>
                <button
                    type="button"
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-[0.8rem] font-medium"
                    style={{ color: COLORS.navy }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}