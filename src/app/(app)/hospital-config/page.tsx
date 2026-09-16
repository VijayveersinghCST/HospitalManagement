import HospitalConfigOverview from "@/components/hospital-config/Hospitalconfigoverview";
import { MOCK_CONFIG_STATS, MOCK_CONFIG_CHANGES } from "@/components/hospital-config/Mockhospitalconfig";

export default function HospitalConfigPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <HospitalConfigOverview stats={MOCK_CONFIG_STATS} changes={MOCK_CONFIG_CHANGES} />
        </main>
    );
}