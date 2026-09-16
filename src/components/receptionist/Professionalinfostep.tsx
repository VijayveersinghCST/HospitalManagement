import SelectField from "./Selectfield";
import TextField from "./Textfield";
import TagInput from "./Taginput";
import CheckboxCardGrid from "./Checkboxcardgrid";
import {
    ProfessionalInfo,
    DEPARTMENTS,
    QUALIFICATIONS,
    LANGUAGE_OPTIONS,
    KEY_SKILLS,
} from "./Receptionist";

interface ProfessionalInfoStepProps {
    data: ProfessionalInfo;
    onChange: (patch: Partial<ProfessionalInfo>) => void;
}

export default function ProfessionalInfoStep({ data, onChange }: ProfessionalInfoStepProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SelectField
                    label="Department"
                    required
                    hint="Assign the primary working area."
                    options={DEPARTMENTS}
                    value={data.department}
                    onChange={(e) => onChange({ department: e.target.value })}
                />
                <SelectField
                    label="Qualification"
                    required
                    options={QUALIFICATIONS}
                    value={data.qualification}
                    onChange={(e) => onChange({ qualification: e.target.value })}
                />
            </div>

            <TextField
                label="Total Experience (Years)"
                type="number"
                min={0}
                step={0.5}
                placeholder="e.g. 2.5"
                hint="Relevant past experience in hospitality or healthcare."
                value={data.totalExperienceYears}
                onChange={(e) => onChange({ totalExperienceYears: e.target.value })}
            />

            <TagInput
                label="Language Proficiency"
                required
                hint="Select all languages the candidate speaks fluently."
                values={data.languages}
                onChange={(languages) => onChange({ languages })}
                suggestions={LANGUAGE_OPTIONS}
                placeholder="Type to add language..."
            />

            <CheckboxCardGrid
                label="Key Skills"
                options={KEY_SKILLS}
                selectedIds={data.keySkills}
                onChange={(keySkills) => onChange({ keySkills })}
            />
        </div>
    );
}