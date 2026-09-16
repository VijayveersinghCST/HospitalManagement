import ConfiguredAssetsSummary from "@/components/hospital-config/Configuredassestssummary";
import { MOCK_DEPARTMENTS, MOCK_WARDS, MOCK_INVENTORY } from "@/components/hospital-config/Mockhospitalconfig";

export default function ConfiguredAssetsPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <ConfiguredAssetsSummary departments={MOCK_DEPARTMENTS} wards={MOCK_WARDS} inventory={MOCK_INVENTORY} />
        </main>
    );
}