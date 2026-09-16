import EquipmentList from "@/components/hospital-config/Equipmentlist";
import { MOCK_INVENTORY } from "@/components/hospital-config/Mockhospitalconfig";

export default function EquipmentPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <EquipmentList items={MOCK_INVENTORY} />
        </main>
    );
}