import { CareerRepository, CreateCareerData, UpdateCareerData } from '../repositories/careerRepository';
import { sendEmail, getCareerConfirmationTemplate } from '../utils/emails';
import { logger } from '../config/logger';
import { AppError } from '../middleware/errorHandler';
import { HTTP_STATUS } from '../constants/statusCodes';
import { ALLOWED_MIME_TYPES, MAX_RESUME_SIZE_BYTES } from '../controllers/uploadController';
import path from 'path';

export class CareerService {
  private careerRepository = new CareerRepository();

  // ─── Submit new application ─────────────────────────────────────────────────
  async submitApplication(
    formData: {
      jobId: string;
      jobTitle: string;
      fullName: string;
      email: string;
      phone: string;
      github?: string;
      notes?: string;
    },
    file: Express.Multer.File
  ) {
    this.validateResumeFile(file);

    const data: CreateCareerData = {
      ...formData,
      resumeName: file.originalname,
      resumeType: file.mimetype,
      resumeSize: file.size,
      resumeData: file.buffer
    };

    const application = await this.careerRepository.create(data);

    logger.info(`Careers: Application saved from ${formData.email} for role: ${formData.jobTitle}`);

    sendEmail(
      formData.email,
      'Ascope Tech – Job Application Confirmation',
      getCareerConfirmationTemplate(formData.fullName, formData.jobTitle)
    ).catch((err) => logger.error('Async mail dispatch error:', err));

    return application;
  }

  // ─── Get all applications (metadata only, no BYTEA) ─────────────────────────
  async getAllApplications(limit: number, offset: number) {
    return this.careerRepository.findAll(limit, offset);
  }

  // ─── Get single application metadata ────────────────────────────────────────
  async getApplicationById(id: string) {
    const application = await this.careerRepository.findById(id);
    if (!application) {
      throw new AppError('Candidate application not found', HTTP_STATUS.NOT_FOUND);
    }
    return application;
  }

  // ─── Update candidate (optionally replace resume) ───────────────────────────
  async updateApplication(
    id: string,
    formData: Partial<{
      jobTitle: string;
      fullName: string;
      email: string;
      phone: string;
      github: string;
      notes: string;
      status: string;
    }>,
    file?: Express.Multer.File
  ) {
    // Verify record exists
    const existing = await this.careerRepository.findById(id);
    if (!existing) {
      throw new AppError('Candidate application not found', HTTP_STATUS.NOT_FOUND);
    }

    const updateData: UpdateCareerData = { ...formData };

    if (file) {
      this.validateResumeFile(file);
      updateData.resumeName = file.originalname;
      updateData.resumeType = file.mimetype;
      updateData.resumeSize = file.size;
      updateData.resumeData = file.buffer;
    }

    const updated = await this.careerRepository.update(id, updateData);
    logger.info(`Careers: Application ${id} updated`);
    return updated;
  }

  // ─── Delete candidate ───────────────────────────────────────────────────────
  async deleteApplication(id: string) {
    const existing = await this.careerRepository.findById(id);
    if (!existing) {
      throw new AppError('Candidate application not found', HTTP_STATUS.NOT_FOUND);
    }
    const deleted = await this.careerRepository.delete(id);
    logger.info(`Careers: Application ${id} deleted`);
    return deleted;
  }

  // ─── Get resume binary for streaming ────────────────────────────────────────
  async getResumeBuffer(id: string) {
    const row = await this.careerRepository.findResumeById(id);
    if (!row || !row.resumeData) {
      throw new AppError('Resume not found for this candidate', HTTP_STATUS.NOT_FOUND);
    }
    return {
      buffer: row.resumeData as Buffer,
      name: row.resumeName as string,
      mimeType: row.resumeType as string
    };
  }

  // ─── Internal validation helper ─────────────────────────────────────────────
  private validateResumeFile(file: Express.Multer.File) {
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExts = ['.pdf', '.doc', '.docx'];

    if (!allowedExts.includes(ext) || !ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new AppError(
        'Invalid file type. Only PDF, DOC, and DOCX are accepted.',
        HTTP_STATUS.BAD_REQUEST
      );
    }

    if (file.size > MAX_RESUME_SIZE_BYTES) {
      throw new AppError('Resume size should not exceed 2 MB.', HTTP_STATUS.BAD_REQUEST);
    }

    if (!file.buffer || file.buffer.length === 0) {
      throw new AppError('Uploaded resume file appears to be corrupted or empty.', HTTP_STATUS.BAD_REQUEST);
    }
  }
}
