import { prisma } from '../config/db';
import { TrainingEnrollment } from '@prisma/client';

export class TrainingRepository {
  async create(data: {
    name: string;
    email: string;
    phone: string;
    course: string;
    experience: string;
  }): Promise<TrainingEnrollment> {
    return prisma.trainingEnrollment.create({
      data
    });
  }

  async findAll(limit: number = 20, offset: number = 0) {
    return prisma.trainingEnrollment.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' }
    });
  }
}
