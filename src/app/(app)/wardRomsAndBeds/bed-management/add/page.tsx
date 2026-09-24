import AddBedForm from "@/components/wardRomsAndBeds/AddBedForm";

interface AddBedPageProps {
    searchParams: Promise<{ roomId?: string }>;
}

export default async function AddBedPage({ searchParams }: AddBedPageProps) {
    const { roomId } = await searchParams;

    return (
        <main className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
            <AddBedForm defaultRoomId={roomId} />
        </main>
    );
}
