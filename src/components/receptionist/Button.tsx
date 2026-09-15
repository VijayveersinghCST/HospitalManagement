// Button.tsx
import { ButtonHTMLAttributes } from "react";
import { COLORS } from "@/constants/colors";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "ghost";
}

const VARIANT_STYLES: Record<NonNullable<ButtonProps["variant"]>, React.CSSProperties> = {
    primary: { backgroundColor: COLORS.blue, color: "#FFFFFF" },
    secondary: { border: `1px solid #E2E8F0`, backgroundColor: "#FFFFFF", color: COLORS.navy },
    danger: { border: `1px solid #FECACA`, backgroundColor: "#FFFFFF", color: "#DC2626" },
    ghost: { color: COLORS.gray },
};

const VARIANT_HOVER_CLASS: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "hover:brightness-110",
    secondary: "hover:bg-slate-50",
    danger: "hover:bg-red-50",
    ghost: "hover:bg-slate-100",
};

export default function Button({
                                   variant = "primary",
                                   className,
                                   children,
                                   style,
                                   ...props
                               }: ButtonProps) {
    return (
        <button
            className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_HOVER_CLASS[variant]} ${className ?? ""}`}
            style={{ ...VARIANT_STYLES[variant], ...style }}
            {...props}
        >
            {children}
        </button>
    );
}