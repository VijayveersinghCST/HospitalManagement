import RolesList from "@/components/user-roles/Roleslist";
import { MOCK_ROLES, MOCK_USERS } from "@/components/user-roles/Mockuserroles";

export default function UserManagementPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <RolesList roles={MOCK_ROLES} users={MOCK_USERS} />
        </main>
    );
}