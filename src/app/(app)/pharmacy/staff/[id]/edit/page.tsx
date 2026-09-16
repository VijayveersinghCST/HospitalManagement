import { notFound } from "next/navigation";
import EditPharmacyStaffForm from "@/components/pharmacy/Editpharmacystaffform";
import { getPharmacyStaffById, MOCK_PHARMACY_STAFF } from "@/components/pharmacy/Mockpharmacystaff";

export function generateStaticParams() {
    return MOCK_PHARMACY_STAFF.map((s) => ({ id: s.id }));
}

interface EditPharmacyStaffPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditPharmacyStaffPage({ params }: EditPharmacyStaffPageProps) {
    const { id } = await params;
    const staff = getPharmacyStaffById(id);

    if (!staff) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <EditPharmacyStaffForm staff={staff} />
        </main>
    );
}