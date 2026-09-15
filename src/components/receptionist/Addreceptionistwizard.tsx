"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Stepper from "./Stepper";
import Button from "./Button";
import PersonalInfoStep from "./Personalinforstep";
import ProfessionalInfoStep from "./Professionalinfostep";
import WorkDetailsStep from "./Workdetailsstep";
import ReviewStep from "./Reviewstep";
import { useReceptionistForm, WIZARD_STEPS } from "./Usereceptionistform";

export default function AddReceptionistWizard() {
    const router = useRouter();
    const {
        currentStep,
        formData,
        updatePersonalInfo,
        updateProfessionalInfo,
        updateWorkDetails,
        goNext,
        goBack,
        goToStep,
        isStepValid,
    } = useReceptionistForm();

    const steps = WIZARD_STEPS.map((label) => ({ label }));
    const isLastStep = currentStep === steps.length - 1;
    const canProceed = isStepValid(currentStep);

    const handlePrimaryAction = () => {
        if (isLastStep) {
            // TODO: replace with a real submission, e.g.
            // await fetch("/api/receptionists", { method: "POST", body: JSON.stringify(formData) })
            console.log("New receptionist submitted:", formData);
            router.push("/receptionists");
            return;
        }
        goNext();
    };

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            <div>
                <nav className="mb-2 flex items-center gap-1.5 text-xs text-slate-400">
                    <span>Dashboard</span>
                    <ChevronRight size={12} />
                    <span>Receptionists</span>
                    <ChevronRight size={12} />
                    <span className="text-slate-600">Add New</span>
                </nav>
                <h1 className="text-2xl font-bold text-slate-900">Add New Receptionist</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Enter the details of the new receptionist to begin onboarding.
                </p>
            </div>

            <div className="rounded-card border border-slate-200 bg-white p-5">
                <Stepper steps={steps} currentStep={currentStep} />
            </div>

            <div className="rounded-card border border-slate-200 bg-white p-6">
                {currentStep === 0 && (
                    <PersonalInfoStep data={formData.personalInfo} onChange={updatePersonalInfo} />
                )}
                {currentStep === 1 && (
                    <ProfessionalInfoStep data={formData.professionalInfo} onChange={updateProfessionalInfo} />
                )}
                {currentStep === 2 && (
                    <WorkDetailsStep data={formData.workDetails} onChange={updateWorkDetails} />
                )}
                {currentStep === 3 && <ReviewStep data={formData} onEditStep={goToStep} />}
            </div>

            <div className="flex items-center justify-between">
                <Button variant="secondary" onClick={goBack} disabled={currentStep === 0}>
                    Back
                </Button>
                <Button onClick={handlePrimaryAction} disabled={!canProceed}>
                    {isLastStep ? "Submit" : "Continue"}
                </Button>
            </div>
        </div>
    );
}