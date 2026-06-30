import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment configurations
dotenv.config();

import { apiRouter } from './routes/api';
import { errorHandler, AppError } from './middleware/errorHandler';
import { generalLimiter } from './middleware/rateLimiter';
import { HTTP_STATUS } from './constants/statusCodes';

const app = express();

// Fix: BigInt cannot be serialized by JSON.stringify by default.
// resumeSize is stored as BIGINT in PostgreSQL and returned as BigInt by Prisma.
// We convert it to a Number automatically in every JSON response.
(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

// Enable security headers via Helmet
app.use(helmet());

// Enable Cross-Origin Resource Sharing
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Compress all HTTP response payloads
app.use(compression());

// Setup HTTP request logging via Morgan
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Parse incoming request JSON payloads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply rate limiting to all REST API endpoints
app.use('/api', generalLimiter);

// Root health check route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Ascope Tech Backend API is running 🚀',
    version: '1.0.0',
    docs: '/api',
    timestamp: new Date().toISOString()
  });
});

// Bind main API router mapping
app.use('/api', apiRouter);

// Fallback error handler for invalid/missing routes
app.use((req, res, next) => {
  next(new AppError(`Endpoint ${req.originalUrl} not found`, HTTP_STATUS.NOT_FOUND));
});

// Centralized error handling middleware
app.use(errorHandler);

export default app;
