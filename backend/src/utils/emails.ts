import { mailTransporter } from '../config/mail';
import { logger } from '../config/logger';

export const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: `"Ascope Tech Integration" <noreply@ascopetech.com>`,
    to,
    subject,
    html
  };

  try {
    // If SMTP is not fully configured, fall back to console logging
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      logger.info(`[Email Mock Service] Dispatching mail to: ${to} | Subject: ${subject}`);
      return { success: true, messageId: 'mock-message-id' };
    }

    const info = await mailTransporter.sendMail(mailOptions);
    logger.info(`Email successfully dispatched: ${info.messageId} to ${to}`);
    return info;
  } catch (error: any) {
    logger.error(`Nodemailer: Failed to dispatch email to: ${to}. Error: ${error.message}`);
    // Do not crash the application if email dispatching fails
    return { success: false, error: error.message };
  }
};

export const getContactConfirmationTemplate = (name: string) => `
  <div style="font-family: sans-serif; padding: 24px; color: #1e293b; background-color: #f8fafc;">
    <h2 style="color: #0d9488;">Scoping Query Received</h2>
    <p>Hello ${name},</p>
    <p>Thank you for reaching out to <strong>Ascope Tech</strong>. We have successfully registered your scoping query.</p>
    <p>Our senior technology architects are reviewing your requirements and will follow up with an initial design estimation brief within 24 hours.</p>
    <br/>
    <p>Best Regards,</p>
    <p><strong>Ascope Tech Architect Team</strong></p>
  </div>
`;

export const getCareerConfirmationTemplate = (name: string, role: string) => `
  <div style="font-family: sans-serif; padding: 24px; color: #1e293b; background-color: #f8fafc;">
    <h2 style="color: #0d9488;">Application Received</h2>
    <p>Hello ${name},</p>
    <p>Thank you for applying for the <strong>${role}</strong> role at Ascope Tech.</p>
    <p>Our engineering review panel conducts initial code and repository alignment audits weekly. If your skills match our guidelines, we will contact you to schedule a technical peer interview.</p>
    <br/>
    <p>Best Regards,</p>
    <p><strong>Ascope Tech HR & Engineering Team</strong></p>
  </div>
`;

export const getInternshipConfirmationTemplate = (name: string, track: string) => `
  <div style="font-family: sans-serif; padding: 24px; color: #1e293b; background-color: #f8fafc;">
    <h2 style="color: #0d9488;">Internship Registration Confirmed</h2>
    <p>Hello ${name},</p>
    <p>Your application for the <strong>${track}</strong> internship track is registered.</p>
    <p>Selected candidates will receive access coordinates to our sandbox training repositories and an invitation to meet the mentoring leads.</p>
    <br/>
    <p>Best Regards,</p>
    <p><strong>Ascope Tech Mentorship Team</strong></p>
  </div>
`;

export const getTrainingConfirmationTemplate = (name: string, course: string) => `
  <div style="font-family: sans-serif; padding: 24px; color: #1e293b; background-color: #f8fafc;">
    <h2 style="color: #0d9488;">Bootcamp Enrolment Registered</h2>
    <p>Hello ${name},</p>
    <p>Thank you for enrolling in the <strong>${course}</strong> training bootcamp.</p>
    <p>We are reviewing your experience profile. Orientation details and workspace Slack coordinates will be sent shortly.</p>
    <br/>
    <p>Best Regards,</p>
    <p><strong>Ascope Tech Bootcamp Registrar</strong></p>
  </div>
`;
