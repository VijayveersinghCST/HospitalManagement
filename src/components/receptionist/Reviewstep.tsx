import { Pencil } from "lucide-react";
import { ReceptionistFormData } from "./Receptionist";
import { KEY_SKILLS } from "./Receptionist";

interface ReviewStepProps {
    data: ReceptionistFormData;
    onEditStep: (step: number) => void;
}

function ReviewRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-xs text-slate-400">{label}</span>
            <span className="text-sm font-medium text-slate-800">{value || "—"}</span>
        </div>
    );
}

function ReviewSection({
                           title,
                           onEdit,
                           children,
                       }: {
    title: string;
    onEdit: () => void;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-lg border border-slate-200 p-4">
            <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
                <button
                    type="button"
                    onClick={onEdit}
                    className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
                >
                    <Pencil size={12} /> Edit
                </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>
        </div>
    );
}

export default function ReviewStep({ data, onEditStep }: ReviewStepProps) {
    const { personalInfo, professionalInfo, workDetails } = data;
    const skillLabels = professionalInfo.keySkills
        .map((id) => KEY_SKILLS.find((s) => s.id === id)?.label)
        .filter(Boolean)
        .join(", ");

    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm text-slate-500">
                Review the details below before submitting. Click Edit on any section to make changes.
            </p>

            <ReviewSection title="Personal Info" onEdit={() => onEditStep(0)}>
                <ReviewRow label="Full Name" value={personalInfo.fullName} />
                <ReviewRow label="Gender" value={personalInfo.gender} />
                <ReviewRow label="Date of Birth" value={personalInfo.dateOfBirth} />
                <ReviewRow label="Contact Number" value={personalInfo.contactNumber} />
                <ReviewRow label="Email Address" value={personalInfo.email} />
                <ReviewRow
                    label="Address"
                    value={[personalInfo.streetAddress, personalInfo.city, personalInfo.state, personalInfo.pinCode]
                        .filter(Boolean)
                        .join(", ")}
                />
            </ReviewSection>

            <ReviewSection title="Professional Info" onEdit={() => onEditStep(1)}>
                <ReviewRow label="Department" value={professionalInfo.department} />
                <ReviewRow label="Qualification" value={professionalInfo.qualification} />
                <ReviewRow label="Total Experience" value={`${professionalInfo.totalExperienceYears || "0"} years`} />
                <ReviewRow label="Languages" value={professionalInfo.languages.join(", ")} />
                <ReviewRow label="Key Skills" value={skillLabels} />
            </ReviewSection>

            <ReviewSection title="Work Details" onEdit={() => onEditStep(2)}>
                <ReviewRow label="Assigned Desk" value={workDetails.assignedDesk} />
                <ReviewRow label="Shift" value={workDetails.shift} />
                <ReviewRow label="Joining Date" value={workDetails.joiningDate} />
                <ReviewRow label="Emergency Contact" value={workDetails.emergencyContact} />
            </ReviewSection>
        </div>
    );
}