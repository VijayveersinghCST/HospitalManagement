import WardWisePatientsCard from "./WardWisePatientsCard";
import BedAvailabilityCard from "./BedAvailabilityCard";
import StaffDutyStatusCard from "./StaffDutyStatusCard";

export default function BottomRow() {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <WardWisePatientsCard />
            <BedAvailabilityCard />
            <StaffDutyStatusCard />
        </div>
    );
}