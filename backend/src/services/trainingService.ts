import { TrainingRepository } from '../repositories/trainingRepository';
import { sendEmail, getTrainingConfirmationTemplate } from '../utils/emails';
import { logger } from '../config/logger';

export class TrainingService {
  private trainingRepository = new TrainingRepository();

  async enroll(data: {
    name: string;
    email: string;
    phone: string;
    course: string;
    experience: string;
  }) {
    const enrollment = await this.trainingRepository.create(data);
    logger.info(`Training: Enrollment registered from ${data.email} for course: ${data.course}`);

    sendEmail(
      data.email,
      'Ascope Tech - Bootcamp Enrollment Registered',
      getTrainingConfirmationTemplate(data.name, data.course)
    ).catch((err) => logger.error('Async mail dispatch error:', err));

    return enrollment;
  }

  async getAllEnrollments(limit: number, offset: number) {
    return this.trainingRepository.findAll(limit, offset);
  }
}
