export interface NavChildLike {
    label: string;
    href: string;
}

export interface NavItemLike {
    label: string;
    href?: string;
    children?: NavChildLike[];
}

/**
 * Filters a NAV_ITEMS-shaped array using a per-label visibility check.
 *   - A denied module is dropped entirely (including its children).
 *   - A denied child is dropped from its parent's children list.
 *   - If every child of a group ends up denied, the parent group is
 *     dropped too (nothing left to show).
 * `isVisible(navLabel, parentLabel?)` is called with the parent's label as
 * the second argument when checking a child, so two different modules with
 * a same-named child (e.g. Pharmacy's "Staff Management" vs. the top-level
 * "Staff Management" module) are resolved independently. It's expected to
 * fail OPEN for labels it doesn't recognize — see useNavVisibility in
 * store/permissions.ts.
 */
export function filterNavItems<T extends NavItemLike>(
    items: T[],
    isVisible: (navLabel: string, parentLabel?: string) => boolean
): T[] {
    const result: T[] = [];

    for (const item of items) {
        if (!isVisible(item.label)) continue;

        if (item.children && item.children.length > 0) {
            const children = item.children.filter((c) => isVisible(c.label, item.label));
            if (children.length === 0) continue;
            result.push({ ...item, children } as T);
        } else {
            result.push(item);
        }
    }

    return result;
}