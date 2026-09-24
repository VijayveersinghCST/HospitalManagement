import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger";
}

const VARIANT_STYLES: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    danger: "border border-red-200 bg-white text-red-600 hover:bg-red-50",
};

export default function Button({
                                   variant = "primary",
                                   className,
                                   children,
                                   ...props
                               }: ButtonProps) {
    return (
        <button
            className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_STYLES[variant]} ${className ?? ""}`}
            {...props}
        >
            {children}
        </button>
    );
}