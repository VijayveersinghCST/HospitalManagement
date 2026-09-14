import { User } from "lucide-react";
import ComingSoon from "@/components/common/ComingSoon";

export default function AppPatientsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Patients</h1>
      <p className="mt-1.5 text-sm text-slate-500">
        Search, register and manage patient records.
      </p>

      <div className="mt-6">
        <ComingSoon
          title="Patients is on its way"
          description="A searchable directory of patient records will live here."
          icon={User}
        />
      </div>
    </div>
  );
}
