import { prisma } from '../config/db';
import { Blog, BlogCategory } from '@prisma/client';

export class BlogRepository {
  async findAllCategories() {
    return prisma.blogCategory.findMany({
      orderBy: { name: 'asc' }
    });
  }

  async findCategoryBySlug(slug: string) {
    return prisma.blogCategory.findUnique({
      where: { slug }
    });
  }

  async findBySlug(slug: string) {
    return prisma.blog.findUnique({
      where: { slug },
      include: {
        category: true,
        author: {
          select: {
            fullName: true,
            email: true
          }
        }
      }
    });
  }

  async findAll(limit: number = 10, offset: number = 0, categorySlug?: string) {
    return prisma.blog.findMany({
      where: {
        status: 'PUBLISHED',
        ...(categorySlug && {
          category: {
            slug: categorySlug
          }
        })
      },
      take: limit,
      skip: offset,
      include: {
        category: true,
        author: {
          select: {
            fullName: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createBlog(data: {
    title: string;
    slug: string;
    summary: string;
    content: string;
    categoryId: string;
    authorId: string;
    status: 'DRAFT' | 'PUBLISHED';
    publishedAt?: Date;
  }) {
    return prisma.blog.create({
      data,
      include: { category: true }
    });
  }
}
