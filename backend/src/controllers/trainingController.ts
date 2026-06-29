import { Request, Response, NextFunction } from 'express';
import { TrainingService } from '../services/trainingService';
import { HTTP_STATUS } from '../constants/statusCodes';

const trainingService = new TrainingService();

export const enroll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const enrollment = await trainingService.enroll(req.body);
    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Bootcamp enrollment query successfully submitted',
      data: enrollment
    });
  } catch (error) {
    return next(error);
  }
};

export const listEnrollments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string || '20', 10);
    const offset = parseInt(req.query.offset as string || '0', 10);
    const list = await trainingService.getAllEnrollments(limit, offset);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: list
    });
  } catch (error) {
    return next(error);
  }
};
