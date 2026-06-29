import { InternshipRepository } from '../repositories/internshipRepository';
import { sendEmail, getInternshipConfirmationTemplate } from '../utils/emails';
import { logger } from '../config/logger';

export class InternshipService {
  private internshipRepository = new InternshipRepository();

  async submitApplication(data: {
    trackId: string;
    trackTitle: string;
    name: string;
    email: string;
    phone: string;
    github?: string;
    notes?: string;
    resumeFileId: string;
  }) {
    const application = await this.internshipRepository.create(data);
    logger.info(`Internship: Track application saved from ${data.email} for: ${data.trackTitle}`);

    sendEmail(
      data.email,
      'Ascope Tech - Internship Registration Confirmed',
      getInternshipConfirmationTemplate(data.name, data.trackTitle)
    ).catch((err) => logger.error('Async mail dispatch error:', err));

    return application;
  }

  async getAllApplications(limit: number, offset: number) {
    return this.internshipRepository.findAll(limit, offset);
  }
}
