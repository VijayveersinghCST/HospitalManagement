import { notFound } from "next/navigation";
import EditReceptionistForm from "@/components/receptionist/Editreceptionistform";
import { getReceptionistById, MOCK_RECEPTIONISTS } from "@/components/receptionist/Mockreceptionist";

export function generateStaticParams() {
    return MOCK_RECEPTIONISTS.map((r) => ({ id: r.id }));
}

export default function EditReceptionistPage({ params }: { params: { id: string } }) {
    const receptionist = getReceptionistById(params.id);

    if (!receptionist) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <EditReceptionistForm receptionist={receptionist} />
        </main>
    );
}