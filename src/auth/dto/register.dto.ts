import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'admin@blog.local' }) @IsEmail() email: string;
  @ApiProperty({ example: 'admin123', minLength: 6 }) @IsString() @MinLength(6) password: string;
  @ApiPropertyOptional({ example: 'Admin Blog' }) @IsOptional() @IsString() name?: string;
}
