import { useState } from "react";
import {
    AppointmentFormData,
    emptyAppointmentForm,
    DOCTORS_BY_DEPARTMENT,
} from "./Appointments";

export function useAppointmentForm(initial: AppointmentFormData = emptyAppointmentForm) {
    const [formData, setFormData] = useState<AppointmentFormData>(initial);

    const update = (patch: Partial<AppointmentFormData>) => {
        setFormData((prev) => {
            const next = { ...prev, ...patch };
            // Reset the doctor when the department changes, since the previously
            // selected doctor may not belong to the new department.
            if (patch.department && patch.department !== prev.department) {
                next.doctorName = "";
            }
            return next;
        });
    };

    const availableDoctors = formData.department ? DOCTORS_BY_DEPARTMENT[formData.department] ?? [] : [];

    const isPatientInfoValid = () => {
        const { patientType, patientName, contactNumber, age, gender, patientId } = formData;
        const baseValid = Boolean(patientName && contactNumber && age && gender);
        if (patientType === "Existing Patient") {
            return baseValid && Boolean(patientId);
        }
        return baseValid;
    };

    const isSchedulingValid = () => {
        const { department, doctorName, appointmentDate, appointmentTime, appointmentType, reasonForVisit } =
            formData;
        return Boolean(
            department && doctorName && appointmentDate && appointmentTime && appointmentType && reasonForVisit
        );
    };

    const isFormValid = () => isPatientInfoValid() && isSchedulingValid();

    return {
        formData,
        update,
        availableDoctors,
        isPatientInfoValid,
        isSchedulingValid,
        isFormValid,
    };
}