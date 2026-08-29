import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(@Inject(PostsService) private posts: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Public, list published posts' })
  findAll() {
    return this.posts.findAll();
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin, list posts milik sendiri' })
  findAllAdmin(@Req() req: any) {
    return this.posts.findAllAdmin(req.user.id);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Public, get post by slug' })
  findOne(@Param('slug') slug: string) {
    return this.posts.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin, create post (need JWT)' })
  create(@Body() dto: CreatePostDto, @Req() req: any) {
    return this.posts.create(dto, req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin, update post milik sendiri' })
  update(@Param('id') id: string, @Body() dto: UpdatePostDto, @Req() req: any) {
    return this.posts.update(id, dto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin, delete post milik sendiri' })
  remove(@Param('id') id: string, @Req() req: any) {
    return this.posts.remove(id, req.user.id);
  }
}
