import { useSession } from 'next-auth/react';
import { ROLES, UserRole } from '@/lib/role';

export function useUserRole(): UserRole {
    const { data: session } = useSession();
    return (session?.user?.role as UserRole) || ROLES.FREE;
}
