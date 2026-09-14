import { ShieldCheck } from "lucide-react";
import ComingSoon from "@/components/common/ComingSoon";

export default function AppDoctorsRolesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Role & Permissions</h1>
      <p className="mt-1.5 text-sm text-slate-500">
        Define what each doctor role can see and do.
      </p>

      <div className="mt-6">
        <ComingSoon
          title="Role & Permissions is on its way"
          description="Configure role-based access for doctors here."
          icon={ShieldCheck}
        />
      </div>
    </div>
  );
}
