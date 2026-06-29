import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

export const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'error' },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'warn' }
  ]
});

// Bind Prisma logs to our Winston logger
prisma.$on('query', (e) => {
  logger.debug(`Query: ${e.query} | Params: ${e.params} | Duration: ${e.duration}ms`);
});

prisma.$on('error', (e) => {
  logger.error(`Prisma DB Error: ${e.message}`);
});

prisma.$on('info', (e) => {
  logger.info(`Prisma Info: ${e.message}`);
});

prisma.$on('warn', (e) => {
  logger.warn(`Prisma Warning: ${e.message}`);
});
