import app from './app';
import { logger } from './config/logger';
import { prisma } from './config/db';

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    // Attempt database connection check
    await prisma.$connect();
    logger.info('Database connection established successfully');
  } catch (error: any) {
    logger.error('⚠️ Database Connection Warning: Could not connect to PostgreSQL. Running server in DB-offline mode: ' + error.message);
  }

  // Always listen on Express port so the server runs successfully
  app.listen(PORT, () => {
    logger.info(`====================================================`);
    logger.info(`Ascope Tech Backend Server running on port: ${PORT}`);
    logger.info(`Mode: ${process.env.NODE_ENV || 'development'}`);
    logger.info(`====================================================`);
  });
};

startServer();

// Handle unexpected process terminations gracefully
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received. Gracefully closing Prisma client database pool');
  await prisma.$disconnect();
  process.exit(0);
});
