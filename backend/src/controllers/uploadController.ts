import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { FileRepository } from '../repositories/fileRepository';
import { AppError } from '../middleware/errorHandler';
import { HTTP_STATUS } from '../constants/statusCodes';
import { logger } from '../config/logger';

const fileRepository = new FileRepository();

// Configure storage location locally
const UPLOADS_DIR = path.join(__dirname, '../../uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${uuidv4()}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const ext = path.extname(file.originalname).toLowerCase();
  const isAllowedExt = allowedExtensions.includes(ext);
  const isAllowedMime = allowedMimeTypes.includes(file.mimetype);

  if (isAllowedExt && isAllowedMime) {
    cb(null, true);
  } else {
    cb(new AppError('Invalid file type. Only PDF, DOC, and DOCX are accepted.', HTTP_STATUS.BAD_REQUEST));
  }
};

export const uploadConfig = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB max file size
  }
});

export const handleFileUpload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return next(new AppError('No file uploaded', HTTP_STATUS.BAD_REQUEST));
    }

    const metadata = await fileRepository.createFile({
      originalName: req.file.originalname,
      fileName: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      filePath: req.file.path
    });

    logger.info(`Upload: Metadata logged for file: ${req.file.filename}`);

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'File uploaded and metadata registered successfully',
      data: {
        fileId: metadata.id,
        originalName: metadata.originalName,
        mimeType: metadata.mimeType,
        size: metadata.size
      }
    });
  } catch (error) {
    return next(error);
  }
};
