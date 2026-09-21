import AccountantList from "@/components/accountant/Accountantlist";
import { MOCK_ACCOUNTANTS, MOCK_ACCOUNTANT_STATS } from "@/components/accountant/Mockaccountant";

export default function AccountantsPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <AccountantList accountants={MOCK_ACCOUNTANTS} stats={MOCK_ACCOUNTANT_STATS} />
        </main>
    );
}