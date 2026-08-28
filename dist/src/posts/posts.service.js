"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
function slugify(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}
let PostsService = class PostsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.post.findMany({
            where: { published: true },
            include: { author: { select: { id: true, email: true, name: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    findAllAdmin(authorId) {
        return this.prisma.post.findMany({
            where: { authorId },
            include: { author: { select: { id: true, email: true, name: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findBySlug(slug) {
        const post = await this.prisma.post.findUnique({
            where: { slug },
            include: { author: { select: { id: true, email: true, name: true } } },
        });
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        return post;
    }
    async findById(id) {
        const post = await this.prisma.post.findUnique({ where: { id } });
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        return post;
    }
    async create(dto, authorId) {
        const slug = dto.slug ? slugify(dto.slug) : slugify(dto.title);
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
    async update(id, dto, userId) {
        const post = await this.findById(id);
        if (post.authorId !== userId)
            throw new common_1.ForbiddenException('Not your post');
        const data = { ...dto };
        if (dto.title && !dto.slug)
            data.slug = slugify(dto.title);
        if (dto.slug)
            data.slug = slugify(dto.slug);
        return this.prisma.post.update({ where: { id }, data });
    }
    async remove(id, userId) {
        const post = await this.findById(id);
        if (post.authorId !== userId)
            throw new common_1.ForbiddenException('Not your post');
        return this.prisma.post.delete({ where: { id } });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map