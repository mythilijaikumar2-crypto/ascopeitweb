import { prisma } from '../config/db';
import { Internship } from '@prisma/client';

export class InternshipRepository {
  async create(data: {
    trackId: string;
    trackTitle: string;
    name: string;
    email: string;
    phone: string;
    github?: string;
    notes?: string;
    resumeFileId: string;
  }): Promise<Internship> {
    return prisma.internship.create({
      data: {
        trackId: data.trackId,
        trackTitle: data.trackTitle,
        name: data.name,
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
    return prisma.internship.findMany({
      take: limit,
      skip: offset,
      include: { resumeFile: true },
      orderBy: { createdAt: 'desc' }
    });
  }
}
