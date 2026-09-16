import DepartmentsList from "@/components/hospital-config/Departmentslist";
import { MOCK_DEPARTMENTS } from "@/components/hospital-config/Mockhospitalconfig";

export default function DepartmentsPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <DepartmentsList departments={MOCK_DEPARTMENTS} />
        </main>
    );
}