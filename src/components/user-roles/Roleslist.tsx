import Link from "next/link";
import { Plus } from "lucide-react";
import Button from "@/components/receptionist/Button";
import RoleCard from "./Rolecard";
import UserRoleAssignment from "./Userrolesassignment";
import { RoleConfig, SystemUser } from "./Userroles";
import { COLORS } from "@/constants/colors";

export default function RolesList({ roles, users }: { roles: RoleConfig[]; users: SystemUser[] }) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>
                        User &amp; Role Management
                    </h1>
                    <p className="mt-1 max-w-xl text-sm" style={{ color: COLORS.gray }}>
                        Define what each role can see and do. Restricting a role to specific modules hides every
                        other section of the system for users assigned that role.
                    </p>
                </div>
                <Link href="/user-management/roles/new">
                    <Button>
                        <Plus size={16} /> Add Role
                    </Button>
                </Link>
            </div>

            <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide" style={{ color: COLORS.gray }}>
                    Roles
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {roles.map((role) => (
                        <RoleCard key={role.id} role={role} />
                    ))}
                </div>
            </div>

            <UserRoleAssignment users={users} roles={roles} />
        </div>
    );
}