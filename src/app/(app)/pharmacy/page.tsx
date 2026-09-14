import { Pill } from "lucide-react";
import ComingSoon from "@/components/common/ComingSoon";

export default function AppPharmacyPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Pharmacy</h1>
      <p className="mt-1.5 text-sm text-slate-500">
        Track stock, billing and vendor orders for the pharmacy.
      </p>

      <div className="mt-6">
        <ComingSoon
          title="Pharmacy is on its way"
          description="Stock levels, billing and purchase orders will show up here."
          icon={Pill}
        />
      </div>
    </div>
  );
}
