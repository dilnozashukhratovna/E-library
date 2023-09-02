import { Module } from '@nestjs/common';
import { UserBooksInfoService } from './user_books_info.service';
import { UserBooksInfoController } from './user_books_info.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserBooksInfo } from './models/user_books_info.model';

@Module({
  imports: [SequelizeModule.forFeature([UserBooksInfo])],
  controllers: [UserBooksInfoController],
  providers: [UserBooksInfoService],
})
export class UserBooksInfoModule {}
