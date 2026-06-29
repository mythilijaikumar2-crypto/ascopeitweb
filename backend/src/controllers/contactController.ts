import { Request, Response, NextFunction } from 'express';
import { ContactService } from '../services/contactService';
import { HTTP_STATUS } from '../constants/statusCodes';

const contactService = new ContactService();

export const submitContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contact = await contactService.submitContact(req.body);
    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Scoping query successfully received',
      data: contact
    });
  } catch (error) {
    return next(error);
  }
};

export const listInquiries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string || '20', 10);
    const offset = parseInt(req.query.offset as string || '0', 10);
    const list = await contactService.getAllInquiries(limit, offset);
    
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: list
    });
  } catch (error) {
    return next(error);
  }
};
