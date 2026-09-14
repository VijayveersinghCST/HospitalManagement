import { UserPlus } from "lucide-react";
import ComingSoon from "@/components/common/ComingSoon";

export default function AppDoctorsAddPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Add New Doctor</h1>
      <p className="mt-1.5 text-sm text-slate-500">
        Onboard a new doctor and assign their department.
      </p>

      <div className="mt-6">
        <ComingSoon
          title="The doctor onboarding form is on its way"
          description="You'll be able to add a doctor's profile, department and shift details here."
          icon={UserPlus}
        />
      </div>
    </div>
  );
}
