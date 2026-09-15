// Stepper.tsx
import { Check } from "lucide-react";
import { COLORS } from "@/constants/colors";

export interface Step {
    label: string;
}

interface StepperProps {
    steps: Step[];
    currentStep: number; // 0-indexed
}

export default function Stepper({ steps, currentStep }: StepperProps) {
    return (
        <div className="flex items-center">
            {steps.map((step, index) => {
                const isComplete = index < currentStep;
                const isCurrent = index === currentStep;
                const isLast = index === steps.length - 1;

                const circleStyle = isComplete
                    ? { backgroundColor: COLORS.green, color: "#FFFFFF" }
                    : isCurrent
                        ? { backgroundColor: COLORS.blue, color: "#FFFFFF" }
                        : { backgroundColor: "#F1F5F9", color: COLORS.gray };

                const labelStyle = isCurrent
                    ? { color: COLORS.blue }
                    : isComplete
                        ? { color: COLORS.green }
                        : { color: COLORS.gray };

                return (
                    <div key={step.label} className={`flex items-center ${isLast ? "" : "flex-1"}`}>
                        <div className="flex flex-col items-center gap-1.5">
                            <div
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition"
                                style={circleStyle}
                            >
                                {isComplete ? <Check size={16} /> : index + 1}
                            </div>
                            <span className="whitespace-nowrap text-xs font-medium" style={labelStyle}>
                                {step.label}
                            </span>
                        </div>
                        {!isLast && (
                            <div
                                className="mx-2 h-0.5 flex-1 rounded"
                                style={{ backgroundColor: index < currentStep ? COLORS.green : "#E2E8F0" }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}