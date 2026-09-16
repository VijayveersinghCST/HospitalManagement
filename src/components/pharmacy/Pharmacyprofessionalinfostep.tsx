import { GraduationCap } from "lucide-react";
import TextField from "@/components/receptionist/Textfield";
import SelectField from "@/components/receptionist/Selectfield";
import FileUpload from "./Fileupload";
import { ProfessionalInfo, QUALIFICATIONS } from "./Pharmacystaff";
import { COLORS } from "@/constants/colors";

interface ProfessionalInfoStepProps {
    data: ProfessionalInfo;
    onChange: (patch: Partial<ProfessionalInfo>) => void;
}

export default function PharmacyProfessionalInfoStep({ data, onChange }: ProfessionalInfoStepProps) {
    return (
        <div className="flex flex-col gap-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.navy }}>
                <GraduationCap size={16} style={{ color: COLORS.blue }} />
                Professional Credentials
            </h3>
            <SelectField
                label="Qualification"
                required
                placeholder="Select highest qualification"
                options={QUALIFICATIONS}
                value={data.qualification}
                onChange={(e) => onChange({ qualification: e.target.value })}
            />
            <TextField
                label="Experience (Years)"
                type="number"
                min={0}
                placeholder="e.g. 5"
                hint="Total years of practice in a pharmacy or medical store."
                value={data.experienceYears}
                onChange={(e) => onChange({ experienceYears: e.target.value })}
            />
            <TextField
                label="Registration Number"
                required
                placeholder="Enter Pharmacy Council ID"
                value={data.registrationNumber}
                onChange={(e) => onChange({ registrationNumber: e.target.value })}
            />
            <FileUpload
                label="License / Certificate Upload"
                value={data.licenseFileName ? { name: data.licenseFileName } : null}
                onChange={(file) => onChange({ licenseFileName: file?.name ?? "" })}
            />
        </div>
    );
}