"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Button from "@/components/receptionist/Button";
import AccountantPersonalInfoStep from "./Accountantpersonalinfostep";
import AccountantProfessionalInfoStep from "./Accountantprofessionalinfostep";
import { useAccountantForm, ACCOUNTANT_WIZARD_STEPS } from "./Useaccountantform";
import { COLORS } from "@/constants/colors";

export default function AddAccountantWizard() {
    const router = useRouter();
    const { currentStep, formData, updatePersonalInfo, updateProfessionalInfo, goNext, goBack, isStepValid } =
        useAccountantForm();

    const isLastStep = currentStep === ACCOUNTANT_WIZARD_STEPS.length - 1;
    const canProceed = isStepValid(currentStep);
    const percentComplete = Math.round(((currentStep + 1) / (ACCOUNTANT_WIZARD_STEPS.length + 1)) * 100);

    const handlePrimaryAction = () => {
        if (isLastStep) {
            // TODO: replace with a real submission, e.g.
            // await fetch("/api/accountants", { method: "POST", body: JSON.stringify(formData) })
            console.log("New accountant submitted:", formData);
            router.push("/accountants");
            return;
        }
        goNext();
    };

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            <div>
                <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                    <span>Dashboard</span>
                    <ChevronRight size={12} />
                    <span>Accountants</span>
                    <ChevronRight size={12} />
                    <span style={{ color: COLORS.navy }}>Add Accountant</span>
                </nav>
                <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                    Add New Accountant
                </h1>
                <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                    Create a new profile for hospital finance staff.
                </p>
            </div>

            <div className="rounded-card border border-slate-200 bg-white p-5">
                <div className="mb-3 flex items-center justify-between text-xs font-medium" style={{ color: COLORS.blue }}>
                    <span>
                        Step {currentStep + 1}: {ACCOUNTANT_WIZARD_STEPS[currentStep]}
                    </span>
                    <span>{percentComplete}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${percentComplete}%`, backgroundColor: COLORS.blue }}
                    />
                </div>
            </div>

            <div className="rounded-card border border-slate-200 bg-white p-6">
                {currentStep === 0 && (
                    <AccountantPersonalInfoStep data={formData.personalInfo} onChange={updatePersonalInfo} />
                )}
                {currentStep === 1 && (
                    <AccountantProfessionalInfoStep data={formData.professionalInfo} onChange={updateProfessionalInfo} />
                )}
            </div>

            <div className="flex items-center justify-between">
                <Button variant="secondary" onClick={goBack} disabled={currentStep === 0}>
                    Back
                </Button>
                <Button onClick={handlePrimaryAction} disabled={!canProceed}>
                    {isLastStep ? "Save Accountant" : "Next: " + ACCOUNTANT_WIZARD_STEPS[currentStep + 1] + " →"}
                </Button>
            </div>
        </div>
    );
}