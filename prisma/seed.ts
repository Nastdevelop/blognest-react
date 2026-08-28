import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  const hashed = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@blog.local' },
    update: {},
    create: {
      email: 'admin@blog.local',
      password: hashed,
      name: 'Admin Blog',
      role: 'admin',
    },
  });
  console.log('Admin:', admin.email, admin.id);

  await prisma.post.deleteMany({ where: { authorId: admin.id } });

  const post1 = await prisma.post.create({
    data: {
      title: 'Belajar NestJS untuk Pemula',
      slug: 'belajar-nestjs-untuk-pemula',
      excerpt: 'Pengenalan NestJS, arsitektur modular, dan cara bikin API sederhana.',
      content: `# Belajar NestJS untuk Pemula

NestJS adalah framework Node.js berbasis TypeScript yang terinspirasi Angular.

## Kenapa NestJS?
- Modular (Modules, Controllers, Services)
- Support TypeScript penuh
- Mudah integrasi Prisma, JWT, dan validasi

## Contoh Controller Sederhana
\`\`\`ts
@Controller('posts')
export class PostsController {
  @Get() findAll() { return this.service.findAll(); }
}
\`\`\`

Cocok untuk belajar backend production-ready tapi syntax tetap sederhana.
`,
      published: true,
      authorId: admin.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'React + Vite + Tailwind: Setup Blog Frontend',
      slug: 'react-vite-tailwind-setup-blog',
      excerpt: 'Cara cepat setup frontend blog dengan Vite, React Router, dan Tailwind CSS.',
      content: `# React + Vite + Tailwind

Vite bikin dev super cepat. Tailwind bikin styling tanpa pindah file.

## Langkah Setup
1. \`npm create vite@latest\`
2. Install tailwindcss
3. Setup axios + react-router

## Tips Middleware Frontend
Gunakan Axios interceptor untuk inject JWT token otomatis.

Frontend dan backend deploy terpisah — cukup set VITE_API_URL.

Selamat ngoding!
`,
      published: true,
      authorId: admin.id,
    },
  });

  console.log('Posts created:', post1.slug, post2.slug);
  console.log('Done. Login: admin@blog.local / admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
