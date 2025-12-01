export const ROLES = {
    ADMIN: "Admin",
    SUPERADMIN: "SuperAdmin",
    CITIZEN: "Citizen",
} as const;

export type RoleType = (typeof ROLES)[keyof typeof ROLES];
