import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';
import { HTTP_STATUS } from '../constants/statusCodes';
import { AuthenticatedRequest } from '../middleware/auth';

const userService = new UserService();

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Login successful',
      data: result
    });
  } catch (error) {
    return next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    const result = await userService.refresh(refreshToken);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Tokens successfully refreshed',
      data: result
    });
  } catch (error) {
    return next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  // Client discards token on state. Return immediate success response.
  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Session closed successfully'
  });
};

export const getDashboardStats = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const stats = await userService.getAdminDashboardStats();
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: stats
    });
  } catch (error) {
    return next(error);
  }
};
