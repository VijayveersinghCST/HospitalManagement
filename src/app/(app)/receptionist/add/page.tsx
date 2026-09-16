import AddReceptionistWizard from "@/components/receptionist/Addreceptionistwizard";

// This page is a server component. AddReceptionistWizard is a client component
// that owns its own submit handling internally (see the TODO inside it for
// wiring a real POST /api/receptionists call, e.g. via a server action).
export default function AddReceptionistPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <AddReceptionistWizard />
        </main>
    );
}