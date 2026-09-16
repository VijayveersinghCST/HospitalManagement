import { useMemo, useState } from "react";
import {
    PharmacyStaffFormData,
    PersonalInfo,
    ProfessionalInfo,
    WorkDetails,
    emptyPharmacyStaffForm,
    generateUsername,
    generatePassword,
} from "./Pharmacystaff";

export const PHARMACY_WIZARD_STEPS = ["Personal Info", "Professional Info", "Work Details & Access"];

export function usePharmacyStaffForm(
    initial: PharmacyStaffFormData = emptyPharmacyStaffForm,
    existingCount = 0
) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<PharmacyStaffFormData>(initial);
    const password = useMemo(() => generatePassword(), []);

    const updatePersonalInfo = (patch: Partial<PersonalInfo>) => {
        setFormData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, ...patch } }));
    };
    const updateProfessionalInfo = (patch: Partial<ProfessionalInfo>) => {
        setFormData((prev) => ({ ...prev, professionalInfo: { ...prev.professionalInfo, ...patch } }));
    };
    const updateWorkDetails = (patch: Partial<WorkDetails>) => {
        setFormData((prev) => ({ ...prev, workDetails: { ...prev.workDetails, ...patch } }));
    };

    const goNext = () => setCurrentStep((s) => Math.min(s + 1, PHARMACY_WIZARD_STEPS.length - 1));
    const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));
    const goToStep = (step: number) => setCurrentStep(step);

    const isPersonalInfoValid = () => {
        const { fullName, gender, dateOfBirth, contactNumber, email } = formData.personalInfo;
        return Boolean(fullName && gender && dateOfBirth && contactNumber && email);
    };
    const isProfessionalInfoValid = () => {
        const { qualification, registrationNumber } = formData.professionalInfo;
        return Boolean(qualification && registrationNumber);
    };
    const isWorkDetailsValid = () => {
        const { joiningDate, dutyType, shift, assignedUnit } = formData.workDetails;
        return Boolean(joiningDate && dutyType && shift && assignedUnit);
    };

    const isStepValid = (step: number) => {
        if (step === 0) return isPersonalInfoValid();
        if (step === 1) return isProfessionalInfoValid();
        if (step === 2) return isWorkDetailsValid();
        return true;
    };

    const username = formData.personalInfo.fullName
        ? generateUsername(formData.personalInfo.fullName, existingCount)
        : "";

    return {
        currentStep,
        formData,
        username,
        password,
        updatePersonalInfo,
        updateProfessionalInfo,
        updateWorkDetails,
        goNext,
        goBack,
        goToStep,
        isStepValid,
    };
}