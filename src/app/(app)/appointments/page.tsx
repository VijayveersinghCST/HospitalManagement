import { CalendarDays } from "lucide-react";
import ComingSoon from "@/components/common/ComingSoon";

export default function AppAppointmentsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Appointments</h1>
      <p className="mt-1.5 text-sm text-slate-500">
        Schedule and track appointments across departments.
      </p>

      <div className="mt-6">
        <ComingSoon
          title="Appointments is on its way"
          description="Booking, rescheduling and calendar views will show up here."
          icon={CalendarDays}
        />
      </div>
    </div>
  );
}
