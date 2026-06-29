import { BlogRepository } from '../repositories/blogRepository';
import { AppError } from '../middleware/errorHandler';
import { HTTP_STATUS } from '../constants/statusCodes';
import { logger } from '../config/logger';

export class BlogService {
  private blogRepository = new BlogRepository();

  async getBlogCategories() {
    return this.blogRepository.findAllCategories();
  }

  async getBlogs(limit: number, offset: number, categorySlug?: string) {
    return this.blogRepository.findAll(limit, offset, categorySlug);
  }

  async getBlogBySlug(slug: string) {
    const blog = await this.blogRepository.findBySlug(slug);
    if (!blog) {
      throw new AppError('Blog post not found', HTTP_STATUS.NOT_FOUND);
    }
    return blog;
  }

  async createBlogPost(data: {
    title: string;
    summary: string;
    content: string;
    categoryId: string;
    authorId: string;
    status?: 'DRAFT' | 'PUBLISHED';
  }) {
    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const existing = await this.blogRepository.findBySlug(slug);
    if (existing) {
      throw new AppError('A blog post with this title already exists', HTTP_STATUS.CONFLICT);
    }

    const payload = {
      ...data,
      slug,
      status: data.status || 'DRAFT',
      publishedAt: data.status === 'PUBLISHED' ? new Date() : undefined
    };

    const blog = await this.blogRepository.createBlog(payload);
    logger.info(`Blogs: User ${data.authorId} created new post: ${slug}`);
    return blog;
  }
}
