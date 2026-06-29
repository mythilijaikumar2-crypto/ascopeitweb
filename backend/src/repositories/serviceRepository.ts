import { prisma } from '../config/db';
import { Service, Technology, CaseStudy, Testimonial } from '@prisma/client';

export class ServiceRepository {
  // Services
  async findAllServices(): Promise<Service[]> {
    return prisma.service.findMany({
      orderBy: { title: 'asc' }
    });
  }

  async createService(data: {
    title: string;
    slug: string;
    description: string;
    details: string;
    features?: string[];
  }): Promise<Service> {
    return prisma.service.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        details: data.details,
        features: data.features || []
      }
    });
  }

  // Technologies
  async findAllTechnologies(): Promise<Technology[]> {
    return prisma.technology.findMany({
      orderBy: { category: 'asc' }
    });
  }

  async createTechnology(data: {
    name: string;
    category: string;
  }): Promise<Technology> {
    return prisma.technology.create({
      data
    });
  }

  // Case Studies
  async findAllCaseStudies(): Promise<CaseStudy[]> {
    return prisma.caseStudy.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createCaseStudy(data: {
    title: string;
    slug: string;
    client: string;
    summary: string;
    metrics?: string[];
  }): Promise<CaseStudy> {
    return prisma.caseStudy.create({
      data: {
        title: data.title,
        slug: data.slug,
        client: data.client,
        summary: data.summary,
        metrics: data.metrics || []
      }
    });
  }

  // Testimonials
  async findAllTestimonials(): Promise<Testimonial[]> {
    return prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async createTestimonial(data: {
    clientName: string;
    company: string;
    feedback: string;
    rating?: number;
  }): Promise<Testimonial> {
    return prisma.testimonial.create({
      data
    });
  }
}
