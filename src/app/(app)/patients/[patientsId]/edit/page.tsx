// src/app/(app)/patients/[id]/edit/page.tsx
import PatientForm, { PatientFormData } from "@/components/patients/PatientForm";

const MOCK_PATIENTS: Record<string, Partial<PatientFormData>> = {
    "PT-2024-892": {
        fullName: "Sarah Jenkins",
        age: "38",
        gender: "Female",
        phone: "+91 98765 43210",
        email: "sarah.j@example.com",
        streetAddress: "Flat 401, Tower B, Gomti Nagar",
        city: "Lucknow",
        state: "Uttar Pradesh",
        bloodGroup: "O+",
        allergies: "Penicillin",
        medicalHistory: "Mild Hypertension since 2021",
        insuranceProvider: "Star Health Insurance",
        policyNumber: "POL-7729104",
        coverageType: "Comprehensive Mediclaim",
        assignedWard: "Gen. Ward A-12",
        assignedRoom: "Room 102",
        assignedBed: "Bed 04",
    },
};

interface EditPatientProps {
    params: Promise<{ id: string }>;
}

export default async function PatientEditPage({ params }: EditPatientProps) {
    const { id } = await params;
    const patientData = MOCK_PATIENTS[id] || {
        fullName: "Patient " + id,
        age: "30",
        gender: "Male",
    };

    return <PatientForm mode="edit" patientId={id} initialData={patientData} />;
}