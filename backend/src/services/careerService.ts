import { CareerRepository } from '../repositories/careerRepository';
import { sendEmail, getCareerConfirmationTemplate } from '../utils/emails';
import { logger } from '../config/logger';

export class CareerService {
  private careerRepository = new CareerRepository();

  async submitApplication(data: {
    jobId: string;
    jobTitle: string;
    fullName: string;
    email: string;
    phone: string;
    github?: string;
    notes?: string;
    resumeFileId: string;
  }) {
    const application = await this.careerRepository.create(data);
    logger.info(`Careers: Application saved from ${data.email} for role: ${data.jobTitle}`);

    sendEmail(
      data.email,
      `Ascope Tech - Job Application Confirmation`,
      getCareerConfirmationTemplate(data.fullName, data.jobTitle)
    ).catch((err) => logger.error('Async mail dispatch error:', err));

    return application;
  }

  async getAllApplications(limit: number, offset: number) {
    return this.careerRepository.findAll(limit, offset);
  }
}
