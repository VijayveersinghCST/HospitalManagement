import AccountantEditPicker from "@/components/accountant/Accountanteditpicker";
import { MOCK_ACCOUNTANTS } from "@/components/accountant/Mockaccountant";

export default function AccountantEditPickerPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <AccountantEditPicker accountants={MOCK_ACCOUNTANTS} />
        </main>
    );
}