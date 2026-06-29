import { prisma } from '../config/db';
import { Contact } from '@prisma/client';

export class ContactRepository {
  async create(data: {
    fullName: string;
    company: string;
    email: string;
    scope: string;
    budget: string;
    brief: string;
    servicesNeeded?: string[];
  }): Promise<Contact> {
    return prisma.contact.create({
      data: {
        fullName: data.fullName,
        company: data.company,
        email: data.email,
        scope: data.scope,
        budget: data.budget,
        brief: data.brief,
        servicesNeeded: data.servicesNeeded || []
      }
    });
  }

  async findAll(limit: number = 20, offset: number = 0) {
    return prisma.contact.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' }
    });
  }
}
