import { prisma } from '../config/db';
import { UploadedFile } from '@prisma/client';

export class FileRepository {
  async createFile(data: {
    originalName: string;
    fileName: string;
    mimeType: string;
    size: number;
    filePath: string;
  }): Promise<UploadedFile> {
    return prisma.uploadedFile.create({
      data
    });
  }

  async findById(id: string): Promise<UploadedFile | null> {
    return prisma.uploadedFile.findUnique({
      where: { id }
    });
  }
}
