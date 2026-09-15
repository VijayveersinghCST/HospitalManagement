import { notFound } from "next/navigation";
import EditReceptionistForm from "@/components/receptionist/Editreceptionistform";
import { getReceptionistById, MOCK_RECEPTIONISTS } from "@/components/receptionist/Mockreceptionist";

export function generateStaticParams() {
    return MOCK_RECEPTIONISTS.map((r) => ({ id: r.id }));
}

interface EditReceptionistPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditReceptionistPage({ params }: EditReceptionistPageProps) {
    const { id } = await params;
    const receptionist = getReceptionistById(id);

    if (!receptionist) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <EditReceptionistForm receptionist={receptionist} />
        </main>
    );
}