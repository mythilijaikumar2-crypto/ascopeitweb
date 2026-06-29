import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seed database: start seeding roles and permissions...');

  // 1. Seed Permissions
  const permissionsData = [
    { name: 'View Dashboard', code: 'VIEW_DASHBOARD' },
    { name: 'View Scoping Contacts', code: 'VIEW_CONTACTS' },
    { name: 'View Careers Applications', code: 'VIEW_CAREERS' },
    { name: 'View Internship Applications', code: 'VIEW_INTERNSHIPS' },
    { name: 'Manage Blogs', code: 'MANAGE_BLOGS' },
    { name: 'Manage Site Resources', code: 'MANAGE_RESOURCES' }
  ];

  const permissions = [];
  for (const perm of permissionsData) {
    const createdPerm = await prisma.permission.upsert({
      where: { code: perm.code },
      update: { name: perm.name },
      create: { name: perm.name, code: perm.code }
    });
    permissions.push(createdPerm);
  }

  // 2. Seed Roles & Link Permissions
  const rolesData = [
    {
      name: 'Super Admin',
      code: 'SUPER_ADMIN',
      permissionsCodes: ['VIEW_DASHBOARD', 'VIEW_CONTACTS', 'VIEW_CAREERS', 'VIEW_INTERNSHIPS', 'MANAGE_BLOGS', 'MANAGE_RESOURCES']
    },
    {
      name: 'Admin',
      code: 'ADMIN',
      permissionsCodes: ['VIEW_DASHBOARD', 'VIEW_CONTACTS', 'VIEW_CAREERS', 'VIEW_INTERNSHIPS', 'MANAGE_BLOGS', 'MANAGE_RESOURCES']
    },
    {
      name: 'HR Manager',
      code: 'HR',
      permissionsCodes: ['VIEW_DASHBOARD', 'VIEW_CAREERS', 'VIEW_INTERNSHIPS']
    },
    {
      name: 'Marketing Associate',
      code: 'MARKETING',
      permissionsCodes: ['VIEW_DASHBOARD', 'MANAGE_BLOGS']
    },
    {
      name: 'Employee',
      code: 'EMPLOYEE',
      permissionsCodes: ['VIEW_DASHBOARD']
    }
  ];

  for (const r of rolesData) {
    // Get permission DB ids matching codes
    const rolePermissions = permissions.filter((p) => r.permissionsCodes.includes(p.code));

    await prisma.role.upsert({
      where: { code: r.code },
      update: {
        name: r.name,
        permissions: {
          set: rolePermissions.map((p) => ({ id: p.id }))
        }
      },
      create: {
        name: r.name,
        code: r.code,
        permissions: {
          connect: rolePermissions.map((p) => ({ id: p.id }))
        }
      }
    });
  }

  // 3. Create Default Super Admin Account
  const superadminRole = await prisma.role.findUnique({
    where: { code: 'SUPER_ADMIN' }
  });

  if (superadminRole) {
    const passwordHash = await bcrypt.hash('superadmin12345', 10);

    await prisma.user.upsert({
      where: { email: 'superadmin@ascopetech.com' },
      update: {},
      create: {
        email: 'superadmin@ascopetech.com',
        fullName: 'Super Administrator',
        passwordHash,
        roleId: superadminRole.id,
        status: 'ACTIVE'
      }
    });
    console.log('Seeded User: superadmin@ascopetech.com / superadmin12345');
  }

  console.log('Seed database: success!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
