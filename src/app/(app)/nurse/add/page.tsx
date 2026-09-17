// src/app/(app)/nurse/add/page.tsx
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Briefcase,
  CalendarClock,
  Check,
  Camera,
  Pencil,
  ArrowRight,
  ArrowLeft,
  Save,
} from "lucide-react";

interface NurseFormData {
  // Step 1: Personal Info
  fullName: string;
  gender: string;
  dob: string;
  contactNumber: string;
  email: string;
  emergencyContact: string;
  street: string;
  city: string;
  pinCode: string;
  state: string;
  country: string;

  // Step 2: Professional Info
  qualification: string;
  licenseNumber: string;
  department: string;
  ward: string;
  experienceYears: string;
  previousHospital: string;

  // Step 3: Work Details
  employmentType: string;
  shift: string;
  joiningDate: string;
  availableDays: string[];
  responsibilities: string;
}

const INITIAL_DATA: NurseFormData = {
  fullName: "",
  gender: "Female",
  dob: "",
  contactNumber: "",
  email: "",
  emergencyContact: "",
  street: "",
  city: "",
  pinCode: "",
  state: "",
  country: "India",
  qualification: "",
  licenseNumber: "",
  department: "",
  ward: "",
  experienceYears: "",
  previousHospital: "",
  employmentType: "Full Time",
  shift: "Morning",
  joiningDate: "",
  availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  responsibilities: "",
};

const STEPS = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Professional Info", icon: Briefcase },
  { id: 3, title: "Work Details", icon: CalendarClock },
];

const DEPARTMENTS = ["Emergency (ER)", "Pediatrics", "Orthopedics", "Neurology", "ICU", "General Medicine"];
const WARDS = ["Ward A - ICU", "Ward B - General", "Ward C - General", "Ward D - Maternity"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const inputClass =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10";
const labelClass = "block text-xs font-semibold uppercase tracking-wider text-slate-600";

export default function AddNursePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<NurseFormData>(INITIAL_DATA);

  const progress = Math.round((currentStep / STEPS.length) * 100);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const toggleDay = (day: string) => {
    setFormData((prev) => {
      const days = prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day];
      return { ...prev, availableDays: days };
    });
  };

  const handleNext = () => currentStep < 3 && setCurrentStep((s) => s + 1);
  const handleBack = () => currentStep > 1 && setCurrentStep((s) => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      handleNext();
      return;
    }
    // TODO: call nurseService.create(formData)
    console.log("Submitting Nurse Data:", formData);
    router.push("/nurse");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Add New Nurse
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Complete the form below to register a new nursing staff member.
        </p>
      </div>

      {/* Progress bar */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-green-600">
            Step {currentStep}: {STEPS[currentStep - 1].title}
          </span>
          <span className="font-semibold text-slate-500">{progress}% Completed</span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-green-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
          {/* STEP 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-base font-bold text-slate-900">Personal Information</h2>

              {/* Photo upload */}
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:gap-6">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400 transition hover:border-green-400 hover:text-green-500"
                  >
                    {photoPreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={photoPreview} alt="Nurse" className="h-full w-full object-cover" />
                    ) : (
                      <Camera className="h-7 w-7" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white shadow-md ring-2 ring-white hover:bg-green-700"
                    aria-label="Upload photo"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </div>
                <p className="text-center text-sm font-semibold text-green-600 sm:mt-9 sm:text-left">
                  Upload Photo
                </p>

                <div className="grid w-full flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Jenkins"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Gender *</label>
                    <div className="mt-2 flex flex-wrap items-center gap-4">
                      {["Female", "Male", "Other"].map((g) => (
                        <label key={g} className="flex items-center gap-1.5 text-sm text-slate-700">
                          <input
                            type="radio"
                            name="gender"
                            value={g}
                            checked={formData.gender === g}
                            onChange={handleChange}
                            className="h-4 w-4 accent-green-600"
                          />
                          {g}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Date of Birth *</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h2 className="text-base font-bold text-slate-900">Contact Details</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Contact Number *</label>
                    <div className="mt-1.5 flex">
                      <span className="flex items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 px-3 text-sm text-slate-500">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="98765 43210"
                        required
                        className="w-full rounded-r-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nurse@shriramhospital.com"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>Emergency Contact (Name &amp; Number)</label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      placeholder="e.g. John Doe - +91 98765 00000"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h2 className="text-base font-bold text-slate-900">Residential Address</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Street Address</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      placeholder="Flat No, Building Name, Street"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. New Delhi"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Pin Code</label>
                    <input
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleChange}
                      placeholder="e.g. 110001"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>State</label>
                    <select name="state" value={formData.state} onChange={handleChange} className={inputClass}>
                      <option value="">Select State</option>
                      <option>Uttar Pradesh</option>
                      <option>Delhi</option>
                      <option>Maharashtra</option>
                      <option>Karnataka</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Country</label>
                    <select name="country" value={formData.country} onChange={handleChange} className={inputClass}>
                      <option>India</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Professional Info */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-base font-bold text-slate-900">Professional Information</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Qualification *</label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="e.g. B.Sc Nursing"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Nursing License No. *</label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    placeholder="e.g. RN-2023-8892"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Department *</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Assigned Ward *</label>
                  <select name="ward" value={formData.ward} onChange={handleChange} required className={inputClass}>
                    <option value="">Select Ward</option>
                    {WARDS.map((w) => (
                      <option key={w}>{w}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Experience (Years)</label>
                  <input
                    type="number"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Previous Hospital/Employer</label>
                  <input
                    type="text"
                    name="previousHospital"
                    value={formData.previousHospital}
                    onChange={handleChange}
                    placeholder="e.g. Apollo Hospital"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Work Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-base font-bold text-slate-900">Work Details</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Employment Type</label>
                  <div className="mt-2 flex gap-4">
                    {["Full Time", "Contract"].map((t) => (
                      <label key={t} className="flex items-center gap-1.5 text-sm text-slate-700">
                        <input
                          type="radio"
                          name="employmentType"
                          value={t}
                          checked={formData.employmentType === t}
                          onChange={handleChange}
                          className="h-4 w-4 accent-green-600"
                        />
                        {t}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Shift</label>
                  <select name="shift" value={formData.shift} onChange={handleChange} className={inputClass}>
                    <option>Morning</option>
                    <option>Evening</option>
                    <option>Night</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Joining Date</label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Available Days</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {DAYS.map((day) => {
                    const active = formData.availableDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition ${active
                            ? "border-green-600 bg-green-600 text-white"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                          }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className={labelClass}>Key Responsibilities</label>
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g. Head nurse for shift A, medication inventory..."
                  className={inputClass}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer buttons */}
        <div className="flex items-center justify-between">
          {currentStep === 1 ? (
            <Link
              href="/nurse"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-green-600/20 transition hover:bg-green-700 active:scale-[0.99]"
          >
            {currentStep < 3 ? (
              <>
                Next: {STEPS[currentStep].title}
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Add Nurse
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}