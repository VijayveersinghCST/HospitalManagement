import RoomManagementGrid from "@/components/wardRomsAndBeds/RoomManagementGrid";
import { MOCK_ROOMS, MOCK_WARDS } from "@/components/wardRomsAndBeds/MockWardRoomsAndBeds";

interface RoomManagementPageProps {
    searchParams: Promise<{ wardId?: string }>;
}

export default async function RoomManagementPage({ searchParams }: RoomManagementPageProps) {
    const { wardId } = await searchParams;
    const activeWard = wardId ? MOCK_WARDS.find((w) => w.id === wardId) : undefined;
    const rooms = activeWard ? MOCK_ROOMS.filter((r) => r.wardId === activeWard.id) : MOCK_ROOMS;

    return (
        <main className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
            <RoomManagementGrid rooms={rooms} activeWard={activeWard} />
        </main>
    );
}
