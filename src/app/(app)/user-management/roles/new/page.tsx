import RoleConfigForm from "@/components/user-roles/Roleconfigform";
import { emptyPermissions } from "@/components/user-roles/Userroles";

export default function NewRolePage() {
    const blankRole = {
        id: "new",
        name: "",
        description: "",
        color: "#1565D8",
        userCount: 0,
        isSystemRole: false,
        modulePermissions: emptyPermissions("No Access"),
    };

    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <RoleConfigForm role={blankRole} />
        </main>
    );
}