import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/userRepository';
import { AppError } from '../middleware/errorHandler';
import { HTTP_STATUS } from '../constants/statusCodes';
import { logger } from '../config/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretaccesskey';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'supersecretrefreshkey';

export class UserService {
  private userRepository = new UserRepository();

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid email or password', HTTP_STATUS.UNAUTHORIZED);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new AppError('Invalid email or password', HTTP_STATUS.UNAUTHORIZED);
    }

    if (user.status !== 'ACTIVE') {
      throw new AppError('Account is currently inactive', HTTP_STATUS.FORBIDDEN);
    }

    // Generate tokens
    const accessToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user.id, email: user.email }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

    logger.info(`Auth: User ${user.email} successfully logged in`);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role.code
      }
    };
  }

  async refresh(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as { id: string; email: string };
      const user = await this.userRepository.findById(decoded.id);

      if (!user || user.status !== 'ACTIVE') {
        throw new AppError('Invalid session parameter', HTTP_STATUS.UNAUTHORIZED);
      }

      const accessToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ id: user.id, email: user.email }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

      return { accessToken, refreshToken };
    } catch (error) {
      throw new AppError('Session refresh token expired or invalid', HTTP_STATUS.UNAUTHORIZED);
    }
  }

  async getAdminDashboardStats() {
    return this.userRepository.getDashboardStats();
  }
}
