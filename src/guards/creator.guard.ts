import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Admin } from '../admin/models/admin.model';

@Injectable()
export class CreatorGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Admin unauthorized');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Admin unauthorized');
    }

    const admin = await this.validateToken(token);
    if (!admin || !admin.is_active) {
      throw new UnauthorizedException('Invalid or inactive admin');
    }

    if (!admin.is_creator) {
      throw new UnauthorizedException('Admin has not such a right!');
    }

    req.admin = admin;

    return true;
  }

  private async validateToken(token: string): Promise<Partial<Admin>> {
    try {
      return await this.jwtService.verify(token, {
        secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
      });
    } catch (error) {
      return null;
    }
  }
}
