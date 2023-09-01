import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../user/models/user.model';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('User unauthorized');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('User unauthorized');
    }

    const user = await this.validateToken(token);
    if (!user || !user.is_active) {
      throw new UnauthorizedException('Invalid or inactive user');
    }

    req.user = user;

    return true;
  }

  private async validateToken(token: string): Promise<Partial<User>> {
    try {
      return await this.jwtService.verify(token, {
        secret: process.env.USER_ACCESS_TOKEN_KEY,
      });
    } catch (error) {
      return null;
    }
  }
}

