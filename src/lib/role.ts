export const ROLES = {
    FREE: 'free',
    PREMIUM: 'premium',
    ADMIN: 'admin',
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

export function hasRole(user: { role: string }, role: UserRole): boolean {
    return user.role === role;
}

export function hasAnyRole(user: { role: string }, roles: UserRole[]): boolean {
    return roles.some(role => hasRole(user, role));
}
