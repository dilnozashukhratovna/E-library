import { Module } from '@nestjs/common';
import { BookAuthorService } from './book_author.service';
import { BookAuthorController } from './book_author.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookAuthor } from './models/book_author.model';

@Module({
  imports: [SequelizeModule.forFeature([BookAuthor])],
  controllers: [BookAuthorController],
  providers: [BookAuthorService],
})
export class BookAuthorModule {}
