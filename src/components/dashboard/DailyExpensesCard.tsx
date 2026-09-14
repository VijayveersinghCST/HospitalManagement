import { Fuel, Zap, Wrench } from "lucide-react";
import {COLORS} from "@/constants/colors";
import type { ExpenseItem } from "./Dashboard";

const expenses: ExpenseItem[] = [
    { id: "fuel", label: "Fuel", amount: "$1,200", icon: "fuel", iconColor: COLORS.blue },
    { id: "electricity", label: "Electricity", amount: "$3,450", icon: "electricity", iconColor: COLORS.teal },
    { id: "maintenance", label: "Maint.", amount: "$850", icon: "maintenance", iconColor: COLORS.greenDark },
];

const icons = {
    fuel: Fuel,
    electricity: Zap,
    maintenance: Wrench,
};

export default function DailyExpensesCard() {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between">
                <p className="text-[0.82rem] font-semibold" style={{ color: COLORS.navy }}>
                    Daily Expenses
                </p>
            </div>

            <ul className="mt-3 flex flex-col gap-3">
                {expenses.map((item) => {
                    const Icon = icons[item.icon];
                    return (
                        <li key={item.id} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[0.85rem]" style={{ color: COLORS.navy }}>
                <Icon size={15} style={{ color: item.iconColor }} />
                  {item.label}
              </span>
                            <span className="text-[0.85rem] font-semibold" style={{ color: COLORS.navy }}>
                {item.amount}
              </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}