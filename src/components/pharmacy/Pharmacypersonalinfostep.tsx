import { User, MapPin, Phone as PhoneIcon } from "lucide-react";
import TextField from "@/components/receptionist/Textfield";
import SelectField from "@/components/receptionist/Selectfield";
import SegmentedChoice from "@/components/receptionist/Segmentedchoice";
import { PersonalInfo, Gender, GENDERS, INDIAN_STATES } from "./Pharmacystaff";
import { COLORS } from "@/constants/colors";

interface PersonalInfoStepProps {
    data: PersonalInfo;
    onChange: (patch: Partial<PersonalInfo>) => void;
}

function SectionHeader({ icon: Icon, children }: { icon: typeof User; children: React.ReactNode }) {
    return (
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.navy }}>
            <Icon size={16} style={{ color: COLORS.blue }} />
            {children}
        </h3>
    );
}

export default function PharmacyPersonalInfoStep({ data, onChange }: PersonalInfoStepProps) {
    return (
        <div className="flex flex-col gap-6">
            <section className="flex flex-col gap-4">
                <SectionHeader icon={User}>Personal Information</SectionHeader>
                <TextField
                    label="Full Name"
                    required
                    placeholder="e.g. Dr. Rajesh Kumar"
                    value={data.fullName}
                    onChange={(e) => onChange({ fullName: e.target.value })}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <SegmentedChoice
                        label="Gender"
                        required
                        options={GENDERS}
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
                        placeholder="staff@shriramhospital.com"
                        value={data.email}
                        onChange={(e) => onChange({ email: e.target.value })}
                    />
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <SectionHeader icon={MapPin}>Address Details</SectionHeader>
                <TextField
                    label="Street Address"
                    placeholder="House No, Street, Area"
                    value={data.streetAddress}
                    onChange={(e) => onChange({ streetAddress: e.target.value })}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <TextField
                        label="City"
                        placeholder="e.g. Mumbai"
                        value={data.city}
                        onChange={(e) => onChange({ city: e.target.value })}
                    />
                    <SelectField
                        label="State"
                        options={INDIAN_STATES}
                        value={data.state}
                        onChange={(e) => onChange({ state: e.target.value })}
                    />
                    <TextField
                        label="Pin Code"
                        placeholder="e.g. 400001"
                        value={data.pinCode}
                        onChange={(e) => onChange({ pinCode: e.target.value })}
                    />
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <SectionHeader icon={PhoneIcon}>Emergency Contact</SectionHeader>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextField
                        label="Emergency Contact Name"
                        placeholder="Name of relative/friend"
                        value={data.emergencyContactName}
                        onChange={(e) => onChange({ emergencyContactName: e.target.value })}
                    />
                    <TextField
                        label="Emergency Phone Number"
                        placeholder="Contact number"
                        value={data.emergencyPhoneNumber}
                        onChange={(e) => onChange({ emergencyPhoneNumber: e.target.value })}
                    />
                </div>
            </section>
        </div>
    );
}