import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async register(email: string, password: string, name?: string) {
    const exists = await this.users.findByEmail(email);
    if (exists) throw new ConflictException('Email already exists');
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.users.create({ email, password: hashed, name, role: 'admin' });
    return this.sign(user);
  }

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return this.sign(user);
  }

  private sign(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwt.sign(payload);
    return {
      access_token: token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    };
  }
}
