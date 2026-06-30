import { z } from 'zod';

// 1. Auth Login Validator
export const loginSchema = z.object({
  email: z.string().email('Provide a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

// 2. Contact Form Validator
export const contactSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(2, 'Company must be at least 2 characters'),
  email: z.string().email('Provide a valid email address'),
  scope: z.string().min(1, 'Select a scoping timeline'),
  budget: z.string().min(1, 'Select a budget bracket'),
  brief: z.string().min(10, 'Brief description must be at least 10 characters'),
  servicesNeeded: z.array(z.string()).optional()
});

// 3. Careers Job Apply Validator (resume comes as multipart file, not JSON)
export const careerApplySchema = z.object({
  jobId: z.string().min(1, 'Provide a valid jobId'),
  jobTitle: z.string().min(2, 'Provide a valid jobTitle'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Provide a valid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  github: z.string().url('Provide a valid GitHub profile URL').optional().or(z.literal('')),
  notes: z.string().optional()
});

// 3b. Career Update Validator (all fields optional for partial update)
export const careerUpdateSchema = z.object({
  jobTitle: z.string().min(2).optional(),
  fullName: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(8).optional(),
  github: z.string().url().optional().or(z.literal('')),
  notes: z.string().optional(),
  status: z.enum(['SUBMITTED', 'REVIEWED', 'HIRED', 'REJECTED']).optional()
});

// 4. Internship Track Apply Validator
export const internshipApplySchema = z.object({
  trackId: z.string().min(1, 'Provide a valid trackId'),
  trackTitle: z.string().min(2, 'Provide a valid trackTitle'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Provide a valid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  github: z.string().url('Provide a valid GitHub profile URL').optional().or(z.literal('')),
  notes: z.string().optional(),
  resumeFileId: z.string().uuid('Provide a valid resumeFileId UUID')
});

// 5. Training Enrollment Validator
export const trainingEnrollSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Provide a valid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  course: z.string().min(2, 'Course is required'),
  experience: z.string().min(2, 'Experience level is required')
});

// 6. Blog Creation Validator
export const blogCreateSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  categoryId: z.string().uuid('Provide a valid categoryId UUID'),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT')
});

// 7. Case Study Creation Validator
export const caseStudyCreateSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  client: z.string().min(2, 'Client name is required'),
  summary: z.string().min(10, 'Summary is required'),
  metrics: z.array(z.string()).optional()
});

// 8. Service Creation Validator
export const serviceCreateSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(10, 'Description is required'),
  details: z.string().min(20, 'Details section is required'),
  features: z.array(z.string()).optional()
});

// 9. Technology Creation Validator
export const technologyCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.enum(['FRONTEND', 'BACKEND', 'DATABASE', 'CLOUD'])
});
