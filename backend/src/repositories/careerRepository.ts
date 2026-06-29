import { prisma } from '../config/db';
import { Career } from '@prisma/client';

export class CareerRepository {
  async create(data: {
    jobId: string;
    jobTitle: string;
    fullName: string;
    email: string;
    phone: string;
    github?: string;
    notes?: string;
    resumeFileId: string;
  }): Promise<Career> {
    return prisma.career.create({
      data: {
        jobId: data.jobId,
        jobTitle: data.jobTitle,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        github: data.github,
        notes: data.notes,
        resumeFileId: data.resumeFileId
      },
      include: {
        resumeFile: true
      }
    });
  }

  async findAll(limit: number = 20, offset: number = 0) {
    return prisma.career.findMany({
      take: limit,
      skip: offset,
      include: { resumeFile: true },
      orderBy: { createdAt: 'desc' }
    });
  }
}
