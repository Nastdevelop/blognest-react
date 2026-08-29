import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(ConfigService) config: ConfigService) {
    const secret =
      config?.get<string>('JWT_SECRET') ||
      process.env.JWT_SECRET ||
      'belajar-super-secret-jwt-2025-change-in-prod';
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
      ignoreExpiration: false,
    });
  }
  async validate(payload: any) {
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
