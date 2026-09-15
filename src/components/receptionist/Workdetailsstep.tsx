import TextField from "./Textfield";
import SelectField from "./Selectfield";
import { WorkDetails, Shift, DESKS } from "./Receptionist";

const SHIFT_OPTIONS: Shift[] = ["Morning", "Afternoon", "Night"];

interface WorkDetailsStepProps {
    data: WorkDetails;
    onChange: (patch: Partial<WorkDetails>) => void;
}

export default function WorkDetailsStep({ data, onChange }: WorkDetailsStepProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SelectField
                    label="Assigned Desk"
                    required
                    hint="Which reception point this staff member covers."
                    options={DESKS}
                    value={data.assignedDesk}
                    onChange={(e) => onChange({ assignedDesk: e.target.value })}
                />
                <SelectField
                    label="Shift"
                    required
                    options={SHIFT_OPTIONS}
                    value={data.shift}
                    onChange={(e) => onChange({ shift: e.target.value as Shift })}
                />
                <TextField
                    label="Joining Date"
                    required
                    type="date"
                    value={data.joiningDate}
                    onChange={(e) => onChange({ joiningDate: e.target.value })}
                />
                <TextField
                    label="Emergency Contact"
                    placeholder="+91 88888 77777"
                    value={data.emergencyContact}
                    onChange={(e) => onChange({ emergencyContact: e.target.value })}
                />
            </div>
        </div>
    );
}