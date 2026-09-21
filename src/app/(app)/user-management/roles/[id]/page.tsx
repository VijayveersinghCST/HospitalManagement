import { notFound } from "next/navigation";
import RoleConfigForm from "@/components/user-roles/Roleconfigform";
import { getRoleById, MOCK_ROLES } from "@/components/user-roles/Mockuserroles";

export function generateStaticParams() {
    return MOCK_ROLES.map((r) => ({ id: r.id }));
}

interface RoleConfigPageProps {
    params: Promise<{ id: string }>;
}

export default async function RoleConfigPage({ params }: RoleConfigPageProps) {
    const { id } = await params;
    const role = getRoleById(id);

    if (!role) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <RoleConfigForm role={role} />
        </main>
    );
}