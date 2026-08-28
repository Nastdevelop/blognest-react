import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.post.findMany({
      where: { published: true },
      include: { author: { select: { id: true, email: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  findAllAdmin(authorId: string) {
    return this.prisma.post.findMany({
      where: { authorId },
      include: { author: { select: { id: true, email: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.post.findUnique({
      where: { slug },
      include: { author: { select: { id: true, email: true, name: true } } },
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async findById(id: string) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async create(dto: CreatePostDto, authorId: string) {
    const slug = dto.slug ? slugify(dto.slug) : slugify(dto.title);
    // ensure unique slug
    let finalSlug = slug;
    let i = 1;
    while (await this.prisma.post.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${slug}-${i++}`;
    }
    return this.prisma.post.create({
      data: {
        title: dto.title,
        slug: finalSlug,
        excerpt: dto.excerpt,
        content: dto.content,
        published: dto.published ?? true,
        authorId,
      },
    });
  }

  async update(id: string, dto: UpdatePostDto, userId: string) {
    const post = await this.findById(id);
    if (post.authorId !== userId) throw new ForbiddenException('Not your post');
    const data: any = { ...dto };
    if (dto.title && !dto.slug) data.slug = slugify(dto.title);
    if (dto.slug) data.slug = slugify(dto.slug);
    return this.prisma.post.update({ where: { id }, data });
  }

  async remove(id: string, userId: string) {
    const post = await this.findById(id);
    if (post.authorId !== userId) throw new ForbiddenException('Not your post');
    return this.prisma.post.delete({ where: { id } });
  }
}
