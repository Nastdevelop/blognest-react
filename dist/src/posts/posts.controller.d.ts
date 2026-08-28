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
        authorId: string;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        published: boolean;
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
        authorId: string;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        published: boolean;
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
        authorId: string;
        title: string;
        slug: string;
        excerpt: string | null;
        content: string;
        published: boolean;
    }>;
    create(dto: CreatePostDto, req: any): Promise<{
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
    update(id: string, dto: UpdatePostDto, req: any): Promise<{
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
    remove(id: string, req: any): Promise<{
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
