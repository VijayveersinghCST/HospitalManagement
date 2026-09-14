import { Users } from "lucide-react";
import ComingSoon from "@/components/common/ComingSoon";

export default function AppUserManagementPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">User & Role Management</h1>
      <p className="mt-1.5 text-sm text-slate-500">
        Manage staff accounts, roles and permissions across the system.
      </p>

      <div className="mt-6">
        <ComingSoon
          title="User & Role Management is on its way"
          description="Create accounts, assign roles and control access here."
          icon={Users}
        />
      </div>
    </div>
  );
}
