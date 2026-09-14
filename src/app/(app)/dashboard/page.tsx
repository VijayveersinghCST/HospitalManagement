import { LayoutGrid } from "lucide-react";
import ComingSoon from "@/components/common/ComingSoon";

export default function AppDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Dashboard</h1>
      <p className="mt-1.5 text-sm text-slate-500">
        A birds-eye view of hospital activity across all departments.
      </p>

      <div className="mt-6">
        <ComingSoon
          title="Dashboard is on its way"
          description="Key stats, alerts and activity across the hospital will show up here."
          icon={LayoutGrid}
        />
      </div>
    </div>
  );
}
