// src/app/(app)/doctors/[id]/edit/page.tsx
import DoctorForm, { DoctorFormData } from "@/components/doctors/DoctorForm";

// Mock prefill data (Real API wiring hone par services se fetch hoga)
const MOCK_EXISTING_DOCTOR: Record<string, Partial<DoctorFormData>> = {
  "DOC-1024": {
    fullName: "Dr. Anjali Sharma",
    gender: "Female",
    dob: "1984-06-12",
    bloodGroup: "O+",
    phone: "+91 98765 43210",
    email: "anjali.sharma@hospital.com",
    address: "B-42 Gomti Nagar, Lucknow, UP",
    emergencyContact: "Alok Sharma (+91 98765 11111)",
    licenseNumber: "UP-MED-44912",
    qualification: "MBBS, MD (Cardiology)",
    department: "Cardiology",
    specialization: "Interventional Cardiology",
    experienceYears: "12",
    previousHospital: "Medanta Hospital",
    opdRoomNo: "OPD 104",
    consultationFee: "800",
    shift: "Morning",
    employmentType: "Full-Time",
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
};

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function AppDoctorEditPage({ params }: EditPageProps) {
  const resolvedParams = await params;
  const docId = resolvedParams.id;
  const doctorData = MOCK_EXISTING_DOCTOR[docId] || {
    fullName: "Dr. Doctor Name",
    licenseNumber: "MCI-XXXX",
    department: "General Medicine",
  };

  return <DoctorForm mode="edit" doctorId={docId} initialData={doctorData} />;
}