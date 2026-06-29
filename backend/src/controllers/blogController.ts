import { Request, Response, NextFunction } from 'express';
import { BlogService } from '../services/blogService';
import { HTTP_STATUS } from '../constants/statusCodes';
import { AuthenticatedRequest } from '../middleware/auth';

const blogService = new BlogService();

export const listCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await blogService.getBlogCategories();
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: list
    });
  } catch (error) {
    return next(error);
  }
};

export const listBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string || '10', 10);
    const offset = parseInt(req.query.offset as string || '0', 10);
    const categorySlug = req.query.category as string || undefined;

    const list = await blogService.getBlogs(limit, offset, categorySlug);
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: list
    });
  } catch (error) {
    return next(error);
  }
};

export const getBlogDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const blog = await blogService.getBlogBySlug(slug);
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: blog
    });
  } catch (error) {
    return next(error);
  }
};

export const createBlog = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: 'User session missing' });
    }

    const payload = {
      ...req.body,
      authorId: req.user.id
    };

    const blog = await blogService.createBlogPost(payload);
    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Blog post successfully created',
      data: blog
    });
  } catch (error) {
    return next(error);
  }
};
