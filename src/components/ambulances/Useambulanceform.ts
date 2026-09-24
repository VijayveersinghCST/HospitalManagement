import { useState } from "react";
import { AmbulanceFormData, emptyAmbulanceForm } from "./Ambulances";

export function useAmbulanceForm(initial: AmbulanceFormData = emptyAmbulanceForm) {
    const [formData, setFormData] = useState<AmbulanceFormData>(initial);

    const update = (patch: Partial<AmbulanceFormData>) => {
        setFormData((prev) => ({ ...prev, ...patch }));
    };

    const isFormValid = () => {
        const { vehicleNumber, ambulanceType, baseStation, driverName, driverContact, driverLicenseNumber } =
            formData;
        return Boolean(
            vehicleNumber && ambulanceType && baseStation && driverName && driverContact && driverLicenseNumber
        );
    };

    return { formData, update, isFormValid };
}