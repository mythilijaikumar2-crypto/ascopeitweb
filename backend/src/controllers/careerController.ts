import { Request, Response, NextFunction } from 'express';
import { CareerService } from '../services/careerService';
import { HTTP_STATUS } from '../constants/statusCodes';
import { AppError } from '../middleware/errorHandler';

const careerService = new CareerService();

// ─── POST /api/careers/apply ─────────────────────────────────────────────────
// Public: Submit a job application with resume (multipart/form-data)
export const submitCareer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return next(new AppError('Resume file is required. Please upload a PDF, DOC, or DOCX.', HTTP_STATUS.BAD_REQUEST));
    }

    const { jobId, jobTitle, fullName, email, phone, github, notes } = req.body;

    if (!jobId || !jobTitle || !fullName || !email || !phone) {
      return next(new AppError('Missing required fields: jobId, jobTitle, fullName, email, phone.', HTTP_STATUS.BAD_REQUEST));
    }

    const application = await careerService.submitApplication(
      { jobId, jobTitle, fullName, email, phone, github, notes },
      req.file
    );

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Job application submitted successfully. Your resume has been stored securely.',
      data: application
    });
  } catch (error) {
    return next(error);
  }
};

// ─── GET /api/careers/list ───────────────────────────────────────────────────
// Protected (HR/Admin): List all candidate applications (no binary)
export const listCareers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string || '20', 10), 100);
    const offset = parseInt(req.query.offset as string || '0', 10);
    const list = await careerService.getAllApplications(limit, offset);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: list,
      meta: { limit, offset, count: list.length }
    });
  } catch (error) {
    return next(error);
  }
};

// ─── GET /api/careers/:id ────────────────────────────────────────────────────
// Protected (HR/Admin): Get single candidate metadata
export const getCareer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const application = await careerService.getApplicationById(id);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: application
    });
  } catch (error) {
    return next(error);
  }
};

// ─── PUT /api/careers/:id ────────────────────────────────────────────────────
// Protected (HR/Admin): Update candidate info and/or replace resume
export const updateCareer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { jobTitle, fullName, email, phone, github, notes, status } = req.body;

    const updated = await careerService.updateApplication(
      id,
      { jobTitle, fullName, email, phone, github, notes, status },
      req.file
    );

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Candidate application updated successfully.',
      data: updated
    });
  } catch (error) {
    return next(error);
  }
};

// ─── DELETE /api/careers/:id ─────────────────────────────────────────────────
// Protected (HR/Admin): Delete candidate and their resume from database
export const deleteCareer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = await careerService.deleteApplication(id);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Candidate application and resume deleted successfully.',
      data: deleted
    });
  } catch (error) {
    return next(error);
  }
};

// ─── GET /api/careers/:id/resume ─────────────────────────────────────────────
// Protected (HR/Admin): Stream resume binary from DB
// ?download=true  → triggers browser download with original filename
// ?download=false (default) → opens inline in browser (preview)
export const getCareerResume = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const forceDownload = req.query.download === 'true';

    const { buffer, name, mimeType } = await careerService.getResumeBuffer(id);

    // Sanitize filename for Content-Disposition header
    const safeFilename = name.replace(/[^a-zA-Z0-9._-]/g, '_');

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Length', buffer.length);
    res.setHeader(
      'Content-Disposition',
      `${forceDownload ? 'attachment' : 'inline'}; filename="${safeFilename}"`
    );
    res.setHeader('Cache-Control', 'no-store');

    return res.end(buffer);
  } catch (error) {
    return next(error);
  }
};
