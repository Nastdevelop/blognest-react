import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private posts;
    constructor(posts: PostsService);
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
    findAllAdmin(req: any): import(".prisma/client").Prisma.PrismaPromise<({
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
    findOne(slug: string): Promise<{
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
    create(dto: CreatePostDto, req: any): Promise<{
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
    update(id: string, dto: UpdatePostDto, req: any): Promise<{
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
    remove(id: string, req: any): Promise<{
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
