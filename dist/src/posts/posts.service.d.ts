import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        author: {
            id: string;
            email: string;
            name: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        published: boolean;
        authorId: string;
    })[]>;
    findAllAdmin(authorId: string): import(".prisma/client").Prisma.PrismaPromise<({
        author: {
            id: string;
            email: string;
            name: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        published: boolean;
        authorId: string;
    })[]>;
    findBySlug(slug: string): Promise<{
        author: {
            id: string;
            email: string;
            name: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        published: boolean;
        authorId: string;
    }>;
    findById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        published: boolean;
        authorId: string;
    }>;
    create(dto: CreatePostDto, authorId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        published: boolean;
        authorId: string;
    }>;
    update(id: string, dto: UpdatePostDto, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        published: boolean;
        authorId: string;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        published: boolean;
        authorId: string;
    }>;
}
