import { prisma } from '../config/db';
import { User, Role } from '@prisma/client';

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: { role: true }
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { role: true }
    });
  }

  async createUser(data: {
    email: string;
    passwordHash: string;
    fullName: string;
    roleId: string;
  }) {
    return prisma.user.create({
      data,
      include: { role: true }
    });
  }

  async findRoleByCode(code: string) {
    return prisma.role.findUnique({
      where: { code }
    });
  }

  async getDashboardStats() {
    const [contacts, applications, enrollments, blogs] = await Promise.all([
      prisma.contact.count(),
      prisma.career.count(),
      prisma.trainingEnrollment.count(),
      prisma.blog.count()
    ]);

    return {
      contactsCount: contacts,
      jobApplicationsCount: applications,
      trainingEnrollmentsCount: enrollments,
      blogsCount: blogs
    };
  }
}
