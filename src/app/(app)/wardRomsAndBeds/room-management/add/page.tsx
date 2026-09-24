import AddRoomForm from "@/components/wardRomsAndBeds/AddRoomForm";

interface AddRoomPageProps {
    searchParams: Promise<{ wardId?: string }>;
}

export default async function AddRoomPage({ searchParams }: AddRoomPageProps) {
    const { wardId } = await searchParams;

    return (
        <main className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
            <AddRoomForm defaultWardId={wardId} />
        </main>
    );
}
