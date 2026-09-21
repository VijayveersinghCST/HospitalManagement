import { useState } from "react";
import { AccountantFormData, PersonalInfo, ProfessionalInfo, emptyAccountantForm } from "./Accountant";

export const ACCOUNTANT_WIZARD_STEPS = ["Personal Info", "Professional Information"];

export function useAccountantForm(initial: AccountantFormData = emptyAccountantForm) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<AccountantFormData>(initial);

    const updatePersonalInfo = (patch: Partial<PersonalInfo>) => {
        setFormData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, ...patch } }));
    };
    const updateProfessionalInfo = (patch: Partial<ProfessionalInfo>) => {
        setFormData((prev) => ({ ...prev, professionalInfo: { ...prev.professionalInfo, ...patch } }));
    };

    const goNext = () => setCurrentStep((s) => Math.min(s + 1, ACCOUNTANT_WIZARD_STEPS.length - 1));
    const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

    const isPersonalInfoValid = () => {
        const { fullName, dateOfBirth, gender, contactNumber, email } = formData.personalInfo;
        return Boolean(fullName && dateOfBirth && gender && contactNumber && email);
    };
    const isProfessionalInfoValid = () => {
        const { highestQualification, experienceYears } = formData.professionalInfo;
        return Boolean(highestQualification && experienceYears);
    };
    const isStepValid = (step: number) => {
        if (step === 0) return isPersonalInfoValid();
        if (step === 1) return isProfessionalInfoValid();
        return true;
    };

    return {
        currentStep,
        formData,
        updatePersonalInfo,
        updateProfessionalInfo,
        goNext,
        goBack,
        isStepValid,
    };
}