import { User, Mail } from "lucide-react";
import TextField from "./Textfield";
import SelectField from "./Selectfield";
import SegmentedChoice from "./Segmentedchoice";
import { PersonalInfo, Gender } from "./Receptionist";

const GENDER_OPTIONS: Gender[] = ["Male", "Female", "Other"];
const INDIAN_STATES = ["Delhi", "Uttar Pradesh", "Maharashtra", "Karnataka", "West Bengal", "Punjab"];

interface PersonalInfoStepProps {
    data: PersonalInfo;
    onChange: (patch: Partial<PersonalInfo>) => void;
}

export default function PersonalInfoStep({ data, onChange }: PersonalInfoStepProps) {
    return (
        <div className="flex flex-col gap-6">
            <section className="flex flex-col gap-4">
                <h3 className="border-l-2 border-brand-500 pl-2 text-sm font-semibold text-slate-800">
                    Basic Details
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextField
                        label="Full Name"
                        required
                        placeholder="e.g. Rahul Sharma"
                        icon={<User size={16} />}
                        value={data.fullName}
                        onChange={(e) => onChange({ fullName: e.target.value })}
                    />
                    <SegmentedChoice
                        label="Gender"
                        required
                        options={GENDER_OPTIONS}
                        value={data.gender}
                        onChange={(value) => onChange({ gender: value as Gender })}
                    />
                    <TextField
                        label="Date of Birth"
                        required
                        type="date"
                        value={data.dateOfBirth}
                        onChange={(e) => onChange({ dateOfBirth: e.target.value })}
                    />
                    <TextField
                        label="Contact Number"
                        required
                        placeholder="+91 98765 43210"
                        value={data.contactNumber}
                        onChange={(e) => onChange({ contactNumber: e.target.value })}
                    />
                    <TextField
                        label="Email Address"
                        required
                        type="email"
                        placeholder="receptionist@hospital.com"
                        icon={<Mail size={16} />}
                        className="sm:col-span-2"
                        value={data.email}
                        onChange={(e) => onChange({ email: e.target.value })}
                    />
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h3 className="border-l-2 border-brand-500 pl-2 text-sm font-semibold text-slate-800">
                    Address Details
                </h3>
                <div className="grid grid-cols-1 gap-4">
                    <TextField
                        label="Street Address"
                        required
                        placeholder="Apartment, Studio, or Floor"
                        value={data.streetAddress}
                        onChange={(e) => onChange({ streetAddress: e.target.value })}
                    />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <TextField
                            label="City"
                            required
                            placeholder="e.g. Mumbai"
                            value={data.city}
                            onChange={(e) => onChange({ city: e.target.value })}
                        />
                        <SelectField
                            label="State"
                            required
                            options={INDIAN_STATES}
                            value={data.state}
                            onChange={(e) => onChange({ state: e.target.value })}
                        />
                        <TextField
                            label="Pin Code"
                            required
                            placeholder="400001"
                            value={data.pinCode}
                            onChange={(e) => onChange({ pinCode: e.target.value })}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}