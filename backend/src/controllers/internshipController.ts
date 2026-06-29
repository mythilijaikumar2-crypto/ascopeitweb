import { Request, Response, NextFunction } from 'express';
import { InternshipService } from '../services/internshipService';
import { HTTP_STATUS } from '../constants/statusCodes';

const internshipService = new InternshipService();

export const submitInternship = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const application = await internshipService.submitApplication(req.body);
    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Internship application successfully submitted',
      data: application
    });
  } catch (error) {
    return next(error);
  }
};

export const listInternships = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string || '20', 10);
    const offset = parseInt(req.query.offset as string || '0', 10);
    const list = await internshipService.getAllApplications(limit, offset);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: list
    });
  } catch (error) {
    return next(error);
  }
};
