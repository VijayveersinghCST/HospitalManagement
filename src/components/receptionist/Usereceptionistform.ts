import { useState } from "react";
import {
    ReceptionistFormData,
    PersonalInfo,
    ProfessionalInfo,
    WorkDetails,
    emptyReceptionistForm,
} from "./Receptionist";

export const WIZARD_STEPS = ["Personal Info", "Professional Info", "Work Details", "Review"];

export function useReceptionistForm(initial: ReceptionistFormData = emptyReceptionistForm) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<ReceptionistFormData>(initial);

    const updatePersonalInfo = (patch: Partial<PersonalInfo>) => {
        setFormData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, ...patch } }));
    };

    const updateProfessionalInfo = (patch: Partial<ProfessionalInfo>) => {
        setFormData((prev) => ({ ...prev, professionalInfo: { ...prev.professionalInfo, ...patch } }));
    };

    const updateWorkDetails = (patch: Partial<WorkDetails>) => {
        setFormData((prev) => ({ ...prev, workDetails: { ...prev.workDetails, ...patch } }));
    };

    const goNext = () => setCurrentStep((s) => Math.min(s + 1, WIZARD_STEPS.length - 1));
    const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));
    const goToStep = (step: number) => setCurrentStep(step);

    const isPersonalInfoValid = () => {
        const { fullName, gender, dateOfBirth, contactNumber, email } = formData.personalInfo;
        return Boolean(fullName && gender && dateOfBirth && contactNumber && email);
    };

    const isProfessionalInfoValid = () => {
        const { department, qualification, languages } = formData.professionalInfo;
        return Boolean(department && qualification && languages.length > 0);
    };

    const isWorkDetailsValid = () => {
        const { assignedDesk, shift, joiningDate } = formData.workDetails;
        return Boolean(assignedDesk && shift && joiningDate);
    };

    const isStepValid = (step: number) => {
        if (step === 0) return isPersonalInfoValid();
        if (step === 1) return isProfessionalInfoValid();
        if (step === 2) return isWorkDetailsValid();
        return true;
    };

    return {
        currentStep,
        formData,
        updatePersonalInfo,
        updateProfessionalInfo,
        updateWorkDetails,
        goNext,
        goBack,
        goToStep,
        isStepValid,
    };
}