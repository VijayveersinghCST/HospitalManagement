import { notFound } from "next/navigation";
import Editambulanceform from "@/components/ambulances/Editambulanceform";
import { getAmbulanceById, MOCK_AMBULANCES } from "@/components/ambulances/Mockambulances";

export function generateStaticParams() {
    return MOCK_AMBULANCES.map((a) => ({ id: a.id }));
}

export default async function EditAmbulancePage({
                                                    params,
                                                }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const ambulance = getAmbulanceById(id);

    if (!ambulance) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <Editambulanceform ambulance={ambulance} />
        </main>
    );
}