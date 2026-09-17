// src/app/(app)/staff-management/[id]/edit/page.tsx
import StaffForm, { StaffFormData } from "@/components/staff/StaffForm";

const MOCK_STAFF_DATA: Record<string, Partial<StaffFormData>> = {
    "EMP-2024-042": {
        fullName: "Dr. Anjali Desai",
        gender: "Female",
        dob: "1985-08-15",
        contactNumber: "+91 98765 43210",
        email: "anjali.desai@shriramhospital.com",
        emergencyContact: "+91 98765 43211 (Spouse)",
        address: "Flat 402, Sunshine Apartments, Civil Lines, New Delhi - 110054",
        roleDepartment: "Senior Resident",
        qualification: "MBBS, MD (General Medicine)",
        experienceYears: "6",
        joiningDate: "2018-07-01",
        dutyType: "Full-time",
        assignedShift: "Morning (08:00 AM - 04:00 PM)",
    },
};

interface EditStaffProps {
    params: Promise<{ id: string }>;
}

export default async function EditStaffPage({ params }: EditStaffProps) {
    const { id } = await params;
    const staffData = MOCK_STAFF_DATA[id] || {
        fullName: "Staff Member",
        dutyType: "Full-time",
    };

    return <StaffForm mode="edit" staffId={id} initialData={staffData} />;
}