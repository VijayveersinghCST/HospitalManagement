import { notFound } from "next/navigation";
import EditAccountantForm from "@/components/accountant/Editaccountantform";
import { getAccountantById, MOCK_ACCOUNTANTS } from "@/components/accountant/Mockaccountant";

export function generateStaticParams() {
    return MOCK_ACCOUNTANTS.map((a) => ({ id: a.id }));
}

interface EditAccountantPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditAccountantPage({ params }: EditAccountantPageProps) {
    const { id } = await params;
    const accountant = getAccountantById(id);

    if (!accountant) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <EditAccountantForm accountant={accountant} />
        </main>
    );
}