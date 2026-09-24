import { NAV_ITEMS } from "@/lib/navigation";

/**
 * Every row here is generated straight from NAV_ITEMS (src/lib/navigation.ts),
 * so the catalog can never drift out of sync with the real sidebar — add or
 * rename a nav item there and this file picks it up automatically.
 */

export type PermissionAction = "VIEW";

export interface PermissionRow {
    key: string; // unique permission code, e.g. "PHARMACY_STORE_MANAGEMENT_VIEW"
    label: string;
    moduleKey: string;
    moduleLabel: string;
    navLabel: string; // the Sidebar label (item or child) this row governs
    parentLabel?: string; // set for child rows — needed because two different
    // modules can have children with the same label (e.g. Pharmacy's "Staff
    // Management" vs. the top-level "Staff Management" module), so lookups
    // must be scoped by parent, not by label alone.
    action: PermissionAction;
}

function slugify(label: string): string {
    return label
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
}

function buildRows(): PermissionRow[] {
    const rows: PermissionRow[] = [];

    for (const item of NAV_ITEMS) {
        const moduleKey = slugify(item.label);

        // Module-level row: governs the whole group (parent + children) for
        // items with children, or the single link for items without.
        rows.push({
            key: `${moduleKey}_VIEW`,
            label: `${item.label} — Sidebar Access`,
            moduleKey,
            moduleLabel: item.label,
            navLabel: item.label,
            action: "VIEW",
        });

        for (const child of item.children ?? []) {
            const childKey = `${moduleKey}_${slugify(child.label)}`;
            rows.push({
                key: `${childKey}_VIEW`,
                label: `${child.label} — Sidebar Access`,
                moduleKey,
                moduleLabel: item.label,
                navLabel: child.label,
                parentLabel: item.label,
                action: "VIEW",
            });
        }
    }

    return rows;
}

export const PERMISSION_ROWS: PermissionRow[] = buildRows();

/** One entry per top-level nav item — used to render the module tab strip. */
export const PERMISSION_MODULES: { key: string; label: string }[] = NAV_ITEMS.map((item) => ({
    key: slugify(item.label),
    label: item.label,
}));

/** All permission keys — used to grant a role (e.g. Global Admin) full access. */
export const ALL_PERMISSION_KEYS: string[] = PERMISSION_ROWS.map((r) => r.key);

/**
 * VIEW rows keyed for lookup. Module-level rows are keyed by their label
 * alone; child rows are keyed as "<parentLabel>::<childLabel>" so that
 * same-named children under different parents never collide.
 */
export const VIEW_ROWS_BY_NAV_KEY: Map<string, PermissionRow> = new Map(
    PERMISSION_ROWS.map((r) => [r.parentLabel ? `${r.parentLabel}::${r.navLabel}` : r.navLabel, r])
);

/** All VIEW-row permission keys for a given set of module keys (module + all its children). */
export function grantAll(moduleKeys: string[]): string[] {
    return PERMISSION_ROWS.filter((r) => moduleKeys.includes(r.moduleKey)).map((r) => r.key);
}

/** VIEW permission keys for a given set of top-level nav labels only (no children). */
export function grantView(navLabels: string[]): string[] {
    return PERMISSION_ROWS.filter((r) => r.action === "VIEW" && !r.parentLabel && navLabels.includes(r.navLabel)).map(
        (r) => r.key
    );
}