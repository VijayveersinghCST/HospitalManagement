import TextField from "@/components/receptionist/Textfield";
import SelectField from "@/components/receptionist/Selectfield";
import SegmentedChoice from "@/components/receptionist/Segmentedchoice";
import { PersonalInfo, Gender, GENDERS, COUNTRIES } from "./Accountant";
import { COLORS } from "@/constants/colors";

interface PersonalInfoStepProps {
    data: PersonalInfo;
    onChange: (patch: Partial<PersonalInfo>) => void;
}

export default function AccountantPersonalInfoStep({ data, onChange }: PersonalInfoStepProps) {
    return (
        <div className="flex flex-col gap-6">
            <section className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold" style={{ color: COLORS.navy }}>
                    Basic Details
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextField
                        label="Full Name"
                        required
                        placeholder="e.g. John Doe"
                        value={data.fullName}
                        onChange={(e) => onChange({ fullName: e.target.value })}
                    />
                    <TextField
                        label="Date of Birth"
                        required
                        type="date"
                        value={data.dateOfBirth}
                        onChange={(e) => onChange({ dateOfBirth: e.target.value })}
                    />
                </div>
                <SegmentedChoice
                    label="Gender"
                    required
                    options={GENDERS}
                    value={data.gender}
                    onChange={(value) => onChange({ gender: value as Gender })}
                />
            </section>

            <section className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold" style={{ color: COLORS.navy }}>
                    Contact Information
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextField
                        label="Contact Number"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={data.contactNumber}
                        onChange={(e) => onChange({ contactNumber: e.target.value })}
                    />
                    <TextField
                        label="Email Address"
                        required
                        type="email"
                        placeholder="john.doe@hospital.com"
                        value={data.email}
                        onChange={(e) => onChange({ email: e.target.value })}
                    />
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold" style={{ color: COLORS.navy }}>
                    Address Details
                </h3>
                <TextField
                    label="Street Address"
                    placeholder="123 Hospital Lane"
                    value={data.streetAddress}
                    onChange={(e) => onChange({ streetAddress: e.target.value })}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextField
                        label="City"
                        placeholder="New York"
                        value={data.city}
                        onChange={(e) => onChange({ city: e.target.value })}
                    />
                    <TextField
                        label="State / Province"
                        placeholder="NY"
                        value={data.state}
                        onChange={(e) => onChange({ state: e.target.value })}
                    />
                    <SelectField
                        label="Country"
                        placeholder="Select Country"
                        options={COUNTRIES}
                        value={data.country}
                        onChange={(e) => onChange({ country: e.target.value })}
                    />
                    <TextField
                        label="Pin Code / Zip Code"
                        placeholder="10001"
                        value={data.pinCode}
                        onChange={(e) => onChange({ pinCode: e.target.value })}
                    />
                </div>
            </section>
        </div>
    );
}