"use client";

import { useState } from "react";
import { LifeBuoy, X } from "lucide-react";
import {COLORS} from "@/constants/colors";

export default function HelpWidget() {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div
            className="relative rounded-2xl px-4 py-4 text-white shadow-sm"
            style={{ backgroundColor: COLORS.teal }}
        >
            <button
                type="button"
                onClick={() => setVisible(false)}
                aria-label="Dismiss"
                className="absolute right-3 top-3 text-white/70 transition hover:text-white"
            >
                <X size={14} />
            </button>

            <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
        <LifeBuoy size={16} />
      </span>

            <p className="text-[0.88rem] font-semibold leading-tight">Need Help?</p>
            <p className="mt-1 text-[0.78rem] leading-snug text-white/85">
                Contact IT Support for system issues.
            </p>
        </div>
    );
}