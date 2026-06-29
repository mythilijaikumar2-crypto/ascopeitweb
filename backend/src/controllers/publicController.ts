import { Request, Response, NextFunction } from 'express';
import { PublicService } from '../services/publicService';
import { HTTP_STATUS } from '../constants/statusCodes';

const publicService = new PublicService();

// Services
export const listServices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await publicService.getServices();
    return res.status(HTTP_STATUS.OK).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

export const addService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = await publicService.addService(req.body);
    return res.status(HTTP_STATUS.CREATED).json({ success: true, data: service });
  } catch (error) {
    return next(error);
  }
};

// Technologies
export const listTechnologies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await publicService.getTechnologies();
    return res.status(HTTP_STATUS.OK).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

export const addTechnology = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tech = await publicService.addTechnology(req.body);
    return res.status(HTTP_STATUS.CREATED).json({ success: true, data: tech });
  } catch (error) {
    return next(error);
  }
};

// Case Studies
export const listCaseStudies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await publicService.getCaseStudies();
    return res.status(HTTP_STATUS.OK).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

export const addCaseStudy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const study = await publicService.addCaseStudy(req.body);
    return res.status(HTTP_STATUS.CREATED).json({ success: true, data: study });
  } catch (error) {
    return next(error);
  }
};

// Testimonials
export const listTestimonials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await publicService.getTestimonials();
    return res.status(HTTP_STATUS.OK).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

export const addTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const testimonial = await publicService.addTestimonial(req.body);
    return res.status(HTTP_STATUS.CREATED).json({ success: true, data: testimonial });
  } catch (error) {
    return next(error);
  }
};
