import multer from 'multer';
import path from 'path';
import { AppError } from '../middleware/errorHandler';
import { HTTP_STATUS } from '../constants/statusCodes';

// ─── Allowed resume types ─────────────────────────────────────────────────────
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

// Max resume size: 2 MB
const MAX_RESUME_SIZE_BYTES = 2 * 1024 * 1024;

// ─── Multer memory storage (no files written to disk) ────────────────────────
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const isAllowedExt = ALLOWED_EXTENSIONS.includes(ext);
  const isAllowedMime = ALLOWED_MIME_TYPES.includes(file.mimetype);

  if (isAllowedExt && isAllowedMime) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        'Invalid file type. Only PDF, DOC, and DOCX resumes are accepted.',
        HTTP_STATUS.BAD_REQUEST
      )
    );
  }
};

export const resumeUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: MAX_RESUME_SIZE_BYTES
  }
});

export { MAX_RESUME_SIZE_BYTES, ALLOWED_MIME_TYPES, ALLOWED_EXTENSIONS };
