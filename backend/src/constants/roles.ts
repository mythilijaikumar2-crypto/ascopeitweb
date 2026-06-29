export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  HR: 'HR',
  MARKETING: 'MARKETING',
  EMPLOYEE: 'EMPLOYEE'
} as const;

export type RoleType = keyof typeof ROLES;
