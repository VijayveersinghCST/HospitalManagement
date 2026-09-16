// app/(app)/hospital-config/wards/all/page.tsx
import WardsAndRoomsList from "@/components/hospital-config/Wardsandroomslist";
import { MOCK_WARDS } from "@/components/hospital-config/Mockhospitalconfig";

export default function WardsAllPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <WardsAndRoomsList wards={MOCK_WARDS} />
        </main>
    );
}