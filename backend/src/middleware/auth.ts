import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from '../constants/statusCodes';
import { AppError } from './errorHandler';
import { prisma } from '../config/db';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretaccesskey';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    fullName: string;
    role: {
      code: string;
    };
  };
}

/**
 * Middleware: Verify client JWT token in headers
 */
export const authenticateJWT = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Access Denied. Authorization token missing.', HTTP_STATUS.UNAUTHORIZED));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };

    // Fetch user and check if active
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        status: true,
        role: {
          select: {
            code: true
          }
        }
      }
    });

    if (!user) {
      return next(new AppError('Authentication failed. User does not exist.', HTTP_STATUS.UNAUTHORIZED));
    }

    if (user.status !== 'ACTIVE') {
      return next(new AppError('Your account has been deactivated.', HTTP_STATUS.FORBIDDEN));
    }

    req.user = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: {
        code: user.role.code
      }
    };

    return next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Access Token expired.', HTTP_STATUS.UNAUTHORIZED));
    }
    return next(new AppError('Invalid authentication token.', HTTP_STATUS.UNAUTHORIZED));
  }
};

/**
 * Middleware: Role check authorization (RBAC)
 */
export const requireRoles = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role) {
      return next(new AppError('Unauthorized. Session missing user attributes.', HTTP_STATUS.UNAUTHORIZED));
    }

    const hasRole = allowedRoles.includes(req.user.role.code);
    if (!hasRole) {
      return next(new AppError('Access forbidden. Insufficient permissions.', HTTP_STATUS.FORBIDDEN));
    }

    return next();
  };
};
