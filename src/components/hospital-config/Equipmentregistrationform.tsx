"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Stethoscope, Boxes, Save, BellRing, AlertTriangle } from "lucide-react";
import TextField from "@/components/receptionist/Textfield";
import SelectField from "@/components/receptionist/Selectfield";
import Button from "@/components/receptionist/Button";
import { COLORS } from "@/constants/colors";

const DEPARTMENT_OPTIONS = ["Cardiology", "Neurology", "Orthopedics", "Emergency", "ICU"];

export default function EquipmentRegistrationForm() {
    const router = useRouter();

    const [equipmentName, setEquipmentName] = useState("");
    const [model, setModel] = useState("");
    const [serialNo, setSerialNo] = useState("");
    const [department, setDepartment] = useState("");
    const [purchaseDate, setPurchaseDate] = useState("");
    const [maintenanceSchedule, setMaintenanceSchedule] = useState("");

    const [itemName, setItemName] = useState("");
    const [batchNo, setBatchNo] = useState("");
    const [quantity, setQuantity] = useState("");
    const [expiryDate, setExpiryDate] = useState("");

    const handleSave = () => {
        // TODO: replace with a real submission, e.g.
        // await fetch("/api/inventory", { method: "POST", body: JSON.stringify({ equipment: {...}, consumable: {...} }) })
        console.log("New equipment/consumable:", {
            equipment: { equipmentName, model, serialNo, department, purchaseDate, maintenanceSchedule },
            consumable: { itemName, batchNo, quantity, expiryDate },
        });
        router.push("/hospital-config/equipment");
    };

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            <div>
                <nav className="mb-2 flex items-center gap-1.5 text-xs" style={{ color: COLORS.gray }}>
                    <span>Dashboard</span>
                    <ChevronRight size={12} />
                    <span>Inventory</span>
                    <ChevronRight size={12} />
                    <span style={{ color: COLORS.navy }}>Equipment Registration</span>
                </nav>
                <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                    Medical Equipment &amp; Inventory Registration
                </h1>
                <p className="mt-1 text-sm" style={{ color: COLORS.gray }}>
                    Use this form to register new medical devices and consumable inventory items.
                </p>
            </div>

            <section className="rounded-card border border-slate-200 bg-white p-6">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.navy }}>
                    <Stethoscope size={16} style={{ color: COLORS.blue }} />
                    Add Equipment
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextField
                        label="Equipment Name"
                        placeholder="e.g. MRI Scanner, Ventilator"
                        value={equipmentName}
                        onChange={(e) => setEquipmentName(e.target.value)}
                    />
                    <TextField
                        label="Model"
                        placeholder="e.g. Siemens Magnetom"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    />
                    <TextField
                        label="Serial No."
                        required
                        hint="Unique & Mandatory"
                        placeholder="Enter unique serial number"
                        value={serialNo}
                        onChange={(e) => setSerialNo(e.target.value)}
                    />
                    <SelectField
                        label="Department"
                        placeholder="Select Department"
                        options={DEPARTMENT_OPTIONS}
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    />
                    <TextField
                        label="Purchase Date"
                        type="date"
                        value={purchaseDate}
                        onChange={(e) => setPurchaseDate(e.target.value)}
                    />
                    <TextField
                        label="Maintenance Schedule"
                        type="date"
                        value={maintenanceSchedule}
                        onChange={(e) => setMaintenanceSchedule(e.target.value)}
                    />
                </div>
                <div
                    className="mt-4 flex items-start gap-2 rounded-lg border px-3 py-2.5 text-xs"
                    style={{ backgroundColor: `${COLORS.blue}0d`, borderColor: `${COLORS.blue}33`, color: COLORS.blue }}
                >
                    <BellRing size={14} className="mt-0.5 shrink-0" />
                    System will automatically alert the maintenance department 7 days prior to the selected
                    maintenance schedule date.
                </div>
            </section>

            <section className="rounded-card border border-slate-200 bg-white p-6">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.navy }}>
                    <Boxes size={16} style={{ color: "#7C3AED" }} />
                    Add Consumables
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextField
                        label="Item Name"
                        placeholder="e.g. Syringes (5ml), Bandages"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                    <TextField
                        label="Batch No."
                        required
                        hint="Unique & Mandatory"
                        placeholder="Enter batch number"
                        value={batchNo}
                        onChange={(e) => setBatchNo(e.target.value)}
                    />
                    <TextField
                        label="Quantity"
                        type="number"
                        min={0}
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <TextField
                        label="Expiry Date"
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                    />
                </div>
                <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-700">
                    <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                    Ensure the Expiry Date is set later than the Purchase Date. The system will flag expiring
                    consumables on the dashboard.
                </div>
            </section>

            <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button onClick={handleSave} disabled={!serialNo && !batchNo}>
                    <Save size={16} /> Save Equipment/Consumable
                </Button>
            </div>
        </div>
    );
}