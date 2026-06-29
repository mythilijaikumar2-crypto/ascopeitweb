import { Router } from 'express';
import * as authController from '../controllers/authController';
import * as contactController from '../controllers/contactController';
import * as careerController from '../controllers/careerController';
import * as internshipController from '../controllers/internshipController';
import * as trainingController from '../controllers/trainingController';
import * as blogController from '../controllers/blogController';
import * as publicController from '../controllers/publicController';
import * as uploadController from '../controllers/uploadController';

import { authenticateJWT, requireRoles } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import { authLimiter } from '../middleware/rateLimiter';
import { ROLES } from '../constants/roles';
import * as schemas from '../validators/schema';

const router = Router();

// ================= AUTH ROUTES =================
router.post('/auth/login', authLimiter, validateRequest(schemas.loginSchema), authController.login);
router.post('/auth/refresh', authController.refresh);
router.post('/auth/logout', authController.logout);

// Admin Dashboard stats (Protected to ADMIN & SUPER_ADMIN)
router.get(
  '/dashboard',
  authenticateJWT,
  requireRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  authController.getDashboardStats
);

// ================= SCOPING & FORM INQUIRIES =================
router.post('/contact', validateRequest(schemas.contactSchema), contactController.submitContact);
router.post('/careers/apply', validateRequest(schemas.careerApplySchema), careerController.submitCareer);
router.post('/internship/apply', validateRequest(schemas.internshipApplySchema), internshipController.submitInternship);
router.post('/training/enroll', validateRequest(schemas.trainingEnrollSchema), trainingController.enroll);

// Admin List endpoints (Protected to SUPER_ADMIN, ADMIN, HR)
router.get(
  '/contacts/list',
  authenticateJWT,
  requireRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  contactController.listInquiries
);
router.get(
  '/careers/list',
  authenticateJWT,
  requireRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.HR]),
  careerController.listCareers
);
router.get(
  '/internships/list',
  authenticateJWT,
  requireRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.HR]),
  internshipController.listInternships
);
router.get(
  '/training/list',
  authenticateJWT,
  requireRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.HR]),
  trainingController.listEnrollments
);

// ================= BLOG ROUTES =================
router.get('/blogs/categories', blogController.listCategories);
router.get('/blogs', blogController.listBlogs);
router.get('/blogs/:slug', blogController.getBlogDetail);
router.post(
  '/blogs',
  authenticateJWT,
  requireRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MARKETING]),
  validateRequest(schemas.blogCreateSchema),
  blogController.createBlog
);

// ================= PUBLIC RESOURCES ROUTES =================
router.get('/services', publicController.listServices);
router.post(
  '/services',
  authenticateJWT,
  requireRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  validateRequest(schemas.serviceCreateSchema),
  publicController.addService
);

router.get('/technologies', publicController.listTechnologies);
router.post(
  '/technologies',
  authenticateJWT,
  requireRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  validateRequest(schemas.technologyCreateSchema),
  publicController.addTechnology
);

router.get('/case-studies', publicController.listCaseStudies);
router.post(
  '/case-studies',
  authenticateJWT,
  requireRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MARKETING]),
  validateRequest(schemas.caseStudyCreateSchema),
  publicController.addCaseStudy
);

router.get('/testimonials', publicController.listTestimonials);
router.post(
  '/testimonials',
  authenticateJWT,
  requireRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MARKETING]),
  publicController.addTestimonial
);

// ================= UPLOADS ROUTE =================
router.post(
  '/upload',
  uploadController.uploadConfig.single('file'),
  uploadController.handleFileUpload
);

export const apiRouter = router;
