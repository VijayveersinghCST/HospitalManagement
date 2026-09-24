"use client";

import { useMemo, useState } from "react";
import {
    Store as StoreIcon,
    Package,
    AlertTriangle,
    ArrowLeftRight,
    ArrowDownToLine,
    ArrowUpFromLine,
    Plus,
    Search,
    Snowflake,
    MapPin,
    X,
    ChevronRight,
    Receipt,
    Undo2,
    Check,
    Ban,
    Eye,
    Printer,
    Repeat,
    XCircle,
    Archive,
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/* Types                                                                  */
/* ---------------------------------------------------------------------- */

type StoreType =
    | "Retail Pharmacy"
    | "Central Warehouse"
    | "Cold Storage"
    | "Hospital Pharmacy"
    | "Emergency Store";

interface PharmacyStore {
    id: string;
    name: string;
    code: string;
    type: StoreType;
    location: string;
    status: "Active" | "Inactive";
}

type ItemCategory = "Tablet" | "Syrup" | "Injection" | "Surgical" | "Ointment" | "Equipment" | "Other";
type ItemUnit = "PCS" | "BOX" | "STRIP" | "BOTTLE" | "VIAL";

interface PharmacyItem {
    id: string;
    name: string;
    code: string;
    category: ItemCategory;
    unit: ItemUnit;
    unitPrice: number;
    minLevel: number;
    requiresColdStorage?: boolean;
}

interface StockLevel {
    storeId: string;
    itemId: string;
    quantity: number;
}

type MovementType = "IN" | "OUT" | "TRANSFER";

interface Transaction {
    id: string;
    date: string;
    itemId: string;
    type: MovementType;
    quantity: number;
    fromStoreId?: string;
    toStoreId?: string;
    note?: string;
}

type BillType = "Purchase" | "Sale";

/**
 * Paid / Pending / Overdue — normal lifecycle, set at creation.
 * Partially Returned — at least one line has been partly reversed (via an
 *   approved Return or a direct Cancel Bill action), but some quantity
 *   still stands.
 * Cancelled — every unit on every line has been reversed, either through
 *   accumulated approved Returns, a direct full Cancel Bill action, or a
 *   mix of both. This status is always derived, never set by hand.
 */
type BillStatus = "Paid" | "Pending" | "Overdue" | "Partially Returned" | "Cancelled";

interface BillLine {
    itemId: string;
    qty: number;
    price: number;
}

/** One cancellation event against a bill — may cover some or all lines. */
interface BillCancellation {
    id: string;
    date: string;
    reason: string;
    lines: { itemId: string; qty: number }[];
}

interface Bill {
    id: string;
    billNo: string;
    storeId: string;
    type: BillType;
    date: string;
    lines: BillLine[];
    status: BillStatus;
    cancellations?: BillCancellation[];
}

type ReturnStatus = "Pending" | "Approved" | "Rejected";

interface ReturnRecord {
    id: string;
    returnNo: string;
    billId?: string;
    storeId: string;
    itemId: string;
    qty: number;
    reason: string;
    refundAmount: number;
    status: ReturnStatus;
    date: string;
}

type ReplacementStatus = "Pending" | "Approved" | "Rejected";

interface ReplacementRecord {
    id: string;
    replacementNo: string;
    billId?: string;
    storeId: string;
    oldItemId: string;
    newItemId: string;
    qty: number;
    reason: string;
    status: ReplacementStatus;
    date: string;
}

type Tab = "overview" | "stores" | "items" | "transfers" | "bills" | "returns" | "replacements" | "cancelled";

/* ---------------------------------------------------------------------- */
/* Helpers                                                                */
/* ---------------------------------------------------------------------- */

const genId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const formatCurrency = (v: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(v);

const formatDateTime = (iso: string) =>
    new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

const stockStatus = (qty: number, minLevel: number): "OK" | "LOW" | "CRITICAL" => {
    if (qty <= 0) return "CRITICAL";
    if (qty < minLevel) return "LOW";
    return "OK";
};

const billTotal = (lines: BillLine[]) => lines.reduce((sum, l) => sum + l.qty * l.price, 0);

/**
 * Derives a bill's status from what remains on each line after every
 * approved Return and every Cancellation event is netted out.
 *   - No line has been touched            -> keep the bill's current status
 *   - Every line's quantity is fully gone -> "Cancelled"
 *   - Some, but not all, quantity is gone -> "Partially Returned"
 * Once a bill is "Cancelled" it stays that way.
 */
const computeBillStatus = (bill: Bill, returnsList: ReturnRecord[]): BillStatus => {
    if (bill.status === "Cancelled") return "Cancelled";

    let anyReversed = false;
    let allFullyReversed = true;

    for (const line of bill.lines) {
        const returnedQty = returnsList
            .filter((r) => r.billId === bill.id && r.itemId === line.itemId && r.status === "Approved")
            .reduce((s, r) => s + r.qty, 0);
        const cancelledQty = (bill.cancellations ?? [])
            .flatMap((c) => c.lines)
            .filter((l) => l.itemId === line.itemId)
            .reduce((s, l) => s + l.qty, 0);
        const reversed = returnedQty + cancelledQty;

        if (reversed > 0) anyReversed = true;
        if (reversed < line.qty) allFullyReversed = false;
    }

    if (allFullyReversed && anyReversed) return "Cancelled";
    if (anyReversed) return "Partially Returned";
    return bill.status;
};

const STORE_TYPES: StoreType[] = [
    "Retail Pharmacy",
    "Central Warehouse",
    "Cold Storage",
    "Hospital Pharmacy",
    "Emergency Store",
];
const CATEGORIES: ItemCategory[] = ["Tablet", "Syrup", "Injection", "Surgical", "Ointment", "Equipment", "Other"];
const UNITS: ItemUnit[] = ["PCS", "BOX", "STRIP", "BOTTLE", "VIAL"];

const typeColors: Record<StoreType, string> = {
    "Retail Pharmacy": "bg-blue-50 text-blue-700",
    "Central Warehouse": "bg-purple-50 text-purple-700",
    "Cold Storage": "bg-cyan-50 text-cyan-700",
    "Hospital Pharmacy": "bg-pink-50 text-pink-700",
    "Emergency Store": "bg-red-50 text-red-700",
};

const billStatusColors: Record<BillStatus, string> = {
    Paid: "bg-green-50 text-green-700",
    Pending: "bg-orange-50 text-orange-700",
    Overdue: "bg-red-50 text-red-700",
    "Partially Returned": "bg-amber-50 text-amber-700",
    Cancelled: "bg-slate-100 text-slate-500",
};

const returnStatusColors: Record<ReturnStatus, string> = {
    Approved: "bg-green-50 text-green-700",
    Pending: "bg-orange-50 text-orange-700",
    Rejected: "bg-red-50 text-red-700",
};

const replacementStatusColors: Record<ReplacementStatus, string> = {
    Approved: "bg-green-50 text-green-700",
    Pending: "bg-orange-50 text-orange-700",
    Rejected: "bg-red-50 text-red-700",
};

/* ---------------------------------------------------------------------- */
/* Seed data                                                              */
/* ---------------------------------------------------------------------- */

const seedStores: PharmacyStore[] = [
    { id: "st-001", name: "Main Retail Pharmacy", code: "RTL-01", type: "Retail Pharmacy", location: "Ground Floor, OPD Block", status: "Active" },
    { id: "st-002", name: "Central Warehouse", code: "WH-01", type: "Central Warehouse", location: "Sector 12 Depot", status: "Active" },
    { id: "st-003", name: "Cold Chain Store", code: "CLD-01", type: "Cold Storage", location: "Block C, Basement", status: "Active" },
];

const seedItems: PharmacyItem[] = [
    { id: "it-001", name: "Paracetamol 500mg", code: "ITM-001", category: "Tablet", unit: "STRIP", unitPrice: 15, minLevel: 50 },
    { id: "it-002", name: "Amoxicillin Syrup", code: "ITM-002", category: "Syrup", unit: "BOTTLE", unitPrice: 65, minLevel: 20 },
    { id: "it-003", name: "Insulin Injection", code: "ITM-003", category: "Injection", unit: "VIAL", unitPrice: 320, minLevel: 15, requiresColdStorage: true },
    { id: "it-004", name: "Surgical Gloves (Box)", code: "ITM-004", category: "Surgical", unit: "BOX", unitPrice: 220, minLevel: 10 },
];

const seedStock: StockLevel[] = [
    { storeId: "st-001", itemId: "it-001", quantity: 180 },
    { storeId: "st-001", itemId: "it-002", quantity: 40 },
    { storeId: "st-001", itemId: "it-004", quantity: 8 },
    { storeId: "st-002", itemId: "it-001", quantity: 500 },
    { storeId: "st-002", itemId: "it-002", quantity: 120 },
    { storeId: "st-002", itemId: "it-004", quantity: 60 },
    { storeId: "st-003", itemId: "it-003", quantity: 45 },
];

const seedTransactions: Transaction[] = [
    { id: "tx-001", date: "2026-09-20T11:30:00.000Z", itemId: "it-001", type: "IN", quantity: 200, toStoreId: "st-002", note: "Initial procurement" },
    { id: "tx-002", date: "2026-09-21T14:05:00.000Z", itemId: "it-001", type: "TRANSFER", quantity: 100, fromStoreId: "st-002", toStoreId: "st-001", note: "Replenish retail counter" },
    { id: "tx-003", date: "2026-09-22T09:15:00.000Z", itemId: "it-004", type: "OUT", quantity: 2, fromStoreId: "st-001", note: "Dispensed to ward" },
];

const seedBills: Bill[] = [
    { id: "bl-001", billNo: "PB-2026-001", storeId: "st-002", type: "Purchase", date: "2026-09-20T11:30:00.000Z", lines: [{ itemId: "it-001", qty: 200, price: 15 }], status: "Paid" },
    {
        id: "bl-002",
        billNo: "SB-2026-014",
        storeId: "st-001",
        type: "Sale",
        date: "2026-09-22T09:15:00.000Z",
        lines: [
            { itemId: "it-004", qty: 2, price: 220 },
            { itemId: "it-001", qty: 3, price: 15 },
            { itemId: "it-002", qty: 1, price: 65 },
        ],
        status: "Paid",
    },
    { id: "bl-003", billNo: "PB-2026-002", storeId: "st-003", type: "Purchase", date: "2026-09-19T10:00:00.000Z", lines: [{ itemId: "it-003", qty: 45, price: 320 }], status: "Pending" },
];

const seedReturns: ReturnRecord[] = [
    { id: "rt-001", returnNo: "RT-2026-001", billId: "bl-002", storeId: "st-001", itemId: "it-004", qty: 1, reason: "Damaged packaging", refundAmount: 220, status: "Approved", date: "2026-09-22T15:00:00.000Z" },
    { id: "rt-002", returnNo: "RT-2026-002", storeId: "st-001", itemId: "it-002", qty: 5, reason: "Expired batch received", refundAmount: 325, status: "Pending", date: "2026-09-23T08:20:00.000Z" },
];

const seedReplacements: ReplacementRecord[] = [
    { id: "rp-001", replacementNo: "RP-2026-001", billId: "bl-002", storeId: "st-001", oldItemId: "it-004", newItemId: "it-004", qty: 1, reason: "Wrong size box supplied", status: "Pending", date: "2026-09-23T09:10:00.000Z" },
];

/* ---------------------------------------------------------------------- */
/* Page                                                                   */
/* ---------------------------------------------------------------------- */

export default function PharmacyStoreManagementPage() {
    const [stores, setStores] = useState<PharmacyStore[]>(seedStores);
    const [items, setItems] = useState<PharmacyItem[]>(seedItems);
    const [stock, setStock] = useState<StockLevel[]>(seedStock);
    const [transactions, setTransactions] = useState<Transaction[]>(seedTransactions);
    const [bills, setBills] = useState<Bill[]>(seedBills);
    const [returns, setReturns] = useState<ReturnRecord[]>(seedReturns);
    const [replacements, setReplacements] = useState<ReplacementRecord[]>(seedReplacements);

    const [tab, setTab] = useState<Tab>("overview");
    const [query, setQuery] = useState("");

    const [storeModalOpen, setStoreModalOpen] = useState(false);
    const [itemModalOpen, setItemModalOpen] = useState(false);
    const [billModalOpen, setBillModalOpen] = useState(false);
    const [returnModalOpen, setReturnModalOpen] = useState(false);
    const [replacementModalOpen, setReplacementModalOpen] = useState(false);
    const [receiptBill, setReceiptBill] = useState<Bill | null>(null);
    const [cancelBillTarget, setCancelBillTarget] = useState<Bill | null>(null);
    const [moveModal, setMoveModal] = useState<{ open: boolean; mode: MovementType; itemId?: string }>({
        open: false,
        mode: "IN",
    });

    /* ---------------- stock helpers ---------------- */

    const getQty = (storeId: string, itemId: string) =>
        stock.find((s) => s.storeId === storeId && s.itemId === itemId)?.quantity ?? 0;

    const getTotalQty = (itemId: string) =>
        stock.filter((s) => s.itemId === itemId).reduce((sum, s) => sum + s.quantity, 0);

    const setQty = (storeId: string, itemId: string, qty: number) => {
        setStock((prev) => {
            const exists = prev.some((s) => s.storeId === storeId && s.itemId === itemId);
            if (exists) {
                return prev.map((s) => (s.storeId === storeId && s.itemId === itemId ? { ...s, quantity: qty } : s));
            }
            return [...prev, { storeId, itemId, quantity: qty }];
        });
    };

    const logTx = (tx: Omit<Transaction, "id" | "date">) => {
        setTransactions((prev) => [{ ...tx, id: genId("tx"), date: new Date().toISOString() }, ...prev]);
    };

    const stockIn = (storeId: string, itemId: string, qty: number, note?: string) => {
        if (qty <= 0) return;
        setQty(storeId, itemId, getQty(storeId, itemId) + qty);
        logTx({ itemId, type: "IN", quantity: qty, toStoreId: storeId, note });
    };

    const stockOut = (storeId: string, itemId: string, qty: number, note?: string) => {
        const current = getQty(storeId, itemId);
        if (qty <= 0) return { ok: false, message: "Quantity must be greater than zero." };
        if (qty > current) return { ok: false, message: `Only ${current} units available at this store.` };
        setQty(storeId, itemId, current - qty);
        logTx({ itemId, type: "OUT", quantity: qty, fromStoreId: storeId, note });
        return { ok: true };
    };

    const transferStock = (fromStoreId: string, toStoreId: string, itemId: string, qty: number, note?: string) => {
        if (fromStoreId === toStoreId) return { ok: false, message: "Source and destination stores must differ." };
        if (qty <= 0) return { ok: false, message: "Quantity must be greater than zero." };
        const fromQty = getQty(fromStoreId, itemId);
        if (qty > fromQty) return { ok: false, message: `Only ${fromQty} units available at the source store.` };
        setQty(fromStoreId, itemId, fromQty - qty);
        setQty(toStoreId, itemId, getQty(toStoreId, itemId) + qty);
        logTx({ itemId, type: "TRANSFER", quantity: qty, fromStoreId, toStoreId, note });
        return { ok: true };
    };

    const lowStockCount = items.filter((i) => stockStatus(getTotalQty(i.id), i.minLevel) !== "OK").length;
    const pendingReturnsCount = returns.filter((r) => r.status === "Pending").length;
    const pendingReplacementsCount = replacements.filter((r) => r.status === "Pending").length;
    const cancelledBillsCount = bills.filter((b) => b.status === "Cancelled").length;

    /* ---------------- bill reversal helpers ---------------- */

    /** How much of a given bill line is still outstanding (not yet returned or cancelled). */
    const getBillLineRemaining = (billId: string, itemId: string): number => {
        const bill = bills.find((b) => b.id === billId);
        if (!bill) return 0;
        const line = bill.lines.find((l) => l.itemId === itemId);
        if (!line) return 0;

        const returnedQty = returns
            .filter((r) => r.billId === billId && r.itemId === itemId && r.status === "Approved")
            .reduce((s, r) => s + r.qty, 0);
        const cancelledQty = (bill.cancellations ?? [])
            .flatMap((c) => c.lines)
            .filter((l) => l.itemId === itemId)
            .reduce((s, l) => s + l.qty, 0);

        return Math.max(0, line.qty - returnedQty - cancelledQty);
    };

    const getBillReversedAmount = (bill: Bill): number =>
        bill.lines.reduce((sum, line) => {
            const remaining = getBillLineRemaining(bill.id, line.itemId);
            return sum + (line.qty - remaining) * line.price;
        }, 0);

    const getBillCancelReason = (bill: Bill): string => {
        const reasons = [
            ...(bill.cancellations ?? []).map((c) => c.reason),
            ...returns.filter((r) => r.billId === bill.id && r.status === "Approved").map((r) => r.reason),
        ];
        return reasons.length ? Array.from(new Set(reasons)).join("; ") : "—";
    };

    const getBillCancelledDate = (bill: Bill): string => {
        const dates = [
            ...(bill.cancellations ?? []).map((c) => c.date),
            ...returns.filter((r) => r.billId === bill.id && r.status === "Approved").map((r) => r.date),
        ];
        return dates.length ? dates.sort().slice(-1)[0] : bill.date;
    };

    /* ---------------- returns logic ---------------- */

    const decideReturn = (returnId: string, decision: "Approved" | "Rejected") => {
        const ret = returns.find((r) => r.id === returnId);
        if (!ret) return;

        setReturns((prev) => prev.map((r) => (r.id === returnId ? { ...r, status: decision } : r)));

        if (decision !== "Approved") return;

        // Restock the returned quantity at the store it was returned to.
        setQty(ret.storeId, ret.itemId, getQty(ret.storeId, ret.itemId) + ret.qty);
        logTx({
            itemId: ret.itemId,
            type: "IN",
            quantity: ret.qty,
            toStoreId: ret.storeId,
            note: `Return ${ret.returnNo} approved — ${ret.reason}`,
        });

        // If this return is tied to a bill, re-check whether the bill should
        // now be flagged Partially Returned or fully Cancelled.
        if (ret.billId) {
            const updatedReturns = returns.map((r) => (r.id === returnId ? { ...r, status: "Approved" as ReturnStatus } : r));
            setBills((prev) =>
                prev.map((b) => (b.id === ret.billId ? { ...b, status: computeBillStatus(b, updatedReturns) } : b))
            );
        }
    };

    /* ---------------- replacements logic ---------------- */

    const decideReplacement = (replacementId: string, decision: "Approved" | "Rejected") => {
        setReplacements((prev) =>
            prev.map((r) => {
                if (r.id !== replacementId) return r;
                if (decision === "Approved") {
                    // The defective/old unit comes back into stock; a replacement unit goes out.
                    setQty(r.storeId, r.oldItemId, getQty(r.storeId, r.oldItemId) + r.qty);
                    setQty(r.storeId, r.newItemId, Math.max(0, getQty(r.storeId, r.newItemId) - r.qty));
                    logTx({
                        itemId: r.oldItemId,
                        type: "IN",
                        quantity: r.qty,
                        toStoreId: r.storeId,
                        note: `Replacement ${r.replacementNo} approved — old unit returned`,
                    });
                    logTx({
                        itemId: r.newItemId,
                        type: "OUT",
                        quantity: r.qty,
                        fromStoreId: r.storeId,
                        note: `Replacement ${r.replacementNo} approved — replacement issued`,
                    });
                }
                return { ...r, status: decision };
            })
        );
    };

    /* ---------------- bill cancellation logic ---------------- */

    /**
     * Cancels part or all of a bill immediately (no approval queue — this is
     * a staff/admin action taken directly against the bill).
     *   - Purchase bill: reversing means removing stock that came in, so we
     *     block the line if that stock isn't fully still on hand.
     *   - Sale bill: reversing means adding stock back — always allowed.
     * Updates the bill's status via computeBillStatus once applied.
     */
    const cancelBillLines = (
        bill: Bill,
        reason: string,
        lines: { itemId: string; qty: number }[]
    ): { ok: boolean; message?: string } => {
        if (bill.type === "Purchase") {
            for (const l of lines) {
                const available = getQty(bill.storeId, l.itemId);
                if (l.qty > available) {
                    const item = items.find((i) => i.id === l.itemId);
                    return {
                        ok: false,
                        message: `Not enough stock of ${item?.name ?? l.itemId} left to reverse this purchase (only ${available} available).`,
                    };
                }
            }
        }

        lines.forEach((l) => {
            if (bill.type === "Purchase") {
                setQty(bill.storeId, l.itemId, getQty(bill.storeId, l.itemId) - l.qty);
                logTx({ itemId: l.itemId, type: "OUT", quantity: l.qty, fromStoreId: bill.storeId, note: `Bill ${bill.billNo} cancelled — ${reason}` });
            } else {
                setQty(bill.storeId, l.itemId, getQty(bill.storeId, l.itemId) + l.qty);
                logTx({ itemId: l.itemId, type: "IN", quantity: l.qty, toStoreId: bill.storeId, note: `Bill ${bill.billNo} cancelled — ${reason}` });
            }
        });

        const cancellation: BillCancellation = { id: genId("cn"), date: new Date().toISOString(), reason, lines };

        setBills((prev) =>
            prev.map((b) => {
                if (b.id !== bill.id) return b;
                const updated: Bill = { ...b, cancellations: [...(b.cancellations ?? []), cancellation] };
                return { ...updated, status: computeBillStatus(updated, returns) };
            })
        );

        return { ok: true };
    };

    /* ---------------- filtering ---------------- */

    const filteredItems = useMemo(
        () =>
            items.filter(
                (i) => i.name.toLowerCase().includes(query.toLowerCase()) || i.code.toLowerCase().includes(query.toLowerCase())
            ),
        [items, query]
    );

    const filteredBills = useMemo(
        () => bills.filter((b) => b.status !== "Cancelled" && b.billNo.toLowerCase().includes(query.toLowerCase())),
        [bills, query]
    );

    const filteredCancelledBills = useMemo(
        () => bills.filter((b) => b.status === "Cancelled" && b.billNo.toLowerCase().includes(query.toLowerCase())),
        [bills, query]
    );

    const filteredReturns = useMemo(
        () => returns.filter((r) => r.returnNo.toLowerCase().includes(query.toLowerCase())),
        [returns, query]
    );

    const filteredReplacements = useMemo(
        () => replacements.filter((r) => r.replacementNo.toLowerCase().includes(query.toLowerCase())),
        [replacements, query]
    );

    const openMove = (mode: MovementType, itemId?: string) => setMoveModal({ open: true, mode, itemId });

    const tabLabels: Record<Tab, string> = {
        overview: "Overview",
        stores: "Stores",
        items: "Items",
        transfers: "Stock & Transfers",
        bills: "Bill History",
        returns: "Returns & Refunds",
        replacements: "Replacements",
        cancelled: "Cancelled Bills",
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-1 text-sm text-slate-400">
                    <span>Dashboard</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span>Pharmacy</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="text-slate-600">Store Management</span>
                </div>

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Pharmacy Store Management</h1>
                        <p className="text-sm text-slate-500">
                            Create stores, manage items, move stock, and track bills, returns, replacements &amp; cancellations.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {tab === "bills" ? (
                            <button onClick={() => setBillModalOpen(true)} className="btn-primary flex items-center gap-2">
                                <Plus className="h-4 w-4" /> New Bill
                            </button>
                        ) : tab === "returns" ? (
                            <button onClick={() => setReturnModalOpen(true)} className="btn-primary flex items-center gap-2">
                                <Plus className="h-4 w-4" /> New Return
                            </button>
                        ) : tab === "replacements" ? (
                            <button onClick={() => setReplacementModalOpen(true)} className="btn-primary flex items-center gap-2">
                                <Plus className="h-4 w-4" /> New Replacement
                            </button>
                        ) : tab === "cancelled" ? null : (
                            <>
                                <button onClick={() => setItemModalOpen(true)} className="btn-secondary flex items-center gap-2">
                                    <Plus className="h-4 w-4" /> New Item
                                </button>
                                <button onClick={() => setStoreModalOpen(true)} className="btn-primary flex items-center gap-2">
                                    <Plus className="h-4 w-4" /> New Store
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-1 rounded-lg border border-slate-200 bg-white p-1 w-fit">
                    {(Object.keys(tabLabels) as Tab[]).map((t) => (
                        <button
                            key={t}
                            onClick={() => { setTab(t); setQuery(""); }}
                            className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
                                tab === t ? "bg-brand-blue text-white" : "text-slate-600 hover:bg-slate-50"
                            }`}
                        >
                            {tabLabels[t]}
                        </button>
                    ))}
                </div>

                {/* Stat cards (always visible) */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
                    <StatCard label="Total Stores" value={stores.length} icon={StoreIcon} accent="blue" />
                    <StatCard label="Total Items" value={items.length} icon={Package} accent="purple" />
                    <StatCard label="Low Stock" value={lowStockCount} icon={AlertTriangle} accent="orange" />
                    <StatCard label="Movements" value={transactions.length} icon={ArrowLeftRight} accent="green" />
                    <StatCard label="Total Bills" value={bills.length} icon={Receipt} accent="blue" />
                    <StatCard label="Pending Returns" value={pendingReturnsCount} icon={Undo2} accent="orange" />
                    <StatCard label="Pending Replacements" value={pendingReplacementsCount} icon={Repeat} accent="purple" />
                    <StatCard label="Cancelled Bills" value={cancelledBillsCount} icon={Archive} accent="red" />
                </div>

                {/* ---------------- Overview tab ---------------- */}
                {tab === "overview" && (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
                            <h2 className="mb-4 text-base font-semibold text-slate-900">Recent Movements</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                    <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                                        <th className="pb-2 pr-4 font-medium">Date &amp; Time</th>
                                        <th className="pb-2 pr-4 font-medium">Item</th>
                                        <th className="pb-2 pr-4 font-medium">Type</th>
                                        <th className="pb-2 pr-4 font-medium">Qty</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {transactions.slice(0, 6).map((tx) => {
                                        const item = items.find((i) => i.id === tx.itemId);
                                        return (
                                            <tr key={tx.id} className="border-b border-slate-100 last:border-0">
                                                <td className="py-2 pr-4 text-slate-500">{formatDateTime(tx.date)}</td>
                                                <td className="py-2 pr-4 font-medium text-slate-800">{item?.name ?? "—"}</td>
                                                <td className="py-2 pr-4">
                                                    <TypeBadge type={tx.type} />
                                                </td>
                                                <td className="py-2 pr-4">
                                                    {tx.type === "OUT" ? "-" : "+"}
                                                    {tx.quantity}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="mb-4 text-base font-semibold text-slate-900">Store-wise Summary</h2>
                            <div className="space-y-4">
                                {stores.map((store) => {
                                    const totalQty = items.reduce((sum, i) => sum + getQty(store.id, i.id), 0);
                                    const critical = items.some((i) => getQty(store.id, i.id) <= 0 && i.minLevel > 0);
                                    return (
                                        <div key={store.id}>
                                            <div className="mb-1 flex items-center justify-between text-sm">
                                                <span className="font-medium text-slate-800">{store.name}</span>
                                                <span className={critical ? "text-red-600" : "text-green-600"}>
                          {critical ? "Needs attention" : "Healthy"}
                        </span>
                                            </div>
                                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                                                <div
                                                    className={`h-full ${critical ? "bg-red-500" : "bg-green-500"}`}
                                                    style={{ width: `${Math.min(100, totalQty > 0 ? 100 : 0)}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* ---------------- Stores tab ---------------- */}
                {tab === "stores" && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {stores.map((store) => {
                            const totalUnits = items.reduce((sum, i) => sum + getQty(store.id, i.id), 0);
                            return (
                                <div key={store.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="mb-3 flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-slate-900">{store.name}</h3>
                                            <p className="text-xs text-slate-500">{store.code}</p>
                                        </div>
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                store.status === "Active" ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"
                                            }`}
                                        >
                      {store.status}
                    </span>
                                    </div>
                                    <span className={`mb-3 inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${typeColors[store.type]}`}>
                    {store.type}
                  </span>
                                    <p className="mb-4 flex items-center gap-1 text-sm text-slate-500">
                                        <MapPin className="h-3.5 w-3.5" /> {store.location}
                                    </p>
                                    <div className="mb-4 flex items-center justify-between text-sm">
                                        <span className="text-slate-500">Total units in stock</span>
                                        <span className="font-semibold text-slate-800">{totalUnits}</span>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setStores((prev) =>
                                                prev.map((s) => (s.id === store.id ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" } : s))
                                            )
                                        }
                                        className="w-full rounded-lg border border-slate-300 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                    >
                                        {store.status === "Active" ? "Deactivate" : "Activate"}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* ---------------- Items tab ---------------- */}
                {tab === "items" && (
                    <div className="space-y-4">
                        <div className="relative max-w-sm">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by name or code..."
                                className="input pl-9"
                            />
                        </div>
                        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                            <table className="w-full text-left text-sm">
                                <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                                    <th className="px-4 py-3 font-medium">Item</th>
                                    <th className="px-4 py-3 font-medium">Category</th>
                                    <th className="px-4 py-3 font-medium">Unit</th>
                                    <th className="px-4 py-3 font-medium">Unit Price</th>
                                    <th className="px-4 py-3 font-medium">Total Stock</th>
                                    <th className="px-4 py-3 font-medium">Min Level</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredItems.map((item) => {
                                    const total = getTotalQty(item.id);
                                    const status = stockStatus(total, item.minLevel);
                                    return (
                                        <tr key={item.id} className="border-b border-slate-100 last:border-0">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-slate-800">{item.name}</span>
                                                    {item.requiresColdStorage && <Snowflake className="h-3.5 w-3.5 text-cyan-500" />}
                                                </div>
                                                <p className="text-xs text-slate-400">{item.code}</p>
                                            </td>
                                            <td className="px-4 py-3">
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                            {item.category}
                          </span>
                                            </td>
                                            <td className="px-4 py-3 text-slate-600">{item.unit}</td>
                                            <td className="px-4 py-3 text-slate-600">{formatCurrency(item.unitPrice)}</td>
                                            <td className="px-4 py-3 font-semibold text-slate-800">{total}</td>
                                            <td className="px-4 py-3 text-slate-600">{item.minLevel}</td>
                                            <td className="px-4 py-3">
                                                <StatusBadge status={status} colors={{ OK: "bg-green-50 text-green-700", LOW: "bg-orange-50 text-orange-700", CRITICAL: "bg-red-50 text-red-700" }} />
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ---------------- Transfers tab ---------------- */}
                {tab === "transfers" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <ActionCard icon={ArrowDownToLine} title="Stock IN" subtitle="Add stock to a store" accent="green" onClick={() => openMove("IN")} />
                            <ActionCard icon={ArrowUpFromLine} title="Stock OUT" subtitle="Remove stock from a store" accent="red" onClick={() => openMove("OUT")} />
                            <ActionCard icon={ArrowLeftRight} title="Transfer" subtitle="Swap items between stores" accent="blue" onClick={() => openMove("TRANSFER")} />
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-200 p-5">
                                <h2 className="text-base font-semibold text-slate-900">Aggregated Stock — All Stores</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                    <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                                        <th className="px-5 py-3 font-medium">Item</th>
                                        <th className="px-5 py-3 font-medium">Total Qty</th>
                                        <th className="px-5 py-3 font-medium">Status</th>
                                        <th className="px-5 py-3 font-medium text-right">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {items.map((item) => {
                                        const total = getTotalQty(item.id);
                                        const status = stockStatus(total, item.minLevel);
                                        return (
                                            <tr key={item.id} className="border-b border-slate-100 last:border-0">
                                                <td className="px-5 py-3">
                                                    <p className="font-medium text-slate-800">{item.name}</p>
                                                    <p className="text-xs text-slate-400">{item.code}</p>
                                                </td>
                                                <td className="px-5 py-3 font-semibold text-slate-800">{total}</td>
                                                <td className="px-5 py-3">
                                                    <StatusBadge status={status} colors={{ OK: "bg-green-50 text-green-700", LOW: "bg-orange-50 text-orange-700", CRITICAL: "bg-red-50 text-red-700" }} />
                                                </td>
                                                <td className="px-5 py-3">
                                                    <div className="flex justify-end gap-2">
                                                        <RowBtn label="IN" color="green" onClick={() => openMove("IN", item.id)} />
                                                        <RowBtn label="OUT" color="red" onClick={() => openMove("OUT", item.id)} />
                                                        <RowBtn label="Transfer" color="blue" onClick={() => openMove("TRANSFER", item.id)} />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-200 p-5">
                                <h2 className="text-base font-semibold text-slate-900">Movement History</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                    <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                                        <th className="px-5 py-3 font-medium">Date &amp; Time</th>
                                        <th className="px-5 py-3 font-medium">Item</th>
                                        <th className="px-5 py-3 font-medium">Type</th>
                                        <th className="px-5 py-3 font-medium">From</th>
                                        <th className="px-5 py-3 font-medium">To</th>
                                        <th className="px-5 py-3 font-medium">Qty</th>
                                        <th className="px-5 py-3 font-medium">Note</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {transactions.map((tx) => {
                                        const item = items.find((i) => i.id === tx.itemId);
                                        const from = stores.find((s) => s.id === tx.fromStoreId);
                                        const to = stores.find((s) => s.id === tx.toStoreId);
                                        return (
                                            <tr key={tx.id} className="border-b border-slate-100 last:border-0">
                                                <td className="px-5 py-3 text-slate-500">{formatDateTime(tx.date)}</td>
                                                <td className="px-5 py-3 font-medium text-slate-800">{item?.name ?? "—"}</td>
                                                <td className="px-5 py-3">
                                                    <TypeBadge type={tx.type} />
                                                </td>
                                                <td className="px-5 py-3 text-slate-600">{from?.name ?? "—"}</td>
                                                <td className="px-5 py-3 text-slate-600">{to?.name ?? "—"}</td>
                                                <td className="px-5 py-3 font-semibold text-slate-800">{tx.quantity}</td>
                                                <td className="px-5 py-3 text-slate-500">{tx.note ?? "—"}</td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ---------------- Bill History tab ---------------- */}
                {tab === "bills" && (
                    <div className="space-y-4">
                        <div className="relative max-w-sm">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by bill number..."
                                className="input pl-9"
                            />
                        </div>
                        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                            <table className="w-full text-left text-sm">
                                <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                                    <th className="px-4 py-3 font-medium">Bill No</th>
                                    <th className="px-4 py-3 font-medium">Store</th>
                                    <th className="px-4 py-3 font-medium">Type</th>
                                    <th className="px-4 py-3 font-medium">Items</th>
                                    <th className="px-4 py-3 font-medium">Amount</th>
                                    <th className="px-4 py-3 font-medium">Date</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredBills.map((bill) => {
                                    const store = stores.find((s) => s.id === bill.storeId);
                                    const reversed = getBillReversedAmount(bill);
                                    return (
                                        <tr key={bill.id} className="border-b border-slate-100 last:border-0">
                                            <td className="px-4 py-3 font-medium text-slate-800">{bill.billNo}</td>
                                            <td className="px-4 py-3 text-slate-600">{store?.name ?? "—"}</td>
                                            <td className="px-4 py-3">
                          <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${bill.type === "Purchase" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"}`}>
                            {bill.type}
                          </span>
                                            </td>
                                            <td className="px-4 py-3 text-slate-600">
                                                {bill.lines.length} line{bill.lines.length > 1 ? "s" : ""} · {bill.lines.reduce((s, l) => s + l.qty, 0)} units
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="font-semibold text-slate-800">{formatCurrency(billTotal(bill.lines))}</p>
                                                {bill.status === "Partially Returned" && reversed > 0 && (
                                                    <p className="text-xs text-amber-600">{formatCurrency(reversed)} reversed</p>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-slate-500">{formatDateTime(bill.date)}</td>
                                            <td className="px-4 py-3">
                                                <StatusBadge status={bill.status} colors={billStatusColors} />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => setReceiptBill(bill)}
                                                        className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                                                    >
                                                        <Eye className="h-3.5 w-3.5" /> Receipt
                                                    </button>
                                                    <button
                                                        onClick={() => setCancelBillTarget(bill)}
                                                        className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                                                    >
                                                        <XCircle className="h-3.5 w-3.5" /> Cancel
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {filteredBills.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-4 py-8 text-center text-slate-400">No bills found.</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ---------------- Returns & Refunds tab ---------------- */}
                {tab === "returns" && (
                    <div className="space-y-4">
                        <div className="relative max-w-sm">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by return number..."
                                className="input pl-9"
                            />
                        </div>
                        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                            <table className="w-full text-left text-sm">
                                <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                                    <th className="px-4 py-3 font-medium">Return No</th>
                                    <th className="px-4 py-3 font-medium">Item</th>
                                    <th className="px-4 py-3 font-medium">Store</th>
                                    <th className="px-4 py-3 font-medium">Qty</th>
                                    <th className="px-4 py-3 font-medium">Reason</th>
                                    <th className="px-4 py-3 font-medium">Refund</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredReturns.map((ret) => {
                                    const item = items.find((i) => i.id === ret.itemId);
                                    const store = stores.find((s) => s.id === ret.storeId);
                                    return (
                                        <tr key={ret.id} className="border-b border-slate-100 last:border-0">
                                            <td className="px-4 py-3 font-medium text-slate-800">{ret.returnNo}</td>
                                            <td className="px-4 py-3 text-slate-600">{item?.name ?? "—"}</td>
                                            <td className="px-4 py-3 text-slate-600">{store?.name ?? "—"}</td>
                                            <td className="px-4 py-3 text-slate-600">{ret.qty}</td>
                                            <td className="px-4 py-3 text-slate-500">{ret.reason}</td>
                                            <td className="px-4 py-3 font-semibold text-slate-800">{formatCurrency(ret.refundAmount)}</td>
                                            <td className="px-4 py-3">
                                                <StatusBadge status={ret.status} colors={returnStatusColors} />
                                            </td>
                                            <td className="px-4 py-3">
                                                {ret.status === "Pending" ? (
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => decideReturn(ret.id, "Approved")}
                                                            className="flex items-center gap-1 rounded-md bg-green-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-green-700"
                                                        >
                                                            <Check className="h-3 w-3" /> Approve
                                                        </button>
                                                        <button
                                                            onClick={() => decideReturn(ret.id, "Rejected")}
                                                            className="flex items-center gap-1 rounded-md bg-red-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-red-700"
                                                        >
                                                            <Ban className="h-3 w-3" /> Reject
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="block text-right text-xs text-slate-400">—</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                                {filteredReturns.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-4 py-8 text-center text-slate-400">No returns found.</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ---------------- Replacements tab ---------------- */}
                {tab === "replacements" && (
                    <div className="space-y-4">
                        <div className="relative max-w-sm">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by replacement number..."
                                className="input pl-9"
                            />
                        </div>
                        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                            <table className="w-full text-left text-sm">
                                <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                                    <th className="px-4 py-3 font-medium">Replacement No</th>
                                    <th className="px-4 py-3 font-medium">Store</th>
                                    <th className="px-4 py-3 font-medium">Old Item</th>
                                    <th className="px-4 py-3 font-medium">New Item</th>
                                    <th className="px-4 py-3 font-medium">Qty</th>
                                    <th className="px-4 py-3 font-medium">Reason</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredReplacements.map((rep) => {
                                    const oldItem = items.find((i) => i.id === rep.oldItemId);
                                    const newItem = items.find((i) => i.id === rep.newItemId);
                                    const store = stores.find((s) => s.id === rep.storeId);
                                    return (
                                        <tr key={rep.id} className="border-b border-slate-100 last:border-0">
                                            <td className="px-4 py-3 font-medium text-slate-800">{rep.replacementNo}</td>
                                            <td className="px-4 py-3 text-slate-600">{store?.name ?? "—"}</td>
                                            <td className="px-4 py-3 text-slate-600">{oldItem?.name ?? "—"}</td>
                                            <td className="px-4 py-3 text-slate-600">{newItem?.name ?? "—"}</td>
                                            <td className="px-4 py-3 text-slate-600">{rep.qty}</td>
                                            <td className="px-4 py-3 text-slate-500">{rep.reason}</td>
                                            <td className="px-4 py-3">
                                                <StatusBadge status={rep.status} colors={replacementStatusColors} />
                                            </td>
                                            <td className="px-4 py-3">
                                                {rep.status === "Pending" ? (
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => decideReplacement(rep.id, "Approved")}
                                                            className="flex items-center gap-1 rounded-md bg-green-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-green-700"
                                                        >
                                                            <Check className="h-3 w-3" /> Approve
                                                        </button>
                                                        <button
                                                            onClick={() => decideReplacement(rep.id, "Rejected")}
                                                            className="flex items-center gap-1 rounded-md bg-red-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-red-700"
                                                        >
                                                            <Ban className="h-3 w-3" /> Reject
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="block text-right text-xs text-slate-400">—</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                                {filteredReplacements.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-4 py-8 text-center text-slate-400">No replacements found.</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ---------------- Cancelled Bills tab ---------------- */}
                {tab === "cancelled" && (
                    <div className="space-y-4">
                        <div className="relative max-w-sm">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by bill number..."
                                className="input pl-9"
                            />
                        </div>
                        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                            <table className="w-full text-left text-sm">
                                <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                                    <th className="px-4 py-3 font-medium">Bill No</th>
                                    <th className="px-4 py-3 font-medium">Store</th>
                                    <th className="px-4 py-3 font-medium">Type</th>
                                    <th className="px-4 py-3 font-medium">Original Amount</th>
                                    <th className="px-4 py-3 font-medium">Reason</th>
                                    <th className="px-4 py-3 font-medium">Cancelled On</th>
                                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredCancelledBills.map((bill) => {
                                    const store = stores.find((s) => s.id === bill.storeId);
                                    return (
                                        <tr key={bill.id} className="border-b border-slate-100 last:border-0">
                                            <td className="px-4 py-3 font-medium text-slate-800">{bill.billNo}</td>
                                            <td className="px-4 py-3 text-slate-600">{store?.name ?? "—"}</td>
                                            <td className="px-4 py-3">
                          <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${bill.type === "Purchase" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"}`}>
                            {bill.type}
                          </span>
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-slate-800">{formatCurrency(billTotal(bill.lines))}</td>
                                            <td className="px-4 py-3 text-slate-500">{getBillCancelReason(bill)}</td>
                                            <td className="px-4 py-3 text-slate-500">{formatDateTime(getBillCancelledDate(bill))}</td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    onClick={() => setReceiptBill(bill)}
                                                    className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                                                >
                                                    <Eye className="h-3.5 w-3.5" /> Receipt
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {filteredCancelledBills.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-8 text-center text-slate-400">No cancelled bills.</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* ---------------- Modals ---------------- */}

            {storeModalOpen && (
                <AddStoreModal
                    onClose={() => setStoreModalOpen(false)}
                    onSubmit={(input) => {
                        setStores((prev) => [...prev, { id: genId("st"), status: "Active", ...input }]);
                        setStoreModalOpen(false);
                    }}
                />
            )}

            {itemModalOpen && (
                <AddItemModal
                    onClose={() => setItemModalOpen(false)}
                    onSubmit={(input) => {
                        setItems((prev) => [...prev, { id: genId("it"), ...input }]);
                        setItemModalOpen(false);
                    }}
                />
            )}

            {moveModal.open && (
                <StockMovementModal
                    mode={moveModal.mode}
                    items={items}
                    stores={stores.filter((s) => s.status === "Active")}
                    defaultItemId={moveModal.itemId}
                    getQty={getQty}
                    onClose={() => setMoveModal((m) => ({ ...m, open: false }))}
                    onSubmit={(payload) => {
                        let result: { ok: boolean; message?: string } = { ok: true };
                        if (payload.mode === "IN") {
                            stockIn(payload.toStoreId!, payload.itemId, payload.qty, payload.note);
                        } else if (payload.mode === "OUT") {
                            result = stockOut(payload.fromStoreId!, payload.itemId, payload.qty, payload.note) as any;
                        } else {
                            result = transferStock(payload.fromStoreId!, payload.toStoreId!, payload.itemId, payload.qty, payload.note) as any;
                        }
                        if (result.ok) setMoveModal((m) => ({ ...m, open: false }));
                        return result;
                    }}
                />
            )}

            {billModalOpen && (
                <AddBillModal
                    items={items}
                    stores={stores.filter((s) => s.status === "Active")}
                    onClose={() => setBillModalOpen(false)}
                    onSubmit={(input) => {
                        const newBill: Bill = {
                            id: genId("bl"),
                            billNo: input.billNo,
                            storeId: input.storeId,
                            type: input.type,
                            date: new Date().toISOString(),
                            lines: input.lines,
                            status: input.status,
                        };
                        setBills((prev) => [newBill, ...prev]);
                        // Reflect the bill in stock: Purchase adds stock, Sale removes it.
                        input.lines.forEach((line) => {
                            if (input.type === "Purchase") {
                                stockIn(input.storeId, line.itemId, line.qty, `Bill ${input.billNo}`);
                            } else {
                                stockOut(input.storeId, line.itemId, line.qty, `Bill ${input.billNo}`);
                            }
                        });
                        setBillModalOpen(false);
                    }}
                />
            )}

            {returnModalOpen && (
                <AddReturnModal
                    items={items}
                    stores={stores}
                    bills={bills}
                    getRemaining={getBillLineRemaining}
                    onClose={() => setReturnModalOpen(false)}
                    onSubmit={(input) => {
                        const newReturn: ReturnRecord = {
                            id: genId("rt"),
                            returnNo: `RT-2026-${String(returns.length + 1).padStart(3, "0")}`,
                            billId: input.billId,
                            storeId: input.storeId,
                            itemId: input.itemId,
                            qty: input.qty,
                            reason: input.reason,
                            refundAmount: input.refundAmount,
                            status: "Pending",
                            date: new Date().toISOString(),
                        };
                        setReturns((prev) => [newReturn, ...prev]);
                        setReturnModalOpen(false);
                    }}
                />
            )}

            {replacementModalOpen && (
                <AddReplacementModal
                    items={items}
                    stores={stores}
                    bills={bills}
                    onClose={() => setReplacementModalOpen(false)}
                    onSubmit={(input) => {
                        const newReplacement: ReplacementRecord = {
                            id: genId("rp"),
                            replacementNo: `RP-2026-${String(replacements.length + 1).padStart(3, "0")}`,
                            billId: input.billId,
                            storeId: input.storeId,
                            oldItemId: input.oldItemId,
                            newItemId: input.newItemId,
                            qty: input.qty,
                            reason: input.reason,
                            status: "Pending",
                            date: new Date().toISOString(),
                        };
                        setReplacements((prev) => [newReplacement, ...prev]);
                        setReplacementModalOpen(false);
                    }}
                />
            )}

            {cancelBillTarget && (
                <CancelBillModal
                    bill={cancelBillTarget}
                    items={items}
                    getRemaining={(itemId) => getBillLineRemaining(cancelBillTarget.id, itemId)}
                    onClose={() => setCancelBillTarget(null)}
                    onSubmit={(input) => {
                        const result = cancelBillLines(cancelBillTarget, input.reason, input.lines);
                        if (result.ok) setCancelBillTarget(null);
                        return result;
                    }}
                />
            )}

            {receiptBill && (
                <BillReceiptModal
                    bill={receiptBill}
                    store={stores.find((s) => s.id === receiptBill.storeId)}
                    items={items}
                    getRemaining={(itemId) => getBillLineRemaining(receiptBill.id, itemId)}
                    onClose={() => setReceiptBill(null)}
                />
            )}
        </div>
    );
}

/* ---------------------------------------------------------------------- */
/* Small presentational pieces                                            */
/* ---------------------------------------------------------------------- */

function StatCard({ label, value, icon: Icon, accent }: { label: string; value: string | number; icon: any; accent: "blue" | "purple" | "orange" | "green" | "red" }) {
    const map = {
        blue: { bg: "bg-blue-50", text: "text-blue-600", bar: "bg-blue-500" },
        purple: { bg: "bg-purple-50", text: "text-purple-600", bar: "bg-purple-500" },
        orange: { bg: "bg-orange-50", text: "text-orange-600", bar: "bg-orange-500" },
        green: { bg: "bg-green-50", text: "text-green-600", bar: "bg-green-500" },
        red: { bg: "bg-red-50", text: "text-red-600", bar: "bg-red-500" },
    } as const;
    const c = map[accent];
    return (
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${c.bg}`}>
                    <Icon className={`h-4 w-4 ${c.text}`} />
                </div>
                <div>
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="text-lg font-bold text-slate-900">{value}</p>
                </div>
            </div>
            <span className={`absolute bottom-0 left-0 h-1 w-full ${c.bar}`} />
        </div>
    );
}

function TypeBadge({ type }: { type: MovementType }) {
    const styles = { IN: "bg-green-50 text-green-700", OUT: "bg-orange-50 text-orange-700", TRANSFER: "bg-blue-50 text-blue-700" };
    return <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${styles[type]}`}>{type}</span>;
}

function StatusBadge<T extends string>({ status, colors }: { status: T; colors: Record<string, string> }) {
    return <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${colors[status]}`}>{status}</span>;
}

function ActionCard({ icon: Icon, title, subtitle, accent, onClick }: { icon: any; title: string; subtitle: string; accent: "green" | "red" | "blue"; onClick: () => void }) {
    const styles = {
        green: ["bg-green-50", "text-green-600"],
        red: ["bg-red-50", "text-red-600"],
        blue: ["bg-blue-50", "text-blue-600"],
    } as const;
    const [bg, text] = styles[accent];
    return (
        <button onClick={onClick} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-slate-300">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}>
                <Icon className={`h-5 w-5 ${text}`} />
            </div>
            <div>
                <p className="font-semibold text-slate-900">{title}</p>
                <p className="text-xs text-slate-500">{subtitle}</p>
            </div>
        </button>
    );
}

function RowBtn({ label, color, onClick }: { label: string; color: "green" | "red" | "blue"; onClick: () => void }) {
    const styles = { green: "bg-green-600 hover:bg-green-700", red: "bg-red-600 hover:bg-red-700", blue: "bg-blue-600 hover:bg-blue-700" };
    return (
        <button onClick={onClick} className={`rounded-md px-2.5 py-1 text-xs font-medium text-white ${styles[color]}`}>
            {label}
        </button>
    );
}

function ModalShell({ title, onClose, children, wide }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
            <div className={`w-full ${wide ? "max-w-2xl" : "max-w-md"} rounded-xl bg-white shadow-xl`}>
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                    <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600" aria-label="Close">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="max-h-[75vh] overflow-y-auto px-5 py-4">{children}</div>
            </div>
        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
            {children}
        </div>
    );
}

/* ---------------------------------------------------------------------- */
/* Add Store / Add Item modals                                            */
/* ---------------------------------------------------------------------- */

function AddStoreModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (input: { name: string; code: string; type: StoreType; location: string }) => void }) {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [type, setType] = useState<StoreType>("Retail Pharmacy");
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");

    const submit = () => {
        if (!name.trim() || !code.trim() || !location.trim()) return setError("All fields are required.");
        onSubmit({ name: name.trim(), code: code.trim().toUpperCase(), type, location: location.trim() });
    };

    return (
        <ModalShell title="Add New Store" onClose={onClose}>
            <div className="space-y-4">
                <Field label="Store Name">
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. City Hospital Pharmacy" className="input" />
                </Field>
                <Field label="Store Code">
                    <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="e.g. RTL-02" className="input" />
                </Field>
                <Field label="Store Type">
                    <select value={type} onChange={(e) => setType(e.target.value as StoreType)} className="input">
                        {STORE_TYPES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </Field>
                <Field label="Location">
                    <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. 2nd Floor, East Wing" className="input" />
                </Field>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div className="flex justify-end gap-2 pt-2">
                    <button onClick={onClose} className="btn-secondary">Cancel</button>
                    <button onClick={submit} className="btn-primary">Create Store</button>
                </div>
            </div>
        </ModalShell>
    );
}

function AddItemModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (input: { name: string; code: string; category: ItemCategory; unit: ItemUnit; unitPrice: number; minLevel: number; requiresColdStorage?: boolean }) => void }) {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [category, setCategory] = useState<ItemCategory>("Tablet");
    const [unit, setUnit] = useState<ItemUnit>("STRIP");
    const [unitPrice, setUnitPrice] = useState("");
    const [minLevel, setMinLevel] = useState("");
    const [coldStorage, setColdStorage] = useState(false);
    const [error, setError] = useState("");

    const submit = () => {
        const price = Number(unitPrice);
        const min = Number(minLevel);
        if (!name.trim() || !code.trim() || !unitPrice || !minLevel) return setError("All fields are required.");
        if (Number.isNaN(price) || price < 0 || Number.isNaN(min) || min < 0) return setError("Price and minimum level must be valid numbers.");
        onSubmit({ name: name.trim(), code: code.trim().toUpperCase(), category, unit, unitPrice: price, minLevel: min, requiresColdStorage: coldStorage });
    };

    return (
        <ModalShell title="Add New Item" onClose={onClose}>
            <div className="space-y-4">
                <Field label="Item Name">
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Cetirizine 10mg" className="input" />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                    <Field label="Item Code">
                        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="ITM-010" className="input" />
                    </Field>
                    <Field label="Category">
                        <select value={category} onChange={(e) => setCategory(e.target.value as ItemCategory)} className="input">
                            {CATEGORIES.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </Field>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <Field label="Unit">
                        <select value={unit} onChange={(e) => setUnit(e.target.value as ItemUnit)} className="input">
                            {UNITS.map((u) => (
                                <option key={u} value={u}>{u}</option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Unit Price (₹)">
                        <input type="number" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} placeholder="0.00" className="input" />
                    </Field>
                    <Field label="Min Level">
                        <input type="number" value={minLevel} onChange={(e) => setMinLevel(e.target.value)} placeholder="0" className="input" />
                    </Field>
                </div>
                <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input type="checkbox" checked={coldStorage} onChange={(e) => setColdStorage(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue" />
                    Requires cold storage
                </label>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div className="flex justify-end gap-2 pt-2">
                    <button onClick={onClose} className="btn-secondary">Cancel</button>
                    <button onClick={submit} className="btn-primary">Add Item</button>
                </div>
            </div>
        </ModalShell>
    );
}

/* ---------------------------------------------------------------------- */
/* Stock Movement modal                                                   */
/* ---------------------------------------------------------------------- */

function StockMovementModal({
                                mode,
                                items,
                                stores,
                                defaultItemId,
                                getQty,
                                onClose,
                                onSubmit,
                            }: {
    mode: MovementType;
    items: PharmacyItem[];
    stores: PharmacyStore[];
    defaultItemId?: string;
    getQty: (storeId: string, itemId: string) => number;
    onClose: () => void;
    onSubmit: (payload: { mode: MovementType; itemId: string; qty: number; fromStoreId?: string; toStoreId?: string; note?: string }) => { ok: boolean; message?: string };
}) {
    const [itemId, setItemId] = useState(defaultItemId ?? items[0]?.id ?? "");
    const [fromStoreId, setFromStoreId] = useState(stores[0]?.id ?? "");
    const [toStoreId, setToStoreId] = useState(stores.find((s) => s.id !== stores[0]?.id)?.id ?? "");
    const [qty, setQty] = useState("");
    const [note, setNote] = useState("");
    const [error, setError] = useState("");

    const titles = { IN: "Stock IN — Add Stock", OUT: "Stock OUT — Remove Stock", TRANSFER: "Transfer Stock Between Stores" };
    const available = mode !== "IN" ? getQty(fromStoreId, itemId) : null;

    const submit = () => {
        const quantity = Number(qty);
        if (!itemId || !quantity || quantity <= 0) return setError("Select an item and enter a valid quantity.");
        if (mode === "TRANSFER" && !toStoreId) return setError("Select a destination store.");
        const result = onSubmit({
            mode,
            itemId,
            qty: quantity,
            fromStoreId: mode !== "IN" ? fromStoreId : undefined,
            toStoreId: mode !== "OUT" ? toStoreId : undefined,
            note: note || undefined,
        });
        if (!result.ok) setError(result.message ?? "Unable to complete this action.");
    };

    return (
        <ModalShell title={titles[mode]} onClose={onClose}>
            <div className="space-y-4">
                <Field label="Item">
                    <select value={itemId} onChange={(e) => setItemId(e.target.value)} className="input">
                        {items.map((it) => (
                            <option key={it.id} value={it.id}>{it.name} ({it.code})</option>
                        ))}
                    </select>
                </Field>

                {(mode === "OUT" || mode === "TRANSFER") && (
                    <Field label={mode === "TRANSFER" ? "From Store" : "Store"}>
                        <select value={fromStoreId} onChange={(e) => setFromStoreId(e.target.value)} className="input">
                            {stores.map((s) => (
                                <option key={s.id} value={s.id}>{s.name} ({s.type})</option>
                            ))}
                        </select>
                        {available !== null && <p className="mt-1 text-xs text-slate-500">Available: {available} units</p>}
                    </Field>
                )}

                {(mode === "IN" || mode === "TRANSFER") && (
                    <Field label={mode === "TRANSFER" ? "To Store" : "Destination Store"}>
                        <select value={toStoreId} onChange={(e) => setToStoreId(e.target.value)} className="input">
                            {stores.filter((s) => mode !== "TRANSFER" || s.id !== fromStoreId).map((s) => (
                                <option key={s.id} value={s.id}>{s.name} ({s.type})</option>
                            ))}
                        </select>
                    </Field>
                )}

                <Field label="Quantity">
                    <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="0" className="input" />
                </Field>

                <Field label="Note (optional)">
                    <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Reason for movement" className="input" />
                </Field>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex justify-end gap-2 pt-2">
                    <button onClick={onClose} className="btn-secondary">Cancel</button>
                    <button onClick={submit} className="btn-primary">Confirm</button>
                </div>
            </div>
        </ModalShell>
    );
}

/* ---------------------------------------------------------------------- */
/* Add Bill modal (multi-line)                                            */
/* ---------------------------------------------------------------------- */

function AddBillModal({
                          items,
                          stores,
                          onClose,
                          onSubmit,
                      }: {
    items: PharmacyItem[];
    stores: PharmacyStore[];
    onClose: () => void;
    onSubmit: (input: { billNo: string; storeId: string; type: BillType; lines: BillLine[]; status: "Paid" | "Pending" | "Overdue" }) => void;
}) {
    const [billNo, setBillNo] = useState("");
    const [storeId, setStoreId] = useState(stores[0]?.id ?? "");
    const [type, setType] = useState<BillType>("Purchase");
    const [status, setStatus] = useState<"Paid" | "Pending" | "Overdue">("Paid");
    const [lines, setLines] = useState<BillLine[]>([{ itemId: items[0]?.id ?? "", qty: 1, price: items[0]?.unitPrice ?? 0 }]);
    const [error, setError] = useState("");

    const updateLine = (idx: number, patch: Partial<BillLine>) => {
        setLines((prev) => prev.map((l, i) => (i === idx ? { ...l, ...patch } : l)));
    };

    const addLine = () => setLines((prev) => [...prev, { itemId: items[0]?.id ?? "", qty: 1, price: items[0]?.unitPrice ?? 0 }]);
    const removeLine = (idx: number) => setLines((prev) => prev.filter((_, i) => i !== idx));

    const total = billTotal(lines);

    const submit = () => {
        if (!billNo.trim() || !storeId || lines.length === 0) return setError("Bill number, store, and at least one item line are required.");
        if (lines.some((l) => !l.itemId || l.qty <= 0 || l.price < 0)) return setError("Every line needs a valid item, quantity, and price.");
        onSubmit({ billNo: billNo.trim(), storeId, type, lines, status });
    };

    return (
        <ModalShell title="Record New Bill" onClose={onClose} wide>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <Field label="Bill Number">
                        <input value={billNo} onChange={(e) => setBillNo(e.target.value)} placeholder="e.g. PB-2026-003" className="input" />
                    </Field>
                    <Field label="Type">
                        <select value={type} onChange={(e) => setType(e.target.value as BillType)} className="input">
                            <option value="Purchase">Purchase</option>
                            <option value="Sale">Sale</option>
                        </select>
                    </Field>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Field label="Store">
                        <select value={storeId} onChange={(e) => setStoreId(e.target.value)} className="input">
                            {stores.map((s) => (
                                <option key={s.id} value={s.id}>{s.name} ({s.type})</option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Status">
                        <select value={status} onChange={(e) => setStatus(e.target.value as "Paid" | "Pending" | "Overdue")} className="input">
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="Overdue">Overdue</option>
                        </select>
                    </Field>
                </div>

                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label className="text-sm font-medium text-slate-700">Line Items</label>
                        <button onClick={addLine} className="flex items-center gap-1 text-xs font-medium text-brand-blue hover:underline">
                            <Plus className="h-3.5 w-3.5" /> Add line
                        </button>
                    </div>
                    <div className="space-y-2">
                        {lines.map((line, idx) => (
                            <div key={idx} className="grid grid-cols-12 items-center gap-2">
                                <select
                                    value={line.itemId}
                                    onChange={(e) => {
                                        const selected = items.find((i) => i.id === e.target.value);
                                        updateLine(idx, { itemId: e.target.value, price: selected?.unitPrice ?? line.price });
                                    }}
                                    className="input col-span-6"
                                >
                                    {items.map((it) => (
                                        <option key={it.id} value={it.id}>{it.name}</option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    value={line.qty}
                                    onChange={(e) => updateLine(idx, { qty: Number(e.target.value) })}
                                    placeholder="Qty"
                                    className="input col-span-2"
                                />
                                <input
                                    type="number"
                                    value={line.price}
                                    onChange={(e) => updateLine(idx, { price: Number(e.target.value) })}
                                    placeholder="Price"
                                    className="input col-span-3"
                                />
                                <button
                                    onClick={() => removeLine(idx)}
                                    disabled={lines.length === 1}
                                    className="col-span-1 flex h-9 w-9 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-red-600 disabled:opacity-30"
                                    aria-label="Remove line"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                    <span className="text-sm font-medium text-slate-600">Total Amount</span>
                    <span className="text-lg font-bold text-slate-900">{formatCurrency(total)}</span>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex justify-end gap-2 pt-2">
                    <button onClick={onClose} className="btn-secondary">Cancel</button>
                    <button onClick={submit} className="btn-primary">Save Bill</button>
                </div>
            </div>
        </ModalShell>
    );
}

/* ---------------------------------------------------------------------- */
/* Add Return modal                                                       */
/* ---------------------------------------------------------------------- */

function AddReturnModal({
                            items,
                            stores,
                            bills,
                            getRemaining,
                            onClose,
                            onSubmit,
                        }: {
    items: PharmacyItem[];
    stores: PharmacyStore[];
    bills: Bill[];
    getRemaining: (billId: string, itemId: string) => number;
    onClose: () => void;
    onSubmit: (input: { billId?: string; storeId: string; itemId: string; qty: number; reason: string; refundAmount: number }) => void;
}) {
    const [billId, setBillId] = useState<string>("");
    const [storeId, setStoreId] = useState(stores[0]?.id ?? "");
    const [itemId, setItemId] = useState(items[0]?.id ?? "");
    const [qty, setQty] = useState("1");
    const [reason, setReason] = useState("");
    const [refundAmount, setRefundAmount] = useState<string>(String(items[0]?.unitPrice ?? 0));
    const [error, setError] = useState("");

    const activeBill = bills.find((b) => b.id === billId);
    const remaining = billId ? getRemaining(billId, itemId) : null;

    const applyBill = (id: string) => {
        setBillId(id);
        const bill = bills.find((b) => b.id === id);
        if (bill) {
            setStoreId(bill.storeId);
            const firstLine = bill.lines[0];
            if (firstLine) {
                setItemId(firstLine.itemId);
                setRefundAmount(String(firstLine.price));
                const rem = getRemaining(id, firstLine.itemId);
                setQty(String(Math.min(1, rem) || 0));
            }
        } else {
            setQty("1");
        }
    };

    const handleItemChange = (id: string) => {
        setItemId(id);
        const item = items.find((i) => i.id === id);
        let q = Number(qty) || 1;
        if (billId) {
            const rem = getRemaining(billId, id);
            q = Math.min(q, rem);
        }
        setQty(String(q));
        if (item) setRefundAmount(String(item.unitPrice * q));
    };

    const handleQtyChange = (value: string) => {
        setQty(value);
        const item = items.find((i) => i.id === itemId);
        const q = Number(value) || 0;
        if (item) setRefundAmount(String(item.unitPrice * q));
    };

    const submit = () => {
        const quantity = Number(qty);
        const refund = Number(refundAmount);
        if (!storeId || !itemId || !quantity || quantity <= 0 || !reason.trim()) {
            return setError("Store, item, quantity, and reason are required.");
        }
        if (Number.isNaN(refund) || refund < 0) return setError("Refund amount must be a valid number.");
        if (billId) {
            const rem = getRemaining(billId, itemId);
            if (quantity > rem) {
                return setError(`Only ${rem} unit(s) of this item remain returnable from bill ${activeBill?.billNo}.`);
            }
        }
        onSubmit({ billId: billId || undefined, storeId, itemId, qty: quantity, reason: reason.trim(), refundAmount: refund });
    };

    return (
        <ModalShell title="Process Return / Refund" onClose={onClose}>
            <div className="space-y-4">
                <Field label="Related Bill (optional)">
                    <select value={billId} onChange={(e) => applyBill(e.target.value)} className="input">
                        <option value="">— No bill reference —</option>
                        {bills.filter((b) => b.status !== "Cancelled").map((b) => (
                            <option key={b.id} value={b.id}>{b.billNo} · {b.type}</option>
                        ))}
                    </select>
                </Field>

                <div className="grid grid-cols-2 gap-3">
                    <Field label="Store">
                        <select value={storeId} onChange={(e) => setStoreId(e.target.value)} className="input">
                            {stores.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Item">
                        <select value={itemId} onChange={(e) => handleItemChange(e.target.value)} className="input">
                            {(activeBill ? items.filter((it) => activeBill.lines.some((l) => l.itemId === it.id)) : items).map((it) => (
                                <option key={it.id} value={it.id}>{it.name}</option>
                            ))}
                        </select>
                    </Field>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Field label="Quantity">
                        <input type="number" value={qty} onChange={(e) => handleQtyChange(e.target.value)} className="input" />
                    </Field>
                    <Field label="Refund Amount (₹)">
                        <input type="number" value={refundAmount} onChange={(e) => setRefundAmount(e.target.value)} className="input" />
                    </Field>
                </div>
                {remaining !== null && (
                    <p className="-mt-2 text-xs text-slate-500">Remaining returnable from this bill: {remaining} unit(s)</p>
                )}

                <Field label="Reason for Return">
                    <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Damaged packaging, expired batch..." className="input" />
                </Field>

                <p className="text-xs text-slate-400">
                    Approving this return will automatically restock the item and log a stock-IN movement. If this
                    return covers every unit purchased on the linked bill, the bill will be marked Cancelled.
                </p>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex justify-end gap-2 pt-2">
                    <button onClick={onClose} className="btn-secondary">Cancel</button>
                    <button onClick={submit} className="btn-primary">Submit Return</button>
                </div>
            </div>
        </ModalShell>
    );
}

/* ---------------------------------------------------------------------- */
/* Add Replacement modal                                                  */
/* ---------------------------------------------------------------------- */

function AddReplacementModal({
                                 items,
                                 stores,
                                 bills,
                                 onClose,
                                 onSubmit,
                             }: {
    items: PharmacyItem[];
    stores: PharmacyStore[];
    bills: Bill[];
    onClose: () => void;
    onSubmit: (input: { billId?: string; storeId: string; oldItemId: string; newItemId: string; qty: number; reason: string }) => void;
}) {
    const [billId, setBillId] = useState<string>("");
    const [storeId, setStoreId] = useState(stores[0]?.id ?? "");
    const [oldItemId, setOldItemId] = useState(items[0]?.id ?? "");
    const [newItemId, setNewItemId] = useState(items[0]?.id ?? "");
    const [qty, setQty] = useState("1");
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");

    const applyBill = (id: string) => {
        setBillId(id);
        const bill = bills.find((b) => b.id === id);
        if (bill) {
            setStoreId(bill.storeId);
            const firstLine = bill.lines[0];
            if (firstLine) {
                setOldItemId(firstLine.itemId);
                setNewItemId(firstLine.itemId);
            }
        }
    };

    const submit = () => {
        const quantity = Number(qty);
        if (!storeId || !oldItemId || !newItemId || !quantity || quantity <= 0 || !reason.trim()) {
            return setError("Store, items, quantity, and reason are required.");
        }
        onSubmit({ billId: billId || undefined, storeId, oldItemId, newItemId, qty: quantity, reason: reason.trim() });
    };

    return (
        <ModalShell title="Process Replacement" onClose={onClose}>
            <div className="space-y-4">
                <Field label="Related Bill (optional)">
                    <select value={billId} onChange={(e) => applyBill(e.target.value)} className="input">
                        <option value="">— No bill reference —</option>
                        {bills.filter((b) => b.status !== "Cancelled").map((b) => (
                            <option key={b.id} value={b.id}>{b.billNo} · {b.type}</option>
                        ))}
                    </select>
                </Field>

                <Field label="Store">
                    <select value={storeId} onChange={(e) => setStoreId(e.target.value)} className="input">
                        {stores.map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                </Field>

                <div className="grid grid-cols-2 gap-3">
                    <Field label="Item Being Returned">
                        <select value={oldItemId} onChange={(e) => setOldItemId(e.target.value)} className="input">
                            {items.map((it) => (
                                <option key={it.id} value={it.id}>{it.name}</option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Replacement Item">
                        <select value={newItemId} onChange={(e) => setNewItemId(e.target.value)} className="input">
                            {items.map((it) => (
                                <option key={it.id} value={it.id}>{it.name}</option>
                            ))}
                        </select>
                    </Field>
                </div>

                <Field label="Quantity">
                    <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} className="input" />
                </Field>

                <Field label="Reason for Replacement">
                    <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Defective unit, wrong item dispensed..." className="input" />
                </Field>

                <p className="text-xs text-slate-400">
                    Approving this will return the old item to stock and issue the replacement item from the same store.
                </p>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex justify-end gap-2 pt-2">
                    <button onClick={onClose} className="btn-secondary">Cancel</button>
                    <button onClick={submit} className="btn-primary">Submit Replacement</button>
                </div>
            </div>
        </ModalShell>
    );
}

/* ---------------------------------------------------------------------- */
/* Cancel Bill modal                                                      */
/* ---------------------------------------------------------------------- */

function CancelBillModal({
                             bill,
                             items,
                             getRemaining,
                             onClose,
                             onSubmit,
                         }: {
    bill: Bill;
    items: PharmacyItem[];
    getRemaining: (itemId: string) => number;
    onClose: () => void;
    onSubmit: (input: { reason: string; lines: { itemId: string; qty: number }[] }) => { ok: boolean; message?: string };
}) {
    const [qtyByItem, setQtyByItem] = useState<Record<string, string>>(() =>
        Object.fromEntries(bill.lines.map((l) => [l.itemId, String(getRemaining(l.itemId))]))
    );
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");

    const updateQty = (itemId: string, value: string) => setQtyByItem((prev) => ({ ...prev, [itemId]: value }));

    const reversalValue = bill.lines.reduce((sum, line) => sum + (Number(qtyByItem[line.itemId]) || 0) * line.price, 0);

    const submit = () => {
        if (!reason.trim()) return setError("A reason is required to cancel items from this bill.");

        const lines: { itemId: string; qty: number }[] = [];
        for (const line of bill.lines) {
            const remaining = getRemaining(line.itemId);
            const qty = Number(qtyByItem[line.itemId]) || 0;
            if (qty < 0) return setError("Quantities cannot be negative.");
            if (qty > remaining) {
                const item = items.find((i) => i.id === line.itemId);
                return setError(`${item?.name ?? line.itemId}: only ${remaining} unit(s) remain to cancel.`);
            }
            if (qty > 0) lines.push({ itemId: line.itemId, qty });
        }

        if (lines.length === 0) return setError("Select at least one item and quantity to cancel.");

        const result = onSubmit({ reason: reason.trim(), lines });
        if (!result.ok) setError(result.message ?? "Unable to cancel this bill.");
    };

    return (
        <ModalShell title={`Cancel Bill — ${bill.billNo}`} onClose={onClose} wide>
            <div className="space-y-4">
                <p className="text-sm text-slate-500">
                    Leave the quantities as-is to cancel the entire bill, or reduce any line to cancel only part of it.
                    {bill.type === "Purchase" && " Cancelling a purchase removes that stock — it must still be on hand."}
                </p>

                <div className="overflow-x-auto rounded-lg border border-slate-200">
                    <table className="w-full text-left text-sm">
                        <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                            <th className="px-3 py-2 font-medium">Item</th>
                            <th className="px-3 py-2 text-right font-medium">Billed</th>
                            <th className="px-3 py-2 text-right font-medium">Remaining</th>
                            <th className="px-3 py-2 text-right font-medium">Cancel Qty</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bill.lines.map((line) => {
                            const item = items.find((i) => i.id === line.itemId);
                            const remaining = getRemaining(line.itemId);
                            return (
                                <tr key={line.itemId} className="border-b border-slate-100 last:border-0">
                                    <td className="px-3 py-2 text-slate-700">{item?.name ?? "—"}</td>
                                    <td className="px-3 py-2 text-right text-slate-500">{line.qty}</td>
                                    <td className="px-3 py-2 text-right text-slate-500">
                                        {remaining === 0 ? <span className="text-xs text-slate-400">Fully returned</span> : remaining}
                                    </td>
                                    <td className="px-3 py-2 text-right">
                                        <input
                                            type="number"
                                            min={0}
                                            max={remaining}
                                            disabled={remaining === 0}
                                            value={qtyByItem[line.itemId] ?? "0"}
                                            onChange={(e) => updateQty(line.itemId, e.target.value)}
                                            className="input w-24 text-right disabled:bg-slate-50 disabled:text-slate-400"
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                <Field label="Reason">
                    <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Customer returned all items, billing error..." className="input" />
                </Field>

                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                    <span className="text-sm font-medium text-slate-600">Reversal Value</span>
                    <span className="text-lg font-bold text-slate-900">{formatCurrency(reversalValue)}</span>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex justify-end gap-2 pt-2">
                    <button onClick={onClose} className="btn-secondary">Back</button>
                    <button onClick={submit} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
                        Confirm Cancellation
                    </button>
                </div>
            </div>
        </ModalShell>
    );
}

/* ---------------------------------------------------------------------- */
/* Bill Receipt modal (printable)                                         */
/* ---------------------------------------------------------------------- */

function BillReceiptModal({
                              bill,
                              store,
                              items,
                              getRemaining,
                              onClose,
                          }: {
    bill: Bill;
    store?: PharmacyStore;
    items: PharmacyItem[];
    getRemaining: (itemId: string) => number;
    onClose: () => void;
}) {
    const total = billTotal(bill.lines);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 print:bg-white print:p-0">
            <style>{`
                @media print {
                    body * { visibility: hidden; }
                    #bill-receipt-printable, #bill-receipt-printable * { visibility: visible; }
                    #bill-receipt-printable { position: fixed; inset: 0; margin: 0; max-width: 100%; box-shadow: none; border-radius: 0; }
                    .no-print { display: none !important; }
                }
            `}</style>
            <div id="bill-receipt-printable" className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl">
                {bill.status === "Cancelled" && (
                    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                        <span className="-rotate-[20deg] rounded-lg border-4 border-red-500/70 px-6 py-2 text-3xl font-black uppercase tracking-widest text-red-500/70">
                            Cancelled
                        </span>
                    </div>
                )}

                <div className="no-print flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <h3 className="text-base font-semibold text-slate-900">Bill Receipt</h3>
                    <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600" aria-label="Close">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="px-6 py-6">
                    <div className="mb-6 flex items-start justify-between border-b border-dashed border-slate-300 pb-4">
                        <div>
                            <p className="text-lg font-bold text-slate-900">ComputeSoft Hospital Pharmacy</p>
                            <p className="text-xs text-slate-500">{store?.name ?? "—"}</p>
                            <p className="text-xs text-slate-500">{store?.location ?? ""}</p>
                        </div>
                        <div className="text-right">
                            <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${billStatusColors[bill.status]}`}>
                                {bill.status}
                            </span>
                            <p className="mt-1 text-xs text-slate-500">{bill.type} Bill</p>
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <p className="text-xs text-slate-400">Bill No</p>
                            <p className="font-medium text-slate-800">{bill.billNo}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-slate-400">Date</p>
                            <p className="font-medium text-slate-800">{formatDateTime(bill.date)}</p>
                        </div>
                    </div>

                    <table className="w-full text-left text-sm">
                        <thead>
                        <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                            <th className="py-2 font-medium">Item</th>
                            <th className="py-2 text-right font-medium">Qty</th>
                            <th className="py-2 text-right font-medium">Price</th>
                            <th className="py-2 text-right font-medium">Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bill.lines.map((line, idx) => {
                            const item = items.find((i) => i.id === line.itemId);
                            const remaining = getRemaining(line.itemId);
                            const reversedQty = line.qty - remaining;
                            return (
                                <tr key={idx} className="border-b border-slate-100 last:border-0">
                                    <td className="py-2 text-slate-700">
                                        {item?.name ?? "—"}
                                        {reversedQty > 0 && (
                                            <span className="ml-2 rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
                                                {reversedQty} returned
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-2 text-right text-slate-600">{line.qty}</td>
                                    <td className="py-2 text-right text-slate-600">{formatCurrency(line.price)}</td>
                                    <td className="py-2 text-right font-medium text-slate-800">{formatCurrency(line.qty * line.price)}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>

                    <div className="mt-4 flex items-center justify-between border-t border-dashed border-slate-300 pt-4">
                        <span className="text-sm font-semibold text-slate-700">Total Amount</span>
                        <span className="text-xl font-bold text-slate-900">{formatCurrency(total)}</span>
                    </div>

                    <p className="mt-6 text-center text-xs text-slate-400">Thank you — this is a system-generated receipt.</p>
                </div>

                <div className="no-print flex justify-end gap-2 border-t border-slate-200 px-5 py-4">
                    <button onClick={onClose} className="btn-secondary">Close</button>
                    <button onClick={() => window.print()} className="btn-primary flex items-center gap-2">
                        <Printer className="h-4 w-4" /> Print
                    </button>
                </div>
            </div>
        </div>
    );
}