import nodemailer from 'nodemailer';
import { logger } from './logger';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.mailtrap.io';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '2525', 10);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';

export const mailTransporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: SMTP_USER && SMTP_PASS ? {
    user: SMTP_USER,
    pass: SMTP_PASS
  } : undefined
});

// Verify email connection config on start
mailTransporter.verify((error, success) => {
  if (error) {
    logger.warn('Nodemailer: SMTP connection test failed. Mails will run in mock mode: ' + error.message);
  } else {
    logger.info('Nodemailer: SMTP server is configured and ready to dispatch emails');
  }
});
