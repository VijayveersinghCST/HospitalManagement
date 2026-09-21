import TextField from "@/components/receptionist/Textfield";
import SelectField from "@/components/receptionist/Selectfield";
import TagInput from "@/components/receptionist/Taginput";
import FileUpload from "@/components/pharmacy/Fileupload";
import { ProfessionalInfo, QUALIFICATIONS, SPECIALIZATION_SUGGESTIONS } from "./Accountant";
import { COLORS } from "@/constants/colors";

interface ProfessionalInfoStepProps {
    data: ProfessionalInfo;
    onChange: (patch: Partial<ProfessionalInfo>) => void;
}

export default function AccountantProfessionalInfoStep({ data, onChange }: ProfessionalInfoStepProps) {
    return (
        <div className="flex flex-col gap-5">
            <h3 className="text-sm font-semibold" style={{ color: COLORS.navy }}>
                Professional Details
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SelectField
                    label="Highest Qualification"
                    required
                    placeholder="Select qualification"
                    options={[...QUALIFICATIONS]}
                    value={data.highestQualification}
                    onChange={(e) => onChange({ highestQualification: e.target.value })}
                />
                <TextField
                    label="Total Experience (Years)"
                    required
                    type="number"
                    min={0}
                    placeholder="e.g. 5"
                    value={data.experienceYears}
                    onChange={(e) => onChange({ experienceYears: e.target.value })}
                />
            </div>

            <TagInput
                label="Specialization Areas"
                hint="Select areas like Auditing, Insurance Claims, Payroll, etc."
                values={data.specializationAreas}
                onChange={(specializationAreas) => onChange({ specializationAreas })}
                suggestions={SPECIALIZATION_SUGGESTIONS}
                placeholder="Select or type..."
            />

            <TextField
                label="Registration / Employee ID"
                placeholder="e.g. ACC-2024-001"
                value={data.registrationId}
                onChange={(e) => onChange({ registrationId: e.target.value })}
            />

            <FileUpload
                label="Credentials / Certificates"
                value={data.certificateFileName ? { name: data.certificateFileName } : null}
                onChange={(file) => onChange({ certificateFileName: file?.name ?? "" })}
            />
        </div>
    );
}