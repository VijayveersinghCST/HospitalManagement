import WardManagementGrid from "@/components/wardRomsAndBeds/WardManagementGrid";
import { MOCK_WARDS } from "@/components/wardRomsAndBeds/MockWardRoomsAndBeds";

export default function WardManagementPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
            <WardManagementGrid wards={MOCK_WARDS} />
        </main>
    );
}
