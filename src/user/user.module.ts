import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({ global: true }),
    MailModule,
  ],
  controllers: [UserController],
  providers: [UserService, MailService],
})
export class UserModule {}
