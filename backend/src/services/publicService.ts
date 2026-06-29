import { ServiceRepository } from '../repositories/serviceRepository';
import { logger } from '../config/logger';

export class PublicService {
  private serviceRepository = new ServiceRepository();

  // Services
  async getServices() {
    return this.serviceRepository.findAllServices();
  }

  async addService(data: {
    title: string;
    description: string;
    details: string;
    features?: string[];
  }) {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return this.serviceRepository.createService({ ...data, slug });
  }

  // Technologies
  async getTechnologies() {
    return this.serviceRepository.findAllTechnologies();
  }

  async addTechnology(data: { name: string; category: string }) {
    return this.serviceRepository.createTechnology(data);
  }

  // Case Studies
  async getCaseStudies() {
    return this.serviceRepository.findAllCaseStudies();
  }

  async addCaseStudy(data: {
    title: string;
    client: string;
    summary: string;
    metrics?: string[];
  }) {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return this.serviceRepository.createCaseStudy({ ...data, slug });
  }

  // Testimonials
  async getTestimonials() {
    return this.serviceRepository.findAllTestimonials();
  }

  async addTestimonial(data: {
    clientName: string;
    company: string;
    feedback: string;
    rating?: number;
  }) {
    return this.serviceRepository.createTestimonial(data);
  }
}
