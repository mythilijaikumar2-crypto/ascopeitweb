import { Request, Response, NextFunction } from 'express';
import { CareerService } from '../services/careerService';
import { HTTP_STATUS } from '../constants/statusCodes';

const careerService = new CareerService();

export const submitCareer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const application = await careerService.submitApplication(req.body);
    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Job application successfully submitted',
      data: application
    });
  } catch (error) {
    return next(error);
  }
};

export const listCareers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string || '20', 10);
    const offset = parseInt(req.query.offset as string || '0', 10);
    const list = await careerService.getAllApplications(limit, offset);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: list
    });
  } catch (error) {
    return next(error);
  }
};
