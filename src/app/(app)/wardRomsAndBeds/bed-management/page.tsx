import BedManagementGrid from "@/components/wardRomsAndBeds/BedManagementGrid";
import { MOCK_BEDS, MOCK_ROOMS, MOCK_WARDS } from "@/components/wardRomsAndBeds/MockWardRoomsAndBeds";

interface BedManagementPageProps {
    searchParams: Promise<{ roomId?: string; wardId?: string }>;
}

export default async function BedManagementPage({ searchParams }: BedManagementPageProps) {
    const { roomId, wardId } = await searchParams;

    const activeRoom = roomId ? MOCK_ROOMS.find((r) => r.id === roomId) : undefined;
    const activeWard = activeRoom
        ? MOCK_WARDS.find((w) => w.id === activeRoom.wardId)
        : wardId
            ? MOCK_WARDS.find((w) => w.id === wardId)
            : undefined;

    const beds = activeRoom
        ? MOCK_BEDS.filter((b) => b.roomId === activeRoom.id)
        : activeWard
            ? MOCK_BEDS.filter((b) => b.wardId === activeWard.id)
            : MOCK_BEDS;

    return (
        <main className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
            <BedManagementGrid beds={beds} activeWard={activeWard} activeRoom={activeRoom} />
        </main>
    );
}
