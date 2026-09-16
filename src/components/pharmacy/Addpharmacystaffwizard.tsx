"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Stepper from "@/components/receptionist/Stepper";
import Button from "@/components/receptionist/Button";
import PharmacyPersonalInfoStep from "./Pharmacypersonalinfostep";
import PharmacyProfessionalInfoStep from "./Pharmacyprofessionalinfostep";
import PharmacyWorkDetailsStep from "./Pharmacyworkdetailsstep";
import { usePharmacyStaffForm, PHARMACY_WIZARD_STEPS } from "./Usepharmacystaffform";
import { MOCK_PHARMACY_STAFF } from "./Mockpharmacystaff";

export default function AddPharmacyStaffWizard() {
    const router = useRouter();
    const {
        currentStep,
        formData,
        username,
        password,
        updatePersonalInfo,
        updateProfessionalInfo,
        updateWorkDetails,
        goNext,
        goBack,
        isStepValid,
    } = usePharmacyStaffForm(undefined, MOCK_PHARMACY_STAFF.length);

    const steps = PHARMACY_WIZARD_STEPS.map((label) => ({ label }));
    const isLastStep = currentStep === steps.length - 1;
    const canProceed = isStepValid(currentStep);

    const handlePrimaryAction = () => {
        if (isLastStep) {
            // TODO: replace with a real submission, e.g.
            // await fetch("/api/pharmacy-staff", { method: "POST", body: JSON.stringify({ ...formData, username, password }) })
            console.log("New pharmacy staff submitted:", { ...formData, username, password });
            router.push("/pharmacy/staff");
            return;
        }
        goNext();
    };

    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
            <div>
                <nav className="mb-2 flex items-center gap-1.5 text-xs text-slate-400">
                    <span>Dashboard</span>
                    <ChevronRight size={12} />
                    <span>Pharmacy Management</span>
                    <ChevronRight size={12} />
                    <span className="text-slate-600">Add Staff</span>
                </nav>
                <h1 className="text-2xl font-bold text-slate-900">Add Pharmacy Staff</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Register a new staff member to the pharmacy department.
                </p>
            </div>

            <div className="rounded-card border border-slate-200 bg-white p-5">
                <Stepper steps={steps} currentStep={currentStep} />
            </div>

            <div className="rounded-card border border-slate-200 bg-white p-6">
                {currentStep === 0 && (
                    <PharmacyPersonalInfoStep data={formData.personalInfo} onChange={updatePersonalInfo} />
                )}
                {currentStep === 1 && (
                    <PharmacyProfessionalInfoStep data={formData.professionalInfo} onChange={updateProfessionalInfo} />
                )}
                {currentStep === 2 && (
                    <PharmacyWorkDetailsStep
                        data={formData.workDetails}
                        onChange={updateWorkDetails}
                        username={username}
                        password={password}
                    />
                )}
            </div>

            <div className="flex items-center justify-between">
                <Button variant="secondary" onClick={goBack} disabled={currentStep === 0}>
                    Back
                </Button>
                <Button onClick={handlePrimaryAction} disabled={!canProceed}>
                    {isLastStep ? "Save & Generate Credentials" : `Next: ${PHARMACY_WIZARD_STEPS[currentStep + 1]} →`}
                </Button>
            </div>
        </div>
    );
}