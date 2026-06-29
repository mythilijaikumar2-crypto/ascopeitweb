import winston from 'winston';
import path from 'path';

const LOGS_DIR = path.join(__dirname, '../../logs');

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: logFormat,
  defaultMeta: { service: 'ascope-tech-backend' },
  transports: [
    new winston.transports.File({ 
      filename: path.join(LOGS_DIR, 'error.log'), 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: path.join(LOGS_DIR, 'combined.log') 
    })
  ]
});

// If in development mode, log additionally to console with formatting colors
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}
