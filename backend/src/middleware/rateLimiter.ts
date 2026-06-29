import rateLimit from 'express-rate-limit';
import { HTTP_STATUS } from '../constants/statusCodes';

// General API rate limiter: max 100 requests per 15 minutes per IP
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.'
  },
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false
});

// Authentication rate limiter: stricter settings to avoid brute-forcing
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 15, // limit each IP to 15 login attempts per hour
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again after an hour.'
  },
  statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false
});
