import { IsString, IsOptional, IsBoolean, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'Belajar NestJS' }) @IsString() @MinLength(3) title: string;
  @ApiPropertyOptional({ example: 'belajar-nestjs' }) @IsOptional() @IsString() slug?: string;
  @ApiPropertyOptional({ example: 'Ringkasan singkat' }) @IsOptional() @IsString() excerpt?: string;
  @ApiProperty({ example: 'Isi lengkap minimal 10 karakter...' }) @IsString() @MinLength(10) content: string;
  @ApiPropertyOptional({ example: true }) @IsOptional() @IsBoolean() published?: boolean;
}
