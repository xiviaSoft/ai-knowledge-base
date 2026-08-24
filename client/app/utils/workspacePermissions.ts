export type WorkspaceRole =
    | "OWNER"
    | "ADMIN"
    | "EDITOR"
    | "VIEWER";

export function canInviteMembers(
    role?: WorkspaceRole | null
): boolean {
    return role === "OWNER";
}

export function canManageMemberRoles(
    role?: WorkspaceRole | null
): boolean {
    return role === "OWNER";
}

export function canRemoveMembers(
    role?: WorkspaceRole | null
): boolean {
    return role === "OWNER" || role === "ADMIN";
}

export function canManageMembers(
    role?: WorkspaceRole | null
): boolean {
    return (
        canInviteMembers(role) ||
        canManageMemberRoles(role) ||
        canRemoveMembers(role)
    );
}
