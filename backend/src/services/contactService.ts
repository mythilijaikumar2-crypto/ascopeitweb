import { ContactRepository } from '../repositories/contactRepository';
import { sendEmail, getContactConfirmationTemplate } from '../utils/emails';
import { logger } from '../config/logger';

export class ContactService {
  private contactRepository = new ContactRepository();

  async submitContact(data: {
    fullName: string;
    company: string;
    email: string;
    scope: string;
    budget: string;
    brief: string;
    servicesNeeded?: string[];
  }) {
    const contact = await this.contactRepository.create(data);
    logger.info(`Contact: Saved query from ${data.email} (${data.company})`);

    // Dispatch email asynchronously so it doesn't block the HTTP response
    sendEmail(
      data.email,
      'Ascope Tech - Scoping Query Registered',
      getContactConfirmationTemplate(data.fullName)
    ).catch((err) => logger.error('Async mail dispatch error:', err));

    return contact;
  }

  async getAllInquiries(limit: number, offset: number) {
    return this.contactRepository.findAll(limit, offset);
  }
}
