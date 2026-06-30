import { prisma } from '../config/db';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CreateCareerData {
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  github?: string;
  notes?: string;
  resumeName: string;
  resumeType: string;
  resumeSize: number;
  resumeData: Buffer;
}

export interface UpdateCareerData {
  jobTitle?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  github?: string;
  notes?: string;
  status?: string;
  resumeName?: string;
  resumeType?: string;
  resumeSize?: number;
  resumeData?: Buffer;
}

// ─── Shared select (excludes BYTEA binary for list/detail queries) ─────────────
const metaSelect = {
  id: true,
  jobId: true,
  jobTitle: true,
  fullName: true,
  email: true,
  phone: true,
  github: true,
  notes: true,
  resumeName: true,
  resumeType: true,
  resumeSize: true,
  uploadedAt: true,
  status: true,
  createdAt: true,
  updatedAt: true
};

export class CareerRepository {
  /** Insert a new job application with resume binary */
  async create(data: CreateCareerData) {
    return prisma.career.create({
      data: {
        jobId: data.jobId,
        jobTitle: data.jobTitle,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        github: data.github,
        notes: data.notes,
        resumeName: data.resumeName,
        resumeType: data.resumeType,
        resumeSize: data.resumeSize,
        resumeData: data.resumeData,
        uploadedAt: new Date()
      },
      select: metaSelect
    });
  }

  /** Fetch all applications – never loads BYTEA binary */
  async findAll(limit: number = 20, offset: number = 0) {
    return prisma.career.findMany({
      take: limit,
      skip: offset,
      select: metaSelect,
      orderBy: { createdAt: 'desc' }
    });
  }

  /** Fetch single application metadata – never loads BYTEA binary */
  async findById(id: string) {
    return prisma.career.findUnique({
      where: { id },
      select: metaSelect
    });
  }

  /** Fetch only the resume binary for streaming – no other fields */
  async findResumeById(id: string) {
    return prisma.career.findUnique({
      where: { id },
      select: {
        resumeData: true,
        resumeName: true,
        resumeType: true
      }
    });
  }

  /** Partial update – replaces resume if new buffer provided */
  async update(id: string, data: UpdateCareerData) {
    return prisma.career.update({
      where: { id },
      data: {
        ...(data.jobTitle !== undefined && { jobTitle: data.jobTitle }),
        ...(data.fullName !== undefined && { fullName: data.fullName }),
        ...(data.email !== undefined && { email: data.email }),
        ...(data.phone !== undefined && { phone: data.phone }),
        ...(data.github !== undefined && { github: data.github }),
        ...(data.notes !== undefined && { notes: data.notes }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.resumeData !== undefined && {
          resumeData: data.resumeData,
          resumeName: data.resumeName,
          resumeType: data.resumeType,
          resumeSize: data.resumeSize,
          uploadedAt: new Date()
        })
      },
      select: metaSelect
    });
  }

  /** Hard delete a candidate record */
  async delete(id: string) {
    return prisma.career.delete({
      where: { id },
      select: { id: true, fullName: true, email: true }
    });
  }
}
