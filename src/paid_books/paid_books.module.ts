import { Module } from '@nestjs/common';
import { PaidBooksService } from './paid_books.service';
import { PaidBooksController } from './paid_books.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaidBooks } from './models/paid_books.model';
import { BookService } from '../book/book.service';
import { Book } from '../book/models/book.model';

@Module({
  imports: [SequelizeModule.forFeature([PaidBooks, Book])],
  controllers: [PaidBooksController],
  providers: [PaidBooksService, BookService],
})
export class PaidBooksModule {}
