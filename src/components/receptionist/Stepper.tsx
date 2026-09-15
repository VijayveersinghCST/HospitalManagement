import { Check } from "lucide-react";

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

                return (
                    <div key={step.label} className={`flex items-center ${isLast ? "" : "flex-1"}`}>
                        <div className="flex flex-col items-center gap-1.5">
                            <div
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition ${
                                    isComplete
                                        ? "bg-emerald-500 text-white"
                                        : isCurrent
                                            ? "bg-brand-600 text-white"
                                            : "bg-slate-100 text-slate-400"
                                }`}
                            >
                                {isComplete ? <Check size={16} /> : index + 1}
                            </div>
                            <span
                                className={`whitespace-nowrap text-xs font-medium ${
                                    isCurrent ? "text-brand-700" : isComplete ? "text-emerald-600" : "text-slate-400"
                                }`}
                            >
                {step.label}
              </span>
                        </div>
                        {!isLast && (
                            <div
                                className={`mx-2 h-0.5 flex-1 rounded ${
                                    index < currentStep ? "bg-emerald-500" : "bg-slate-200"
                                }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}