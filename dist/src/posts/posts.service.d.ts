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
        authorId: string;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        published: boolean;
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
        authorId: string;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        published: boolean;
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
        authorId: string;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        published: boolean;
    }>;
    findById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        published: boolean;
    }>;
    create(dto: CreatePostDto, authorId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        published: boolean;
    }>;
    update(id: string, dto: UpdatePostDto, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        published: boolean;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        published: boolean;
    }>;
}
